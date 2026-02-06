import { db } from '@/lib/db';

const products = [
  // MEN'S PRODUCTS (12 products)
  {
    title: "Air Max 270 React",
    description: "Engineered for comfort and style. The Air Max 270 React combines Max Air cushioning with React foam for all-day comfort.",
    price: 150,
    comparePrice: 180,
    image: "/images/products/men/air-max-270.jpg",
    category: "Men",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 50,
    rating: 4.5,
    featured: true,
    variants: [
      { size: "7", color: "Black", sku: "MEN-AM270-BLK-7", stock: 10 },
      { size: "8", color: "Black", sku: "MEN-AM270-BLK-8", stock: 15 },
      { size: "9", color: "Black", sku: "MEN-AM270-BLK-9", stock: 15 },
      { size: "10", color: "Black", sku: "MEN-AM270-BLK-10", stock: 10 },
    ]
  },
  {
    title: "Air Jordan 1 Retro High",
    description: "The original that started it all. The Air Jordan 1 Retro High brings back the classic silhouette with premium materials.",
    price: 180,
    comparePrice: 200,
    image: "/images/products/men/aj1-high.jpg",
    category: "Men",
    subcategory: "Shoes",
    brand: "Jordan",
    stock: 40,
    rating: 4.8,
    featured: true,
    variants: [
      { size: "8", color: "Chicago", sku: "MEN-AJ1-CHI-8", stock: 8 },
      { size: "9", color: "Chicago", sku: "MEN-AJ1-CHI-9", stock: 12 },
      { size: "10", color: "Chicago", sku: "MEN-AJ1-CHI-10", stock: 10 },
      { size: "11", color: "Chicago", sku: "MEN-AJ1-CHI-11", stock: 10 },
    ]
  },
  {
    title: "Nike Dri-FIT Tech Fleece Hoodie",
    description: "Stay warm and dry with this premium fleece hoodie. Features Dri-FIT technology for moisture management.",
    price: 90,
    comparePrice: 110,
    image: "/images/products/men/dri-fit-hoodie.jpg",
    category: "Men",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 60,
    rating: 4.3,
    featured: false,
    variants: [
      { size: "S", color: "Black", sku: "MEN-HOOD-S-BLK", stock: 15 },
      { size: "M", color: "Black", sku: "MEN-HOOD-M-BLK", stock: 20 },
      { size: "L", color: "Black", sku: "MEN-HOOD-L-BLK", stock: 15 },
      { size: "XL", color: "Black", sku: "MEN-HOOD-XL-BLK", stock: 10 },
    ]
  },
  {
    title: "Nike Pro Combat Compression Shirt",
    description: "Maximum support and comfort for intense training. Compression fit enhances muscle recovery.",
    price: 45,
    comparePrice: 60,
    image: "/images/products/men/pro-combat.jpg",
    category: "Men",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 80,
    rating: 4.2,
    featured: false,
    variants: [
      { size: "M", color: "White", sku: "MEN-PRO-M-WHT", stock: 20 },
      { size: "L", color: "White", sku: "MEN-PRO-L-WHT", stock: 25 },
      { size: "XL", color: "White", sku: "MEN-PRO-XL-WHT", stock: 20 },
      { size: "XXL", color: "White", sku: "MEN-PRO-XXL-WHT", stock: 15 },
    ]
  },
  {
    title: "Air Force 1 '07",
    description: "The iconic AF1 returns with classic details and premium materials. A timeless silhouette for everyday wear.",
    price: 110,
    comparePrice: 130,
    image: "/images/products/men/af1-07.jpg",
    category: "Men",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 70,
    rating: 4.7,
    featured: true,
    variants: [
      { size: "7", color: "White", sku: "MEN-AF1-WHT-7", stock: 15 },
      { size: "8", color: "White", sku: "MEN-AF1-WHT-8", stock: 20 },
      { size: "9", color: "White", sku: "MEN-AF1-WHT-9", stock: 20 },
      { size: "10", color: "White", sku: "MEN-AF1-WHT-10", stock: 15 },
    ]
  },
  {
    title: "Nike Sportswear Club Fleece Joggers",
    description: "Comfortable joggers with a classic fit. Perfect for lounging or light workouts.",
    price: 55,
    comparePrice: 70,
    image: "/images/products/men/fleece-joggers.jpg",
    category: "Men",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 75,
    rating: 4.4,
    featured: false,
    variants: [
      { size: "M", color: "Grey", sku: "MEN-JOG-M-GRY", stock: 20 },
      { size: "L", color: "Grey", sku: "MEN-JOG-L-GRY", stock: 25 },
      { size: "XL", color: "Grey", sku: "MEN-JOG-XL-GRY", stock: 20 },
      { size: "XXL", color: "Grey", sku: "MEN-JOG-XXL-GRY", stock: 10 },
    ]
  },
  {
    title: "Nike ZoomX Vaporfly NEXT%",
    description: "Our fastest racing shoe. Built for marathon runners seeking maximum performance.",
    price: 250,
    comparePrice: 280,
    image: "/images/products/men/vaporfly.jpg",
    category: "Men",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 30,
    rating: 4.9,
    featured: true,
    variants: [
      { size: "8", color: "Orange", sku: "MEN-VFY-8-ORG", stock: 6 },
      { size: "9", color: "Orange", sku: "MEN-VFY-9-ORG", stock: 8 },
      { size: "10", color: "Orange", sku: "MEN-VFY-10-ORG", stock: 8 },
      { size: "11", color: "Orange", sku: "MEN-VFY-11-ORG", stock: 8 },
    ]
  },
  {
    title: "Nike Air Max 90",
    description: "The legendary Air Max 90 returns with its classic silhouette and visible Air Max unit.",
    price: 130,
    comparePrice: 150,
    image: "/images/products/men/air-max-90.jpg",
    category: "Men",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 55,
    rating: 4.6,
    featured: false,
    variants: [
      { size: "7", color: "Red", sku: "MEN-AM90-7-RED", stock: 10 },
      { size: "8", color: "Red", sku: "MEN-AM90-8-RED", stock: 15 },
      { size: "9", color: "Red", sku: "MEN-AM90-9-RED", stock: 15 },
      { size: "10", color: "Red", sku: "MEN-AM90-10-RED", stock: 15 },
    ]
  },
  {
    title: "Nike Tech Pack Jacket",
    description: "Premium engineered jacket with thermal regulation technology. Ultimate performance meets style.",
    price: 200,
    comparePrice: 250,
    image: "/images/products/men/tech-pack.jpg",
    category: "Men",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 35,
    rating: 4.7,
    featured: true,
    variants: [
      { size: "M", color: "Black", sku: "MEN-TECH-M-BLK", stock: 10 },
      { size: "L", color: "Black", sku: "MEN-TECH-L-BLK", stock: 12 },
      { size: "XL", color: "Black", sku: "MEN-TECH-XL-BLK", stock: 8 },
      { size: "XXL", color: "Black", sku: "MEN-TECH-XXL-BLK", stock: 5 },
    ]
  },
  {
    title: "Nike React Infinity Run",
    description: "Designed to keep you running. Infinity cushioning provides a smooth, stable ride.",
    price: 160,
    comparePrice: 180,
    image: "/images/products/men/react-infinity.jpg",
    category: "Men",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 45,
    rating: 4.5,
    featured: false,
    variants: [
      { size: "8", color: "Blue", sku: "MEN-IR-8-BLU", stock: 12 },
      { size: "9", color: "Blue", sku: "MEN-IR-9-BLU", stock: 12 },
      { size: "10", color: "Blue", sku: "MEN-IR-10-BLU", stock: 12 },
      { size: "11", color: "Blue", sku: "MEN-IR-11-BLU", stock: 9 },
    ]
  },
  {
    title: "Nike Dry Fit Short-Sleeve Top",
    description: "Essential training top with moisture-wicking technology. Keeps you dry and comfortable.",
    price: 35,
    comparePrice: 45,
    image: "/images/products/men/dry-fit-top.jpg",
    category: "Men",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 100,
    rating: 4.3,
    featured: false,
    variants: [
      { size: "S", color: "Navy", sku: "MEN-DFT-S-NVY", stock: 25 },
      { size: "M", color: "Navy", sku: "MEN-DFT-M-NVY", stock: 30 },
      { size: "L", color: "Navy", sku: "MEN-DFT-L-NVY", stock: 30 },
      { size: "XL", color: "Navy", sku: "MEN-DFT-XL-NVY", stock: 15 },
    ]
  },
  {
    title: "Nike Metcon 8",
    description: "The ultimate training shoe. Designed for high-intensity workouts and heavy lifting.",
    price: 130,
    comparePrice: 150,
    image: "/images/products/men/metcon-8.jpg",
    category: "Men",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 50,
    rating: 4.8,
    featured: true,
    variants: [
      { size: "8", color: "Multi", sku: "MEN-MC8-8-MLT", stock: 12 },
      { size: "9", color: "Multi", sku: "MEN-MC8-9-MLT", stock: 13 },
      { size: "10", color: "Multi", sku: "MEN-MC8-10-MLT", stock: 13 },
      { size: "11", color: "Multi", sku: "MEN-MC8-11-MLT", stock: 12 },
    ]
  },

  // WOMEN'S PRODUCTS (12 products)
  {
    title: "Nike Air Zoom Pegasus 40",
    description: "The daily trainer that's ready for anything. Responsive cushioning and breathable mesh upper.",
    price: 130,
    comparePrice: 150,
    image: "/images/products/women/pegasus-40.jpg",
    category: "Women",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 60,
    rating: 4.7,
    featured: true,
    variants: [
      { size: "6", color: "Pink", sku: "WOM-PEG-6-PNK", stock: 15 },
      { size: "7", color: "Pink", sku: "WOM-PEG-7-PNK", stock: 15 },
      { size: "8", color: "Pink", sku: "WOM-PEG-8-PNK", stock: 18 },
      { size: "9", color: "Pink", sku: "WOM-PEG-9-PNK", stock: 12 },
    ]
  },
  {
    title: "Nike Air Force 1 Shadow",
    description: "A bold, layered take on the classic AF1. Double the details, double the style.",
    price: 125,
    comparePrice: 145,
    image: "/images/products/women/af1-shadow.jpg",
    category: "Women",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 50,
    rating: 4.6,
    featured: true,
    variants: [
      { size: "5", color: "White", sku: "WOM-AF1S-5-WHT", stock: 12 },
      { size: "6", color: "White", sku: "WOM-AF1S-6-WHT", stock: 13 },
      { size: "7", color: "White", sku: "WOM-AF1S-7-WHT", stock: 13 },
      { size: "8", color: "White", sku: "WOM-AF1S-8-WHT", stock: 12 },
    ]
  },
  {
    title: "Nike Sports Bra",
    description: "Medium-impact support with Dri-FIT technology. Comfortable and breathable for workouts.",
    price: 40,
    comparePrice: 55,
    image: "/images/products/women/sports-bra.jpg",
    category: "Women",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 80,
    rating: 4.4,
    featured: false,
    variants: [
      { size: "S", color: "Black", sku: "WOM-BRA-S-BLK", stock: 20 },
      { size: "M", color: "Black", sku: "WOM-BRA-M-BLK", stock: 25 },
      { size: "L", color: "Black", sku: "WOM-BRA-L-BLK", stock: 20 },
      { size: "XL", color: "Black", sku: "WOM-BRA-XL-BLK", stock: 15 },
    ]
  },
  {
    title: "Nike Yoga Leggings",
    description: "High-waisted leggings with 4-way stretch. Perfect for yoga, pilates, and everyday wear.",
    price: 75,
    comparePrice: 95,
    image: "/images/products/women/yoga-leggings.jpg",
    category: "Women",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 70,
    rating: 4.5,
    featured: true,
    variants: [
      { size: "XS", color: "Black", sku: "WOM-YLG-XS-BLK", stock: 15 },
      { size: "S", color: "Black", sku: "WOM-YLG-S-BLK", stock: 20 },
      { size: "M", color: "Black", sku: "WOM-YLG-M-BLK", stock: 20 },
      { size: "L", color: "Black", sku: "WOM-YLG-L-BLK", stock: 15 },
    ]
  },
  {
    title: "Nike Air Max 270",
    description: "Big Air for big style. The Air Max 270 features the tallest Air unit yet for all-day comfort.",
    price: 150,
    comparePrice: 170,
    image: "/images/products/women/air-max-270-w.jpg",
    category: "Women",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 55,
    rating: 4.6,
    featured: false,
    variants: [
      { size: "6", color: "White", sku: "WOM-AM270-6-WHT", stock: 14 },
      { size: "7", color: "White", sku: "WOM-AM270-7-WHT", stock: 14 },
      { size: "8", color: "White", sku: "WOM-AM270-8-WHT", stock: 15 },
      { size: "9", color: "White", sku: "WOM-AM270-9-WHT", stock: 12 },
    ]
  },
  {
    title: "Nike Windrunner Jacket",
    description: "Classic windrunner silhouette with modern updates. Water-resistant and breathable.",
    price: 120,
    comparePrice: 140,
    image: "/images/products/women/windrunner.jpg",
    category: "Women",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 45,
    rating: 4.4,
    featured: false,
    variants: [
      { size: "S", color: "Yellow", sku: "WOM-WRN-S-YEL", stock: 12 },
      { size: "M", color: "Yellow", sku: "WOM-WRN-M-YEL", stock: 12 },
      { size: "L", color: "Yellow", sku: "WOM-WRN-L-YEL", stock: 12 },
      { size: "XL", color: "Yellow", sku: "WOM-WRN-XL-YEL", stock: 9 },
    ]
  },
  {
    title: "Nike React Infinity Run Flyknit",
    description: "Soft, stable, and comfortable. Flyknit upper provides a sock-like fit.",
    price: 180,
    comparePrice: 200,
    image: "/images/products/women/react-infinity-flyknit.jpg",
    category: "Women",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 40,
    rating: 4.8,
    featured: true,
    variants: [
      { size: "6", color: "Purple", sku: "WOM-IRF-6-PRP", stock: 10 },
      { size: "7", color: "Purple", sku: "WOM-IRF-7-PRP", stock: 10 },
      { size: "8", color: "Purple", sku: "WOM-IRF-8-PRP", stock: 10 },
      { size: "9", color: "Purple", sku: "WOM-IRF-9-PRP", stock: 10 },
    ]
  },
  {
    title: "Nike Pro Indy Sports Bra",
    description: "Lightweight support for low-impact activities. Removable pads for customizable coverage.",
    price: 30,
    comparePrice: 40,
    image: "/images/products/women/pro-indy-bra.jpg",
    category: "Women",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 90,
    rating: 4.3,
    featured: false,
    variants: [
      { size: "S", color: "Grey", sku: "WOM-PIND-S-GRY", stock: 25 },
      { size: "M", color: "Grey", sku: "WOM-PIND-M-GRY", stock: 30 },
      { size: "L", color: "Grey", sku: "WOM-PIND-L-GRY", stock: 25 },
      { size: "XL", color: "Grey", sku: "WOM-PIND-XL-GRY", stock: 10 },
    ]
  },
  {
    title: "Nike Air Max 97",
    description: "The iconic wave design inspired by Japanese bullet trains. Full-length Air unit.",
    price: 170,
    comparePrice: 190,
    image: "/images/products/women/air-max-97.jpg",
    category: "Women",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 45,
    rating: 4.7,
    featured: false,
    variants: [
      { size: "6", color: "Silver", sku: "WOM-AM97-6-SLV", stock: 12 },
      { size: "7", color: "Silver", sku: "WOM-AM97-7-SLV", stock: 12 },
      { size: "8", color: "Silver", sku: "WOM-AM97-8-SLV", stock: 12 },
      { size: "9", color: "Silver", sku: "WOM-AM97-9-SLV", stock: 9 },
    ]
  },
  {
    title: "Nike Tempo Shorts",
    description: "Classic running shorts with built-in briefs. Lightweight and breathable.",
    price: 35,
    comparePrice: 45,
    image: "/images/products/women/tempo-shorts.jpg",
    category: "Women",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 85,
    rating: 4.5,
    featured: false,
    variants: [
      { size: "S", color: "Blue", sku: "WOM-TMP-S-BLU", stock: 22 },
      { size: "M", color: "Blue", sku: "WOM-TMP-M-BLU", stock: 22 },
      { size: "L", color: "Blue", sku: "WOM-TMP-L-BLU", stock: 22 },
      { size: "XL", color: "Blue", sku: "WOM-TMP-XL-BLU", stock: 19 },
    ]
  },
  {
    title: "Nike Blazer Mid '77 Vintage",
    description: "Vintage-style basketball shoe with exposed foam tongue and retro Swoosh.",
    price: 105,
    comparePrice: 120,
    image: "/images/products/women/blazer-mid.jpg",
    category: "Women",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 50,
    rating: 4.5,
    featured: true,
    variants: [
      { size: "6", color: "White", sku: "WOM-BLM-6-WHT", stock: 13 },
      { size: "7", color: "White", sku: "WOM-BLM-7-WHT", stock: 13 },
      { size: "8", color: "White", sku: "WOM-BLM-8-WHT", stock: 12 },
      { size: "9", color: "White", sku: "WOM-BLM-9-WHT", stock: 12 },
    ]
  },

  // KIDS' PRODUCTS (12 products)
  {
    title: "Nike Air Max 90 (GS)",
    description: "Big Kids' Shoe. Classic style meets all-day comfort with visible Air cushioning.",
    price: 90,
    comparePrice: 110,
    image: "/images/products/kids/air-max-90-gs.jpg",
    category: "Kids",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 60,
    rating: 4.6,
    featured: true,
    variants: [
      { size: "4Y", color: "Red", sku: "KID-AM90-4Y-RED", stock: 15 },
      { size: "5Y", color: "Red", sku: "KID-AM90-5Y-RED", stock: 15 },
      { size: "6Y", color: "Red", sku: "KID-AM90-6Y-RED", stock: 15 },
      { size: "7Y", color: "Red", sku: "KID-AM90-7Y-RED", stock: 15 },
    ]
  },
  {
    title: "Nike Air Force 1 (GS)",
    description: "Grade School Shoe. The classic AF1 with premium leather and iconic style.",
    price: 75,
    comparePrice: 90,
    image: "/images/products/kids/af1-gs.jpg",
    category: "Kids",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 70,
    rating: 4.7,
    featured: true,
    variants: [
      { size: "3Y", color: "White", sku: "KID-AF1-3Y-WHT", stock: 18 },
      { size: "4Y", color: "White", sku: "KID-AF1-4Y-WHT", stock: 18 },
      { size: "5Y", color: "White", sku: "KID-AF1-5Y-WHT", stock: 18 },
      { size: "6Y", color: "White", sku: "KID-AF1-6Y-WHT", stock: 16 },
    ]
  },
  {
    title: "Nike Dri-FIT T-Shirt (GS)",
    description: "Grade School Shirt. Moisture-wicking fabric keeps kids cool and dry.",
    price: 25,
    comparePrice: 35,
    image: "/images/products/kids/dri-fit-tshirt.jpg",
    category: "Kids",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 100,
    rating: 4.4,
    featured: false,
    variants: [
      { size: "S (7-8)", color: "Blue", sku: "KID-DFT-S-BLU", stock: 25 },
      { size: "M (8-10)", color: "Blue", sku: "KID-DFT-M-BLU", stock: 25 },
      { size: "L (10-12)", color: "Blue", sku: "KID-DFT-L-BLU", stock: 25 },
      { size: "XL (12-14)", color: "Blue", sku: "KID-DFT-XL-BLU", stock: 25 },
    ]
  },
  {
    title: "Nike Revolution 6 (GS)",
    description: "Big Kids' Running Shoe. Soft foam cushioning for all-day comfort.",
    price: 55,
    comparePrice: 70,
    image: "/images/products/kids/revolution-6.jpg",
    category: "Kids",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 65,
    rating: 4.5,
    featured: false,
    variants: [
      { size: "4Y", color: "Black", sku: "KID-REV-4Y-BLK", stock: 17 },
      { size: "5Y", color: "Black", sku: "KID-REV-5Y-BLK", stock: 17 },
      { size: "6Y", color: "Black", sku: "KID-REV-6Y-BLK", stock: 16 },
      { size: "7Y", color: "Black", sku: "KID-REV-7Y-BLK", stock: 15 },
    ]
  },
  {
    title: "Nike Sportswear Club Fleece Hoodie (GS)",
    description: "Grade School Hoodie. Soft fleece fabric with classic Nike branding.",
    price: 45,
    comparePrice: 55,
    image: "/images/products/kids/fleece-hoodie.jpg",
    category: "Kids",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 80,
    rating: 4.6,
    featured: false,
    variants: [
      { size: "S (7-8)", color: "Grey", sku: "KID-HOOD-S-GRY", stock: 20 },
      { size: "M (8-10)", color: "Grey", sku: "KID-HOOD-M-GRY", stock: 20 },
      { size: "L (10-12)", color: "Grey", sku: "KID-HOOD-L-GRY", stock: 20 },
      { size: "XL (12-14)", color: "Grey", sku: "KID-HOOD-XL-GRY", stock: 20 },
    ]
  },
  {
    title: "Nike Air Jordan 1 Mid (GS)",
    description: "Grade School Shoe. The iconic AJ1 Mid with premium leather and classic colors.",
    price: 85,
    comparePrice: 100,
    image: "/images/products/kids/aj1-mid-gs.jpg",
    category: "Kids",
    subcategory: "Shoes",
    brand: "Jordan",
    stock: 50,
    rating: 4.8,
    featured: true,
    variants: [
      { size: "4Y", color: "Black/Red", sku: "KID-AJ1M-4Y-BR", stock: 13 },
      { size: "5Y", color: "Black/Red", sku: "KID-AJ1M-5Y-BR", stock: 13 },
      { size: "6Y", color: "Black/Red", sku: "KID-AJ1M-6Y-BR", stock: 12 },
      { size: "7Y", color: "Black/Red", sku: "KID-AJ1M-7Y-BR", stock: 12 },
    ]
  },
  {
    title: "Nike Dri-FIT Shorts (GS)",
    description: "Grade School Shorts. Lightweight and breathable for active kids.",
    price: 28,
    comparePrice: 38,
    image: "/images/products/kids/dri-fit-shorts.jpg",
    category: "Kids",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 90,
    rating: 4.4,
    featured: false,
    variants: [
      { size: "S (7-8)", color: "Black", sku: "KID-DFS-S-BLK", stock: 23 },
      { size: "M (8-10)", color: "Black", sku: "KID-DFS-M-BLK", stock: 23 },
      { size: "L (10-12)", color: "Black", sku: "KID-DFS-L-BLK", stock: 23 },
      { size: "XL (12-14)", color: "Black", sku: "KID-DFS-XL-BLK", stock: 21 },
    ]
  },
  {
    title: "Nike Air Max Plus (GS)",
    description: "Big Kids' Shoe. Tuned Air technology and bold gradient upper.",
    price: 110,
    comparePrice: 130,
    image: "/images/products/kids/air-max-plus.jpg",
    category: "Kids",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 45,
    rating: 4.7,
    featured: false,
    variants: [
      { size: "4Y", color: "Multi", sku: "KID-AMP-4Y-MLT", stock: 12 },
      { size: "5Y", color: "Multi", sku: "KID-AMP-5Y-MLT", stock: 12 },
      { size: "6Y", color: "Multi", sku: "KID-AMP-6Y-MLT", stock: 11 },
      { size: "7Y", color: "Multi", sku: "KID-AMP-7Y-MLT", stock: 10 },
    ]
  },
  {
    title: "Nike Tech Fleece Joggers (GS)",
    description: "Grade School Joggers. Premium fleece with ribbed cuffs for a secure fit.",
    price: 40,
    comparePrice: 50,
    image: "/images/products/kids/tech-joggers.jpg",
    category: "Kids",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 75,
    rating: 4.5,
    featured: false,
    variants: [
      { size: "S (7-8)", color: "Black", sku: "KID-TJ-S-BLK", stock: 19 },
      { size: "M (8-10)", color: "Black", sku: "KID-TJ-M-BLK", stock: 19 },
      { size: "L (10-12)", color: "Black", sku: "KID-TJ-L-BLK", stock: 19 },
      { size: "XL (12-14)", color: "Black", sku: "KID-TJ-XL-BLK", stock: 18 },
    ]
  },
  {
    title: "Nike Dunk Low (GS)",
    description: "Grade School Shoe. Classic basketball silhouette with premium leather.",
    price: 80,
    comparePrice: 95,
    image: "/images/products/kids/dunk-low.jpg",
    category: "Kids",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 55,
    rating: 4.6,
    featured: true,
    variants: [
      { size: "4Y", color: "Panda", sku: "KID-DNK-4Y-PND", stock: 14 },
      { size: "5Y", color: "Panda", sku: "KID-DNK-5Y-PND", stock: 14 },
      { size: "6Y", color: "Panda", sku: "KID-DNK-6Y-PND", stock: 14 },
      { size: "7Y", color: "Panda", sku: "KID-DNK-7Y-PND", stock: 13 },
    ]
  },
  {
    title: "Nike Sportswear Tracksuit (GS)",
    description: "Grade School Tracksuit. Jacket and pants set for complete style.",
    price: 85,
    comparePrice: 100,
    image: "/images/products/kids/tracksuit.jpg",
    category: "Kids",
    subcategory: "Apparel",
    brand: "Nike",
    stock: 50,
    rating: 4.5,
    featured: false,
    variants: [
      { size: "S (7-8)", color: "Blue", sku: "KID-TRK-S-BLU", stock: 13 },
      { size: "M (8-10)", color: "Blue", sku: "KID-TRK-M-BLU", stock: 13 },
      { size: "L (10-12)", color: "Blue", sku: "KID-TRK-L-BLU", stock: 12 },
      { size: "XL (12-14)", color: "Blue", sku: "KID-TRK-XL-BLU", stock: 12 },
    ]
  },
  {
    title: "Nike Flex Runner 3 (PS)",
    description: "Preschool Shoe. Easy on and off with stretchy, comfortable design.",
    price: 45,
    comparePrice: 55,
    image: "/images/products/kids/flex-runner-3.jpg",
    category: "Kids",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 60,
    rating: 4.7,
    featured: false,
    variants: [
      { size: "10C", color: "Pink", sku: "KID-FR3-10C-PNK", stock: 15 },
      { size: "11C", color: "Pink", sku: "KID-FR3-11C-PNK", stock: 15 },
      { size: "12C", color: "Pink", sku: "KID-FR3-12C-PNK", stock: 15 },
      { size: "13C", color: "Pink", sku: "KID-FR3-13C-PNK", stock: 15 },
    ]
  },
];

async function seedProducts() {
  console.log('🌱 Starting product seeding...');

  for (const product of products) {
    try {
      // Create product
      const createdProduct = await db.product.create({
        data: {
          title: product.title,
          description: product.description,
          price: product.price,
          comparePrice: product.comparePrice,
          image: product.image,
          category: product.category,
          subcategory: product.subcategory,
          brand: product.brand,
          stock: product.stock,
          rating: product.rating,
          featured: product.featured,
          reviewCount: Math.floor(Math.random() * 50) + 10,
        },
      });

      // Add variants
      for (const variant of product.variants) {
        await db.productVariant.create({
          data: {
            productId: createdProduct.id,
            size: variant.size,
            color: variant.color,
            sku: variant.sku,
            stock: variant.stock,
          },
        });
      }

      console.log(`✅ Created: ${product.title}`);
    } catch (error) {
      console.error(`❌ Failed to create ${product.title}:`, error);
    }
  }

  console.log('\n🎉 Product seeding complete!');
  console.log(`📊 Total products: ${products.length}`);
}

seedProducts()
  .then(() => {
    console.log('✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
