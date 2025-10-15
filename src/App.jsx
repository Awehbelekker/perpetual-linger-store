import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Phone, Mail, MapPin, Instagram, ChevronRight, ArrowLeft, Home } from 'lucide-react';
import { ToastContainer } from './components/Toast';
import { ProductCardSkeleton } from './components/SkeletonLoader';

// Global Floating Particles - Always Visible, Never Fading
const GlobalFloatingParticles = () => {
  // Reduce particle count on mobile for better performance
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 30 : 60;

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4, // Larger particles (4-12px)
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.5 + 0.4, // 0.4-0.9 opacity - MUCH more visible
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-40">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'radial-gradient(circle, rgba(212, 175, 55, 1) 0%, rgba(212, 175, 55, 0.6) 40%, transparent 100%)',
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.4)',
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};

// Global Sparkles - Bright and Visible
const GlobalSparkles = () => {
  // Reduce sparkle count on mobile for better performance
  const isMobile = window.innerWidth < 768;
  const sparkleCount = isMobile ? 12 : 25;

  const sparkles = Array.from({ length: sparkleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
    size: Math.random() * 4 + 3,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-40">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full animate-sparkle-elegant"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: 'radial-gradient(circle, rgba(212, 175, 55, 1) 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)',
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.9)',
          }}
        />
      ))}
    </div>
  );
};

