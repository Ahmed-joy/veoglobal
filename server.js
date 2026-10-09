'use strict';
process.env.TZ = process.env.APP_TIMEZONE || process.env.TZ || 'Asia/Dhaka';
try { require('dotenv').config(); } catch (e) { /* dotenv optional (Railway injects env vars) */ }

const path = require('path');
const crypto = require('crypto');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const multer = require('multer');

const db = require('./lib/db');
const { renderPage } = require('./lib/view');
const buildLocals = require('./lib/locals');
const { loadUser } = require('./lib/auth');
const { UPLOAD_DIR } = require('./lib/http');

const app = express();
const PROD = process.env.NODE_ENV === 'production';
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use((req, res, next) => {
  res.set({ 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'SAMEORIGIN', 'Referrer-Policy': 'strict-origin-when-cross-origin' });
  next();
});

// static files
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets'), { maxAge: PROD ? '7d' : 0 }));
app.use('/storage', express.static(UPLOAD_DIR));
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// body parsing (multer handles multipart in memory; handlers decide whether to save the file)
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.json({ limit: '1mb' }));
app.use(multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024, files: 3 } }).any());
app.use((req, res, next) => { req.fileMap = {}; for (const f of req.files || []) req.fileMap[f.fieldname] = f; next(); });

// sessions (stored in MySQL table `node_sessions`)
const secret = process.env.SESSION_SECRET || process.env.APP_KEY;
if (!secret) { console.error('SESSION_SECRET (or APP_KEY) must be set'); process.exit(1); }
app.use(session({
  name: 'rawas_session',
  secret,
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore({ createDatabaseTable: true, schema: { tableName: 'node_sessions' }, clearExpired: true, expiration: 7 * 24 * 3600 * 1000 }, db.callbackPool()),
  cookie: { httpOnly: true, sameSite: 'lax', secure: 'auto', maxAge: 2 * 3600 * 1000 },
}));

app.use(loadUser);

// HTML forms send _method=PUT/DELETE
app.use((req, res, next) => {
  const m = req.body && typeof req.body._method === 'string' && req.body._method.toUpperCase();
  if (req.method === 'POST' && ['PUT', 'PATCH', 'DELETE'].includes(m)) req.method = m;
  next();
});

// CSRF
app.use((req, res, next) => {
  if (!req.session.csrf) req.session.csrf = crypto.randomBytes(24).toString('hex');
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const t = String((req.body && req.body._csrf) || req.get('x-csrf-token') || req.get('x-xsrf-token') || '');
  const ok = t.length === req.session.csrf.length && crypto.timingSafeEqual(Buffer.from(t), Buffer.from(req.session.csrf));
  if (ok) return next();
  res.status(419).send('Page expired (CSRF token mismatch). Please go back, refresh the page and try again.');
});

// flash messages + res.view()
app.use((req, res, next) => {
  req._flash = req.session.flash || {};
  delete req.session.flash;
  res.view = (name, data = {}) => res.type('html').send(renderPage(name, Object.assign(buildLocals(req), data)));
  next();
});

app.get('/', (req, res) => res.redirect('/client/login'));
app.use(require('./routes/auth'));
app.use(require('./routes/admin'));
app.use(require('./routes/client'));

app.use((req, res) => res.status(404).type('html').send('<h2 style="font-family:sans-serif;padding:2rem">404 - Page not found</h2>'));
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  if (status >= 500) console.error(err);
  const msg = status >= 500 && PROD ? 'Server error' : err.message;
  if (req.xhr || (req.get('accept') || '').includes('json')) return res.status(status).json({ success: false, message: msg });
  res.status(status).type('html').send(`<h2 style="font-family:sans-serif;padding:2rem">${status} - ${String(msg).replace(/</g, '&lt;')}</h2>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`RAWAS listening on port ${PORT}`));
module.exports = app;
