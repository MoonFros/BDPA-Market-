/**
 * SAVORA menu — 18 believable dishes with Naira pricing.
 * All prices, descriptions and imagery are sample demonstration content.
 */

export const menuCategories = [
  { id: 'all', label: 'All dishes' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Main Courses' },
  { id: 'nigerian', label: 'Nigerian Specials' },
  { id: 'rice', label: 'Rice Dishes' },
  { id: 'grills', label: 'Grills & BBQ' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'burgers', label: 'Burgers & Sandwiches' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' },
];

export const dishes = [
  {
    id: 'jollof-grilled-chicken',
    name: 'Jollof Rice & Grilled Chicken',
    category: 'rice',
    price: 6500,
    image: '/img/savora/dish-jollof.webp',
    description:
      'Smoky party jollof cooked over an open flame, served with a charred quarter chicken, sweet plantain and house pepper relish.',
    detail:
      'Our signature plate. Long-grain rice is cooked down in a roasted pepper and tomato base, then finished over the charcoal grill for that unmistakable smoky note. Served with a quarter chicken marinated overnight in ginger, garlic and dried pepper.',
    serves: '1 person',
    spice: 2,
    prep: '20 min',
    tags: ['Signature', 'Chef’s pick'],
    featured: true,
  },
  {
    id: 'party-jollof-platter',
    name: 'Party Jollof Family Platter',
    category: 'nigerian',
    price: 18500,
    image: '/img/savora/dish-party-jollof.webp',
    description:
      'A generous platter of smoked jollof with grilled chicken, fried plantain and coleslaw. Enough for three or four people.',
    detail:
      'Built for sharing. Two litres of our smoked jollof, a whole grilled chicken jointed at the table, sweet fried plantain and a sharp cabbage slaw to cut through the richness.',
    serves: '3 – 4 people',
    spice: 2,
    prep: '30 min',
    tags: ['For sharing'],
  },
  {
    id: 'fried-rice-chicken',
    name: 'Fried Rice & Chicken',
    category: 'rice',
    price: 6200,
    image: '/img/savora/dish-fried-rice.webp',
    description:
      'Colourful vegetable fried rice with grilled chicken and plantain, finished with a spoon of our house pepper sauce.',
    detail:
      'Rice tossed with sweetcorn, carrots, peas and spring onion, seasoned with a little curry and white pepper. Served with grilled chicken and a small dish of pepper sauce on the side.',
    serves: '1 person',
    spice: 1,
    prep: '18 min',
    tags: [],
  },
  {
    id: 'egusi-pounded-yam',
    name: 'Egusi & Pounded Yam',
    category: 'nigerian',
    price: 5800,
    image: '/img/savora/dish-egusi.webp',
    description:
      'Melon seed soup slow-cooked with spinach, assorted meat and smoked fish, served with smooth pounded yam.',
    detail:
      'Ground melon seeds simmered with palm oil, scent leaf and spinach until glossy. Loaded with beef, shaki and smoked catfish. Served with pounded yam, or eba on request.',
    serves: '1 person',
    spice: 2,
    prep: '25 min',
    tags: ['Comfort classic'],
  },
  {
    id: 'goat-pepper-soup',
    name: 'Goat Meat Pepper Soup',
    category: 'mains',
    price: 4500,
    image: '/img/savora/dish-pepper-soup.webp',
    description:
      'A fiery, fragrant broth of tender goat meat, scent leaf and native spices. Served with a side of boiled yam.',
    detail:
      'Bone-in goat meat simmered slowly with uziza, uda and dried chilli. The broth is light, hot and deeply savoury — the way pepper soup should be. Boiled yam on the side.',
    serves: '1 person',
    spice: 3,
    prep: '20 min',
    tags: ['Spicy'],
  },
  {
    id: 'grilled-tilapia',
    name: 'Charcoal Grilled Tilapia',
    category: 'mains',
    price: 9500,
    image: '/img/savora/dish-grilled-fish.webp',
    description:
      'Whole tilapia grilled over charcoal and glazed with pepper sauce, with fried plantain, lime and fresh herbs.',
    detail:
      'Scored and marinated for two hours, then grilled whole over charcoal until the skin crisps. Finished with a brush of our red pepper glaze and served with plantain and lime.',
    serves: '1 person',
    spice: 2,
    prep: '25 min',
    tags: ['Bestseller'],
    featured: true,
  },
  {
    id: 'grilled-chicken-plantain',
    name: 'Grilled Chicken & Plantain',
    category: 'grills',
    price: 7200,
    image: '/img/savora/dish-grilled-chicken.webp',
    description:
      'Half a charcoal-grilled chicken with caramelised plantain, pickled onions and house pepper sauce.',
    detail:
      'Chicken marinated in a wet rub of ginger, garlic, paprika and scotch bonnet, then grilled to order. Served with plantain caramelised in a light syrup and quick-pickled red onion.',
    serves: '1 person',
    spice: 2,
    prep: '22 min',
    tags: ['From the grill'],
  },
  {
    id: 'sharing-platter',
    name: 'The Savora Sharing Table',
    category: 'mains',
    price: 24000,
    image: '/img/savora/dish-sharing-platter.webp',
    description:
      'Jollof, peppered chicken, egusi with pounded yam and fried plantain — the whole table, one platter.',
    detail:
      'Our most generous order: a little of everything the kitchen does well, plated for the middle of the table. Ideal for four people, or three very hungry ones.',
    serves: '4 people',
    spice: 2,
    prep: '35 min',
    tags: ['For sharing', 'Chef’s pick'],
  },
  {
    id: 'peppered-chicken',
    name: 'Peppered Chicken',
    category: 'starters',
    price: 4800,
    image: '/img/savora/dish-peppered-chicken.webp',
    description:
      'Crisp chicken pieces tossed in a glossy scotch bonnet and onion sauce, with lime and spring onion.',
    detail:
      'Fried until golden, then tossed in a thick pepper sauce built on scotch bonnet, onion and a touch of honey. Sharp, hot and very hard to share.',
    serves: 'To share',
    spice: 3,
    prep: '15 min',
    tags: ['Spicy', 'Bestseller'],
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Cheese Fries',
    category: 'starters',
    price: 3500,
    image: '/img/savora/dish-loaded-fries.webp',
    description:
      'Hand-cut fries loaded with melted cheese sauce, grilled chicken, jalapeños and spring onion.',
    detail:
      'Thick-cut potatoes fried twice, then covered in a warm cheddar sauce with shredded grilled chicken, jalapeño and herbs. A plate for the middle of the table.',
    serves: 'To share',
    spice: 1,
    prep: '12 min',
    tags: [],
  },
  {
    id: 'fried-plantain',
    name: 'Sweet Fried Plantain',
    category: 'starters',
    price: 1800,
    image: '/img/savora/dish-plantain.webp',
    description:
      'Ripe plantain fried until the edges caramelise, served with a small dish of pepper sauce.',
    detail: 'Ripe plantain, sliced thick and fried in fresh oil. Sweet, soft in the middle, crisp at the edge.',
    serves: 'To share',
    spice: 1,
    prep: '10 min',
    tags: ['Vegetarian'],
  },
  {
    id: 'chicken-alfredo',
    name: 'Creamy Chicken Alfredo',
    category: 'pasta',
    price: 6800,
    image: '/img/savora/dish-alfredo.webp',
    description:
      'Fettuccine in a slow-reduced parmesan cream with grilled chicken, cracked pepper and fresh parsley.',
    detail:
      'Fettuccine finished in a cream and parmesan sauce reduced with garlic and black pepper, topped with sliced grilled chicken and shaved parmesan.',
    serves: '1 person',
    spice: 0,
    prep: '20 min',
    tags: [],
  },
  {
    id: 'classic-beef-burger',
    name: 'Classic Beef Burger',
    category: 'burgers',
    price: 5500,
    image: '/img/savora/dish-burger.webp',
    description:
      'Beef patty, aged cheddar, pickles, tomato and house burger sauce in a toasted brioche bun, with fries.',
    detail:
      'A 150g beef patty cooked on the flat top, aged cheddar, pickles, tomato, red onion and a tangy house sauce. Served with skin-on fries.',
    serves: '1 person',
    spice: 0,
    prep: '18 min',
    tags: [],
  },
  {
    id: 'chicken-shawarma',
    name: 'Chicken Shawarma',
    category: 'burgers',
    price: 4200,
    image: '/img/savora/dish-shawarma.webp',
    description:
      'Grilled chicken strips, crunchy slaw, tomato and garlic sauce wrapped in warm flatbread, with fries.',
    detail:
      'Marinated chicken grilled and sliced into a warm flatbread with cabbage slaw, tomato, red onion and a generous pour of garlic sauce. Wrapped tight, served with fries.',
    serves: '1 person',
    spice: 1,
    prep: '15 min',
    tags: ['Quick bite'],
  },
  {
    id: 'chocolate-cake',
    name: 'Chocolate Fudge Cake',
    category: 'desserts',
    price: 3200,
    image: '/img/savora/dish-cake.webp',
    description:
      'Four layers of dark chocolate sponge with ganache, fresh raspberries and a dusting of cocoa.',
    detail:
      'A proper chocolate cake — dark sponge, salted ganache and enough berries to pretend it is balanced. Baked in-house every morning.',
    serves: '1 person',
    spice: 0,
    prep: '5 min',
    tags: ['Baked in-house'],
    featured: true,
  },
  {
    id: 'chapman',
    name: 'House Chapman',
    category: 'drinks',
    price: 2500,
    image: '/img/savora/drink-chapman.webp',
    description:
      'The house welcome drink — dark bitters, citrus, cucumber and a lot of ice.',
    detail:
      'Blackcurrant and bitters over cucumber, orange and lemon, topped with soda and plenty of ice. Best enjoyed slowly.',
    serves: '1 glass',
    spice: 0,
    prep: '5 min',
    tags: ['House classic'],
  },
  {
    id: 'zobo-cooler',
    name: 'Zobo & Ginger Cooler',
    category: 'drinks',
    price: 1800,
    image: '/img/savora/drink-zobo.webp',
    description:
      'Chilled hibiscus steeped with ginger, pineapple and cloves, served over ice with mint.',
    detail:
      'Dried hibiscus steeped overnight with fresh ginger, pineapple peel and cloves, then sweetened lightly. Sharp, cold and refreshing.',
    serves: '1 glass',
    spice: 0,
    prep: '5 min',
    tags: ['Non-alcoholic'],
  },
  {
    id: 'chocolate-milkshake',
    name: 'Chocolate Milkshake',
    category: 'drinks',
    price: 2800,
    image: '/img/savora/drink-milkshake.webp',
    description:
      'Thick chocolate milkshake blended with vanilla ice cream and topped with whipped cream.',
    detail: 'Dark chocolate, vanilla ice cream and cold milk, blended thick and finished with cream and cocoa.',
    serves: '1 glass',
    spice: 0,
    prep: '5 min',
    tags: [],
  },
];

export const featuredDishes = dishes.filter((dish) => dish.featured);

export const getDish = (id) => dishes.find((dish) => dish.id === id);

export const categoryLabel = (id) => menuCategories.find((c) => c.id === id)?.label ?? id;

export const categoryCounts = menuCategories
  .filter((category) => category.id !== 'all')
  .map((category) => ({
    ...category,
    count: dishes.filter((dish) => dish.category === category.id).length,
  }));
