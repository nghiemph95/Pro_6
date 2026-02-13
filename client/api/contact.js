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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method Not Allowed" });
  }

  try {
    const { fields, files } = await parseForm(req);
    const data = {
      name: (fields.name && fields.name[0]) || "",
      email: (fields.email && fields.email[0]) || "",
      company: (fields.company && fields.company[0]) || "",
      phone: (fields.phone && fields.phone[0]) || "",
      message: (fields.message && fields.message[0]) || "",
    };

    if (
      !data.name.trim() ||
      !data.email.trim() ||
      !data.message.trim()
    ) {
      return res.status(400).json({ msg: "Please Fill All The Fields!" });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials not configured");
      return res.status(500).json({
        msg: "Email service is not configured. Please contact the administrator.",
      });
    }

    let uploadedFile = null;
    const fileList = files.jdFile ? (Array.isArray(files.jdFile) ? files.jdFile : [files.jdFile]) : [];
    const firstFile = fileList[0];
    if (firstFile && (firstFile.filepath || firstFile.path)) {
      const f = firstFile;
      const filepath = f.filepath || f.path;
      const ext = (f.originalFilename || f.name || "").toLowerCase();
      const mime = f.mimetype || f.type || "";
      if (!ALLOWED_EXT.test(ext) || (!ALLOWED_MIMES.includes(mime) && mime !== "")) {
        return res.status(400).json({
          msg: "Only PDF, DOC, and DOCX files are allowed for Job Description",
        });
      }
      if (f.size > 10 * 1024 * 1024) {
        return res.status(400).json({ msg: "File size too large. Maximum size is 10MB." });
      }
      uploadedFile = { ...f, filepath: filepath };
    }

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

    await transporter.verify();

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
      mailOptions.attachments = [
        {
          filename: uploadedFile.originalFilename || uploadedFile.name || "attachment",
          content: fs.readFileSync(filePath),
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    const tmpPath = uploadedFile && (uploadedFile.filepath || uploadedFile.path);
    if (tmpPath && fs.existsSync(tmpPath)) {
      try { fs.unlinkSync(tmpPath); } catch (_) {}
    }

    const successMsg = uploadedFile
      ? "Thank You For Contacting Me! Your message and Job Description file have been received. I will get back to you soon."
      : "Thank You For Contacting Me! I will get back to you soon.";

    return res.status(200).json({ msg: successMsg });
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.code === "EAUTH") {
      return res.status(500).json({ msg: "Email authentication failed. Please check email credentials." });
    }
    return res.status(500).json({
      msg: "Failed to send email. Please try again later or contact me directly.",
    });
  }
}

handler.config = { api: { bodyParser: false } };
module.exports = handler;
