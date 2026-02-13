const nodemailer = require("nodemailer");
const formidable = require("formidable");
const fs = require("fs");

function escapeHtml(text) {
  if (!text) return "";
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(text).replace(/[&<>"']/g, (c) => map[c]);
}

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      uploadDir: "/tmp",
      keepExtensions: true,
    });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

const ALLOWED_MIMES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_EXT = /\.(pdf|doc|docx)$/i;

async function handler(req, res) {
  console.log("=== Contact API Handler Started ===");
  console.log("Request method:", req.method);
  console.log("Request headers:", {
    "content-type": req.headers["content-type"],
    "content-length": req.headers["content-length"],
  });

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    console.log("OPTIONS request - returning 200");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    console.log("Non-POST request - returning 405");
    return res.status(405).json({ msg: "Method Not Allowed" });
  }

  try {
    console.log("Starting form parse...");
    const { fields, files } = await parseForm(req);
    console.log("Form parsed successfully");
    console.log("Fields keys:", Object.keys(fields || {}));
    console.log("Files keys:", Object.keys(files || {}));
    const data = {
      name: (fields.name && fields.name[0]) || "",
      email: (fields.email && fields.email[0]) || "",
      company: (fields.company && fields.company[0]) || "",
      phone: (fields.phone && fields.phone[0]) || "",
      message: (fields.message && fields.message[0]) || "",
    };

    console.log("Form data extracted:", {
      name: data.name ? `${data.name.substring(0, 5)}...` : "empty",
      email: data.email ? `${data.email.substring(0, 5)}...` : "empty",
      company: data.company || "empty",
      phone: data.phone || "empty",
      messageLength: data.message.length,
    });

    if (
      !data.name.trim() ||
      !data.email.trim() ||
      !data.message.trim()
    ) {
      console.log("Validation failed - missing required fields");
      return res.status(400).json({ msg: "Please Fill All The Fields!" });
    }

    // Check environment variables
    console.log("Checking environment variables...");
    console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    console.log("EMAIL_USER length:", process.env.EMAIL_USER?.length || 0);
    console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length || 0);
    console.log("EMAIL_USER preview:", process.env.EMAIL_USER ? `${process.env.EMAIL_USER.substring(0, 5)}...` : "N/A");
    console.log("All env keys containing 'EMAIL':", Object.keys(process.env).filter(k => k.includes("EMAIL")));

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials not configured");
      return res.status(500).json({
        msg: "Email service is not configured. Please contact the administrator.",
        debug: {
          hasEmailUser: !!process.env.EMAIL_USER,
          hasEmailPass: !!process.env.EMAIL_PASS,
        },
      });
    }

    let uploadedFile = null;
    const fileList = files.jdFile ? (Array.isArray(files.jdFile) ? files.jdFile : [files.jdFile]) : [];
    const firstFile = fileList[0];
    console.log("File check:", {
      hasJdFile: !!files.jdFile,
      fileListLength: fileList.length,
      firstFileExists: !!firstFile,
    });

    if (firstFile && (firstFile.filepath || firstFile.path)) {
      const f = firstFile;
      const filepath = f.filepath || f.path;
      const ext = (f.originalFilename || f.name || "").toLowerCase();
      const mime = f.mimetype || f.type || "";
      console.log("File details:", {
        filename: f.originalFilename || f.name,
        ext,
        mime,
        size: f.size,
        filepath: filepath ? "exists" : "missing",
      });

      if (!ALLOWED_EXT.test(ext) || (!ALLOWED_MIMES.includes(mime) && mime !== "")) {
        console.log("File validation failed - invalid type");
        return res.status(400).json({
          msg: "Only PDF, DOC, and DOCX files are allowed for Job Description",
        });
      }
      if (f.size > 10 * 1024 * 1024) {
        console.log("File validation failed - too large");
        return res.status(400).json({ msg: "File size too large. Maximum size is 10MB." });
      }
      uploadedFile = { ...f, filepath: filepath };
      console.log("File validated successfully");
    } else {
      console.log("No file uploaded");
    }

    console.log("Creating nodemailer transporter...");
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Verifying SMTP connection...");
    try {
      await transporter.verify();
      console.log("SMTP verification successful");
    } catch (verifyErr) {
      console.error("SMTP verification failed:", {
        code: verifyErr.code,
        message: verifyErr.message,
        command: verifyErr.command,
      });
      throw verifyErr;
    }

    const companyPart = data.company.trim() ? ` - ${data.company.trim()}` : "";
    const subject = `[Portfolio] ${data.name}${companyPart}`;

    const companyRow = data.company.trim()
      ? `<tr><td><strong>Company</strong></td><td>${escapeHtml(data.company.trim())}</td></tr>`
      : "";
    const phoneRow = data.phone.trim()
      ? `<tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone.trim())}</td></tr>`
      : "";
    const fileInfo = uploadedFile
      ? `<tr><td><strong>Job Description File</strong></td><td>${escapeHtml(uploadedFile.originalFilename || "file")} (${(uploadedFile.size / 1024).toFixed(2)} KB)</td></tr>`
      : "";

    const html = `
      <p>You have a new message from your portfolio contact form.</p>
      <table style="border-collapse: collapse; margin: 16px 0;" cellpadding="8">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        ${companyRow}
        ${phoneRow}
        ${fileInfo}
      </table>
      <h4 style="margin: 16px 0 8px;">Message</h4>
      <p style="white-space: pre-wrap;">${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
      ${uploadedFile ? `<p style="margin-top: 16px;"><strong>📎 Job Description file attached</strong></p>` : ""}
      <hr style="margin: 24px 0 8px;">
      <p style="color: #666; font-size: 12px;">Reply to this email to respond directly to the sender. Sent from portfolio contact form.</p>
    `;

    const mailOptions = {
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      replyTo: data.email,
      to: process.env.EMAIL_USER,
      subject,
      html,
    };

    if (uploadedFile && (uploadedFile.filepath || uploadedFile.path)) {
      const filePath = uploadedFile.filepath || uploadedFile.path;
      console.log("Adding file attachment:", {
        filename: uploadedFile.originalFilename || uploadedFile.name,
        filePath,
        fileExists: fs.existsSync(filePath),
      });
      mailOptions.attachments = [
        {
          filename: uploadedFile.originalFilename || uploadedFile.name || "attachment",
          content: fs.readFileSync(filePath),
        },
      ];
    }

    console.log("Sending email...");
    console.log("Mail options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      hasAttachments: !!mailOptions.attachments,
    });

    const sendResult = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", {
      messageId: sendResult.messageId,
      response: sendResult.response,
    });

    const tmpPath = uploadedFile && (uploadedFile.filepath || uploadedFile.path);
    if (tmpPath && fs.existsSync(tmpPath)) {
      try { fs.unlinkSync(tmpPath); } catch (_) {}
    }

    const successMsg = uploadedFile
      ? "Thank You For Contacting Me! Your message and Job Description file have been received. I will get back to you soon."
      : "Thank You For Contacting Me! I will get back to you soon.";

    return res.status(200).json({ msg: successMsg });
  } catch (error) {
    console.error("=== ERROR IN CONTACT API ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error stack:", error.stack);
    console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));

    if (error.code === "EAUTH") {
      console.error("Authentication error detected");
      return res.status(500).json({
        msg: "Email authentication failed. Please check email credentials.",
        error: "EAUTH",
      });
    }

    return res.status(500).json({
      msg: "Failed to send email. Please try again later or contact me directly.",
      error: error.message || String(error),
      code: error.code || "UNKNOWN",
    });
  }
}

handler.config = { api: { bodyParser: false } };
module.exports = handler;
