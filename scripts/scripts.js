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
//story.html logic
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
      'Blend tomatoes, red bell peppers, scotch bonnet, and one onion until smooth.',
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
    story: ['Golden Dawn Blessing.', 'As dawn breaks over Nigerian cities, a transformation begins. Black-eyed peas, soaked overnight, are ground into fluffy batter and dropped into hot oil, emerging as Akara—golden, crispy, and ready to start the day. This breakfast blessing has transcended borders, traveling with enslaved Africans to Brazil where it became "Acarajé," now famous street food in Salvador. Making Akara separates dedicated cooks from casual ones. Beans must be properly peeled, ground to the right consistency, and beaten vigorously until the batter holds peaks. The oil must be exactly right. The dropping technique, the timing of the flip—everything matters. Akara vendors set up before dawn; by the time most people wake, the air is already perfumed with frying beans. The traditional pairing is with Ogi—fermented corn porridge called Pap. Crispy, savory Akara with smooth, slightly sour porridge is one of the perfect breakfasts in West Africa. Alternatively, Akara stuffed in fresh bread creates "Akara and Bread"—street food perfection.Akara carries strong associations with Saturday mornings—time for this more involved meal when families gather, children dip Akara into hot Pap, and the weekend officially begins. For many Nigerians, this is the taste of childhood Saturdays, of leisure, of family time.'],
    ingredients: ['2 cups black-eyed peas (peeled)', '1 medium onion, roughly chopped', 'Salt to taste', 'Vegetable oil for frying'],
    steps: ['Soak beans for 5-10 minutes, then rub to remove skins.','Rinse repeatedly until beans are completely peeled.', 'Blend beans with peppers and minimal water to form a thick, smooth batter.', 'Do not over-blend or add too much water.', 'Transfer to a bowl and whip vigorously with a wooden spoon or mixer to incorporate air.', 'The batter should become light and fluffy.', 'Add diced onions and salt just before frying.', 'Heat oil to 350°F/175°C (about 3 inches deep).', 'Scoop batter with a spoon and drop carefully into hot oil.', 'Fry until golden brown on all sides (4-5 minutes).', 'Drain on paper towels. Serve hot with pap, bread, or pepper sauce.'],
    external: { label: 'Akara recipe website', url: 'https://www.youtube.com/watch?v=r2hVi_f4M6g'}
  },

  okro: {
    title: 'Okro Soup',
    region: 'Various',
    image: 'images/okroSoup.jpg',
    teaser: 'A thick, draw soup made from chopped okra, popular across Nigeria and served with various swallows.', 
    occasion: 'any', 
    cuisine: 'Premium',
    story: 'Okro Soup is an original Nigerian comfort food. A thick, "draw" soup that stretches between spoon and swallow in glistening threads. The okra plant has been cultivated in West Africa for centuries, and this soup represents one of the oldest continuous cooking traditions on the continent. The distinctive slimy texture that some newcomers find challenging is what Nigerians treasure most. Every region has its variation. The Yoruba add locust beans for depth. The Igbo might include ogiri for extra umami. In the South-South, fresh seafood dominates. What unites them all is that characteristic draw—the way the soup clings to your swallow, slides down your throat, and leaves you reaching for more. Okro Soup is the great equalizer in Nigerian cuisine. It is quick to prepare, affordable, and deeply satisfying. Street-side bukas serve it alongside expensive restaurants. Students survive on it; executives crave it. When a Nigerian says "I need something simple," Okro Soup is often what they mean. For the diaspora, Okro Soup is one of the easiest tastes of home to recreate. Okra grows worldwide, and the technique is forgiving. Even imperfect attempts can transport a homesick Nigerian back to their mothers kitchen, to Sunday afternoons, to the taste of belonging.',
    ingredients: ['500g fresh okra (chopped or sliced)', '500g assorted meat (beef, goat, tripe)', '200g stockfish (soaked)', '100g dried fish', '1/2 cup palm oil', '2 tablespoons ground crayfish', '1-2 scotch bonnet peppers (blended)', '1 medium onion (chopped)', '2 seasoning cubes Salt to taste Handful of spinach or ugu leaves (optional)',
],
    steps: ['1. Wash and season the assorted meat with onions, seasoning cubes, and salt. Cook until tender.',
      'Add the soaked stockfish and dried fish to the meat pot and cook for another 10 minutes.', 
      'Wash and chop the okra into small pieces (or blend for a smoother texture).',
      'Add palm oil to the pot with the cooked meat and fish. Allow to heat up.',
      'Add the blended pepper and crayfish. Stir and let it cook for 5 minutes.',
      'Pour in the chopped okra and stir continuously to prevent lumps.',
      'Add leafy vegetables if using. Stir and cook for 3-5 minutes.',
      'Adjust salt and seasoning to taste. The soup should have a "slimy" consistency.',
      'Serve hot with pounded yam, eba, fufu, or amala.',],
    external: { label: 'Okro soup tutorial', 
    url: 'https://www.youtube.com/watch?v=bV2sg6mmSH8'}
  },
  moimoi:
  {
    title: 'Moin Moin', 
    region: 'Western', 
    image: 'images/moimoin.jpeg', 
    teaser: 'A savory steamed pudding made from blended black-eyed peas, a protein-rich delicacy enjoyed across Nigeria.', 
    occasion: 'Wedding', 
    cuisine: 'Premium', 
    story: 'A protein-rich steamed bean pudding enjoyed at many gatherings. There is alchemy in turning black-eyed peas into Moi Moi a silky, savory, and sophisticated. What enters the pot as simple bean puree emerges as Nigerian greatest culinary transformation. The beans must be soaked and peeled, a meditative process of rubbing until skins slip off and then blended smooth with peppers and onions, seasoned, and steamed to perfection.Traditionally, Moi Moi was steamed in large leaves that imparted subtle flavor. Watching a Yoruba grandmother fold these leaves into perfect cones is witnessing art developed over centuries. What makes Moi Moi special is its versatility: whole boiled eggs nestled in the center create surprises, pieces of fish or shrimp add protein, and each cook creates their signature version. Moi Moi is the dish Nigerian mothers make when they want to show love through effort. It appears at naming ceremonies, birthdays, and graduations. When a Nigerian says "Let me make Moi Moi for you," they are saying "You are worth my time." The hours spent peeling beans, the careful seasoning, the patient steaming, these are acts of devotion. The texture of properly made Moi Moi is unlike anything else it is smooth and creamy, holding its shape yet melting on the tongue. Achieving this balance is the mark of a skilled cook, and phone calls to mothers often include detailed Moi Moi troubleshooting.',
    ingredients: ['2 cups black-eyed peas (soaked and peeled)', '1/2 cup palm oil or vegetable oil', '2 medium onions', '3-4 scotch bonnet peppers (adjust to taste)', '2 seasoning cubes', 'Salt to taste', '1 cup warm water or stock', 'Optional: boiled eggs, corned beef, sardines, or smoked fish',
],
    steps: ['1. Soak the beans in water for at least 2 hours or overnight to loosen the skins.',
      'Rub the beans between your palms to remove the skins. Rinse repeatedly until all skins are removed.',
      'Blend the peeled beans with onions, peppers, and a little water to form a smooth paste.',
      'Transfer to a large bowl and add palm oil, seasoning cubes, and salt. Mix thoroughly.',
      'Gradually add warm water while mixing until you achieve a smooth, pourable consistency.',
      'Grease your moi moi containers (leaves, foil, or ramekins) with oil.',
      'Pour the mixture into containers. Add optional fillings if desired.',
      'Steam for 45 minutes to 1 hour until firm and cooked through.',
      'Allow to cool slightly before serving. Enjoy with pap, custard, or as a side dish.',
],
    external: { label: 'Moin Moin guide', url: 'https://www.youtube.com/watch?v=YZ6V1CeP3TU'}
  },
  ogbono: {
    title: 'Ogbono Soup', 
    region: 'Various', 
    image: 'images/ogbono.jpeg', 
    teaser: 'A thick, draw soup made from ground African wild mango seeds, beloved for its unique slimy texture.', 
    occasion: 'any', 
    cuisine: 'Premium', 
    story: 'There is a soup in Nigeria that behaves like no other—stretching between spoon and lips in glistening strings, coating pounded yam in slippery embrace. Ogbono Soup, made from wild African mango seeds, is an original Nigerian comfort food. The seeds possess remarkable mucilage that creates a thick, "draw" soup Nigerians find irresistible.Long before modern Nigeria, indigenous peoples gathered these seeds from forest floors, dried them in the sun, and cooked them into nourishing soups. Making Ogbono requires understanding the seed and its behavior—ground ogbono must be fried in palm oil until dissolved, then stock added gradually while stirring constantly to prevent lumps. The texture is polarizing. Those who grew up with it find the draw comforting—the way soup clings to swallow, slides down the throat. Newcomers sometimes struggle, but eat it repeatedly and most come to love it. Unlike the nutty flavor of Egusi, Ogbono has an earthier, more subtle taste, making it an excellent canvas for dried fish, palm oil, and vegetables. The draw is more than texture, it is a metaphor. Just as the soup stretches between spoon and bowl, it stretches between generations, connecting children to parents to grandparents who all ate the same food from the same forest seeds.',
    ingredients:['1 cup ground ogbono seeds', '500g assorted meat (beef, tripe, cow foot)', '200g stockfish', '100g dried fish', '1/2 cup palm oil', '2 tablespoons ground crayfish', '1-2 scotch bonnet peppers (blended)', 'Handful of bitter leaf or spinach (optional)', '2 seasoning cubes', 'Salt to taste', '1 medium onion',
],
    steps: ['Season and cook the assorted meat until tender. Add stockfish and dried fish.',
        'In a separate pot, heat palm oil on medium heat (do not bleach).',
        'Add the ground ogbono to the warm palm oil and fry, stirring constantly for 3-5 minutes.',
        'Gradually add the meat stock while stirring to prevent lumps.',
        'Add the cooked meat, fish, blended pepper, and crayfish.',
        'Add more stock or water to achieve desired consistency. Stir well.',
        'Let it simmer for 10-15 minutes, stirring occasionally.',
        'Add washed bitter leaf or spinach if using. Cook for 2-3 minutes.',
        'Adjust seasoning and serve with pounded yam, eba, or fufu.',
],
    external: { label: 'Ogbono recipe', url: 'https://www.youtube.com/watch?v=kahuJ68GaTk'}
  },

  nkwobi:
  {
    title: 'Nkwobi', 
    region: 'Eastern', 
    image: 'images/nkwobi.jpeg', 
    teaser: 'A spicy cow foot delicacy from Eastern Nigeria, mixed in a rich palm oil and potash sauce.', 
    occasion: 'NightLife', 
    cuisine: 'Comfort', 
    story: 'In the beer parlors of Eastern Nigeria, where friends gather after work and deals are sealed over cold drinks, one dish reigns supreme: Nkwobi. This spicy cow foot delicacy, served in traditional wooden bowls, represents the height of Igbo culinary hospitality. The name comes from "nkwu obi" which means "gathered at the heart", reflecting how the dish brings people together. The magic of Nkwobi lies in the "ngo" sauce. That mysterious yellow-orange emulsion created when palm oil meets potash. Getting this sauce right requires skill passed down through generations. Too much potash and it becomes bitter; too little and the oil will not emulsify properly. The perfect Nkwobi sauce is creamy, spicy, and clings to tender cow foot pieces like a second skin. At any busy Nkwobi joint, you will witness a ritual. The wooden bowls arrive steaming, topped with rings of raw onion and bitter utazi leaves. Conversation pauses as everyone reaches in. The tender meat falls off bones; the spicy sauce ignites taste buds; cold drinks provide relief. Social hierarchies dissolve, everyone is equal before the Nkwobi bowl. Nkwobi has become a symbol of success and celebration. Ordering multiple bowls signals generosity; having a "Nkwobi spot" means you have arrived. For Igbos in diaspora, finding good Nkwobi is like finding a piece of home.',
    ingredients: ['1kg cow foot (cut into pieces)', '1/2 cup palm oil', '1 tablespoon potash (akanwu) or baking soda', '2 tablespoons ground crayfish', '1 teaspoon ground ehuru (calabash nutmeg)', '1-2 scotch bonnet peppers (blended)', 'Utazi leaves for garnish', '1 medium onion (sliced into rings)', '2 seasoning cubes', 'Salt to taste', 'Optional: ugba (oil bean seeds)',
],
    steps: ['1. Wash the cow foot thoroughly and place in a pressure cooker or pot.',
      'Season with onion chunks, seasoning cubes, and salt. Add water to cover.',
      'Cook until very tender (20-25 minutes in pressure cooker, 1.5 hours on stovetop).',
      'Dissolve potash in 4 tablespoons of water. Strain and set aside the liquid.',
      'In a clean pot, add palm oil. Gradually add the potash liquid while stirring.',
      'Continue stirring until the oil turns yellow and thickens to a creamy consistency.',
      'Add ground pepper, crayfish, ehuru, and seasoning. Mix well.',
      'Add the cooked cow foot pieces and stir to coat with the sauce.',
      'Add ugba if using. Heat through for 2-3 minutes.',
      'Garnish with sliced utazi leaves and onion rings. Serve in a wooden bowl.',
],
    external: { label: 'Nkwobi recipe', url: 'https://www.youtube.com/watch?v=zX3Ed_4JzGw' }
  },
  banga:
  {
    title: 'Banga Soup', 
    region: 'South-South', 
    image: 'images/banga.jpeg', 
    teaser: 'A rich soup made from palm fruit extract, native to the Niger Delta region of Nigeria.', 
    occasion: 'any', 
    cuisine: 'Premium', 
    story: 'In the Niger Delta, where creeks wind through mangrove forests and palm trees sway in humid breezes, a soup captures the essence of this unique landscape. Banga Soup, extracted from palm fruit flesh, is liquid gold—rich, fragrant, and deeply connected to Delta peoples. This is not palm oil but fresh cream from palm fruit that creates distinctively flavored soup. The Urhobo, Isoko, and Itsekiri peoples are Banga masters. They developed techniques over generations: selecting ripe palm fruit bunches, boiling and pounding to release cream, extracting and straining to the right consistency. Making Banga traditionally is labor-intensive—fresh palm fruits boiled until soft, pounded in large mortars, kneaded with water to release cream. The spices are unique—"Banga spice" blends local seeds and barks including oburunbebe stick that give the soup its characteristic flavor. Banga is most famously paired with starch—a smooth, stretchy cassava swallow particularly beloved in the Delta. The combination is considered a great food pairings. For Delta people who have left their homeland, Banga Soup is one of the strongest links to home. The taste and smell evoke creeks and rivers of childhood, grandmothers kitchen where Banga bubbled in blackened pots, gatherings where the soup was served.', 
    ingredients: ['1kg fresh palm fruit or 500ml palm fruit concentrate', '500g assorted meat (beef, goat)', '300g fresh fish or dried fish', '200g stockfish', '2 tablespoons ground crayfish', '1-2 scotch bonnet peppers', 'Banga spice (oburunbebe stick, dried prawns blend)', 'Scent leaves (optional)', '2 seasoning cubes', 'Salt to taste', '1 medium onion',
],
    steps: ['1. If using fresh palm fruit: boil until soft, pound in a mortar, and extract cream with water.',
        'Season and cook assorted meat until tender. Add stockfish.', 
        'Pour the palm fruit extract into a pot and boil for 20-30 minutes.',
        'The oil will start to separate and float on top. Keep stirring occasionally.',
        'Add the banga spice and continue cooking for another 10 minutes.',
        'Add the cooked meat, dried fish, and fresh fish.',
        'Add ground pepper, crayfish, and seasoning cubes.',
        'Let it simmer for 15-20 minutes until well combined.',
        'Add scent leaves if using. Cook for 2 more minutes.',
        'Serve with starch, eba, or pounded yam.',
],
    external: { label: 'Banga recipe', url: 'https://www.youtube.com/watch?v=3n2lYmpzGKg'}
  },
  amala:
  {
    title: 'Amala & Ewedu', 
    region: 'Western', 
    image: 'images/amala.jpeg', 
    teaser: 'A smooth, dark brown swallow made from yam flour, a staple of Yoruba cuisine.', 
    occasion: 'Wedding', 
    cuisine: 'Comfort', 
    story: 'Among the swallows of Nigeria, Amala holds a special place in Yoruba hearts. This dark brown, stretchy delicacy made from yam flour is more than food, it is cultural identity. The distinctive color comes from the drying and processing of yam into elubo flour, and for Yorubas, that color represents authenticity and home. Making perfect Amala requires technique that takes years to master. The water must be boiling, the flour added gradually, the stirring constant and vigorous. Too much flour creates a stiff mass; too little leaves it watery. The perfect Amala stretches when pulled, has no lumps, and sits in the plate with a distinctive sheen. Amala is traditionally served with gbegiri (bean soup) and ewedu (jute leaf soup), often with a stew on the side. The famous "Amala joint" combination that has spawned restaurants throughout Lagos and beyond. The experience of eating Amala, tearing a piece, wrapping soup with it, bringing it to your mouth, is a choreography Yorubas learn from childhood. For the Yoruba diaspora, Amala represents home in its purest form. The search for good elubo abroad, the joy of finding an Amala spot in a foreign city, the comfort of that familiar texture, these are the threads that keep culture alive across oceans.',
    ingredients: ['2 cups elubo (yam flour)', '4 cups water', 'Pinch of salt (optional)'],
    steps: ['Bring water to a rolling boil in a pot.',
       'Reduce heat to medium-low. Gradually add yam flour while stirring with a wooden spatula.',
       'Stir vigorously and continuously to prevent lumps from forming.',
       'Keep adding flour and stirring until the mixture becomes smooth and pulls away from the pot.',
       'Cover and let it cook on very low heat for 2-3 minutes.',
       'Stir again to ensure smoothness. The amala should be soft, stretchy, and lump-free.',
       'Mold into balls using a wet spoon or plastic wrap.',
       'Serve immediately with gbegiri (bean soup), ewedu, or any soup of choice.',
],
    external: { label: 'Amala instructions', url: 'https://www.youtube.com/watch?v=KbYJj_gSZME'}
  },
  eforiro: {
    title: 'Efo Riro', 
    region: 'Western', 
    image: 'images/efoRiro.jpeg', 
    teaser: 'A rich Yoruba vegetable soup made with leafy greens, palm oil, and assorted proteins.', 
    occasion: 'any', 
    cuisine: 'Premium', 
    story: 'In Yoruba land, there is a soup that embodies the soul of the people “Efo Riro”. The name is descriptive, "Efo" means vegetable, "Riro" means stirred. It is comfort in a bowl, home in a single taste. The Yoruba celebrate leafy vegetables, spinach, pumpkin leaves, waterleaf combined with distinctive spices and techniques to create soup unlike any other. The foundation is properly fried stew peppers, tomatoes, and palm oil cooked until the oil floats on top. This base provides rich, complex flavor. The vegetables go in at the end, barely cooked, maintaining vibrant color and slight resistance. Overcooked Efo Riro with dull, mushy vegetables is culinary failure. Locust beans (Iru) are the secret weapon. These fermented seeds add depth that nothing else can replicate. Non-Nigerians sometimes find the smell off-putting, but for those who know, Iru is an essential ingredient that makes it taste "like home." Efo Riro is served with Yoruba swallows, Amala, pounded yam, or Eba. The combination of rich, green-flecked stew with smooth, stretchy swallow is one of Nigerian cuisine greatest pleasures. For Yoruba people in diaspora, Efo Riro is often the dish they miss most, attempting to recreate it with substitutes, because to taste it is to taste home.',
    ingredients: ['500g spinach or pumpkin leaves (ugu)', '500g assorted meat', '200g stockfish', '100g dried fish', '1/2 cup palm oil', '2 tablespoons ground crayfish', '2 tablespoons locust beans (iru)', '3-4 scotch bonnet peppers', '2 large tomatoes', '1 red bell pepper', '2 medium onions', '2 seasoning cubes', 'Salt to taste',
],
    steps: ['1. Season and cook assorted meat until tender. Add stockfish and dried fish.',
      'Blend tomatoes, bell pepper, scotch bonnet, and one onion into a paste.',
      'Wash and chop the vegetables into small pieces. Set aside.',
      'Heat palm oil in a pot. Add chopped onions and fry until translucent.',
      'Add the blended pepper mixture. Fry until oil floats on top (about 15-20 minutes).',
      'Add locust beans and stir well.',
      'Add cooked meat, stockfish, dried fish, and crayfish.',
      'Add a little stock if needed. Simmer for 5 minutes.',
      'Add the chopped vegetables. Stir and cook for 3-5 minutes only (to retain color).',
      'Adjust seasoning and serve with pounded yam, amala, or eba.',
],
    external: { label: 'Efo riro recipe', url: 'https://www.youtube.com/watch?v=JBeamZQiL0s' }
  },
  nsala:
  {
    title: 'Nsala (White Soup)', 
    region: 'Eastern', 
    image: 'images/nsala.jpeg', 
    teaser: 'A light, flavorful soup made without palm oil, popular in Eastern Nigeria, especially Anambra State.', 
    occasion: 'any', 
    cuisine: 'Premium', 
    story: 'When the body needs something light yet nourishing, Eastern Nigerians turn to Ofe Nsala, the "white soup" that proves Nigerian cuisine can be subtle and refined. Unlike most Nigerian soups that swim in palm oil, Nsala beauty lies in its restraint. The pale, creamy broth lets the natural flavors of fish and meat shine through.Ofe Nsala is particularly associated with the people of Anambra State, though variations exist throughout Igboland. It is the soup of choice for new mothers, the recovering ill, and anyone seeking something easier on the palate. The thickening traditionally comes from pounded yam dissolved into the broth, giving it body without heaviness. The spices tell the story, uziza seeds for their peppery bite, ehuru (calabash nutmeg) for warmth, uda for that distinctive Nigerian aroma. These indigenous spices have been used for centuries, long before written recipes existed. The catfish traditionally used adds richness and is believed to aid recovery. At traditional ceremonies, Ofe Nsala often appears alongside richer soups, offering balance to the spread. For elders who have eaten countless meals, its sophistication is appreciated proof that complexity is notalways about boldness.',
    ingredients: ['• 1kg catfish or assorted meat', '200g stockfish', '3-4 medium yam cubes (for thickening)', '1 teaspoon ground uziza seeds', '1 teaspoon ground ehuru (calabash nutmeg)', '1/2 teaspoon uda (negro pepper)', '2 tablespoons ground crayfish', 'Utazi or uziza leaves', '1 tablespoon ogiri (optional)', '2 seasoning cubes', 'Salt to taste', 'Scotch bonnet pepper',
],
    steps: ['If using meat: season and cook until tender. If using fresh fish: set aside.',
      'Peel and boil yam cubes until soft. Pound or blend into a smooth paste.',
      'Add stockfish to the meat pot and cook until soft.',
      'Add the fish (if using fresh) and cook for 5-7 minutes.',
      'Blend uziza seeds, ehuru, and uda into a powder.',
      'Add the yam paste to the pot gradually, stirring to dissolve completely.',
      'Add the ground spices, crayfish, pepper, and ogiri (if using).',
      'Let it simmer until the soup thickens (10-15 minutes).',
      'Slice the utazi or uziza leaves thinly. Add to the soup.',
      'Simmer for 2-3 minutes. Adjust seasoning and serve with pounded yam or fufu.'
    ],
    external: { label: 'Nsala recipe', url: 'https://www.youtube.com/watch?v=FXI1dAdwl-8' }
  },
  ofada:
  {
    title: 'Ofada Rice & Ayamase', 
    region: 'Western', 
    image: 'images/ofada.jpeg', 
    teaser: 'Locally-grown rice with green pepper stew.', 
    occasion: 'Wedding', 
    cuisine: 'Premium', 
    story: 'Alongside familiar red stews sits a different kind of sauce: Ofada Stew, also called Ayamase. This green pepper stew, made with bleached palm oil and fermented locust beans, is fiery, pungent, and absolutely addictive proof that Nigerian cuisine has depths yet to be discovered by the wider world. Making Ofada Stew requires unusual technique: bleaching palm oil by heating until it loses its red color, becoming clear and changing character. The peppers are green bell peppers and green scotch bonnet, giving the stew distinctive color. These are blended rough for texture, meeting clear oil and dark locust bean specks to create a visually striking dish. Ofada Stew is not subtle food. It is aggressively flavored, intentionally spicy, meant to be experienced intensely. Heat from green peppers hits first, followed by locust bean complexity, bleached oil richness, and meatiness of assorted proteins. It is food for people who want to taste something. The stew represents Nigerian cuisine that embraces indigenous ingredients rather than colonial influences. From local rice to traditional palm oil bleaching to fermented locust beans, Ofada Stew is thoroughly indigenous and for Nigerians abroad, one of the hardest dishes to replicate authentically.',
    ingredients: ['500g assorted meat or beef', '200g ponmo (cow skin)', '1 cup palm oil (for bleaching)', '10-15 green bell peppers', '5-7 green scotch bonnet peppers', '2 tablespoons locust beans (iru)', '2 medium onions', '2 tablespoons ground crayfish', '2 seasoning cubes', 'Salt to taste', 'Boiled eggs (optional)'
    ],
    steps: ['Season and cook assorted meat and ponmo until tender. Set aside with stock.',
      'Blend green bell peppers and scotch bonnet coarsely (not smooth).',
      'Heat palm oil in a pot until it bleaches (turns clear/light colored). Let it cool slightly.',
      'Add chopped onions and fry until golden brown.',
      'Add the blended green pepper. Fry for 20-25 minutes, stirring occasionally.',
      'Add locust beans and stir well.',
      'Add the cooked meat, ponmo, and crayfish.',
      'Add stock or water as needed. Simmer for 10-15 minutes.',
      'Add boiled eggs if using. Adjust seasoning.',
      'Serve with Ofada rice (local brown rice) wrapped in banana leaves',
],
    external: { label: 'Ofada rice guide', url: 'https://www.youtube.com/watch?v=_GvgEz4G4LM' }
  },
  asaro:
  {
    title: 'Asaro (Yam Porridge)', 
    region: 'Various', 
    image: 'images/asaro.jpeg', 
    teaser: 'A comforting one-pot yam dish cooked in palm oil and pepper-based sauce.', 
    occasion: 'any', 
    cuisine: 'Comfort', 
    story: 'The white yam holds special place in Nigerian culture, particularly among the Igbo where the New Yam Festival celebrates each harvest with prayers and feasting. This starchy tuber is prepared many ways, but perhaps none more comforting than Asaro, the Yoruba yam porridge that transforms yam from simple starch into something more complex. Asaro cooks yam in palm oil and pepper-based sauce until it begins to break down, creating a dish part stew, part mash, part porridge. The palm oil is essential, giving characteristic orange color and rich mouthfeel. Without it, you would simply have boiled yam—pleasant but unremarkable. With it, Asaro becomes something special. Making Asaro requires judgment. How much should the yam be mashed? Some prefer it chunky with distinct pieces visible; others like it smoother. The "correct" answer depends on family tradition, and Nigerians have strong opinions. Dried fish, stockfish, fresh fish, or meats can be added, each changing the character while maintaining essential nature. Asaro is quintessential comfort food—what mothers make when children are sick or homesick. Its soft texture makes it easy to eat when appetite is low. Its warmth soothes. For many Nigerians, the memory of being fed Asaro while ill is a memory of being cared for.',
    ingredients: ['• 1kg white yam', '1/2 cup palm oil', '300g smoked fish or dried fish', '2-3 scotch bonnet peppers', '2 medium tomatoes', '1 medium onion', '2 tablespoons ground crayfish', '2 seasoning cubes', 'Salt to taste', 'Spinach or ugu leaves (optional)'

    ],
    steps: ['1. Peel and cut yam into medium-sized cubes. Wash thoroughly.', 
      'Blend tomatoes, peppers, and half the onion into a paste.',
      'Place yam in a pot. Add enough water to almost cover the yam.',
      'Add palm oil, diced onion, seasoning cubes, and salt.',
     'Cover and cook until yam is halfway done (about 10 minutes).',
     'Add the blended pepper mixture and crayfish.',
     'Add the smoked fish or dried fish.',
     'Continue cooking until yam is soft and begins to break down.',
     'Gently mash some of the yam to create a thick, porridge-like consistency.',
     'Add vegetables if using. Cook for 2-3 more minutes and serve.',
],
    external: { label: 'Asaro recipe', url: 'https://www.youtube.com/watch?v=nFeYik8ziUQ' }
  },
  isi_ewu:
  {
    title: 'Isi Ewu', 
    region: 'Eastern', 
    image: 'images/isiEwu.jpeg', 
    teaser: 'Spiced goat-head delicacy.', 
    occasion: 'any', 
    cuisine: 'Comfort', 
    story: 'No traditional Igbo gathering is complete without Isi Ewu. The spicy goat head delicacy that commands respect at every table. The name literally translates to "goat head," and every part is used: the tender cheeks, the gelatinous ears, the rich tongue, even the brain which enriches the sauce. This is nose-to-tail eating at its finest. Preparing Isi Ewu is an art form. The goat head must be meticulously cleaned tongues scraped, ears singed, every trace of hair and dirt removed. The cooking is slow and patient, yielding meat so tender it falls from bone. But the true magic happens in the sauce, where palm oil meets potash and transforms. The brain serves a special purpose: mashed and added to the sauce, it creates a richness and body that nothing else can provide. This addition distinguishes Isi Ewu from its cousin Nkwobi and makes it arguably more luxurious. At weddings, funerals, and chieftaincy ceremonies, Isi Ewu appears in wooden bowls garnished with bitter utazi leaves. It is a dish that speaks of abundance and generosity, a host who serves Isi Ewu is announcing that no expense has been spared. For Igbos worldwide, it represents the pinnacle of traditional cuisine.',
    ingredients: ['1 goat head (cleaned and cut)', '1/2 cup palm oil', '1 tablespoon potash (akanwu) or baking soda', '2 tablespoons ground crayfish', '1 teaspoon ground ehuru (calabash nutmeg)', '2-3 scotch bonnet peppers', 'Utazi leaves for garnish', '1 medium onion (sliced into rings)', '2 seasoning cubes', 'Salt to taste', 'Optional: ugba (oil bean seeds)'
],
    steps: ['Thoroughly clean the goat head, scraping tongue and ears. Remove any dirt.',
      'Cut into pieces, keeping ears, tongue, and eyes whole (the "particulars").',
      'Season with onions, seasoning cubes, and salt. Cook until very tender.',
      'Remove the brain, wrap in foil, and steam separately until cooked.',
      'Dissolve potash in water, strain, and set aside.',
      'Heat palm oil. Gradually add potash liquid while stirring until it turns yellow and thickens.',
      'Mash the cooked brain and add to the sauce.',
      'Add ground pepper, crayfish, ehuru, and seasoning.',
      'Add the cooked goat head pieces. Stir to coat with sauce.',
      'Add ugba if using. Heat through for 2-3 minutes.',
      'Garnish with utazi leaves and onion rings. Serve in a wooden bowl.',
],
    external: { label: 'Isi Ewu instructions', url: 'https://www.youtube.com/watch?v=eIDUn0MsLjE'}
  },
  okpa: {
    title: 'Okpa', 
    region: 'Eastern', 
    image: 'images/okpa.jpeg', 
    teaser: 'Steamed Bambara nut pudding.', 
    occasion: 'any', 
    cuisine: 'street', 
    story: 'In the bustling streets of Enugu and throughout Eastern Nigeria, mornings begin with vendors calling "Okpa di oku!" (hot okpa!). This protein-rich steamed pudding made from Bambara groundnuts is the breakfast of champions, fuel for students, workers, and everyone in between. Simple yet deeply satisfying, Okpa proves that Nigerian cuisine can be both nourishing and affordable. The Bambara groundnut is an indigenous African legume, sometimes called the "complete food" for its nutritional profile. Unlike its cousin, Moi Moi (made from black-eyed peas), Okpa requires fewer ingredients and comes together quickly. Just flour, palm oil, pepper, and salt, wrapped and steamed to perfection. What makes Okpa special is its texture denser than Moi Moi, with a distinctive earthy, nutty flavor that Bambara nuts provide. It is wrapped in banana leaves traditionally, which impart subtle flavor, though modern vendors use plastic or foil. The unwrapping is part of the experience: revealing that warm, orange-tinted pudding within. For Eastern Nigerians abroad, Okpa represents pure nostalgia, memories of buying it wrapped in newspaper on the way to school, of vendors with their buckets of hot pudding, of that satisfying breakfast that needed nothing but itself.',
    ingredients: ['2 cups Bambara nut flour (okpa flour)', '1/2 cup palm oil', '1-2 scotch bonnet peppers (blended)', '1 teaspoon ground crayfish (optional)', '1 seasoning cube', 'Salt to taste', 'Warm water (as needed)', 'Banana leaves, foil, or plastic wrap for wrapping'
    ],
    steps: ['1. Sift the Bambara nut flour into a large mixing bowl to remove lumps.', 
      'Add palm oil to the flour and mix thoroughly until well incorporated.',
      'Add salt, seasoning cube, blended pepper, and crayfish if using.',
      'Gradually add warm water while mixing to form a smooth, pourable batter.',
      'The consistency should be thinner than moi moi batter—slightly watery.',
      'Prepare your wrapping materials (grease if using foil or plastic).',
      'Pour batter into wrappers and tie securely.',
      'Place wrapped okpa in a pot of boiling water.',
      'Steam for 45 minutes to 1 hour until firm.',
     'Allow to cool slightly before unwrapping. Serve with pap or on its own.',
],
    external: { label: 'Okpa recipe', url: 'https://www.youtube.com/watch?v=j09cGE43wHY' }
  },
  ofeowerri: {
    title: 'Ofe Owerri', 
    region: 'Eastern', 
    image: 'images/ofeOwerri.jpeg', 
    teaser: 'A rich, expensive soup from Imo State featuring assorted meats, fish, and vegetables thickened with cocoyam.', 
    occasion: 'Wedding', 
    cuisine: 'Premium', 
    story: 'There is an Igbo song that says "he who is not rich does not eat Ofe Owerri," and there is truth in that lyric. This soup from Imo State is legendarily expensive, loaded with assorted meats, fish, snails, and stockfish, thickened with cocoyam and rich with palm oil. It is the soup you serve when you want to show abundance. Ofe Owerri is the soup of celebration, weddings, funerals, chieftaincy titles. Making it for guests announces that you have spared no expense. The ingredients list reads like a inventory of Nigerian delicacies: beef, goat meat, tripe, stockfish, dried fish, snails, and ponmo, all swimming in a thick, vegetable-rich broth. The vegetables are key. Shredded okazi leaves are essential, giving the soup its distinctive character. Some cooks add uziza for aroma, ugu for color and nutrition. The cocoyam thickens everything to proper consistency, creating a soup that clings to your swallow. At traditional events, Ofe Owerri is often reserved for VIP guests, the elders, the in-laws, the important visitors. Receiving a bowl is recognition of your status. For Imo State indigenes, no other soup quite captures the spirit of home and celebration the way Ofe Owerri does.',
    ingredients: ['500g assorted meat (beef, goat, tripe)', '300g stockfish', '200g dried fish', '200g fresh snails (optional)', '200g cocoyam (for thickening)', '1/2 cup palm oil', '2 cups shredded okazi leaves', '1 cup ugu leaves', '2 tablespoons ground crayfish', '1 tablespoon ogiri isi', '2-3 scotch bonnet peppers', '2 seasoning cubes', 'Salt to taste',
],
    steps: ['1. Season and cook assorted meat until tender. Add stockfish and cook until soft.',
      'Add cleaned snails if using. Cook for 10 minutes.',
      'Peel and boil cocoyam until soft. Pound into a smooth paste.',
      'Blend peppers coarsely.',
      'Add palm oil to the pot with meat and fish. Let it heat up.',
      'Add blended pepper, crayfish, and ogiri. Stir well.',
      'Add the cocoyam paste gradually, stirring to dissolve and thicken the soup.',
      'Add dried fish and more stock if needed. Simmer for 10 minutes.',
      'Add shredded okazi and ugu leaves.',
      'Stir and cook for 3-5 minutes. Adjust seasoning and serve with fufu or pounded yam.',
],
    external: { label: 'Ofe Owerri', url: 'https://www.youtube.com/watch?v=Kqi0qYDJAtw' }
  },
  ukwa: {
    title: 'Ukwa (Breadfruit)', 
    region: 'Eastern', 
    image: 'images/ukwa.jpeg', 
    teaser: 'A nutritious porridge made from African breadfruit seeds, a delicacy particularly beloved in Igboland.', 
    occasion: 'Wedding', 
    cuisine: 'Premium', 
    story: 'At traditional Igbo events like weddings, funerals, chieftaincy ceremonies, there is a dish that is guarded like treasure, served only to special guests. This is Ukwa, African breadfruit porridge, one of the most prized foods in Igboland. The seeds fall from massive ukwa trees, are laboriously processed, and transform into something extraordinary. Ukwa is expensive partly because of the processing required. The large pods must fall naturally from trees, be collected, dried, and the seeds extracted. The seeds themselves need proper cooking with potash to achieve that perfect soft, almost creamy texture. Too little potash and they stay hard; too much and they become bitter. The flavor is unique, earthy, slightly sweet, with a richness that comes from palm oil and traditional seasonings. Some add corn for texture, bitter leaf for contrast, dried fish for protein. Each family has their version, guarded recipes passed through generations. At celebrations, Ukwa is served strategically. Not everyone gets it because there is rarely enough. Receiving a plate of Ukwa signals your importance to the host. For Igbos abroad, fresh ukwa is nearly impossible to find, making occasional homecoming visits that much more precious when the porridge appears.',
    ingredients: ['3 cups African breadfruit seeds (ukwa)', '1 tablespoon potash (akanwu)', '1/2 cup palm oil', '2-3 scotch bonnet peppers', '200g dried fish or stockfish', 'Handful of scent leaves or bitter leaf', '1 teaspoon ogiri igbo (optional)', '2 seasoning cubes', 'Salt to taste', 'Optional: sweet corn'
],
    steps: ['1. Wash the ukwa seeds thoroughly to remove dirt and debris.',
       'Place in a pot with enough water to cover. Bring to boil.',
       'Dissolve potash in a little water. Add to the pot.',
       'Cook until ukwa seeds are soft and mushy (30-45 minutes). Add water as needed.',
       'When soft, add palm oil, blended pepper, and ogiri if using.',
       'Add cleaned dried fish or stockfish.',
       'Add seasoning cubes and salt to taste.',
       'Stir well and simmer for 10-15 minutes.',
       'Add scent leaves or bitter leaf. Cook for 2-3 minutes.',
       'Serve warm. The porridge thickens as it cools.'
],
    external: { label: 'Ukwa guide', url: 'https://www.youtube.com/watch?v=0YLBU7SoUlE' }
  },
  pepperedfish: {
    title: 'Peppered Fish', 
    region: 'Coastal', 
    image: 'images/peppered-fish-1.jpeg', 
    teaser: 'Spicy fried fish in a rich pepper sauce, a popular Nigerian party appetizer.', 
    occasion: 'NightLife', 
    cuisine: 'Street', 
    story: 'At every Nigerian party worth attending, somewhere on the spread you will find Peppered Fish, crispy fried fish swimming in fiery red pepper sauce. This dish has become synonymous with celebration, appearing at weddings, birthdays, and any gathering where good food matters. The fish is the star, but the sauce is where the magic happens. The technique is distinctly Nigerian: fish fried until crispy, then introduced to a sauce so vibrant it seems to glow. The sauce itself is a balance of heat and flavor, scotch bonnet peppers for fire, tomatoes for sweetness, onions for depth. The fish soaks up these flavors while maintaining its crispy exterior, at least until you can not resist any longer. Croaker fish is the classic choice for parties. Its firm flesh holds up well to frying and saucing. Catfish brings a different experience, its fatty meat absorbing sauce differently. Some prefer tilapia for its clean taste. Whatever the fish, the preparation shows care. Each piece cleaned, seasoned, perfectly fried. Peppered Fish is usually served as a main dish or shared appetizer at parties. Guests gather around the serving dish, each taking their portion. For Nigerians abroad hosting parties, Peppered Fish is often the dish that makes the event feel authentically Nigerian.',
    ingredients: ['1kg whole fish (croaker, tilapia, or catfish)', '4-5 scotch bonnet peppers', '2 large tomatoes', '2 red bell peppers', '2 medium onions', '1/2 cup vegetable oil', '2 tablespoons tomato paste', '2 seasoning cubes', '1 teaspoon curry powder', '1 teaspoon thyme', 'Salt to taste', 'Vegetable oil for frying',
],
    steps: ['1. Clean fish thoroughly. Make shallow cuts on both sides.',
      'Season with salt, seasoning cube, curry, and thyme. Marinate for 30 minutes.',
      'Deep fry the fish until golden brown and crispy. Set aside.',
      'Blend tomatoes, bell peppers, scotch bonnet, and one onion into a paste.',
      'Heat oil in a pan. Fry diced onion until golden.',
      'Add tomato paste and fry for 2 minutes.',
      'Pour in the blended pepper mixture. Fry until oil floats on top.',
      'Add seasoning cubes and salt. Cook for another 5 minutes.',
      'Gently add the fried fish to the sauce.',
      'Spoon sauce over fish and simmer for 5-10 minutes.',
      'Garnish with sliced onions and serve hot.'
    ],
    external: { label: 'Peppered fish recipe', url: 'https://www.youtube.com/watch?v=hOFhCCy-qQY' }
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
