
const http = require("node:http");

const PORT = Number(process.env.PORT) || 3000;

const html = `
<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#170b28">
<title>ARU ❤️ My Forever Love</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">

<style>
:root {
  --pink:#ff66a6;
  --rose:#ff95bd;
  --gold:#ffe0a1;
  --white:#fff5fb;
  --muted:#c9b8d6;
  --glass:rgba(255,255,255,.075);
}

* {box-sizing:border-box}

html {scroll-behavior:smooth}

body {
  margin:0;
  background:#170b28;
  background-image:
    radial-gradient(ellipse at 50% 5%,#642c62 0%,transparent 40%),
    radial-gradient(ellipse at 10% 70%,#3c214e 0%,transparent 45%),
    linear-gradient(160deg,#170b28,#25112f 55%,#14091f);
  color:var(--white);
  font-family:"Hind Siliguri",sans-serif;
  min-height:100vh;
  overflow-x:hidden;
}

button,input {font:inherit}

button {cursor:pointer}

button:focus-visible,input:focus-visible {
  outline:3px solid var(--gold);
  outline-offset:4px;
}

#stars,#particles {
  position:fixed;
  inset:0;
  pointer-events:none;
  overflow:hidden;
}

#stars {z-index:0}
#particles {z-index:20}

.star {
  position:absolute;
  width:2px;
  height:2px;
  border-radius:50%;
  background:white;
  animation:twinkle 3s infinite alternate;
}

@keyframes twinkle {
  from {opacity:.15;transform:scale(.5)}
  to {opacity:1;transform:scale(1.7)}
}

.particle {
  position:absolute;
  bottom:-60px;
  animation:rise linear forwards;
  pointer-events:none;
}

@keyframes rise {
  0% {transform:translateY(0) rotate(0);opacity:0}
  12% {opacity:1}
  85% {opacity:1}
  100% {transform:translateY(-115vh) rotate(40deg);opacity:0}
}

nav {
  position:relative;
  z-index:5;
  display:flex;
  align-items:center;
  justify-content:space-between;
  max-width:1100px;
  margin:auto;
  padding:25px 22px;
}

.logo {
  font-family:"Playfair Display",serif;
  font-size:24px;
  color:var(--rose);
  font-weight:700;
}

.music-btn {
  border:1px solid #ffffff40;
  background:#ffffff12;
  color:white;
  border-radius:30px;
  padding:10px 17px;
}

main {
  position:relative;
  z-index:2;
  max-width:950px;
  margin:auto;
  padding:0 20px 90px;
}

.hero {
  text-align:center;
  padding:95px 5px 80px;
}

.eyebrow {
  letter-spacing:4px;
  text-transform:uppercase;
  font-family:Arial,sans-serif;
  color:var(--gold);
  font-size:11px;
  font-weight:bold;
}

.moon {
  display:flex;
  align-items:center;
  justify-content:center;
  margin:0 auto 40px;
  width:105px;
  height:105px;
  font-size:55px;
  border-radius:50%;
  background:radial-gradient(circle,#ffbadb35,#ffffff08);
  box-shadow:0 0 90px #ff72b050;
  animation:float 4s ease-in-out infinite;
}

@keyframes float {
  50% {transform:translateY(-14px)}
}

h1,h2,h3 {margin-top:0}

h1 {
  font-family:"Playfair Display",serif;
  font-size:clamp(52px,10vw,105px);
  line-height:1.15;
  margin:25px 0 20px;
  background:linear-gradient(120deg,#ffffff,#ff94bb,#ffdbaa);
  color:transparent;
  background-clip:text;
  -webkit-background-clip:text;
  text-shadow:0 15px 70px #ff509a35;
}

.hero p {
  color:#f0d4e5;
  font-size:clamp(17px,3vw,23px);
  line-height:1.9;
}

.type-line {
  color:var(--gold);
  min-height:30px;
  margin:20px 0 35px;
}

.btn {
  border:0;
  border-radius:50px;
  padding:15px 27px;
  transition:transform .25s,box-shadow .25s;
  font-size:15px;
  font-weight:700;
  margin:7px;
}

.btn:hover {
  transform:translateY(-3px);
}

.primary {
  background:linear-gradient(110deg,#ff4c94,#ff8baf);
  color:#fff;
  box-shadow:0 10px 35px #ff4c9455;
}

.outline {
  background:#ffffff10;
  color:white;
  border:1px solid #ffffff55;
}

.gold {
  color:#29102d;
  background:linear-gradient(110deg,#ffe6aa,#f2bd78);
}

section {
  margin:70px 0;
  scroll-margin-top:30px;
}

.section-title {
  text-align:center;
  font-family:"Playfair Display",serif;
  font-size:clamp(30px,5vw,45px);
  color:#ffb5d5;
  margin-bottom:12px;
}

.section-sub {
  text-align:center;
  color:var(--muted);
  margin-bottom:35px;
  line-height:1.8;
}

.glass {
  background:var(--glass);
  border:1px solid #ffffff20;
  border-radius:27px;
  box-shadow:0 20px 60px #00000022;
  backdrop-filter:blur(18px);
  padding:35px;
}

.center {text-align:center}

.envelope {
  width:min(280px,85%);
  height:175px;
  margin:30px auto;
  position:relative;
  background:linear-gradient(145deg,#ffb4ca,#e96e9c);
  border-radius:8px;
  box-shadow:0 20px 50px #0004;
  cursor:pointer;
  transition:transform .4s;
  border:0;
  display:block;
}

.envelope:hover {transform:translateY(-8px)}

.envelope:before {
  content:"";
  position:absolute;
  inset:0;
  clip-path:polygon(0 0,50% 58%,100% 0);
  background:#ffd6e3;
  border-radius:8px 8px 0 0;
}

.envelope:after {
  content:"❤️";
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-35%);
  font-size:38px;
  filter:drop-shadow(0 4px 5px #0003);
}

.letter {
  max-height:0;
  opacity:0;
  overflow:hidden;
  transition:max-height 1s ease,opacity .6s;
}

.letter.open {
  max-height:1300px;
  opacity:1;
}

.letter-paper {
  background:#fff1e8;
  color:#60294a;
  padding:32px;
  border-radius:17px;
  text-align:left;
  font-size:19px;
  line-height:2;
  box-shadow:0 15px 40px #0002;
}

.letter-paper strong {
  color:#c92f72;
}

.gift {
  position:relative;
  display:block;
  margin:20px auto;
  border:0;
  background:transparent;
  font-size:105px;
  filter:drop-shadow(0 10px 22px #f0498165);
  animation:float 3s infinite;
}

.hidden-message {
  display:none;
  animation:appear .8s ease;
}

.hidden-message.show {display:block}

@keyframes appear {
  from {opacity:0;transform:translateY(16px) scale(.97)}
  to {opacity:1;transform:translateY(0) scale(1)}
}

.surprise-text {
  font-size:23px;
  line-height:1.9;
  color:#ffcfdf;
}

.reasons-card {
  min-height:230px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
}

.reason-number {
  color:var(--gold);
  font-size:13px;
  letter-spacing:2px;
}

.reason-text {
  font-size:clamp(21px,4vw,29px);
  line-height:1.7;
  color:#ffe5ef;
  margin:20px 0;
}

.memory-grid {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:18px;
}

.memory {
  background:#fff0ee;
  padding:10px 10px 20px;
  transform:rotate(-3deg);
  color:#6d3458;
  border-radius:5px;
  box-shadow:0 15px 35px #0004;
  transition:transform .3s;
  cursor:pointer;
  border:0;
}

.memory:nth-child(2) {transform:rotate(3deg)}
.memory:nth-child(3) {transform:rotate(-2deg)}

.memory:hover {transform:rotate(0) translateY(-9px)}

.memory-picture {
  min-height:160px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:linear-gradient(135deg,#f7a5c9,#9f7acb);
  font-size:65px;
}

.memory b {
  display:block;
  padding-top:15px;
  font-size:16px;
}

#memoryMsg {
  color:var(--gold);
  text-align:center;
  min-height:35px;
  margin-top:25px;
  line-height:1.8;
}

.secret-input {
  display:block;
  max-width:350px;
  width:100%;
  margin:25px auto 15px;
  border:1px solid #ffffff50;
  border-radius:15px;
  background:#ffffff18;
  color:white;
  text-align:center;
  padding:15px;
  font-size:18px;
}

.secret-input::placeholder {color:#cbbacb}

#secretResult {
  margin-top:20px;
  min-height:25px;
  line-height:1.8;
}

.proposal {
  background:
    radial-gradient(circle at 50% 0%,#ff6aaa33,transparent 55%),
    #ffffff09;
  padding:55px 25px;
  text-align:center;
}

.ring {
  font-size:72px;
  margin-bottom:25px;
  filter:drop-shadow(0 0 25px #ffde9a70);
  animation:float 3s infinite;
}

.proposal h2 {
  font-size:clamp(35px,6vw,60px);
  font-family:"Playfair Display",serif;
  color:#ffc8dc;
  margin:15px 0 25px;
}

.proposal p {
  color:#e7ccdd;
  line-height:1.9;
  font-size:18px;
}

#answer {
  margin-top:25px;
  font-size:22px;
  line-height:1.8;
  color:var(--gold);
  min-height:35px;
}

.count-overlay {
  position:fixed;
  inset:0;
  background:#14091fee;
  z-index:100;
  display:none;
  align-items:center;
  justify-content:center;
  flex-direction:column;
}

.count-overlay.show {display:flex}

#countNumber {
  font-family:"Playfair Display",serif;
  font-size:120px;
  color:var(--rose);
  text-shadow:0 0 70px #ff4d94;
  animation:beat 1s infinite;
}

@keyframes beat {
  50% {transform:scale(1.17)}
}

.footer {
  text-align:center;
  color:#ac92b1;
  margin-top:90px;
  line-height:2;
}

.footer strong {color:var(--rose)}

.toast {
  position:fixed;
  left:50%;
  bottom:25px;
  transform:translateX(-50%);
  background:#fff0f6;
  color:#682947;
  border-radius:20px;
  padding:13px 24px;
  z-index:110;
  display:none;
  width:max-content;
  max-width:90vw;
  text-align:center;
  box-shadow:0 10px 35px #0004;
}

.toast.show {display:block}

@media(max-width:650px) {
  .hero {padding-top:65px}
  .glass {padding:25px 18px}
  .memory-grid {grid-template-columns:1fr;max-width:350px;margin:auto}
  .memory {margin-bottom:10px}
  .letter-paper {padding:22px;font-size:17px}
  section {margin:55px 0}
  .btn {padding:13px 18px}
}

@media(prefers-reduced-motion:reduce) {
  *,*:before,*:after {
    animation-duration:.01ms!important;
    transition-duration:.01ms!important;
    scroll-behavior:auto!important;
  }
}
</style>
</head>

<body>

<div id="stars" aria-hidden="true"></div>
<div id="particles" aria-hidden="true"></div>

<nav>
  <div class="logo">A ♡ R</div>
  <button class="music-btn" id="musicBtn" onclick="toggleMusic()">♫ Play Music</button>
</nav>

<main>

<section class="hero">
  <div class="moon">🌙</div>

  <div class="eyebrow">A little universe made just for you</div>

  <h1>Dear ARU</h1>

  <p>
    এই পৃথিবীতে অসংখ্য মানুষ আছে,<br>
    কিন্তু আমার হৃদয় শুধু তোমাকেই খুঁজে পায়।
  </p>

  <div class="type-line" id="typedText"></div>

  <button class="btn primary" onclick="goTo('letterSection')">
    💌 Open My Heart
  </button>

  <button class="btn outline" onclick="goTo('proposalSection')">
    ✨ A Special Question
  </button>
</section>

<section id="letterSection">
  <h2 class="section-title">A Letter For ARU</h2>
  <p class="section-sub">
    এই চিঠিটা শুধু তোমার জন্য। খামটা খুলে দেখো... 💌
  </p>

  <div class="glass center">
    <button class="envelope" id="envelope" aria-label="Open love letter" onclick="openLetter()"></button>

    <p id="envelopeHint">Tap the envelope to reveal my heart ❤️</p>

    <div class="letter" id="loveLetter">
      <div class="letter-paper">
        <strong>প্রিয় ARU, 🌹</strong>

        <p>
          কখন যে তুমি আমার ভাবনার এতটা জায়গা জুড়ে
          নিয়েছ, আমি নিজেও বুঝতে পারিনি।
        </p>

        <p>
          তোমার নামটা শুনলেই মনটা ভালো হয়ে যায়।
          তোমার একটা ছোট্ট মেসেজ,
          একটা হাসি, কিংবা একটু কথা —
          আমার পুরো দিনটাকে সুন্দর করে দিতে পারে।
        </p>

        <p>
          ARU, আমি তোমাকে শুধু সুন্দর মুহূর্তগুলোতে
          নয়, জীবনের কঠিন সময়েও পাশে পেতে চাই।
          তোমার আনন্দের সঙ্গী হতে চাই,
          তোমার মন খারাপের দিনে ভরসা হতে চাই।
        </p>

        <p>
          আমি নিখুঁত মানুষ নই।
          কিন্তু তোমাকে সম্মান করতে,
          তোমার কথা শুনতে এবং যত্ন করতে
          আমি সবসময় চেষ্টা করব।
        </p>

        <p>
          ভবিষ্যৎ কেমন হবে জানি না।
          শুধু জানি, সেই ভবিষ্যৎটা
          তোমার সঙ্গে ভাগ করে নিতে খুব ইচ্ছে করে।
        </p>

        <p>
          <strong>ARU, আমি তোমাকে অনেক ভালোবাসি। ❤️</strong>
        </p>

        <p style="text-align:right">
          ইতি,<br>
          তোমাকে ভালোবাসে এমন একজন 💕
        </p>
      </div>
    </div>
  </div>
</section>

<section id="giftSection">
  <h2 class="section-title">A Mystery Gift</h2>
  <p class="section-sub">তোমার জন্য ছোট্ট একটা উপহার লুকিয়ে রেখেছি।</p>

  <div class="glass center">
    <button class="gift" id="giftButton" onclick="openGift()" aria-label="Open surprise gift">
      🎁
    </button>

    <p id="giftHint">Click the gift, ARU! 💗</p>

    <div class="hidden-message" id="giftMessage">
      <div style="font-size:75px">🌹💖🌹</div>
      <p class="surprise-text">
        পৃথিবীর সব গোলাপ যদি তোমাকে দিতে পারতাম,<br>
        তবুও আমার ভালোবাসাটা বোঝানোর জন্য<br>
        হয়তো কম পড়ে যেত।<br><br>
        You are my favorite feeling, ARU. ❤️
      </p>
    </div>
  </div>
</section>

<section id="reasonsSection">
  <h2 class="section-title">100 Reasons I Love You</h2>
  <p class="section-sub">একেকটা কারণ, একেকটা ভালোবাসার কথা।</p>

  <div class="glass reasons-card">
    <div style="font-size:45px">💗</div>
    <p class="reason-number" id="reasonNumber">REASON 001 / 100</p>
    <p class="reason-text" id="reasonText"></p>

    <button class="btn gold" onclick="nextReason()">
      Next Reason ✨
    </button>
  </div>
</section>

<section id="memoriesSection">
  <h2 class="section-title">Little Things About You</h2>

  <p class="section-sub">
    তোমাকে নিয়ে আমার কিছু সুন্দর অনুভূতি।
    প্রতিটি কার্ডে ক্লিক করো।
  </p>

  <div class="memory-grid">
    <button class="memory" onclick="showMemory(0)">
      <div class="memory-picture">🌸</div>
      <b>Your Smile</b>
    </button>

    <button class="memory" onclick="showMemory(1)">
      <div class="memory-picture">💌</div>
      <b>Your Messages</b>
    </button>

    <button class="memory" onclick="showMemory(2)">
      <div class="memory-picture">🌙</div>
      <b>Thinking of You</b>
    </button>
  </div>

  <p id="memoryMsg" aria-live="polite"></p>
</section>

<section id="secretSection">
  <h2 class="section-title">The Secret Password</h2>
  <p class="section-sub">
    এই Surprise Box-এর Password হলো এমন একটা নাম,
    যেটা আমার কাছে ভীষণ প্রিয়। 🔐
  </p>

  <div class="glass center">
    <div style="font-size:60px">🔒</div>

    <input
      class="secret-input"
      id="secretInput"
      type="text"
      maxlength="40"
      placeholder="Enter the magic name"
      aria-label="Secret password"
      autocomplete="off"
    >

    <button class="btn primary" onclick="unlockSecret()">
      Unlock My Secret 💕
    </button>

    <div id="secretResult" aria-live="polite"></div>
  </div>
</section>

<section id="skySection">
  <h2 class="section-title">Under The Same Sky</h2>

  <div class="glass center">
    <div style="font-size:65px">🌙 ✨</div>

    <p class="surprise-text">
      এই আকাশের হাজার হাজার তারার মাঝেও<br>
      আমার চোখে সবচেয়ে উজ্জ্বল তুমি।<br><br>
      Every star reminds me of you, ARU.
    </p>

    <button class="btn outline" onclick="makeWish()">
      ✨ Make a Wish
    </button>

    <p id="wishResult" aria-live="polite"></p>
  </div>
</section>

<section id="proposalSection">
  <div class="glass proposal">
    <div class="eyebrow">The most important question</div>

    <div class="ring">💍</div>

    <h2>ARU, Will You Be Mine?</h2>

    <p>
      আমি তোমার সঙ্গে অসংখ্য সুন্দর মুহূর্ত তৈরি করতে চাই।<br>
      তোমার হাসির কারণ হতে চাই।<br>
      তোমার পাশে থাকার সুযোগ চাই।<br><br>
      ARU, তুমি কি আমার ভালোবাসার গল্পের অংশ হবে?
    </p>

    <button class="btn primary" onclick="sayYes()">
      ❤️ Yes, I Will!
    </button>

    <button class="btn outline" onclick="needTime()">
      🌸 I Need Some Time
    </button>

    <div id="answer" aria-live="polite"></div>
  </div>
</section>

<div class="footer">
  Made with <strong>♥</strong> for someone truly special.<br>
  <strong>Only For ARU</strong><br>
  Forever a beautiful feeling. 🌹
</div>

</main>

<div class="count-overlay" id="countOverlay" role="status" aria-live="polite">
  <div class="eyebrow">Your final surprise is coming</div>
  <div id="countNumber">5</div>
  <p>Close your eyes and make a wish ❤️</p>
</div>

<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script>
"use strict";

function byId(id) {
  return document.getElementById(id);
}

function goTo(id) {
  byId(id).scrollIntoView({behavior:"smooth"});
}

function random(min,max) {
  return Math.random()*(max-min)+min;
}

var reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function createStars() {
  if (reducedMotion) return;

  var holder = byId("stars");

  for (var i=0;i<90;i++) {
    var star = document.createElement("span");
    star.className = "star";
    star.style.left = random(0,100)+"%";
    star.style.top = random(0,100)+"%";
    star.style.opacity = random(.1,.8);
    star.style.animationDelay = random(0,4)+"s";
    star.style.animationDuration = random(2,6)+"s";
    holder.appendChild(star);
  }
}

var particleTimer = null;

function heartParticle() {
  if (reducedMotion || document.hidden) return;

  var el = document.createElement("div");
  var choices = ["❤️","💗","💕","🌸","✨","💖"];
  el.className = "particle";
  el.textContent = choices[Math.floor(Math.random()*choices.length)];
  el.style.left = random(0,100)+"%";
  el.style.fontSize = random(15,30)+"px";

  var duration = random(5,9);
  el.style.animationDuration = duration+"s";
  byId("particles").appendChild(el);

  setTimeout(function(){el.remove()},duration*1000+200);
}

function heartBurst(amount) {
  if (reducedMotion) return;

  for (var i=0;i<amount;i++) {
    setTimeout(heartParticle,i*65);
  }
}

function showToast(message) {
  var toast = byId("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(function(){
    toast.classList.remove("show");
  },3200);
}

var heroMessages = [
  "ARU, তুমি আমার সবচেয়ে সুন্দর অনুভূতি।",
  "You make my ordinary days magical.",
  "তোমার হাসিটা আমার ভীষণ প্রিয়।",
  "I love you, ARU. ❤️"
];

var messageIndex = 0;
var charIndex = 0;
var deleting = false;

function typeText() {
  var full = heroMessages[messageIndex];
  var target = byId("typedText");

  if (!deleting) {
    charIndex++;
    target.textContent = full.slice(0,charIndex);

    if (charIndex >= full.length) {
      deleting = true;
      setTimeout(typeText,1700);
      return;
    }
  } else {
    charIndex--;
    target.textContent = full.slice(0,charIndex);

    if (charIndex <= 0) {
      deleting = false;
      messageIndex = (messageIndex+1)%heroMessages.length;
    }
  }

  setTimeout(typeText,deleting?38:90);
}

function openLetter() {
  var letter = byId("loveLetter");
  var opening = !letter.classList.contains("open");
  letter.classList.toggle("open");

  byId("envelopeHint").textContent = opening
    ? "A letter from my heart, only for you. 💖"
    : "Tap again to open your letter 💌";

  if (opening) {
    heartBurst(15);
    setTimeout(function(){
      letter.scrollIntoView({behavior:"smooth",block:"nearest"});
    },200);
  }
}

function openGift() {
  byId("giftButton").textContent = "💝";
  byId("giftHint").textContent = "Surprise! 🌹";
  byId("giftMessage").classList.add("show");
  heartBurst(35);
  showToast("A little gift for my favorite person!");
}

var reasons = [
"তোমার হাসিটা অসম্ভব সুন্দর।",
"তোমার নাম শুনলেই আমার মন ভালো হয়ে যায়।",
"তোমার সঙ্গে কথা বলতে ভালো লাগে।",
"তোমার ছোট ছোট কথাগুলো আমার কাছে বিশেষ।",
"তুমি আমার চিন্তার সুন্দর একটা অংশ।",
"তোমার আনন্দ আমাকে আনন্দ দেয়।",
"তোমার চোখে আমি মায়া খুঁজে পাই।",
"তোমার কথা ভাবলেই অজান্তে হাসি আসে।",
"তোমার সঙ্গে সময় কাটানোর ইচ্ছে হয়।",
"তুমি সাধারণ দিনকেও সুন্দর করে দাও।",
"তোমার উপস্থিতি আমার কাছে মূল্যবান।",
"তোমার প্রতি আমার অনুভূতিটা সত্যি।",
"তোমার স্বপ্নগুলো আমার কাছে গুরুত্বপূর্ণ।",
"তোমার কথা মন দিয়ে শুনতে চাই।",
"তোমার সুখ দেখতে ভালো লাগে।",
"তোমার জন্য সুন্দর কিছু করতে ইচ্ছে করে।",
"তুমি আমার কাছে ভীষণ স্পেশাল।",
"তোমার একটা মেসেজও দিন সুন্দর করতে পারে।",
"তোমাকে সম্মান করতে আমার ভালো লাগে।",
"তোমার হাসির কারণ হতে চাই।",
"তোমার সঙ্গে নতুন গল্প তৈরি করতে চাই।",
"তোমার মন খারাপের দিনে পাশে থাকতে চাই।",
"তোমার ছোট ছোট পছন্দগুলো জানতে চাই।",
"তোমার সঙ্গে ভবিষ্যতের কথা ভাবতে ভালো লাগে।",
"তোমার খুশি আমার কাছে গুরুত্বপূর্ণ।",
"তোমার প্রতি যত্ন নিতে ইচ্ছে করে।",
"তোমার সঙ্গে হাসতে চাই।",
"তোমার সঙ্গে গল্পের শেষ খুঁজতে চাই না।",
"তোমার ভালো থাকা আমার কাছে অনেক কিছু।",
"তোমাকে বিশ্বাস করতে চাই।",
"তোমার প্রতিটি অর্জন উদযাপন করতে চাই।",
"তোমার সাহসের পাশে থাকতে চাই।",
"তোমার ইচ্ছাগুলোকে গুরুত্ব দিতে চাই।",
"তোমার মতামত শুনতে ভালো লাগে।",
"তোমার সঙ্গে চুপচাপ বসেও শান্তি পেতে চাই।",
"তোমার চোখে স্বপ্ন দেখতে চাই।",
"তোমাকে নিয়ে লেখা শব্দগুলো সুন্দর লাগে।",
"তোমার নামটা আমার প্রিয়।",
"তোমার সঙ্গে অনেক স্মৃতি বানাতে চাই।",
"তোমার জীবনের সুন্দর মুহূর্তগুলো দেখতে চাই।",
"তোমার অভিমান বুঝতে শিখতে চাই।",
"তোমার হাসিটা আগলে রাখতে চাই।",
"তোমার প্রতি আমার শ্রদ্ধা আছে।",
"তোমার সঙ্গে একসঙ্গে শিখতে চাই।",
"তোমার কথা মনে হলে মনটা নরম হয়ে যায়।",
"তোমাকে নিয়ে সুন্দর স্বপ্ন দেখতে ভালো লাগে।",
"তোমার পাশে নিজের সত্যিকারের মানুষটা হতে চাই।",
"তোমার স্বাধীনতাকে সম্মান করতে চাই।",
"তোমাকে কখনো ছোট করে দেখতে চাই না।",
"তোমার কথা আমার কাছে গুরুত্ব পায়।",
"তোমার সঙ্গে বৃষ্টির দিন উপভোগ করতে চাই।",
"তোমার সঙ্গে আকাশের তারা দেখতে চাই।",
"তোমার সঙ্গে হাসির গল্প করতে চাই।",
"তোমার জন্য একটা চিঠি লিখতে ইচ্ছে করে।",
"তোমার পছন্দের গান শুনতে চাই।",
"তোমার প্রিয় জায়গাগুলো জানতে চাই।",
"তোমার সঙ্গে নতুন জায়গা দেখতে চাই।",
"তোমার সঙ্গে সকালের আলো দেখতে চাই।",
"তোমার সঙ্গে সন্ধ্যার গল্প করতে চাই।",
"তোমার স্বপ্নপূরণে উৎসাহ দিতে চাই।",
"তোমার কষ্ট বুঝতে চেষ্টা করতে চাই।",
"তোমার প্রতি ধৈর্যশীল হতে চাই।",
"তোমার অনুভূতিকে গুরুত্ব দিতে চাই।",
"তোমার সঙ্গে সুন্দর সম্পর্ক গড়তে চাই।",
"তোমার চোখে নিশ্চিন্ত হাসি দেখতে চাই।",
"তোমার সঙ্গে ছোট ছোট আনন্দ ভাগ করতে চাই।",
"তোমার জন্য ভালো মানুষ হতে চাই।",
"তোমার সঙ্গে সৎ থাকতে চাই।",
"তোমার গল্পগুলো শুনতে চাই।",
"তোমার প্রতি কৃতজ্ঞ হতে চাই।",
"তোমার সঙ্গে জীবনকে নতুনভাবে দেখতে চাই।",
"তোমার সঙ্গে পথ চলতে ভালো লাগবে।",
"তোমার মনটা বুঝতে আরও সময় দিতে চাই।",
"তোমার সঙ্গে একই আকাশ দেখতে ভালো লাগে।",
"তোমার পাশে সাহস জোগাতে চাই।",
"তোমার সিদ্ধান্তকে সম্মান করতে চাই।",
"তোমার সঙ্গে মিষ্টি স্মৃতি জমাতে চাই।",
"তোমার হাসি দেখতে নতুন কারণ খুঁজি।",
"তোমার সঙ্গে সাধারণ মুহূর্তও বিশেষ হবে।",
"তোমার কাছে নিজের অনুভূতি খুলে বলতে চাই।",
"তোমাকে ভালোবাসা মানে তোমার ভালো চাওয়া।",
"তোমার সঙ্গে বিশ্বাসের বন্ধন চাই।",
"তোমাকে প্রতিদিন নতুন করে জানতে চাই।",
"তোমার পৃথিবীটাকে বুঝতে চাই।",
"তোমার সঙ্গে মনের কথা ভাগ করতে চাই।",
"তোমার প্রতি আমার মুগ্ধতা আছে।",
"তোমার জন্য সময় বের করতে চাই।",
"তোমার পাশে ভালো বন্ধু হতে চাই।",
"তোমার সঙ্গে হাসতে হাসতে দিন শেষ করতে চাই।",
"তোমাকে নিয়ে আমার মন কবিতা লিখতে চায়।",
"তোমার যত্নে ভালোবাসা প্রকাশ করতে চাই।",
"তোমার সঙ্গে আরও অনেক সুন্দর দিন চাই।",
"তোমার সঙ্গে ভুল বোঝাবুঝি কথা বলে মেটাতে চাই।",
"তোমার স্বস্তি আমার কাছে গুরুত্বপূর্ণ।",
"তোমার সঙ্গে সম্পর্কটা যত্ন করে গড়তে চাই।",
"তোমাকে ভালোবাসার কথাটা বারবার বলতে ইচ্ছে করে।",
"তোমার মুখের হাসি আমার প্রিয় দৃশ্য।",
"তোমার কাছে আমার অনুভূতিটা একদম সত্যি।",
"তোমাকে আমার জীবনের বিশেষ মানুষ ভাবি।",
"কারণ তুমি ARU, আর তোমাকে আমার ভীষণ ভালো লাগে। ❤️"
];

var reasonIndex = 0;

function renderReason() {
  byId("reasonNumber").textContent =
    "REASON "+String(reasonIndex+1).padStart(3,"0")+" / 100";
  byId("reasonText").textContent = reasons[reasonIndex];
}

function nextReason() {
  reasonIndex = (reasonIndex+1)%reasons.length;
  renderReason();

  if ((reasonIndex+1)%10===0) {
    heartBurst(12);
  }
}

var memoryMessages = [
  "ARU, তোমার হাসিটা আমার মন ভালো করার সবচেয়ে মিষ্টি কারণ। 🌸",
  "তোমার ছোট্ট একটা মেসেজও আমার কাছে অনেক বড় আনন্দ। 💌",
  "রাতের আকাশ দেখলে মাঝে মাঝে তোমার কথাই মনে পড়ে। 🌙"
];

function showMemory(index) {
  byId("memoryMsg").textContent = memoryMessages[index];
  heartBurst(8);
}

function unlockSecret() {
  var input = byId("secretInput").value.trim().toLowerCase();
  var result = byId("secretResult");

  if (input==="aru") {
    result.innerHTML =
      "<div style='font-size:55px'>🔓💖</div>"+
      "<p class='surprise-text'>"+
      "You unlocked my heart, ARU!<br>"+
      "তুমি আমার হৃদয়ের সবচেয়ে সুন্দর অনুভূতি।<br>"+
      "I Love You! ❤️</p>";

    heartBurst(40);
    showToast("The magic name is ARU! 💖");
  } else {
    result.textContent =
      "একটু Hint দিই? নামটা A দিয়ে শুরু, U দিয়ে শেষ। 💕";
  }
}

byId("secretInput").addEventListener("keydown",function(event){
  if (event.key==="Enter") unlockSecret();
});

function makeWish() {
  byId("wishResult").textContent =
    "আমার ইচ্ছে — ARU সবসময় ভালো থাকুক, হাসিখুশি থাকুক। ❤️";
  heartBurst(25);
}

var countdownRunning = false;

function countdown(callback) {
  if (countdownRunning) return;

  countdownRunning = true;
  var overlay = byId("countOverlay");
  var display = byId("countNumber");
  var count = 5;

  overlay.classList.add("show");
  display.textContent = count;

  var timer = setInterval(function(){
    count--;

    if (count>0) {
      display.textContent = count;
    } else {
      clearInterval(timer);
      overlay.classList.remove("show");
      countdownRunning = false;
      callback();
    }
  },1000);
}

function sayYes() {
  countdown(function(){
    var answer = byId("answer");

    answer.innerHTML =
      "ARU! ❤️💍<br>"+
      "তোমার হ্যাঁ শুনে আমার হৃদয় আনন্দে ভরে গেল!<br>"+
      "Thank you for giving our story a chance.<br>"+
      "I Love You So Much! 🌹";

    heartBurst(100);
    answer.scrollIntoView({behavior:"smooth",block:"center"});
  });
}

function needTime() {
  byId("answer").innerHTML =
    "ARU, তোমার যতটুকু সময় প্রয়োজন নাও। 🌸<br>"+
    "কোনো চাপ নেই। তোমার সিদ্ধান্তকে আমি সম্মান করি। ❤️";
}

var audioCtx = null;
var musicInterval = null;
var musicPlaying = false;

function playTone(frequency,start,duration) {
  if (!audioCtx) return;

  var osc = audioCtx.createOscillator();
  var gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(frequency,start);

  gain.gain.setValueAtTime(.0001,start);
  gain.gain.exponentialRampToValueAtTime(.045,start+.04);
  gain.gain.exponentialRampToValueAtTime(.0001,start+duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(start);
  osc.stop(start+duration+.03);
}

var melody = [
  392,440,523.25,440,
  392,329.63,349.23,392,
  440,523.25,587.33,523.25,
  440,392,349.23,329.63
];

var melodyIndex = 0;

function toggleMusic() {
  if (musicPlaying) {
    clearInterval(musicInterval);
    musicInterval = null;
    musicPlaying = false;

    if (audioCtx) audioCtx.suspend();
    byId("musicBtn").textContent = "♫ Play Music";
    return;
  }

  var AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    showToast("Music is not supported in this browser.");
    return;
  }

  if (!audioCtx) audioCtx = new AudioContextClass();

  audioCtx.resume().then(function(){
    musicPlaying = true;
    byId("musicBtn").textContent = "♫ Pause Music";

    function playNext() {
      var now = audioCtx.currentTime;
      playTone(melody[melodyIndex],now,.72);
      melodyIndex = (melodyIndex+1)%melody.length;
    }

    playNext();
    musicInterval = setInterval(playNext,620);
  }).catch(function(){
    showToast("Tap Play Music again to start.");
  });
}

document.addEventListener("visibilitychange",function(){
  if (document.hidden && musicPlaying) toggleMusic();
});

createStars();
renderReason();
typeText();

if (!reducedMotion) {
  particleTimer = setInterval(heartParticle,1100);
}

</script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  const pathname = (req.url || "/").split("?")[0];

  if (pathname === "/" || pathname === "/index.html") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY"
    });
    return res.end(html);
  }

  if (pathname === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    return res.end(JSON.stringify({ok:true}));
  }

  res.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8"
  });
  res.end("404 - Not Found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("ARU Proposal Website running on port " + PORT);
});
