require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const { Resend } = require('resend');
const { BrevoClient } = require('@getbrevo/brevo');

const app = express();

// ── Provider setup ─────────────────────────────────────────────────
// Set EMAIL_PROVIDER=brevo  to use Brevo (no domain needed, send to anyone)
// Set EMAIL_PROVIDER=resend to use Resend (requires verified domain)
// Defaults to brevo if not set.

const PROVIDER = (process.env.EMAIL_PROVIDER || 'brevo').toLowerCase();

// Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Brevo v2 client — new SDK uses BrevoClient({ apiKey })
const brevoClient = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

// Expose both clients + active provider to routes via app.locals
app.locals.provider   = PROVIDER;
app.locals.resend     = resend;
app.locals.brevo      = brevoClient;
app.locals.FROM_EMAIL = process.env.FROM_EMAIL || 'frNtcOda <frntcoda@gmail.com>';

console.log(`[frNtcOda Email] Provider: ${PROVIDER.toUpperCase()}`);

// ── Allowed origins ────────────────────────────────────────────────
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.json());

// ── Auth middleware ────────────────────────────────────────────────
function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.EMAIL_SERVICE_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ── Health check ───────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    service:  'frNtcOda Email Service',
    status:   'ok',
    provider: PROVIDER,
  });
});

// ── Email routes ───────────────────────────────────────────────────
const emailRoutes = require('./routes/emails');
app.use('/email', requireApiKey, emailRoutes);

// ── 404 ────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// ── Error handler ──────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[frNtcOda Email]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`frNtcOda Email Service running on port ${PORT}`));
