const express      = require('express');
const router       = express.Router();
const { sendEmail } = require('../mailer');

// ── frNtcOda Brand Design System ──────────────────────────────────
const brand = {
  dark:        '#060D2B',
  dark2:       '#0D1845',
  dark3:       '#111C50',
  blue:        '#2B6BFF',
  red:         '#D90429',
  redBright:   '#FF0A35',
  white:       '#FFFFFF',
  gray:        '#8892B0',
  gray2:       '#4A5578',
  green:       '#22C55E',
  border:      'rgba(255,255,255,0.08)',
  displayFont: "'Syne', -apple-system, BlinkMacSystemFont, sans-serif",
  monoFont:    "'DM Mono', 'Courier New', monospace",
  bodyFont:    "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  logoGradient: 'linear-gradient(135deg, #FFFFFF 0%, #8892B0 100%)',
  blueGradient: 'linear-gradient(135deg, #1A4FD8, #3B7FFF)',
  redGradient:  'linear-gradient(135deg, #D90429, #FF2244)',
};

// ── Base Email Template ───────────────────────────────────────────
function baseTemplate({ preview, content }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  ${preview ? `<meta name="description" content="${escapeHtml(preview)}">` : ''}
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
  <!--<![endif]-->
  <style>
    /* Reset */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      background-color: ${brand.dark};
      font-family: ${brand.bodyFont};
    }
    
    /* Background */
    .email-bg {
      background-color: ${brand.dark};
      background-image: 
        linear-gradient(rgba(43,107,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(43,107,255,0.04) 1px, transparent 1px);
      background-size: 40px 40px;
      padding: 40px 20px;
    }
    
    /* Container */
    .email-container {
      max-width: 560px;
      margin: 0 auto;
      background: rgba(13,24,69,0.6);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 
        0 24px 60px rgba(0,0,0,0.4),
        inset 0 1px 0 rgba(255,255,255,0.06);
    }
    
    /* Header */
    .email-header {
      background: linear-gradient(135deg, ${brand.dark2} 0%, ${brand.dark3} 100%);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 32px 36px;
      text-align: center;
    }
    
    .email-logo {
      font-family: ${brand.displayFont};
      font-weight: 800;
      font-size: 28px;
      letter-spacing: -0.04em;
      color: ${brand.white};
      text-decoration: none;
      display: inline-block;
      margin-bottom: 12px;
    }
    
    .email-logo span {
      color: ${brand.redBright};
    }
    
    .email-header-line {
      width: 48px;
      height: 3px;
      background: ${brand.blueGradient};
      border-radius: 2px;
      margin: 0 auto;
    }
    
    /* Badge (optional, for role-specific) */
    .email-badge {
      display: inline-block;
      font-family: ${brand.monoFont};
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 5px 12px;
      border-radius: 20px;
      margin-top: 10px;
    }
    
    .badge-blue {
      background: rgba(43,107,255,0.12);
      color: ${brand.blue};
      border: 1px solid rgba(43,107,255,0.2);
    }
    
    .badge-green {
      background: rgba(34,197,94,0.12);
      color: ${brand.green};
      border: 1px solid rgba(34,197,94,0.2);
    }
    
    .badge-red {
      background: rgba(255,10,53,0.12);
      color: ${brand.redBright};
      border: 1px solid rgba(255,10,53,0.2);
    }
    
    /* Body */
    .email-body {
      padding: 36px;
    }
    
    .email-title {
      font-family: ${brand.displayFont};
      font-weight: 800;
      font-size: 26px;
      letter-spacing: -0.04em;
      line-height: 1.15;
      color: ${brand.white};
      margin-bottom: 16px;
    }
    
    .email-greeting {
      font-family: ${brand.displayFont};
      font-weight: 600;
      font-size: 18px;
      color: ${brand.white};
      margin-bottom: 20px;
    }
    
    .email-text {
      font-family: ${brand.bodyFont};
      font-weight: 400;
      font-size: 15px;
      line-height: 1.7;
      color: ${brand.gray};
      margin-bottom: 16px;
    }
    
    .email-text strong {
      color: ${brand.white};
      font-weight: 600;
    }
    
    .email-text a {
      color: ${brand.blue};
      text-decoration: underline;
    }
    
    /* Info Box */
    .email-info-box {
      background: rgba(43,107,255,0.07);
      border: 1px solid rgba(43,107,255,0.18);
      border-radius: 10px;
      padding: 20px 24px;
      margin: 24px 0;
    }
    
    .email-info-box p {
      font-family: ${brand.monoFont};
      font-size: 12px;
      color: ${brand.gray};
      line-height: 1.8;
      margin: 0;
    }
    
    .email-info-box strong {
      color: ${brand.white};
    }
    
    /* Warning Box */
    .email-warning-box {
      background: rgba(245,158,11,0.07);
      border: 1px solid rgba(245,158,11,0.2);
      border-radius: 10px;
      padding: 20px 24px;
      margin: 24px 0;
    }
    
    .email-warning-box p {
      font-family: ${brand.monoFont};
      font-size: 12px;
      color: #F59E0B;
      line-height: 1.8;
      margin: 0;
    }
    
    .email-warning-box strong {
      color: ${brand.white};
    }
    
    /* Error Box */
    .email-error-box {
      background: rgba(255,10,53,0.07);
      border: 1px solid rgba(255,10,53,0.18);
      border-radius: 10px;
      padding: 20px 24px;
      margin: 24px 0;
    }
    
    .email-error-box p {
      font-family: ${brand.monoFont};
      font-size: 12px;
      color: ${brand.redBright};
      line-height: 1.8;
      margin: 0;
    }
    
    .email-error-box strong {
      color: ${brand.white};
    }
    
    /* Button */
    .email-btn-wrapper {
      text-align: center;
      margin: 28px 0 8px;
    }
    
    .email-btn {
      display: inline-block;
      padding: 14px 32px;
      border-radius: 10px;
      font-family: ${brand.displayFont};
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.01em;
      text-decoration: none;
      color: ${brand.white};
      text-align: center;
      box-shadow: 0 4px 24px rgba(43,107,255,0.35);
      transition: box-shadow 0.2s;
    }
    
    .email-btn-blue {
      background: ${brand.blueGradient};
    }
    
    .email-btn-red {
      background: ${brand.redGradient};
      box-shadow: 0 4px 24px rgba(217,4,41,0.35);
    }
    
    .email-btn-green {
      background: linear-gradient(135deg, #16A34A, #22C55E);
      box-shadow: 0 4px 24px rgba(34,197,94,0.35);
    }
    
    /* Meta info */
    .email-meta {
      margin-top: 28px;
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    
    .email-meta-text {
      font-family: ${brand.monoFont};
      font-size: 11px;
      color: ${brand.gray2};
      line-height: 1.7;
    }
    
    .email-meta-text a {
      color: ${brand.blue};
      text-decoration: underline;
    }
    
    /* Footer */
    .email-footer {
      padding: 24px 36px;
      background: rgba(0,0,0,0.15);
      border-top: 1px solid rgba(255,255,255,0.06);
      text-align: center;
    }
    
    .email-footer-text {
      font-family: ${brand.monoFont};
      font-size: 11px;
      color: ${brand.gray2};
      line-height: 1.7;
      margin-bottom: 4px;
    }
    
    .email-footer-text strong {
      color: ${brand.gray};
      font-weight: 500;
    }
    
    .email-footer-text a {
      color: ${brand.gray};
      text-decoration: underline;
    }
    
    .email-footer-love {
      font-family: ${brand.monoFont};
      font-size: 10px;
      color: ${brand.gray2};
      margin-top: 12px;
    }
    
    .email-footer-love span {
      color: ${brand.redBright};
    }
    
    /* Divider */
    .email-divider {
      width: 100%;
      height: 1px;
      background: rgba(255,255,255,0.06);
      margin: 24px 0;
    }
    
    /* Spacing utils */
    .mt-16 { margin-top: 16px; }
    .mt-24 { margin-top: 24px; }
    .mb-16 { margin-bottom: 16px; }
    .mb-24 { margin-bottom: 24px; }
    
    /* Responsive */
    @media only screen and (max-width: 480px) {
      .email-bg { padding: 20px 12px; }
      .email-header { padding: 24px 20px; }
      .email-body { padding: 24px 20px; }
      .email-footer { padding: 20px; }
      .email-title { font-size: 22px; }
      .email-logo { font-size: 24px; }
    }
  </style>
</head>
<body>
  <div class="email-bg">
    <div class="email-container">
      ${content}
    </div>
  </div>
</body>
</html>`;
}

// ── Helper: Escape HTML entities ───────────────────────────────────
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Route handler factory ─────────────────────────────────────────
function handler(buildPayload) {
  return async (req, res) => {
    try {
      const payload = buildPayload(req.body);
      await sendEmail(req.app, payload);
      res.json({ success: true });
    } catch (err) {
      console.error('[frNtcOda Email] Route error:', err.message);
      res.status(500).json({ error: err.message || 'Failed to send email' });
    }
  };
}

// ── Shared Footer ─────────────────────────────────────────────────
function emailFooter() {
  return `
    <div class="email-footer">
      <p class="email-footer-text">
        <strong>frNtcOda</strong> — Learn To Code<br>
        <a href="https://frntcoda.onrender.com">frntcoda.onrender.com</a>
      </p>
      <p class="email-footer-love">
        Built with <span>&#10084;</span> for Nigeria's next generation of developers
      </p>
    </div>`;
}

// ── Shared Header ─────────────────────────────────────────────────
function emailHeader({ badge, badgeClass }) {
  return `
    <div class="email-header">
      <div class="email-logo">frNt<span>c</span>Oda</div>
      <div class="email-header-line"></div>
      ${badge ? `<div class="email-badge ${badgeClass || 'badge-blue'}">${escapeHtml(badge)}</div>` : ''}
    </div>`;
}

// ═════════════════════════════════════════════════════════════════
//  ROUTES
// ═════════════════════════════════════════════════════════════════

// ── Tutor Welcome (Application Received) ─────────────────────────
router.post('/tutor-welcome', handler(({ to, toName }) => {
  const name = escapeHtml(toName || 'Tutor');
  return {
    to, toName,
    subject: 'Welcome to frNtcOda – Your Application is Received!',
    html: baseTemplate({
      preview: 'Your tutor application has been received',
      content: `
        ${emailHeader({ badge: 'Tutor Application', badgeClass: 'badge-green' })}
        
        <div class="email-body">
          <h1 class="email-title">Welcome to<br>frNtcOda!</h1>
          <p class="email-greeting">Hi ${name},</p>
          
          <p class="email-text">
            Thank you for applying to become a <strong>tutor</strong> on frNtcOda. We're excited that you want to share your knowledge with our community of learners.
          </p>
          
          <p class="email-text">
            <strong>Your application has been received</strong> and will be reviewed by our team shortly. You'll hear from us soon.
          </p>
          
          <div class="email-info-box">
            <p>
              <strong>What happens next?</strong><br><br>
              <strong>①</strong> We'll review your experience &amp; specialisation<br>
              <strong>②</strong> You'll receive an email when your account is activated<br>
              <strong>③</strong> Log in and start creating courses
            </p>
          </div>
          
          <p class="email-text mt-24">
            If you have any questions, reply to this email or reach out to our support team.
          </p>
          
          <div class="email-meta">
            <p class="email-meta-text">
              Application submitted &mdash; we'll be in touch within 24&ndash;48 hours.
            </p>
          </div>
        </div>
        
        ${emailFooter()}
      `
    }),
  };
}));

// ── Tutor Activated ──────────────────────────────────────────────
router.post('/tutor-activated', handler(({ to, toName }) => {
  const name = escapeHtml(toName || 'Tutor');
  return {
    to, toName,
    subject: "You're Live on frNtcOda! 🎉",
    html: baseTemplate({
      preview: 'Your tutor account is now active',
      content: `
        ${emailHeader({ badge: 'Account Activated', badgeClass: 'badge-green' })}
        
        <div class="email-body">
          <h1 class="email-title">You're Live<br>on frNtcOda! &#x1F389;</h1>
          <p class="email-greeting">Congratulations, ${name}!</p>
          
          <p class="email-text">
            Your tutor account is now <strong>active</strong> on frNtcOda. You can now create and publish courses for students across Nigeria and beyond to discover.
          </p>
          
          <p class="email-text">
            <strong>Here's what you can do now:</strong><br>
            &bull; Create and publish coding courses<br>
            &bull; Upload lessons, exercises, and projects<br>
            &bull; Track your students' progress<br>
            &bull; Earn as you teach
          </p>
          
          <div class="email-btn-wrapper">
            <a href="https://frntcoda.onrender.com/tutor-dashboard.html" class="email-btn email-btn-green">
              Go to Your Dashboard &rarr;
            </a>
          </div>
          
          <div class="email-meta">
            <p class="email-meta-text">
              Welcome aboard! We're thrilled to have you.
            </p>
          </div>
        </div>
        
        ${emailFooter()}
      `
    }),
  };
}));

// ── Course Live ──────────────────────────────────────────────────
router.post('/course-live', handler(({ to, toName, courseTitle, courseUrl }) => {
  const name = escapeHtml(toName || 'Tutor');
  const title = escapeHtml(courseTitle || 'your course');
  return {
    to, toName,
    subject: `Your course "${courseTitle || 'your course'}" is now live!`,
    html: baseTemplate({
      preview: `"${courseTitle || 'Your course'}" has been approved and is now live`,
      content: `
        ${emailHeader({ badge: 'Course Approved', badgeClass: 'badge-green' })}
        
        <div class="email-body">
          <h1 class="email-title">Your Course<br>is Live!</h1>
          <p class="email-greeting">Great news, ${name}!</p>
          
          <p class="email-text">
            <strong>${title}</strong> has been approved and is now visible to students on frNtcOda.
          </p>
          
          <p class="email-text">
            Students can now discover, enroll in, and start learning from your course. Make sure your course content is ready and engaging!
          </p>
          
          ${courseUrl ? `
          <div class="email-btn-wrapper">
            <a href="${escapeHtml(courseUrl)}" class="email-btn email-btn-blue">
              View Your Course &rarr;
            </a>
          </div>
          ` : ''}
          
          <div class="email-info-box">
            <p>
              <strong>Tip:</strong> Share your course link on social media and with your network to attract more students. The more students you reach, the more you earn.
            </p>
          </div>
          
          <div class="email-meta">
            <p class="email-meta-text">
              Course status: <strong style="color: ${brand.green};">Active</strong>
            </p>
          </div>
        </div>
        
        ${emailFooter()}
      `
    }),
  };
}));

// ── Course Rejected ──────────────────────────────────────────────
router.post('/course-rejected', handler(({ to, toName, courseTitle, reason }) => {
  const name = escapeHtml(toName || 'Tutor');
  const title = escapeHtml(courseTitle || 'your course');
  const rejectionReason = escapeHtml(reason || 'The course did not meet our quality guidelines at this time.');
  return {
    to, toName,
    subject: `Update on your course "${courseTitle || 'your course'}"`,
    html: baseTemplate({
      preview: `Your course needs some revisions`,
      content: `
        ${emailHeader({ badge: 'Course Review', badgeClass: 'badge-red' })}
        
        <div class="email-body">
          <h1 class="email-title">Course Review<br>Update</h1>
          <p class="email-greeting">Hi ${name},</p>
          
          <p class="email-text">
            Thank you for submitting <strong>${title}</strong> for review. Unfortunately, it was <strong>not approved</strong> at this time.
          </p>
          
          <div class="email-error-box">
            <p>
              <strong>Reason:</strong><br>
              ${rejectionReason}
            </p>
          </div>
          
          <p class="email-text mt-24">
            <strong>Don't worry</strong> &mdash; you can make the necessary changes and resubmit your course. Here are some common things to check:
          </p>
          
          <p class="email-text">
            &bull; Ensure all lessons have clear, complete content<br>
            &bull; Check that videos or code examples are working<br>
            &bull; Verify that your course description is accurate<br>
            &bull; Make sure the difficulty level is appropriate
          </p>
          
          <p class="email-text">
            If you have questions about this decision or need guidance, reply to this email and our support team will help.
          </p>
          
          <div class="email-meta">
            <p class="email-meta-text">
              You can resubmit your course at any time from your tutor dashboard.
            </p>
          </div>
        </div>
        
        ${emailFooter()}
      `
    }),
  };
}));

// ── Student Enrolled ─────────────────────────────────────────────
router.post('/student-enrolled', handler(({ to, toName, courseTitle, courseUrl }) => {
  const name = escapeHtml(toName || 'Student');
  const title = escapeHtml(courseTitle || 'your course');
  return {
    to, toName,
    subject: `You're enrolled in "${courseTitle || 'your course'}"!`,
    html: baseTemplate({
      preview: `Welcome to "${courseTitle || 'your course'}" — start learning now`,
      content: `
        ${emailHeader({ badge: 'Enrollment Confirmed', badgeClass: 'badge-blue' })}
        
        <div class="email-body">
          <h1 class="email-title">Welcome to<br>Your Course!</h1>
          <p class="email-greeting">Hi ${name},</p>
          
          <p class="email-text">
            You've successfully enrolled in <strong>${title}</strong>. We're excited to have you on this learning journey!
          </p>
          
          <p class="email-text">
            <strong>Here's how to get started:</strong><br>
            &bull; Go to your dashboard to access the course<br>
            &bull; Complete lessons at your own pace<br>
            &bull; Track your progress as you go<br>
            &bull; Earn a certificate when you finish
          </p>
          
          ${courseUrl ? `
          <div class="email-btn-wrapper">
            <a href="${escapeHtml(courseUrl)}" class="email-btn email-btn-blue">
              Start Learning &rarr;
            </a>
          </div>
          ` : ''}
          
          <div class="email-info-box">
            <p>
              <strong>Pro tip:</strong> Set a learning schedule and stick to it. Even 30 minutes a day can make a huge difference in your coding journey.
            </p>
          </div>
          
          <div class="email-meta">
            <p class="email-meta-text">
              Happy coding! &#x1F4BB;
            </p>
          </div>
        </div>
        
        ${emailFooter()}
      `
    }),
  };
}));

