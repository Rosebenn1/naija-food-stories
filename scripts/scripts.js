/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */
// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const navList = document.getElementById('nav-list');
if (toggle && navList) {
  // start collapsed on small screens
  function collapseIfMobile() {
    if (window.innerWidth <= 760) {
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
    if (willOpen) {
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
// Note: cards are rendered dynamically from the `stories` dataset, so query them when filtering.
const searchInput = document.getElementById('q') || document.querySelector('.search-box input[type="search"]');
const regionInline = document.getElementById('regionInline');
const cuisineInline = document.getElementById('cuisineInline');
const occasionInline = document.getElementById('occasionInline');
const regionButtons = Array.from(document.querySelectorAll('.region-card'));
const regionSelectMobile = document.getElementById('region-card');

function normalize(text) {
  return (text || '').toString().trim().toLowerCase();
}

function matchOccasion(cardOccasion, filterOccasion) {
  if (!filterOccasion || filterOccasion === 'any') return true;
  if (!cardOccasion) return false;
  return cardOccasion === filterOccasion;
}

function filterCards() {
  const q = normalize(searchInput ? searchInput.value : '');
  const region = (regionInline && regionInline.value) || (regionSelectMobile && regionSelectMobile.value) || 'all';
  const cuisine = (cuisineInline && cuisineInline.value) || 'any';
  const occasion = (occasionInline && occasionInline.value) || 'any';

  const cards = Array.from(document.querySelectorAll('.cards-grid .card'));
  cards.forEach(card => {
    let visible = true;

    // text search against title and description
    if (q) {
      const title = normalize(card.querySelector('h3') && card.querySelector('h3').textContent);
      const desc = normalize(card.querySelector('p') && card.querySelector('p').textContent);
      if (!(title.includes(q) || desc.includes(q))) visible = false;
    }

    // region
    const cardRegion = (card.dataset.region || '').toLowerCase();
    if (region && region !== 'all' && cardRegion !== region) visible = false;

    // cuisine
    const cardCuisine = (card.dataset.cuisine || '').toLowerCase();
    if (cuisine && cuisine !== 'any' && cardCuisine !== cuisine) visible = false;

    // Occasion
    const cardOccasion = (card.dataset.occasion || '').toLowerCase();
    if (occasion && occasion !== 'any' && !matchOccasion(cardOccasion, occasion)) visible = false;

    card.style.display = visible ? '' : 'none';
  });
}

// Debounce helper
function debounce(fn, wait = 200) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

// Wire inputs
if (searchInput) {
  searchInput.addEventListener('input', debounce(filterCards, 180));
}
if (regionInline) {
  regionInline.addEventListener('change', () => { filterCards(); });
}
if (cuisineInline) {
  cuisineInline.addEventListener('change', () => { filterCards(); });
}
if (occasionInline) {
  occasionInline.addEventListener('change', () => { filterCards(); });
}
if (regionSelectMobile) {
  regionSelectMobile.addEventListener('change', () => { filterCards(); });
}

// Wire quick region buttons
regionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const selected = btn.dataset.region || 'all';
    // update inline select if present
    if (regionInline) regionInline.value = selected;
    if (regionSelectMobile) regionSelectMobile.value = selected;
    // toggle aria-pressed
    regionButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    filterCards();
  });
});

// Keep existing responsive filter behaviour
function adaptFilters() {
  const searchBox = document.querySelector('.search-area');
  const searchMinBox = document.querySelector('.search-area-min');
  if (window.innerWidth <= 760) {
    if (searchBox) searchBox.style.display = 'none';
    if (searchMinBox) searchMinBox.style.display = 'block';
  } else {
    if (searchBox) searchBox.style.display = 'block';
    if (searchMinBox) searchMinBox.style.display = 'none';
  }
}
adaptFilters();
window.addEventListener('resize', adaptFilters);

// initial filter run
filterCards();

