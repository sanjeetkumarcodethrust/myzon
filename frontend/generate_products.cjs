const fs = require('fs');
const path = require('path');

const existingProducts = [
  { id: 1, brand: 'Noise', title: 'ColorFit Pulse 3 Smartwatch', category: 'electronics', price: 1999, originalPrice: 2699, discount: '-25%', rating: 4.5, reviews: '1.2k', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 2, brand: 'boAt', title: 'Rockerz 450 Bluetooth Headphones', category: 'electronics', price: 1599, originalPrice: 1999, discount: '-20%', rating: 4.4, reviews: '892', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 3, brand: 'Nike', title: 'Men\'s Air Max Running Shoes', category: 'fashion', price: 3399, originalPrice: 3999, discount: '-15%', rating: 4.7, reviews: '1.5k', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 4, brand: 'Canon', title: 'EOS 200D II DSLR Camera', category: 'electronics', price: 34999, originalPrice: 49999, discount: '-30%', rating: 4.8, reviews: '980', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 5, brand: 'Apple', title: 'AirPods Pro (2nd Generation)', category: 'electronics', price: 24900, originalPrice: 26900, discount: '-7%', rating: 4.9, reviews: '5k+', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 6, brand: 'Samsung', title: 'Galaxy S23 Ultra 5G', category: 'electronics', price: 104999, originalPrice: 124999, discount: '-16%', rating: 4.7, reviews: '2.1k', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 7, brand: 'Sony', title: 'PlayStation 5 Console', category: 'toys-games', price: 49990, originalPrice: 54990, discount: '-9%', rating: 4.9, reviews: '3.4k', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 8, brand: 'Puma', title: 'Unisex Backpack', category: 'fashion', price: 899, originalPrice: 1999, discount: '-55%', rating: 4.2, reviews: '450', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 9, brand: 'LG', title: '32 inch UltraGear Monitor', category: 'electronics', price: 24500, originalPrice: 35000, discount: '-30%', rating: 4.6, reviews: '800', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 10, brand: 'L\'Oreal', title: 'Revitalift Hyaluronic Acid Serum', category: 'beauty-health', price: 899, originalPrice: 999, discount: '-10%', rating: 4.5, reviews: '3.2k', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 11, brand: 'Philips', title: 'Air Fryer HD9200/90', category: 'home-kitchen', price: 6999, originalPrice: 9995, discount: '-30%', rating: 4.6, reviews: '5k+', image: 'https://images.unsplash.com/photo-1626200419188-f5619ebc5740?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 12, brand: 'LEGO', title: 'Star Wars Millennium Falcon', category: 'toys-games', price: 14500, originalPrice: 16999, discount: '-14%', rating: 4.9, reviews: '850', image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 13, brand: 'Nivia', title: 'Storm Football - Size 5', category: 'sports-outdoors', price: 450, originalPrice: 850, discount: '-47%', rating: 4.3, reviews: '2.1k', image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 14, brand: 'Penguin', title: 'Atomic Habits by James Clear', category: 'books-stationery', price: 499, originalPrice: 799, discount: '-37%', rating: 4.8, reviews: '15k+', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=300' }
];

