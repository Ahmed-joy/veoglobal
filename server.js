const http = require("http");

const PORT = process.env.PORT || 3000;
const startedAt = new Date();

// DEMO ONLY: hardcoded credentials. Real project-e database + password hashing lagbe.
const DEMO_USER = { email: "demo@example.com", password: "123456", name: "Demo User" };
const SESSION = "demo-session-token";

const STYLE = `
:root{box-sizing:border-box}*,*::before,*::after{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:20px;font-family:"Noto Sans Bengali",system-ui,sans-serif;color:#fff;
background:radial-gradient(ellipse 70% 50% at 60% 70%,#6a4ad8,transparent 70%),linear-gradient(180deg,#1c1046,#3a1f94 55%,#7d68ec);background-color:#1c1046}
.card{width:100%;max-width:400px;padding:34px 30px;border-radius:24px;border:1px solid rgba(255,255,255,.35);position:relative;overflow:hidden;
background:linear-gradient(120deg,rgba(255,255,255,.2),rgba(255,255,255,.05) 40%,rgba(255,255,255,.14));-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);
box-shadow:inset 0 1.5px 1px rgba(255,255,255,.5),0 18px 50px rgba(12,0,60,.45)}
h1{margin:0 0 6px;font-size:28px;font-weight:600}.sub{margin:0 0 24px;color:#e4defa;font-size:15px}
label{display:block;font-size:14px;margin:16px 0 6px}
.field{position:relative}
input{width:100%;padding:13px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.3);background:rgba(20,10,60,.35);color:#fff;font:inherit;font-size:15px;outline:0}
input::placeholder{color:#b9b0e0}input:focus{border-color:#fff;box-shadow:0 0 0 3px rgba(255,255,255,.2)}
.eye{position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:0;color:#e4defa;cursor:pointer;font-size:13px;padding:6px 8px}
.btn{width:100%;margin-top:24px;padding:14px;border:0;border-radius:12px;background:#fff;color:#1c1046;font:inherit;font-weight:600;font-size:16px;cursor:pointer}
.btn:hover{background:#efeaff}.btn:disabled{opacity:.6;cursor:wait}
.btn:focus-visible,.eye:focus-visible,a:focus-visible{outline:3px solid #fff;outline-offset:2px}
.err{margin-top:14px;padding:10px 12px;border-radius:10px;background:rgba(255,80,100,.25);border:1px solid rgba(255,140,150,.6);font-size:14px;display:none}
.hint{margin-top:20px;font-size:13px;color:#d9d2f5;text-align:center;line-height:1.6}
code{background:rgba(255,255,255,.15);padding:1px 7px;border-radius:6px}
a{color:#fff}.row{display:flex;justify-content:space-between;align-items:center;margin-top:14px;font-size:14px}
`;
const HEAD = `<!DOCTYPE html><html lang="bn"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600&display=swap" rel="stylesheet">
<style>${STYLE}</style>`;

const LOGIN_PAGE = HEAD + `<title>লগইন</title></head><body>
<main class="card">
  <h1>স্বাগতম 👋</h1>
  <p class="sub">আপনার অ্যাকাউন্টে লগইন করুন</p>
  <form id="f" novalidate>
    <label for="email">ইমেইল</label>
    <input id="email" type="email" placeholder="you@example.com" autocomplete="email" required>
    <label for="pw">পাসওয়ার্ড</label>
    <div class="field">
      <input id="pw" type="password" placeholder="••••••" autocomplete="current-password" required>
      <button class="eye" type="button" id="eye">দেখান</button>
    </div>
    <div class="row"><label style="margin:0"><input type="checkbox" style="width:auto"> মনে রাখুন</label><a href="#">পাসওয়ার্ড ভুলে গেছেন?</a></div>
    <div class="err" id="err" role="alert"></div>
    <button class="btn" id="btn" type="submit">লগইন করুন</button>
  </form>
  <p class="hint">ডেমো: <code>demo@example.com</code> / <code>123456</code></p>
</main>
<script>
var f=document.getElementById("f"),err=document.getElementById("err"),btn=document.getElementById("btn"),pw=document.getElementById("pw");
document.getElementById("eye").onclick=function(){var s=pw.type==="password";pw.type=s?"text":"password";this.textContent=s?"লুকান":"দেখান"};
f.onsubmit=function(e){
  e.preventDefault();err.style.display="none";
  var email=document.getElementById("email").value.trim(),p=pw.value;
  if(!email||!p){err.textContent="ইমেইল ও পাসওয়ার্ড দিন";err.style.display="block";return}
  btn.disabled=true;btn.textContent="অপেক্ষা করুন...";
  fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email,password:p})})
  .then(function(r){return r.json().then(function(d){return{ok:r.ok,d:d}})})
  .then(function(x){if(x.ok){location.href="/dashboard"}else{throw new Error(x.d.error||"লগইন ব্যর্থ")}})
  .catch(function(ex){err.textContent=ex.message;err.style.display="block";btn.disabled=false;btn.textContent="লগইন করুন"});
};
</script></body></html>`;

const dashboard = () => HEAD + `<title>ড্যাশবোর্ড</title></head><body>
<main class="card" style="text-align:center">
  <h1>✅ লগইন সফল!</h1>
  <p class="sub">হ্যালো, ${DEMO_USER.name}। এটি একটি ডেমো ড্যাশবোর্ড।</p>
  <a class="btn" href="/logout" style="display:block;text-decoration:none;margin-top:10px">লগআউট</a>
</main></body></html>`;

function send(res, code, type, body, headers = {}) {
  res.writeHead(code, { "Content-Type": type, ...headers });
  res.end(body);
}
const json = (res, code, obj, h) => send(res, code, "application/json", JSON.stringify(obj), h);
const isLoggedIn = (req) => (req.headers.cookie || "").split(";").some((c) => c.trim() === "session=" + SESSION);

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  if (url === "/health") return json(res, 200, { status: "ok" });
  if (url === "/api/info")
    return json(res, 200, {
      message: "Hello from Railway!",
      node: process.version,
      env: process.env.RAILWAY_ENVIRONMENT_NAME || "local",
      startedAt: startedAt.toISOString(),
    });

  if (req.method === "POST" && url === "/api/login") {
    let raw = "";
    req.on("data", (c) => { raw += c; if (raw.length > 5000) req.destroy(); });
    req.on("end", () => {
      let b = {};
      try { b = JSON.parse(raw); } catch (e) {}
      if (b.email === DEMO_USER.email && b.password === DEMO_USER.password) {
        const secure = req.headers["x-forwarded-proto"] === "https" ? "; Secure" : "";
        return json(res, 200, { ok: true }, { "Set-Cookie": `session=${SESSION}; HttpOnly; Path=/; SameSite=Lax; Max-Age=3600${secure}` });
      }
      json(res, 401, { error: "ইমেইল বা পাসওয়ার্ড ভুল" });
    });
    return;
  }

  if (url === "/logout") return send(res, 302, "text/plain", "", { Location: "/login", "Set-Cookie": "session=; Path=/; Max-Age=0" });
  if (url === "/dashboard") return isLoggedIn(req) ? send(res, 200, "text/html; charset=utf-8", dashboard()) : send(res, 302, "text/plain", "", { Location: "/login" });
  if (url === "/login" || url === "/") return isLoggedIn(req) ? send(res, 302, "text/plain", "", { Location: "/dashboard" }) : send(res, 200, "text/html; charset=utf-8", LOGIN_PAGE);

  send(res, 404, "text/plain; charset=utf-8", "404 Not Found");
});

server.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