// ── Certificate Ready ────────────────────────────────────────────
router.post('/certificate-ready', handler(({ to, toName, courseTitle, certificateUrl }) => {
  const name = escapeHtml(toName || 'Student');
  const title = escapeHtml(courseTitle || 'your course');
  return {
    to, toName,
    subject: `Your certificate for "${courseTitle || 'your course'}" is ready!`,
    html: baseTemplate({
      preview: `Congratulations! Download your certificate for "${courseTitle || 'your course'}"`,
      content: `
        ${emailHeader({ badge: 'Certificate Ready', badgeClass: 'badge-green' })}
        
        <div class="email-body">
          <h1 class="email-title">Certificate<br>Ready! &#x1F3C6;</h1>
          <p class="email-greeting">Congratulations, ${name}!</p>
          
          <p class="email-text">
            You've completed <strong>${title}</strong> and your certificate is ready to download. This is a huge achievement &mdash; be proud of the work you've put in!
          </p>
          
          <p class="email-text">
            <strong>Your certificate includes:</strong><br>
            &bull; Your name and course title<br>
            &bull; Date of completion<br>
            &bull; frNtcOda official seal<br>
            &bull; Unique verification code
          </p>
          
          ${certificateUrl ? `
          <div class="email-btn-wrapper">
            <a href="${escapeHtml(certificateUrl)}" class="email-btn email-btn-green">
              Download Your Certificate &rarr;
            </a>
          </div>
          ` : ''}
          
          <div class="email-info-box">
            <p>
              <strong>Share your achievement!</strong> Post your certificate on LinkedIn, Twitter, or with friends. Tag us <strong>@frntcoda</strong> &mdash; we'd love to celebrate with you!
            </p>
          </div>
          
          <div class="email-meta">
            <p class="email-meta-text">
              Keep learning &mdash; your next course awaits on your dashboard.
            </p>
          </div>
        </div>
        
        ${emailFooter()}
      `
    }),
  };
}));

