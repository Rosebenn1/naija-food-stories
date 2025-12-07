//story.html logic
const stories = {
  jollof: {
    title: 'Classic Jollof Rice',
    region: 'Western',
    image: 'images/jollofrice.jpg',
    teaser: 'Smoky, tomato-rich rice cooked with peppers, onions and a blend of warming spices.', occasion: 'Birthday',
    cuisine: 'Premium',
    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ingredients: [
      '2 cups long-grain parboiled rice',
      '4 large tomatoes or 1 can plum tomatoes',
      '2 red bell peppers',
      '1 onion',
      '2 tbsp tomato paste',
      '1/4 cup vegetable oil',
      '2 tsp curry powder',
      '2 stock cubes, salt to taste'
    ],
    steps: [
      'Blitz tomatoes, peppers and half the onion to a smooth purée.',
      'Fry chopped onion in oil, add tomato paste then the purée; simmer until reduced and slightly caramelised.',
      'Add spices and stock; stir in rice and bring to a simmer.',
      'Cover and cook on low until rice is tender. Fluff and serve.'
    ],
    external: { label: 'Watch a Jollof tutorial on YouTube', url: 'https://example.com/jollof-recipe' }
  },

  suya: {
    title: 'Spicy Suya Skewers',
    region: 'Northern (popular across Nigeria)',
    image: 'images/suya.webp',
    teaser: 'Thinly sliced beef or chicken rubbed with peanut-chilli spice and grilled until charred.',
    occasion: 'NightLife', cuisine: 'Street food',
    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ingredients: ['500g beef (thin slices)', '2 tbsp ground peanuts', '1 tbsp paprika', '1 tsp cayenne', 'Salt', 'Skewers'],
    steps: ['Mix ground peanuts, paprika, cayenne and salt to form suya spice.', 'Coat meat slices with oil and rub spice mixture evenly.', 'Thread onto skewers and grill over high heat until charred.'],
    external: { label: 'Suya recipe video', url: 'https://example.com/suya-video' }
  },

  egusi: {
    title: 'Egusi Soup & Fufu',
    region: 'East/West variants',
    image: 'images/egusiSoup.jpg',
    teaser: 'Melon-seed soup simmered with greens and tender meat, served with fufu.', 
    occasion: 'Wedding', 
    cuisine: 'Premium',
    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ingredients: ['2 cups ground egusi', 'Assorted meat or fish', 'Leafy greens', 'Palm oil', 'Onion', 'Stock cubes'],
    steps: ['Brown meat and set aside.', 'Fry onion in palm oil, add ground egusi and toast lightly.', 'Add stock gradually, add meat and simmer.', 'Stir in greens and finish with seasoning.'],
    external: { label: 'Full Egusi recipe', url: 'https://example.com/egusi-recipe' }
  },

  peppersoup:
  {
    title: 'Pepper Soup',
    region: 'Western',
    image: 'images/pepperSoup.jpg',
    teaser: 'A spicy, aromatic broth often made with fish, goat or chicken.', 
    occasion: 'NightLife', 
    cuisine: 'Premium',
    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ingredients: ['Meat or fish', 'Pepper soup spices', 'Onion', 'Fresh herbs'],
    steps: ['Boil meat until tender.', 'Add pepper soup spice mix and simmer briefly.', 'Finish with fresh herbs and serve hot.'],
    external: { label: 'Pepper soup guide', url: 'https://example.com/pepper-soup' }
  },

  akara:
  {
    title: 'Akara (Bean Fritters)',
    region: 'Western (Snack)',
    image: 'images/akara.jpg',
    teaser: 'Crispy fritters made from blended black-eyed peas.', 
    occasion: 'NightLife', 
    cuisine: 'Comfort',
    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ingredients: ['2 cups black-eyed peas (peeled)', '1 onion', 'Salt', 'Oil for frying'],
    steps: ['Soak and peel the beans, blend with onion to a thick batter.', 'Season, then deep-fry spoonfuls until golden and crisp.'],
    external: { label: 'Akara recipe website', url: 'https://example.com/akara' }
  },

  okro: {
    title: 'Okro Soup',
    region: 'Various',
    image: 'images/okroSoup.jpg',
    teaser: 'Velvety okra stew enriched with fish or meat and palm oil.', 
    occasion: 'any', 
    cuisine: 'Premium',
    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ingredients: ['Fresh okra (sliced)', 'Assorted meat', 'Palm oil', 'Onion', 'Seasoning'],
    steps: ['Sauté onions and meat, add palm oil.', 'Stir in sliced okra and cook briefly to a velvety texture.', 'Season and serve with fufu.'],
    external: { label: 'Okro soup tutorial', 
    url: 'https://example.com/okro' }
  },
  moimoi:
  {
    title: 'Moin Moin', 
    region: 'Western', 
    image: 'images/moimoin.jpeg', 
    teaser: 'Steamed bean pudding often served as a side.', 
    occasion: 'Wedding', 
    cuisine: 'Premium', 
    story: 'A protein-rich steamed bean pudding enjoyed at many gatherings.',
    ingredients: ['2 cups peeled beans', '1 onion', 'Vegetable oil', 'Seasoning'],
    steps: ['Blend beans with onion to a smooth batter.', 'Season and steam the batter in tins or leaves until set.'],
    external: { label: 'Moin Moin guide', url: 'https://example.com/moinmoin' }
  },
  ogbono: {
    title: 'Ogbono Soup', 
    region: 'Various', 
    image: 'images/ogbono.jpeg', 
    teaser: 'Thick soup made from ground ogbono seed.', 
    occasion: 'any', 
    cuisine: 'Premium', 
    story: 'Known for its slippery texture and hearty flavours.',
    ingredients: ['Ground ogbono', 'Assorted meats', 'Leafy greens', 'Palm oil'],
    steps: ['Toast and dissolve ogbono in stock to thicken.', 'Add meats and greens and simmer.'],
    external: { label: 'Ogbono recipe', url: 'https://example.com/ogbono' }
  },
  nkwobi:
  {
    title: 'Nkwobi', 
    region: 'Eastern', 
    image: 'images/nkwobi.jpeg', 
    teaser: 'Spiced cow-foot dish in palm oil sauce.', 
    occasion: 'NightLife', 
    cuisine: 'Comfort', 
    story: 'A festive delicacy with bold, spicy notes.',
    ingredients: ['Cow foot', 'Palm oil', 'Spices', 'Utazi leaves'],
    steps: ['Cook cow foot until tender.', 'Mix with spiced palm oil sauce and serve.'],
    external: { label: 'Nkwobi recipe', url: 'https://example.com/nkwobi' }
  },
  banga:
  {
    title: 'Banga Soup', 
    region: 'South-South', 
    image: 'images/banga.jpeg', 
    teaser: 'Palm-nut based soup rich with spices.', 
    occasion: 'any', 
    cuisine: 'Premium', 
    story: 'A deeply flavored soup commonly paired with starches.', 
    ingredients: ['Palm nut extract', 'Assorted fish/meat', 'Spices', 'Banga spice mix'],
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
    title: 'Ofe Owerri', 
    region: 'Eastern', 
    image: 'images/ofeOwerri.jpeg', 
    teaser: 'Hearty vegetable soup from Owerri.', 
    occasion: 'Wedding', 
    cuisine: 'Premium', 
    story: 'A protein-packed vegetable soup.',
    ingredients: ['Local greens', 'Proteins', 'Palm oil', 'Spices'],
    steps: ['Prepare a rich vegetable soup with proteins and local leaves.'],
    external: { label: 'Ofe Owerri', url: 'https://example.com/ofeowerri' }
  },
  ukwa: {
    title: 'Ukwa (Breadfruit)', region: 'Eastern', image: 'images/ukwa.jpeg', 
    teaser: 'Boiled breadfruit often cooked with palm oil and spices.', 
    occasion: 'Wedding', cuisine: 'Premium', 
    story: 'A seasonal specialty with a unique texture.',
    ingredients: ['Ukwa (breadfruit)', 'Palm oil', 'Pepper', 'Seasoning'],
    steps: ['Boil ukwa and season; optionally cook with palm oil and spices.'],
    external: { label: 'Ukwa guide', url: 'https://example.com/ukwa' }
  },
  pepperedfish: {
    title: 'Peppered Fish', 
    region: 'Coastal', 
    image: 'images/pepperedFish.jpeg', 
    teaser: 'Grilled fish in a spicy pepper sauce.', 
    occasion: 'NightLife', cuisine: 'Street', 
    story: 'Smoky grilled fish served with a fiery sauce.',
    ingredients: ['Whole fish', 'Peppers', 'Onion', 'Oil'],
    steps: ['Grill or fry fish, prepare pepper sauce and serve together.'],
    external: { label: 'Peppered fish recipe', url: 'https://example.com/pepperedfish' }
  }
};


