const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { sendMail } = require('../services/mailService'); // removed sendOtp; sending with custom HTML

// Branding config (override via .env)
const APP_NAME = process.env.APP_NAME || 'SkillSwap';
const APP_URL = process.env.APP_URL || '';
const MAIL_BRAND_COLOR = process.env.MAIL_BRAND_COLOR || '#4F46E5';

const MAIL_LOGO_URL =
  process.env.MAIL_LOGO_URL ||
  '';

// Helpers
const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const baseEmailTemplate = ({ title = APP_NAME, preheader = '', bodyHtml = '' }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escapeHtml(title)}</title>
<style>
  /* Mobile utilities (only a few, rest inline for compatibility) */
  @media (max-width: 480px) {
    .sm-px-16 { padding-left:16px !important; padding-right:16px !important; }
    .sm-py-16 { padding-top:16px !important; padding-bottom:16px !important; }
    .sm-text-center { text-align:center !important; }
    .sm-text-24 { font-size:24px !important; }
    .sm-leading-1_5 { line-height:1.5 !important; }
    .sm-code { font-size:22px !important; padding:12px !important; }
  }
</style>
</head>
<body style="margin:0; background:#f6f9fc; mso-line-height-rule:exactly;">
<div style="display:none; font-size:1px; color:#fff; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
  ${escapeHtml(preheader)}&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;
</div>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f6f9fc;">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:640px; background:#ffffff; border-radius:14px; box-shadow:0 8px 30px rgba(2,6,23,0.08); overflow:hidden;">
        <tr>
          <td style="padding:20px 24px; background:${MAIL_BRAND_COLOR}; color:#ffffff;">
            ${
              MAIL_LOGO_URL
                ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                     <tr>
                       <td style="vertical-align:middle; width:1%; padding-right:12px;">
                         <img src="${MAIL_LOGO_URL}" alt="${escapeHtml(APP_NAME)}" height="28" style="display:block; border:0; outline:none; text-decoration:none; height:28px;">
                       </td>
                       <td style="vertical-align:middle;">
                         <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-weight:700; letter-spacing:0.2px; color:#ffffff;">${escapeHtml(APP_NAME)}</div>
                       </td>
                     </tr>
                   </table>`
                : `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-weight:700; letter-spacing:0.2px; color:#ffffff;">${escapeHtml(APP_NAME)}</div>`
            }
          </td>
        </tr>
        <tr>
          <td class="content sm-px-16 sm-py-16" style="padding:24px; color:#0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height:1.6;">
            ${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px; background:#f8fafc; color:#64748b; font-size:12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
            © ${new Date().getFullYear()} ${escapeHtml(APP_NAME)} · ${
              APP_URL
                ? `<a href="${APP_URL}" style="color:inherit; text-decoration:underline;">${APP_URL}</a>`
                : ''
            }
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

const contactEmailHtml = ({ name, email, message }) => {
  const safeName = escapeHtml(name || 'Anonymous');
  const safeEmail = escapeHtml(email || 'N/A');
  const safeMessage = escapeHtml(message || '');
  return baseEmailTemplate({
    title: `${APP_NAME}: New contact message`,
    preheader: `New message from ${safeName}`,
    bodyHtml: `
      <span style="display:inline-block; padding:4px 10px; border-radius:999px; background:#eef2ff; color:#3730a3; font-size:12px; font-weight:600;">New Contact Message</span>
      <h2 class="sm-text-24 sm-leading-1_5" style="margin:12px 0 8px 0; font-size:28px;">You've received a new message</h2>
      <p style="margin-top:0; color:#64748b;">From: <strong>${safeName}</strong> &lt;${safeEmail}&gt;</p>
      <div style="height:1px; background:#e5e7eb; margin:20px 0;"></div>
      <p style="margin:0 0 8px 0;">Message:</p>
      <div class="sm-code" style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace; background:#0b1220; color:#e2e8f0; padding:14px 16px; border-radius:10px; white-space:pre-wrap;">${safeMessage}</div>
      <div style="height:1px; background:#e5e7eb; margin:20px 0;"></div>
      <p style="margin:0; color:#64748b;">You can reply directly to this email to contact ${safeName}.</p>
    `,
  });
};

const otpEmailHtml = ({ otp, minutesValid = 10 }) => {
  const code = String(otp || '').replace(/\s+/g, '');
  const spaced = code.split('').join(' ');
  return baseEmailTemplate({
    title: `${APP_NAME}: Your verification code`,
    preheader: `Your ${APP_NAME} verification code`,
    bodyHtml: `
      <span style="display:inline-block; padding:4px 10px; border-radius:999px; background:#eef2ff; color:#3730a3; font-size:12px; font-weight:600;">Verification</span>
      <h2 class="sm-text-24 sm-leading-1_5" style="margin:12px 0 8px 0; font-size:28px;">Your verification code</h2>
      <p style="margin-top:0; color:#64748b;">Use this code to complete your sign-in or verification.</p>
      <div style="text-align:center; margin:18px 0 6px 0;">
        <div class="sm-code" style="display:inline-block; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace; background:#0b1220; color:#e2e8f0; padding:14px 16px; border-radius:10px; font-size:28px; letter-spacing:6px;">${spaced}</div>
      </div>
      <p style="text-align:center; margin:8px 0 0 0; color:#64748b;">This code expires in ${minutesValid} minute${minutesValid == 1 ? '' : 's'}.</p>
      <div style="height:1px; background:#e5e7eb; margin:20px 0;"></div>
      <p style="margin:0; color:#64748b;">If you didn’t request this, you can safely ignore this email.</p>
    `,
  });
};

// GET /api/health
router.get('/health', (_req, res) => res.json({ ok: true }));

// POST /api/send-email
router.post('/send-email', async (req, res) => {
  try {
    const { name, email, message, to } = req.body;
    if (!email || !message) return res.status(400).json({ error: 'Missing email or message' });

    const subject = `${APP_NAME}: New Contact Message from ${name || 'Anonymous'}`;
    const text = `From: ${name || 'Anonymous'} <${email}>\n\n${message}`;
    const html = contactEmailHtml({ name, email, message });

    await sendMail({
      to: to || process.env.MAIL_TO || 'info@SkillSwap.com',
      subject,
      text,
      html,
      replyTo: email,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('send-email error:', err);
    res.status(500).json({ error: err.message || 'Failed to send email' });
  }
});

// POST /api/send-otp
router.post('/send-otp', async (req, res) => {
  try {
    let { to, otp, minutesValid } = req.body;
    if (!to) return res.status(400).json({ error: 'Missing recipient email "to"' });

    minutesValid = Number(minutesValid) || 10;
    // If OTP not provided, generate a 6-digit code
    const code = String(otp || Math.floor(100000 + Math.random() * 900000));

    const subject = `${APP_NAME}: Your verification code`;
    const text = `Your ${APP_NAME} verification code is: ${code}\nThis code expires in ${minutesValid} minute${minutesValid == 1 ? '' : 's'}.\n\nIf you didn’t request this, ignore this email.`;
    const html = otpEmailHtml({ otp: code, minutesValid });

    await sendMail({ to, subject, text, html });

    const isProd = (process.env.NODE_ENV || '').toLowerCase() === 'production';
    res.json(isProd ? { ok: true } : { ok: true, otp: code });
  } catch (err) {
    console.error('send-otp error:', err);
    res.status(500).json({ error: err.message || 'Failed to send OTP' });
  }
});

module.exports = router;
