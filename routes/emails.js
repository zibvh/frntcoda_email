const express      = require('express');
const router       = express.Router();
const { sendEmail } = require('../mailer');

// ── Helper ─────────────────────────────────────────────────────────
function handler(buildEmail) {
  return async (req, res) => {
    try {
      const payload = buildEmail(req.body);
      await sendEmail(req.app, payload);
      res.json({ success: true });
    } catch (err) {
      console.error('[frNtcOda Email] Route error:', err.message);
      res.status(500).json({ error: err.message || 'Failed to send email' });
    }
  };
}

// ── Routes ─────────────────────────────────────────────────────────

// POST /email/tutor-welcome
// Body: { to, toName }
router.post('/tutor-welcome', handler(({ to, toName }) => ({
  to, toName,
  subject: 'Welcome to frNtcOda – Your Application is Received!',
  html: `
    <h2>Welcome, ${toName || 'Tutor'}!</h2>
    <p>Thank you for applying to become a tutor on <strong>frNtcOda</strong>.</p>
    <p>We've received your application and will review it shortly. You'll hear from us soon.</p>
    <p>– The frNtcOda Team</p>
  `,
})));

// POST /email/tutor-activated
// Body: { to, toName }
router.post('/tutor-activated', handler(({ to, toName }) => ({
  to, toName,
  subject: 'You\'re Live on frNtcOda! 🎉',
  html: `
    <h2>Congratulations, ${toName || 'Tutor'}!</h2>
    <p>Your tutor account is now <strong>active</strong> on frNtcOda.</p>
    <p>You can now create and publish courses for students to discover.</p>
    <p>– The frNtcOda Team</p>
  `,
})));

// POST /email/course-live
// Body: { to, toName, courseTitle, courseUrl }
router.post('/course-live', handler(({ to, toName, courseTitle, courseUrl }) => ({
  to, toName,
  subject: `Your course "${courseTitle}" is now live!`,
  html: `
    <h2>Your course is live, ${toName || 'Tutor'}!</h2>
    <p><strong>${courseTitle}</strong> has been approved and is now visible to students.</p>
    ${courseUrl ? `<p><a href="${courseUrl}">View your course →</a></p>` : ''}
    <p>– The frNtcOda Team</p>
  `,
})));

// POST /email/course-rejected
// Body: { to, toName, courseTitle, reason }
router.post('/course-rejected', handler(({ to, toName, courseTitle, reason }) => ({
  to, toName,
  subject: `Update on your course "${courseTitle}"`,
  html: `
    <h2>Hi ${toName || 'Tutor'},</h2>
    <p>Unfortunately, your course <strong>${courseTitle}</strong> was not approved at this time.</p>
    ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
    <p>Please make the necessary changes and resubmit. If you have questions, contact our support team.</p>
    <p>– The frNtcOda Team</p>
  `,
})));

// POST /email/student-enrolled
// Body: { to, toName, courseTitle, courseUrl }
router.post('/student-enrolled', handler(({ to, toName, courseTitle, courseUrl }) => ({
  to, toName,
  subject: `You're enrolled in "${courseTitle}"!`,
  html: `
    <h2>Welcome to the course, ${toName || 'Student'}!</h2>
    <p>You've successfully enrolled in <strong>${courseTitle}</strong>.</p>
    ${courseUrl ? `<p><a href="${courseUrl}">Start learning →</a></p>` : ''}
    <p>– The frNtcOda Team</p>
  `,
})));

// POST /email/certificate-ready
// Body: { to, toName, courseTitle, certificateUrl }
router.post('/certificate-ready', handler(({ to, toName, courseTitle, certificateUrl }) => ({
  to, toName,
  subject: `Your certificate for "${courseTitle}" is ready!`,
  html: `
    <h2>Congratulations, ${toName || 'Student'}!</h2>
    <p>You've completed <strong>${courseTitle}</strong> and your certificate is ready.</p>
    ${certificateUrl ? `<p><a href="${certificateUrl}">Download your certificate →</a></p>` : ''}
    <p>– The frNtcOda Team</p>
  `,
})));

// POST /email/password-reset
// Body: { to, toName, resetUrl }
router.post('/password-reset', handler(({ to, toName, resetUrl }) => ({
  to, toName,
  subject: 'Reset your frNtcOda password',
  html: `
    <h2>Hi ${toName || 'there'},</h2>
    <p>We received a request to reset your frNtcOda password.</p>
    ${resetUrl
      ? `<p><a href="${resetUrl}">Click here to reset your password →</a></p>
         <p>This link expires in 1 hour. If you didn't request a reset, ignore this email.</p>`
      : '<p>If you requested a reset, please contact support.</p>'
    }
    <p>– The frNtcOda Team</p>
  `,
})));

module.exports = router;
