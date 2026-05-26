const startButton = document.querySelector("#startButton");

const deckButtons = document.querySelectorAll(".choice-card");
const suitButtons = document.querySelectorAll(".suit-button");

const randomMajorBtn = document.querySelector("#randomMajorBtn");
const randomMinorBtn = document.querySelector("#randomMinorBtn");

const retroFromResult = document.querySelector("#retroFromResult");
const backToDeckButtons = document.querySelectorAll(".back-to-deck");

const cardTitle = document.querySelector("#cardTitle");
const cardKeywords = document.querySelector("#cardKeywords");
const cardMeaning = document.querySelector("#cardMeaning");
const standardText = document.querySelector("#standardText");
const resultCard = document.querySelector("#resultCard");

let allCards = [];
let majorCards = [];
let minorCards = [];

let selectedSuit = null;

const API_URL = "https://tarotapi.dev/api/v1/cards";

const defaultMajorImage = "../img/major life questions.png";

const suitImages = {
  swords: "../img/Swords.png",
  wands: "../img/Wands.png",
  cups: "../img/Cups.png",
  pentacles: "../img/Pentacles.png"
};

const suitTexts = {
  swords:
    "Swords don’t care about your feelings. They care about the truth. Unfortunately, those are rarely the same thing, whether you wanted to know or not.",

  wands:
    "Wands don’t wait for the perfect moment. They create problems first and clarity later. The universe is trying to tell you something. Ignoring it would be genuinely stupid.",

  cups:
    "This card speaks through emotion and intuition. Terrible news for people who prefer avoidance. Whatever you felt just now probably matters.",

  pentacles:
    "Pentacles deal with work, stability, money, and the exhausting reality of being a person with responsibilities. Unfortunately, the universe thinks this matters."
};

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.add("hidden");
  });

  document.querySelector(id).classList.remove("hidden");
  window.scrollTo(0, 0);
}

async function loadTarotCards() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    allCards = data.cards;

    majorCards = allCards.filter((card) => {
      return card.type === "major";
    });

    minorCards = allCards.filter((card) => {
      return card.type === "minor";
    });

    console.log("API loaded:", allCards);
  } catch (error) {
    console.error("API error:", error);

    cardTitle.textContent = "The Universe Glitched";
    cardKeywords.textContent = "";
    cardMeaning.textContent =
      "The cards could not be loaded. Try again, mortal.";
  }
}

function getRandomCard(cardsArray) {
  const randomIndex = Math.floor(Math.random() * cardsArray.length);
  return cardsArray[randomIndex];
}

function renderMajorCard(card) {
  cardTitle.textContent = card.name;

  cardKeywords.textContent = card.meaning_up;

  cardMeaning.textContent = card.meaning_rev;

  standardText.innerHTML =
  "<strong>We hope your question was answered.<br>Whatever came to your mind first was probably the truth anyway.<br>Thank the universe. Or don’t.</strong>";

  resultCard.style.setProperty(
    "--result-image",
    `url("${defaultMajorImage}")`
  );
}

function renderMinorCard(card) {
  cardTitle.textContent = card.name;

  cardKeywords.textContent = card.meaning_up;

  cardMeaning.textContent = card.meaning_rev;

  standardText.innerHTML =
    `<strong>${suitTexts[selectedSuit]}</strong>`;

  resultCard.style.setProperty(
    "--result-image",
    `url("${suitImages[selectedSuit]}")`
  );
}

startButton.addEventListener("click", () => {
  showScreen("#deck");
});

deckButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const deck = button.dataset.deck;

    if (deck === "big") {
      showScreen("#random-major");
    }

    if (deck === "small") {
      showScreen("#suits");
    }
  });
});

randomMajorBtn.addEventListener("click", () => {
  showScreen("#loading");

  setTimeout(() => {
    const randomMajorCard = getRandomCard(majorCards);

    renderMajorCard(randomMajorCard);

    showScreen("#result");
  }, 1100);
});

suitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedSuit = button.dataset.suit;

    showScreen("#random-minor");
  });
});

randomMinorBtn.addEventListener("click", () => {
  showScreen("#loading");

  setTimeout(() => {
    const cardsOfSelectedSuit = minorCards.filter((card) => {
      return card.suit.toLowerCase() === selectedSuit;
    });

    const randomMinorCard = getRandomCard(cardsOfSelectedSuit);

    renderMinorCard(randomMinorCard);

    showScreen("#result");
  }, 900);
});

backToDeckButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showScreen("#deck");
  });
});

retroFromResult.addEventListener("click", () => {
  showScreen("#deck");
});

document.querySelectorAll(".home-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    showScreen("#home");
  });
});

loadTarotCards();

console.log("lottie:", lottie);
console.log("container:", document.getElementById("bg-lottie"));

lottie.loadAnimation({
  container: document.getElementById("bg-lottie"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "animations/desktop.json"
});

const loadingAnim = lottie.loadAnimation({
  container: document.getElementById("loading-lottie"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "animations/loading.json"
});