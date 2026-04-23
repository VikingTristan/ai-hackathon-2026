const beverages = [
  {
    id: "aurora-matcha-tonic",
    name: "Aurora Matcha Tonic",
    category: "Sparkling",
    origin: "Osaka, Japan",
    description: "Bright matcha, yuzu zest, and tonic bubbles with a cool mineral finish.",
    tags: ["Citrus", "Tea", "Electric"],
    baseRating: 4.4,
    accentA: "#6fe3d7",
    accentB: "#cbf57b",
  },
  {
    id: "ember-espresso-fizz",
    name: "Ember Espresso Fizz",
    category: "Coffee",
    origin: "Melbourne, Australia",
    description: "Cold espresso shaken with blood orange and panela syrup into a velvet sparkle.",
    tags: ["Coffee", "Citrus", "Night Shift"],
    baseRating: 4.7,
    accentA: "#f07067",
    accentB: "#f6c667",
  },
  {
    id: "celestial-cacao-milk",
    name: "Celestial Cacao Milk",
    category: "Comfort",
    origin: "Oaxaca, Mexico",
    description: "Roasted cacao, cinnamon, oat milk, and a soft chili bloom that lingers.",
    tags: ["Cacao", "Creamy", "Spiced"],
    baseRating: 4.5,
    accentA: "#f6c667",
    accentB: "#f07067",
  },
  {
    id: "fjordberry-spritz",
    name: "Fjordberry Spritz",
    category: "Sparkling",
    origin: "Bergen, Norway",
    description: "Lingonberry, spruce tips, and glacier-cold soda with sharp northern perfume.",
    tags: ["Berry", "Herbal", "Crisp"],
    baseRating: 4.3,
    accentA: "#9bb2ff",
    accentB: "#6fe3d7",
  },
  {
    id: "midnight-jasmine-cola",
    name: "Midnight Jasmine Cola",
    category: "Soda",
    origin: "Taipei, Taiwan",
    description: "Dark caramel depth lit by jasmine aromatics and a clean star-anise snap.",
    tags: ["Floral", "Cola", "Unexpected"],
    baseRating: 4.1,
    accentA: "#7f77ff",
    accentB: "#f07067",
  },
  {
    id: "sunline-mango-lassi",
    name: "Sunline Mango Lassi",
    category: "Comfort",
    origin: "Jaipur, India",
    description: "Ripe mango, cultured yogurt, saffron, and cardamom with dense silk texture.",
    tags: ["Tropical", "Creamy", "Golden"],
    baseRating: 4.8,
    accentA: "#f6c667",
    accentB: "#ff9e57",
  },
  {
    id: "violet-ube-cloud",
    name: "Violet Ube Cloud",
    category: "Dessert",
    origin: "Manila, Philippines",
    description: "Toasted ube, coconut foam, and vanilla ice in a confectionary purple drift.",
    tags: ["Dessert", "Velvet", "Coconut"],
    baseRating: 4.2,
    accentA: "#b985ff",
    accentB: "#f6c667",
  },
  {
    id: "atlas-citrus-mate",
    name: "Atlas Citrus Mate",
    category: "Tea",
    origin: "Buenos Aires, Argentina",
    description: "Yerba mate with pomelo and mint, tuned for focus and bright green energy.",
    tags: ["Botanical", "Focus", "Zesty"],
    baseRating: 4.6,
    accentA: "#cbf57b",
    accentB: "#6fe3d7",
  },
];

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
  spotlightName.textContent = beverage.name;
  spotlightDescription.textContent = beverage.description;
  spotlightTag.textContent = beverage.category;
  spotlightOrigin.textContent = beverage.origin;
}

function updateStats() {
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

populateCategories();
setSpotlight(beverages[0]);
updateStats();
renderCards();
