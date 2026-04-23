let beverages = [];

const storageKey = "liquid-atlas-ratings";
let activeCategory = "all";
let activeSearch = "";
let spotlightIndex = 0;
let ratings = loadRatings();

const beverageGrid = document.querySelector("#beverage-grid");
const categoryFilter = document.querySelector("#category-filter");
const searchInput = document.querySelector("#search-input");
const resultsStatus = document.querySelector("#results-status");
const statTotal = document.querySelector("#stat-total");
const statAverage = document.querySelector("#stat-average");
const statRated = document.querySelector("#stat-rated");
const surpriseButton = document.querySelector("#surprise-button");
const randomRatingButton = document.querySelector("#random-rating-button");
const resetFiltersButton = document.querySelector("#reset-filters");
const spotlightName = document.querySelector("#spotlight-name");
const spotlightDescription = document.querySelector("#spotlight-description");
const spotlightTag = document.querySelector("#spotlight-tag");
const spotlightOrigin = document.querySelector("#spotlight-origin");
const cardTemplate = document.querySelector("#beverage-card-template");

async function loadBeverages() {
  try {
    const response = await fetch("./beverages.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid beverages payload");
    return data;
  } catch (error) {
    console.error("Unable to load beverages:", error);
    resultsStatus.textContent = "Unable to load beverages";
    return [];
  }
}

function loadRatings() {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveRatings() {
  window.localStorage.setItem(storageKey, JSON.stringify(ratings));
}

function communityScore(beverage) {
  const personal = ratings[beverage.id];
  if (!personal) return beverage.baseRating;
  return Number(((beverage.baseRating * 3 + personal) / 4).toFixed(1));
}

function allCategories() {
  return [...new Set(beverages.map((beverage) => beverage.category))].sort();
}

function populateCategories() {
  const options = allCategories()
    .map(
      (category) => `<option value="${category.toLowerCase()}">${category}</option>`,
    )
    .join("");
  categoryFilter.insertAdjacentHTML("beforeend", options);
}

function visibleBeverages() {
  return beverages.filter((beverage) => {
    const matchesCategory =
      activeCategory === "all" || beverage.category.toLowerCase() === activeCategory;
    const haystack = `${beverage.name} ${beverage.origin} ${beverage.description} ${beverage.tags.join(" ")}`
      .toLowerCase();
    const matchesSearch = haystack.includes(activeSearch);
    return matchesCategory && matchesSearch;
  });
}

function setSpotlight(beverage) {
  if (!beverage) {
    spotlightName.textContent = "No beverages available";
    spotlightDescription.textContent = "Add beverages to the collection to see spotlight details.";
    spotlightTag.textContent = "N/A";
    spotlightOrigin.textContent = "N/A";
    return;
  }

  spotlightName.textContent = beverage.name;
  spotlightDescription.textContent = beverage.description;
  spotlightTag.textContent = beverage.category;
  spotlightOrigin.textContent = beverage.origin;
}

function updateStats() {
  if (!beverages.length) {
    statTotal.textContent = "0";
    statAverage.textContent = "0.0";
    statRated.textContent = String(Object.keys(ratings).length);
    return;
  }

  const scores = beverages.map((beverage) => communityScore(beverage));
  const average = scores.reduce((total, score) => total + score, 0) / scores.length;
  statTotal.textContent = String(beverages.length);
  statAverage.textContent = average.toFixed(1);
  statRated.textContent = String(Object.keys(ratings).length);
}

function createStarButton(beverageId, value, currentRating) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "star-button";
  if (value <= currentRating) button.classList.add("is-active");
  button.setAttribute("aria-label", `Rate ${value} out of 5`);
  button.setAttribute("aria-checked", String(value === currentRating));
  button.dataset.beverageId = beverageId;
  button.dataset.value = String(value);
  button.textContent = "★";
  return button;
}

function renderCards() {
  const list = visibleBeverages();
  beverageGrid.textContent = "";

  if (!list.length) {
    const state = document.createElement("div");
    state.className = "empty-state reveal";
    state.innerHTML =
      "<h3>No beverages match this filter.</h3><p>Try a broader search or reset the collection.</p>";
    beverageGrid.appendChild(state);
    resultsStatus.textContent = "0 beverages showing";
    return;
  }

  resultsStatus.textContent = `${list.length} beverage${list.length === 1 ? "" : "s"} showing`;

  list.forEach((beverage, index) => {
    const fragment = cardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".beverage-card");
    const glow = fragment.querySelector(".beverage-card__glow");
    const orb = fragment.querySelector(".beverage-card__orb");
    const category = fragment.querySelector(".beverage-card__category");
    const name = fragment.querySelector(".beverage-card__name");
    const origin = fragment.querySelector(".beverage-card__origin");
    const score = fragment.querySelector(".score-badge__value");
    const description = fragment.querySelector(".beverage-card__description");
    const tagRow = fragment.querySelector(".tag-row");
    const ratingValue = fragment.querySelector(".rating-panel__value");
    const starRow = fragment.querySelector(".star-row");
    const personalRating = ratings[beverage.id] || 0;

    card.classList.add("reveal");
    card.style.animationDelay = `${index * 70}ms`;
    card.dataset.id = beverage.id;
    glow.style.background = `radial-gradient(circle, ${beverage.accentA}, transparent 70%)`;
    orb.style.background = `radial-gradient(circle at 35% 35%, ${beverage.accentB}, transparent 72%)`;
    category.textContent = beverage.category;
    name.textContent = beverage.name;
    origin.textContent = beverage.origin;
    score.textContent = communityScore(beverage).toFixed(1);
    description.textContent = beverage.description;
    ratingValue.textContent = personalRating ? `${personalRating}/5` : "Not rated";

    beverage.tags.forEach((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      tagRow.appendChild(item);
    });

    for (let value = 1; value <= 5; value += 1) {
      starRow.appendChild(createStarButton(beverage.id, value, personalRating));
    }

    card.addEventListener("mouseenter", () => setSpotlight(beverage));
    beverageGrid.appendChild(fragment);
  });
}

function rateBeverage(beverageId, value) {
  ratings = {
    ...ratings,
    [beverageId]: value,
  };
  saveRatings();
  updateStats();
  renderCards();
}

function rotateSpotlight(preferTopRated = false) {
  if (!beverages.length) {
    setSpotlight();
    return;
  }

  const sorted = [...beverages].sort((left, right) => communityScore(right) - communityScore(left));
  if (preferTopRated) {
    setSpotlight(sorted[0]);
    return;
  }

  spotlightIndex = (spotlightIndex + 1) % beverages.length;
  setSpotlight(beverages[spotlightIndex]);
}

function resetFilters() {
  activeCategory = "all";
  activeSearch = "";
  categoryFilter.value = "all";
  searchInput.value = "";
  renderCards();
}

categoryFilter.addEventListener("change", (event) => {
  activeCategory = event.target.value;
  renderCards();
});

searchInput.addEventListener("input", (event) => {
  activeSearch = event.target.value.trim().toLowerCase();
  renderCards();
});

resetFiltersButton.addEventListener("click", resetFilters);
surpriseButton.addEventListener("click", () => rotateSpotlight(false));
randomRatingButton.addEventListener("click", () => rotateSpotlight(true));

beverageGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".star-button");
  if (!button) return;
  rateBeverage(button.dataset.beverageId, Number(button.dataset.value));
});

async function initializeApp() {
  beverages = await loadBeverages();
  populateCategories();
  setSpotlight(beverages[0]);
  updateStats();
  renderCards();
}

initializeApp();
