const beverages = [
  {
    id: "sprite",
    name: "Sprite",
    category: "Soda",
    origin: "Atlanta, USA",
    description: "Crisp lemon-lime soda with refreshing carbonation and a clean, citrus taste.",
    tags: ["Citrus", "Refreshing", "Crisp"],
    baseRating: 4.6,
    image: "./images/sprite.svg",
    accentA: "#4CAF50",
    accentB: "#1B5E20",
  },
  {
    id: "breezer",
    name: "Breezer",
    category: "Beverage",
    origin: "Global",
    description: "Tropical fruit-flavored alcoholic drink with a smooth, sweet taste and vibrant flavors.",
    tags: ["Tropical", "Fruity", "Sweet"],
    baseRating: 4.3,
    image: "./images/breezer.svg",
    accentA: "#FF6B9D",
    accentB: "#C51162",
  },
  {
    id: "coca-cola",
    name: "Coca-Cola",
    category: "Soda",
    origin: "Atlanta, USA",
    description: "The classic cola with a perfect balance of sweetness and fizz. An iconic taste known worldwide.",
    tags: ["Classic", "Cola", "Iconic"],
    baseRating: 4.8,
    image: "./images/coca-cola.svg",
    accentA: "#F40009",
    accentB: "#B71C1C",
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
          <h2 id="spotlight-name">Aurora Matcha Tonic</h2>
          <p id="spotlight-description">
            Botanical brightness, electric citrus, and a velvet green tea finish.
          </p>
          <div class="spotlight-panel__meta">
            <span id="spotlight-tag">Sparkling</span>
            <span id="spotlight-origin">Osaka, Japan</span>
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
              placeholder="Try yuzu, espresso, cacao..."
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
        <img class="beverage-card__image" src="" alt="" />
        <div class="beverage-card__glow"></div>
        <div class="beverage-card__orb"></div>
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
    const image = fragment.querySelector(".beverage-card__image");
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

    // Set image if available, otherwise use gradients as fallback
    if (beverage.image) {
      image.src = beverage.image;
      image.alt = `${beverage.name} logo`;
      image.style.display = "block";
      glow.style.display = "none";
      orb.style.display = "none";
    } else {
      glow.style.background = `radial-gradient(circle, ${beverage.accentA}, transparent 70%)`;
      orb.style.background = `radial-gradient(circle at 35% 35%, ${beverage.accentB}, transparent 72%)`;
      image.style.display = "none";
    }

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
