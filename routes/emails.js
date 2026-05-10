const express  = require('express');
const router   = express.Router();
const { Resend } = require('resend');
const resend   = new Resend(process.env.RESEND_API_KEY);

const templates = require('../templates');
const FROM      = process.env.FROM_EMAIL || 'frNtcOda <noreply@frntcoda.com>';

// Helper: send and respond
async function send(res, { to, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({ from: FROM, to, subject, html });
    if (error) {
      console.error('[Resend error]', error);
      return res.status(500).json({ error: error.message });
    }
    return res.json({ success: true, id: data.id });
  } catch (e) {
    console.error('[Send error]', e.message);
    return res.status(500).json({ error: e.message });
  }
}

// ── POST /email/tutor-welcome ──────────────────────────────────────
// Body: { to, toName, dashboardUrl }
router.post('/tutor-welcome', async (req, res) => {
  const { to, toName, dashboardUrl } = req.body;
  if (!to || !toName) return res.status(400).json({ error: 'Missing: to, toName' });
  await send(res, {
    to,
    subject: 'Welcome to frNtcOda — Complete Your Tutor Activation',
    html: templates.tutorWelcome({ toName, dashboardUrl: dashboardUrl || 'https://frntcoda.onrender.com/tutor-dashboard.html' })
  });
});

// ── POST /email/tutor-activated ───────────────────────────────────
// Body: { to, toName }
router.post('/tutor-activated', async (req, res) => {
  const { to, toName } = req.body;
  if (!to || !toName) return res.status(400).json({ error: 'Missing: to, toName' });
  await send(res, {
    to,
    subject: 'You\'re Live on frNtcOda! 🎉',
    html: templates.tutorActivated({ toName })
  });
});

// ── POST /email/course-live ────────────────────────────────────────
// Body: { to, toName, courseTitle, courseUrl }
router.post('/course-live', async (req, res) => {
  const { to, toName, courseTitle, courseUrl } = req.body;
  if (!to || !toName || !courseTitle) return res.status(400).json({ error: 'Missing: to, toName, courseTitle' });
  await send(res, {
    to,
    subject: `Your course "${courseTitle}" is now live!`,
    html: templates.courseLive({ toName, courseTitle, courseUrl: courseUrl || 'https://frntcoda.onrender.com/courses.html' })
  });
});

// ── POST /email/course-rejected ───────────────────────────────────
// Body: { to, toName, courseTitle, reason }
router.post('/course-rejected', async (req, res) => {
  const { to, toName, courseTitle, reason } = req.body;
  if (!to || !toName || !courseTitle) return res.status(400).json({ error: 'Missing: to, toName, courseTitle' });
  await send(res, {
    to,
    subject: `Update on your course — "${courseTitle}"`,
    html: templates.courseRejected({ toName, courseTitle, reason: reason || 'Please review our content guidelines and resubmit.' })
  });
});

// ── POST /email/student-enrolled ──────────────────────────────────
// Body: { to, toName, courseTitle, tutorName, dashboardUrl }
router.post('/student-enrolled', async (req, res) => {
  const { to, toName, courseTitle, tutorName, dashboardUrl } = req.body;
  if (!to || !toName || !courseTitle) return res.status(400).json({ error: 'Missing: to, toName, courseTitle' });
  await send(res, {
    to,
    subject: `You're enrolled in "${courseTitle}" 🚀`,
    html: templates.studentEnrolled({ toName, courseTitle, tutorName: tutorName || 'your tutor', dashboardUrl: dashboardUrl || 'https://frntcoda.onrender.com/student-dashboard.html' })
  });
});

// ── POST /email/certificate-ready ─────────────────────────────────
// Body: { to, toName, courseTitle, certificateUrl }
router.post('/certificate-ready', async (req, res) => {
  const { to, toName, courseTitle, certificateUrl } = req.body;
  if (!to || !toName || !courseTitle) return res.status(400).json({ error: 'Missing: to, toName, courseTitle' });
  await send(res, {
    to,
    subject: `Your certificate for "${courseTitle}" is ready! 🏆`,
    html: templates.certificateReady({ toName, courseTitle, certificateUrl })
  });
});

// ── POST /email/password-reset ────────────────────────────────────
// Body: { to, toName, resetUrl }
router.post('/password-reset', async (req, res) => {
  const { to, toName, resetUrl } = req.body;
  if (!to || !resetUrl) return res.status(400).json({ error: 'Missing: to, resetUrl' });
  await send(res, {
    to,
    subject: 'Reset your frNtcOda password',
    html: templates.passwordReset({ toName: toName || 'there', resetUrl })
  });
});

module.exports = router;
