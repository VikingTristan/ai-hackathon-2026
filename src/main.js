import "./styles.css";

const makeLogo = (svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

const spriteLogo = makeLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img" aria-label="Sprite logo">
  <defs>
    <linearGradient id="sprite-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#12b449" />
      <stop offset="100%" stop-color="#0b7f30" />
    </linearGradient>
  </defs>
  <rect width="320" height="180" rx="28" fill="url(#sprite-bg)" />
  <polygon points="146,20 176,20 165,62 205,44 220,66 180,82 210,106 193,126 162,103 154,160 124,160 134,108 95,126 80,103 120,86 90,62 106,42 138,64" fill="#ffd84a" />
  <text x="160" y="112" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="58" font-style="italic" fill="#f5faff">Sprite</text>
</svg>
`);

const breezerLogo = makeLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img" aria-label="Breezer logo">
  <defs>
    <linearGradient id="breezer-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7f2ff7" />
      <stop offset="100%" stop-color="#f107a3" />
    </linearGradient>
  </defs>
  <rect width="320" height="180" rx="28" fill="url(#breezer-bg)" />
  <circle cx="70" cy="90" r="62" fill="#ffffff22" />
  <circle cx="260" cy="90" r="48" fill="#ffffff14" />
  <text x="160" y="106" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="56" letter-spacing="1.8" fill="#ffffff">BREEZER</text>
</svg>
`);

const cocaColaLogo = makeLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img" aria-label="Coca-Cola logo">
  <rect width="320" height="180" rx="28" fill="#d91b24" />
  <path d="M30 116C68 82 144 140 202 96C234 72 262 70 290 92" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" />
  <text x="160" y="106" text-anchor="middle" font-family="Brush Script MT, Segoe Script, cursive" font-size="64" fill="#ffffff">Coca-Cola</text>
</svg>
`);

const placeholderLogo = makeLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img" aria-label="Beverage logo placeholder">
  <rect width="320" height="180" rx="28" fill="#1a1d2e" />
  <text x="160" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#ffffffaa">Logo</text>
</svg>
`);

const beverages = [
  {
    id: "sprite",
    name: "Sprite",
    category: "Soda",
    origin: "Lemon-Lime",
    description: "The classic crisp lemon-lime soda with bright carbonation.",
    tags: ["Lemon", "Lime", "Sparkling"],
    baseRating: 4.3,
    accentA: "#5de57d",
    accentB: "#c8ff5f",
    logo: spriteLogo,
  },
  {
    id: "breezer",
    name: "Breezer",
    category: "Ready-to-drink",
    origin: "Flavored Malt",
    description: "A sweet and fruity cooler-style beverage served chilled.",
    tags: ["Fruity", "Chilled", "Party"],
    baseRating: 4.1,
    accentA: "#d05dff",
    accentB: "#ff77c8",
    logo: breezerLogo,
  },
  {
    id: "coca-cola",
    name: "Coca-Cola",
    category: "Soda",
    origin: "Classic Cola",
    description: "Signature cola flavor with caramel sweetness and lively fizz.",
    tags: ["Cola", "Classic", "Carbonated"],
    baseRating: 4.6,
    accentA: "#ff5b67",
    accentB: "#ff9b7f",
    logo: cocaColaLogo,
  },
];

