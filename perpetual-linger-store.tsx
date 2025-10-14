import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Phone, Mail, MapPin, Instagram, Facebook, ChevronRight } from 'lucide-react';

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-amber-400 opacity-20 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// Sparkles Component
const Sparkles = ({ density = 20 }) => {
  const sparkles = Array.from({ length: density }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute text-amber-400 animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
};

// Product data
const products = {
  forHer: [
    { id: 'bs-fantasy', name: 'Britney Spears Fantasy', category: 'Sweet & Fruity', notes: 'Kiwi, Cupcake, Jasmine, White Chocolate', description: 'A playful, irresistible scent that lingers in their memory long after you\'ve left the room.' },
    { id: 'bulgari-omnia', name: 'Bulgari Omnia Green Crystal', category: 'Fresh & Floral', notes: 'Mandarin, Peony, Green Tea, Musk', description: 'Radiant freshness that captivates with every breath. They\'ll turn around twice.' },
    { id: 'ck-euphoria', name: 'Calvin Klein Euphoria', category: 'Oriental & Seductive', notes: 'Pomegranate, Black Orchid, Amber, Mahogany', description: 'Intoxicating allure. One spray and you become unforgettable.' },
    { id: 'ch-212', name: 'Carolina Herrera 212 For Her', category: 'Modern & Elegant', notes: 'Bergamot, Gardenia, Musk, Sandalwood', description: 'Sophisticated confidence that announces your presence before you speak.' },
    { id: 'chanel-chance', name: 'Chanel Chance', category: 'Classic & Timeless', notes: 'Pink Pepper, Jasmine, Amber Patchouli, Vanilla', description: 'The scent of possibility. Bold, unexpected, utterly magnetic.' },
    { id: 'chanel-coco', name: 'Chanel Coco Mademoiselle', category: 'Elegant & Sensual', notes: 'Orange, Rose, Jasmine, Patchouli, Vanilla', description: 'Timeless elegance meets modern seduction. They\'ll never forget how you made them feel.' },
    { id: 'dg-lightblue', name: 'Dolce & Gabbana Light Blue', category: 'Fresh & Citrus', notes: 'Sicilian Lemon, Apple, Jasmine, Cedarwood', description: 'Mediterranean sunshine bottled. Fresh, breezy, effortlessly captivating.' },
    { id: 'dg-theone', name: 'Dolce & Gabbana The One', category: 'Sophisticated & Warm', notes: 'Bergamot, Peach, Madonna Lily, Vanilla, Amber', description: 'Warm, velvety seduction. The fragrance that makes moments linger.' },
    { id: 'dkny-delicious', name: 'DKNY Delicious', category: 'Sweet & Playful', notes: 'Apple, Cucumber, Grapefruit, Magnolia, Amber', description: 'Crisp temptation that keeps them coming back for more.' },
    { id: 'dkny-original', name: 'DKNY Original', category: 'Urban & Fresh', notes: 'Rose, Lily, Sandalwood, Vanilla', description: 'Modern femininity with an edge. Sophisticated yet approachable.' },
    { id: 'davidoff-coolwater', name: 'Davidoff Cool Water', category: 'Aquatic & Fresh', notes: 'Lotus, Lily, Sandalwood, Musk', description: 'Refreshing waves of elegance. Cool confidence that never goes unnoticed.' },
    { id: 'elie-saab', name: 'Elie Saab', category: 'Luxurious & Floral', notes: 'Orange Blossom, Jasmine, Patchouli, Rose Honey', description: 'Red carpet glamour in a bottle. Pure luxury that commands attention.' },
    { id: 'estee-pleasures', name: 'Estee Lauder Pleasures', category: 'Fresh & Floral', notes: 'White Lily, Peony, Rose, Jasmine', description: 'Garden-fresh sophistication. Joyful, radiant, utterly memorable.' },
    { id: 'armani-acqua', name: 'Giorgio Armani Aqua di Gio', category: 'Aquatic & Fresh', notes: 'Marine Notes, Jasmine, Cedarwood', description: 'Ocean breeze elegance. Fresh, clean, eternally captivating.' },
    { id: 'armani-si', name: 'Giorgio Armani Si', category: 'Chypre & Modern', notes: 'Blackcurrant, Rose, Patchouli, Vanilla', description: 'Say yes to leaving an impression. Powerful, feminine, unforgettable.' },
    { id: 'gucci-bamboo', name: 'Gucci Bamboo', category: 'Floral & Woody', notes: 'Bergamot, Orange Blossom, Cashmere Wood, Vanilla', description: 'Strength wrapped in femininity. They\'ll remember your confidence.' },
    { id: 'gucci-rush', name: 'Gucci Rush', category: 'Bold & Spicy', notes: 'Freesia, Damask Rose, Vanilla, Patchouli', description: 'Daring and seductive. Not for the faint of heart - or memory.' },
    { id: 'issey-miyake', name: 'Issey Miyake', category: 'Aquatic & Floral', notes: 'Lotus, Lily, Precious Woods', description: 'Pure water poetry. Minimalist beauty that speaks volumes.' },
    { id: 'jpg-classic', name: 'Jean Paul Gaultier Classic', category: 'Oriental & Floral', notes: 'Orange Blossom, Ginger, Rose, Vanilla', description: 'Provocative elegance. Unforgettable from the first encounter.' },
    { id: 'lacoste-pink', name: 'La Coste Touch of Pink', category: 'Fruity & Floral', notes: 'Cardamom, Blood Orange, Jasmine, Musk', description: 'Playful sophistication. Sweet memories that linger.' },
    { id: 'lancome-belle', name: 'Lancome La Vie Est Belle', category: 'Gourmand & Sweet', notes: 'Iris, Pear, Praline, Vanilla, Patchouli', description: 'Life is beautiful, and so is your scent trail. Pure happiness captured.' },
    { id: 'mj-daisy', name: 'Marc Jacobs Daisy', category: 'Fresh & Youthful', notes: 'Strawberry, Violet, Jasmine, Musk', description: 'Whimsical charm that never fades from memory. Fresh, fun, forever.' },
    { id: 'narciso-her', name: 'Narciso Rodriguez For Her', category: 'Musky & Elegant', notes: 'Rose, Peach, Musk, Amber', description: 'Magnetic sensuality. Sophisticated allure they won\'t shake off.' },
    { id: 'pr-ladymillion', name: 'Paco Rabanne Lady Million', category: 'Floral & Woody', notes: 'Neroli, Raspberry, Jasmine, Honey, Patchouli', description: 'Golden extravagance. Opulent, dazzling, utterly unforgettable.' },
    { id: 'pr-olympea', name: 'Paco Rabanne Olympea', category: 'Oriental & Aquatic', notes: 'Water Jasmine, Ginger, Salted Vanilla, Cashmere', description: 'Goddess-level presence. Powerful femininity that commands memory.' },
    { id: 'tm-alien', name: 'Thierry Mugler Alien', category: 'Woody & Amber', notes: 'Jasmine, Cashmeran Wood, Amber', description: 'Otherworldly mystique. Hauntingly beautiful, impossibly memorable.' },
    { id: 'tm-angel', name: 'Thierry Mugler Angel', category: 'Gourmand & Oriental', notes: 'Bergamot, Honey, Caramel, Chocolate, Vanilla, Patchouli', description: 'Divine indulgence. Sweet, powerful, eternally seductive.' },
    { id: 'vs-bombshell', name: "Victoria's Secret Bombshell", category: 'Fruity & Floral', notes: 'Purple Passion Fruit, Peony, Vanilla Orchid', description: 'Playful confidence that explodes in their memory. Bombshell indeed.' },
    { id: 'ysl-opium', name: 'Yves Saint Laurent Opium', category: 'Spicy & Oriental', notes: 'Mandarin, Carnation, Myrrh, Vanilla', description: 'Addictive luxury. One encounter and they\'re hooked forever.' },
    { id: 'dior-poison', name: 'Dior Hypnotic Poison', category: 'Oriental & Vanilla', notes: 'Coconut, Plum, Almond, Vanilla, Musk', description: 'Hypnotic temptation. Forbidden, alluring, permanently etched in memory.' },
    { id: 'billie-eilish', name: 'Billie Eilish', category: 'Warm & Amber', notes: 'Vanilla, Soft Spices, Cocoa, Tonka Bean', description: 'Bold individuality. Cozy seduction that stays with them long after.' },
    { id: 'ag-candy', name: 'Ariana Grande Candy', category: 'Sweet & Fruity', notes: 'Blackberry, Peach, Marshmallow, Vanilla', description: 'Sugar-coated confidence. Dangerously sweet and impossible to forget.' },
    { id: 'ck-obsession', name: 'CK Obsession', category: 'Spicy & Oriental', notes: 'Mandarin, Vanilla, Amber, Musk', description: 'Obsessive allure. They won\'t be able to stop thinking about you.' },
    { id: 'mk-wonderlust', name: 'Michael Kors Wonderlust', category: 'Floral & Woody', notes: 'Almond Milk, Dianthus, Sandalwood, Benzoin', description: 'Wanderlust in a bottle. Adventurous spirit that lingers in their thoughts.' },
    { id: 'ch-goodgirl', name: 'Carolina Herrera Good Girl', category: 'Oriental & Floral', notes: 'Almond, Coffee, Tuberose, Tonka Bean, Cacao', description: 'Good girl with a bad side. Dangerously memorable duality.' },
    { id: 'ch-goodgirlblush', name: 'Carolina Herrera Good Girl Blush', category: 'Fruity & Floral', notes: 'Lychee, Jasmine, Cacao, Dulce de Leche', description: 'Blush-worthy seduction. Sweet confidence that leaves them wanting more.' },
    { id: 'armani-myway', name: 'Giorgio Armani My Way', category: 'Floral & Woody', notes: 'Bergamot, Orange Blossom, Tuberose, Vanilla, Cedarwood', description: 'Your journey, your signature. Bold femininity they\'ll never forget.' },
    { id: 'vanilla-tbs', name: 'Vanilla - The Body Shop', category: 'Gourmand & Sweet', notes: 'Warm Vanilla, Creamy Musk', description: 'Comfort meets seduction. Warm embrace that lingers forever.' },
    { id: 'ck-everyone', name: 'Calvin Klein Everyone', category: 'Clean & Universal', notes: 'Orange, Lavender, Cedarwood, Musk', description: 'Inclusive elegance. Fresh, modern, universally unforgettable.' },
    { id: 'ag-cloud', name: 'Ariana Grande Cloud', category: 'Gourmand & Floral', notes: 'Lavender, Pear, Coconut, Praline, Vanilla', description: 'Dreamy indulgence. Fluffy sweetness that stays in their dreams.' }
  ],
  forHim: [
    { id: 'armani-acqua-m', name: 'Giorgio Armani Aqua di Gio', category: 'Aquatic & Fresh', notes: 'Marine Notes, Bergamot, Rosemary, Patchouli', description: 'Ocean masculinity. Fresh, confident, eternally memorable.' },
    { id: 'azzaro-chrome', name: 'Azzaro Chrome', category: 'Citrus & Aquatic', notes: 'Lemon, Rosemary, Oakmoss, Musk', description: 'Refined freshness. Classic appeal that never fades from memory.' },
    { id: 'ferrari-black', name: 'Ferrari Black', category: 'Woody & Aromatic', notes: 'Lime, Plum, Rose, Cedarwood, Vanilla', description: 'Speed and sophistication. Power that leaves a lasting impression.' },
    { id: 'bulgari-original', name: 'Bvlgari Original', category: 'Oriental & Spicy', notes: 'Tea, Bergamot, Amber, Musk', description: 'Timeless masculinity. Luxurious confidence they won\'t forget.' },
    { id: 'ch-vip', name: 'Carolina Herrera VIP For Men', category: 'Spicy & Woody', notes: 'Vodka, Ginger, Leather, Tonka Bean', description: 'Elite status in a bottle. Exclusive presence that lingers.' },
    { id: 'bleu-chanel', name: 'Bleu de Chanel', category: 'Woody & Aromatic', notes: 'Grapefruit, Ginger, Sandalwood, Cedar', description: 'Modern sophistication. Timeless appeal that stays with them forever.' },
    { id: 'davidoff-coolwater-m', name: 'Davidoff Cool Water', category: 'Aquatic & Fresh', notes: 'Mint, Lavender, Sandalwood, Musk', description: 'Cool confidence. Refreshing presence that never leaves their mind.' },
    { id: 'db-instinct', name: 'David Beckham Instinct', category: 'Citrus & Woody', notes: 'Orange, Cardamom, Patchouli, Vetiver', description: 'Athletic elegance. Magnetic appeal that sticks.' },
    { id: 'dior-sauvage', name: 'Dior Sauvage', category: 'Fresh & Spicy', notes: 'Bergamot, Pepper, Ambroxan, Vanilla', description: 'Wild sophistication. Untamed allure they\'ll never shake off.' },
    { id: 'dunhill-desire', name: 'Dunhill Desire', category: 'Woody & Oriental', notes: 'Bergamot, Apple, Rose, Vanilla, Musk', description: 'Refined desire. Smooth seduction that lingers long after.' },
    { id: 'dg-theone-m', name: 'Dolce & Gabbana The One', category: 'Oriental & Spicy', notes: 'Grapefruit, Coriander, Cardamom, Amber, Tobacco', description: 'Italian confidence. Warm charisma that leaves a permanent mark.' },
    { id: 'dg-lightblue-m', name: 'Dolce & Gabbana Light Blue', category: 'Citrus & Woody', notes: 'Mandarin, Frozen Grapefruit, Rosewood, Musk', description: 'Mediterranean cool. Effortless charm that stays in their memory.' },
    { id: 'hermes-terre', name: "Hermes Terre d'Hermes", category: 'Woody & Spicy', notes: 'Orange, Pepper, Flint, Vetiver, Benzoin', description: 'Earthy sophistication. Grounded masculinity that resonates forever.' },
    { id: 'hugo-original', name: 'Hugo Boss Original', category: 'Aromatic & Woody', notes: 'Apple, Plum, Geranium, Cedar, Sandalwood', description: 'Classic power. Authoritative presence that never fades.' },
    { id: 'issey-miyake-m', name: 'Issey Miyake', category: 'Aquatic & Woody', notes: 'Yuzu, Bergamot, Lemon, Sandalwood, Musk', description: 'Zen masculinity. Pure, clean presence that stays with them.' },
    { id: 'jpg-lemale', name: 'Jean Paul Gaultier Le Male', category: 'Oriental & Fougere', notes: 'Mint, Lavender, Vanilla, Tonka Bean', description: 'Seductive masculinity. Iconic presence that haunts their memory.' },
    { id: 'joop', name: 'Joop', category: 'Oriental & Spicy', notes: 'Mandarin, Heliotrope, Cinnamon, Tonka Bean, Vanilla', description: 'Bold seduction. Provocative charm that never leaves.' },
    { id: 'lacoste-bleau', name: 'Lacoste Le Eau Bleau', category: 'Aromatic & Woody', notes: 'Wormwood, Lavender, Sandalwood, Oakmoss', description: 'Sporty elegance. Fresh confidence that lingers.' },
    { id: 'pr-invictus', name: 'Paco Rabanne Invictus', category: 'Fresh & Woody', notes: 'Grapefruit, Sea Notes, Bay Leaf, Guaiac Wood, Ambergris', description: 'Victory scent. Champion presence that stays undefeated in memory.' },
    { id: 'pr-onemillion', name: 'Paco Rabanne One Million', category: 'Spicy & Leather', notes: 'Grapefruit, Mint, Blood Mandarin, Rose, Cinnamon, Leather, Amber', description: 'Golden magnetism. Million-dollar appeal that never depreciates.' },
    { id: 'versace-eros', name: 'Versace Eros', category: 'Fresh & Oriental', notes: 'Mint, Lemon, Apple, Tonka Bean, Vanilla, Oakmoss', description: 'God-like allure. Passionate presence that echoes eternally.' },
    { id: 'gucci-guilty', name: 'Gucci Guilty', category: 'Aromatic & Woody', notes: 'Lemon, Lavender, Orange Blossom, Patchouli', description: 'Guilty pleasure. Seductive confidence they\'ll confess they remember.' },
    { id: 'lacoste-green', name: 'Lacoste Green', category: 'Fresh & Aromatic', notes: 'Mint, Basil, Vetiver, Oakmoss', description: 'Timeless sport. Fresh masculinity that never goes out of style.' },
    { id: 'diesel-fuel', name: 'Diesel Fuel For Life', category: 'Woody & Fresh', notes: 'Grapefruit, Raspberry, Anise, Lavender', description: 'Urban energy. Dynamic presence that fuels their thoughts.' },
    { id: 'diesel-red', name: 'Diesel Red', category: 'Spicy & Woody', notes: 'Mandarin, Ginger, Lavender, Vanilla, Tobacco', description: 'Fiery passion. Bold masculinity that burns in their memory.' },
    { id: 'cr7', name: 'Cristiano Ronaldo CR7', category: 'Aromatic & Woody', notes: 'Bergamot, Cardamom, Lavender, Tobacco, Sandalwood', description: 'Champion essence. Winning presence that stays on the podium.' },
    { id: 'burberry', name: 'Mr Burberry', category: 'Woody & Herbal', notes: 'Grapefruit, Tarragon, Birch Leaf, Vetiver, Guaiac Wood', description: 'British refinement. Classic sophistication that endures.' },
    { id: 'montblanc-legend', name: 'Mont Blanc Legend', category: 'Aromatic & Woody', notes: 'Bergamot, Lavender, Pineapple, Oakmoss, Sandalwood', description: 'Legendary status. Timeless appeal that creates myths.' },
    { id: 'hugo-bottled', name: 'Hugo Boss Bottled', category: 'Woody & Spicy', notes: 'Apple, Plum, Cinnamon, Sandalwood, Vanilla', description: 'Bottled confidence. Smooth masculinity they\'ll never forget.' },
    { id: 'ck-everyone-m', name: 'Calvin Klein Everyone', category: 'Clean & Universal', notes: 'Orange, Lavender, Cedarwood, Musk', description: 'Universal appeal. Modern masculinity that connects.' },
    { id: 'tm-alien-m', name: 'Thierry Mugler Alien', category: 'Woody & Amber', notes: 'Dill, Cumin, White Amber, Leather', description: 'Otherworldly power. Mysterious presence that haunts.' },
    { id: 'tommy-boy', name: 'Tommy Hilfiger Tommy Boy', category: 'Citrus & Woody', notes: 'Bergamot, Lavender, Mint, Cactus Flower, Cotton', description: 'All-American charm. Fresh appeal that stays classic.' }
  ]
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [productList, setProductList] = useState(products);

  // Add custom CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(120deg); }
        66% { transform: translateY(5px) rotate(240deg); }
      }

      @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1) rotate(180deg); }
      }

      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }

      @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px rgba(245, 158, 11, 0.5); }
        50% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.8), 0 0 30px rgba(245, 158, 11, 0.6); }
      }

      .animate-float {
        animation: float linear infinite;
      }

      .animate-sparkle {
        animation: sparkle ease-in-out infinite;
      }

      .animate-shimmer {
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
      }

      .animate-glow {
        animation: glow 2s ease-in-out infinite;
      }

      .glass-morphism {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .luxury-gradient {
        background: linear-gradient(135deg, #f59e0b, #d97706, #92400e);
      }

      .text-gradient {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const sizes = [
    { size: '10ml Vehicle Fragrance', price: 40 },
    { size: '10ml Pen Spray', price: 40 },
    { size: '10ml Glass Roller', price: 40 },
    { size: '35ml Bottle', price: 120 },
    { size: '50ml Bottle', price: 140 },
    { size: '55ml Bottle', price: 160 },
    { size: '100ml Room Diffuser', price: 210 }
  ];

  const addToCart = (product, size, price) => {
    const cartItem = {
      id: `${product.id}-${size}`,
      name: product.name,
      size: size,
      price: price,
      quantity: 1
    };
    
    const existingItem = cart.find(item => item.id === cartItem.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === cartItem.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, cartItem]);
    }
    setCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleWhatsAppCheckout = () => {
    const message = `Hi! I'd like to order:\n\n${cart.map(item =>
      `${item.name} - ${item.size} (${item.quantity}x R${item.price})`
    ).join('\n')}\n\nTotal: R${getTotalPrice()}.00`;

    window.open(`https://wa.me/27628989645?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAdminLogin = () => {
    if (adminPassword === 'perpetual2024') {
      setIsAdmin(true);
      setCurrentPage('admin');
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const addNewProduct = (category, product) => {
    setProductList(prev => ({
      ...prev,
      [category]: [...prev[category], { ...product, id: Date.now().toString() }]
    }));
  };

  const updateProduct = (category, productId, updatedProduct) => {
    setProductList(prev => ({
      ...prev,
      [category]: prev[category].map(p => p.id === productId ? { ...p, ...updatedProduct } : p)
    }));
  };

  const deleteProduct = (category, productId) => {
    setProductList(prev => ({
      ...prev,
      [category]: prev[category].filter(p => p.id !== productId)
    }));
  };

  const Navigation = () => (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg relative overflow-hidden">
      <FloatingParticles />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-12 h-12 rounded-full luxury-gradient flex items-center justify-center font-serif text-2xl animate-glow group-hover:scale-110 transition-transform duration-300">
              PL
            </div>
            <div>
              <div className="font-serif text-xl text-gradient">Perpetual Linger</div>
              <div className="text-xs text-amber-400 animate-shimmer">They'll Never Forget</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setCurrentPage('home')} className="hover:text-amber-400 transition">Home</button>
            <button onClick={() => setCurrentPage('forHer')} className="hover:text-amber-400 transition">For Her</button>
            <button onClick={() => setCurrentPage('forHim')} className="hover:text-amber-400 transition">For Him</button>
            <button onClick={() => setCurrentPage('about')} className="hover:text-amber-400 transition">About</button>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-amber-400 transition">Contact</button>
            {isAdmin && (
              <button onClick={() => setCurrentPage('admin')} className="hover:text-amber-400 transition">Admin</button>
            )}
            {!isAdmin && (
              <button onClick={() => setCurrentPage('adminLogin')} className="hover:text-amber-400 transition text-xs">Admin</button>
            )}
            <button 
              onClick={() => setCartOpen(!cartOpen)}
              className="relative p-2 hover:text-amber-400 transition"
            >
              <ShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setCartOpen(!cartOpen)}
              className="relative p-2"
            >
              <ShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-400">Home</button>
            <button onClick={() => { setCurrentPage('forHer'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-400">For Her</button>
            <button onClick={() => { setCurrentPage('forHim'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-400">For Him</button>
            <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-400">About</button>
            <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-400">Contact</button>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        <FloatingParticles />
        <Sparkles density={30} />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-amber-300 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="relative text-center text-white px-4 z-10">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full luxury-gradient flex items-center justify-center animate-glow hover:scale-110 transition-transform duration-500">
            <span className="font-serif text-5xl">PL</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl mb-4 text-gradient animate-shimmer">Perpetual Linger</h1>
          <p className="text-2xl md:text-3xl text-amber-400 mb-8 italic animate-pulse">They'll Never Forget</p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Luxury inspired fragrances crafted with passion. Leave a lasting impression that echoes long after you're gone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('forHer')}
              className="luxury-gradient text-black px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center animate-glow shadow-lg hover:shadow-amber-500/50"
            >
              Shop For Her <ChevronRight className="ml-2" />
            </button>
            <button
              onClick={() => setCurrentPage('forHim')}
              className="border-2 border-amber-500 text-amber-500 px-8 py-4 text-lg font-semibold hover:bg-amber-500 hover:text-black hover:scale-105 transition-all duration-300 flex items-center justify-center glass-morphism shadow-lg hover:shadow-amber-500/50"
            >
              Shop For Him <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500 flex items-center justify-center text-white text-2xl">
                ✓
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Expertly composed fragrances inspired by the world's finest scents</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500 flex items-center justify-center text-white text-2xl">
                🚚
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping across South Africa</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500 flex items-center justify-center text-white text-2xl">
                💳
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Payment</h3>
              <p className="text-gray-600">Secure online payment or order via WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductGrid = ({ products, title }) => (
    <div className="min-h-screen bg-gray-50 py-12 relative overflow-hidden">
      <FloatingParticles />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-12 text-gradient">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105 group relative"
              onClick={() => { setSelectedProduct(product); setCurrentPage('product'); }}
            >
              <Sparkles density={5} />
              <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/50 to-amber-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300 relative z-10">🧴</div>
              </div>
              <div className="p-4 relative">
                <h3 className="font-bold text-lg mb-1 group-hover:text-amber-600 transition-colors">{product.name}</h3>
                <p className="text-sm text-amber-600 mb-2 font-medium">{product.category}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gradient">From R40</span>
                  <button className="luxury-gradient text-white px-4 py-2 text-sm font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-amber-500/50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductPage = () => {
    if (!selectedProduct) return null;

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <button 
            onClick={() => setCurrentPage(products.forHer.includes(selectedProduct) ? 'forHer' : 'forHim')}
            className="mb-8 text-amber-600 hover:text-amber-700 flex items-center"
          >
            ← Back to Shop
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-9xl">🧴</div>
              </div>

              <div>
                <h1 className="font-serif text-3xl md:text-4xl mb-2">{selectedProduct.name}</h1>
                <p className="text-xl text-amber-600 mb-4">{selectedProduct.category}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedProduct.description}</p>
                
                <div className="bg-amber-50 p-4 rounded mb-6">
                  <h3 className="font-bold mb-2">Notes:</h3>
                  <p className="text-gray-700">{selectedProduct.notes}</p>
                </div>

                <h3 className="font-bold text-xl mb-4">Select Size:</h3>
                <div className="space-y-3">
                  {sizes.map(({ size, price }) => (
                    <button
                      key={size}
                      onClick={() => addToCart(selectedProduct, size, price)}
                      className="w-full flex justify-between items-center p-4 border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition"
                    >
                      <span className="font-medium">{size}</span>
                      <span className="text-lg font-bold text-amber-600">R{price}.00</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> These are premium quality inspired fragrances, carefully crafted to capture the essence of luxury designer scents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-12">Our Story</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-lg leading-relaxed mb-6">
            At <strong>Perpetual Linger</strong>, we believe that a fragrance is more than just a scent—it's a memory waiting to be created. Our tagline, <em>"They'll Never Forget,"</em> embodies our commitment to crafting fragrances that leave a lasting impression, long after you've left the room.
          </p>
          
          <p className="text-lg leading-relaxed mb-6">
            We have been composing the best quality perfumes, curating scents from the broadest palette, inspired by the best in the world. We take great pride in our method, knowledge, and passion for the art of layering notes as we design amplified perfume expressions that resonate with your individuality.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Every fragrance in our collection is a carefully crafted replica, inspired by iconic luxury scents. We bring you the essence of sophistication and elegance at a fraction of the cost, without compromising on quality or longevity.
          </p>

          <p className="text-lg leading-relaxed">
            Whether you're seeking the perfect signature scent or a gift that speaks volumes, Perpetual Linger offers an unforgettable olfactory journey. Because some moments—and some fragrances—are meant to linger forever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="font-bold text-xl mb-2">Artisan Crafted</h3>
            <p className="text-gray-600">Each fragrance carefully composed with expertise and passion</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-bold text-xl mb-2">Premium Quality</h3>
            <p className="text-gray-600">Long-lasting scents that rival luxury brands</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="font-bold text-xl mb-2">Affordable Luxury</h3>
            <p className="text-gray-600">Designer-inspired fragrances at accessible prices</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminLogin = () => (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gradient">Admin Login</h1>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Admin Password</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:border-amber-500 focus:outline-none"
              placeholder="Enter admin password"
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
          </div>
          <button
            onClick={handleAdminLogin}
            className="w-full luxury-gradient text-white py-3 font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );

  const AdminPanel = () => {
    const [newProduct, setNewProduct] = useState({
      name: '',
      category: '',
      notes: '',
      description: ''
    });
    const [selectedCategory, setSelectedCategory] = useState('forHer');
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddProduct = () => {
      if (newProduct.name && newProduct.category && newProduct.description) {
        addNewProduct(selectedCategory, newProduct);
        setNewProduct({ name: '', category: '', notes: '', description: '' });
        alert('Product added successfully!');
      } else {
        alert('Please fill in all required fields');
      }
    };

    const handleUpdateProduct = () => {
      if (editingProduct) {
        updateProduct(selectedCategory, editingProduct.id, newProduct);
        setEditingProduct(null);
        setNewProduct({ name: '', category: '', notes: '', description: '' });
        alert('Product updated successfully!');
      }
    };

    const startEditing = (product) => {
      setEditingProduct(product);
      setNewProduct({
        name: product.name,
        category: product.category,
        notes: product.notes,
        description: product.description
      });
    };

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gradient">Admin Panel</h1>
            <button
              onClick={() => { setIsAdmin(false); setCurrentPage('home'); }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Add/Edit Product Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:border-amber-500 focus:outline-none"
                  >
                    <option value="forHer">For Her</option>
                    <option value="forHim">For Him</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded focus:border-amber-500 focus:outline-none"
                    placeholder="e.g., Chanel Chance"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Category Type *</label>
                  <input
                    type="text"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded focus:border-amber-500 focus:outline-none"
                    placeholder="e.g., Classic & Timeless"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Notes</label>
                  <input
                    type="text"
                    value={newProduct.notes}
                    onChange={(e) => setNewProduct({...newProduct, notes: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded focus:border-amber-500 focus:outline-none"
                    placeholder="e.g., Pink Pepper, Jasmine, Amber Patchouli, Vanilla"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Description *</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded focus:border-amber-500 focus:outline-none h-24"
                    placeholder="Seductive description that captures the essence..."
                  />
                </div>

                <div className="flex space-x-4">
                  {editingProduct ? (
                    <>
                      <button
                        onClick={handleUpdateProduct}
                        className="flex-1 luxury-gradient text-white py-3 font-semibold hover:scale-105 transition-all duration-300"
                      >
                        Update Product
                      </button>
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setNewProduct({ name: '', category: '', notes: '', description: '' });
                        }}
                        className="flex-1 bg-gray-500 text-white py-3 font-semibold hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleAddProduct}
                      className="w-full luxury-gradient text-white py-3 font-semibold hover:scale-105 transition-all duration-300"
                    >
                      Add Product
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

              <div className="mb-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:border-amber-500 focus:outline-none"
                >
                  <option value="forHer">For Her ({productList.forHer.length} products)</option>
                  <option value="forHim">For Him ({productList.forHim.length} products)</option>
                </select>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {productList[selectedCategory].map(product => (
                  <div key={product.id} className="border rounded p-3 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-sm text-amber-600">{product.category}</p>
                      <p className="text-xs text-gray-600 mt-1">{product.description.substring(0, 100)}...</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => startEditing(product)}
                        className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this product?')) {
                            deleteProduct(selectedCategory, product.id);
                          }
                        }}
                        className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ContactPage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-12">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="text-amber-500 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">WhatsApp</h3>
                  <p className="text-gray-600">062 898 9645</p>
                  <a 
                    href="https://wa.me/27628989645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 text-sm"
                  >
                    Message us →
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="text-amber-500 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-gray-600">info@perpetuallinger.co.za</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="text-amber-500 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p className="text-gray-600">South Africa</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-amber-500 hover:text-amber-600"><Instagram size={32} /></a>
                <a href="#" className="text-amber-500 hover:text-amber-600"><Facebook size={32} /></a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send A Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded focus:border-amber-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-3 border border-gray-300 rounded focus:border-amber-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded focus:border-amber-500 focus:outline-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-amber-500 text-white py-3 font-semibold hover:bg-amber-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Business Hours</h2>
          <div className="text-center text-gray-600">
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Cart = () => (
    <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded">
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-12">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.size}</p>
                      <p className="text-amber-600 font-bold mt-1">R{item.price}.00</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-amber-600">R{getTotalPrice()}.00</span>
            </div>
            
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-green-600 text-white py-3 font-semibold hover:bg-green-700 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/50"
            >
              <Phone size={20} />
              <span>Order via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                // Peach Payments integration will go here
                alert('Peach Payments integration coming soon! For now, please use WhatsApp checkout.');
              }}
              className="w-full luxury-gradient text-white py-3 font-semibold hover:scale-105 transition-all duration-300 animate-glow shadow-lg hover:shadow-amber-500/50"
            >
              Pay Online with Peach Payments
            </button>
            
            <p className="text-xs text-gray-500 text-center">
              Secure payment processing available
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-serif text-lg">
                PL
              </div>
              <div>
                <div className="font-serif text-lg">Perpetual Linger</div>
                <div className="text-xs text-amber-400">They'll Never Forget</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Premium inspired fragrances that leave a lasting impression.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => setCurrentPage('forHer')} className="hover:text-amber-400">For Her</button></li>
              <li><button onClick={() => setCurrentPage('forHim')} className="hover:text-amber-400">For Him</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-amber-400">About Us</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-amber-400">Shipping Info</a></li>
              <li><a href="#" className="hover:text-amber-400">Returns</a></li>
              <li><a href="#" className="hover:text-amber-400">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <p className="text-gray-400 mb-2">WhatsApp: 062 898 9645</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-amber-400 hover:text-amber-300"><Instagram /></a>
              <a href="#" className="text-amber-400 hover:text-amber-300"><Facebook /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2024 Perpetual Linger. All rights reserved.</p>
          <p className="mt-2">Premium inspired fragrances • Crafted with passion in South Africa</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Cart />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'forHer' && <ProductGrid products={productList.forHer} title="For Her" />}
      {currentPage === 'forHim' && <ProductGrid products={productList.forHim} title="For Him" />}
      {currentPage === 'product' && <ProductPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'adminLogin' && <AdminLogin />}
      {currentPage === 'admin' && isAdmin && <AdminPanel />}
      
      <Footer />
    </div>
  );
};

export default App;