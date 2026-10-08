
const http = require("http");

const PORT = process.env.PORT || 3000;

const html = `
<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ARU ❤️ My Love</title>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #19071f, #4b123d, #8b245d);
  color: white;
  text-align: center;
  min-height: 100vh;
  overflow-x: hidden;
}

.container {
  position: relative;
  z-index: 2;
  max-width: 750px;
  margin: auto;
  padding: 85px 22px;
}

.heart {
  font-size: 75px;
  animation: beat 1.2s infinite;
}

@keyframes beat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

h1 {
  font-size: clamp(36px, 8vw, 68px);
  margin: 25px 0;
  color: #ffb5d4;
  text-shadow: 0 0 30px #ff4186;
}

.subtitle {
  font-size: 21px;
  line-height: 1.8;
  margin-bottom: 35px;
}

.card {
  background: rgba(255,255,255,0.09);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 32px;
  border-radius: 25px;
  margin: 30px 0;
  box-shadow: 0 15px 50px #0003;
}

.card h2 {
  color: #ffbad8;
  margin-bottom: 20px;
}

.card p {
  font-size: 18px;
  line-height: 2;
}

button {
  padding: 16px 30px;
  border: none;
  border-radius: 50px;
  margin: 10px;
  font-size: 17px;
  cursor: pointer;
  transition: 0.3s;
}

.yes {
  background: linear-gradient(45deg, #ff3984, #ff80ac);
  color: white;
  box-shadow: 0 8px 25px #ff398466;
}

.later {
  background: #ffffff22;
  color: white;
  border: 1px solid #ffffff55;
}

button:hover {
  transform: scale(1.08);
}

#message {
  margin-top: 25px;
  font-size: 22px;
  color: #ffd1e2;
  line-height: 1.8;
}

.floating {
  position: fixed;
  bottom: -50px;
  pointer-events: none;
  animation: floatUp linear forwards;
  z-index: 1;
}

@keyframes floatUp {
  to {
    transform: translateY(-115vh) rotate(35deg);
    opacity: 0;
  }
}

footer {
  margin-top: 55px;
  opacity: 0.7;
  font-size: 14px;
}
</style>
</head>

<body>

<div class="container">

  <div class="heart">❤️</div>

  <h1>ARU, I Love You!</h1>

  <p class="subtitle">
    ARU, তুমি শুধু একটা নাম নও,<br>
    তুমি আমার হৃদয়ের সবচেয়ে সুন্দর অনুভূতি। 🌸
  </p>

  <div class="card">
    <h2>💌 তোমার জন্য কিছু কথা</h2>

    <p>
      প্রিয় ARU,<br><br>

      জানো, তোমার কথা ভাবলেই
      আমার মুখে অজান্তেই হাসি চলে আসে।

      তোমার হাসি, তোমার কথা,
      তোমার ছোট ছোট অভিমান—
      সবকিছুই আমার কাছে ভীষণ সুন্দর।

      আমি জানি না ভবিষ্যৎ আমাদের জন্য
      কী লিখে রেখেছে।

      কিন্তু আমি জানি,
      আমার প্রতিটি সুন্দর আগামীতে
      আমি তোমাকে পাশে চাই।

      ARU, আমি সত্যিই তোমাকে অনেক ভালোবাসি। ❤️
    </p>
  </div>

  <div class="card">
    <h2>🌹 একটা ছোট্ট প্রশ্ন</h2>

    <p>
      ARU, তুমি কি আমার জীবনের
      সবচেয়ে সুন্দর গল্পের অংশ হবে?
    </p>

    <br>

    <button class="yes" onclick="sayYes()">
      ❤️ Yes, I Will!
    </button>

    <button class="later" onclick="sayLater()">
      🌸 একটু সময় চাই
    </button>

    <div id="message"></div>
  </div>

  <footer>
    Made with ❤️ Only for ARU
  </footer>

</div>

<script>
function sayYes() {
  document.getElementById("message").innerHTML =
    "ARU! ❤️ তুমি আমার পৃথিবীর সবচেয়ে সুন্দর মানুষ! 🌹<br>I Love You Forever! 💍";

  for (let i = 0; i < 45; i++) {
    setTimeout(createHeart, i * 80);
  }
}

function sayLater() {
  document.getElementById("message").innerHTML =
    "ARU, যত সময় প্রয়োজন নাও। 🌸<br>তোমার সিদ্ধান্তকে আমি সম্মান করি। ❤️";
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "floating";
  heart.textContent = ["❤️", "💗", "💕", "🌹", "💖"][
    Math.floor(Math.random() * 5)
  ];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (15 + Math.random() * 30) + "px";
  heart.style.animationDuration = (4 + Math.random() * 5) + "s";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 9500);
}

setInterval(createHeart, 600);
</script>

</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });
    res.end(html);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("ARU Love Website running on port " + PORT);
});