const categoryConfig = {
  'fashion': {
    brands: ['Zara', 'H&M', 'Nike', 'Adidas', 'Puma', 'Levis', 'Gucci', 'Calvin Klein', 'Tommy Hilfiger', 'Vans'],
    adjs: ['Classic', 'Modern', 'Vintage', 'Stylish', 'Comfortable', 'Trendy', 'Casual', 'Elegant', 'Premium', 'Urban'],
    nouns: ['T-Shirt', 'Jeans', 'Jacket', 'Sneakers', 'Sweater', 'Dress', 'Hoodie', 'Shorts', 'Shirt', 'Coat'],
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1434389678369-10507a27eb84?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=300&h=300'
    ]
  },
  'electronics': {
    brands: ['Sony', 'Samsung', 'Apple', 'LG', 'Bose', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer'],
    adjs: ['Smart', 'Wireless', 'Bluetooth', 'Portable', 'High-Speed', 'Ultra HD', 'Noise Cancelling', 'Compact', 'Pro', 'Gaming'],
    nouns: ['Headphones', 'Speaker', 'Monitor', 'Keyboard', 'Mouse', 'Tablet', 'Laptop', 'Earbuds', 'Webcam', 'Router'],
    images: [
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=300&h=300'
    ]
  },
  'toys-games': {
    brands: ['LEGO', 'Hasbro', 'Mattel', 'Fisher-Price', 'Nerf', 'Hot Wheels', 'Barbie', 'Play-Doh', 'Bandai', 'Funko'],
    adjs: ['Interactive', 'Educational', 'Action', 'Creative', 'Musical', 'Plush', 'Collectible', 'Remote Control', 'Puzzle', 'Building'],
    nouns: ['Figure', 'Board Game', 'Doll', 'Car', 'Block Set', 'Robot', 'Drone', 'Blaster', 'Train Set', 'Playhouse'],
    images: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1531104985437-602d749bba7a?auto=format&fit=crop&q=80&w=300&h=300'
    ]
  },
  'beauty-health': {
    brands: ['L\'Oreal', 'MAC', 'Estee Lauder', 'Clinique', 'Dove', 'Nivea', 'Neutrogena', 'Olay', 'Maybelline', 'Sephora'],
    adjs: ['Hydrating', 'Anti-Aging', 'Natural', 'Organic', 'Soothing', 'Radiant', 'Matte', 'Revitalizing', 'Nourishing', 'Glow'],
    nouns: ['Serum', 'Moisturizer', 'Cleanser', 'Lipstick', 'Foundation', 'Perfume', 'Lotion', 'Mask', 'Scrub', 'Toner'],
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=300&h=300'
    ]
  },
  'home-kitchen': {
    brands: ['Philips', 'Bosch', 'KitchenAid', 'Samsung', 'LG', 'Dyson', 'Cuisinart', 'Whirlpool', 'Panasonic', 'Ninja'],
    adjs: ['Smart', 'Stainless Steel', 'Automatic', 'Compact', 'Energy Efficient', 'Non-Stick', 'Ceramic', 'Heavy Duty', 'Modern', 'Premium'],
    nouns: ['Blender', 'Coffee Maker', 'Air Fryer', 'Toaster', 'Microwave', 'Vacuum Cleaner', 'Mixer', 'Kettle', 'Pan', 'Cookware Set'],
    images: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=300&h=300'
    ]
  },
  'sports-outdoors': {
    brands: ['Nike', 'Adidas', 'Under Armour', 'Puma', 'Reebok', 'Columbia', 'North Face', 'Salomon', 'Wilson', 'Spalding'],
    adjs: ['Pro', 'Elite', 'Durable', 'Lightweight', 'Breathable', 'Waterproof', 'Thermal', 'Trekking', 'Training', 'Athletic'],
    nouns: ['Tent', 'Sleeping Bag', 'Dumbbells', 'Yoga Mat', 'Basketball', 'Tennis Racket', 'Running Belt', 'Water Bottle', 'Backpack', 'Gloves'],
    images: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300&h=300'
    ]
  },
  'books-stationery': {
    brands: ['Penguin', 'HarperCollins', 'Moleskine', 'Parker', 'Faber-Castell', 'Scholastic', 'Oxford', 'Crayola', 'Pilot', 'Staedtler'],
    adjs: ['Hardcover', 'Paperback', 'Classic', 'Illustrated', 'Premium', 'Leather-Bound', 'Spiral', 'Vintage', 'Modern', 'Educational'],
    nouns: ['Novel', 'Journal', 'Fountain Pen', 'Notebook', 'Planner', 'Sketchbook', 'Marker Set', 'Biography', 'Dictionary', 'Backpack'],
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1524578508118-20d04c10a4db?auto=format&fit=crop&q=80&w=300&h=300'
    ]
  }
};

let products = [...existingProducts];
let currentId = existingProducts.length + 1; // ensures no duplicates among initial items

const categoriesToGenerate = [
  'fashion',
  'electronics',
  'toys-games',
  'beauty-health',
  'home-kitchen',
  'sports-outdoors',
  'books-stationery'
];

for (const cat of categoriesToGenerate) {
  const config = categoryConfig[cat];
  for (let i = 0; i < 500; i++) {
    const brand = config.brands[Math.floor(Math.random() * config.brands.length)];
    const adj = config.adjs[Math.floor(Math.random() * config.adjs.length)];
    const noun = config.nouns[Math.floor(Math.random() * config.nouns.length)];
    
    const originalPrice = Math.floor(Math.random() * 4000) + 500;
    const discountPercent = Math.floor(Math.random() * 50) + 10; 
    const price = Math.floor(originalPrice * (1 - discountPercent / 100));
    
    const rating = (Math.random() * 2 + 3).toFixed(1); 
    const reviews = Math.floor(Math.random() * 5000) + 10;
    
    const image = config.images[Math.floor(Math.random() * config.images.length)];

    products.push({
      id: currentId++,
      brand,
      title: `${adj} ${brand} ${noun}`,
      category: cat,
      price,
      originalPrice,
      discount: `-${discountPercent}%`,
      rating: parseFloat(rating),
      reviews: reviews.toString(),
      image
    });
  }
}

const dir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'products.json'), JSON.stringify(products, null, 2));
console.log('Successfully generated products.json with', products.length, 'items');
