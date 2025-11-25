/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */
// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const navList = document.getElementById('nav-list');
if (toggle && navList) {
  // start collapsed on small screens
  function collapseIfMobile(){
    if(window.innerWidth <= 760){
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      // make sure nav is visible on larger screens
      navList.classList.remove('open');
      navList.style.display = '';
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    const willOpen = !expanded;
    toggle.setAttribute('aria-expanded', String(willOpen));
    if(willOpen){
      navList.classList.add('open');
    } else {
      navList.classList.remove('open');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      // ensure nav is visible and not using mobile open state
      navList.classList.remove('open');
      navList.style.display = '';
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // initialize
  collapseIfMobile();
}

// Filtering functionality for recipes
const cards = Array.from(document.querySelectorAll('.cards-grid .card'));
const searchInput = document.getElementById('q') || document.querySelector('.search-box input[type="search"]');
const regionInline = document.getElementById('regionInline');
const cuisineInline = document.getElementById('cuisineInline');
const timeInline = document.getElementById('timeInline');
const regionButtons = Array.from(document.querySelectorAll('.region-card'));
const regionSelectMobile = document.getElementById('region-select');

function normalize(text){
  return (text || '').toString().trim().toLowerCase();
}

function matchTime(cardTime, filterTime){
  if(!filterTime || filterTime === 'any') return true;
  if(!cardTime) return false;
  return cardTime === filterTime;
}

function filterCards(){
  const q = normalize(searchInput ? searchInput.value : '');
  const region = (regionInline && regionInline.value) || (regionSelectMobile && regionSelectMobile.value) || 'all';
  const cuisine = (cuisineInline && cuisineInline.value) || 'any';
  const time = (timeInline && timeInline.value) || 'any';

  cards.forEach(card => {
    let visible = true;

    // text search against title and description
    if(q){
      const title = normalize(card.querySelector('h3') && card.querySelector('h3').textContent);
      const desc = normalize(card.querySelector('p') && card.querySelector('p').textContent);
      if(!(title.includes(q) || desc.includes(q))) visible = false;
    }

    // region
    const cardRegion = (card.dataset.region || '').toLowerCase();
    if(region && region !== 'all' && cardRegion !== region) visible = false;

    // cuisine
    const cardCuisine = (card.dataset.cuisine || '').toLowerCase();
    if(cuisine && cuisine !== 'any' && cardCuisine !== cuisine) visible = false;

    // time
    const cardTime = (card.dataset.time || '').toLowerCase();
    if(time && time !== 'any' && !matchTime(cardTime, time)) visible = false;

    card.style.display = visible ? '' : 'none';
  });
}

// Debounce helper
function debounce(fn, wait = 200){
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

// Wire inputs
if(searchInput){
  searchInput.addEventListener('input', debounce(filterCards, 180));
}
if(regionInline){
  regionInline.addEventListener('change', () => { filterCards(); });
}
if(cuisineInline){
  cuisineInline.addEventListener('change', () => { filterCards(); });
}
if(timeInline){
  timeInline.addEventListener('change', () => { filterCards(); });
}
if(regionSelectMobile){
  regionSelectMobile.addEventListener('change', () => { filterCards(); });
}

// Wire quick region buttons
regionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const selected = btn.dataset.region || 'all';
    // update inline select if present
    if(regionInline) regionInline.value = selected;
    if(regionSelectMobile) regionSelectMobile.value = selected;
    // toggle aria-pressed
    regionButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    filterCards();
  });
});

// Keep existing responsive filter behaviour
function adaptFilters(){
  const searchBox = document.querySelector('.search-area');
  const searchMinBox = document.querySelector('.search-area-min');
  if(window.innerWidth <= 760){
    if(searchBox) searchBox.style.display = 'none';
    if(searchMinBox) searchMinBox.style.display = 'block';
  } else {
    if(searchBox) searchBox.style.display = 'block';
    if(searchMinBox) searchMinBox.style.display = 'none';
  }
}
adaptFilters();
window.addEventListener('resize', adaptFilters);

// initial filter run
filterCards();