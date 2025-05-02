document.addEventListener("DOMContentLoaded", () => {
  // Typing Effect
  const subheading = document.querySelector("header p");
  const text = "Web Development Enthusiast";
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      subheading.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 100);
    }
  }

  if (subheading) {
    subheading.textContent = "";
    typeEffect();
  }

  // Date & Weather Display
  const dayDate = document.getElementById("dayDate");
  const dateObj = new Date();
  const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
  if (dayDate) {
    dayDate.textContent = dateObj.toLocaleDateString(undefined, options);
  }

  // Weather using Open-Meteo API
  fetch("https://api.open-meteo.com/v1/forecast?latitude=23.03&longitude=72.58&current_weather=true")
    .then(response => response.json())
    .then(data => {
      const weatherElement = document.getElementById("weather");
      const temperature = data.current_weather.temperature;
      const weatherCode = data.current_weather.weathercode;
      const emoji = getWeatherEmoji(weatherCode);
      if (weatherElement) {
        weatherElement.textContent = `${emoji} ${temperature}°C`;
      }
    })
    .catch(() => {
      const weatherElement = document.getElementById("weather");
      if (weatherElement) {
        weatherElement.textContent = "🌐 Weather unavailable";
      }
    });

  function getWeatherEmoji(code) {
    if ([0, 1].includes(code)) return "☀️";
    if ([2].includes(code)) return "⛅";
    if ([3].includes(code)) return "☁️";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55].includes(code)) return "🌦️";
    if ([61, 63, 65].includes(code)) return "🌧️";
    if ([66, 67].includes(code)) return "🌨️";
    if ([71, 73, 75, 77].includes(code)) return "❄️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "❓";
  }

  // Contact Form Validation and Submission
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name === "" || email === "" || message === "") {
        status.textContent = "❌ Please fill in all fields.";
        status.style.color = "red";
        status.style.display = "block";
        return;
      }

      if (!emailPattern.test(email)) {
        status.textContent = "❌ Please enter a valid email address.";
        status.style.color = "red";
        status.style.display = "block";
        return;
      }

      // If validation passes, submit the form
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          status.textContent = "✅ Thanks for your message! I'll get back to you soon.";
          status.style.color = "green";
          form.reset();
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.textContent = data["errors"].map(error => error["message"]).join(", ");
            } else {
              status.textContent = "❌ Oops! There was a problem submitting your form";
            }
          });
        }
      })
      .catch(error => {
        status.textContent = "❌ Oops! There was a problem submitting your form";
        status.style.color = "red";
      })
      .finally(() => {
        status.style.display = "block";
        setTimeout(() => {
          status.style.display = "none";
        }, 5000);
      });
    });
  }

  // Theme Switcher
  const themeToggle = document.getElementById('themeToggle');
  
  // Check for saved theme preference, otherwise use device preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
  
  // Handle theme toggle
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Welcome button click handler
  const welcomeBtn = document.getElementById("welcomeBtn");
  if (welcomeBtn) {
    welcomeBtn.addEventListener("click", () => {
      launchConfetti();
    });
  }
});

function launchConfetti() {
  const emojis = ["🎉", "✨", "💥", "🌟", "🎊"];
  for (let i = 0; i < 30; i++) {
    const confetto = document.createElement("div");
    confetto.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    confetto.style.position = "fixed";
    confetto.style.left = Math.random() * 100 + "vw";
    confetto.style.top = "-2rem";
    confetto.style.fontSize = "1.5rem";
    confetto.style.animation = "fall 2s ease-out forwards";
    document.body.appendChild(confetto);

    setTimeout(() => confetto.remove(), 2000);
  }
}

function showMessage() {
  const alertBox = document.getElementById("customAlert");
  if (alertBox) {
    alertBox.style.display = "flex";
    launchConfetti(); // This launches confetti when button is clicked
  }
}

function closeAlert() {
  const alertBox = document.getElementById("customAlert");
  if (alertBox) {
    alertBox.style.display = "none";
  }
}

// Make functions available globally
window.showMessage = showMessage;
window.closeAlert = closeAlert;

