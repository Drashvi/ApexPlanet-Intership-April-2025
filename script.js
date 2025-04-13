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


// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "" || email === "" || message === "") {
    status.textContent = "❌ Please fill in all fields.";
    status.style.color = "red";
    status.style.display = "block";
  } else if (!emailPattern.test(email)) {
    status.textContent = "❌ Please enter a valid email address.";
    status.style.color = "red";
    status.style.display = "block";
  } else {
    // ✅ Success message
    status.textContent = "✅ Your message was sent successfully!";
    status.style.color = "black";
    status.style.display = "block";

    // Reset the form
    document.getElementById("contactForm").reset();

    // Optional: Hide message after 3 seconds
    setTimeout(() => {
      status.style.display = "none";
    }, 3000);
  }
});