const storageKey = "liquid-atlas-ratings";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="page-shell">
    <header class="hero">
      <nav class="topbar">
        <div class="brand-mark">
          <span class="brand-mark__icon"></span>
          <span class="brand-mark__text">Liquid Atlas</span>
        </div>
        <button class="glass-button" id="surprise-button" type="button">Surprise Me</button>
      </nav>

      <div class="hero__content">
        <div class="hero__copy">
          <p class="eyebrow">Curated Beverage Index 2026</p>
          <h1>Rate drinks that feel crafted, not catalogued.</h1>
          <p class="hero__lede">
            A tactile tasting experience built in pure HTML, CSS, and JavaScript. Browse vivid
            pours, compare house favorites, and leave your own score with instant feedback.
          </p>

          <div class="hero__actions">
            <a class="primary-button" href="#catalog">Start Tasting</a>
            <button class="ghost-button" id="random-rating-button" type="button">
              Highlight Top Rated
            </button>
          </div>

          <dl class="hero__stats" id="hero-stats">
            <div>
              <dt>Total Drinks</dt>
              <dd id="stat-total">0</dd>
            </div>
            <div>
              <dt>Community Avg</dt>
              <dd id="stat-average">0.0</dd>
            </div>
            <div>
              <dt>Your Ratings</dt>
              <dd id="stat-rated">0</dd>
            </div>
          </dl>
        </div>

        <aside class="spotlight-panel" id="spotlight-panel" aria-live="polite">
          <p class="spotlight-panel__label">Current Spotlight</p>
          <img
            class="spotlight-panel__logo"
            id="spotlight-logo"
            src="${spriteLogo}"
            alt="Sprite logo"
          />
          <h2 id="spotlight-name">Sprite</h2>
          <p id="spotlight-description">The classic crisp lemon-lime soda with bright carbonation.</p>
          <div class="spotlight-panel__meta">
            <span id="spotlight-tag">Soda</span>
            <span id="spotlight-origin">Lemon-Lime</span>
          </div>
        </aside>
      </div>
    </header>

    <main>
      <section class="controls" aria-label="Beverage controls">
        <div class="section-heading">
          <p class="eyebrow">Discover</p>
          <h2>Find your next obsession</h2>
        </div>

        <div class="control-grid">
          <label class="search-field">
            <span>Search</span>
            <input
              id="search-input"
              type="search"
              placeholder="Try cola, lemon, fruity..."
              autocomplete="off"
            />
          </label>

          <label class="filter-field">
            <span>Category</span>
            <select id="category-filter">
              <option value="all">All categories</option>
            </select>
          </label>

          <button class="glass-button glass-button--wide" id="reset-filters" type="button">
            Reset Filters
          </button>
        </div>
      </section>

      <section class="catalog" id="catalog">
        <div class="catalog__header">
          <div>
            <p class="eyebrow">Collection</p>
            <h2>Beverages Worth Remembering</h2>
          </div>
          <p class="catalog__status" id="results-status">Loading beverages...</p>
        </div>

        <div class="beverage-grid" id="beverage-grid" aria-live="polite"></div>
      </section>
    </main>
  </div>

  <template id="beverage-card-template">
    <article class="beverage-card">
      <div class="beverage-card__visual">
        <div class="beverage-card__glow"></div>
        <div class="beverage-card__orb"></div>
        <img class="beverage-card__logo" src="${placeholderLogo}" alt="Beverage logo" />
        <p class="beverage-card__category"></p>
      </div>

      <div class="beverage-card__body">
        <div class="beverage-card__topline">
          <div>
            <h3 class="beverage-card__name"></h3>
            <p class="beverage-card__origin"></p>
          </div>
          <div class="score-badge">
            <span class="score-badge__value"></span>
            <span class="score-badge__label">avg</span>
          </div>
        </div>

        <p class="beverage-card__description"></p>

        <ul class="tag-row"></ul>

        <div class="rating-panel">
          <div class="rating-panel__summary">
            <span class="rating-panel__label">Your rating</span>
            <strong class="rating-panel__value">Not rated</strong>
          </div>

          <div class="star-row" role="radiogroup" aria-label="Rate beverage"></div>
        </div>
      </div>
    </article>
  </template>
`;

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
const spotlightLogo = document.querySelector("#spotlight-logo");
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
    const haystack =
      `${beverage.name} ${beverage.origin} ${beverage.description} ${beverage.tags.join(" ")}`
        .toLowerCase();
    const matchesSearch = haystack.includes(activeSearch);
    return matchesCategory && matchesSearch;
  });
}

function setSpotlight(beverage) {
  spotlightLogo.src = beverage.logo || placeholderLogo;
  spotlightLogo.alt = beverage.logo ? `${beverage.name} logo` : "Beverage logo unavailable";
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
    const logo = fragment.querySelector(".beverage-card__logo");
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
    logo.src = beverage.logo || placeholderLogo;
    logo.alt = beverage.logo ? `${beverage.name} logo` : "Beverage logo unavailable";
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
