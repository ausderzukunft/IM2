const startButton = document.querySelector("#startButton");

const deckButtons = document.querySelectorAll(".choice-card");
const suitButtons = document.querySelectorAll(".suit-button");

const randomMajorBtn = document.querySelector("#randomMajorBtn");
const randomMinorBtn = document.querySelector("#randomMinorBtn");

const retroFromResult = document.querySelector("#retroFromResult");
const backToDeckButtons = document.querySelectorAll(".back-to-deck");

let selectedSuit = null;
let lastPath = "major";

const cards = {
  swords: {
    title: "Four of Swords",
    keywords: "Vigilance, retreat, solitude, hermit’s repose, exile, tomb and coffin.",
    meaning: "After every action, consequences. Whatever.",
    image: "Swords.png"
  },

  wands: {
    title: "Six of Wands",
    keywords: "Victory, triumph, good news and public recognition.",
    meaning: "A spontaneous flex, or a victorious attempt at looking opened to the enemy.",
    image: "Wands.png"
  },

  cups: {
    title: "Five of Cups",
    keywords: "Loss, expectation, memory, regret and emotional leftovers.",
    meaning: "The loss is different and greatly important. Whatever.",
    image: "Cups.png"
  },

  pentacles: {
    title: "Eight of Pentacles",
    keywords: "Work, employment, commission, craftsmanship and skill.",
    meaning: "The possession of all, turned to cunning and intrigue.",
    image: "Pentacles.png"
  }
};

function showScreen(id) {

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.add("hidden");
  });

  document.querySelector(id).classList.remove("hidden");

  window.scrollTo(0, 0);
}

startButton.addEventListener("click", () => {
  showScreen("#deck");
});

deckButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const deck = button.dataset.deck;

    if (deck === "big") {

      lastPath = "major";

      showScreen("#random-major");

    } else {

      lastPath = "minor";

      showScreen("#suits");
    }
  });
});

randomMajorBtn.addEventListener("click", () => {

  lastPath = "major";

  showScreen("#loading");

  setTimeout(() => {

    const keys = Object.keys(cards);

    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    renderCard(cards[randomKey]);

    showScreen("#result");

  }, 1100);
});

suitButtons.forEach((button) => {

  button.addEventListener("click", () => {

    selectedSuit = button.dataset.suit;

    lastPath = "minor";

    showScreen("#random-minor");
  });
});

randomMinorBtn.addEventListener("click", () => {

  showScreen("#loading");

  setTimeout(() => {

    renderCard(cards[selectedSuit]);

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

function renderCard(card) {

  document.querySelector("#cardTitle").textContent = card.title;

  document.querySelector("#cardKeywords").textContent = card.keywords;

  document.querySelector("#cardMeaning").textContent = card.meaning;

  document
    .querySelector("#resultCard")
    .style.setProperty("--result-image", `url("${card.image}")`);
}