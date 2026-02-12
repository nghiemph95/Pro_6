const router = require("express").Router();
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads");
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// File filter: only allow PDF, DOC, DOCX files (JD files)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype) || 
                   file.mimetype === "application/pdf" ||
                   file.mimetype === "application/msword" ||
                   file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, and DOCX files are allowed for Job Description"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter,
});

function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(text).replace(/[&<>"']/g, (c) => map[c]);
}

router.post("/contact", upload.single("jdFile"), async (req, res) => {
  try {
    let data = req.body;
    const uploadedFile = req.file;
    
    // Validate input
    if (
      !data.name ||
      !data.email ||
      !data.message ||
      data.name.trim().length === 0 ||
      data.email.trim().length === 0 ||
      data.message.trim().length === 0
    ) {
      return res.status(400).json({ msg: "Please Fill All The Fields!" });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials not configured in environment variables");
      return res.status(500).json({ 
        msg: "Email service is not configured. Please contact the administrator." 
      });
    }

    // Create transporter
    let smtpTransporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This should be an App Password, not regular password
      },
    });

    // Verify transporter configuration
    await smtpTransporter.verify();

    // Recruiter-friendly subject: [Portfolio] Name - Company (or "Contact")
    const companyPart = (data.company && data.company.trim()) ? ` - ${data.company.trim()}` : '';
    const subject = `[Portfolio] ${data.name}${companyPart}`;

    // Build recruiter-style body: clear sections, reply-to works
    const companyRow = (data.company && data.company.trim())
      ? `<tr><td><strong>Company</strong></td><td>${escapeHtml(data.company.trim())}</td></tr>`
      : '';
    const phoneRow = (data.phone && data.phone.trim())
      ? `<tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone.trim())}</td></tr>`
      : '';

    // Build email HTML with file attachment info
    const fileInfo = uploadedFile
      ? `<tr><td><strong>Job Description File</strong></td><td>${escapeHtml(uploadedFile.originalname)} (${(uploadedFile.size / 1024).toFixed(2)} KB)</td></tr>`
      : '';

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
      <p style="white-space: pre-wrap;">${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
      ${uploadedFile ? `<p style="margin-top: 16px;"><strong>📎 Job Description file attached</strong></p>` : ''}
      <hr style="margin: 24px 0 8px;">
      <p style="color: #666; font-size: 12px;">Reply to this email to respond directly to the sender. Sent from portfolio contact form.</p>
    `;

    let mailOptions = {
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      replyTo: data.email,
      to: process.env.EMAIL_USER,
      subject,
      html,
    };

    // Attach file if uploaded
    if (uploadedFile) {
      mailOptions.attachments = [
        {
          filename: uploadedFile.originalname,
          path: uploadedFile.path,
        },
      ];
    }

    // Send email
    await smtpTransporter.sendMail(mailOptions);
    
    // Delete uploaded file after sending email
    if (uploadedFile && fs.existsSync(uploadedFile.path)) {
      fs.unlinkSync(uploadedFile.path);
    }
    
    const successMsg = uploadedFile
      ? "Thank You For Contacting Me! Your message and Job Description file have been received. I will get back to you soon."
      : "Thank You For Contacting Me! I will get back to you soon.";
    
    res.status(200).json({ msg: successMsg });
  } catch (error) {
    console.error("Error sending email:", error);
    
    // Clean up uploaded file if error occurs
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    // Handle multer errors
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ 
          msg: "File size too large. Maximum size is 10MB." 
        });
      }
      return res.status(400).json({ 
        msg: error.message || "Error uploading file." 
      });
    }
    
    // Provide more specific error messages
    if (error.code === "EAUTH") {
      return res.status(500).json({ 
        msg: "Email authentication failed. Please check email credentials." 
      });
    }
    
    // Handle file type errors
    if (error.message && error.message.includes("Only PDF")) {
      return res.status(400).json({ 
        msg: error.message 
      });
    }
    
    res.status(500).json({ 
      msg: "Failed to send email. Please try again later or contact me directly." 
    });
  }
});

module.exports = router;
