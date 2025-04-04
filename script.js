// Typing effect for the subheading
const subheading = document.querySelector('header p');
const text = "Web Development Enthusiast";
let index = 0;

function typeEffect() {
  if (index < text.length) {
    subheading.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}
subheading.textContent = ""; // Clear existing text
typeEffect();

// Console Easter Egg
console.log("%cHey there, curious developer! 👀", "color: #0073e6; font-size: 16px; font-weight: bold;");

// Show message + confetti effect
function showMessage() {
  document.getElementById("customAlert").style.display = "flex";
  launchConfetti();
}

// Close custom alert
function closeAlert() {
  document.getElementById("customAlert").style.display = "none";
}

// Confetti Effect 🎉
function launchConfetti() {
  const emojis = ["🎉", "✨", "💥", "🌟", "🎊"];
  for (let i = 0; i < 30; i++) {
    const confetto = document.createElement("div");
    confetto.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    confetto.style.position = "fixed";
    confetto.style.left = Math.random() * 100 + "vw";
    confetto.style.top = "-2rem";
    confetto.style.fontSize = "1.5rem";
    confetto.style.paddingRight = "0.3rem"; // Add spacing
    confetto.style.animation = "fall 2s ease-out forwards";
    document.body.appendChild(confetto);

    setTimeout(() => confetto.remove(), 2000); // Clean up
  }
}

// Trigger on "Welcome to my portfolio" click
document.getElementById("welcomeButton").addEventListener("click", showMessage);