// Product data with reference images
const products = {
  forHer: [
    { id: 'bs-fantasy', name: 'Britney Spears Fantasy', category: 'Sweet & Fruity', notes: 'Kiwi, Cupcake, Jasmine, White Chocolate', description: 'A playful, irresistible scent that lingers in their memory long after you\'ve left the room.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1174.jpg' },
    { id: 'bulgari-omnia', name: 'Bulgari Omnia Green Crystal', category: 'Fresh & Floral', notes: 'Mandarin, Peony, Green Tea, Musk', description: 'Radiant freshness that captivates with every breath. They\'ll turn around twice.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.4525.jpg' },
    { id: 'ck-euphoria', name: 'Calvin Klein Euphoria', category: 'Oriental & Seductive', notes: 'Pomegranate, Black Orchid, Amber, Mahogany', description: 'Intoxicating allure. One spray and you become unforgettable.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1009.jpg' },
    { id: 'ch-212', name: 'Carolina Herrera 212 For Her', category: 'Modern & Elegant', notes: 'Bergamot, Gardenia, Musk, Sandalwood', description: 'Sophisticated confidence that announces your presence before you speak.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1137.jpg' },
    { id: 'chanel-chance', name: 'Chanel Chance', category: 'Classic & Timeless', notes: 'Pink Pepper, Jasmine, Amber Patchouli, Vanilla', description: 'The scent of possibility. Bold, unexpected, utterly magnetic.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.192.jpg' },
    { id: 'chanel-coco', name: 'Chanel Coco Mademoiselle', category: 'Elegant & Sensual', notes: 'Orange, Rose, Jasmine, Patchouli, Vanilla', description: 'Timeless elegance meets modern seduction. They\'ll never forget how you made them feel.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.186.jpg' },
    { id: 'dg-lightblue', name: 'Dolce & Gabbana Light Blue', category: 'Fresh & Citrus', notes: 'Sicilian Lemon, Apple, Jasmine, Cedarwood', description: 'Mediterranean sunshine bottled. Fresh, breezy, effortlessly captivating.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.74.jpg' },
    { id: 'dg-theone', name: 'Dolce & Gabbana The One', category: 'Sophisticated & Warm', notes: 'Bergamot, Peach, Madonna Lily, Vanilla, Amber', description: 'Warm, velvety seduction. The fragrance that makes moments linger.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1943.jpg' },
    { id: 'dkny-delicious', name: 'DKNY Delicious', category: 'Sweet & Playful', notes: 'Apple, Cucumber, Grapefruit, Magnolia, Amber', description: 'Crisp temptation that keeps them coming back for more.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1235.jpg' },
    { id: 'dkny-original', name: 'DKNY Original', category: 'Urban & Fresh', notes: 'Rose, Lily, Sandalwood, Vanilla', description: 'Modern femininity with an edge. Sophisticated yet approachable.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1234.jpg' },
    { id: 'davidoff-coolwater', name: 'Davidoff Cool Water', category: 'Aquatic & Fresh', notes: 'Lotus, Lily, Sandalwood, Musk', description: 'Refreshing waves of elegance. Cool confidence that never goes unnoticed.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1237.jpg' },
    { id: 'elie-saab', name: 'Elie Saab', category: 'Luxurious & Floral', notes: 'Orange Blossom, Jasmine, Patchouli, Rose Honey', description: 'Red carpet glamour in a bottle. Pure luxury that commands attention.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.16488.jpg' },
    { id: 'estee-pleasures', name: 'Estee Lauder Pleasures', category: 'Fresh & Floral', notes: 'White Lily, Peony, Rose, Jasmine', description: 'Garden-fresh sophistication. Joyful, radiant, utterly memorable.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1238.jpg' },
    { id: 'armani-acqua', name: 'Giorgio Armani Aqua di Gio', category: 'Aquatic & Fresh', notes: 'Marine Notes, Jasmine, Cedarwood', description: 'Ocean breeze elegance. Fresh, clean, eternally captivating.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.410.jpg' },
    { id: 'armani-si', name: 'Giorgio Armani Si', category: 'Chypre & Modern', notes: 'Blackcurrant, Rose, Patchouli, Vanilla', description: 'Say yes to leaving an impression. Powerful, feminine, unforgettable.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.16328.jpg' },
    { id: 'gucci-bamboo', name: 'Gucci Bamboo', category: 'Floral & Woody', notes: 'Bergamot, Orange Blossom, Cashmere Wood, Vanilla', description: 'Strength wrapped in femininity. They\'ll remember your confidence.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.26992.jpg' },
    { id: 'gucci-rush', name: 'Gucci Rush', category: 'Bold & Spicy', notes: 'Freesia, Damask Rose, Vanilla, Patchouli', description: 'Daring and seductive. Not for the faint of heart - or memory.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1240.jpg' },
    { id: 'issey-miyake', name: 'Issey Miyake', category: 'Aquatic & Floral', notes: 'Lotus, Lily, Precious Woods', description: 'Pure water poetry. Minimalist beauty that speaks volumes.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1395.jpg' },
    { id: 'jpg-classic', name: 'Jean Paul Gaultier Classic', category: 'Oriental & Floral', notes: 'Orange Blossom, Ginger, Rose, Vanilla', description: 'Provocative elegance. Unforgettable from the first encounter.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1241.jpg' },
    { id: 'lacoste-pink', name: 'La Coste Touch of Pink', category: 'Fruity & Floral', notes: 'Cardamom, Blood Orange, Jasmine, Musk', description: 'Playful sophistication. Sweet memories that linger.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1242.jpg' },
    { id: 'lancome-belle', name: 'Lancome La Vie Est Belle', category: 'Gourmand & Sweet', notes: 'Iris, Pear, Praline, Vanilla, Patchouli', description: 'Life is beautiful, and so is your scent trail. Pure happiness captured.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.16719.jpg' },
    { id: 'mj-daisy', name: 'Marc Jacobs Daisy', category: 'Fresh & Youthful', notes: 'Strawberry, Violet, Jasmine, Musk', description: 'Whimsical charm that never fades from memory. Fresh, fun, forever.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1243.jpg' },
    { id: 'narciso-her', name: 'Narciso Rodriguez For Her', category: 'Musky & Elegant', notes: 'Rose, Peach, Musk, Amber', description: 'Magnetic sensuality. Sophisticated allure they won\'t shake off.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1244.jpg' },
    { id: 'pr-ladymillion', name: 'Paco Rabanne Lady Million', category: 'Floral & Woody', notes: 'Neroli, Raspberry, Jasmine, Honey, Patchouli', description: 'Golden extravagance. Opulent, dazzling, utterly unforgettable.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.10638.jpg' },
    { id: 'pr-olympea', name: 'Paco Rabanne Olympea', category: 'Oriental & Aquatic', notes: 'Water Jasmine, Ginger, Salted Vanilla, Cashmere', description: 'Goddess-level presence. Powerful femininity that commands memory.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.27689.jpg' },
    { id: 'tm-alien', name: 'Thierry Mugler Alien', category: 'Woody & Amber', notes: 'Jasmine, Cashmeran Wood, Amber', description: 'Otherworldly mystique. Hauntingly beautiful, impossibly memorable.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1245.jpg' },
    { id: 'tm-angel', name: 'Thierry Mugler Angel', category: 'Gourmand & Oriental', notes: 'Bergamot, Honey, Caramel, Chocolate, Vanilla, Patchouli', description: 'Divine indulgence. Sweet, powerful, eternally seductive.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.199.jpg' },
    { id: 'vs-bombshell', name: "Victoria's Secret Bombshell", category: 'Fruity & Floral', notes: 'Purple Passion Fruit, Peony, Vanilla Orchid', description: 'Playful confidence that explodes in their memory. Bombshell indeed.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.14752.jpg' },
    { id: 'ysl-opium', name: 'Yves Saint Laurent Opium', category: 'Spicy & Oriental', notes: 'Mandarin, Carnation, Myrrh, Vanilla', description: 'Addictive luxury. One encounter and they\'re hooked forever.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1246.jpg' },
    { id: 'dior-poison', name: 'Dior Hypnotic Poison', category: 'Oriental & Vanilla', notes: 'Coconut, Plum, Almond, Vanilla, Musk', description: 'Hypnotic temptation. Forbidden, alluring, permanently etched in memory.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1247.jpg' },
    { id: 'billie-eilish', name: 'Billie Eilish', category: 'Warm & Amber', notes: 'Vanilla, Soft Spices, Cocoa, Tonka Bean', description: 'Bold individuality. Cozy seduction that stays with them long after.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.73209.jpg' },
    { id: 'ag-candy', name: 'Ariana Grande Candy', category: 'Sweet & Fruity', notes: 'Blackberry, Peach, Marshmallow, Vanilla', description: 'Sugar-coated confidence. Dangerously sweet and impossible to forget.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1248.jpg' },
    { id: 'ck-obsession', name: 'CK Obsession', category: 'Spicy & Oriental', notes: 'Mandarin, Vanilla, Amber, Musk', description: 'Obsessive allure. They won\'t be able to stop thinking about you.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1249.jpg' },
    { id: 'mk-wonderlust', name: 'Michael Kors Wonderlust', category: 'Floral & Woody', notes: 'Almond Milk, Dianthus, Sandalwood, Benzoin', description: 'Wanderlust in a bottle. Adventurous spirit that lingers in their thoughts.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.42677.jpg' },
    { id: 'ch-goodgirl', name: 'Carolina Herrera Good Girl', category: 'Oriental & Floral', notes: 'Almond, Coffee, Tuberose, Tonka Bean, Cacao', description: 'Good girl with a bad side. Dangerously memorable duality.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.36821.jpg' },
    { id: 'ch-goodgirlblush', name: 'Carolina Herrera Good Girl Blush', category: 'Fruity & Floral', notes: 'Lychee, Jasmine, Cacao, Dulce de Leche', description: 'Blush-worthy seduction. Sweet confidence that leaves them wanting more.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1250.jpg' },
    { id: 'armani-myway', name: 'Giorgio Armani My Way', category: 'Floral & Woody', notes: 'Bergamot, Orange Blossom, Tuberose, Vanilla, Cedarwood', description: 'Your journey, your signature. Bold femininity they\'ll never forget.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.62829.jpg' },
    { id: 'vanilla-tbs', name: 'Vanilla - The Body Shop', category: 'Gourmand & Sweet', notes: 'Warm Vanilla, Creamy Musk', description: 'Comfort meets seduction. Warm embrace that lingers forever.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1251.jpg' },
    { id: 'ck-everyone', name: 'Calvin Klein Everyone', category: 'Clean & Universal', notes: 'Orange, Lavender, Cedarwood, Musk', description: 'Inclusive elegance. Fresh, modern, universally unforgettable.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.54299.jpg' },
    { id: 'ag-cloud', name: 'Ariana Grande Cloud', category: 'Gourmand & Floral', notes: 'Lavender, Pear, Coconut, Praline, Vanilla', description: 'Dreamy indulgence. Fluffy sweetness that stays in their dreams.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.52832.jpg' }
  ],
  forHim: [
    { id: 'armani-acqua-m', name: 'Giorgio Armani Aqua di Gio', category: 'Aquatic & Fresh', notes: 'Marine Notes, Bergamot, Rosemary, Patchouli', description: 'Ocean masculinity. Fresh, confident, eternally memorable.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.410.jpg' },
    { id: 'azzaro-chrome', name: 'Azzaro Chrome', category: 'Citrus & Aquatic', notes: 'Lemon, Rosemary, Oakmoss, Musk', description: 'Refined freshness. Classic appeal that never fades from memory.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.47.jpg' },
    { id: 'ferrari-black', name: 'Ferrari Black', category: 'Woody & Aromatic', notes: 'Lime, Plum, Rose, Cedarwood, Vanilla', description: 'Speed and sophistication. Power that leaves a lasting impression.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1252.jpg' },
    { id: 'bulgari-original', name: 'Bvlgari Original', category: 'Oriental & Spicy', notes: 'Tea, Bergamot, Amber, Musk', description: 'Timeless masculinity. Luxurious confidence they won\'t forget.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1253.jpg' },
    { id: 'ch-vip', name: 'Carolina Herrera VIP For Men', category: 'Spicy & Woody', notes: 'Vodka, Ginger, Leather, Tonka Bean', description: 'Elite status in a bottle. Exclusive presence that lingers.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1254.jpg' },
    { id: 'bleu-chanel', name: 'Bleu de Chanel', category: 'Woody & Aromatic', notes: 'Grapefruit, Ginger, Sandalwood, Cedar', description: 'Modern sophistication. Timeless appeal that stays with them forever.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.9099.jpg' },
    { id: 'davidoff-coolwater-m', name: 'Davidoff Cool Water', category: 'Aquatic & Fresh', notes: 'Mint, Lavender, Sandalwood, Musk', description: 'Cool confidence. Refreshing presence that never leaves their mind.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.507.jpg' },
    { id: 'db-instinct', name: 'David Beckham Instinct', category: 'Citrus & Woody', notes: 'Orange, Cardamom, Patchouli, Vetiver', description: 'Athletic elegance. Magnetic appeal that sticks.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1255.jpg' },
    { id: 'dior-sauvage', name: 'Dior Sauvage', category: 'Fresh & Spicy', notes: 'Bergamot, Pepper, Ambroxan, Vanilla', description: 'Wild sophistication. Untamed allure they\'ll never shake off.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.31861.jpg' },
    { id: 'dunhill-desire', name: 'Dunhill Desire', category: 'Woody & Oriental', notes: 'Bergamot, Apple, Rose, Vanilla, Musk', description: 'Refined desire. Smooth seduction that lingers long after.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1256.jpg' },
    { id: 'dg-theone-m', name: 'Dolce & Gabbana The One', category: 'Oriental & Spicy', notes: 'Grapefruit, Coriander, Cardamom, Amber, Tobacco', description: 'Italian confidence. Warm charisma that leaves a permanent mark.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1257.jpg' },
    { id: 'dg-lightblue-m', name: 'Dolce & Gabbana Light Blue', category: 'Citrus & Woody', notes: 'Mandarin, Frozen Grapefruit, Rosewood, Musk', description: 'Mediterranean cool. Effortless charm that stays in their memory.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1258.jpg' },
    { id: 'hermes-terre', name: "Hermes Terre d'Hermes", category: 'Woody & Spicy', notes: 'Orange, Pepper, Flint, Vetiver, Benzoin', description: 'Earthy sophistication. Grounded masculinity that resonates forever.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1259.jpg' },
    { id: 'hugo-original', name: 'Hugo Boss Original', category: 'Aromatic & Woody', notes: 'Apple, Plum, Geranium, Cedar, Sandalwood', description: 'Classic power. Authoritative presence that never fades.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.343.jpg' },
    { id: 'issey-miyake-m', name: 'Issey Miyake', category: 'Aquatic & Woody', notes: 'Yuzu, Bergamot, Lemon, Sandalwood, Musk', description: 'Zen masculinity. Pure, clean presence that stays with them.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1260.jpg' },
    { id: 'jpg-lemale', name: 'Jean Paul Gaultier Le Male', category: 'Oriental & Fougere', notes: 'Mint, Lavender, Vanilla, Tonka Bean', description: 'Seductive masculinity. Iconic presence that haunts their memory.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.3.jpg' },
    { id: 'joop', name: 'Joop', category: 'Oriental & Spicy', notes: 'Mandarin, Heliotrope, Cinnamon, Tonka Bean, Vanilla', description: 'Bold seduction. Provocative charm that never leaves.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1261.jpg' },
    { id: 'lacoste-bleau', name: 'Lacoste Le Eau Bleau', category: 'Aromatic & Woody', notes: 'Wormwood, Lavender, Sandalwood, Oakmoss', description: 'Sporty elegance. Fresh confidence that lingers.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1262.jpg' },
    { id: 'pr-invictus', name: 'Paco Rabanne Invictus', category: 'Fresh & Woody', notes: 'Grapefruit, Sea Notes, Bay Leaf, Guaiac Wood, Ambergris', description: 'Victory scent. Champion presence that stays undefeated in memory.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.14836.jpg' },
    { id: 'pr-onemillion', name: 'Paco Rabanne One Million', category: 'Spicy & Leather', notes: 'Grapefruit, Mint, Blood Mandarin, Rose, Cinnamon, Leather, Amber', description: 'Golden magnetism. Million-dollar appeal that never depreciates.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.3747.jpg' },
    { id: 'versace-eros', name: 'Versace Eros', category: 'Fresh & Oriental', notes: 'Mint, Lemon, Apple, Tonka Bean, Vanilla, Oakmoss', description: 'God-like allure. Passionate presence that echoes eternally.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.16657.jpg' },
    { id: 'gucci-guilty', name: 'Gucci Guilty', category: 'Aromatic & Woody', notes: 'Lemon, Lavender, Orange Blossom, Patchouli', description: 'Guilty pleasure. Seductive confidence they\'ll confess they remember.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.8634.jpg' },
    { id: 'lacoste-green', name: 'Lacoste Green', category: 'Fresh & Aromatic', notes: 'Mint, Basil, Vetiver, Oakmoss', description: 'Timeless sport. Fresh masculinity that never goes out of style.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1263.jpg' },
    { id: 'diesel-fuel', name: 'Diesel Fuel For Life', category: 'Woody & Fresh', notes: 'Grapefruit, Raspberry, Anise, Lavender', description: 'Urban energy. Dynamic presence that fuels their thoughts.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1264.jpg' },
    { id: 'diesel-red', name: 'Diesel Red', category: 'Spicy & Woody', notes: 'Mandarin, Ginger, Lavender, Vanilla, Tobacco', description: 'Fiery passion. Bold masculinity that burns in their memory.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1265.jpg' },
    { id: 'cr7', name: 'Cristiano Ronaldo CR7', category: 'Aromatic & Woody', notes: 'Bergamot, Cardamom, Lavender, Tobacco, Sandalwood', description: 'Champion essence. Winning presence that stays on the podium.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1266.jpg' },
    { id: 'burberry', name: 'Mr Burberry', category: 'Woody & Herbal', notes: 'Grapefruit, Tarragon, Birch Leaf, Vetiver, Guaiac Wood', description: 'British refinement. Classic sophistication that endures.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.39878.jpg' },
    { id: 'montblanc-legend', name: 'Mont Blanc Legend', category: 'Aromatic & Woody', notes: 'Bergamot, Lavender, Pineapple, Oakmoss, Sandalwood', description: 'Legendary status. Timeless appeal that creates myths.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.11320.jpg' },
    { id: 'hugo-bottled', name: 'Hugo Boss Bottled', category: 'Woody & Spicy', notes: 'Apple, Plum, Cinnamon, Sandalwood, Vanilla', description: 'Bottled confidence. Smooth masculinity they\'ll never forget.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.2435.jpg' },
    { id: 'ck-everyone-m', name: 'Calvin Klein Everyone', category: 'Clean & Universal', notes: 'Orange, Lavender, Cedarwood, Musk', description: 'Universal appeal. Modern masculinity that connects.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.54299.jpg' },
    { id: 'tm-alien-m', name: 'Thierry Mugler Alien', category: 'Woody & Amber', notes: 'Dill, Cumin, White Amber, Leather', description: 'Otherworldly power. Mysterious presence that haunts.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1267.jpg' },
    { id: 'tommy-boy', name: 'Tommy Hilfiger Tommy Boy', category: 'Citrus & Woody', notes: 'Bergamot, Lavender, Mint, Cactus Flower, Cotton', description: 'All-American charm. Fresh appeal that stays classic.', referenceImage: 'https://fimgs.net/mdimg/perfume/375x500.1268.jpg' }
  ]
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast helper functions
  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Admin keyboard shortcut: Ctrl+Shift+A
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        if (!isAdmin) {
          setCurrentPage('adminLogin');
        } else {
          setCurrentPage('admin');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAdmin]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const [adminPassword, setAdminPassword] = useState('');
  const [productList, setProductList] = useState(products);

  // Most Popular Products
  const mostPopular = [
    products.forHer.find(p => p.id === 'chanel-coco'),
    products.forHer.find(p => p.id === 'dior-poison'),
    products.forHim.find(p => p.id === 'dior-sauvage'),
    products.forHim.find(p => p.id === 'bleu-chanel'),
    products.forHer.find(p => p.id === 'lancome-belle'),
    products.forHim.find(p => p.id === 'pr-invictus'),
  ].filter(Boolean);

  // Add custom CSS animations and premium fonts
  useEffect(() => {
    // Add Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        25% { transform: translateY(-15px) translateX(10px); }
        50% { transform: translateY(-8px) translateX(-8px); }
        75% { transform: translateY(-12px) translateX(5px); }
      }

      @keyframes sparkle-elegant {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
      }

      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }

      @keyframes glow-subtle {
        0%, 100% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.3), 0 0 30px rgba(212, 175, 55, 0.1); }
        50% { box-shadow: 0 0 25px rgba(212, 175, 55, 0.5), 0 0 50px rgba(212, 175, 55, 0.2); }
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .animate-float {
        animation: float linear infinite;
      }

      .animate-sparkle-elegant {
        animation: sparkle-elegant ease-in-out infinite;
      }

      .animate-shimmer {
        background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
        background-size: 200% 100%;
        animation: shimmer 3s infinite;
      }

      .animate-glow {
        animation: glow-subtle 3s ease-in-out infinite;
      }

      .animate-fadeIn {
        animation: fadeIn 0.8s ease-out forwards;
      }

      .glass-morphism {
        background: rgba(26, 26, 26, 0.6);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(212, 175, 55, 0.2);
      }

      .luxury-gradient {
        background: linear-gradient(135deg, #D4AF37 0%, #C9B037 50%, #B8960C 100%);
      }

      .luxury-gradient-rose {
        background: linear-gradient(135deg, #D4AF37 0%, #B76E79 50%, #8B6F47 100%);
      }

      .text-gradient {
        background: linear-gradient(135deg, #D4AF37 0%, #F4E4C1 50%, #D4AF37 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .font-serif {
        font-family: 'Playfair Display', serif;
        letter-spacing: 0.02em;
      }

      .font-sans {
        font-family: 'Montserrat', sans-serif;
      }

      .luxury-shadow {
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(212, 175, 55, 0.1);
      }

      .luxury-shadow-hover {
        box-shadow: 0 15px 60px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(212, 175, 55, 0.2);
      }

      .card-glow {
        position: relative;
        overflow: hidden;
      }

      .card-glow::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.1), transparent);
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: -1;
      }

      .card-glow:hover::before {
        opacity: 1;
      }

      .texture-overlay {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(fontLink);
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
      addToast(`Updated ${product.name} quantity in cart`, 'success');
    } else {
      setCart([...cart, cartItem]);
      addToast(`Added ${product.name} to cart!`, 'success');
    }
    setCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    setCart(cart.filter(item => item.id !== itemId));
    if (item) {
      addToast(`Removed ${item.name} from cart`, 'info');
    }
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
    if (cart.length === 0) {
      addToast('Your cart is empty!', 'error');
      return;
    }

    try {
      const message = `Hi! I'd like to order:\n\n${cart.map(item =>
        `${item.name} - ${item.size} (${item.quantity}x R${item.price})`
      ).join('\n')}\n\nTotal: R${getTotalPrice()}.00`;

      window.open(`https://wa.me/27610100845?text=${encodeURIComponent(message)}`, '_blank');
      addToast('Opening WhatsApp...', 'success');
    } catch (error) {
      addToast('Failed to open WhatsApp. Please try again.', 'error');
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === 'perpetual2024') {
      setIsAdmin(true);
      setCurrentPage('admin');
      setAdminPassword('');
      addToast('Welcome to Admin Portal!', 'success');
    } else {
      addToast('Incorrect password. Please try again.', 'error');
      setAdminPassword('');
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

  const Navigation = () => {
    const getBackButton = () => {
      if (currentPage === 'product') {
        return (
          <button
            onClick={() => setCurrentPage(products.forHer.includes(selectedProduct) ? 'forHer' : 'forHim')}
            className="flex items-center space-x-2 text-gold-light hover:text-gold transition-all duration-300 font-sans"
          >
            <ArrowLeft size={20} />
            <span>Back to Shop</span>
          </button>
        );
      }
      if (currentPage !== 'home') {
        return (
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 text-gold-light hover:text-gold transition-all duration-300 font-sans"
          >
            <Home size={20} />
            <span>Home</span>
          </button>
        );
      }
      return null;
    };

    return (
      <nav className="bg-black text-white sticky top-0 z-50 luxury-shadow relative overflow-hidden border-b-2" style={{ borderColor: '#D4AF37' }}>
        <div className="absolute inset-0 texture-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <div
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={() => setCurrentPage('home')}
              >
                <img
                  src="/FinalLogo.png"
                  alt="Perpetual Linger Logo"
                  className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(73%) sepia(47%) saturate(434%) hue-rotate(359deg) brightness(92%) contrast(87%)'
                  }}
                />
                <div>
                  <div className="font-serif text-2xl text-gradient font-bold tracking-wide group-hover:scale-105 transition-transform duration-300">Perpetual Linger</div>
                  <div className="text-xs font-sans" style={{ color: '#D4AF37' }}>They'll Never Forget</div>
                </div>
              </div>

              {/* Back Navigation */}
              <div className="hidden md:block ml-8">
                {getBackButton()}
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 font-sans">
              <button onClick={() => setCurrentPage('home')} className="hover:text-gold transition-all duration-300 font-medium" style={{ color: currentPage === 'home' ? '#D4AF37' : 'white' }}>Home</button>
              <button onClick={() => setCurrentPage('forHer')} className="hover:text-gold transition-all duration-300 font-medium" style={{ color: currentPage === 'forHer' ? '#D4AF37' : 'white' }}>For Her</button>
              <button onClick={() => setCurrentPage('forHim')} className="hover:text-gold transition-all duration-300 font-medium" style={{ color: currentPage === 'forHim' ? '#D4AF37' : 'white' }}>For Him</button>
              <button onClick={() => setCurrentPage('about')} className="hover:text-gold transition-all duration-300 font-medium" style={{ color: currentPage === 'about' ? '#D4AF37' : 'white' }}>About</button>
              <button onClick={() => setCurrentPage('contact')} className="hover:text-gold transition-all duration-300 font-medium" style={{ color: currentPage === 'contact' ? '#D4AF37' : 'white' }}>Contact</button>
              {isAdmin && (
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="hover:text-gold transition-all duration-300 font-medium px-3 py-1 rounded-lg glass-morphism"
                  style={{ color: currentPage === 'admin' ? '#D4AF37' : 'white', borderColor: '#D4AF37', borderWidth: '1px' }}
                  title="Admin Dashboard"
                >
                  Admin Panel
                </button>
              )}
              {!isAdmin && (
                <button
                  onClick={() => setCurrentPage('adminLogin')}
                  className="hover:text-gold transition-all duration-300 text-xs font-medium opacity-50 hover:opacity-100"
                  title="Admin Login (Ctrl+Shift+A)"
                >
                  🔒
                </button>
              )}
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 hover:text-gold transition-all duration-300"
                style={{ color: cartOpen ? '#D4AF37' : 'white' }}
              >
                <ShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 luxury-gradient text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-glow">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {getBackButton()}
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2"
              >
                <ShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 luxury-gradient text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
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
            <div className="md:hidden pb-4 font-sans">
              <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-gold transition-all duration-300">Home</button>
              <button onClick={() => { setCurrentPage('forHer'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-gold transition-all duration-300">For Her</button>
              <button onClick={() => { setCurrentPage('forHim'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-gold transition-all duration-300">For Him</button>
              <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-gold transition-all duration-300">About</button>
              <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-gold transition-all duration-300">Contact</button>
            </div>
          )}
        </div>
      </nav>
    );
  };

  const HomePage = () => (
    <div className="bg-black">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-30"></div>

        {/* Elegant Background Glow */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)' }}></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(183, 110, 121, 0.2) 0%, transparent 70%)' }}></div>
        </div>

        <div className="relative text-center text-white px-4 z-10 animate-fadeIn">
          <div className="flex justify-center mb-8">
            <img
              src="/FinalLogo.png"
              alt="Perpetual Linger Logo"
              className="h-48 md:h-64 w-auto"
              style={{
                filter: 'brightness(0) saturate(100%) invert(73%) sepia(47%) saturate(434%) hue-rotate(359deg) brightness(92%) contrast(87%) drop-shadow(0 0 30px rgba(212, 175, 55, 0.6))'
              }}
            />
          </div>
          <h1 className="font-serif text-6xl md:text-8xl mb-6 font-bold tracking-wide" style={{ color: '#D4AF37' }}>Perpetual Linger</h1>
          <p className="text-2xl md:text-3xl mb-8 italic font-serif" style={{ color: '#D4AF37' }}>They'll Never Forget</p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90 font-sans font-light leading-relaxed">
            Luxury inspired fragrances crafted with passion. Leaving a lasting impression that echoes long after you're gone.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => setCurrentPage('forHer')}
              className="luxury-gradient text-black px-10 py-4 text-lg font-sans font-semibold hover:scale-105 transition-all duration-400 flex items-center justify-center luxury-shadow-hover rounded-lg"
            >
              Shop For Her <ChevronRight className="ml-2" />
            </button>
            <button
              onClick={() => setCurrentPage('forHim')}
              className="glass-morphism px-10 py-4 text-lg font-sans font-semibold hover:scale-105 transition-all duration-400 flex items-center justify-center luxury-shadow-hover rounded-lg"
              style={{
                border: '2px solid #D4AF37',
                color: '#D4AF37'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #D4AF37 0%, #C9B037 50%, #B8960C 100%)';
                e.target.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(26, 26, 26, 0.6)';
                e.target.style.color = '#D4AF37';
              }}
            >
              Shop For Him <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Most Popular Fragrances */}
      <div className="py-20 bg-gradient-to-b from-black to-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-4 text-gradient font-bold tracking-wide">Most Popular</h2>
          <p className="text-center mb-12 font-sans" style={{ color: '#D4AF37' }}>Our customers' favorite fragrances</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mostPopular.map(product => (
              <div
                key={product.id}
                onClick={() => { setSelectedProduct(product); setCurrentPage('product'); }}
                className="glass-morphism rounded-xl p-4 cursor-pointer hover:scale-105 transition-all duration-400 card-glow luxury-shadow hover:luxury-shadow-hover"
              >
                <div className="h-24 flex items-center justify-center mb-3 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(244, 228, 193, 0.3) 100%)' }}>
                  <div className="text-4xl">🧴</div>
                </div>
                <h3 className="font-serif font-bold text-sm mb-1 text-white text-center">{product.name}</h3>
                <p className="text-xs text-center font-sans" style={{ color: '#D4AF37' }}>{product.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us - Glass Effect */}
      <div className="py-20 bg-gradient-to-b from-neutral-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-12 text-gradient font-bold tracking-wide">Why Choose Us</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 glass-morphism rounded-xl luxury-shadow hover:luxury-shadow-hover transition-all duration-400 card-glow">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full luxury-gradient flex items-center justify-center text-black text-3xl font-bold animate-glow luxury-shadow-hover">
                ✓
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-white">Premium Quality</h3>
              <p className="font-sans" style={{ color: '#D4AF37' }}>Expertly composed fragrances inspired by the world's finest scents</p>
            </div>
            <div className="text-center p-8 glass-morphism rounded-xl luxury-shadow hover:luxury-shadow-hover transition-all duration-400 card-glow">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full luxury-gradient flex items-center justify-center text-black text-3xl animate-glow luxury-shadow-hover">
                🚚
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-white">Fast Delivery</h3>
              <p className="font-sans" style={{ color: '#D4AF37' }}>Quick shipping across South Africa</p>
            </div>
            <div className="text-center p-8 glass-morphism rounded-xl luxury-shadow hover:luxury-shadow-hover transition-all duration-400 card-glow">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full luxury-gradient flex items-center justify-center text-black text-3xl animate-glow luxury-shadow-hover">
                💳
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-white">Easy Payment</h3>
              <p className="font-sans" style={{ color: '#D4AF37' }}>Secure online payment or order via WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductGrid = ({ products, title }) => (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-16 relative overflow-hidden">
      <div className="absolute inset-0 texture-overlay opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-12 text-gradient font-bold tracking-wide">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="glass-morphism rounded-xl luxury-shadow overflow-hidden hover:luxury-shadow-hover transition-all duration-400 cursor-pointer transform hover:-translate-y-2 hover:scale-105 group relative card-glow"
              onClick={() => { setSelectedProduct(product); setCurrentPage('product'); }}
            >
              <div className="h-48 flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(244, 228, 193, 0.25) 100%)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(244, 228, 193, 0.4) 100%)' }}></div>
                <div className="text-6xl group-hover:scale-110 transition-transform duration-400 relative z-10">🧴</div>
              </div>
              <div className="p-5 relative">
                <h3 className="font-serif font-bold text-lg mb-1 transition-colors duration-300 text-white">{product.name}</h3>
                <p className="text-sm mb-2 font-sans font-medium" style={{ color: '#D4AF37' }}>{product.category}</p>
                <p className="text-sm line-clamp-2 font-sans" style={{ color: '#D4AF37', opacity: 0.8 }}>{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gradient font-serif">From R40</span>
                  <button className="luxury-gradient text-black px-4 py-2 text-sm font-sans font-semibold hover:scale-105 transition-all duration-300 luxury-shadow rounded-lg">
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
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-12 relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Navigation is now in the header, no need for duplicate back button */}

          <div className="glass-morphism rounded-xl luxury-shadow overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="rounded-xl h-96 flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(244, 228, 193, 0.3) 100%)' }}>
                <div className="text-9xl">🧴</div>
              </div>

              <div>
                <h1 className="font-serif text-3xl md:text-4xl mb-2 font-bold text-white">{selectedProduct.name}</h1>
                <p className="text-xl mb-4 font-sans font-medium" style={{ color: '#D4AF37' }}>{selectedProduct.category}</p>
                <p className="mb-6 leading-relaxed font-sans" style={{ color: '#D4AF37', opacity: 0.9 }}>{selectedProduct.description}</p>

                <div className="p-4 rounded-lg mb-6 glass-morphism" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                  <h3 className="font-serif font-bold mb-2 text-white">Notes:</h3>
                  <p className="font-sans" style={{ color: '#D4AF37' }}>{selectedProduct.notes}</p>
                </div>

                <h3 className="font-serif font-bold text-xl mb-4 text-white">Select Size:</h3>
                <div className="space-y-3">
                  {sizes.map(({ size, price }) => (
                    <button
                      key={size}
                      onClick={() => addToCart(selectedProduct, size, price)}
                      className="w-full flex justify-between items-center p-4 border-2 rounded-xl transition-all duration-400 hover:scale-105 luxury-shadow hover:luxury-shadow-hover font-sans glass-morphism"
                      style={{
                        borderColor: '#D4AF37',
                        background: 'rgba(26, 26, 26, 0.4)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(244, 228, 193, 0.3) 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(26, 26, 26, 0.4)';
                      }}
                    >
                      <span className="font-medium text-white">{size}</span>
                      <span className="text-lg font-bold" style={{ color: '#D4AF37' }}>R{price}.00</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg glass-morphism" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                  <p className="text-sm font-sans" style={{ color: '#D4AF37' }}>
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
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-16 relative overflow-hidden">
      <div className="absolute inset-0 texture-overlay opacity-20"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-12 text-gradient font-bold tracking-wide">Our Story</h1>

        <div className="glass-morphism rounded-xl luxury-shadow p-8 mb-8">
          <p className="text-lg leading-relaxed mb-6 font-sans text-white">
            At <strong style={{ color: '#D4AF37' }}>Perpetual Linger</strong>, we believe that a fragrance is more than just a scent—it's a memory waiting to be created. Our tagline, <em style={{ color: '#D4AF37' }}>"They'll Never Forget,"</em> embodies our commitment to crafting fragrances that leave a lasting impression, long after you've left the room.
          </p>

          <p className="text-lg leading-relaxed mb-6 font-sans text-white">
            We have been composing the best quality perfumes, curating scents from the broadest palette, inspired by the best in the world. We take great pride in our method, knowledge, and passion for the art of layering notes as we design amplified perfume expressions that resonate with your individuality.
          </p>

          <p className="text-lg leading-relaxed mb-6 font-sans text-white">
            Every fragrance in our collection is a carefully crafted replica, inspired by iconic luxury scents. We bring you the essence of sophistication and elegance at a fraction of the cost, without compromising on quality or longevity.
          </p>

          <p className="text-lg leading-relaxed font-sans text-white">
            Whether you're seeking the perfect signature scent or a gift that speaks volumes, Perpetual Linger offers an unforgettable olfactory journey. Because some moments—and some fragrances—are meant to linger forever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-morphism rounded-xl luxury-shadow p-8 text-center hover:luxury-shadow-hover transition-all duration-400 card-glow">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="font-serif font-bold text-xl mb-3 text-white">Artisan Crafted</h3>
            <p className="font-sans" style={{ color: '#D4AF37' }}>Each fragrance carefully composed with expertise and passion</p>
          </div>
          <div className="glass-morphism rounded-xl luxury-shadow p-8 text-center hover:luxury-shadow-hover transition-all duration-400 card-glow">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="font-serif font-bold text-xl mb-3 text-white">Premium Quality</h3>
            <p className="font-sans" style={{ color: '#D4AF37' }}>Long-lasting scents that rival luxury brands</p>
          </div>
          <div className="glass-morphism rounded-xl luxury-shadow p-8 text-center hover:luxury-shadow-hover transition-all duration-400 card-glow">
            <div className="text-5xl mb-4">💎</div>
            <h3 className="font-serif font-bold text-xl mb-3 text-white">Affordable Luxury</h3>
            <p className="font-sans" style={{ color: '#D4AF37' }}>Designer-inspired fragrances at accessible prices</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminLogin = () => (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-12 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 texture-overlay opacity-20"></div>
      <div className="glass-morphism rounded-xl luxury-shadow p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <div className="inline-block p-4 rounded-full luxury-gradient mb-4">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gradient">Admin Access</h1>
          <p className="text-sm font-sans mt-2" style={{ color: '#D4AF37' }}>
            Manage products, orders & settings
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-sans font-medium mb-2 text-white">Password</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans glass-morphism text-white"
              style={{ borderColor: '#D4AF37' }}
              placeholder="Enter admin password"
              onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
              autoFocus
            />
          </div>
          <button
            onClick={handleAdminLogin}
            className="w-full luxury-gradient text-black py-3 font-sans font-semibold hover:scale-105 transition-all duration-300 luxury-shadow-hover rounded-lg"
          >
            Access Dashboard
          </button>

          <div className="text-center pt-4 border-t border-gold/20">
            <p className="text-xs font-sans text-gray-400">
              💡 Quick Access: <span className="text-gold font-mono">Ctrl + Shift + A</span>
            </p>
          </div>
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
        addToast('Product added successfully!', 'success');
      } else {
        addToast('Please fill in all required fields', 'error');
      }
    };

    const handleUpdateProduct = () => {
      if (editingProduct) {
        updateProduct(selectedCategory, editingProduct.id, newProduct);
        setEditingProduct(null);
        setNewProduct({ name: '', category: '', notes: '', description: '' });
        addToast('Product updated successfully!', 'success');
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

  // Policy Pages
  const PerfumeUsagePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-16 relative overflow-hidden">
      <div className="absolute inset-0 texture-overlay opacity-20"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-12 text-gradient font-bold tracking-wide">Perfume Usage & Instructions</h1>

        <div className="glass-morphism rounded-xl luxury-shadow p-8 mb-8 space-y-6 text-white font-sans">
          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>APPLICATION</h2>
            <p className="mb-4 leading-relaxed">
              Increase/decrease the number of perfume sprays to adjust the intensity and longevity of the fragrance.
              <strong className="text-amber-400"> 4-6 sprays</strong> are recommended as an initial application.
              <strong className="text-amber-400"> 1-2 sprays</strong> to top up if needed.
            </p>

            <h3 className="text-xl font-serif font-bold mb-3 text-amber-400">For best longevity, apply as follows:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Hold the spray pump approximately <strong>3cm from the skin's surface</strong> (the closer, the better)</li>
              <li>Spray the perfume in a single, concentrated spot about the size of a large coin onto the upper outside part of the forearm, where the skin is thicker and perfume binds best</li>
              <li>Avoid spraying perfume into the air unnecessarily—always aim carefully for your target area</li>
            </ul>

            <p className="mt-4 font-bold text-amber-400">AVOID RUBBING</p>
            <p className="text-gray-300">
              Rubbing more than doubles the surface area of evaporation, which in turn more than halves the perfume's longevity.
            </p>

            <div className="mt-4 p-4 bg-black/40 rounded-lg border border-amber-400/30">
              <h4 className="font-bold text-amber-400 mb-2">Pro Tips:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Spraying on the inner, hidden surfaces of garments and your hair are excellent ways to enhance your perfume's longevity</li>
                <li>This also decreases risks of allergic reactions</li>
                <li>Inert objects retain the perfume's olfactive properties best</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>MAINTENANCE</h2>
            <p className="text-gray-300">
              <strong>To resolve blocked spray pumps:</strong> Remove the nozzle portion and rinse with warm water
              (not all perfume ingredients evaporate fully and can form a soluble residue over time)
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>STORAGE</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Store perfume <strong>upright</strong> to prevent any leaking</li>
              <li>Keep in a <strong>cool, dark place</strong> (light, oxygen, and heat will oxidize/damage your perfume over time)</li>
              <li>Always wipe any perfume residue from your bottle or any other surface after use with a damp cloth/tissue</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>INGREDIENTS</h2>
            <p className="text-gray-300">
              Premium Parfum Essence | Ethanol (denat.) | Isopropyl Myristate | Aqua | Propylene Glycol | BHT | TBHQ
            </p>
            <p className="text-sm text-gray-400 mt-2 italic">
              *Perpetual Linger reserves the right to alter perfume formulations to improve olfactive characteristics
              or to comply with industry best practices and relevant legislation.
            </p>
          </section>

          <section className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <h2 className="text-2xl font-serif font-bold mb-4 text-red-400">⚠️ WARNING</h2>
            <p className="font-bold text-red-300 mb-3">Flammable contents</p>

            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li className="font-bold text-red-300">DO NOT LEAVE A FULL PERFUME BOTTLE IN A CAR IN THE HOT SUN – it will burst</li>
              <li>Use of the product is at your own risk</li>
              <li>If sprayed into eyes, wash with running water immediately</li>
              <li>Do not ingest perfume</li>
              <li>Allergic reactions or skin irritations are possible but rare. Should this occur, discontinue use and wash the skin with soap and water</li>
              <li>Avoid the neck or torso where skin is more sensitive. Rather spray onto outer forearms where skin is tougher</li>
              <li>Alternate where you apply your perfume to avoid skin irritations over time</li>
              <li>Be careful not to spray directly onto outer garments—its solvent properties may cause temporary stains</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>DISCLAIMER</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Terms & Conditions may apply. Information is provided without prejudice to Perpetual Linger's rights.
              Perpetual Linger's perfume expressions have no relation to other products. All publicly available references
              are for indicative purposes only. Perpetual Linger expertly interprets and enhances sought-after olfactive
              characteristics for your delight, presented in its own distinctive branded packaging.
            </p>
          </section>
        </div>
      </div>
    </div>
  );

  const RefundPolicyPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-16 relative overflow-hidden">
      <div className="absolute inset-0 texture-overlay opacity-20"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-12 text-gradient font-bold tracking-wide">Refund & Return Policy</h1>

        <div className="glass-morphism rounded-xl luxury-shadow p-8 mb-8 space-y-6 text-white font-sans">
          <section className="bg-amber-900/20 border border-amber-400/50 rounded-lg p-6">
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>UNCONDITIONAL MONEY BACK GUARANTEE</h2>
            <p className="text-gray-200 leading-relaxed">
              Our premium fragrance formulations are long-lasting and of guaranteed quality—<strong className="text-amber-400">or your money back</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>WARRANTY</h2>
            <p className="mb-4 text-gray-300">
              If you are unsatisfied with your Perpetual Linger perfume and require a <strong className="text-amber-400">refund or exchange of equal value</strong>, please:
            </p>

            <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-300 mb-6">
              <li>Complete the warranty information (inside your perfume box)</li>
              <li>Attach your proof of purchase</li>
              <li>Return the item(s) within <strong className="text-amber-400">30 days of purchase</strong></li>
            </ol>

            <div className="bg-black/40 rounded-lg p-4 border border-amber-400/30">
              <h3 className="font-bold text-amber-400 mb-3">Contact us:</h3>
              <ul className="space-y-2 text-gray-300">
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/27610100845" className="text-amber-400 hover:underline">061 010 0845</a></li>
                <li><strong>Email:</strong> <span className="text-amber-400">perpetuallinger@gmail.com</span></li>
                <li><strong>Website:</strong> <span className="text-amber-400">www.perpetuallinger.co.za</span></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>REFUND PROCESS</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Cash or debit card sales will be refunded by <strong>EFT within a couple of days</strong> once verified</li>
              <li>Online purchases will be refunded to the original payment method</li>
              <li>Refunded sales will cancel any loyalty points earned (if applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>QUESTIONS?</h2>
            <p className="text-gray-300">
              Click on the chat icon on our website and talk to us, or reach out via WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>TERMS & CONDITIONS</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Products must be returned within 30 days of purchase</li>
              <li>Proof of purchase is required</li>
              <li>Products must be in original condition with unused portion</li>
              <li>Terms and Conditions apply and information is provided without prejudice to Perpetual Linger's rights</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );

  const TermsNoticePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-16 relative overflow-hidden">
      <div className="absolute inset-0 texture-overlay opacity-20"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-12 text-gradient font-bold tracking-wide">Terms & Notice</h1>

        <div className="glass-morphism rounded-xl luxury-shadow p-8 mb-8 space-y-6 text-white font-sans">
          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>SITE TERMS | NOTICE</h2>
            <p className="text-gray-300">
              All promotional offers mentioned on the <strong>ONLINE SHOP</strong> are subject to availability and may be
              withdrawn or amended at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>PRODUCT INFORMATION</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>All product descriptions, images, and prices are subject to change without notice</li>
              <li>We strive to display colors and product details as accurately as possible, but actual products may vary slightly</li>
              <li>Perpetual Linger reserves the right to alter perfume formulations to improve quality or comply with regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>PRICING</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>All prices are in South African Rand (ZAR)</li>
              <li>Prices include VAT where applicable</li>
              <li>Delivery fees are additional and will be calculated at checkout</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>DELIVERY</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Delivery times are estimates and not guaranteed</li>
              <li>Perpetual Linger is not responsible for delays caused by courier services</li>
              <li>Risk passes to the customer upon delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>PAYMENT</h2>
            <p className="mb-3 text-gray-300">We accept payment via:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300 mb-4">
              <li><strong className="text-amber-400">Peach Payments</strong> (Credit/Debit Cards)</li>
              <li><strong className="text-amber-400">WhatsApp Orders</strong> (EFT/Bank Transfer)</li>
            </ul>
            <p className="text-gray-300">Payment must be received before dispatch of goods</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>PRIVACY</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Your personal information will be kept confidential</li>
              <li>We will not share your information with third parties without your consent</li>
              <li>Information is collected solely for order processing and customer service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>LIABILITY</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Perpetual Linger is not liable for any damages arising from the use of our products</li>
              <li>Use of products is at the customer's own risk</li>
              <li>See "Perfume Usage & Instructions" for safety warnings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>INTELLECTUAL PROPERTY</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>All content on this website, including images, text, and branding, is the property of Perpetual Linger</li>
              <li>Unauthorized use or reproduction is prohibited</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>DISPUTE RESOLUTION</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Any disputes will be governed by the laws of South Africa</li>
              <li>We aim to resolve all customer concerns amicably</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>CONTACT INFORMATION</h2>
            <div className="bg-black/40 rounded-lg p-4 border border-amber-400/30">
              <p className="font-bold text-amber-400 mb-3">Perpetual Linger</p>
              <ul className="space-y-2 text-gray-300">
                <li><strong>Website:</strong> <span className="text-amber-400">www.perpetuallinger.co.za</span></li>
                <li><strong>Email:</strong> <span className="text-amber-400">perpetuallinger@gmail.com</span></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/27610100845" className="text-amber-400 hover:underline">061 010 0845</a></li>
              </ul>
            </div>
          </section>

          <section className="bg-amber-900/20 border border-amber-400/50 rounded-lg p-6">
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#D4AF37' }}>GENERAL DISCLAIMER</h2>
            <p className="text-gray-300 leading-relaxed">
              Terms and Conditions apply and information is provided without prejudice to Perpetual Linger's rights.
              Perpetual Linger's perfume expressions have no relation to other designer products. All publicly available
              references are for indicative purposes only. Perpetual Linger expertly interprets and enhances sought-after
              olfactive characteristics for your delight, presented in its own distinctive luxury branded packaging.
            </p>
          </section>

          <p className="text-center text-gray-400 text-sm mt-8 italic">Last Updated: January 2025</p>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-16 relative overflow-hidden">
      <div className="absolute inset-0 texture-overlay opacity-20"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-12 text-gradient font-bold tracking-wide">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-morphism rounded-xl luxury-shadow p-8">
            <h2 className="text-2xl font-serif font-bold mb-6 text-white">Get In Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone style={{ color: '#D4AF37' }} className="mt-1" />
                <div>
                  <h3 className="font-serif font-bold mb-1 text-white">WhatsApp</h3>
                  <p className="font-sans" style={{ color: '#D4AF37' }}>061 010 0845</p>
                  <a
                    href="https://wa.me/27610100845"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-sans hover:underline"
                    style={{ color: '#D4AF37' }}
                  >
                    Message us →
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail style={{ color: '#D4AF37' }} className="mt-1" />
                <div>
                  <h3 className="font-serif font-bold mb-1 text-white">Email</h3>
                  <p className="font-sans" style={{ color: '#D4AF37' }}>perpetuallinger@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin style={{ color: '#D4AF37' }} className="mt-1" />
                <div>
                  <h3 className="font-serif font-bold mb-1 text-white">Location</h3>
                  <p className="font-sans" style={{ color: '#D4AF37' }}>South Africa</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t" style={{ borderColor: '#D4AF37' }}>
              <h3 className="font-serif font-bold mb-4 text-white">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" style={{ color: '#D4AF37' }} className="hover:opacity-80 transition-opacity"><Instagram size={32} /></a>
              </div>
            </div>
          </div>

          <div className="glass-morphism rounded-xl luxury-shadow p-8">
            <h2 className="text-2xl font-serif font-bold mb-6 text-white">Send A Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-sans font-medium mb-2 text-white">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 rounded-lg focus:outline-none glass-morphism text-white font-sans"
                  style={{ borderColor: '#D4AF37' }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-sans font-medium mb-2 text-white">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border-2 rounded-lg focus:outline-none glass-morphism text-white font-sans"
                  style={{ borderColor: '#D4AF37' }}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block font-sans font-medium mb-2 text-white">Message</label>
                <textarea
                  rows="4"
                  className="w-full p-3 border-2 rounded-lg focus:outline-none glass-morphism text-white font-sans"
                  style={{ borderColor: '#D4AF37' }}
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full luxury-gradient text-black py-3 font-sans font-semibold hover:scale-105 transition-all duration-300 luxury-shadow-hover rounded-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 glass-morphism rounded-xl luxury-shadow p-8">
          <h2 className="text-2xl font-serif font-bold mb-4 text-center text-white">Business Hours</h2>
          <div className="text-center font-sans" style={{ color: '#D4AF37' }}>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Cart = () => (
    <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-gradient-to-b from-black via-neutral-900 to-black luxury-shadow-hover transform transition-all duration-400 z-50 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-6 border-b-2" style={{ borderColor: '#D4AF37' }}>
          <h2 className="text-2xl font-serif font-bold text-gradient">Your Cart</h2>
          <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-neutral-800 rounded-lg transition-all duration-300" style={{ color: '#D4AF37' }}>
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center mt-12" style={{ color: '#D4AF37' }}>
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p className="font-sans">Your cart is empty</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  setCurrentPage('forHer');
                }}
                className="mt-6 luxury-gradient text-black px-6 py-3 rounded-lg font-sans font-semibold hover:scale-105 transition-all duration-300 luxury-shadow-hover"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="glass-morphism border-2 rounded-xl p-4 hover:border-gold transition-all duration-300 luxury-shadow" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-white">{item.name}</h3>
                      <p className="text-sm font-sans" style={{ color: '#D4AF37' }}>{item.size}</p>
                      <p className="font-bold mt-1 font-sans text-gradient">R{item.price}.00</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-300"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border-2 rounded-lg hover:bg-neutral-800 transition-all duration-300 font-sans font-bold"
                      style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold font-sans text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border-2 rounded-lg hover:bg-neutral-800 transition-all duration-300 font-sans font-bold"
                      style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
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
          <div className="border-t-2 p-6 space-y-4 bg-black" style={{ borderColor: '#D4AF37' }}>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCartOpen(false)}
                className="text-sm font-sans underline hover:no-underline transition-all duration-300"
                style={{ color: '#D4AF37' }}
              >
                Continue Shopping
              </button>
            </div>

            <div className="flex justify-between items-center text-xl font-bold font-serif">
              <span className="text-white">Total:</span>
              <span className="text-gradient">R{getTotalPrice()}.00</span>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 font-sans font-semibold hover:from-green-700 hover:to-green-800 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 luxury-shadow-hover rounded-lg"
            >
              <Phone size={20} />
              <span>Order via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                // Peach Payments integration will go here
                addToast('Peach Payments integration coming soon! Please use WhatsApp checkout.', 'info', 4000);
              }}
              className="w-full luxury-gradient text-black py-4 font-sans font-semibold hover:scale-105 transition-all duration-300 animate-glow luxury-shadow-hover rounded-lg"
            >
              Pay Online with Peach Payments
            </button>

            <p className="text-xs text-center font-sans" style={{ color: '#D4AF37' }}>
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
              <img
                src="/FinalLogo.png"
                alt="Perpetual Linger Logo"
                className="h-10 w-auto"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(73%) sepia(47%) saturate(434%) hue-rotate(359deg) brightness(92%) contrast(87%)'
                }}
              />
              <div>
                <div className="font-serif text-xl text-gradient font-bold">Perpetual Linger</div>
                <div className="text-xs text-amber-400">They'll Never Forget</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Luxury inspired fragrances crafted with passion. Leaving a lasting impression that echoes long after you're gone.
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
            <h3 className="font-bold mb-4">Policies & Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => setCurrentPage('perfumeUsage')} className="hover:text-amber-400">Perfume Usage & Instructions</button></li>
              <li><button onClick={() => setCurrentPage('refundPolicy')} className="hover:text-amber-400">Refund & Return Policy</button></li>
              <li><button onClick={() => setCurrentPage('termsNotice')} className="hover:text-amber-400">Terms & Notice</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <p className="text-gray-400 mb-2">WhatsApp: 061 010 0845</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-amber-400 hover:text-amber-300"><Instagram /></a>
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
    <div className="min-h-screen bg-black">
      {/* Global Particles and Sparkles - Always Visible */}
      <GlobalFloatingParticles />
      <GlobalSparkles />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <Navigation />
      <Cart />

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'forHer' && <ProductGrid products={productList.forHer} title="For Her" />}
      {currentPage === 'forHim' && <ProductGrid products={productList.forHim} title="For Him" />}
      {currentPage === 'product' && <ProductPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'perfumeUsage' && <PerfumeUsagePage />}
      {currentPage === 'refundPolicy' && <RefundPolicyPage />}
      {currentPage === 'termsNotice' && <TermsNoticePage />}
      {currentPage === 'adminLogin' && <AdminLogin />}
      {currentPage === 'admin' && isAdmin && <AdminPanel />}

      <Footer />
    </div>
  );
};

export default App;