function getQueryParam(name) {
  const params = new URLSearchParams(location.search);
  return params.get(name);
}

function renderStory(id) {
  const root = document.getElementById('storyRoot');
  console.log(root);
  const s = stories[id];
  if (!s) {
    root.innerHTML = '<div class="hero"><h1>Story not found</h1><p class="meta">The requested story does not exist.</p></div>';
    return;
  }

  root.innerHTML = `
        <div class="story-hero">
          <img src="${s.image}" alt="${s.title}">
          <h1>${s.title}</h1>
          <div class="story-meta">${s.region}</div>
          <p class="story-teaser">${s.teaser}</p>
        </div>

        <div class="section">
          <h2>Story behind this dish</h2>
          <p class="story-writeup"> ${s.story}</p>
          <a class="btn btn-primary view-recipe" id="openModalBtn">View Recipe</a>
        </div>

      `;
}

const id = getQueryParam('id');
renderStory(id);

// Modal logic
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const myModal = document.getElementById('myModal');
const overlay = document.getElementById('overlay');

openModalBtn.addEventListener('click', () => {
  renderRecipe(id);
  myModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  myModal.classList.add('hidden');
  overlay.classList.add('hidden');
});

overlay.addEventListener('click', () => {
  myModal.classList.add('hidden');
  overlay.classList.add('hidden');
});

function renderRecipe(id) {
  const root = document.getElementById('recipeRoot');
  const r = stories[id];
  if (!r) {
    root.innerHTML = '<div class="story-hero"><h1>Recipe not found</h1><p class="story-meta">No recipe matches that id.</p></div>';
    return;
  }

  root.innerHTML = `
        <div class="recipe-hero">
          <h1>${r.title}</h1>
          <p class="story-meta">Ingredients & preparation</p>
        </div>

        <div class="section">
          <h2>Ingredients</h2>
          <div class="ingredients">
            ${r.ingredients.map(i => `<div>• ${i}</div>`).join('')}
          </div>
        </div>

        <div class="section">
          <h2>Steps</h2>
          <ol class="steps">
            ${r.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
           <p><a class="btn btn-primary external-link" href="${r.external.url}" target="_blank" rel="noopener noreferrer">${r.external.label}</a></p>
        </div>
      `;
}