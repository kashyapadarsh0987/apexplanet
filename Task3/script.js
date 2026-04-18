// ================= QUIZ DATA =================
const quiz = [
  {
    question: "What is HTML?",
    answers: ["Markup Language", "Programming Language", "Database"],
    correct: 0
  },
  {
    question: "What does CSS do?",
    answers: ["Structure", "Style", "Logic"],
    correct: 1
  },
  {
    question: "What is JavaScript?",
    answers: ["Styling", "Programming Language", "Database"],
    correct: 1
  }
];

let index = 0;
let score = 0;
let answered = false;
let timeLeft = 10;
let timer;

// ================= LOAD QUESTION =================
function loadQuestion() {
  answered = false;
  timeLeft = 10;

  // Progress Bar
  const progress = (index / quiz.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";

  // Question
  const q = quiz[index];
  document.getElementById("question").innerText = q.question;

  // Answers
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.innerText = ans;

    btn.onclick = () => {
      if (!answered) {
        selectAnswer(i);
      }
    };

    answersDiv.appendChild(btn);
  });

  startTimer();
}

// ================= TIMER =================
function startTimer() {
  document.getElementById("timer").innerText = `⏱ Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `⏱ Time: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      autoNext();
    }
  }, 1000);
}

// ================= SELECT ANSWER =================
function selectAnswer(i) {
  answered = true;
  clearInterval(timer);

  const correctIndex = quiz[index].correct;
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach((b, idx) => {
    if (idx === correctIndex) {
      b.style.background = "green";
      b.style.color = "white";
    } else {
      b.style.background = "red";
      b.style.color = "white";
    }
  });

  if (i === correctIndex) {
    score++;
  }
}

// ================= AUTO NEXT =================
function autoNext() {
  document.getElementById("timer").innerText = "⏱ Time's up!";
  nextQuestion();
}

// ================= NEXT QUESTION =================
function nextQuestion() {
  clearInterval(timer);

  if (!answered) {
    alert("Please select an answer first!");
    return;
  }

  index++;

  if (index < quiz.length) {
    loadQuestion();
  } else {
    document.getElementById("progress-bar").style.width = "100%";

    document.getElementById("question").innerHTML =
      `🎉 Quiz Finished! <br> Score: ${score} / ${quiz.length}`;

    document.getElementById("answers").innerHTML = "";
    document.getElementById("timer").innerText = "";
  }
}

// ================= RESTART =================
function restartQuiz() {
  index = 0;
  score = 0;
  loadQuestion();
}

// Start Quiz
loadQuestion();


// ================= WEATHER =================
async function getWeather() {
  const place = document.getElementById("city").value.trim();
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  if (!place) {
    result.innerText = "❗ Enter place or location";
    return;
  }

  loading.innerText = "Loading...";
  result.innerText = "";

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=5`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Location not found");
    }

    const { latitude, longitude, name, country, admin1 } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    // Weather Icon
    const code = weatherData.current_weather.weathercode;
    let icon = "☀️";

    if (code <= 3) icon = "☀️";
    else if (code <= 48) icon = "☁️";
    else if (code <= 67) icon = "🌧️";
    else if (code <= 77) icon = "❄️";
    else icon = "⛈️";

    loading.innerText = "";

    result.innerText =
      `${icon} ${name}, ${admin1 || ""}, ${country}
🌡 Temp: ${weatherData.current_weather.temperature}°C
💨 Wind: ${weatherData.current_weather.windspeed} km/h`;

  } catch (err) {
    loading.innerText = "";
    result.innerText = "❌ " + err.message;
  }
}


// ================= SUGGESTIONS =================
async function getSuggestions() {
  const input = document.getElementById("city").value.trim();
  const suggestionsDiv = document.getElementById("suggestions");

  if (input.length < 2) {
    suggestionsDiv.innerHTML = "";
    return;
  }

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=5`
    );
    const data = await res.json();

    suggestionsDiv.innerHTML = "";

    data.results?.forEach(place => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.innerText = `${place.name}, ${place.country}`;

      div.onclick = () => {
        document.getElementById("city").value = place.name;
        suggestionsDiv.innerHTML = "";
      };

      suggestionsDiv.appendChild(div);
    });

  } catch (err) {
    console.log(err);
  }
}