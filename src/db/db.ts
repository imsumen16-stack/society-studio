import fs from 'fs';
import path from 'path';

// Define DB file path
const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Interface declarations matching all requested entities
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  class: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  details: string[];
  gsm: number;
  colors: ProductColor[];
  sizes: string[];
  imagePrimary: string;
  imageHover: string;
  isExclusive?: boolean;
  inventory: number;
}

export interface CartItemData {
  id: string;
  productId: string;
  selectedSize: string;
  selectedColor: string;
  selectedColorHex: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItemData[];
}

export interface Wishlist {
  userId: string;
  productIds: string[];
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  userId: string | null; // null for guest checkout
  customerName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: 'card' | 'cod' | 'upi';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  trackingNumber: string;
  createdAt: string;
  items: OrderItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  author: string;
}

export interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  active: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface Schema {
  users: User[];
  products: Product[];
  carts: Cart[];
  wishlists: Wishlist[];
  orders: Order[];
  blogPosts: BlogPost[];
  reviews: Review[];
  coupons: Coupon[];
  contactMessages: ContactMessage[];
  newsletterSubscribers: NewsletterSubscriber[];
}

// Initial Starter Data Seeds
const SEED_PRODUCTS: Product[] = [
  {
    id: 'uniform-hoodie',
    name: 'THE UNIFORM HOODIE',
    price: 185,
    category: 'ESSENTIALS',
    description: 'Heavyweight loopback cotton hoodie. 500 GSM thick organic loop back knit texture, drop shoulder slouch posture, with high standing doubled felted hood loops.',
    details: [
      '500 GSM loopback organic cotton jersey',
      'Thick dual felted double hood without drawstrings',
      'Dropped shoulder architectural slouch profile',
      'Heavy-rib horizontal knit waistband & wrist cuffs',
      'Finished with central debossed tonal silicon print'
    ],
    gsm: 500,
    colors: [
      { name: 'CHARCOAL BLACK', hex: '#1E1E1E', class: 'bg-[#1E1E1E]' },
      { name: 'OATMEAL CREAM', hex: '#F0EFEA', class: 'bg-[#F0EFEA]' },
      { name: 'HEATHER GREY', hex: '#BABABA', class: 'bg-[#BABABA]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/WN8XTMD1/download-2.jpg',
    imageHover: 'https://i.ibb.co/TM043sFH/download-1.jpg',
    inventory: 45
  },
  {
    id: 'hoodie-cream',
    name: 'THE OATMEAL STAPLE HOODIE',
    price: 185,
    category: 'ESSENTIALS',
    description: 'Oversized heavy loopback casual hoodie raw-dyed in charcoal oatmeal cream colorways. Engineered with reinforced box pockets.',
    details: [
      '500 GSM thick loops organic terry',
      'Kangaroo reinforced bottom double hand pockets',
      'Unstructured double-folded clean visual hood line',
      'Premium pre-shrunk wash for secure fits',
      'Raw loop details inside'
    ],
    gsm: 500,
    colors: [
      { name: 'OATMEAL CREAM', hex: '#F0EFEA', class: 'bg-[#F0EFEA]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/LXp1qGPj/Cozy-hoodie-girls-fleece.jpg',
    imageHover: 'https://i.ibb.co/Z6cb3Xg7/download-3.jpg',
    inventory: 32
  },
  {
    id: 'hoodie-grey',
    name: 'THE STONE GREY STAPLE HOODIE',
    price: 185,
    category: 'ESSENTIALS',
    description: 'Stripe-cut slouch heavyweight loopback hoodie. Washed stone gray tone, with heavy felted cuffs and flatlock geometry stitches.',
    details: [
      '500 GSM French terry loops cotton jersey',
      'Signature horizontal felt split cuffs detailing',
      'Dropped shoulder posture',
      'Silky silicone waterbase branding detail',
      'Extremely dense heavy weight drape'
    ],
    gsm: 500,
    colors: [
      { name: 'HEATHER GREY', hex: '#BABABA', class: 'bg-[#BABABA]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: 'https://i.ibb.co/RTY1dkgS/MANCHETTE-LIGHT-GREY-MELANGE-HOODIE-XXL.jpg',
    imageHover: 'https://i.ibb.co/JWYssHns/Men-s-Casual-Minimalist-Solid-Color-Kangaroo-Pocket-Drawstring-Hoodie-Suitable-For-Daily-Commute-A.jpg',
    inventory: 28
  },
  {
    id: 'trucker-cap',
    name: 'SIGNATURE TRUCKER CAP',
    price: 65,
    category: 'ACCESSORIES',
    description: 'Minimal 6-panel heavy cotton twill crown cap in washed coal black. Detailed with customized flat high contrast white embroideries.',
    details: [
      '100% heavyweight robust washed cotton twill cap',
      'White high-density flat-embellished embroidery SOCIETY print',
      'Adjustable snapback strap backed by custom brass clasp',
      'Reinforced buckram inner front panels structure',
      'Raw distressed brim accents'
    ],
    gsm: 320,
    colors: [
      { name: 'CHARCOAL BLACK', hex: '#1E1E1E', class: 'bg-[#1E1E1E]' }
    ],
    sizes: ['ONE_SIZE'],
    imagePrimary: 'https://i.ibb.co/RkzsnWf1/Casquette-Noir-Homme.jpg',
    imageHover: 'https://i.ibb.co/B1p7d56/Inspiration.jpg',
    isExclusive: true,
    inventory: 50
  }
];

const SEED_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-streetwear-evolution',
    title: 'PREMIUM STREETWEAR: THE EVOLUTION OF MODERN STYLE',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'STREETWEAR',
    excerpt: 'Premium streetwear has transformed the fashion industry by combining luxury craftsmanship with everyday comfort. Explore how quality and practicality define a new global movement.',
    author: 'SOCIETY STUDIOS',
    content: [
      'Premium streetwear has transformed the fashion industry by combining luxury craftsmanship with everyday comfort.',
      'Consumers increasingly seek clothing that offers both quality and practicality. This demand has elevated streetwear from a niche movement into a global fashion category.',
      '### DEFINING THE GENERATION',
      'Premium fabrics, modern fits, and refined aesthetics define the new generation of streetwear brands.',
      '### THE BALANCE AT SOCIETY STUDIOS',
      'Society Studios embraces this evolution by creating garments that balance comfort, quality, and contemporary design.',
      '### STYLE AND SUBSTANCE',
      'The future of fashion belongs to brands that understand both style and substance.',
      'Premium streetwear represents exactly that balance.'
    ]
  },
  {
    id: 'post-trends',
    title: 'THE ENDURING STYLE: WHY CLASSIC TRUMPS TRENDS',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'PHILOSOPHY',
    excerpt: 'The fashion industry constantly introduces new trends, but not every trend stands the test of time. Explore how timeless essentials provide lasting value and effortless style.',
    author: 'SOCIETY STUDIOS',
    content: [
      'The fashion industry constantly introduces new trends, but not every trend stands the test of time.',
      'Timeless fashion focuses on enduring style rather than temporary popularity. It prioritizes quality, versatility, and authenticity.',
      '### BEYOND SEASONAL CYCLES',
      'At Society Studios, we aim to create clothing that remains relevant beyond seasonal fashion cycles.',
      'A well-designed hoodie or premium T-shirt should look just as good years from now as it does today.',
      '### THE ULTIMATE WARDROBE FOUNDATION',
      'By focusing on timeless essentials, individuals can build wardrobes that provide lasting value and effortless style.',
      '### A LIFETIME OF STYLE',
      'Fashion should evolve with the wearer, not expire with the season.'
    ]
  },
  {
    id: 'post-details',
    title: 'THE ART OF DETAIL: CRAFTSMANSHIP IN MODERN FASHION',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'CRAFTSMANSHIP',
    excerpt: 'Great fashion is often defined by the details. Fabric selection, stitching quality, fit, and finishing techniques all contribute to the final product. Explore our commitment to quality.',
    author: 'SOCIETY STUDIOS',
    content: [
      'Great fashion is often defined by the details. While overall design matters, the small elements can make the biggest difference.',
      'Fabric selection, stitching quality, fit, and finishing techniques all contribute to the final product.',
      '### THE DEFINITION OF CRAFT',
      'Premium garments are distinguished by their craftsmanship. Every seam, cut, and material choice reflects a commitment to quality.',
      '### OUR DESIGN PHILOSOPHY',
      'At Society Studios, attention to detail is part of our design philosophy. We believe excellence is achieved through thoughtful decisions at every stage of creation.',
      '### BEYOND THE SURFACE',
      'These details may not always be immediately visible, but they significantly impact durability, comfort, and overall appearance.'
    ]
  }
];

const SEED_COUPONS: Coupon[] = [
  { code: 'SOCIETY10', discountPercent: 10, active: true },
  { code: 'FOUNDER20', discountPercent: 20, active: true },
  { code: 'WELCOME5', discountPercent: 5, active: true }
];

// Helper to load and save DB data
export class Database {
  private static data: Schema | null = null;

  private static init() {
    if (this.data) return;

    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (err) {
        console.error('Failed to parse database. Recreating...', err);
      }
    }

    if (!this.data) {
      // Create seed database
      this.data = {
        users: [
          {
            id: 'u-admin',
            email: 'admin@society.studios',
            passwordHash: '$2a$10$WstX8m6p.74F3lW/p8IqAeo79T1Yk7/R69p8Cj9h4pC/W6uJEqvSm', // admin123
            name: 'SYSTEM ADMIN',
            role: 'ADMIN',
            createdAt: new Date().toISOString()
          }
        ],
        products: SEED_PRODUCTS,
        carts: [],
        wishlists: [],
        orders: [],
        blogPosts: SEED_BLOG_POSTS,
        reviews: [],
        coupons: SEED_COUPONS,
        contactMessages: [],
        newsletterSubscribers: []
      };
      this.save();
    }
  }

  private static save() {
    if (!this.data) return;
    fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  // API Methods
  public static getUsers(): User[] {
    this.init();
    return this.data!.users;
  }

  public static addUser(user: User) {
    this.init();
    this.data!.users.push(user);
    this.save();
  }

  public static getProducts(): Product[] {
    this.init();
    return this.data!.products;
  }

  public static addProduct(product: Product) {
    this.init();
    this.data!.products.unshift(product);
    this.save();
  }

  public static updateProduct(id: string, updated: Partial<Product>) {
    this.init();
    this.data!.products = this.data!.products.map(p => p.id === id ? { ...p, ...updated } : p);
    this.save();
  }

  public static deleteProduct(id: string) {
    this.init();
    this.data!.products = this.data!.products.filter(p => p.id !== id);
    this.save();
  }

  public static getCart(userId: string): Cart {
    this.init();
    let cart = this.data!.carts.find(c => c.userId === userId);
    if (!cart) {
      cart = { userId, items: [] };
      this.data!.carts.push(cart);
      this.save();
    }
    return cart;
  }

  public static saveCart(userId: string, items: CartItemData[]) {
    this.init();
    const idx = this.data!.carts.findIndex(c => c.userId === userId);
    if (idx > -1) {
      this.data!.carts[idx].items = items;
    } else {
      this.data!.carts.push({ userId, items });
    }
    this.save();
  }

  public static getWishlist(userId: string): Wishlist {
    this.init();
    let wishlist = this.data!.wishlists.find(w => w.userId === userId);
    if (!wishlist) {
      wishlist = { userId, productIds: [] };
      this.data!.wishlists.push(wishlist);
      this.save();
    }
    return wishlist;
  }

  public static saveWishlist(userId: string, productIds: string[]) {
    this.init();
    const idx = this.data!.wishlists.findIndex(w => w.userId === userId);
    if (idx > -1) {
      this.data!.wishlists[idx].productIds = productIds;
    } else {
      this.data!.wishlists.push({ userId, productIds });
    }
    this.save();
  }

  public static getOrders(): Order[] {
    this.init();
    return this.data!.orders;
  }

  public static addOrder(order: Order) {
    this.init();
    this.data!.orders.unshift(order);
    this.save();
  }

  public static updateOrderStatus(id: string, status: Order['status'], paymentStatus?: Order['paymentStatus']) {
    this.init();
    this.data!.orders = this.data!.orders.map(o => {
      if (o.id === id) {
        return {
          ...o,
          status,
          paymentStatus: paymentStatus || o.paymentStatus
        };
      }
      return o;
    });
    this.save();
  }

  public static getBlogPosts(): BlogPost[] {
    this.init();
    return this.data!.blogPosts;
  }

  public static addBlogPost(post: BlogPost) {
    this.init();
    this.data!.blogPosts.unshift(post);
    this.save();
  }

  public static updateBlogPost(id: string, updated: Partial<BlogPost>) {
    this.init();
    this.data!.blogPosts = this.data!.blogPosts.map(bp => bp.id === id ? { ...bp, ...updated } : bp);
    this.save();
  }

  public static deleteBlogPost(id: string) {
    this.init();
    this.data!.blogPosts = this.data!.blogPosts.filter(bp => bp.id !== id);
    this.save();
  }

  public static getReviews(productId?: string): Review[] {
    this.init();
    if (productId) {
      return this.data!.reviews.filter(r => r.productId === productId);
    }
    return this.data!.reviews;
  }

  public static addReview(review: Review) {
    this.init();
    this.data!.reviews.unshift(review);
    this.save();
  }

  public static getCoupons(): Coupon[] {
    this.init();
    return this.data!.coupons;
  }

  public static getCoupon(code: string): Coupon | undefined {
    this.init();
    return this.data!.coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.active);
  }

  public static addCoupon(coupon: Coupon) {
    this.init();
    this.data!.coupons.push(coupon);
    this.save();
  }

  public static addContactMessage(msg: ContactMessage) {
    this.init();
    this.data!.contactMessages.unshift(msg);
    this.save();
  }

  public static getContactMessages(): ContactMessage[] {
    this.init();
    return this.data!.contactMessages;
  }

  public static addNewsletterSubscriber(sub: NewsletterSubscriber) {
    this.init();
    if (!this.data!.newsletterSubscribers.some(s => s.email.toLowerCase() === sub.email.toLowerCase())) {
      this.data!.newsletterSubscribers.push(sub);
      this.save();
    }
  }

  public static getNewsletterSubscribers(): NewsletterSubscriber[] {
    this.init();
    return this.data!.newsletterSubscribers;
  }
}
