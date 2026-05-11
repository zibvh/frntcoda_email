/**
 * mailer.js — provider-agnostic email sender for frNtcOda
 *
 * Usage inside any route handler:
 *   const { sendEmail } = require('../mailer');
 *   await sendEmail(req.app, { to, toName, subject, html });
 *
 * Switch provider any time by changing EMAIL_PROVIDER in .env.
 * No route code needs to change.
 *
 * Brevo SDK v2 note: uses BrevoClient({ apiKey }) + client.transactionalEmails.sendTransacEmail()
 */

/**
 * @param {import('express').Application} app   - Express app (for app.locals)
 * @param {{ to: string, toName?: string, subject: string, html: string }} opts
 */
async function sendEmail(app, { to, toName, subject, html }) {
  const provider  = app.locals.provider;
  const fromRaw   = app.locals.FROM_EMAIL;           // e.g. "frNtcOda <frntcoda@gmail.com>"
  const fromMatch = fromRaw.match(/^(.*?)\s*<(.+)>$/);
  const fromName  = fromMatch ? fromMatch[1].trim() : 'frNtcOda';
  const fromEmail = fromMatch ? fromMatch[2].trim() : fromRaw;

  if (provider === 'brevo') {
    return sendViaBrevo(app.locals.brevo, { to, toName, subject, html, fromName, fromEmail });
  } else {
    return sendViaResend(app.locals.resend, { to, subject, html, fromRaw });
  }
}

// ── Brevo v2 ───────────────────────────────────────────────────────
// New SDK: BrevoClient instance exposes client.transactionalEmails.sendTransacEmail(payload)
// Payload is a plain object — no Brevo.SendSmtpEmail() constructor needed.
async function sendViaBrevo(client, { to, toName, subject, html, fromName, fromEmail }) {
  return client.transactionalEmails.sendTransacEmail({
    sender:      { name: fromName, email: fromEmail },
    to:          [{ email: to, name: toName || to }],
    subject:     subject,
    htmlContent: html,
  });
}

// ── Resend ─────────────────────────────────────────────────────────
async function sendViaResend(client, { to, subject, html, fromRaw }) {
  const { data, error } = await client.emails.send({
    from:    fromRaw,
    to:      [to],
    subject: subject,
    html:    html,
  });
  if (error) throw new Error(error.message || 'Resend error');
  return data;
}

module.exports = { sendEmail };
