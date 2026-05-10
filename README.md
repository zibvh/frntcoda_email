# frNtcOda Email Service

Transactional email microservice for frNtcOda, built with Express + Resend.  
Deploys as a free Web Service on Render.

---

## Email Types

| Endpoint | Trigger | Required fields |
|---|---|---|
| `POST /email/tutor-welcome` | Tutor signs up | `to`, `toName`, `dashboardUrl` |
| `POST /email/tutor-activated` | Tutor pays ₦1,000 fee | `to`, `toName` |
| `POST /email/course-live` | Course approved & live | `to`, `toName`, `courseTitle`, `courseUrl` |
| `POST /email/course-rejected` | Course rejected by admin | `to`, `toName`, `courseTitle`, `reason` |
| `POST /email/student-enrolled` | Student pays for a course | `to`, `toName`, `courseTitle`, `tutorName`, `dashboardUrl` |
| `POST /email/certificate-ready` | Certificate issued | `to`, `toName`, `courseTitle`, `certificateUrl` |
| `POST /email/password-reset` | Password reset requested | `to`, `toName`, `resetUrl` |

All requests require the header: `x-api-key: YOUR_EMAIL_SERVICE_API_KEY`

---

## Setup

### 1. Get a Resend API key
1. Go to [resend.com](https://resend.com) and create a free account
2. Create an API key → copy it
3. Free tier: **3,000 emails/month, 100/day** — more than enough to start

### 2. Domain setup (for production)
- In Resend → Domains → Add domain → add `frntcoda.com`
- Add the DNS records Resend gives you to your domain registrar
- Once verified, you can send from `noreply@frntcoda.com`

> **For testing without a domain:** Change `FROM_EMAIL` in `.env` to `onboarding@resend.dev`  
> (Resend's shared test domain — works immediately, no DNS needed)

### 3. Local setup
```bash
git clone <your-repo>
cd frntcoda-email-service
npm install
cp .env.example .env
# Fill in .env values
npm run dev
```

### 4. Deploy to Render (free)
1. Push this folder to a GitHub repo
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your repo
4. Settings:
   - **Environment:** Node
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Instance type:** Free
5. Add environment variables (from `.env.example`) under **Environment**
6. Deploy — you'll get a URL like `https://frntcoda-email.onrender.com`

### 5. Update email-client.js
Change `BASE_URL` in `email-client.js` to your Render URL, then include it in your HTML pages:
```html
<script src="email-client.js"></script>
```

---

## Usage in your frontend

```javascript
// After tutor pays registration fee — in tutor-dashboard.html
try {
  await FrntEmail.tutorActivated({
    to:     user.email,
    toName: tutorProfile.fullName || tutorProfile.firstName
  });
} catch (e) {
  console.warn('Email failed (non-critical):', e.message);
}

// After student enrolls — in student-dashboard.html or courses.html
await FrntEmail.studentEnrolled({
  to:           studentEmail,
  toName:       studentName,
  courseTitle:  course.title,
  tutorName:    course.tutorName,
  dashboardUrl: 'https://frntcoda.onrender.com/student-dashboard.html'
});

// After admin approves a course — in admin-dashboard.html
await FrntEmail.courseLive({
  to:          tutorEmail,
  toName:      tutorName,
  courseTitle: course.title,
  courseUrl:   'https://frntcoda.onrender.com/courses.html'
});
```

> **Tip:** Always wrap email calls in try/catch — a failed email should never block a payment or enrollment flow.

---

## Security
- All endpoints require `x-api-key` header — keep this secret, server-side only
- CORS is locked to your allowed origins
- No email addresses or content are logged
