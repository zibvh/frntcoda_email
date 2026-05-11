// ── Shared layout wrapper ──────────────────────────────────────────
function layout(headerColor, badgeText, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',sans-serif;background:#060D2B;padding:20px;}
  .wrap{max-width:600px;margin:0 auto;background:#0D1845;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);}
  .hdr{background:${headerColor};padding:36px 30px;text-align:center;}
  .logo{font-size:30px;font-weight:800;letter-spacing:-0.02em;color:#fff;margin-bottom:12px;}
  .logo span{color:#FFD600;}
  .badge{display:inline-block;background:rgba(255,255,255,0.18);padding:7px 18px;border-radius:100px;font-size:13px;color:#fff;font-weight:500;}
  .body{padding:36px 32px;}
  .greeting{font-size:26px;font-weight:700;color:#fff;margin-bottom:14px;line-height:1.3;}
  .name{color:#FF6B6B;}
  .msg{color:#8892B0;line-height:1.75;margin-bottom:24px;font-size:15px;}
  .cta{display:block;width:100%;text-align:center;background:linear-gradient(135deg,#D90429,#FF0A35);color:#fff !important;text-decoration:none;padding:14px 24px;border-radius:12px;font-weight:600;font-size:15px;margin:18px 0;box-shadow:0 4px 14px rgba(217,4,41,0.3);}
  .card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:18px 20px;margin-bottom:22px;}
  .card-title{font-size:15px;font-weight:600;color:#fff;margin-bottom:10px;}
  .card ul{list-style:none;padding:0;}
  .card ul li{color:#8892B0;padding:6px 0 6px 22px;position:relative;font-size:13px;line-height:1.6;border-bottom:1px solid rgba(255,255,255,0.04);}
  .card ul li:last-child{border-bottom:none;}
  .card ul li::before{content:'✓';position:absolute;left:0;color:#22C55E;font-weight:700;}
  .pill{display:inline-block;padding:5px 15px;border-radius:100px;font-size:12px;font-weight:600;margin-bottom:22px;}
  .pill-green{background:rgba(34,197,94,0.15);color:#22C55E;border:1px solid rgba(34,197,94,0.3);}
  .pill-blue{background:rgba(43,107,255,0.15);color:#2B6BFF;border:1px solid rgba(43,107,255,0.3);}
  .pill-amber{background:rgba(245,158,11,0.15);color:#F59E0B;border:1px solid rgba(245,158,11,0.3);}
  .steps{margin-bottom:22px;}
  .step{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04);}
  .step:last-child{border-bottom:none;}
  .step-num{width:24px;height:24px;border-radius:50%;background:rgba(217,4,41,0.2);border:1px solid rgba(217,4,41,0.4);color:#FF6B6B;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
  .step-body{color:#8892B0;font-size:13px;line-height:1.6;}
  .step-body strong{color:#fff;}
  .fee{background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.05));border:1px solid rgba(245,158,11,0.25);border-radius:14px;padding:20px;margin-bottom:22px;text-align:center;}
  .fee-amt{font-size:34px;font-weight:800;color:#F59E0B;margin-bottom:4px;}
  .fee-lbl{color:#8892B0;font-size:12px;}
  .fee-note{font-size:11px;color:rgba(245,158,11,0.6);margin-top:6px;}
  .highlight{background:linear-gradient(135deg,rgba(43,107,255,0.1),rgba(43,107,255,0.05));border:1px solid rgba(43,107,255,0.2);border-radius:14px;padding:20px;margin-bottom:22px;text-align:center;}
  .highlight-val{font-size:28px;font-weight:800;color:#2B6BFF;margin-bottom:4px;}
  .highlight-lbl{color:#8892B0;font-size:13px;}
  .ftr{background:rgba(0,0,0,0.2);padding:22px 32px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);}
  .ftr-txt{color:#4A5578;font-size:12px;line-height:1.7;}
  .ftr-txt a{color:#2B6BFF;text-decoration:none;}
</style>
</head>
<body>
<div class="wrap">
  <div class="hdr" style="background:${headerColor};">
    <div class="logo">frNt<span>c</span>Oda</div>
    <div class="badge">${badgeText}</div>
  </div>
  <div class="body">
    ${body}
  </div>
  <div class="ftr">
    <div class="ftr-txt">
      <strong style="color:#6A7598;">frNtcOda — Learn To Code</strong><br>
      Building Nigeria's tech future, one developer at a time.<br><br>
      <a href="https://frntcoda.onrender.com/terms.html">Terms</a> &nbsp;&bull;&nbsp;
      <a href="https://frntcoda.onrender.com/privacy.html">Privacy</a> &nbsp;&bull;&nbsp;
      <a href="mailto:frntcoda@gmail.com">Support</a><br><br>
      &copy; ${new Date().getFullYear()} frNtcOda. Nigeria.
    </div>
  </div>
</div>
</body>
</html>`;
}

// ── 1. Tutor Welcome (apply → pay activation fee) ──────────────────
exports.tutorWelcome = ({ toName, dashboardUrl }) => layout(
  'linear-gradient(135deg,#8B0000,#D90429,#FF0A35)',
  'Tutor Application Received!',
  `<div class="greeting">Welcome, <span class="name">${toName}</span>!</div>
  <div class="pill pill-green">Tutor Account</div>
  <div class="msg">Thank you for applying to become a tutor at <strong style="color:#fff;">frNtcOda</strong>. Your expertise will help shape the next generation of Nigerian tech talent. Here's what to do next.</div>
  <div class="fee">
    <div class="fee-amt">&#8358;1,000</div>
    <div class="fee-lbl">One-time activation fee</div>
    <div class="fee-note">Pay to instantly activate your account — no waiting for admin</div>
  </div>
  <div class="card">
    <div class="card-title">Your Next Steps</div>
    <div class="steps">
      <div class="step"><div class="step-num">1</div><div class="step-body"><strong>Log in</strong> to your tutor dashboard below</div></div>
      <div class="step"><div class="step-num">2</div><div class="step-body"><strong>Pay the &#8358;1,000 activation fee</strong> via Paystack — your account activates instantly</div></div>
      <div class="step"><div class="step-num">3</div><div class="step-body"><strong>Build &amp; submit your first course</strong> — it goes live within 24–26 hours</div></div>
      <div class="step"><div class="step-num">4</div><div class="step-body"><strong>Start earning!</strong> You keep 91.5% of every course sale</div></div>
    </div>
  </div>
  <a href="${dashboardUrl}" class="cta">Complete Activation &rarr;</a>
  <div class="card" style="margin-bottom:0;">
    <div class="card-title">What you get as a tutor</div>
    <ul>
      <li>91.5% revenue share on all course sales</li>
      <li>50/50 split on certificate fees</li>
      <li>Automatic payouts</li>
      <li>Courses go live within 24–26 hours of submission</li>
    </ul>
  </div>
  <div style="margin-top:22px;" class="msg">Questions? <a href="mailto:frntcoda@gmail.com" style="color:#3B7FFF;">frntcoda@gmail.com</a></div>`
);

// ── 2. Tutor Activated (after ₦1,000 payment) ─────────────────────
exports.tutorActivated = ({ toName }) => layout(
  'linear-gradient(135deg,#064E3B,#059669,#34D399)',
  'Account Activated! 🎉',
  `<div class="greeting">You're live, <span class="name">${toName}</span>!</div>
  <div class="pill pill-green">Active Tutor</div>
  <div class="msg">Your frNtcOda tutor account is now <strong style="color:#fff;">fully active</strong>. You can start building and publishing courses right away.</div>
  <div class="highlight">
    <div class="highlight-val">91.5%</div>
    <div class="highlight-lbl">Your revenue share on every course sale</div>
  </div>
  <div class="card">
    <div class="card-title">Get started</div>
    <ul>
      <li>Head to your dashboard and click <strong>Build Course</strong></li>
      <li>Add lessons, assignments, and exams</li>
      <li>Submit — your course goes live within 24–26 hours</li>
      <li>Link your Paystack subaccount to receive payouts</li>
    </ul>
  </div>
  <a href="https://frntcoda.onrender.com/tutor-dashboard.html" class="cta">Go to Dashboard &rarr;</a>`
);

// ── 3. Course Live ─────────────────────────────────────────────────
exports.courseLive = ({ toName, courseTitle, courseUrl }) => layout(
  'linear-gradient(135deg,#1A4FD8,#2B6BFF,#60A5FA)',
  'Your Course is Live! 🚀',
  `<div class="greeting">Great news, <span class="name">${toName}</span>!</div>
  <div class="pill pill-blue">Course Published</div>
  <div class="msg">Your course <strong style="color:#fff;">"${courseTitle}"</strong> has been reviewed and is now <strong style="color:#22C55E;">live on frNtcOda</strong>. Students can find and enroll in it right now.</div>
  <div class="highlight">
    <div class="highlight-val" style="color:#22C55E;">Live</div>
    <div class="highlight-lbl">${courseTitle}</div>
  </div>
  <div class="card">
    <div class="card-title">What's next</div>
    <ul>
      <li>Share your course link to start getting enrollments</li>
      <li>Monitor students and earnings from your dashboard</li>
      <li>Make sure your Paystack subaccount is linked for payouts</li>
      <li>Keep building more courses to grow your income</li>
    </ul>
  </div>
  <a href="${courseUrl}" class="cta">View Your Course &rarr;</a>`
);

// ── 4. Course Rejected ─────────────────────────────────────────────
exports.courseRejected = ({ toName, courseTitle, reason }) => layout(
  'linear-gradient(135deg,#7F1D1D,#DC2626,#F87171)',
  'Course Update',
  `<div class="greeting">Hi <span class="name">${toName}</span>,</div>
  <div class="pill" style="background:rgba(239,68,68,0.15);color:#F87171;border:1px solid rgba(239,68,68,0.3);">Needs Revision</div>
  <div class="msg">Your course <strong style="color:#fff;">"${courseTitle}"</strong> wasn't approved in its current form. Don't worry — you can revise and resubmit from your dashboard.</div>
  <div class="card">
    <div class="card-title">Reason</div>
    <p style="color:#8892B0;font-size:13px;line-height:1.7;margin:0;">${reason}</p>
  </div>
  <div class="card" style="margin-bottom:22px;">
    <div class="card-title">What to do</div>
    <ul>
      <li>Review the reason above and update your course content</li>
      <li>Make sure your lessons are clear and well-structured</li>
      <li>Resubmit from the <strong>My Courses</strong> tab — it'll go live within 24–26 hours once approved</li>
    </ul>
  </div>
  <a href="https://frntcoda.onrender.com/tutor-dashboard.html" class="cta">Revise &amp; Resubmit &rarr;</a>
  <div class="msg" style="font-size:13px;">Need help? <a href="mailto:frntcoda@gmail.com" style="color:#3B7FFF;">frntcoda@gmail.com</a></div>`
);

// ── 5. Student Enrolled ────────────────────────────────────────────
exports.studentEnrolled = ({ toName, courseTitle, tutorName, dashboardUrl }) => layout(
  'linear-gradient(135deg,#1A4FD8,#2B6BFF,#60A5FA)',
  'Enrollment Confirmed!',
  `<div class="greeting">You're in, <span class="name">${toName}</span>!</div>
  <div class="pill pill-blue">Enrollment Confirmed</div>
  <div class="msg">You've successfully enrolled in <strong style="color:#fff;">"${courseTitle}"</strong> taught by <strong style="color:#fff;">${tutorName}</strong>. Your learning journey starts now!</div>
  <div class="card">
    <div class="card-title">Getting started</div>
    <ul>
      <li>Go to your student dashboard to access course content</li>
      <li>Complete all lessons to unlock the final exam</li>
      <li>Pass the exam to earn your verified certificate</li>
      <li>Download and share your certificate on LinkedIn</li>
    </ul>
  </div>
  <a href="${dashboardUrl}" class="cta">Start Learning &rarr;</a>`
);

// ── 6. Certificate Ready ───────────────────────────────────────────
exports.certificateReady = ({ toName, courseTitle, certificateUrl }) => layout(
  'linear-gradient(135deg,#854D0E,#D97706,#FCD34D)',
  'Certificate Ready! 🏆',
  `<div class="greeting">Congratulations, <span class="name">${toName}</span>!</div>
  <div class="pill pill-amber">Certificate Issued</div>
  <div class="msg">You've completed <strong style="color:#fff;">"${courseTitle}"</strong> and your verified certificate is ready. This certificate is proof of your skills — share it with the world!</div>
  <div class="highlight" style="background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.05));border-color:rgba(245,158,11,0.25);">
    <div class="highlight-val" style="color:#F59E0B;">🏆</div>
    <div class="highlight-lbl" style="color:#F59E0B;font-weight:600;">${courseTitle}</div>
  </div>
  <div class="card">
    <div class="card-title">What to do with your certificate</div>
    <ul>
      <li>Download your certificate from your student dashboard</li>
      <li>Add it to your LinkedIn profile</li>
      <li>Share it with employers or clients as proof of your skills</li>
      <li>Enroll in another course to keep growing</li>
    </ul>
  </div>
  ${certificateUrl ? `<a href="${certificateUrl}" class="cta" style="background:linear-gradient(135deg,#92400E,#D97706);">Download Certificate &rarr;</a>` : `<a href="https://frntcoda.onrender.com/student-dashboard.html" class="cta" style="background:linear-gradient(135deg,#92400E,#D97706);">View in Dashboard &rarr;</a>`}`
);

// ── 7. Password Reset ──────────────────────────────────────────────
exports.passwordReset = ({ toName, resetUrl }) => layout(
  'linear-gradient(135deg,#1E1B4B,#3730A3,#6366F1)',
  'Password Reset Request',
  `<div class="greeting">Hi <span class="name">${toName}</span>,</div>
  <div class="pill pill-blue">Security</div>
  <div class="msg">We received a request to reset your frNtcOda password. Click the button below to set a new one. This link expires in <strong style="color:#fff;">1 hour</strong>.</div>
  <a href="${resetUrl}" class="cta" style="background:linear-gradient(135deg,#3730A3,#6366F1);">Reset My Password &rarr;</a>
  <div class="msg" style="font-size:13px;margin-bottom:0;">If you didn't request this, you can safely ignore this email. Your account is secure.<br><br>
  Having trouble? <a href="mailto:frntcoda@gmail.com" style="color:#3B7FFF;">frntcoda@gmail.com</a></div>`
);

// ── 8. Student Welcome ─────────────────────────────────────────────
exports.studentWelcome = ({ toName, dashboardUrl }) => layout(
  'linear-gradient(135deg,#1A4FD8,#2B6BFF,#60A5FA)',
  'Welcome to frNtcOda!',
  `<div class="greeting">Welcome, <span class="name">${toName}</span>!</div>
  <div class="pill pill-blue">Student Account</div>
  <div class="msg">You've just joined <strong style="color:#fff;">frNtcOda</strong> — No1 home for tech education. You're now ready to learn, grow, and earn verified certificates that prove your skills.</div>
  <div class="highlight">
    <div class="highlight-val">🚀</div>
    <div class="highlight-lbl">Thousands of courses. Real skills. Verified certificates.</div>
  </div>
  <div class="card">
    <div class="card-title">Get started in 3 steps</div>
    <div class="steps">
      <div class="step"><div class="step-num">1</div><div class="step-body"><strong>Browse courses</strong> — find something you want to learn</div></div>
      <div class="step"><div class="step-num">2</div><div class="step-body"><strong>Enroll and learn</strong> — complete lessons at your own pace</div></div>
      <div class="step"><div class="step-num">3</div><div class="step-body"><strong>Pass the exam</strong> and earn your verified certificate</div></div>
    </div>
  </div>
  <a href="${dashboardUrl}" class="cta">Go to Dashboard &rarr;</a>
  <div class="card" style="margin-bottom:0;">
    <div class="card-title">Why frNtcOda?</div>
    <ul>
      <li>Courses built by Nigerian tech professionals</li>
      <li>Verified certificates you can share on LinkedIn</li>
      <li>Learn at your own pace — no deadlines</li>
      <li>Affordable pricing in Naira — no forex stress</li>
      <li>Support at frntcoda@gmail.com</li>
    </ul>
  </div>`
);

// ── 9. Tutor Payment Notification ─────────────────────────────────
exports.tutorPaymentNotification = ({ toName, studentName, courseName, paymentType, amount, tutorShare, platformFee, courseLink }) => layout(
  'linear-gradient(135deg,#064E3B,#059669,#34D399)',
  'New Payment!',
  `<div class="greeting">You made a sale, <span class="name">${toName}</span>!</div>
  <div class="pill pill-green">${paymentType || 'Course Enrollment'}</div>
  <div class="msg"><strong style="color:#fff;">${studentName}</strong> just ${paymentType === 'Certificate Unlock' ? 'unlocked their certificate for' : 'enrolled in'} <strong style="color:#fff;">"${courseName}"</strong>.</div>
  <div class="fee" style="background:linear-gradient(135deg,rgba(34,197,94,.12),rgba(34,197,94,.05));border-color:rgba(34,197,94,.25);">
    <div class="fee-amt" style="color:#22C55E;">${tutorShare}</div>
    <div class="fee-lbl">Your share</div>
    <div class="fee-note">Total paid: ${amount} &mdash; Platform fee: ${platformFee}</div>
  </div>
  <div class="card">
    <div class="card-title">Payment details</div>
    <ul>
      <li>Student: <strong style="color:#fff;">${studentName}</strong></li>
      <li>Course: <strong style="color:#fff;">${courseName}</strong></li>
      <li>Type: <strong style="color:#fff;">${paymentType || 'Course Enrollment'}</strong></li>
      <li>Total paid by student: <strong style="color:#fff;">${amount}</strong></li>
      <li>Your earnings: <strong style="color:#22C55E;">${tutorShare}</strong></li>
      <li>Platform fee: <strong style="color:#fff;">${platformFee}</strong></li>
    </ul>
  </div>
  <a href="${courseLink || 'https://frntcoda.onrender.com/tutor-dashboard.html'}" class="cta" style="background:linear-gradient(135deg,#059669,#34D399);">View in Dashboard &rarr;</a>`
);

// ── 10. Submission Notification (to tutor) ─────────────────────────
exports.submissionNotification = ({ toName, studentName, examTitle, theoryAnswer, fileUrl, objScore }) => layout(
  'linear-gradient(135deg,#1E1B4B,#3730A3,#6366F1)',
  'New Submission to Review',
  `<div class="greeting">New submission, <span class="name">${toName}</span>!</div>
  <div class="pill pill-blue">Exam / Assignment</div>
  <div class="msg"><strong style="color:#fff;">${studentName}</strong> submitted answers for <strong style="color:#fff;">"${examTitle}"</strong> and is awaiting your review.</div>
  <div class="card">
    <div class="card-title">Submission summary</div>
    <ul>
      <li>Student: <strong style="color:#fff;">${studentName}</strong></li>
      <li>Exam/Lesson: <strong style="color:#fff;">${examTitle}</strong></li>
      ${objScore !== '(not required)' ? `<li>Objective score: <strong style="color:#22C55E;">${objScore}</strong></li>` : ''}
      ${theoryAnswer !== '(not required)' ? `<li>Theory answer submitted: <strong style="color:#fff;">Yes</strong></li>` : ''}
      ${fileUrl && fileUrl !== '(not required)' ? `<li>File submitted: <a href="${fileUrl}" style="color:#2B6BFF;">View file</a></li>` : ''}
    </ul>
  </div>
  <a href="https://frntcoda.onrender.com/tutor-dashboard.html" class="cta" style="background:linear-gradient(135deg,#3730A3,#6366F1);">Review Submission &rarr;</a>`
);