// ── Password Reset ───────────────────────────────────────────────
router.post('/password-reset', handler(({ to, toName, resetUrl }) => {
  const name = escapeHtml(toName || 'there');
  return {
    to, toName,
    subject: 'Reset your frNtcOda password',
    html: baseTemplate({
      preview: 'Reset your frNtcOda password — link expires in 1 hour',
      content: `
        ${emailHeader({ badge: 'Password Reset', badgeClass: 'badge-blue' })}
        
        <div class="email-body">
          <h1 class="email-title">Reset Your<br>Password</h1>
          <p class="email-greeting">Hi ${name},</p>
          
          <p class="email-text">
            We received a request to reset your <strong>frNtcOda</strong> account password. If you made this request, click the button below to create a new password.
          </p>
          
          ${resetUrl ? `
          <div class="email-btn-wrapper">
            <a href="${escapeHtml(resetUrl)}" class="email-btn email-btn-blue">
              Reset Your Password &rarr;
            </a>
          </div>
          
          <div class="email-warning-box">
            <p>
              <strong>&#x26A0; This link expires in 1 hour.</strong><br>
              If you didn't request a password reset, you can safely ignore this email. Your account is still secure.
            </p>
          </div>
          ` : `
          <div class="email-warning-box">
            <p>
              <strong>Reset link unavailable.</strong> If you requested a password reset, please contact our support team for assistance.
            </p>
          </div>
          `}
          
          <p class="email-text mt-24">
            For account security, we recommend using a strong, unique password that you don't use on other sites.
          </p>
          
          <div class="email-meta">
            <p class="email-meta-text">
              Requested from frNtcOda &mdash; if this wasn't you, no action is needed.
            </p>
          </div>
        </div>
        
        ${emailFooter()}
      `
    }),
  };
}));

module.exports = router;