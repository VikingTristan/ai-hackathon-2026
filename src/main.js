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
  {
    id: "super-duper-mountain-gray",
    name: "Super Duper Mountain Gray",
    category: "Tea",
    origin: "Pokhara, Nepal",
    description: "High-altitude black tea brightened with bergamot and pine honey for a brisk finish.",
    tags: ["Bergamot", "Mountain", "Classic"],
    baseRating: 4.5,
    accentA: "#9bb2ff",
    accentB: "#cbf57b",
  },
];

const demoUsers = [
  {
    username: "HackyMcGoat",
    avatarEmoji: "🐐",
    avatarLabel: "Goat avatar",
    about: "Loves weird hackathon snacks, always up for a challenge!",
    likes: ["AI prompts", "creative voting", "open source memes"],
    dislikes: ["Boring forms", "hidden leaderboards"],
    recentVotes: [
      "Voted up: Best AI-powered pizza suggestion feature!",
      "Voted up: Ember Espresso Fizz should stay #1",
    ],
    testimonials: [
      "This site helped me find my tribe. 🤘",
      "The community vibe makes every rating feel like a team sport.",
    ],
  },
  {
    username: "Cyborgeeky",
    avatarEmoji: "🤖",
    avatarLabel: "Robot avatar",
    about: "Builds tiny robots and loud opinions about flavor combos.",
    likes: ["Public vote feeds", "silly avatars", "spicy cold brew"],
    dislikes: ["Slow filters", "mystery metrics"],
    recentVotes: [
      "Voted up: Atlas Citrus Mate for focus mode mornings",
      "Voted up: Fjordberry Spritz deserves a comeback",
    ],
    testimonials: [
      "Seeing everyone’s picks made me try drinks I would have skipped.",
      "I came for beverages, stayed for the chaos comments.",
    ],
  },
  {
    username: "PixelPenguin",
    avatarEmoji: "🐧",
    avatarLabel: "Penguin avatar",
    about: "Part-time designer, full-time collector of oddly specific favorites.",
    likes: ["Transparent scores", "fun profiles", "coconut foam"],
    dislikes: ["Wall-of-text UIs", "empty review sections"],
    recentVotes: [
      "Voted up: Violet Ube Cloud for dessert-hour glory",
      "Voted up: Sunline Mango Lassi as comfort MVP",
    ],
    testimonials: [
      "The testimonials gave me instant trust in what to sip next.",
      "Love that every opinion is tied to a real (and goofy) profile.",
    ],
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

      <section class="community" id="community" aria-label="Community testimonials and votes">
        <div class="catalog__header">
          <div>
            <p class="eyebrow">Community Hub</p>
            <h2>Votes, Testimonials & Demo Profiles</h2>
          </div>
          <p class="catalog__status" id="community-status">Loading community updates...</p>
        </div>

        <div class="community-pulse">
          <p class="community-pulse__title">Discover what the community loves and hates</p>
          <div class="community-pulse__actions" role="group" aria-label="Community sentiment view">
            <button class="ghost-button is-active" id="pulse-likes" type="button">What we love</button>
            <button class="ghost-button" id="pulse-dislikes" type="button">What we hate</button>
          </div>
          <ul class="tag-row community-pulse__tags" id="community-pulse-tags"></ul>
        </div>

        <div class="community-grid" id="community-grid" aria-live="polite"></div>
      </section>
    </main>
  </div>

  <template id="beverage-card-template">
    <article class="beverage-card">
      <div class="beverage-card__visual">
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
let pulseMode = "likes";
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
const communityGrid = document.querySelector("#community-grid");
const communityStatus = document.querySelector("#community-status");
const pulseTags = document.querySelector("#community-pulse-tags");
const pulseLikesButton = document.querySelector("#pulse-likes");
const pulseDislikesButton = document.querySelector("#pulse-dislikes");

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

function renderCommunityPulse() {
  const activeMode = ["likes", "dislikes"].includes(pulseMode) ? pulseMode : "likes";
  const entries = demoUsers.flatMap((user) => user[activeMode]);
  const counts = entries.reduce((map, entry) => {
    map.set(entry, (map.get(entry) || 0) + 1);
    return map;
  }, new Map());
  const sortedEntries = [...counts.entries()].sort((left, right) => right[1] - left[1]);

  pulseTags.textContent = "";
  sortedEntries.forEach(([entry, count]) => {
    const item = document.createElement("li");
    item.textContent = `${entry} (${count})`;
    pulseTags.appendChild(item);
  });

  pulseLikesButton.classList.toggle("is-active", pulseMode === "likes");
  pulseDislikesButton.classList.toggle("is-active", pulseMode === "dislikes");
}

function renderCommunity() {
  communityGrid.textContent = "";
  communityStatus.textContent = `${demoUsers.length} demo members sharing votes and testimonials`;

  demoUsers.forEach((user, index) => {
    const card = document.createElement("article");
    card.className = "community-card reveal";
    card.style.animationDelay = `${index * 80}ms`;

    const profile = document.createElement("div");
    profile.className = "community-card__profile";
    const avatar = document.createElement("span");
    avatar.className = "community-card__avatar";
    avatar.setAttribute("role", "img");
    avatar.setAttribute("aria-label", user.avatarLabel);
    avatar.textContent = user.avatarEmoji;
    const profileCopy = document.createElement("div");
    const username = document.createElement("h3");
    username.textContent = user.username;
    const about = document.createElement("p");
    about.textContent = user.about;
    profileCopy.append(username, about);
    profile.append(avatar, profileCopy);

    const details = document.createElement("div");
    details.className = "community-card__details";
    details.append(
      createCommunityTagBlock("Likes", user.likes),
      createCommunityTagBlock("Dislikes", user.dislikes),
    );

    const activity = document.createElement("div");
    activity.className = "community-card__activity";
    activity.append(
      createCommunityActivityBlock("Recent votes", "Vote", user.recentVotes),
      createCommunityActivityBlock("Testimonials", "Testimonial", user.testimonials),
    );

    card.append(profile, details, activity);
    communityGrid.appendChild(card);
  });
}

function createCommunityTagBlock(title, entries) {
  const block = document.createElement("div");
  const heading = document.createElement("h4");
  heading.textContent = title;
  const list = document.createElement("ul");
  list.className = "tag-row";
  entries.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry;
    list.appendChild(item);
  });
  block.append(heading, list);
  return block;
}

function createCommunityActivityBlock(title, label, entries) {
  const wrapper = document.createElement("div");
  const heading = document.createElement("h4");
  heading.textContent = title;
  const list = document.createElement("ul");
  entries.forEach((entry) => {
    const item = document.createElement("li");
    const pill = document.createElement("span");
    pill.className = "activity-pill";
    pill.textContent = label;
    const text = document.createElement("p");
    text.textContent = entry;
    item.append(pill, text);
    list.appendChild(item);
  });
  wrapper.append(heading, list);
  return wrapper;
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
pulseLikesButton.addEventListener("click", () => {
  pulseMode = "likes";
  renderCommunityPulse();
});
pulseDislikesButton.addEventListener("click", () => {
  pulseMode = "dislikes";
  renderCommunityPulse();
});

beverageGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".star-button");
  if (!button) return;
  rateBeverage(button.dataset.beverageId, Number(button.dataset.value));
});

populateCategories();
setSpotlight(beverages[0]);
updateStats();
renderCards();
renderCommunityPulse();
renderCommunity();