/* Stories dataset and modal logic (used by index to show stories)*/
const stories = {
  jollof: {
    title: 'Jollof Rice',
    region: 'Western',
    image: 'images/jollofrice.jpg',
    teaser: 'Nigeria most beloved rice dish, known for its rich tomato-based sauce and smoky flavor. Often called party jollof when made in large quantities.', occasion: 'Birthday',
    cuisine: 'Premium',
    story: 'No dish sparks more passion across West Africa than Jollof Rice. This vibrant, tomato-red rice originated with the Wolof people of Senegal, but as it traveled along trade routes, each country made it their own. Nigerian Jollof is bold and smoky, cooked until the bottom develops a prized crispy layer called the party that guests fight over at celebrations. The famous Nigeria-Ghana Jollof Wars have become legendary on social media, with each country fiercely defending their version superiority. Nigerians insist their Jollof is smokier and more flavorful. Ghanaians counter with claims of aromatic perfection. This friendly rivalry has done more to celebrate the dish globally than any marketing campaign ever could. At Nigerian parties, Jollof Rice is not just food, it is a measure of success. If you want to know if a party was good, ask about the Jollof, goes the saying. Party Jollof, cooked in massive pots over open wood fires, develops flavors impossible to replicate in home kitchens. The sound of Jollof being served is the sound of celebration itself. For Nigerians abroad, the aroma of Jollof Rice cooking is an instant transport home, to Sunday afternoons, grandmothers kitchen, and the taste of belonging. It is memory, celebration, and identity in every grain.',
    ingredients: [
      '4 cups long-grain parboiled rice',
      '6 medium tomatoes, blended',
      '3 red bell peppers (tatashe), blended',
      '2 medium onions',
      '2-3 scotch bonnet peppers',
      '1/2 cup vegetable oil',
      '2 tsp curry powder',
      '2 stock cubes, salt to taste',
      '3 tablespoons tomato paste',
      '2 cups chicken or beef stock',
      '2 teaspoons thyme',
      '1 teaspoon curry powder',
      'Salt to taste',
      '2 seasoning cubes',


    ],
    steps: [
      '1. Blend tomatoes, red bell peppers, scotch bonnet, and one onion until smooth.',
      'Boil the blended mixture for 20-30 minutes until reduced by one-third.',
      'Heat oil in a heavy-bottomed pot and fry sliced onions until golden.',
      'Add tomato paste and fry for 2-3 minutes.',
      'Pour in the reduced pepper mixture and fry until oil floats on top (about 20 minutes).',
      'Add stock, seasonings, thyme, curry, and bay leaves. Stir well.',
      'Wash and add rice, ensuring liquid covers rice by about an inch.',
      'Cover tightly with foil, then the lid. Cook on low heat for 30-40 minutes.',
      'Stir gently and let it steam until rice is tender and slightly smoky at the bottom.',
    ],
      external: { label: 'Watch a Jollof tutorial on YouTube', url: 'https://www.youtube.com/watch?v=z4tNAyRdo70'}
  },

  suya: {
    title: 'Suya (Grilled Spiced Meat)',
    region: 'Northern (popular across Nigeria)',
    image: 'images/suya.webp',
    teaser: 'Thinly sliced beef or chicken rubbed with peanut-chilli spice and grilled until charred.',
    occasion: 'NightLife', cuisine: 'Street food',
    story: ['Fire, Spice, and the Night Markets of the North', 'As the sun sets over Nigerian cities, smoke rises from countless roadside grills, and the intoxicating aroma of roasting meat fills the air. Nigerians from all walks of life make their way to their favorite "Mai Suya"—the suya man. This spicy grilled meat, coated in the peanut-based yaji spice blend, it is the most beloved Nigerian street food. The story of Suya begins with the Hausa people, nomadic cattle herders who needed ways to preserve meat in scorching heat. They developed thin slices of beef coated in spices that could last for days. What began as survival food evolved into art, with each Mai Suya guarding his unique yaji recipe—ground peanuts, cayenne, ginger, and secret spices that regular customers can identify by taste alone. Watch a skilled Mai Suya at work and you witness a performance. Meat sliced paper-thin, threaded onto skewers, dipped in oil, pressed into mounds of yaji, and grilled over glowing coals. The serving ritual is sacred: meat chopped, topped with fresh onions and tomatoes, wrapped in newspaper, and handed over still smoking. Suya culture is democratic. At any busy suya spot, you will find everyone businessmen, students, couples on dates, friends solving the proplems in Nigeria. For those few moments around the grill, social barriers dissolve. Everyone is equal before the suya.',],
    ingredients: [
      '2lbs beef sirloin or flank steak, thinly sliced',
      'For Yaji Spice (Suya Spice):',
      '1 cup roasted peanuts, ground',
      '2 tablespoons paprika',
      '1 tablespoon cayenne pepper',
      '1 tablespoon ginger powder',
      '1 tablespoon garlic powder',
      '1 tablespoon onion powder',
      '1 teaspoon salt',
      '1/2 teaspoon white pepper',
      'Vegetable oil for coating',
      'Wooden skewers, soaked in water',
],
    steps: ['Combine all yaji spice ingredients and mix thoroughly.', 'Slice beef very thin, against the grain.', 'Brush meat slices with vegetable oil.', 'Coat generously with yaji spice on all sides.', 'Thread meat onto soaked wooden skewers in accordion style.','Marinate for at least 1 hour (or overnight in refrigerator).', 'Grill over hot charcoal or broil in oven at high heat for 3-4 minutes per side.', 'Sprinkle with more yaji spice before serving.', 'Serve with sliced onions, tomatoes, and fresh cabbage.',],
    external: { label: 'Suya recipe video', url: 'https://www.youtube.com/watch?v=jrfiEXS0A-M'}
  },

  egusi: {
    title: 'Egusi Soup & Fufu',
    region: 'East/West variants',
    image: 'images/egusiSoup.jpg',
    teaser: 'Melon-seed soup simmered with greens and tender meat, served with fufu.', 
    occasion: 'Wedding', 
    cuisine: 'Premium',
    story: ['Seeds of Heritage, Bowls of Gold', 'Hidden within the flesh of a humble melon lie seeds that become one of the most treasured soups in Nigeria. Egusi, ground melon seeds transforms into a rich, golden soup that has nourished generations. Long before written records, indigenous peoples discovered that these seeds, when dried and ground, could create something magnificent. Each ethnic group developed their own variation. The Yoruba make "Efo Elegusi" with generous leafy vegetables. The Igbo prepare "Ofe Egusi" with distinctive floating lumps. Yet all share that unmistakable nutty, earthy flavor that only egusi provides. The preparation was traditionally passed from mother to daughters secrets about oil temperature, when to add the paste, how to balance bitter leaf with rich seeds. Palm oil is an essential partner of Egusi, creating a soup of stunning color burnt orange meeting forest green when vegetables are added. In many Nigerian homes, Egusi Soup is reserved for special occasions and Sunday meals, when families gather around bowls of steaming soup and freshly pounded yam. For Nigerians in diaspora, Egusi Soup is perhaps the most powerful taste of home. Video calls often include tearful moments when elderly parents watch their children abroad eat the soup they taught them to make. It connects generations across oceans.',],
    ingredients: [
      '2 cups ground egusi (melon seeds)',
      '1/2 cup palm oil',
      '1 lb beef or assorted meat',
      '1/2 lb stockfish or dried fish',
      '2 cups spinach or bitter leaf, chopped',
      '2 tablespoons ground crayfish',
      '1 medium onion',
      '2 scotch bonnet peppers, blended',
      '1 tablespoon locust beans(iru/dawadawa)',
      'Salt and seasoning cubes to taste',
],
    steps: ['Brown meat and set aside.', 'Fry onion in palm oil, add ground egusi and toast lightly.', 'Add stock gradually, add meat and simmer.', 'Stir in greens and finish with seasoning.'],
    external: { label: 'Full Egusi recipe', url: 'https://www.youtube.com/watch?v=UHe8K6uM-Z0' }
  },

  peppersoup:
  {
    title: 'Pepper Soup',
    region: 'Western',
    image: 'images/pepperSoup.jpg',
    teaser: 'A spicy, aromatic broth often made with fish, goat or chicken.', 
    occasion: 'NightLife', 
    cuisine: 'Premium',
    story: ['Medicine, Comfort, and Fire in a Bowl', 'When the body is tired or sickness threatens, Nigerians turn to one prescription that crosses all ethnic and religious lines: Pepper Soup. This fiery, aromatic broth is medicine and comfort combined—a bowl of heat believed to cure almost anything. Traditional healers understood that certain spices had medicinal properties, and they created broths combining these ingredients with rich meat stock. The key is the spice blend—grains of selim, calabash nutmeg, negro pepper, alligator pepper—each contributing flavor and supposed medicinal benefit. Family recipes are guarded carefully. Pepper Soup is what you eat after childbirth, what those recovering from illness are fed, what cold victims seek out. Nigerian mothers keep pepper soup spices ready at all times."Pepper Soup joints" are establishments that stay open late into the night, where friends gather after work, deals are discussed, and conversations flow freely. Goat meat Pepper Soup holds special status—the meat releasing its essence into the broth while remaining tender, the aroma rising in steam. Catfish Pepper Soup, called "Point and Kill," involves customers pointing to live fish in tanks, prepared fresh. Pepper Soup reminds us that food can heal. When Nigerians are far from home and feeling unwell, they crave Pepper Soup above all else. It is care in liquid form, warmth that penetrates to the soul.',],
  ingredients: ['2 lbs goat meat, cut into pieces', '2 tablespoons pepper soup spice', '1 medium onion, chopped', '1 tablespoon ground crayfish', '2-3 scotch bonnet peppers', '4 cloves garlic, minced',
         '1 inch fresh ginger, grated', '1 teaspoon thyme', 'Uziza or scent leaves for garnish', 'Salt and seasoning cubes to taste', '8 cups water'],
    steps: ['Boil meat until tender.', 'Add pepper soup spice mix and simmer briefly.', 'Finish with fresh herbs and serve hot.'],
    external: { label: 'Pepper soup guide', url: 'https://www.youtube.com/watch?v=9aOKjLE-uFE' }
  },

  akara:
  {
    title: 'Akara (Bean Fritters)',
    region: 'Western (Snack)',
    image: 'images/akara.jpg',
    teaser: 'Crispy fritters made from blended black-eyed peas.', 
    occasion: 'NightLife', 
    cuisine: 'Comfort',
    story: ['Golden Dawn Blessing', 'As dawn breaks over Nigerian cities, a transformation begins. Black-eyed peas, soaked overnight, are ground into fluffy batter and dropped into hot oil, emerging as Akara—golden, crispy, and ready to start the day. This breakfast blessing has transcended borders, traveling with enslaved Africans to Brazil where it became "Acarajé," now famous street food in Salvador. Making Akara separates dedicated cooks from casual ones. Beans must be properly peeled, ground to the right consistency, and beaten vigorously until the batter holds peaks. The oil must be exactly right. The dropping technique, the timing of the flip—everything matters. Akara vendors set up before dawn; by the time most people wake, the air is already perfumed with frying beans. The traditional pairing is with Ogi—fermented corn porridge called Pap. Crispy, savory Akara with smooth, slightly sour porridge is one of the perfect breakfasts in West Africa. Alternatively, Akara stuffed in fresh bread creates "Akara and Bread"—street food perfection.Akara carries strong associations with Saturday mornings—time for this more involved meal when families gather, children dip Akara into hot Pap, and the weekend officially begins. For many Nigerians, this is the taste of childhood Saturdays, of leisure, of family time.'],
    ingredients: ['2 cups black-eyed peas (peeled)', '1 medium onion, roughly chopped', 'Salt to taste', 'Vegetable oil for frying'],
    steps: ['Soak beans for 5-10 minutes, then rub to remove skins.','Rinse repeatedly until beans are completely peeled.', 'Blend beans with peppers and minimal water to form a thick, smooth batter.', 'Do not over-blend or add too much water.', 'Transfer to a bowl and whip vigorously with a wooden spoon or mixer to incorporate air.', 'The batter should become light and fluffy.', 'Add diced onions and salt just before frying.', 'Heat oil to 350°F/175°C (about 3 inches deep).', 'Scoop batter with a spoon and drop carefully into hot oil.', 'Fry until golden brown on all sides (4-5 minutes).', 'Drain on paper towels. Serve hot with pap, bread, or pepper sauce.'],
    external: { label: 'Akara recipe website', url: 'https://www.youtube.com/watch?v=r2hVi_f4M6g'}
  },

  okro: {
    title: 'Okro Soup',
    region: 'Various',
    image: 'images/okroSoup.jpg',
    teaser: 'Velvety okra stew enriched with fish or meat and palm oil.', occasion: 'any', cuisine: 'Premium',
    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ingredients: ['Fresh okra (sliced)', 'Assorted meat', 'Palm oil', 'Onion', 'Seasoning'],
    steps: ['Sauté onions and meat, add palm oil.', 'Stir in sliced okra and cook briefly to a velvety texture.', 'Season and serve with fufu.'],
    external: { label: 'Okro soup tutorial', url: 'https://example.com/okro' }
  },
  moimoi:
  {
    title: 'Moin Moin', region: 'Western', image: 'images/moimoin.jpeg', teaser: 'Steamed bean pudding often served as a side.', occasion: 'Wedding', cuisine: 'Premium', story: 'A protein-rich steamed bean pudding enjoyed at many gatherings.',
    ingredients: ['2 cups peeled beans', '1 onion', 'Vegetable oil', 'Seasoning'],
    steps: ['Blend beans with onion to a smooth batter.', 'Season and steam the batter in tins or leaves until set.'],
    external: { label: 'Moin Moin guide', url: 'https://example.com/moinmoin' }
  },
  ogbono: {
    title: 'Ogbono Soup', region: 'Various', image: 'images/ogbono.jpeg', teaser: 'Thick soup made from ground ogbono seed.', occasion: 'any', cuisine: 'Premium', story: 'Known for its slippery texture and hearty flavours.',
    ingredients: ['Ground ogbono', 'Assorted meats', 'Leafy greens', 'Palm oil'],
    steps: ['Toast and dissolve ogbono in stock to thicken.', 'Add meats and greens and simmer.'],
    external: { label: 'Ogbono recipe', url: 'https://example.com/ogbono' }
  },
  nkwobi:
  {
    title: 'Nkwobi', region: 'Eastern', image: 'images/nkwobi.jpeg', teaser: 'Spiced cow-foot dish in palm oil sauce.', occasion: 'NightLife', cuisine: 'Comfort', story: 'A festive delicacy with bold, spicy notes.',
    ingredients: ['Cow foot', 'Palm oil', 'Spices', 'Utazi leaves'],
    steps: ['Cook cow foot until tender.', 'Mix with spiced palm oil sauce and serve.'],
    external: { label: 'Nkwobi recipe', url: 'https://example.com/nkwobi' }
  },
  banga:
  {
    title: 'Banga Soup', region: 'South-South', image: 'images/banga.jpeg', teaser: 'Palm-nut based soup rich with spices.', occasion: 'any', cuisine: 'Premium', story: 'A deeply flavored soup commonly paired with starches.', ingredients: ['Palm nut extract', 'Assorted fish/meat', 'Spices', 'Banga spice mix'],
    steps: ['Extract palm fruit to make the base.', 'Add spices and proteins, simmer until ready.'],
    external: { label: 'Banga recipe', url: 'https://example.com/banga' }
  },
  amala:
  {
    title: 'Amala & Ewedu', region: 'Western', image: 'images/amala.jpeg', teaser: 'Yam-flour swallow usually paired with ewedu.', occasion: 'Wedding', cuisine: 'Comfort', story: 'Soft, brown amala eaten with stews and sauces.',
    ingredients: ['Yam flour (elubo)', 'Water'],
    steps: ['Stir yam flour into boiling water until smooth and elastic.', 'Serve with stew.'],
    external: { label: 'Amala instructions', url: 'https://example.com/amala' }
  },
  eforiro: {
    title: 'Efo Riro', region: 'Western', image: 'images/efoRiro.jpeg', teaser: 'Vibrant spinach-and-tomato stew.', occasion: 'any', cuisine: 'Premium', story: 'A colourful vegetable stew often including fish or meat.',
    ingredients: ['Spinach or greens', 'Tomatoes', 'Onion', 'Palm oil', 'Protein'],
    steps: ['Blend and fry tomato base, add protein, then greens and simmer.'],
    external: { label: 'Efo riro recipe', url: 'https://example.com/eforiro' }
  },
  nsala:
  {
    title: 'Nsala (White Soup)', region: 'Eastern', image: 'images/nsala.jpeg', teaser: 'Light, peppery soup typically with fresh fish.', occasion: 'any', cuisine: 'Premium', story: 'Also called white soup; delicate and aromatic.',
    ingredients: ['Fresh fish or meat', 'Yam (thickener)', 'Pepper', 'Seasoning'],
    steps: ['Cook proteins until tender, thicken with yam, season and serve.'],
    external: { label: 'Nsala recipe', url: 'https://example.com/nsala' }
  },
  ofada:
  {
    title: 'Ofada Rice & Ayamase', region: 'Western', image: 'images/ofada.jpeg', teaser: 'Locally-grown rice with green pepper stew.', occasion: 'Wedding', cuisine: 'Premium', story: 'Distinctive, smoky-tasting rice served with spicy sauce.',
    ingredients: ['Ofada rice', 'Green bell peppers', 'Palm oil', 'Onion', 'Protein'],
    steps: ['Prepare spicy green pepper stew (ayamase) and serve with ofada rice.'],
    external: { label: 'Ofada rice guide', url: 'https://example.com/ofada' }
  },
  asaro:
  {
    title: 'Asaro (Yam Porridge)', region: 'Various', image: 'images/asaro.jpeg', teaser: 'Mashed yam stewed with peppers and palm oil.', occasion: 'any', cuisine: 'Comfort', story: 'A comforting one-pot yam porridge.',
    ingredients: ['Yam', 'Tomatoes', 'Palm oil', 'Onion', 'Protein'],
    steps: ['Cook yam with blended tomatoes and palm oil until tender and well combined.'],
    external: { label: 'Asaro recipe', url: 'https://example.com/asaro' }
  },
  isi_ewu:
  {
    title: 'Isi Ewu', region: 'Eastern', image: 'images/isiEwu.jpeg', teaser: 'Spiced goat-head delicacy.', occasion: 'any', cuisine: 'Comfort', story: 'A rich dish traditionally served at celebrations.',
    ingredients: ['Goat head pieces', 'Palm oil', 'Spices', 'Utazi'],
    steps: ['Cook goat head, prepare spiced sauce and combine before serving.'],
    external: { label: 'Isi Ewu instructions', url: 'https://example.com/isi-ewu' }
  },
  okpa: {
    title: 'Okpa', region: 'Eastern', image: 'images/okpa.jpeg', teaser: 'Steamed Bambara nut pudding.', occasion: 'any', cuisine: 'street', story: 'Nutritious local snack or breakfast item.',
    ingredients: ['Bambara nut flour', 'Salt', 'Pepper'],
    steps: ['Mix flour with water and seasoning, steam until set.'],
    external: { label: 'Okpa recipe', url: 'https://example.com/okpa' }
  },
  ofeowerri: {
    title: 'Ofe Owerri', region: 'Eastern', image: 'images/ofeOwerri.jpeg', teaser: 'Hearty vegetable soup from Owerri.', occasion: 'Wedding', cuisine: 'Premium', story: 'A protein-packed vegetable soup.',
    ingredients: ['Local greens', 'Proteins', 'Palm oil', 'Spices'],
    steps: ['Prepare a rich vegetable soup with proteins and local leaves.'],
    external: { label: 'Ofe Owerri', url: 'https://example.com/ofeowerri' }
  },
  ukwa: {
    title: 'Ukwa (Breadfruit)', region: 'Eastern', image: 'images/ukwa.jpeg', teaser: 'Boiled breadfruit often cooked with palm oil and spices.', occasion: 'Wedding', cuisine: 'Premium', story: 'A seasonal specialty with a unique texture.',
    ingredients: ['Ukwa (breadfruit)', 'Palm oil', 'Pepper', 'Seasoning'],
    steps: ['Boil ukwa and season; optionally cook with palm oil and spices.'],
    external: { label: 'Ukwa guide', url: 'https://example.com/ukwa' }
  },
  pepperedfish: {
    title: 'Peppered Fish', region: 'Coastal', image: 'images/pepperedFish.jpeg', teaser: 'Grilled fish in a spicy pepper sauce.', occasion: 'NightLife', cuisine: 'Street', story: 'Smoky grilled fish served with a fiery sauce.',
    ingredients: ['Whole fish', 'Peppers', 'Onion', 'Oil'],
    steps: ['Grill or fry fish, prepare pepper sauce and serve together.'],
    external: { label: 'Peppered fish recipe', url: 'https://example.com/pepperedfish' }
  }
};


// Render the cards grid from the stories dataset
function renderCardsFromStories() {
  const grid = document.querySelector('.cards-grid');
  if (!grid) return;
  grid.innerHTML = '';
  Object.keys(stories).forEach((id) => {
    const s = stories[id];
    const regionAttr = (s.region || 'Various').toString().toLowerCase().split(/[\/ ,]+/)[0];
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-labelledby', `d-${id}`);
    card.dataset.region = regionAttr;
    card.dataset.cuisine = s.cuisine || 'any';
    card.dataset.occasion = s.occasion || 'any';

    card.innerHTML = `
      <img src="${s.image}" alt="${s.title}">
      <div class="card-body">
        <div class="meta"><span class="badge-premium">${s.region}</span></div>
        <h3 id="d-${id}">${s.title}</h3>
        <p>${s.teaser || ''}</p>
        <div class="actions">
          <a class="btn btn-primary view-story" href="story.html?id=${id}" data-id="${id}">View Story</a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Render cards immediately so filters can work
renderCardsFromStories();
