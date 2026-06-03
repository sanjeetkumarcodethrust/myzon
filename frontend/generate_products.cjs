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
  { id: 14, brand: 'Penguin', title: 'Atomic Habits by James Clear', category: 'books-stationery', price: 499, originalPrice: 799, discount: '-37%', rating: 4.8, reviews: '15k+', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 15, brand: 'Apple', title: 'iPhone 15 Mobile Phone', category: 'electronics', price: 79900, originalPrice: 79900, discount: '0%', rating: 4.8, reviews: '12k+', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 16, brand: 'Samsung', title: 'Galaxy S23 Mobile', category: 'electronics', price: 74999, originalPrice: 89999, discount: '-17%', rating: 4.6, reviews: '8.5k+', image: 'https://images.unsplash.com/photo-1610945265064-3234dac1fbd0?auto=format&fit=crop&q=80&w=300&h=300' }
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
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1467043198406-dc953a3defa0?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1485218126466-34e6392ec754?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1538329972958-465d6d2144ed?auto=format&fit=crop&q=80&w=300&h=300',
    ]
  },
  'electronics': {
    brands: ['Sony', 'Samsung', 'Apple', 'LG', 'Bose', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer'],
    adjs: ['Smart', 'Wireless', 'Bluetooth', 'Portable', 'High-Speed', 'Ultra HD', 'Noise Cancelling', 'Compact', 'Pro', 'Gaming'],
    nouns: ['Headphones', 'Speaker', 'Monitor', 'Keyboard', 'Mouse', 'Tablet', 'Laptop', 'Earbuds', 'Webcam', 'Router', 'Mobile'],
    images: [
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1602526428953-f55c865e9a2a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1612444953144-f0b8b6d75e29?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80&w=300&h=300',
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
      'https://images.unsplash.com/photo-1531104985437-602d749bba7a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1618842676088-c4d48a6a7571?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1576764402122-3d1b3d9bc29a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1587483166702-bf9aa66bd791?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1598517834862-ad0e47a0aebc?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1610395219791-21b8234f92ac?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1504707748692-419802426aae?auto=format&fit=crop&q=80&w=300&h=300',
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
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1590156206657-aec7d5ae4cd3?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1586495777744-4e6232bf4657?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1567721913486-6585f069b3f7?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1573575155376-b5010099301b?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1613521973937-efce9e6d3a82?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1607602878673-fdc2ae80a8f2?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1600428853876-fb6cb2b2b834?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1574600407128-db07fd42acab?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&q=80&w=300&h=300',
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
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1558618047-3d7a7ef9a6cf?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1556909211-36987daf7b4d?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1572636583300-bc7b52eddce6?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1603217039863-aa0c865404f7?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1577908258027-50d80afed988?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1591079390222-58d3b87bef8e?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=300&h=300',
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
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1591291621164-2c6367723315?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1602744269-be7a2eb7deab?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1524721696987-b9527df9e512?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1579721270071-9098b972a03c?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1593106410288-caf65eca7c9d?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1615117972428-28de67cda58e?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1562771379-eafdca7a02f8?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=300&h=300',
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
      'https://images.unsplash.com/photo-1524578508118-20d04c10a4db?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1522881193457-37ae97c905bf?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1550399504-8953bf1d6ee5?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1562673977-d6843f5f4aac?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1604866830893-c13cafa515d5?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1509869175650-a1d97972541a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1598901865264-4f6f1b64a2ee?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1588580831372-04b8974e8b35?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1517971053567-8bde93bc6a58?auto=format&fit=crop&q=80&w=300&h=300',
    ]
  }
};

let products = [...existingProducts];
let currentId = existingProducts.length + 1;

const categoriesToGenerate = [
  'fashion',
  'electronics',
  'toys-games',
  'beauty-health',
  'home-kitchen',
  'sports-outdoors',
  'books-stationery'
];

// Track per-category image index so images cycle sequentially (no repeats until all used)
const imageCounters = {};

for (const cat of categoriesToGenerate) {
  const config = categoryConfig[cat];
  imageCounters[cat] = 0;

  for (let i = 0; i < 500; i++) {
    const brand = config.brands[Math.floor(Math.random() * config.brands.length)];
    const adj = config.adjs[Math.floor(Math.random() * config.adjs.length)];
    const noun = config.nouns[Math.floor(Math.random() * config.nouns.length)];
    
    const originalPrice = Math.floor(Math.random() * 4000) + 500;
    const discountPercent = Math.floor(Math.random() * 50) + 10; 
    const price = Math.floor(originalPrice * (1 - discountPercent / 100));
    
    const rating = (Math.random() * 2 + 3).toFixed(1); 
    const reviews = Math.floor(Math.random() * 5000) + 10;
    
    // Cycle through images sequentially so each consecutive product gets a different image
    const image = config.images[imageCounters[cat] % config.images.length];
    imageCounters[cat]++;

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
console.log('Each category cycles through', Object.keys(categoryConfig)[0], 'images:', categoryConfig['fashion'].images.length);
