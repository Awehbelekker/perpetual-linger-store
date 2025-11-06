import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Phone, Mail, MapPin, Instagram, ChevronRight, ArrowLeft, Home, Plus, Minus, Trash2, Heart, Search, Filter, Star, StarHalf } from 'lucide-react';
import { ToastContainer } from './components/Toast';
import { ProductCardSkeleton } from './components/SkeletonLoader';

// Global Floating Particles - Always Visible, Never Fading
const GlobalFloatingParticles = ({ settings }) => {
  if (!settings.enabled) return null;

  // Reduce particle count on mobile for better performance
  const isMobile = window.innerWidth < 768;
  const baseCount = isMobile ? 30 : 60;
  const particleCount = Math.floor(baseCount * (settings.count / 50));

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4, // Larger particles (4-12px)
    duration: (Math.random() * 30 + 20) / settings.speed,
    delay: Math.random() * 10,
    opacity: (Math.random() * 0.5 + 0.4) * (settings.brightness / 100),
  }));

  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 212, g: 175, b: 55 };
  };

  const rgb = hexToRgb(settings.color);
  const intensityMultiplier = settings.intensity / 50;

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
            background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensityMultiplier}) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.6 * intensityMultiplier}) 40%, transparent 100%)`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.8 * intensityMultiplier}), 0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.4 * intensityMultiplier})`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};

// Global Sparkles - Bright and Visible
const GlobalSparkles = ({ settings }) => {
  if (!settings.enabled) return null;

  // Reduce sparkle count on mobile for better performance
  const isMobile = window.innerWidth < 768;
  const baseCount = isMobile ? 12 : 25;
  const sparkleCount = Math.floor(baseCount * (settings.count / 50));

  const sparkles = Array.from({ length: sparkleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: (Math.random() * 4 + 3) / settings.speed,
    size: Math.random() * 4 + 3,
  }));

  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 212, g: 175, b: 55 };
  };

  const rgb = hexToRgb(settings.color);
  const intensityMultiplier = settings.intensity / 50;

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
            background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensityMultiplier}) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.5 * intensityMultiplier}) 50%, transparent 100%)`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            boxShadow: `0 0 15px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.9 * intensityMultiplier * (settings.brightness / 100)})`,
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

// Countdown Timer Component
const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate) - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex justify-center space-x-4 text-center">
      <div className="bg-black/40 px-3 py-2 rounded-lg">
        <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{String(timeLeft.days).padStart(2, '0')}</div>
        <div className="text-xs text-gray-400">Days</div>
      </div>
      <div className="bg-black/40 px-3 py-2 rounded-lg">
        <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-xs text-gray-400">Hrs</div>
      </div>
      <div className="bg-black/40 px-3 py-2 rounded-lg">
        <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-xs text-gray-400">Min</div>
      </div>
      <div className="bg-black/40 px-3 py-2 rounded-lg">
        <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-xs text-gray-400">Sec</div>
      </div>
    </div>
  );
};

// Star Rating Component
const StarRating = ({ rating, size = 16, showNumber = false, reviewCount = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-gold text-gold" />
        ))}
        {hasHalfStar && <StarHalf size={size} className="fill-gold text-gold" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-gray-600" />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm text-gray-400 font-sans ml-1">
          {rating > 0 ? `${rating} (${reviewCount})` : 'No reviews yet'}
        </span>
      )}
    </div>
  );
};

// Newsletter Popup Component
const NewsletterPopup = ({ onSubscribe, onDismiss }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubscribe(email);
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onDismiss}
      ></div>

      {/* Modal */}
      <div className="relative glass-morphism rounded-2xl luxury-shadow-hover max-w-md w-full p-8 border-2 border-gold/30 animate-slideIn">
        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <X size={24} className="text-gold" />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce-subtle">✨</div>
          <h2 className="font-serif text-3xl font-bold text-gradient mb-3">
            Get 10% Off Your First Order!
          </h2>
          <p className="text-gray-300 font-sans text-lg">
            Subscribe to our newsletter and receive exclusive offers, new arrivals, and fragrance tips.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-black/40 border-2 border-gold/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-all duration-300 font-sans"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full luxury-gradient text-black px-6 py-3 rounded-xl font-sans font-bold hover:scale-105 transition-all duration-300 luxury-shadow text-lg"
          >
            Get My 10% Discount
          </button>
        </form>

        {/* Fine Print */}
        <p className="text-xs text-gray-500 text-center mt-4 font-sans">
          By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

// Product Quick View Modal Component
const ProductQuickViewModal = ({ product, onClose, onAddToCart, getAverageRating, getReviewCount }) => {
  const [selectedSize, setSelectedSize] = useState('30ml');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const sizes = [
    { size: '30ml', price: 40 },
    { size: '50ml', price: 60 },
    { size: '100ml', price: 100 }
  ];

  const images = [
    product.referenceImage || '/Final.png',
    ...(product.images || [])
  ].filter(Boolean);

  const selectedPrice = sizes.find(s => s.size === selectedSize)?.price || 40;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

      {/* Modal */}
      <div
        className="relative glass-morphism rounded-2xl luxury-shadow-hover max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar border-2 border-gold/30 animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300"
        >
          <X size={24} className="text-gold" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Left: Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gold/10 to-transparent p-8 border-2 border-gold/20">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-80 object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index ? 'border-gold scale-110' : 'border-gold/20 hover:border-gold/50'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="text-sm font-sans font-medium text-gold mb-2">{product.category}</p>

            {/* Product Name */}
            <h2 className="font-serif text-3xl font-bold text-gradient mb-3">{product.name}</h2>

            {/* Star Rating */}
            <div className="mb-4">
              <StarRating
                rating={parseFloat(getAverageRating(product.id))}
                size={18}
                showNumber={true}
                reviewCount={getReviewCount(product.id)}
              />
            </div>

            {/* Description */}
            <p className="text-gray-300 font-sans mb-6 leading-relaxed">{product.description}</p>

            {/* Notes */}
            {product.notes && (
              <div className="mb-6">
                <h3 className="font-sans font-bold text-white mb-2">Fragrance Notes:</h3>
                <p className="text-gray-400 font-sans text-sm">{product.notes}</p>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-sans font-bold text-white mb-3">Select Size:</h3>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map(({ size, price }) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-gold bg-gold/20 scale-105'
                        : 'border-gold/30 hover:border-gold/60'
                    }`}
                  >
                    <div className="font-sans font-bold text-white">{size}</div>
                    <div className="text-sm text-gold">R{price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-4xl font-bold text-gradient">R{selectedPrice}</div>
              <p className="text-sm text-gray-400 font-sans mt-1">Free delivery on all orders</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-auto">
              <button
                onClick={() => {
                  onAddToCart(product, selectedSize, selectedPrice);
                  onClose();
                }}
                className="w-full luxury-gradient text-black px-6 py-4 rounded-xl font-sans font-bold hover:scale-105 transition-all duration-300 luxury-shadow text-lg"
              >
                Add to Cart - R{selectedPrice}
              </button>
              <button
                onClick={() => {
                  onAddToCart(product, selectedSize, selectedPrice);
                  // Navigate to product page for full details
                }}
                className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-sans font-semibold transition-all duration-300 border-2 border-gold/30"
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Image Picker Component
const ImagePicker = ({ value, onChange, imageLibrary, loadingImages, onUpload, onRefreshLibrary, label = "Image" }) => {
  const [showLibrary, setShowLibrary] = useState(false);
  const [uploadMode, setUploadMode] = useState(false);

  return (
    <div className="space-y-3">
      <label className="block text-white mb-2 font-sans">{label}:</label>

      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => { setUploadMode(false); setShowLibrary(true); }}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
            showLibrary && !uploadMode ? 'luxury-gradient text-black' : 'glass-morphism text-white hover:scale-105'
          }`}
        >
          📁 Select from Library
        </button>
        <button
          onClick={() => { setUploadMode(true); setShowLibrary(false); }}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
            uploadMode ? 'luxury-gradient text-black' : 'glass-morphism text-white hover:scale-105'
          }`}
        >
          ⬆️ Upload New
        </button>
      </div>

      {/* Image Library */}
      {showLibrary && !uploadMode && (
        <div className="border-2 rounded-lg p-4 bg-black/30" style={{ borderColor: '#D4AF37' }}>
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-white font-semibold text-sm">Image Library</h4>
            <button
              onClick={onRefreshLibrary}
              className="text-xs px-2 py-1 rounded glass-morphism text-white hover:scale-105 transition-all"
            >
              🔄 Refresh
            </button>
          </div>

          {loadingImages ? (
            <div className="text-center py-8 text-gray-400">Loading images...</div>
          ) : imageLibrary.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No images in library yet.</p>
              <p className="text-xs mt-2">Upload your first image to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {imageLibrary.map((image) => (
                <div
                  key={image.id}
                  onClick={() => {
                    onChange(image.url);
                    setShowLibrary(false);
                  }}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    value === image.url ? 'border-gold' : 'border-transparent hover:border-gold/50'
                  }`}
                >
                  <img
                    src={image.thumbnail}
                    alt={image.name}
                    className="w-full h-20 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-1 py-0.5">
                    <p className="text-xs text-white truncate">{image.name}</p>
                  </div>
                  {value === image.url && (
                    <div className="absolute top-1 right-1 bg-gold text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upload New */}
      {uploadMode && (
        <div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="image-upload-input"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                await onUpload(file);
                setUploadMode(false);
              }
              e.target.value = '';
            }}
          />
          <label htmlFor="image-upload-input">
            <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-black/20 transition-all"
              style={{ borderColor: '#D4AF37' }}>
              <div className="text-4xl mb-2">📸</div>
              <p className="text-white font-semibold">Click to upload image</p>
              <p className="text-xs text-gray-400 mt-1">Will be saved to Google Drive</p>
            </div>
          </label>
        </div>
      )}

      {/* Current Image Preview */}
      {value && !showLibrary && !uploadMode && (
        <div className="border-2 rounded-lg p-2 bg-black/30" style={{ borderColor: '#D4AF37' }}>
          <img src={value} alt="Selected" className="w-full h-32 object-cover rounded" />
          <button
            onClick={() => setShowLibrary(true)}
            className="w-full mt-2 text-xs px-2 py-1 rounded glass-morphism text-white hover:scale-105 transition-all"
          >
            Change Image
          </button>
        </div>
      )}

      {/* Manual URL Input (fallback) */}
      {!showLibrary && !uploadMode && (
        <div>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            placeholder="Or paste image URL..."
            className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans text-sm"
            style={{ borderColor: '#D4AF37' }}
          />
        </div>
      )}
    </div>
  );
};

// Content Block Renderer Component
const ContentBlockRenderer = ({ block, allProducts, previewMode = false }) => {
  if (!block.visible) return null;

  const getBackgroundColor = (color) => {
    const colors = {
      gold: 'linear-gradient(135deg, #D4AF37 0%, #F4E5B0 100%)',
      black: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      red: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)'
    };
    return colors[color] || colors.gold;
  };

  const getTextColor = (color) => {
    const colors = {
      gold: '#D4AF37',
      black: '#000000',
      white: '#FFFFFF'
    };
    return colors[color] || colors.white;
  };

  // Helper functions for styling
  const getPadding = (size) => {
    const paddings = {
      none: 'p-0',
      small: 'p-4',
      medium: 'p-8 md:p-12',
      large: 'p-12 md:p-16'
    };
    return paddings[size] || paddings.medium;
  };

  const getMargin = (size) => {
    const margins = {
      none: 'mb-0',
      small: 'mb-4',
      medium: 'mb-8',
      large: 'mb-12'
    };
    return margins[size] || margins.medium;
  };

  const getBorderRadius = (size) => {
    const radii = {
      none: 'rounded-none',
      small: 'rounded-lg',
      medium: 'rounded-2xl',
      large: 'rounded-3xl',
      full: 'rounded-full'
    };
    return radii[size] || radii.medium;
  };

  const getShadow = (size) => {
    const shadows = {
      none: '',
      small: 'shadow-sm',
      medium: 'luxury-shadow',
      large: 'shadow-2xl'
    };
    return shadows[size] || shadows.medium;
  };

  switch (block.type) {
    case 'promo-banner':
      return (
        <div
          className={`glass-morphism text-center ${getPadding(block.padding)} ${getMargin(block.margin)} ${getBorderRadius(block.borderRadius)} ${getShadow(block.shadow)}`}
          style={{ background: getBackgroundColor(block.backgroundColor) }}
        >
          <h2 className="text-4xl md:text-6xl font-bold font-serif mb-4" style={{ color: getTextColor(block.textColor) }}>
            {block.title}
          </h2>
          <p className="text-xl md:text-2xl mb-6 font-sans" style={{ color: getTextColor(block.textColor), opacity: 0.9 }}>
            {block.subtitle}
          </p>
          {block.showCountdown && block.endDate && (
            <div className="mb-6">
              <CountdownTimer endDate={block.endDate} />
            </div>
          )}
          {block.buttonText && (
            previewMode ? (
              <div
                className="inline-block px-8 py-4 rounded-lg font-bold text-lg luxury-shadow pointer-events-none"
                style={{
                  background: block.backgroundColor === 'gold' ? '#000000' : getBackgroundColor('gold'),
                  color: block.backgroundColor === 'gold' ? '#D4AF37' : '#000000'
                }}
              >
                {block.buttonText}
              </div>
            ) : (
              <a
                href={block.buttonLink}
                className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 luxury-shadow"
                style={{
                  background: block.backgroundColor === 'gold' ? '#000000' : getBackgroundColor('gold'),
                  color: block.backgroundColor === 'gold' ? '#D4AF37' : '#000000'
                }}
              >
                {block.buttonText}
              </a>
            )
          )}
        </div>
      );

    case 'announcement':
      return (
        <div
          className="glass-morphism rounded-xl p-4 text-center mb-8 luxury-shadow"
          style={{ background: getBackgroundColor(block.backgroundColor) }}
        >
          <p className="text-lg md:text-xl font-semibold font-sans" style={{ color: getTextColor(block.textColor) }}>
            {block.icon && <span className="mr-2">{block.icon}</span>}
            {block.text}
          </p>
        </div>
      );

    case 'special-offer':
      return (
        <div
          className="glass-morphism rounded-2xl p-8 text-center mb-8 luxury-shadow"
          style={{ background: getBackgroundColor(block.backgroundColor) }}
        >
          <h3 className="text-3xl font-bold font-serif mb-3" style={{ color: getTextColor(block.textColor) }}>
            {block.title}
          </h3>
          <p className="text-lg mb-4 font-sans" style={{ color: getTextColor(block.textColor), opacity: 0.9 }}>
            {block.description}
          </p>
          <div className="inline-block bg-black/40 px-6 py-3 rounded-lg border-2 border-dashed mb-2" style={{ borderColor: getTextColor(block.textColor) }}>
            <p className="text-sm font-sans" style={{ color: getTextColor(block.textColor), opacity: 0.8 }}>Use Code:</p>
            <p className="text-2xl font-bold font-mono" style={{ color: getTextColor(block.textColor) }}>{block.code}</p>
          </div>
          <p className="text-xl font-bold font-sans" style={{ color: getTextColor(block.textColor) }}>{block.discount}</p>
        </div>
      );

    case 'featured-products':
      const selectedProducts = block.productIds
        .map(id => allProducts?.find(p => p.id === id))
        .filter(Boolean)
        .slice(0, block.columns);

      if (selectedProducts.length === 0) return null;

      return (
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-center mb-8" style={{ color: '#D4AF37' }}>
            {block.title}
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-${block.columns} gap-6`}>
            {selectedProducts.map(product => (
              <div
                key={product.id}
                className={`glass-morphism rounded-xl overflow-hidden luxury-shadow transition-all duration-300 ${previewMode ? 'pointer-events-none' : 'hover:scale-105 cursor-pointer'}`}
              >
                <img src={product.images?.[product.mainImageIndex || 0]} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-sm font-sans" style={{ color: '#D4AF37' }}>{product.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'image':
      if (!block.imageUrl) return null;

      const heightClasses = {
        small: 'h-48',
        medium: 'h-64 md:h-96',
        large: 'h-96 md:h-[600px]'
      };

      const ImageContent = (
        <img
          src={block.imageUrl}
          alt={block.altText || 'Content image'}
          className={`w-full ${heightClasses[block.height] || heightClasses.medium} object-cover rounded-2xl luxury-shadow`}
        />
      );

      return (
        <div className="mb-8">
          {block.link && !previewMode ? (
            <a href={block.link}>{ImageContent}</a>
          ) : (
            ImageContent
          )}
        </div>
      );

    case 'text':
      const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
      };

      const fontSizeClasses = {
        small: 'text-base md:text-lg',
        medium: 'text-lg md:text-xl',
        large: 'text-xl md:text-3xl'
      };

      return (
        <div className={`glass-morphism rounded-xl p-6 md:p-8 mb-8 ${alignmentClasses[block.alignment] || alignmentClasses.center}`}>
          <p className={`font-sans text-white ${fontSizeClasses[block.fontSize] || fontSizeClasses.medium} leading-relaxed`}>
            {block.content}
          </p>
        </div>
      );

    default:
      return null;
  }
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('perpetualLingerCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('perpetualLingerWishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    gender: 'all', // 'all', 'forHer', 'forHim'
    priceRange: 'all', // 'all', 'under150', '150-200', 'over200'
    category: 'all', // 'all', or specific category
    sortBy: 'name' // 'name', 'price-low', 'price-high', 'rating'
  });

  // Track search queries with debounce
  useEffect(() => {
    if (searchQuery.length >= 3) {
      const timer = setTimeout(() => {
        const allProducts = [...productList.forHer, ...productList.forHim];
        const results = allProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.notes && product.notes.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        trackSearch(searchQuery, results.length);
      }, 1000); // Wait 1 second after user stops typing
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Reviews State
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('perpetualLingerReviews');
    return savedReviews ? JSON.parse(savedReviews) : {
      // Sample reviews for demonstration
      'chanel-coco': [
        { id: 1, name: 'Sarah M.', rating: 5, date: '2024-01-15', comment: 'Absolutely love this! Smells exactly like the original and lasts all day. Best purchase ever!', verified: true },
        { id: 2, name: 'Thandi K.', rating: 5, date: '2024-01-10', comment: 'Amazing quality! I get compliments everywhere I go. Will definitely buy again.', verified: true },
        { id: 3, name: 'Lisa P.', rating: 4, date: '2024-01-05', comment: 'Great scent, very close to the original. Longevity is good but not as long as the designer version.', verified: false }
      ],
      'dior-sauvage': [
        { id: 4, name: 'Michael T.', rating: 5, date: '2024-01-20', comment: 'This is my signature scent now! Incredible quality and the price is unbeatable.', verified: true },
        { id: 5, name: 'John D.', rating: 5, date: '2024-01-18', comment: 'Smells fantastic! My wife loves it and so do I. Highly recommend!', verified: true }
      ],
      'lancome-belle': [
        { id: 6, name: 'Emma W.', rating: 5, date: '2024-01-22', comment: 'Beautiful fragrance! Sweet but not overpowering. Perfect for everyday wear.', verified: true }
      ]
    };
  });

  // Save reviews to localStorage
  useEffect(() => {
    localStorage.setItem('perpetualLingerReviews', JSON.stringify(reviews));
  }, [reviews]);

  // Add review function
  const addReview = (productId, reviewData) => {
    const newReview = {
      id: Date.now(),
      ...reviewData,
      date: new Date().toISOString().split('T')[0],
      verified: false // Admin can verify later
    };

    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newReview]
    }));

    addToast('Review submitted! Thank you for your feedback.', 'success');
  };

  // Get average rating for a product
  const getAverageRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  // Get review count for a product
  const getReviewCount = (productId) => {
    return (reviews[productId] || []).length;
  };

  // Newsletter State
  const [newsletterEmails, setNewsletterEmails] = useState(() => {
    const saved = localStorage.getItem('perpetualLingerNewsletterEmails');
    return saved ? JSON.parse(saved) : [];
  });
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [newsletterDismissed, setNewsletterDismissed] = useState(() => {
    return localStorage.getItem('perpetualLingerNewsletterDismissed') === 'true';
  });

  // Show newsletter popup after 10 seconds if not dismissed
  useEffect(() => {
    if (!newsletterDismissed && newsletterEmails.length === 0) {
      const timer = setTimeout(() => {
        setShowNewsletterPopup(true);
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [newsletterDismissed, newsletterEmails.length]);

  // Save newsletter emails to localStorage
  useEffect(() => {
    localStorage.setItem('perpetualLingerNewsletterEmails', JSON.stringify(newsletterEmails));
  }, [newsletterEmails]);

  const subscribeToNewsletter = (email) => {
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    if (newsletterEmails.includes(email)) {
      addToast('You are already subscribed!', 'info');
      return;
    }
    setNewsletterEmails([...newsletterEmails, email]);
    setShowNewsletterPopup(false);
    addToast('🎉 Welcome! Check your email for your 10% discount code!', 'success');
    // Track analytics
    trackNewsletterSignup(email);
  };

  const dismissNewsletter = () => {
    setShowNewsletterPopup(false);
    setNewsletterDismissed(true);
    localStorage.setItem('perpetualLingerNewsletterDismissed', 'true');
  };

  // ============================================================================
  // GOOGLE ANALYTICS 4 INTEGRATION
  // ============================================================================

  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 Measurement ID

  // Initialize Google Analytics
  useEffect(() => {
    // Load GA4 script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });

    return () => {
      // Cleanup
      if (script1.parentNode) {
        script1.parentNode.removeChild(script1);
      }
    };
  }, []);

  // Track page views
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: currentPage,
        page_location: window.location.href,
        page_path: `/${currentPage}`,
      });
    }
  }, [currentPage]);

  // Analytics tracking functions
  const trackEvent = (eventName, eventParams = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
    // Also log to console in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', eventName, eventParams);
    }
  };

  const trackProductView = (product) => {
    trackEvent('view_item', {
      currency: 'ZAR',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
      }]
    });
  };

  const trackAddToCart = (product, quantity = 1) => {
    trackEvent('add_to_cart', {
      currency: 'ZAR',
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: quantity,
      }]
    });
  };

  const trackRemoveFromCart = (product, quantity = 1) => {
    trackEvent('remove_from_cart', {
      currency: 'ZAR',
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: quantity,
      }]
    });
  };

  const trackBeginCheckout = (checkoutMethod) => {
    trackEvent('begin_checkout', {
      currency: 'ZAR',
      value: getTotalPrice(),
      items: cart.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity,
      })),
      checkout_method: checkoutMethod, // 'whatsapp' or 'peach_payments'
    });
  };

  const trackPurchase = (transactionId, checkoutMethod) => {
    trackEvent('purchase', {
      transaction_id: transactionId,
      currency: 'ZAR',
      value: getTotalPrice(),
      items: cart.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity,
      })),
      checkout_method: checkoutMethod,
    });
  };

  const trackSearch = (searchTerm, resultsCount) => {
    trackEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  };

  const trackAddToWishlist = (product) => {
    trackEvent('add_to_wishlist', {
      currency: 'ZAR',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
      }]
    });
  };

  const trackNewsletterSignup = (email) => {
    trackEvent('newsletter_signup', {
      method: 'email',
      email_domain: email.split('@')[1],
    });
  };

  // ============================================================================
  // PRODUCT QUICK VIEW MODAL
  // ============================================================================

  // State already declared above with wishlist state

  // ============================================================================
  // RELATED PRODUCTS
  // ============================================================================

  const getRelatedProducts = (product, count = 4) => {
    const allProducts = [...productList.forHer, ...productList.forHim];

    // Filter products from the same category, excluding the current product
    let related = allProducts.filter(p =>
      p.id !== product.id && p.category === product.category
    );

    // If not enough products in same category, add products from same gender
    if (related.length < count) {
      const sameGender = allProducts.filter(p =>
        p.id !== product.id &&
        !related.includes(p) &&
        ((productList.forHer.includes(product) && productList.forHer.includes(p)) ||
         (productList.forHim.includes(product) && productList.forHim.includes(p)))
      );
      related = [...related, ...sameGender];
    }

    // If still not enough, add random products
    if (related.length < count) {
      const remaining = allProducts.filter(p =>
        p.id !== product.id && !related.includes(p)
      );
      related = [...related, ...remaining];
    }

    // Shuffle and return the requested count
    return related.sort(() => Math.random() - 0.5).slice(0, count);
  };

  // ============================================================================
  // DISCOUNT CODES SYSTEM
  // ============================================================================

  const [discountCodes] = useState({
    'WELCOME10': { type: 'percentage', value: 10, description: 'Welcome discount - 10% off' },
    'FIRST15': { type: 'percentage', value: 15, description: 'First order - 15% off' },
    'SAVE20': { type: 'percentage', value: 20, description: 'Special offer - 20% off' },
    'FREESHIP': { type: 'free_shipping', value: 0, description: 'Free shipping' },
    'LUXURY25': { type: 'percentage', value: 25, description: 'Luxury discount - 25% off' },
  });

  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountInput, setDiscountInput] = useState('');

  const applyDiscountCode = (code) => {
    const upperCode = code.toUpperCase().trim();
    const discount = discountCodes[upperCode];

    if (discount) {
      setAppliedDiscount({ code: upperCode, ...discount });
      addToast(`✨ Discount applied: ${discount.description}!`, 'success');
      setDiscountInput('');
      // Track analytics
      trackEvent('apply_discount', {
        code: upperCode,
        discount_type: discount.type,
        discount_value: discount.value,
      });
    } else {
      addToast('Invalid discount code', 'error');
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    addToast('Discount removed', 'info');
  };

  const calculateDiscount = () => {
    if (!appliedDiscount) return 0;

    const subtotal = getTotalPrice();
    if (appliedDiscount.type === 'percentage') {
      return (subtotal * appliedDiscount.value) / 100;
    } else if (appliedDiscount.type === 'fixed') {
      return appliedDiscount.value;
    }
    return 0;
  };

  const getFinalTotal = () => {
    return getTotalPrice() - calculateDiscount();
  };

  // CMS Content State - Load from localStorage or use defaults
  const defaultContent = {
    logo: '/Final.png', // Site logo
    hero: {
      heading: 'Perpetual Linger',
      tagline: "They'll Never Forget",
      description: "Luxury-inspired fragrances crafted with passion. Leaving a lasting impression that echoes long after you're gone."
    },
    sections: {
      mostPopular: 'Most Popular',
      forHer: 'For Her',
      forHim: 'For Him',
      selectSize: 'Select Size:',
      productDisclaimer: 'These are premium quality inspired fragrances, carefully crafted to capture the essence of luxury designer scents.'
    },
    about: {
      heading: 'About Perpetual Linger',
      intro: 'Welcome to Perpetual Linger, where luxury meets affordability in the world of fragrances.',
      story: 'Founded with a passion for exquisite scents, we specialize in creating premium-inspired fragrances that capture the essence of the world\'s most coveted designer perfumes. Our mission is to make luxury accessible to everyone, without compromising on quality.',
      mission: 'We believe that everyone deserves to smell amazing and feel confident. That\'s why we\'ve dedicated ourselves to crafting fragrances that rival their designer counterparts at a fraction of the cost.',
      quality: 'Each fragrance in our collection is carefully formulated using high-quality ingredients and tested to ensure longevity and authenticity. We take pride in our attention to detail and our commitment to customer satisfaction.'
    },
    footer: {
      description: "Luxury-inspired fragrances crafted with passion. Leaving a lasting impression that echoes long after you're gone.",
      copyright: 'Premium-inspired fragrances. Crafted with passion in South Africa.'
    },
    contact: {
      heading: 'Get in Touch',
      description: 'Have questions about our fragrances? Want to place a custom order? We\'d love to hear from you!',
      whatsappText: 'Chat with us on WhatsApp for instant assistance',
      emailText: 'Send us an email and we\'ll respond within 24 hours',
      locationText: 'Based in South Africa, shipping nationwide'
    },
    contentBlocks: [] // Dynamic content blocks for homepage
  };

  // ============================================================================
  // GOOGLE DRIVE OAUTH 2.0 CONFIGURATION
  // ============================================================================
  //
  // SETUP INSTRUCTIONS:
  // 1. Go to https://console.cloud.google.com
  // 2. Create a new project (or select existing)
  // 3. Enable "Google Drive API" in the API Library
  // 4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
  // 5. Application type: "Web application"
  // 6. Add Authorized JavaScript origins:
  //    - http://localhost:5173 (for development)
  //    - https://perpetuallinger.co.za (for production)
  // 7. Copy the Client ID and replace the placeholder below
  // 8. Save and deploy!
  //
  // NOTE: The Client ID is safe to include in client-side code.
  // It's not a secret - it's meant to identify your application.
  // ============================================================================

  const GOOGLE_CLIENT_ID = '147864566465-iqj1v7vr676emdn0iegvqd8qbp17v6pv.apps.googleusercontent.com';
  const GOOGLE_API_KEY = 'AIzaSyBUjJiA8q4RhH9NHS8vG0YC7lKTYlKT1bk';

  const [googleDriveConfig, setGoogleDriveConfig] = useState(() => {
    const saved = localStorage.getItem('googleDriveConfig');
    return saved ? JSON.parse(saved) : {
      accessToken: '',
      refreshToken: '',
      expiresAt: null,
      fileId: '',
      imagesFolderId: '',
      authenticated: false
    };
  });

  const [siteContent, setSiteContent] = useState(defaultContent);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [contentError, setContentError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Save Google Drive config to localStorage
  useEffect(() => {
    localStorage.setItem('googleDriveConfig', JSON.stringify(googleDriveConfig));
  }, [googleDriveConfig]);

  // Load content from Google Drive or localStorage
  useEffect(() => {
    const loadContent = async () => {
      setIsLoadingContent(true);
      setContentError(null);

      if (googleDriveConfig.authenticated && googleDriveConfig.accessToken && googleDriveConfig.fileId) {
        try {
          // Load from Google Drive using OAuth token
          const response = await fetch(
            `https://www.googleapis.com/drive/v3/files/${googleDriveConfig.fileId}?alt=media`,
            {
              headers: {
                'Authorization': `Bearer ${googleDriveConfig.accessToken}`
              }
            }
          );

          if (!response.ok) {
            throw new Error(`Google Drive API error: ${response.status}`);
          }

          const content = await response.json();
          setSiteContent(content);
          // Also save to localStorage as backup
          localStorage.setItem('perpetualLingerContent', JSON.stringify(content));
          addToast('Content loaded from Google Drive!', 'success');
        } catch (error) {
          console.error('Error loading from Google Drive:', error);
          setContentError(error.message);
          // Fallback to localStorage
          const saved = localStorage.getItem('perpetualLingerContent');
          setSiteContent(saved ? JSON.parse(saved) : defaultContent);
          addToast('Failed to load from Google Drive, using local backup', 'error');
        }
      } else {
        // Load from localStorage
        const saved = localStorage.getItem('perpetualLingerContent');
        setSiteContent(saved ? JSON.parse(saved) : defaultContent);
      }

      setIsLoadingContent(false);
    };

    loadContent();
  }, [googleDriveConfig.authenticated, googleDriveConfig.accessToken, googleDriveConfig.fileId]);

  // Save content to localStorage whenever it changes (as backup)
  useEffect(() => {
    if (!isLoadingContent) {
      localStorage.setItem('perpetualLingerContent', JSON.stringify(siteContent));
    }
  }, [siteContent, isLoadingContent]);

  const updateSiteContent = (section, field, value) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Content Blocks Management
  const [editingBlock, setEditingBlock] = useState(null);
  const [draggedBlockIndex, setDraggedBlockIndex] = useState(null);
  const [pageBuilderView, setPageBuilderView] = useState('visual'); // 'visual' or 'list'
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [insertionPosition, setInsertionPosition] = useState(null); // Track where new block will be inserted
  const [pendingBlockType, setPendingBlockType] = useState(null); // Track block type being added
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false); // Track unsaved changes

  // Image Library Management
  const [imageLibrary, setImageLibrary] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  // Visual Effects Settings
  const [particleEffects, setParticleEffects] = useState(() => {
    const saved = localStorage.getItem('particleEffects');
    return saved ? JSON.parse(saved) : {
      enabled: true,
      speed: 1,
      intensity: 50,
      color: '#D4AF37', // gold
      count: 50,
      brightness: 80
    };
  });

  // Save particle effects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('particleEffects', JSON.stringify(particleEffects));
  }, [particleEffects]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('perpetualLingerCart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('perpetualLingerWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addContentBlock = (blockType, position = null) => {
    const newBlock = {
      id: Date.now(),
      type: blockType,
      visible: true,
      ...getDefaultBlockData(blockType)
    };

    setSiteContent(prev => {
      const blocks = [...prev.contentBlocks];

      // Insert at specific position or at the end
      if (position !== null && position >= 0 && position <= blocks.length) {
        blocks.splice(position, 0, newBlock);
      } else {
        blocks.push(newBlock);
      }

      return {
        ...prev,
        contentBlocks: blocks
      };
    });

    setEditingBlock(newBlock.id);
    setInsertionPosition(null); // Clear insertion position
    setPendingBlockType(null); // Clear pending block type
    setHasUnsavedChanges(true); // Mark as having unsaved changes
    addToast('✅ Block added! Click edit to customize.', 'success');

    // Prevent automatic scroll to home page by NOT changing currentPage
    // The block will be visible in the Page Builder preview
  };

  const getDefaultBlockData = (blockType) => {
    // Common styling options for all blocks
    const commonStyles = {
      padding: 'medium',
      margin: 'medium',
      borderRadius: 'medium',
      shadow: 'medium'
    };

    switch (blockType) {
      case 'promo-banner':
        return {
          title: 'Special Offer!',
          subtitle: 'Limited time only',
          backgroundColor: 'gold',
          textColor: 'black',
          buttonText: 'Shop Now',
          buttonLink: '#products',
          showCountdown: false,
          endDate: '',
          backgroundImage: '',
          textShadow: false,
          animation: 'none',
          ...commonStyles
        };
      case 'featured-products':
        return {
          title: 'Featured Collection',
          productIds: [],
          columns: 4,
          showPrices: true,
          layout: 'grid',
          badgeText: '',
          ...commonStyles
        };
      case 'announcement':
        return {
          text: 'Important announcement goes here',
          backgroundColor: 'black',
          textColor: 'gold',
          icon: '📢',
          ...commonStyles
        };
      case 'special-offer':
        return {
          title: 'Special Discount',
          description: 'Use code at checkout',
          code: 'SAVE20',
          discount: '20% OFF',
          backgroundColor: 'gold',
          textColor: 'black',
          ...commonStyles
        };
      case 'image':
        return {
          imageUrl: '',
          altText: '',
          link: '',
          height: 'medium',
          overlayText: '',
          overlayPosition: 'center',
          gradientOverlay: 'none',
          parallax: false,
          ...commonStyles
        };
      case 'text':
        return {
          content: 'Your custom text here...',
          alignment: 'center',
          fontSize: 'medium',
          backgroundColor: 'transparent',
          textColor: 'white',
          borderColor: 'transparent',
          borderWidth: '0',
          iconEmoji: '',
          ...commonStyles
        };
      default:
        return { ...commonStyles };
    }
  };

  const updateContentBlock = (blockId, updates) => {
    setSiteContent(prev => ({
      ...prev,
      contentBlocks: prev.contentBlocks.map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    }));
    setHasUnsavedChanges(true);
  };

  const deleteContentBlock = (blockId) => {
    if (confirm('Delete this content block?')) {
      setSiteContent(prev => ({
        ...prev,
        contentBlocks: prev.contentBlocks.filter(block => block.id !== blockId)
      }));
      setHasUnsavedChanges(true);
      addToast('🗑️ Block deleted', 'success');
    }
  };

  // Show insertion position preview
  const showInsertionPreview = (blockType, position) => {
    setPendingBlockType(blockType);
    setInsertionPosition(position);
  };

  // Cancel block editing
  const cancelBlockEditing = () => {
    setEditingBlock(null);
    setInsertionPosition(null);
    setPendingBlockType(null);
    addToast('✖️ Editing cancelled', 'info');
  };

  // Discard all unsaved changes
  const discardChanges = () => {
    if (window.confirm('⚠️ Discard all unsaved changes? This cannot be undone.')) {
      // Reload content from localStorage or Google Drive
      const saved = localStorage.getItem('siteContent');
      if (saved) {
        setSiteContent(JSON.parse(saved));
      }
      setHasUnsavedChanges(false);
      setEditingBlock(null);
      addToast('↩️ Changes discarded', 'info');
    }
  };

  const toggleBlockVisibility = (blockId) => {
    setSiteContent(prev => ({
      ...prev,
      contentBlocks: prev.contentBlocks.map(block =>
        block.id === blockId ? { ...block, visible: !block.visible } : block
      )
    }));
    setHasUnsavedChanges(true);
  };

  const moveBlock = (fromIndex, toIndex) => {
    setSiteContent(prev => {
      const blocks = [...prev.contentBlocks];
      const [movedBlock] = blocks.splice(fromIndex, 1);
      blocks.splice(toIndex, 0, movedBlock);
      return { ...prev, contentBlocks: blocks };
    });
  };

  // Enhanced Drag & Drop Handlers for Visual Builder
  const handleDragStart = (e, index) => {
    setDraggedBlockIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedBlockIndex !== null && draggedBlockIndex !== dropIndex) {
      moveBlock(draggedBlockIndex, dropIndex);
    }
    setDraggedBlockIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedBlockIndex(null);
    setDragOverIndex(null);
  };

  const applyTemplate = (templateName) => {
    const templates = {
      'weekend-special': [
        {
          id: Date.now(),
          type: 'promo-banner',
          visible: true,
          title: '✨ Exclusive Weekend Luxury ✨',
          subtitle: 'Indulge in 30% OFF Premium Designer Fragrances - This Weekend Only',
          backgroundColor: 'gold',
          textColor: 'black',
          buttonText: 'Shop Weekend Deals',
          buttonLink: '#shop-now',
          showCountdown: true,
          endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
          id: Date.now() + 1,
          type: 'featured-products',
          visible: true,
          title: 'Weekend Best Sellers',
          productIds: ['chanel-coco', 'dior-sauvage', 'bleu-chanel', 'dior-poison'],
          columns: 4
        }
      ],
      'holiday-sale': [
        {
          id: Date.now(),
          type: 'promo-banner',
          visible: true,
          title: '🎄 Holiday Magic - Luxury Scents Up to 50% OFF 🎄',
          subtitle: 'Make This Season Unforgettable with Designer Fragrances',
          backgroundColor: 'red',
          textColor: 'white',
          buttonText: 'Discover Holiday Deals',
          buttonLink: '#holiday-collection',
          showCountdown: true,
          endDate: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0] // Dec 31
        },
        {
          id: Date.now() + 1,
          type: 'special-offer',
          visible: true,
          title: '🎁 Extra Holiday Bonus',
          description: 'Stack your savings! Use this exclusive code for an additional discount on all orders',
          code: 'HOLIDAY2024',
          discount: '25% OFF',
          backgroundColor: 'gold',
          textColor: 'black'
        },
        {
          id: Date.now() + 2,
          type: 'featured-products',
          visible: true,
          title: 'Perfect Holiday Gifts',
          productIds: ['chanel-coco', 'dior-sauvage', 'lancome-belle', 'pr-invictus', 'armani-si', 'bleu-chanel'],
          columns: 3
        }
      ],
      'new-arrivals': [
        {
          id: Date.now(),
          type: 'announcement',
          visible: true,
          text: '✨ Just Landed: Exclusive New Designer Fragrances - Be The First To Experience Them!',
          backgroundColor: 'gold',
          textColor: 'black',
          icon: '✨'
        },
        {
          id: Date.now() + 1,
          type: 'text',
          visible: true,
          content: 'Discover our latest collection of premium designer-inspired fragrances. Each scent carefully crafted to capture the essence of luxury and leave a lasting impression.',
          fontSize: 'medium',
          alignment: 'center'
        },
        {
          id: Date.now() + 2,
          type: 'featured-products',
          visible: true,
          title: 'Fresh Arrivals - Limited Stock',
          productIds: ['gucci-bamboo', 'armani-si', 'elie-saab', 'versace-eros'],
          columns: 4
        }
      ],
      'seasonal-collection': [
        {
          id: Date.now(),
          type: 'promo-banner',
          visible: true,
          title: '🌸 Spring/Summer Collection 🌸',
          subtitle: 'Light, Fresh & Captivating Scents for Warmer Days',
          backgroundColor: 'gold',
          textColor: 'black',
          buttonText: 'Explore Collection',
          buttonLink: '#seasonal-picks',
          showCountdown: false,
          endDate: ''
        },
        {
          id: Date.now() + 1,
          type: 'text',
          visible: true,
          content: 'Embrace the season with our curated selection of fresh, aquatic, and floral fragrances. Perfect for making memories that last all summer long.',
          fontSize: 'large',
          alignment: 'center'
        },
        {
          id: Date.now() + 2,
          type: 'featured-products',
          visible: true,
          title: 'Seasonal Favorites',
          productIds: ['dg-lightblue', 'davidoff-coolwater', 'armani-acqua', 'issey-miyake'],
          columns: 4
        }
      ],
      'flash-sale': [
        {
          id: Date.now(),
          type: 'promo-banner',
          visible: true,
          title: '⚡ FLASH SALE - 50% OFF EVERYTHING! ⚡',
          subtitle: 'Hurry! This Deal Disappears in Hours - Don\'t Miss Out!',
          backgroundColor: 'red',
          textColor: 'white',
          buttonText: 'Grab Your Deal Now',
          buttonLink: '#flash-deals',
          showCountdown: true,
          endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 24 hours
        },
        {
          id: Date.now() + 1,
          type: 'announcement',
          visible: true,
          text: '🔥 Limited Stock! First Come, First Served - No Rain Checks!',
          backgroundColor: 'black',
          textColor: 'gold',
          icon: '🔥'
        },
        {
          id: Date.now() + 2,
          type: 'featured-products',
          visible: true,
          title: 'Flash Sale Highlights',
          productIds: ['chanel-coco', 'dior-sauvage', 'bleu-chanel', 'dior-poison', 'pr-invictus', 'lancome-belle'],
          columns: 3
        }
      ],
      'bogo-promotion': [
        {
          id: Date.now(),
          type: 'promo-banner',
          visible: true,
          title: '🎁 Buy One, Get One FREE! 🎁',
          subtitle: 'Double Your Luxury - Mix & Match Any Fragrances',
          backgroundColor: 'gold',
          textColor: 'black',
          buttonText: 'Shop BOGO Deal',
          buttonLink: '#bogo-deals',
          showCountdown: false,
          endDate: ''
        },
        {
          id: Date.now() + 1,
          type: 'special-offer',
          visible: true,
          title: 'How It Works',
          description: 'Add 2 fragrances to cart, pay for 1! Discount applied automatically at checkout.',
          code: 'BOGO2024',
          discount: '50% OFF 2nd Item',
          backgroundColor: 'black',
          textColor: 'gold'
        },
        {
          id: Date.now() + 2,
          type: 'featured-products',
          visible: true,
          title: 'Perfect Pairs',
          productIds: ['chanel-coco', 'dior-sauvage', 'lancome-belle', 'bleu-chanel'],
          columns: 4
        }
      ],
      'free-shipping': [
        {
          id: Date.now(),
          type: 'announcement',
          visible: true,
          text: '🚚 FREE SHIPPING on All Orders Over R500 - Limited Time!',
          backgroundColor: 'gold',
          textColor: 'black',
          icon: '🚚'
        },
        {
          id: Date.now() + 1,
          type: 'promo-banner',
          visible: true,
          title: 'Nationwide Free Delivery',
          subtitle: 'Shop R500+ and Get Your Luxury Fragrances Delivered Free Across South Africa',
          backgroundColor: 'black',
          textColor: 'gold',
          buttonText: 'Start Shopping',
          buttonLink: '#free-delivery',
          showCountdown: false,
          endDate: ''
        },
        {
          id: Date.now() + 2,
          type: 'featured-products',
          visible: true,
          title: 'Popular Choices',
          productIds: ['chanel-coco', 'dior-poison', 'dior-sauvage', 'pr-invictus', 'armani-si', 'bleu-chanel'],
          columns: 3
        }
      ],
      'vip-special': [
        {
          id: Date.now(),
          type: 'promo-banner',
          visible: true,
          title: '👑 VIP Exclusive Offer 👑',
          subtitle: 'You\'re Invited: 40% OFF + Free Gift with Every Purchase',
          backgroundColor: 'black',
          textColor: 'gold',
          buttonText: 'Claim VIP Offer',
          buttonLink: '#vip-access',
          showCountdown: true,
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 7 days
        },
        {
          id: Date.now() + 1,
          type: 'special-offer',
          visible: true,
          title: '🎁 VIP Perks',
          description: 'Exclusive access to premium fragrances + complimentary luxury sample with every order',
          code: 'VIP2024',
          discount: '40% OFF + Free Gift',
          backgroundColor: 'gold',
          textColor: 'black'
        },
        {
          id: Date.now() + 2,
          type: 'text',
          visible: true,
          content: 'As a valued customer, enjoy priority access to our finest collection. This exclusive offer is reserved for our VIP members only.',
          fontSize: 'medium',
          alignment: 'center'
        }
      ],
      'clearance-sale': [
        {
          id: Date.now(),
          type: 'promo-banner',
          visible: true,
          title: '🔥 End of Season Clearance - Up to 60% OFF! 🔥',
          subtitle: 'Final Chance! Premium Fragrances at Unbeatable Prices',
          backgroundColor: 'red',
          textColor: 'white',
          buttonText: 'Shop Clearance',
          buttonLink: '#clearance',
          showCountdown: true,
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 14 days
        },
        {
          id: Date.now() + 1,
          type: 'announcement',
          visible: true,
          text: '⚠️ While Stocks Last - Once They\'re Gone, They\'re Gone!',
          backgroundColor: 'black',
          textColor: 'gold',
          icon: '⚠️'
        },
        {
          id: Date.now() + 2,
          type: 'featured-products',
          visible: true,
          title: 'Clearance Highlights',
          productIds: ['gucci-rush', 'jpg-classic', 'lacoste-pink', 'dkny-delicious', 'bs-fantasy', 'ck-euphoria'],
          columns: 3
        }
      ],
      'gift-bundle': [
        {
          id: Date.now(),
          type: 'promo-banner',
          visible: true,
          title: '🎁 Curated Gift Sets - Perfect for Any Occasion 🎁',
          subtitle: 'Luxury Fragrance Collections Beautifully Packaged & Ready to Gift',
          backgroundColor: 'gold',
          textColor: 'black',
          buttonText: 'Browse Gift Sets',
          buttonLink: '#gift-sets',
          showCountdown: false,
          endDate: ''
        },
        {
          id: Date.now() + 1,
          type: 'text',
          visible: true,
          content: 'Give the gift of luxury with our expertly curated fragrance bundles. Each set includes complementary scents for him and her, elegantly presented.',
          fontSize: 'large',
          alignment: 'center'
        },
        {
          id: Date.now() + 2,
          type: 'featured-products',
          visible: true,
          title: 'His & Hers Collections',
          productIds: ['chanel-coco', 'dior-sauvage', 'lancome-belle', 'bleu-chanel', 'armani-si', 'pr-invictus'],
          columns: 3
        }
      ],
      'limited-edition': [
        {
          id: Date.now(),
          type: 'announcement',
          visible: true,
          text: '✨ NEW ARRIVAL: Limited Edition Exclusive Fragrance - Only 100 Bottles Available!',
          backgroundColor: 'gold',
          textColor: 'black',
          icon: '✨'
        },
        {
          id: Date.now() + 1,
          type: 'promo-banner',
          visible: true,
          title: '🌟 Limited Edition Launch 🌟',
          subtitle: 'Be Among The First - Exclusive Designer Scent Available for a Limited Time',
          backgroundColor: 'black',
          textColor: 'gold',
          buttonText: 'Reserve Yours Now',
          buttonLink: '#limited-edition',
          showCountdown: true,
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days
        },
        {
          id: Date.now() + 2,
          type: 'text',
          visible: true,
          content: 'This exclusive fragrance won\'t be restocked. Once sold out, it\'s gone forever. Secure your bottle today and own a piece of luxury history.',
          fontSize: 'medium',
          alignment: 'center'
        },
        {
          id: Date.now() + 3,
          type: 'featured-products',
          visible: true,
          title: 'Limited Edition Collection',
          productIds: ['elie-saab', 'gucci-bamboo', 'versace-eros', 'tom-ford'],
          columns: 4
        }
      ]
    };

    if (templates[templateName]) {
      setSiteContent(prev => ({
        ...prev,
        contentBlocks: templates[templateName]
      }));
      addToast(`${templateName.replace('-', ' ')} template applied!`, 'success');
    }
  };

  // Simplified OAuth 2.0 Authentication - One Click!
  const authenticateGoogleDrive = () => {
    setIsAuthenticating(true);

    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.file',
        callback: async (response) => {
          if (response.access_token) {
            // Calculate token expiration (typically 1 hour)
            const expiresAt = Date.now() + (response.expires_in || 3600) * 1000;

            // Save access token and expiration
            setGoogleDriveConfig(prev => ({
              ...prev,
              accessToken: response.access_token,
              expiresAt: expiresAt,
              authenticated: true
            }));

            // Try to find or create the content file
            await findOrCreateContentFile(response.access_token);

            // Fetch image library
            await fetchImagesFromGoogleDrive();

            addToast('✅ Successfully connected to Google Drive!', 'success');
            setIsAuthenticating(false);
          } else {
            addToast('❌ Authentication failed', 'error');
            setIsAuthenticating(false);
          }
        },
        error_callback: (error) => {
          console.error('OAuth error:', error);
          addToast('❌ Authentication cancelled or failed', 'error');
          setIsAuthenticating(false);
        }
      });

      client.requestAccessToken();
    } catch (error) {
      console.error('Error initializing OAuth:', error);
      addToast('❌ Failed to initialize Google authentication', 'error');
      setIsAuthenticating(false);
    }
  };

  // Disconnect from Google Drive
  const disconnectGoogleDrive = () => {
    setGoogleDriveConfig({
      accessToken: '',
      refreshToken: '',
      expiresAt: null,
      fileId: '',
      imagesFolderId: '',
      authenticated: false
    });
    setImageLibrary([]);
    addToast('🔌 Disconnected from Google Drive', 'info');
  };

  // Check if token is expired and needs refresh
  const isTokenExpired = () => {
    if (!googleDriveConfig.expiresAt) return true;
    return Date.now() >= googleDriveConfig.expiresAt;
  };

  // Find or create content file in Google Drive
  const findOrCreateContentFile = async (accessToken) => {
    try {
      // Search for existing file
      const searchResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=name='perpetual-linger-content.json'&fields=files(id,name)`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );

      const searchData = await searchResponse.json();

      if (searchData.files && searchData.files.length > 0) {
        // File exists, use it
        const fileId = searchData.files[0].id;
        setGoogleDriveConfig(prev => ({ ...prev, fileId }));
        addToast('Found existing content file in Google Drive', 'success');
      } else {
        // Create new file
        const metadata = {
          name: 'perpetual-linger-content.json',
          mimeType: 'application/json'
        };

        const createResponse = await fetch(
          'https://www.googleapis.com/drive/v3/files',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(metadata)
          }
        );

        const fileData = await createResponse.json();

        // Upload initial content
        await fetch(
          `https://www.googleapis.com/upload/drive/v3/files/${fileData.id}?uploadType=media`,
          {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(defaultContent, null, 2)
          }
        );

        setGoogleDriveConfig(prev => ({ ...prev, fileId: fileData.id }));
        addToast('Created new content file in Google Drive', 'success');
      }

      // Create images folder if it doesn't exist
      await findOrCreateImagesFolder(accessToken);
    } catch (error) {
      console.error('Error finding/creating content file:', error);
      addToast('Error setting up Google Drive files', 'error');
    }
  };

  // Find or create images folder
  const findOrCreateImagesFolder = async (accessToken) => {
    try {
      const searchResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=name='perpetual-linger-images' and mimeType='application/vnd.google-apps.folder'&fields=files(id,name)`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );

      const searchData = await searchResponse.json();

      if (searchData.files && searchData.files.length > 0) {
        setGoogleDriveConfig(prev => ({ ...prev, imagesFolderId: searchData.files[0].id }));
      } else {
        // Create folder
        const metadata = {
          name: 'perpetual-linger-images',
          mimeType: 'application/vnd.google-apps.folder'
        };

        const createResponse = await fetch(
          'https://www.googleapis.com/drive/v3/files',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(metadata)
          }
        );

        const folderData = await createResponse.json();
        setGoogleDriveConfig(prev => ({ ...prev, imagesFolderId: folderData.id }));
      }
    } catch (error) {
      console.error('Error creating images folder:', error);
    }
  };

  // Auto-save content to Google Drive
  const saveContentToGoogleDrive = async () => {
    if (!googleDriveConfig.authenticated || !googleDriveConfig.accessToken || !googleDriveConfig.fileId) {
      addToast('Google Drive not connected. Saving locally only.', 'info');
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/upload/drive/v3/files/${googleDriveConfig.fileId}?uploadType=media`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${googleDriveConfig.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(siteContent, null, 2)
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to save: ${response.status}`);
      }

      addToast('Content saved to Google Drive!', 'success');
    } catch (error) {
      console.error('Error saving to Google Drive:', error);
      addToast('Error saving to Google Drive: ' + error.message, 'error');
    }
  };

  // Upload image to Google Drive
  const uploadImageToGoogleDrive = async (file) => {
    if (!googleDriveConfig.authenticated || !googleDriveConfig.accessToken) {
      addToast('Google Drive not connected', 'error');
      return null;
    }

    try {
      // Create file metadata
      const metadata = {
        name: `${Date.now()}-${file.name}`,
        mimeType: file.type,
        parents: googleDriveConfig.imagesFolderId ? [googleDriveConfig.imagesFolderId] : []
      };

      // Create multipart upload
      const boundary = '-------314159265358979323846';
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";

      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
          const contentType = file.type || 'application/octet-stream';
          const base64Data = btoa(
            new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );

          const multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;

          const response = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink,webContentLink',
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${googleDriveConfig.accessToken}`,
                'Content-Type': `multipart/related; boundary="${boundary}"`
              },
              body: multipartRequestBody
            }
          );

          if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
          }

          const fileData = await response.json();

          // Make file publicly accessible
          await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileData.id}/permissions`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${googleDriveConfig.accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                role: 'reader',
                type: 'anyone'
              })
            }
          );

          // Return public URL
          const publicUrl = `https://drive.google.com/uc?export=view&id=${fileData.id}`;

          // Refresh image library after upload
          fetchImagesFromGoogleDrive();

          resolve(publicUrl);
        };

        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      addToast('Error uploading image: ' + error.message, 'error');
      return null;
    }
  };

  // Fetch all images from Google Drive
  const fetchImagesFromGoogleDrive = async () => {
    if (!googleDriveConfig.authenticated || !googleDriveConfig.accessToken) {
      return [];
    }

    setLoadingImages(true);
    try {
      // Query for all image files in the images folder
      let query = "mimeType contains 'image/'";
      if (googleDriveConfig.imagesFolderId) {
        query += ` and '${googleDriveConfig.imagesFolderId}' in parents`;
      }

      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,createdTime,thumbnailLink,webContentLink)&orderBy=createdTime desc`,
        {
          headers: {
            'Authorization': `Bearer ${googleDriveConfig.accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.status}`);
      }

      const data = await response.json();
      const images = data.files.map(file => ({
        id: file.id,
        name: file.name,
        url: `https://drive.google.com/uc?export=view&id=${file.id}`,
        thumbnail: file.thumbnailLink || `https://drive.google.com/uc?export=view&id=${file.id}`,
        createdTime: file.createdTime,
        mimeType: file.mimeType
      }));

      setImageLibrary(images);
      return images;
    } catch (error) {
      console.error('Error fetching images:', error);
      addToast('Error loading image library: ' + error.message, 'error');
      return [];
    } finally {
      setLoadingImages(false);
    }
  };

  // Delete image from Google Drive
  const deleteImageFromGoogleDrive = async (imageId) => {
    if (!googleDriveConfig.authenticated || !googleDriveConfig.accessToken) {
      addToast('Google Drive not connected', 'error');
      return false;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${imageId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${googleDriveConfig.accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.status}`);
      }

      // Refresh image library
      await fetchImagesFromGoogleDrive();
      addToast('Image deleted successfully!', 'success');
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      addToast('Error deleting image: ' + error.message, 'error');
      return false;
    }
  };

  const resetContentToDefaults = () => {
    if (confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
      setSiteContent(defaultContent);
      addToast('Content reset to defaults!', 'success');
    }
  };

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
      productId: product.id,
      name: product.name,
      size: size,
      price: price,
      quantity: 1,
      image: product.referenceImage || '/Final.png',
      category: product.category
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

    // Track analytics
    trackAddToCart(product, 1);

    setCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    setCart(cart.filter(item => item.id !== itemId));
    if (item) {
      addToast(`Removed ${item.name} from cart`, 'info');
      // Track analytics
      const product = [...productList.forHer, ...productList.forHim].find(p => p.id === item.productId);
      if (product) {
        trackRemoveFromCart(product, item.quantity);
      }
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

  const clearCart = () => {
    setCart([]);
    addToast('Cart cleared', 'info');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Wishlist functions
  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      addToast(`Removed ${product.name} from favorites`, 'info');
    } else {
      setWishlist([...wishlist, product]);
      addToast(`Added ${product.name} to favorites!`, 'success');
      // Track analytics
      trackAddToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Search and Filter functions
  const filterAndSortProducts = (productList) => {
    let filtered = [...productList];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.notes.toLowerCase().includes(query)
      );
    }

    // Apply price filter
    if (selectedFilters.priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const basePrice = 40; // Base price for all products
        if (selectedFilters.priceRange === 'under150') return basePrice < 150;
        if (selectedFilters.priceRange === '150-200') return basePrice >= 150 && basePrice <= 200;
        if (selectedFilters.priceRange === 'over200') return basePrice > 200;
        return true;
      });
    }

    // Apply category filter
    if (selectedFilters.category !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase().includes(selectedFilters.category.toLowerCase())
      );
    }

    // Apply sorting
    if (selectedFilters.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedFilters.sortBy === 'price-low') {
      // All products have same base price, so keep original order
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedFilters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFilters({
      gender: 'all',
      priceRange: 'all',
      category: 'all',
      sortBy: 'name'
    });
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
                  src={siteContent.logo}
                  alt="Perpetual Linger Logo"
                  className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
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
              {/* Wishlist Button */}
              <button
                onClick={() => setCurrentPage('wishlist')}
                className="relative p-2 hover:text-gold transition-all duration-300"
                style={{ color: currentPage === 'wishlist' ? '#D4AF37' : 'white' }}
                title="My Favorites"
              >
                <Heart className={wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </button>
              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 hover:text-gold transition-all duration-300"
                style={{ color: cartOpen ? '#D4AF37' : 'white' }}
                title="Shopping Cart"
              >
                <ShoppingCart />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 luxury-gradient text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-glow">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {getBackButton()}
              {/* Mobile Wishlist */}
              <button
                onClick={() => setCurrentPage('wishlist')}
                className="relative p-2"
                style={{ color: currentPage === 'wishlist' ? '#D4AF37' : 'white' }}
              >
                <Heart className={wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''} size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px]">
                    {wishlist.length}
                  </span>
                )}
              </button>
              {/* Mobile Cart */}
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2"
                style={{ color: cartOpen ? '#D4AF37' : 'white' }}
              >
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 luxury-gradient text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px]">
                    {getTotalItems()}
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

              {/* Admin Login/Panel for Mobile */}
              <div className="border-t-2 mt-2 pt-2" style={{ borderColor: '#D4AF37' }}>
                {isAdmin ? (
                  <button
                    onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-2 px-3 rounded-lg glass-morphism transition-all duration-300"
                    style={{ color: '#D4AF37', borderColor: '#D4AF37', borderWidth: '1px' }}
                  >
                    ⚙️ Admin Panel
                  </button>
                ) : (
                  <button
                    onClick={() => { setCurrentPage('adminLogin'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-2 hover:text-gold transition-all duration-300 opacity-70 hover:opacity-100"
                  >
                    🔒 Admin Login
                  </button>
                )}
              </div>
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
              src={siteContent.logo}
              alt="Perpetual Linger Logo"
              className="h-64 md:h-96 w-auto"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.6))'
              }}
            />
          </div>
          <h1 className="font-serif text-6xl md:text-8xl mb-6 font-bold tracking-wide" style={{ color: '#D4AF37' }}>{siteContent.hero.heading}</h1>
          <p className="text-2xl md:text-3xl mb-8 italic font-serif" style={{ color: '#D4AF37' }}>{siteContent.hero.tagline}</p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90 font-sans font-light leading-relaxed">
            {siteContent.hero.description}
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

      {/* Dynamic Content Blocks */}
      {siteContent.contentBlocks && siteContent.contentBlocks.length > 0 && (
        <div className="py-12 bg-gradient-to-b from-black to-neutral-900 relative overflow-hidden">
          <div className="absolute inset-0 texture-overlay opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {siteContent.contentBlocks.map(block => (
              <ContentBlockRenderer
                key={block.id}
                block={block}
                allProducts={[...products.forHer, ...products.forHim]}
              />
            ))}
          </div>
        </div>
      )}

      {/* Most Popular Fragrances */}
      <div className="py-20 bg-gradient-to-b from-black to-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-4 text-gradient font-bold tracking-wide">{siteContent.sections.mostPopular}</h2>
          <p className="text-center mb-12 font-sans" style={{ color: '#D4AF37' }}>Our customers' favorite fragrances</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mostPopular.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentPage('product');
                  trackProductView(product);
                }}
                className="glass-morphism rounded-xl p-4 cursor-pointer hover:scale-105 transition-all duration-400 card-glow luxury-shadow hover:luxury-shadow-hover"
              >
                <div className="h-24 flex items-center justify-center mb-3 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(244, 228, 193, 0.3) 100%)' }}>
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[product.mainImageIndex || 0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-4xl">🧴</div>
                  )}
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

  // Search and Filter Bar Component
  const SearchAndFilterBar = ({ onClose }) => {
    const categories = [...new Set([...products.forHer, ...products.forHim].map(p => p.category))];

    return (
      <div className="glass-morphism rounded-2xl p-6 mb-8 border-2 border-gold/30 luxury-shadow-hover animate-fadeIn">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold" size={20} />
            <input
              type="text"
              placeholder="Search fragrances by name, category, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border-2 border-gold/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-all duration-300 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-sans font-semibold text-gold mb-2">Category</label>
            <select
              value={selectedFilters.category}
              onChange={(e) => setSelectedFilters({...selectedFilters, category: e.target.value})}
              className="w-full bg-black/40 border-2 border-gold/30 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none transition-all duration-300 font-sans cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-sans font-semibold text-gold mb-2">Price Range</label>
            <select
              value={selectedFilters.priceRange}
              onChange={(e) => setSelectedFilters({...selectedFilters, priceRange: e.target.value})}
              className="w-full bg-black/40 border-2 border-gold/30 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none transition-all duration-300 font-sans cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="under150">Under R150</option>
              <option value="150-200">R150 - R200</option>
              <option value="over200">Over R200</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-sans font-semibold text-gold mb-2">Sort By</label>
            <select
              value={selectedFilters.sortBy}
              onChange={(e) => setSelectedFilters({...selectedFilters, sortBy: e.target.value})}
              className="w-full bg-black/40 border-2 border-gold/30 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none transition-all duration-300 font-sans cursor-pointer"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full bg-gold/20 border-2 border-gold/50 text-gold px-4 py-2 rounded-lg font-sans font-semibold hover:bg-gold/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Filter size={18} />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedFilters.category !== 'all' || selectedFilters.priceRange !== 'all') && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gold/20">
            <span className="text-sm text-gray-400 font-sans">Active filters:</span>
            {searchQuery && (
              <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-sans flex items-center gap-1">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-white">
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedFilters.category !== 'all' && (
              <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-sans flex items-center gap-1">
                {selectedFilters.category}
                <button onClick={() => setSelectedFilters({...selectedFilters, category: 'all'})} className="hover:text-white">
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedFilters.priceRange !== 'all' && (
              <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-sans flex items-center gap-1">
                {selectedFilters.priceRange === 'under150' ? 'Under R150' :
                 selectedFilters.priceRange === '150-200' ? 'R150-R200' : 'Over R200'}
                <button onClick={() => setSelectedFilters({...selectedFilters, priceRange: 'all'})} className="hover:text-white">
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  const ProductGrid = ({ products, title }) => {
    const filteredProducts = filterAndSortProducts(products);

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-16 relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl text-center mb-8 text-gradient font-bold tracking-wide">{title}</h1>

          {/* Search and Filter Bar */}
          <SearchAndFilterBar />

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-gray-400 font-sans">
              Showing <span className="text-gold font-bold">{filteredProducts.length}</span> of <span className="text-gold font-bold">{products.length}</span> fragrances
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 animate-fadeIn">
              <Search size={64} className="mx-auto mb-4 text-gold/30" />
              <h3 className="text-2xl font-serif font-bold text-white mb-2">No fragrances found</h3>
              <p className="text-gray-400 font-sans mb-6">Try adjusting your search or filters</p>
              <button
                onClick={resetFilters}
                className="luxury-gradient text-black px-6 py-3 rounded-lg font-sans font-bold hover:scale-105 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="glass-morphism rounded-xl luxury-shadow overflow-hidden hover:luxury-shadow-hover transition-all duration-400 cursor-pointer transform hover:-translate-y-2 hover:scale-105 group relative card-glow"
                  onClick={() => {
                    setSelectedProduct(product);
                    setCurrentPage('product');
                    trackProductView(product);
                  }}
                >
                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-gold/30 hover:bg-black/80 hover:scale-110 transition-all duration-300 group/heart"
                    title={isInWishlist(product.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart
                      size={20}
                      className={`transition-all duration-300 ${
                        isInWishlist(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gold group-hover/heart:text-red-400'
                      }`}
                    />
                  </button>

                  <div className="h-48 flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(244, 228, 193, 0.25) 100%)' }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(244, 228, 193, 0.4) 100%)' }}></div>
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[product.mainImageIndex || 0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400 relative z-10" />
                    ) : (
                      <div className="text-6xl group-hover:scale-110 transition-transform duration-400 relative z-10">🧴</div>
                    )}

                    {/* Quick View Button - appears on hover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 luxury-gradient text-black px-4 py-2 rounded-lg font-sans font-bold luxury-shadow"
                    >
                      Quick View
                    </button>
                  </div>
                  <div className="p-5 relative">
                    <h3 className="font-serif font-bold text-lg mb-1 transition-colors duration-300 text-white">{product.name}</h3>
                    <p className="text-sm mb-2 font-sans font-medium" style={{ color: '#D4AF37' }}>{product.category}</p>
                    {/* Star Rating */}
                    <div className="mb-2">
                      <StarRating
                        rating={parseFloat(getAverageRating(product.id))}
                        size={14}
                        showNumber={true}
                        reviewCount={getReviewCount(product.id)}
                      />
                    </div>
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
          )}
        </div>
      </div>
    );
  };

  // Wishlist/Favorites Page
  const WishlistPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-16 relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl mb-4 text-gradient font-bold tracking-wide flex items-center justify-center gap-3">
              <Heart className="fill-red-500 text-red-500" size={48} />
              My Favorites
            </h1>
            <p className="text-gray-400 font-sans text-lg">
              {wishlist.length === 0
                ? "You haven't added any favorites yet"
                : `${wishlist.length} ${wishlist.length === 1 ? 'fragrance' : 'fragrances'} you love`
              }
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20 animate-fadeIn">
              <Heart size={80} className="mx-auto mb-6 text-gold/20" />
              <h3 className="text-2xl font-serif font-bold text-white mb-3">Your wishlist is empty</h3>
              <p className="text-gray-400 font-sans mb-8 max-w-md mx-auto">
                Start adding fragrances to your favorites by clicking the heart icon on any product
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setCurrentPage('forHer')}
                  className="luxury-gradient text-black px-8 py-3 rounded-lg font-sans font-bold hover:scale-105 transition-all duration-300"
                >
                  Shop For Her
                </button>
                <button
                  onClick={() => setCurrentPage('forHim')}
                  className="glass-morphism text-white border-2 border-gold px-8 py-3 rounded-lg font-sans font-bold hover:scale-105 transition-all duration-300"
                >
                  Shop For Him
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Clear All Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => {
                    setWishlist([]);
                    addToast('Cleared all favorites', 'info');
                  }}
                  className="text-red-400 hover:text-red-300 transition-colors duration-300 flex items-center gap-2 font-sans"
                >
                  <Trash2 size={18} />
                  Clear All Favorites
                </button>
              </div>

              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((product, index) => (
                  <div
                    key={product.id}
                    className="glass-morphism rounded-xl luxury-shadow overflow-hidden hover:luxury-shadow-hover transition-all duration-400 cursor-pointer transform hover:-translate-y-2 hover:scale-105 group relative card-glow animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentPage('product');
                      trackProductView(product);
                    }}
                  >
                    {/* Remove from Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/80 backdrop-blur-sm border border-red-500/50 hover:bg-red-500/20 hover:scale-110 transition-all duration-300"
                      title="Remove from favorites"
                    >
                      <Heart size={20} className="fill-red-500 text-red-500" />
                    </button>

                    <div className="h-48 flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(244, 228, 193, 0.25) 100%)' }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(244, 228, 193, 0.4) 100%)' }}></div>
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[product.mainImageIndex || 0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400 relative z-10" />
                      ) : (
                        <div className="text-6xl group-hover:scale-110 transition-transform duration-400 relative z-10">🧴</div>
                      )}
                    </div>
                    <div className="p-5 relative">
                      <h3 className="font-serif font-bold text-lg mb-1 transition-colors duration-300 text-white">{product.name}</h3>
                      <p className="text-sm mb-2 font-sans font-medium" style={{ color: '#D4AF37' }}>{product.category}</p>
                      {/* Star Rating */}
                      <div className="mb-2">
                        <StarRating
                          rating={parseFloat(getAverageRating(product.id))}
                          size={14}
                          showNumber={true}
                          reviewCount={getReviewCount(product.id)}
                        />
                      </div>
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
            </>
          )}
        </div>
      </div>
    );
  };

  const ProductPage = () => {
    if (!selectedProduct) return null;

    const [currentImageIndex, setCurrentImageIndex] = useState(selectedProduct.mainImageIndex || 0);
    const hasImages = selectedProduct.images && selectedProduct.images.length > 0;

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-12 relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Navigation is now in the header, no need for duplicate back button */}

          <div className="glass-morphism rounded-xl luxury-shadow overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Image Gallery */}
              <div>
                <div className="rounded-xl h-96 flex items-center justify-center relative overflow-hidden mb-4" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(244, 228, 193, 0.3) 100%)' }}>
                  {hasImages ? (
                    <img src={selectedProduct.images[currentImageIndex]} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-9xl">🧴</div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {hasImages && selectedProduct.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {selectedProduct.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex ? 'border-gold scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        style={index === currentImageIndex ? { borderColor: '#D4AF37' } : {}}
                      >
                        <img src={img} alt={`${selectedProduct.name} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Reference Image */}
                {selectedProduct.referenceImage && selectedProduct.showReference && (
                  <div className="mt-4 p-4 glass-morphism rounded-lg border-2" style={{ borderColor: '#D4AF37' }}>
                    <h4 className="text-sm font-semibold mb-2 text-white font-sans">Original Designer Reference:</h4>
                    <img src={selectedProduct.referenceImage} alt="Reference" className="w-full h-48 object-contain rounded-lg" />
                  </div>
                )}
              </div>

              <div>
                <h1 className="font-serif text-3xl md:text-4xl mb-2 font-bold text-white">{selectedProduct.name}</h1>
                <p className="text-xl mb-4 font-sans font-medium" style={{ color: '#D4AF37' }}>{selectedProduct.category}</p>
                <p className="mb-6 leading-relaxed font-sans" style={{ color: '#D4AF37', opacity: 0.9 }}>{selectedProduct.description}</p>

                <div className="p-4 rounded-lg mb-6 glass-morphism" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                  <h3 className="font-serif font-bold mb-2 text-white">Notes:</h3>
                  <p className="font-sans" style={{ color: '#D4AF37' }}>{selectedProduct.notes}</p>
                </div>

                <h3 className="font-serif font-bold text-xl mb-4 text-white">{siteContent.sections.selectSize}</h3>
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
                    <strong>Note:</strong> {siteContent.sections.productDisclaimer}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="p-8 border-t-2 border-gold/20">
              <div className="mb-8">
                <h2 className="font-serif text-3xl font-bold text-white mb-4">Customer Reviews</h2>
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gradient mb-2">
                      {getAverageRating(selectedProduct.id) || '0.0'}
                    </div>
                    <StarRating
                      rating={parseFloat(getAverageRating(selectedProduct.id))}
                      size={20}
                    />
                    <p className="text-sm text-gray-400 mt-2 font-sans">
                      {getReviewCount(selectedProduct.id)} {getReviewCount(selectedProduct.id) === 1 ? 'review' : 'reviews'}
                    </p>
                  </div>
                  <div className="flex-1">
                    <button
                      onClick={() => {
                        const name = prompt('Your name:');
                        if (!name) return;
                        const rating = prompt('Rating (1-5 stars):');
                        if (!rating || rating < 1 || rating > 5) return;
                        const comment = prompt('Your review:');
                        if (!comment) return;
                        addReview(selectedProduct.id, { name, rating: parseInt(rating), comment });
                      }}
                      className="luxury-gradient text-black px-6 py-3 rounded-lg font-sans font-bold hover:scale-105 transition-all duration-300 luxury-shadow"
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {(reviews[selectedProduct.id] || []).length === 0 ? (
                  <div className="text-center py-12 glass-morphism rounded-lg">
                    <Star size={48} className="mx-auto mb-4 text-gold/30" />
                    <p className="text-gray-400 font-sans text-lg">No reviews yet. Be the first to review this fragrance!</p>
                  </div>
                ) : (
                  (reviews[selectedProduct.id] || []).map((review) => (
                    <div key={review.id} className="glass-morphism rounded-lg p-6 border-2 border-gold/20 hover:border-gold/40 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-sans font-bold text-white">{review.name}</h4>
                            {review.verified && (
                              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-sans font-semibold border border-green-500/30">
                                ✓ Verified Purchase
                              </span>
                            )}
                          </div>
                          <StarRating rating={review.rating} size={14} />
                        </div>
                        <span className="text-sm text-gray-500 font-sans">{review.date}</span>
                      </div>
                      <p className="text-gray-300 font-sans leading-relaxed">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Related Products Section */}
            <div className="p-8 border-t-2 border-gold/20">
              <h2 className="font-serif text-3xl font-bold text-white mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {getRelatedProducts(selectedProduct, 4).map((product) => (
                  <div
                    key={product.id}
                    className="glass-morphism rounded-xl luxury-shadow overflow-hidden hover:luxury-shadow-hover transition-all duration-400 cursor-pointer transform hover:-translate-y-2 hover:scale-105 group relative card-glow animate-fadeIn"
                    onClick={() => {
                      setSelectedProduct(product);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      trackProductView(product);
                    }}
                  >
                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-gold/30 hover:bg-black/80 hover:scale-110 transition-all duration-300 group/heart"
                      title={isInWishlist(product.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart
                        size={16}
                        className={`transition-all duration-300 ${
                          isInWishlist(product.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gold group-hover/heart:text-red-400'
                        }`}
                      />
                    </button>

                    <div className="h-40 flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(244, 228, 193, 0.25) 100%)' }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(244, 228, 193, 0.4) 100%)' }}></div>
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[product.mainImageIndex || 0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400 relative z-10" />
                      ) : (
                        <div className="text-5xl group-hover:scale-110 transition-transform duration-400 relative z-10">🧴</div>
                      )}
                    </div>
                    <div className="p-4 relative">
                      <h3 className="font-serif font-bold text-base mb-1 transition-colors duration-300 text-white line-clamp-1">{product.name}</h3>
                      <p className="text-xs mb-2 font-sans font-medium" style={{ color: '#D4AF37' }}>{product.category}</p>
                      {/* Star Rating */}
                      <div className="mb-2">
                        <StarRating
                          rating={parseFloat(getAverageRating(product.id))}
                          size={12}
                          showNumber={false}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gradient font-serif">From R40</span>
                      </div>
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

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-16 relative overflow-hidden">
      <div className="absolute inset-0 texture-overlay opacity-20"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-12 text-gradient font-bold tracking-wide">{siteContent.about.heading}</h1>

        <div className="glass-morphism rounded-xl luxury-shadow p-8 mb-8">
          <p className="text-lg leading-relaxed mb-6 font-sans text-white">
            {siteContent.about.intro}
          </p>

          <p className="text-lg leading-relaxed mb-6 font-sans text-white">
            {siteContent.about.story}
          </p>

          <p className="text-lg leading-relaxed mb-6 font-sans text-white">
            {siteContent.about.mission}
          </p>

          <p className="text-lg leading-relaxed font-sans text-white">
            {siteContent.about.quality}
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
    const [adminTab, setAdminTab] = useState('products'); // 'products' or 'cms'
    const [newProduct, setNewProduct] = useState({
      name: '',
      category: '',
      notes: '',
      description: '',
      images: [],
      mainImageIndex: 0,
      referenceImage: '',
      showReference: true
    });
    const [selectedCategory, setSelectedCategory] = useState('forHer');
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddProduct = () => {
      if (newProduct.name && newProduct.category && newProduct.description) {
        addNewProduct(selectedCategory, newProduct);
        setNewProduct({ name: '', category: '', notes: '', description: '', images: [], mainImageIndex: 0, referenceImage: '', showReference: true });
        addToast('Product added successfully!', 'success');
      } else {
        addToast('Please fill in all required fields', 'error');
      }
    };

    const handleUpdateProduct = () => {
      if (editingProduct) {
        updateProduct(selectedCategory, editingProduct.id, newProduct);
        setEditingProduct(null);
        setNewProduct({ name: '', category: '', notes: '', description: '', images: [], mainImageIndex: 0, referenceImage: '', showReference: true });
        addToast('Product updated successfully!', 'success');
      }
    };

    const startEditing = (product) => {
      setEditingProduct(product);
      setNewProduct({
        name: product.name,
        category: product.category,
        notes: product.notes,
        description: product.description,
        images: product.images || [],
        mainImageIndex: product.mainImageIndex || 0,
        referenceImage: product.referenceImage || '',
        showReference: product.showReference !== undefined ? product.showReference : true
      });
    };

    const handleImageAdd = (imageUrl) => {
      if (imageUrl.trim()) {
        setNewProduct(prev => ({
          ...prev,
          images: [...prev.images, imageUrl.trim()]
        }));
      }
    };

    const handleImageRemove = (index) => {
      setNewProduct(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
        mainImageIndex: prev.mainImageIndex >= prev.images.length - 1 ? 0 : prev.mainImageIndex
      }));
    };

    const handleSetMainImage = (index) => {
      setNewProduct(prev => ({
        ...prev,
        mainImageIndex: index
      }));
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-12 relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gradient font-serif">Admin Panel</h1>
            <button
              onClick={() => { setIsAdmin(false); setCurrentPage('home'); }}
              className="glass-morphism text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
              style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
            >
              Logout
            </button>
          </div>

          {/* Admin Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setAdminTab('products')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                adminTab === 'products'
                  ? 'luxury-gradient text-black'
                  : 'glass-morphism text-white hover:scale-105'
              }`}
              style={adminTab !== 'products' ? { borderColor: '#D4AF37', borderWidth: '2px' } : {}}
            >
              Product Management
            </button>
            <button
              onClick={() => setAdminTab('pageBuilder')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                adminTab === 'pageBuilder'
                  ? 'luxury-gradient text-black'
                  : 'glass-morphism text-white hover:scale-105'
              }`}
              style={adminTab !== 'pageBuilder' ? { borderColor: '#D4AF37', borderWidth: '2px' } : {}}
            >
              📐 Page Builder
            </button>
            <button
              onClick={() => setAdminTab('cms')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                adminTab === 'cms'
                  ? 'luxury-gradient text-black'
                  : 'glass-morphism text-white hover:scale-105'
              }`}
              style={adminTab !== 'cms' ? { borderColor: '#D4AF37', borderWidth: '2px' } : {}}
            >
              Content Management
            </button>
            <button
              onClick={() => {
                setAdminTab('imageLibrary');
                if (googleDriveConfig.authenticated) {
                  fetchImagesFromGoogleDrive();
                }
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                adminTab === 'imageLibrary'
                  ? 'luxury-gradient text-black'
                  : 'glass-morphism text-white hover:scale-105'
              }`}
              style={adminTab !== 'imageLibrary' ? { borderColor: '#D4AF37', borderWidth: '2px' } : {}}
            >
              📸 Image Library
            </button>
            <button
              onClick={() => setAdminTab('themeSettings')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                adminTab === 'themeSettings'
                  ? 'luxury-gradient text-black'
                  : 'glass-morphism text-white hover:scale-105'
              }`}
              style={adminTab !== 'themeSettings' ? { borderColor: '#D4AF37', borderWidth: '2px' } : {}}
            >
              ✨ Theme Settings
            </button>
            <button
              onClick={() => setAdminTab('settings')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                adminTab === 'settings'
                  ? 'luxury-gradient text-black'
                  : 'glass-morphism text-white hover:scale-105'
              }`}
              style={adminTab !== 'settings' ? { borderColor: '#D4AF37', borderWidth: '2px' } : {}}
            >
              Google Drive Settings
            </button>
          </div>

          {/* Product Management Tab */}
          {adminTab === 'products' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Add/Edit Product Form */}
            <div className="glass-morphism rounded-xl luxury-shadow p-6">
              <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: '#D4AF37' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2 text-white font-sans">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white"
                    style={{ borderColor: '#D4AF37' }}
                  >
                    <option value="forHer" className="bg-black">For Her</option>
                    <option value="forHim" className="bg-black">For Him</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-2 text-white font-sans">Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                    style={{ borderColor: '#D4AF37' }}
                    placeholder="e.g., Chanel Chance"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2 text-white font-sans">Category Type *</label>
                  <input
                    type="text"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                    style={{ borderColor: '#D4AF37' }}
                    placeholder="e.g., Classic & Timeless"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2 text-white font-sans">Notes</label>
                  <input
                    type="text"
                    value={newProduct.notes}
                    onChange={(e) => setNewProduct({...newProduct, notes: e.target.value})}
                    className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                    style={{ borderColor: '#D4AF37' }}
                    placeholder="e.g., Pink Pepper, Jasmine, Amber Patchouli, Vanilla"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2 text-white font-sans">Description *</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400 h-24"
                    style={{ borderColor: '#D4AF37' }}
                    placeholder="Seductive description that captures the essence..."
                  />
                </div>

                {/* Product Images */}
                <div className="border-2 rounded-lg p-4 bg-black/20" style={{ borderColor: '#D4AF37' }}>
                  <label className="block font-medium mb-3 text-white font-sans">Product Images</label>

                  <div className="space-y-3">
                    {/* Upload Options */}
                    {googleDriveConfig.authenticated ? (
                      <div>
                        {/* File Upload Button */}
                        <label className="block">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={async (e) => {
                              const files = Array.from(e.target.files);
                              if (files.length === 0) return;

                              addToast(`Uploading ${files.length} image(s)...`, 'info');

                              for (const file of files) {
                                const url = await uploadImageToGoogleDrive(file);
                                if (url) {
                                  handleImageAdd(url);
                                }
                              }

                              addToast('Images uploaded successfully!', 'success');
                              e.target.value = ''; // Reset input
                            }}
                          />
                          <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-black/40 transition-all duration-300"
                            style={{ borderColor: '#D4AF37' }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                            }}
                            onDragLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '';
                            }}
                            onDrop={async (e) => {
                              e.preventDefault();
                              e.currentTarget.style.backgroundColor = '';

                              const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
                              if (files.length === 0) {
                                addToast('Please drop image files only', 'error');
                                return;
                              }

                              addToast(`Uploading ${files.length} image(s)...`, 'info');

                              for (const file of files) {
                                const url = await uploadImageToGoogleDrive(file);
                                if (url) {
                                  handleImageAdd(url);
                                }
                              }

                              addToast('Images uploaded successfully!', 'success');
                            }}
                          >
                            <div className="text-4xl mb-2">📸</div>
                            <p className="text-white font-semibold mb-1">Click to upload or drag & drop</p>
                            <p className="text-xs text-gray-400">Upload images to Google Drive automatically</p>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Enter image URL (or connect Google Drive to upload)"
                          className="flex-1 p-2 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400 text-sm"
                          style={{ borderColor: '#D4AF37' }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleImageAdd(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          onClick={(e) => {
                            const input = e.target.previousElementSibling;
                            handleImageAdd(input.value);
                            input.value = '';
                          }}
                          className="luxury-gradient text-black px-4 py-2 rounded-lg font-semibold text-sm hover:scale-105 transition-all duration-300"
                        >
                          Add
                        </button>
                      </div>
                    )}

                    {/* Image List */}
                    {newProduct.images.length > 0 && (
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {newProduct.images.map((img, index) => (
                          <div key={index} className="flex items-center space-x-2 bg-black/40 p-2 rounded-lg">
                            <img src={img} alt={`Product ${index + 1}`} className="w-12 h-12 object-cover rounded" />
                            <span className="flex-1 text-xs text-gray-300 truncate font-sans">{img}</span>
                            <button
                              onClick={() => handleSetMainImage(index)}
                              className={`px-3 py-1 text-xs rounded font-semibold transition-all duration-300 ${
                                index === newProduct.mainImageIndex
                                  ? 'luxury-gradient text-black'
                                  : 'glass-morphism text-white hover:scale-105'
                              }`}
                              style={index !== newProduct.mainImageIndex ? { borderColor: '#D4AF37', borderWidth: '1px' } : {}}
                            >
                              {index === newProduct.mainImageIndex ? 'Main' : 'Set Main'}
                            </button>
                            <button
                              onClick={() => handleImageRemove(index)}
                              className="glass-morphism text-white px-3 py-1 text-xs rounded hover:scale-105 transition-all duration-300"
                              style={{ borderColor: '#D4AF37', borderWidth: '1px' }}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Reference Image */}
                <div className="border-2 rounded-lg p-4 bg-black/20" style={{ borderColor: '#D4AF37' }}>
                  <label className="block font-medium mb-3 text-white font-sans">Reference Image (Original Designer)</label>

                  <div className="space-y-3">
                    {googleDriveConfig.authenticated ? (
                      <label className="block">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            addToast('Uploading reference image...', 'info');
                            const url = await uploadImageToGoogleDrive(file);
                            if (url) {
                              setNewProduct({...newProduct, referenceImage: url});
                              addToast('Reference image uploaded!', 'success');
                            }
                            e.target.value = '';
                          }}
                        />
                        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-black/40 transition-all duration-300"
                          style={{ borderColor: '#D4AF37' }}>
                          <div className="text-2xl mb-1">🖼️</div>
                          <p className="text-white text-sm font-semibold">Click to upload reference image</p>
                          <p className="text-xs text-gray-400">Original designer perfume bottle</p>
                        </div>
                      </label>
                    ) : (
                      <input
                        type="text"
                        value={newProduct.referenceImage}
                        onChange={(e) => setNewProduct({...newProduct, referenceImage: e.target.value})}
                        className="w-full p-2 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400 text-sm"
                        style={{ borderColor: '#D4AF37' }}
                        placeholder="Enter reference image URL (or connect Google Drive to upload)"
                      />
                    )}

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="showReference"
                        checked={newProduct.showReference}
                        onChange={(e) => setNewProduct({...newProduct, showReference: e.target.checked})}
                        className="w-4 h-4 rounded"
                        style={{ accentColor: '#D4AF37' }}
                      />
                      <label htmlFor="showReference" className="text-sm text-white font-sans">Show reference image on product page</label>
                    </div>

                    {newProduct.referenceImage && (
                      <div className="mt-2">
                        <img src={newProduct.referenceImage} alt="Reference" className="w-24 h-24 object-cover rounded-lg border-2" style={{ borderColor: '#D4AF37' }} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  {editingProduct ? (
                    <>
                      <button
                        onClick={handleUpdateProduct}
                        className="flex-1 luxury-gradient text-black py-3 font-semibold hover:scale-105 transition-all duration-300 rounded-lg"
                      >
                        Update Product
                      </button>
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setNewProduct({ name: '', category: '', notes: '', description: '', images: [], mainImageIndex: 0, referenceImage: '', showReference: true });
                        }}
                        className="flex-1 glass-morphism text-white py-3 font-semibold hover:scale-105 transition-all duration-300 rounded-lg"
                        style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleAddProduct}
                      className="w-full luxury-gradient text-black py-3 font-semibold hover:scale-105 transition-all duration-300 rounded-lg"
                    >
                      Add Product
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="glass-morphism rounded-xl luxury-shadow p-6">
              <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: '#D4AF37' }}>Manage Products</h2>

              <div className="mb-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white"
                  style={{ borderColor: '#D4AF37' }}
                >
                  <option value="forHer" className="bg-black">For Her ({productList.forHer.length} products)</option>
                  <option value="forHim" className="bg-black">For Him ({productList.forHim.length} products)</option>
                </select>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {productList[selectedCategory].map(product => (
                  <div key={product.id} className="border-2 rounded-lg p-4 flex justify-between items-start bg-black/20" style={{ borderColor: '#D4AF37' }}>
                    <div className="flex-1">
                      <h3 className="font-bold text-white font-sans">{product.name}</h3>
                      <p className="text-sm font-sans" style={{ color: '#D4AF37' }}>{product.category}</p>
                      <p className="text-xs text-gray-400 mt-1 font-sans">{product.description.substring(0, 100)}...</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => startEditing(product)}
                        className="glass-morphism text-white px-4 py-2 text-sm rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
                        style={{ borderColor: '#D4AF37', borderWidth: '1px' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this product?')) {
                            deleteProduct(selectedCategory, product.id);
                          }
                        }}
                        className="glass-morphism text-white px-4 py-2 text-sm rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
                        style={{ borderColor: '#D4AF37', borderWidth: '1px' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          {/* Page Builder Tab */}
          {adminTab === 'pageBuilder' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Action Buttons Bar - Enhanced */}
              <div className="glass-morphism rounded-xl luxury-shadow p-5 border border-gold/20">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    {hasUnsavedChanges ? (
                      <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg border border-yellow-500/40 animate-pulse">
                        <span className="text-yellow-400 text-lg">⚠️</span>
                        <span className="text-yellow-300 text-sm font-bold font-sans">Unsaved Changes</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-lg border border-green-500/40">
                        <span className="text-green-400 text-lg">✓</span>
                        <span className="text-green-300 text-sm font-bold font-sans">All Changes Saved</span>
                      </div>
                    )}
                    <div className="text-gray-400 text-sm font-sans">
                      {siteContent.contentBlocks.length} {siteContent.contentBlocks.length === 1 ? 'block' : 'blocks'}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {editingBlock && (
                      <button
                        onClick={cancelBlockEditing}
                        className="px-5 py-2.5 rounded-lg font-bold glass-morphism text-white hover:scale-105 hover:shadow-lg transition-all duration-300 font-sans"
                        style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                      >
                        <span className="mr-1">✖️</span> Cancel
                      </button>
                    )}
                    {hasUnsavedChanges && (
                      <button
                        onClick={discardChanges}
                        className="px-5 py-2.5 rounded-lg font-bold glass-morphism text-red-400 hover:scale-105 hover:shadow-lg transition-all duration-300 font-sans"
                        style={{ borderColor: '#ff4444', borderWidth: '2px' }}
                      >
                        <span className="mr-1">↩️</span> Discard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        localStorage.setItem('siteContent', JSON.stringify(siteContent));
                        setHasUnsavedChanges(false);
                        addToast('💾 Changes saved successfully!', 'success');
                      }}
                      className="px-5 py-2.5 rounded-lg font-bold luxury-gradient text-black hover:scale-105 hover:shadow-xl transition-all duration-300 font-sans"
                    >
                      <span className="mr-1">💾</span> Save Changes
                    </button>
                  </div>
                </div>
              </div>

              {/* View Mode Toggle - Enhanced */}
              <div className="glass-morphism rounded-xl luxury-shadow p-4 border border-gold/20">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPageBuilderView('visual')}
                      className={`px-5 py-2.5 rounded-lg font-bold transition-all duration-300 font-sans ${
                        pageBuilderView === 'visual'
                          ? 'luxury-gradient text-black shadow-lg scale-105'
                          : 'glass-morphism text-white hover:scale-105 hover:shadow-md'
                      }`}
                      style={pageBuilderView !== 'visual' ? { borderColor: '#D4AF37', borderWidth: '2px' } : {}}
                    >
                      <span className="mr-2">🎨</span> Visual Builder
                    </button>
                    <button
                      onClick={() => setPageBuilderView('list')}
                      className={`px-5 py-2.5 rounded-lg font-bold transition-all duration-300 font-sans ${
                        pageBuilderView === 'list'
                          ? 'luxury-gradient text-black shadow-lg scale-105'
                          : 'glass-morphism text-white hover:scale-105 hover:shadow-md'
                      }`}
                      style={pageBuilderView !== 'list' ? { borderColor: '#D4AF37', borderWidth: '2px' } : {}}
                    >
                      <span className="mr-2">📋</span> List View
                    </button>
                  </div>

                  {/* Responsive Preview Toggle (Visual Mode Only) - Enhanced */}
                  {pageBuilderView === 'visual' && (
                    <div className="flex gap-2 bg-black/40 p-1 rounded-lg">
                      <button
                        onClick={() => setPreviewMode('desktop')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 font-sans ${
                          previewMode === 'desktop' ? 'luxury-gradient text-black shadow-md' : 'text-gray-400 hover:text-white'
                        }`}
                        title="Desktop Preview (1920px)"
                      >
                        <span className="text-lg mr-1">🖥️</span> Desktop
                      </button>
                      <button
                        onClick={() => setPreviewMode('tablet')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 font-sans ${
                          previewMode === 'tablet' ? 'luxury-gradient text-black shadow-md' : 'text-gray-400 hover:text-white'
                      }`}
                      title="Tablet Preview (768px)"
                    >
                      <span className="text-lg mr-1">📱</span> Tablet
                    </button>
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 font-sans ${
                        previewMode === 'mobile' ? 'luxury-gradient text-black shadow-md' : 'text-gray-400 hover:text-white'
                      }`}
                      title="Mobile Preview (375px)"
                    >
                      <span className="text-lg mr-1">📱</span> Mobile
                    </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Visual Builder Mode - Split Screen */}
              {pageBuilderView === 'visual' && (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Left Panel - Templates & Block Library (1/3 width) */}
                  <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto">
                    {/* Quick Templates Section */}
                    <div className="glass-morphism rounded-xl luxury-shadow p-4">
                      <h3 className="text-lg font-bold mb-3 font-serif" style={{ color: '#D4AF37' }}>⚡ Quick Templates</h3>
                      <div className="space-y-2">
                        <button onClick={() => applyTemplate('weekend-special')} className="w-full glass-morphism p-3 rounded-lg hover:scale-105 transition-all duration-300 text-left" style={{ borderColor: '#D4AF37', borderWidth: '1px' }}>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">🎉</span>
                            <div>
                              <h4 className="font-bold text-white text-sm font-sans">Weekend Special</h4>
                              <p className="text-xs text-gray-400 font-sans">30% off + products</p>
                            </div>
                          </div>
                        </button>
                        <button onClick={() => applyTemplate('holiday-sale')} className="w-full glass-morphism p-3 rounded-lg hover:scale-105 transition-all duration-300 text-left" style={{ borderColor: '#D4AF37', borderWidth: '1px' }}>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">🎄</span>
                            <div>
                              <h4 className="font-bold text-white text-sm font-sans">Holiday Sale</h4>
                              <p className="text-xs text-gray-400 font-sans">Countdown + code</p>
                            </div>
                          </div>
                        </button>
                        <button onClick={() => applyTemplate('flash-sale')} className="w-full glass-morphism p-3 rounded-lg hover:scale-105 transition-all duration-300 text-left" style={{ borderColor: '#D4AF37', borderWidth: '1px' }}>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">⚡</span>
                            <div>
                              <h4 className="font-bold text-white text-sm font-sans">Flash Sale</h4>
                              <p className="text-xs text-gray-400 font-sans">Urgent banner</p>
                            </div>
                          </div>
                        </button>
                        <button onClick={() => applyTemplate('bogo-promotion')} className="w-full glass-morphism p-3 rounded-lg hover:scale-105 transition-all duration-300 text-left" style={{ borderColor: '#D4AF37', borderWidth: '1px' }}>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">🎁</span>
                            <div>
                              <h4 className="font-bold text-white text-sm font-sans">BOGO Deal</h4>
                              <p className="text-xs text-gray-400 font-sans">Buy 1 get 1 free</p>
                            </div>
                          </div>
                        </button>
                        <button onClick={() => applyTemplate('vip-special')} className="w-full glass-morphism p-3 rounded-lg hover:scale-105 transition-all duration-300 text-left" style={{ borderColor: '#D4AF37', borderWidth: '1px' }}>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">👑</span>
                            <div>
                              <h4 className="font-bold text-white text-sm font-sans">VIP Special</h4>
                              <p className="text-xs text-gray-400 font-sans">Exclusive offer</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Block Library Section - Enhanced */}
                    <div className="glass-morphism rounded-xl luxury-shadow p-5 border border-gold/20">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">📦</span>
                        <h3 className="text-xl font-bold font-serif" style={{ color: '#D4AF37' }}>Content Blocks</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-4 font-sans bg-black/30 p-3 rounded-lg border border-gold/10">
                        💡 <strong>Tip:</strong> Click to add, or hover to preview insertion position
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => addContentBlock('promo-banner')}
                          onMouseEnter={() => showInsertionPreview('promo-banner', siteContent.contentBlocks.length)}
                          onMouseLeave={() => setInsertionPosition(null)}
                          className="glass-morphism p-4 rounded-lg hover:scale-110 hover:shadow-xl transition-all duration-300 text-center group border-2 border-transparent hover:border-gold"
                        >
                          <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">🎉</div>
                          <h4 className="font-bold text-white text-sm font-sans">Promo Banner</h4>
                          <p className="text-xs text-gray-400 mt-1">Hero promotions</p>
                        </button>
                        <button
                          onClick={() => addContentBlock('announcement')}
                          onMouseEnter={() => showInsertionPreview('announcement', siteContent.contentBlocks.length)}
                          onMouseLeave={() => setInsertionPosition(null)}
                          className="glass-morphism p-4 rounded-lg hover:scale-110 hover:shadow-xl transition-all duration-300 text-center group border-2 border-transparent hover:border-gold"
                        >
                          <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">📢</div>
                          <h4 className="font-bold text-white text-sm font-sans">Announcement</h4>
                          <p className="text-xs text-gray-400 mt-1">Important notices</p>
                        </button>
                        <button
                          onClick={() => addContentBlock('special-offer')}
                          onMouseEnter={() => showInsertionPreview('special-offer', siteContent.contentBlocks.length)}
                          onMouseLeave={() => setInsertionPosition(null)}
                          className="glass-morphism p-4 rounded-lg hover:scale-110 hover:shadow-xl transition-all duration-300 text-center group border-2 border-transparent hover:border-gold"
                        >
                          <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">💎</div>
                          <h4 className="font-bold text-white text-sm font-sans">Special Offer</h4>
                          <p className="text-xs text-gray-400 mt-1">Discount codes</p>
                        </button>
                        <button
                          onClick={() => addContentBlock('featured-products')}
                          onMouseEnter={() => showInsertionPreview('featured-products', siteContent.contentBlocks.length)}
                          onMouseLeave={() => setInsertionPosition(null)}
                          className="glass-morphism p-4 rounded-lg hover:scale-110 hover:shadow-xl transition-all duration-300 text-center group border-2 border-transparent hover:border-gold"
                        >
                          <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">⭐</div>
                          <h4 className="font-bold text-white text-sm font-sans">Featured Products</h4>
                          <p className="text-xs text-gray-400 mt-1">Product showcase</p>
                        </button>
                        <button
                          onClick={() => addContentBlock('image')}
                          onMouseEnter={() => showInsertionPreview('image', siteContent.contentBlocks.length)}
                          onMouseLeave={() => setInsertionPosition(null)}
                          className="glass-morphism p-4 rounded-lg hover:scale-110 hover:shadow-xl transition-all duration-300 text-center group border-2 border-transparent hover:border-gold"
                        >
                          <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">🖼️</div>
                          <h4 className="font-bold text-white text-sm font-sans">Image Block</h4>
                          <p className="text-xs text-gray-400 mt-1">Custom images</p>
                        </button>
                        <button
                          onClick={() => addContentBlock('text')}
                          onMouseEnter={() => showInsertionPreview('text', siteContent.contentBlocks.length)}
                          onMouseLeave={() => setInsertionPosition(null)}
                          className="glass-morphism p-4 rounded-lg hover:scale-110 hover:shadow-xl transition-all duration-300 text-center group border-2 border-transparent hover:border-gold"
                        >
                          <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">📝</div>
                          <h4 className="font-bold text-white text-sm font-sans">Text Block</h4>
                          <p className="text-xs text-gray-400 mt-1">Custom content</p>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Live Preview (2/3 width) */}
                  <div className="lg:col-span-2">
                    <div className="glass-morphism rounded-xl luxury-shadow p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold font-serif" style={{ color: '#D4AF37' }}>👁️ Live Preview</h3>
                        <span className="text-xs text-gray-400 font-sans">{siteContent.contentBlocks.length} blocks</span>
                      </div>

                      {/* Preview Container with Responsive Sizing */}
                      <div className={`mx-auto transition-all duration-300 ${
                        previewMode === 'mobile' ? 'max-w-[375px]' :
                        previewMode === 'tablet' ? 'max-w-[768px]' :
                        'max-w-full'
                      }`}>
                        <div
                          className="bg-black/40 rounded-lg p-4 min-h-[600px] max-h-[800px] overflow-y-auto"
                          onClick={(e) => e.stopPropagation()}
                          onScroll={(e) => e.stopPropagation()}
                        >
                          {siteContent.contentBlocks.length === 0 ? (
                            <div className="text-center py-20">
                              <div className="text-6xl mb-4">📄</div>
                              <p className="text-gray-400 font-sans">No blocks yet. Add blocks or apply a template to get started!</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {siteContent.contentBlocks.map((block, index) => (
                                <React.Fragment key={block.id}>
                                  {/* Insertion Position Indicator - Before Block */}
                                  {insertionPosition === index && (
                                    <div className="relative py-4 animate-pulse">
                                      <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t-4 border-dashed" style={{ borderColor: '#D4AF37' }}></div>
                                      </div>
                                      <div className="relative flex justify-center">
                                        <span className="px-4 py-2 text-sm font-bold rounded-lg luxury-gradient text-black">
                                          ⬇️ New block will be inserted here
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  <div
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDragLeave={handleDragLeave}
                                    onDrop={(e) => handleDrop(e, index)}
                                    onDragEnd={handleDragEnd}
                                    className={`relative group cursor-move transition-all duration-200 ${
                                      draggedBlockIndex === index ? 'opacity-50' : ''
                                    } ${
                                      dragOverIndex === index ? 'border-t-4 border-gold' : ''
                                    }`}
                                  >
                                  {/* Drag Handle & Controls Overlay */}
                                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 pointer-events-auto">
                                    <button
                                      onClick={(e) => { e.stopPropagation(); setEditingBlock(block); }}
                                      className="bg-black/80 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-gold hover:text-black transition-all duration-300"
                                      title="Edit Block"
                                    >
                                      ✏️ Edit
                                    </button>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); toggleBlockVisibility(block.id); }}
                                      className="bg-black/80 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-gold hover:text-black transition-all duration-300"
                                      title={block.visible ? 'Hide' : 'Show'}
                                    >
                                      {block.visible ? '👁️' : '🚫'}
                                    </button>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); deleteContentBlock(block.id); }}
                                      className="bg-black/80 text-red-400 px-3 py-1 rounded text-xs font-semibold hover:bg-red-500 hover:text-white transition-all duration-300"
                                      title="Delete Block"
                                    >
                                      🗑️
                                    </button>
                                  </div>

                                  {/* Block Preview */}
                                  <div className={`${!block.visible ? 'opacity-50' : ''} pointer-events-none`}>
                                    <ContentBlockRenderer
                                      block={block}
                                      allProducts={[...products.forHer, ...products.forHim]}
                                      previewMode={true}
                                    />
                                  </div>

                                  {/* Drag Indicator */}
                                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                </div>
                                </React.Fragment>
                              ))}

                              {/* Insertion Position Indicator - At End */}
                              {insertionPosition === siteContent.contentBlocks.length && (
                                <div className="relative py-4 animate-pulse">
                                  <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t-4 border-dashed" style={{ borderColor: '#D4AF37' }}></div>
                                  </div>
                                  <div className="relative flex justify-center">
                                    <span className="px-4 py-2 text-sm font-bold rounded-lg luxury-gradient text-black">
                                      ⬇️ New block will be added at the end
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* List View Mode - Original Interface */}
              {pageBuilderView === 'list' && (
                <>
              {/* Quick Templates */}
              <div className="glass-morphism rounded-xl luxury-shadow p-6">
                <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: '#D4AF37' }}>Quick Templates</h2>
                <p className="text-gray-400 mb-6 font-sans">Apply pre-made layouts for common scenarios. You can customize after applying.</p>

                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => applyTemplate('weekend-special')}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">🎉</div>
                    <h3 className="font-bold text-white mb-2 font-sans">Weekend Special</h3>
                    <p className="text-sm text-gray-400 font-sans">30% off banner + featured products</p>
                  </button>

                  <button
                    onClick={() => applyTemplate('holiday-sale')}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">🎄</div>
                    <h3 className="font-bold text-white mb-2 font-sans">Holiday Sale</h3>
                    <p className="text-sm text-gray-400 font-sans">Countdown + discount code</p>
                  </button>

                  <button
                    onClick={() => applyTemplate('new-arrivals')}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">✨</div>
                    <h3 className="font-bold text-white mb-2 font-sans">New Arrivals</h3>
                    <p className="text-sm text-gray-400 font-sans">Announcement + product grid</p>
                  </button>

                  <button
                    onClick={() => applyTemplate('seasonal-collection')}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">🌸</div>
                    <h3 className="font-bold text-white mb-2 font-sans">Seasonal Collection</h3>
                    <p className="text-sm text-gray-400 font-sans">Image + featured products</p>
                  </button>

                  <button
                    onClick={() => applyTemplate('flash-sale')}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">⚡</div>
                    <h3 className="font-bold text-white mb-2 font-sans">Flash Sale</h3>
                    <p className="text-sm text-gray-400 font-sans">Urgent countdown banner</p>
                  </button>

                  <button
                    onClick={() => applyTemplate('bogo-promotion')}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">🎁</div>
                    <h3 className="font-bold text-white mb-2 font-sans">BOGO Deal</h3>
                    <p className="text-sm text-gray-400 font-sans">Buy one get one free promotion</p>
                  </button>

                  <button
                    onClick={() => applyTemplate('free-shipping')}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">🚚</div>
                    <h3 className="font-bold text-white mb-2 font-sans">Free Shipping</h3>
                    <p className="text-sm text-gray-400 font-sans">Free delivery promotion</p>
                  </button>

                  <button
                    onClick={() => applyTemplate('vip-special')}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">👑</div>
                    <h3 className="font-bold text-white mb-2 font-sans">VIP Special</h3>
                    <p className="text-sm text-gray-400 font-sans">Exclusive VIP offer</p>
                  </button>

                  <button
                    onClick={() => applyTemplate('clearance-sale')}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">🔥</div>
                    <h3 className="font-bold text-white mb-2 font-sans">Clearance Sale</h3>
                    <p className="text-sm text-gray-400 font-sans">End of season clearance</p>
                  </button>

                  <button
                    onClick={() => applyTemplate('gift-bundle')}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">🎁</div>
                    <h3 className="font-bold text-white mb-2 font-sans">Gift Bundle</h3>
                    <p className="text-sm text-gray-400 font-sans">Curated gift sets</p>
                  </button>

                  <button
                    onClick={() => applyTemplate('limited-edition')}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">🌟</div>
                    <h3 className="font-bold text-white mb-2 font-sans">Limited Edition</h3>
                    <p className="text-sm text-gray-400 font-sans">Exclusive launch announcement</p>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Clear all content blocks?')) {
                        setSiteContent(prev => ({ ...prev, contentBlocks: [] }));
                        addToast('All blocks cleared', 'success');
                      }
                    }}
                    className="glass-morphism p-6 rounded-lg hover:scale-105 transition-all duration-300 text-left border-red-500"
                    style={{ borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">🗑️</div>
                    <h3 className="font-bold text-red-400 mb-2 font-sans">Clear All</h3>
                    <p className="text-sm text-gray-400 font-sans">Remove all blocks</p>
                  </button>
                </div>
              </div>

              {/* Add New Block */}
              <div className="glass-morphism rounded-xl luxury-shadow p-6">
                <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: '#D4AF37' }}>Add Content Block</h2>

                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => addContentBlock('promo-banner')}
                    className="glass-morphism p-4 rounded-lg hover:scale-105 transition-all duration-300 text-center"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">🎉</div>
                    <h3 className="font-bold text-white text-sm font-sans">Promo Banner</h3>
                  </button>

                  <button
                    onClick={() => addContentBlock('announcement')}
                    className="glass-morphism p-4 rounded-lg hover:scale-105 transition-all duration-300 text-center"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">📢</div>
                    <h3 className="font-bold text-white text-sm font-sans">Announcement</h3>
                  </button>

                  <button
                    onClick={() => addContentBlock('special-offer')}
                    className="glass-morphism p-4 rounded-lg hover:scale-105 transition-all duration-300 text-center"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">🎁</div>
                    <h3 className="font-bold text-white text-sm font-sans">Special Offer</h3>
                  </button>

                  <button
                    onClick={() => addContentBlock('featured-products')}
                    className="glass-morphism p-4 rounded-lg hover:scale-105 transition-all duration-300 text-center"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">⭐</div>
                    <h3 className="font-bold text-white text-sm font-sans">Featured Products</h3>
                  </button>

                  <button
                    onClick={() => addContentBlock('image')}
                    className="glass-morphism p-4 rounded-lg hover:scale-105 transition-all duration-300 text-center"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">📸</div>
                    <h3 className="font-bold text-white text-sm font-sans">Image Block</h3>
                  </button>

                  <button
                    onClick={() => addContentBlock('text')}
                    className="glass-morphism p-4 rounded-lg hover:scale-105 transition-all duration-300 text-center"
                    style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                  >
                    <div className="text-3xl mb-2">📝</div>
                    <h3 className="font-bold text-white text-sm font-sans">Text Block</h3>
                  </button>
                </div>
              </div>

              {/* Current Blocks */}
              <div className="glass-morphism rounded-xl luxury-shadow p-6">
                <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: '#D4AF37' }}>
                  Current Blocks ({siteContent.contentBlocks?.length || 0})
                </h2>

                {(!siteContent.contentBlocks || siteContent.contentBlocks.length === 0) ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 mb-4 font-sans">No content blocks yet. Add one above or apply a template!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {siteContent.contentBlocks.map((block, index) => (
                      <div key={block.id} className="bg-black/40 p-4 rounded-lg border-2" style={{ borderColor: block.visible ? '#D4AF37' : '#666' }}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">
                              {block.type === 'promo-banner' && '🎉'}
                              {block.type === 'announcement' && '📢'}
                              {block.type === 'special-offer' && '🎁'}
                              {block.type === 'featured-products' && '⭐'}
                              {block.type === 'image' && '📸'}
                              {block.type === 'text' && '📝'}
                            </span>
                            <div>
                              <h3 className="font-bold text-white font-sans">
                                {block.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                              </h3>
                              <p className="text-xs text-gray-400 font-sans">
                                {block.type === 'promo-banner' && block.title}
                                {block.type === 'announcement' && block.text}
                                {block.type === 'special-offer' && block.title}
                                {block.type === 'featured-products' && block.title}
                                {block.type === 'image' && (block.altText || 'Image')}
                                {block.type === 'text' && block.content?.substring(0, 50)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {/* Move Up */}
                            {index > 0 && (
                              <button
                                onClick={() => moveBlock(index, index - 1)}
                                className="px-3 py-1 text-sm rounded glass-morphism hover:scale-105 transition-all duration-300"
                                style={{ borderColor: '#D4AF37', borderWidth: '1px' }}
                                title="Move Up"
                              >
                                ↑
                              </button>
                            )}

                            {/* Move Down */}
                            {index < siteContent.contentBlocks.length - 1 && (
                              <button
                                onClick={() => moveBlock(index, index + 1)}
                                className="px-3 py-1 text-sm rounded glass-morphism hover:scale-105 transition-all duration-300"
                                style={{ borderColor: '#D4AF37', borderWidth: '1px' }}
                                title="Move Down"
                              >
                                ↓
                              </button>
                            )}

                            {/* Toggle Visibility */}
                            <button
                              onClick={() => toggleBlockVisibility(block.id)}
                              className="px-3 py-1 text-sm rounded glass-morphism hover:scale-105 transition-all duration-300"
                              style={{ borderColor: '#D4AF37', borderWidth: '1px' }}
                              title={block.visible ? 'Hide' : 'Show'}
                            >
                              {block.visible ? '👁️' : '🙈'}
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => setEditingBlock(block.id)}
                              className="px-3 py-1 text-sm rounded luxury-gradient text-black hover:scale-105 transition-all duration-300"
                            >
                              Edit
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => deleteContentBlock(block.id)}
                              className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:scale-105 transition-all duration-300"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Edit Form */}
                        {editingBlock === block.id && (
                          <div
                            className="mt-4 pt-4 border-t-2"
                            style={{ borderColor: '#D4AF37' }}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                          >
                            <h4 className="font-bold text-white mb-4 font-sans">Edit Block</h4>

                            {/* Promo Banner Editor */}
                            {block.type === 'promo-banner' && (
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  value={block.title}
                                  onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Title"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                                <input
                                  type="text"
                                  value={block.subtitle}
                                  onChange={(e) => updateContentBlock(block.id, { subtitle: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Subtitle"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                                <div className="grid grid-cols-2 gap-3">
                                  <select
                                    value={block.backgroundColor}
                                    onChange={(e) => updateContentBlock(block.id, { backgroundColor: e.target.value })}
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                    style={{ borderColor: '#D4AF37' }}
                                  >
                                    <option value="gold">Gold Background</option>
                                    <option value="black">Black Background</option>
                                    <option value="red">Red Background</option>
                                  </select>
                                  <select
                                    value={block.textColor}
                                    onChange={(e) => updateContentBlock(block.id, { textColor: e.target.value })}
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                    style={{ borderColor: '#D4AF37' }}
                                  >
                                    <option value="black">Black Text</option>
                                    <option value="white">White Text</option>
                                    <option value="gold">Gold Text</option>
                                  </select>
                                </div>
                                <input
                                  type="text"
                                  value={block.buttonText}
                                  onChange={(e) => updateContentBlock(block.id, { buttonText: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Button Text"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                                <label className="flex items-center space-x-2 text-white font-sans">
                                  <input
                                    type="checkbox"
                                    checked={block.showCountdown}
                                    onChange={(e) => updateContentBlock(block.id, { showCountdown: e.target.checked })}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{ accentColor: '#D4AF37' }}
                                  />
                                  <span>Show Countdown Timer</span>
                                </label>
                                {block.showCountdown && (
                                  <input
                                    type="date"
                                    value={block.endDate}
                                    onChange={(e) => updateContentBlock(block.id, { endDate: e.target.value })}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                    style={{ borderColor: '#D4AF37' }}
                                  />
                                )}

                                {/* Style Options */}
                                <div className="border-t-2 pt-3 mt-3" style={{ borderColor: '#D4AF37' }}>
                                  <h5 className="text-white font-semibold mb-3 text-sm">🎨 Style Options</h5>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-white text-xs mb-1">Padding</label>
                                      <select
                                        value={block.padding || 'medium'}
                                        onChange={(e) => updateContentBlock(block.id, { padding: e.target.value })}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full p-2 border-2 rounded-lg bg-black/30 text-white text-sm"
                                        style={{ borderColor: '#D4AF37' }}
                                      >
                                        <option value="none">None</option>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-white text-xs mb-1">Margin</label>
                                      <select
                                        value={block.margin || 'medium'}
                                        onChange={(e) => updateContentBlock(block.id, { margin: e.target.value })}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full p-2 border-2 rounded-lg bg-black/30 text-white text-sm"
                                        style={{ borderColor: '#D4AF37' }}
                                      >
                                        <option value="none">None</option>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-white text-xs mb-1">Border Radius</label>
                                      <select
                                        value={block.borderRadius || 'medium'}
                                        onChange={(e) => updateContentBlock(block.id, { borderRadius: e.target.value })}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full p-2 border-2 rounded-lg bg-black/30 text-white text-sm"
                                        style={{ borderColor: '#D4AF37' }}
                                      >
                                        <option value="none">None</option>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                        <option value="full">Full</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-white text-xs mb-1">Shadow</label>
                                      <select
                                        value={block.shadow || 'medium'}
                                        onChange={(e) => updateContentBlock(block.id, { shadow: e.target.value })}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full p-2 border-2 rounded-lg bg-black/30 text-white text-sm"
                                        style={{ borderColor: '#D4AF37' }}
                                      >
                                        <option value="none">None</option>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <button
                                  onClick={() => setEditingBlock(null)}
                                  className="w-full luxury-gradient text-black py-2 rounded-lg font-semibold"
                                >
                                  Done Editing
                                </button>
                              </div>
                            )}

                            {/* Announcement Editor */}
                            {block.type === 'announcement' && (
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  value={block.text}
                                  onChange={(e) => updateContentBlock(block.id, { text: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Announcement text"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                                <input
                                  type="text"
                                  value={block.icon}
                                  onChange={(e) => updateContentBlock(block.id, { icon: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Icon (emoji)"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                                <button
                                  onClick={() => setEditingBlock(null)}
                                  className="w-full luxury-gradient text-black py-2 rounded-lg font-semibold"
                                >
                                  Done Editing
                                </button>
                              </div>
                            )}

                            {/* Special Offer Editor */}
                            {block.type === 'special-offer' && (
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  value={block.title}
                                  onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Title"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                                <input
                                  type="text"
                                  value={block.description}
                                  onChange={(e) => updateContentBlock(block.id, { description: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Description"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                                <input
                                  type="text"
                                  value={block.code}
                                  onChange={(e) => updateContentBlock(block.id, { code: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Discount Code"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                                <input
                                  type="text"
                                  value={block.discount}
                                  onChange={(e) => updateContentBlock(block.id, { discount: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Discount (e.g., 20% OFF)"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                                <button
                                  onClick={() => setEditingBlock(null)}
                                  className="w-full luxury-gradient text-black py-2 rounded-lg font-semibold"
                                >
                                  Done Editing
                                </button>
                              </div>
                            )}

                            {/* Featured Products Editor */}
                            {block.type === 'featured-products' && (
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  value={block.title}
                                  onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Section Title"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                                <select
                                  value={block.columns}
                                  onChange={(e) => updateContentBlock(block.id, { columns: parseInt(e.target.value) })}
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                >
                                  <option value="2">2 Columns</option>
                                  <option value="3">3 Columns</option>
                                  <option value="4">4 Columns</option>
                                </select>
                                <div>
                                  <label className="block text-white mb-2 font-sans">Select Products:</label>
                                  <div className="max-h-48 overflow-y-auto space-y-2 p-2 bg-black/20 rounded-lg">
                                    {[...products.forHer, ...products.forHim].map(product => (
                                      <label key={product.id} className="flex items-center space-x-2 text-white font-sans">
                                        <input
                                          type="checkbox"
                                          checked={block.productIds.includes(product.id)}
                                          onChange={(e) => {
                                            const newIds = e.target.checked
                                              ? [...block.productIds, product.id]
                                              : block.productIds.filter(id => id !== product.id);
                                            updateContentBlock(block.id, { productIds: newIds });
                                          }}
                                          style={{ accentColor: '#D4AF37' }}
                                        />
                                        <span className="text-sm">{product.name} ({product.category})</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                                <button
                                  onClick={() => setEditingBlock(null)}
                                  className="w-full luxury-gradient text-black py-2 rounded-lg font-semibold"
                                >
                                  Done Editing
                                </button>
                              </div>
                            )}

                            {/* Image Editor */}
                            {block.type === 'image' && (
                              <div className="space-y-3">
                                {googleDriveConfig.authenticated ? (
                                  <ImagePicker
                                    value={block.imageUrl}
                                    onChange={(url) => updateContentBlock(block.id, { imageUrl: url })}
                                    imageLibrary={imageLibrary}
                                    loadingImages={loadingImages}
                                    onUpload={async (file) => {
                                      addToast('Uploading image...', 'info');
                                      const url = await uploadImageToGoogleDrive(file);
                                      if (url) {
                                        updateContentBlock(block.id, { imageUrl: url });
                                        addToast('Image uploaded successfully!', 'success');
                                      }
                                    }}
                                    onRefreshLibrary={fetchImagesFromGoogleDrive}
                                    label="Block Image"
                                  />
                                ) : (
                                  <div>
                                    <label className="block text-white mb-2 font-sans">Image URL:</label>
                                    <input
                                      type="text"
                                      value={block.imageUrl}
                                      onChange={(e) => updateContentBlock(block.id, { imageUrl: e.target.value })}
                                      onKeyDown={(e) => e.stopPropagation()}
                                      onClick={(e) => e.stopPropagation()}
                                      placeholder="https://... (or connect Google Drive for image library)"
                                      className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                      style={{ borderColor: '#D4AF37' }}
                                    />
                                  </div>
                                )}

                                <input
                                  type="text"
                                  value={block.altText}
                                  onChange={(e) => updateContentBlock(block.id, { altText: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Alt text (for accessibility)"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />

                                <select
                                  value={block.height}
                                  onChange={(e) => updateContentBlock(block.id, { height: e.target.value })}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                >
                                  <option value="small">Small Height</option>
                                  <option value="medium">Medium Height</option>
                                  <option value="large">Large Height</option>
                                </select>

                                <input
                                  type="text"
                                  value={block.link}
                                  onChange={(e) => updateContentBlock(block.id, { link: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Link URL (optional)"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />

                                <button
                                  onClick={() => setEditingBlock(null)}
                                  className="w-full luxury-gradient text-black py-2 rounded-lg font-semibold"
                                >
                                  Done Editing
                                </button>
                              </div>
                            )}

                            {/* Text Editor */}
                            {block.type === 'text' && (
                              <div className="space-y-3">
                                <textarea
                                  value={block.content}
                                  onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Your text content..."
                                  rows="4"
                                  className="w-full p-2 border-2 rounded-lg bg-black/30 text-white font-sans"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                                <button
                                  onClick={() => setEditingBlock(null)}
                                  className="w-full luxury-gradient text-black py-2 rounded-lg font-semibold"
                                >
                                  Done Editing
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={async () => {
                    addToast('Saving page layout...', 'info');
                    if (googleDriveConfig.authenticated) {
                      await saveContentToGoogleDrive();
                    } else {
                      addToast('Page layout saved locally!', 'success');
                    }
                  }}
                  className="luxury-gradient text-black px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold text-lg"
                >
                  {googleDriveConfig.authenticated ? '💾 Save to Google Drive' : '💾 Save Layout'}
                </button>
              </div>
              </>
              )}
            </div>
          )}

          {/* Content Management Tab */}
          {adminTab === 'cms' && (
            <div className="space-y-6">
              {/* Logo Section */}
              <div className="glass-morphism rounded-xl luxury-shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold font-serif" style={{ color: '#D4AF37' }}>Site Logo</h2>
                  <span className="text-sm text-gray-400 font-sans">Appears in header, hero & footer</span>
                </div>

                <div className="space-y-4">
                  {googleDriveConfig.authenticated ? (
                    <div>
                      <label className="block">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            addToast('Uploading logo...', 'info');
                            const url = await uploadImageToGoogleDrive(file);
                            if (url) {
                              setSiteContent(prev => ({ ...prev, logo: url }));
                              addToast('Logo uploaded successfully!', 'success');
                            }
                            e.target.value = '';
                          }}
                        />
                        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-black/40 transition-all duration-300"
                          style={{ borderColor: '#D4AF37' }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                          }}
                          onDragLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '';
                          }}
                          onDrop={async (e) => {
                            e.preventDefault();
                            e.currentTarget.style.backgroundColor = '';

                            const file = e.dataTransfer.files[0];
                            if (!file || !file.type.startsWith('image/')) {
                              addToast('Please drop an image file', 'error');
                              return;
                            }

                            addToast('Uploading logo...', 'info');
                            const url = await uploadImageToGoogleDrive(file);
                            if (url) {
                              setSiteContent(prev => ({ ...prev, logo: url }));
                              addToast('Logo uploaded successfully!', 'success');
                            }
                          }}
                        >
                          <div className="text-4xl mb-2">🎨</div>
                          <p className="text-white font-semibold mb-1">Click to upload or drag & drop logo</p>
                          <p className="text-xs text-gray-400">PNG, JPG, SVG recommended (transparent background works best)</p>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <label className="block font-medium mb-2 text-white font-sans">Logo URL</label>
                      <input
                        type="text"
                        value={siteContent.logo}
                        onChange={(e) => setSiteContent(prev => ({ ...prev, logo: e.target.value }))}
                        className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                        style={{ borderColor: '#D4AF37' }}
                        placeholder="Enter logo URL (or connect Google Drive to upload)"
                      />
                    </div>
                  )}

                  {/* Logo Preview */}
                  {siteContent.logo && (
                    <div className="bg-black/40 p-6 rounded-lg border-2" style={{ borderColor: '#D4AF37' }}>
                      <p className="text-sm text-gray-400 mb-3 font-sans">Preview:</p>
                      <div className="flex items-center justify-center space-x-8">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-2">Header Size</p>
                          <img src={siteContent.logo} alt="Logo Preview" className="h-12 w-auto" />
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-2">Hero Size</p>
                          <img src={siteContent.logo} alt="Logo Preview" className="h-32 w-auto" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Hero Section */}
              <div className="glass-morphism rounded-xl luxury-shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold font-serif" style={{ color: '#D4AF37' }}>Hero Section</h2>
                  <span className="text-sm text-gray-400 font-sans">Appears on homepage</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">Main Heading</label>
                    <input
                      type="text"
                      value={siteContent.hero.heading}
                      onChange={(e) => updateSiteContent('hero', 'heading', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">Tagline</label>
                    <input
                      type="text"
                      value={siteContent.hero.tagline}
                      onChange={(e) => updateSiteContent('hero', 'tagline', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">Description</label>
                    <textarea
                      value={siteContent.hero.description}
                      onChange={(e) => updateSiteContent('hero', 'description', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400 h-24"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>
                </div>
              </div>

              {/* Section Headings */}
              <div className="glass-morphism rounded-xl luxury-shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold font-serif" style={{ color: '#D4AF37' }}>Section Headings</h2>
                  <span className="text-sm text-gray-400 font-sans">Product page headings</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">Most Popular Section</label>
                    <input
                      type="text"
                      value={siteContent.sections.mostPopular}
                      onChange={(e) => updateSiteContent('sections', 'mostPopular', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">For Her Section</label>
                    <input
                      type="text"
                      value={siteContent.sections.forHer}
                      onChange={(e) => updateSiteContent('sections', 'forHer', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">For Him Section</label>
                    <input
                      type="text"
                      value={siteContent.sections.forHim}
                      onChange={(e) => updateSiteContent('sections', 'forHim', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">Select Size Heading</label>
                    <input
                      type="text"
                      value={siteContent.sections.selectSize}
                      onChange={(e) => updateSiteContent('sections', 'selectSize', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-medium mb-2 text-white font-sans">Product Disclaimer Text</label>
                    <textarea
                      value={siteContent.sections.productDisclaimer}
                      onChange={(e) => updateSiteContent('sections', 'productDisclaimer', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400 h-20"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="glass-morphism rounded-xl luxury-shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold font-serif" style={{ color: '#D4AF37' }}>About Page</h2>
                  <span className="text-sm text-gray-400 font-sans">About page content</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">Page Heading</label>
                    <input
                      type="text"
                      value={siteContent.about.heading}
                      onChange={(e) => updateSiteContent('about', 'heading', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">Introduction</label>
                    <textarea
                      value={siteContent.about.intro}
                      onChange={(e) => updateSiteContent('about', 'intro', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400 h-20"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">Brand Story</label>
                    <textarea
                      value={siteContent.about.story}
                      onChange={(e) => updateSiteContent('about', 'story', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400 h-24"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">Mission Statement</label>
                    <textarea
                      value={siteContent.about.mission}
                      onChange={(e) => updateSiteContent('about', 'mission', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400 h-24"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 text-white font-sans">Quality Statement</label>
                    <textarea
                      value={siteContent.about.quality}
                      onChange={(e) => updateSiteContent('about', 'quality', e.target.value)}
                      className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400 h-24"
                      style={{ borderColor: '#D4AF37' }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer & Contact */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Footer */}
                <div className="glass-morphism rounded-xl luxury-shadow p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-serif" style={{ color: '#D4AF37' }}>Footer</h2>
                    <span className="text-sm text-gray-400 font-sans">Footer text</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium mb-2 text-white font-sans">Description</label>
                      <textarea
                        value={siteContent.footer.description}
                        onChange={(e) => updateSiteContent('footer', 'description', e.target.value)}
                        className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400 h-20"
                        style={{ borderColor: '#D4AF37' }}
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2 text-white font-sans">Copyright Text</label>
                      <input
                        type="text"
                        value={siteContent.footer.copyright}
                        onChange={(e) => updateSiteContent('footer', 'copyright', e.target.value)}
                        className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                        style={{ borderColor: '#D4AF37' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="glass-morphism rounded-xl luxury-shadow p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-serif" style={{ color: '#D4AF37' }}>Contact Page</h2>
                    <span className="text-sm text-gray-400 font-sans">Contact text</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium mb-2 text-white font-sans">Page Heading</label>
                      <input
                        type="text"
                        value={siteContent.contact.heading}
                        onChange={(e) => updateSiteContent('contact', 'heading', e.target.value)}
                        className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400"
                        style={{ borderColor: '#D4AF37' }}
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2 text-white font-sans">Description</label>
                      <textarea
                        value={siteContent.contact.description}
                        onChange={(e) => updateSiteContent('contact', 'description', e.target.value)}
                        className="w-full p-3 border-2 rounded-lg focus:outline-none font-sans bg-black/30 text-white placeholder-gray-400 h-20"
                        style={{ borderColor: '#D4AF37' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save/Reset Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={resetContentToDefaults}
                  className="glass-morphism text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
                  style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                >
                  Reset to Defaults
                </button>
                <button
                  onClick={async () => {
                    addToast('Saving content...', 'info');
                    if (googleDriveConfig.authenticated) {
                      await saveContentToGoogleDrive();
                    } else {
                      addToast('Content saved locally!', 'success');
                    }
                  }}
                  className="luxury-gradient text-black px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
                >
                  {googleDriveConfig.authenticated ? '💾 Save to Google Drive' : '💾 Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Image Library Tab */}
          {adminTab === 'imageLibrary' && (
            <div className="space-y-6">
              <div className="glass-morphism rounded-xl luxury-shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold font-serif" style={{ color: '#D4AF37' }}>📸 Image Library</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={fetchImagesFromGoogleDrive}
                      disabled={!googleDriveConfig.authenticated || loadingImages}
                      className="px-4 py-2 rounded-lg glass-morphism text-white hover:scale-105 transition-all font-semibold disabled:opacity-50"
                      style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                    >
                      {loadingImages ? '⏳ Loading...' : '🔄 Refresh'}
                    </button>
                  </div>
                </div>

                {!googleDriveConfig.authenticated ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔒</div>
                    <h3 className="text-xl font-bold text-white mb-2">Google Drive Not Connected</h3>
                    <p className="text-gray-400 mb-6">Connect Google Drive to access your image library</p>
                    <button
                      onClick={() => setAdminTab('settings')}
                      className="luxury-gradient text-black px-6 py-3 rounded-lg hover:scale-105 transition-all font-semibold"
                    >
                      Go to Settings
                    </button>
                  </div>
                ) : loadingImages ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">⏳</div>
                    <p className="text-white font-semibold">Loading images from Google Drive...</p>
                  </div>
                ) : imageLibrary.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📁</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Images Yet</h3>
                    <p className="text-gray-400 mb-6">Upload images from the Product Management or Page Builder tabs</p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 flex justify-between items-center">
                      <p className="text-gray-400 font-sans">
                        {imageLibrary.length} image{imageLibrary.length !== 1 ? 's' : ''} in library
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {imageLibrary.map((image) => (
                        <div
                          key={image.id}
                          className="glass-morphism rounded-lg overflow-hidden hover:scale-105 transition-all duration-300"
                          style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                        >
                          <div className="relative">
                            <img
                              src={image.thumbnail}
                              alt={image.name}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <button
                                onClick={async () => {
                                  if (confirm(`Delete "${image.name}"? This cannot be undone.`)) {
                                    await deleteImageFromGoogleDrive(image.id);
                                  }
                                }}
                                className="bg-red-500/80 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </div>
                          <div className="p-3">
                            <p className="text-white font-semibold text-sm truncate mb-1">{image.name}</p>
                            <p className="text-xs text-gray-400 mb-2">
                              {new Date(image.createdTime).toLocaleDateString()}
                            </p>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(image.url);
                                addToast('Image URL copied to clipboard!', 'success');
                              }}
                              className="w-full text-xs px-2 py-1 rounded glass-morphism text-white hover:scale-105 transition-all"
                            >
                              📋 Copy URL
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Theme Settings Tab */}
          {adminTab === 'themeSettings' && (
            <div className="space-y-6">
              <div className="glass-morphism rounded-xl luxury-shadow p-6">
                <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: '#D4AF37' }}>✨ Visual Effects Control Panel</h2>

                <div className="space-y-6">
                  {/* Holiday Theme Presets */}
                  <div className="p-4 glass-morphism rounded-lg" style={{ borderColor: '#D4AF37', borderWidth: '2px' }}>
                    <h3 className="text-white font-semibold text-lg mb-4">🎨 Holiday Theme Presets</h3>
                    <p className="text-gray-400 text-sm mb-4">Quickly apply themed particle effects for special occasions</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        {
                          name: '🎄 Christmas',
                          settings: { enabled: true, speed: 0.8, intensity: 70, color: '#C41E3A', count: 70, brightness: 90 },
                          bgColor: '#165B33'
                        },
                        {
                          name: '💝 Valentine\'s',
                          settings: { enabled: true, speed: 1.2, intensity: 60, color: '#FF1493', count: 60, brightness: 85 },
                          bgColor: '#C71585'
                        },
                        {
                          name: '🐰 Easter',
                          settings: { enabled: true, speed: 1.5, intensity: 55, color: '#FFD700', count: 50, brightness: 80 },
                          bgColor: '#9370DB'
                        },
                        {
                          name: '🎃 Halloween',
                          settings: { enabled: true, speed: 0.6, intensity: 80, color: '#FF8C00', count: 80, brightness: 75 },
                          bgColor: '#4B0082'
                        },
                        {
                          name: '🛍️ Black Friday',
                          settings: { enabled: true, speed: 2, intensity: 90, color: '#FFD700', count: 90, brightness: 95 },
                          bgColor: '#000000'
                        },
                        {
                          name: '☀️ Summer',
                          settings: { enabled: true, speed: 1.8, intensity: 45, color: '#FFD700', count: 40, brightness: 100 },
                          bgColor: '#87CEEB'
                        },
                        {
                          name: '❄️ Winter',
                          settings: { enabled: true, speed: 0.5, intensity: 65, color: '#FFFFFF', count: 75, brightness: 70 },
                          bgColor: '#4682B4'
                        },
                        {
                          name: '✨ Default Luxury',
                          settings: { enabled: true, speed: 1, intensity: 50, color: '#D4AF37', count: 50, brightness: 80 },
                          bgColor: '#D4AF37'
                        },
                      ].map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => {
                            setParticleEffects(preset.settings);
                            addToast(`${preset.name} theme applied!`, 'success');
                          }}
                          className="p-4 rounded-lg transition-all duration-300 hover:scale-105 text-white font-semibold"
                          style={{ backgroundColor: preset.bgColor }}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Enable/Disable Toggle */}
                  <div className="flex items-center justify-between p-4 glass-morphism rounded-lg" style={{ borderColor: '#D4AF37', borderWidth: '2px' }}>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">Particle Effects</h3>
                      <p className="text-gray-400 text-sm">Enable or disable floating particles and sparkles</p>
                    </div>
                    <button
                      onClick={() => setParticleEffects(prev => ({ ...prev, enabled: !prev.enabled }))}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        particleEffects.enabled
                          ? 'luxury-gradient text-black'
                          : 'bg-gray-600 text-white'
                      }`}
                    >
                      {particleEffects.enabled ? '✅ Enabled' : '❌ Disabled'}
                    </button>
                  </div>

                  {/* Speed Control */}
                  <div className="p-4 glass-morphism rounded-lg" style={{ borderColor: '#D4AF37', borderWidth: '2px' }}>
                    <label className="block text-white font-semibold mb-3">
                      Animation Speed: {particleEffects.speed.toFixed(1)}x
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={particleEffects.speed}
                      onChange={(e) => setParticleEffects(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${((particleEffects.speed - 0.1) / 2.9) * 100}%, #374151 ${((particleEffects.speed - 0.1) / 2.9) * 100}%, #374151 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Slow (0.1x)</span>
                      <span>Fast (3x)</span>
                    </div>
                  </div>

                  {/* Intensity Control */}
                  <div className="p-4 glass-morphism rounded-lg" style={{ borderColor: '#D4AF37', borderWidth: '2px' }}>
                    <label className="block text-white font-semibold mb-3">
                      Particle Intensity: {particleEffects.intensity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={particleEffects.intensity}
                      onChange={(e) => setParticleEffects(prev => ({ ...prev, intensity: parseInt(e.target.value) }))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${particleEffects.intensity}%, #374151 ${particleEffects.intensity}%, #374151 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Subtle (0%)</span>
                      <span>Intense (100%)</span>
                    </div>
                  </div>

                  {/* Brightness Control */}
                  <div className="p-4 glass-morphism rounded-lg" style={{ borderColor: '#D4AF37', borderWidth: '2px' }}>
                    <label className="block text-white font-semibold mb-3">
                      Brightness: {particleEffects.brightness}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={particleEffects.brightness}
                      onChange={(e) => setParticleEffects(prev => ({ ...prev, brightness: parseInt(e.target.value) }))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${particleEffects.brightness}%, #374151 ${particleEffects.brightness}%, #374151 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Dim (0%)</span>
                      <span>Bright (100%)</span>
                    </div>
                  </div>

                  {/* Particle Count Control */}
                  <div className="p-4 glass-morphism rounded-lg" style={{ borderColor: '#D4AF37', borderWidth: '2px' }}>
                    <label className="block text-white font-semibold mb-3">
                      Particle Count: {particleEffects.count}
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={particleEffects.count}
                      onChange={(e) => setParticleEffects(prev => ({ ...prev, count: parseInt(e.target.value) }))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${((particleEffects.count - 10) / 90) * 100}%, #374151 ${((particleEffects.count - 10) / 90) * 100}%, #374151 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Few (10)</span>
                      <span>Many (100)</span>
                    </div>
                  </div>

                  {/* Color Picker */}
                  <div className="p-4 glass-morphism rounded-lg" style={{ borderColor: '#D4AF37', borderWidth: '2px' }}>
                    <label className="block text-white font-semibold mb-3">Particle Color</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { name: 'Gold', color: '#D4AF37' },
                        { name: 'Silver', color: '#C0C0C0' },
                        { name: 'White', color: '#FFFFFF' },
                        { name: 'Rose Gold', color: '#B76E79' },
                        { name: 'Blue', color: '#4A90E2' },
                        { name: 'Purple', color: '#9B59B6' },
                        { name: 'Green', color: '#2ECC71' },
                        { name: 'Red', color: '#E74C3C' },
                      ].map((preset) => (
                        <button
                          key={preset.color}
                          onClick={() => setParticleEffects(prev => ({ ...prev, color: preset.color }))}
                          className={`p-3 rounded-lg transition-all duration-300 ${
                            particleEffects.color === preset.color
                              ? 'ring-4 ring-white scale-105'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: preset.color }}
                        >
                          <span className={`font-semibold ${preset.color === '#FFFFFF' ? 'text-black' : 'text-white'}`}>
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setParticleEffects({
                          enabled: true,
                          speed: 1,
                          intensity: 50,
                          color: '#D4AF37',
                          count: 50,
                          brightness: 80
                        });
                        addToast('Theme settings reset to defaults!', 'success');
                      }}
                      className="glass-morphism text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
                      style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                    >
                      Reset to Defaults
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Google Drive Settings Tab */}
          {adminTab === 'settings' && (
            <div className="space-y-6">
              {/* Simplified Connection Card */}
              <div className="glass-morphism rounded-xl luxury-shadow p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">☁️</div>
                  <h2 className="text-3xl font-bold mb-3 font-serif" style={{ color: '#D4AF37' }}>
                    Google Drive Integration
                  </h2>
                  <p className="text-lg text-gray-300 font-sans">
                    Store and sync your website content across all devices
                  </p>
                </div>

                {/* Connection Status */}
                {googleDriveConfig.authenticated ? (
                  <div className="space-y-6">
                    {/* Connected Status */}
                    <div className="bg-green-900/30 border-2 border-green-500 rounded-xl p-6">
                      <div className="flex items-center justify-center mb-4">
                        <div className="text-5xl">✅</div>
                      </div>
                      <h3 className="text-2xl font-bold text-green-400 text-center mb-3">Connected to Google Drive</h3>
                      <div className="space-y-2 text-center">
                        <p className="text-sm text-green-300">
                          <strong>Content File:</strong> {googleDriveConfig.fileId ? '✓ Ready' : '⏳ Setting up...'}
                        </p>
                        <p className="text-sm text-green-300">
                          <strong>Images Folder:</strong> {googleDriveConfig.imagesFolderId ? '✓ Ready' : '⏳ Setting up...'}
                        </p>
                        {googleDriveConfig.expiresAt && (
                          <p className="text-xs text-green-200 mt-2">
                            Token expires: {new Date(googleDriveConfig.expiresAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="bg-black/40 rounded-xl p-6">
                      <h4 className="font-bold text-lg mb-4" style={{ color: '#D4AF37' }}>✨ Active Features:</h4>
                      <ul className="space-y-3 text-white font-sans">
                        <li className="flex items-start space-x-3">
                          <span className="text-green-400 text-xl">✓</span>
                          <div>
                            <strong>Auto-Sync:</strong>
                            <p className="text-sm text-gray-400">Content saves to Google Drive automatically</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-green-400 text-xl">✓</span>
                          <div>
                            <strong>Image Uploads:</strong>
                            <p className="text-sm text-gray-400">Upload images directly from admin panel</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-green-400 text-xl">✓</span>
                          <div>
                            <strong>Image Library:</strong>
                            <p className="text-sm text-gray-400">Browse and manage all uploaded images</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-green-400 text-xl">✓</span>
                          <div>
                            <strong>Cross-Device Sync:</strong>
                            <p className="text-sm text-gray-400">Access your content from any device</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={async () => {
                          await saveContentToGoogleDrive();
                          addToast('Content saved to Google Drive!', 'success');
                        }}
                        className="flex-1 luxury-gradient text-black px-6 py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold text-lg"
                      >
                        💾 Save to Google Drive
                      </button>
                      <button
                        onClick={disconnectGoogleDrive}
                        className="flex-1 glass-morphism text-white px-6 py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold text-lg"
                        style={{ borderColor: '#D4AF37', borderWidth: '2px' }}
                      >
                        🔌 Disconnect
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Not Connected Status */}
                    <div className="bg-gray-900/50 border-2 border-gray-600 rounded-xl p-6">
                      <div className="flex items-center justify-center mb-4">
                        <div className="text-5xl">🔒</div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-300 text-center mb-3">Not Connected</h3>
                      <p className="text-sm text-gray-400 text-center">
                        Click the button below to connect your Google Drive account
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="bg-black/40 rounded-xl p-6">
                      <h4 className="font-bold text-lg mb-4" style={{ color: '#D4AF37' }}>🎁 What You'll Get:</h4>
                      <ul className="space-y-3 text-white font-sans">
                        <li className="flex items-start space-x-3">
                          <span style={{ color: '#D4AF37' }}>•</span>
                          <div>
                            <strong>Automatic Backups:</strong>
                            <p className="text-sm text-gray-400">Never lose your content or images</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span style={{ color: '#D4AF37' }}>•</span>
                          <div>
                            <strong>Easy Image Management:</strong>
                            <p className="text-sm text-gray-400">Upload and organize product images effortlessly</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span style={{ color: '#D4AF37' }}>•</span>
                          <div>
                            <strong>Multi-Device Access:</strong>
                            <p className="text-sm text-gray-400">Manage your site from phone, tablet, or computer</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span style={{ color: '#D4AF37' }}>•</span>
                          <div>
                            <strong>Instant Sync:</strong>
                            <p className="text-sm text-gray-400">Changes appear immediately across all devices</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Connect Button */}
                    <button
                      onClick={authenticateGoogleDrive}
                      disabled={isAuthenticating}
                      className="w-full luxury-gradient text-black px-8 py-6 rounded-xl hover:scale-105 transition-all duration-300 font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAuthenticating ? (
                        <span className="flex items-center justify-center space-x-3">
                          <span className="animate-spin">⏳</span>
                          <span>Connecting...</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center space-x-3">
                          <span>🔗</span>
                          <span>Connect Google Drive</span>
                        </span>
                      )}
                    </button>

                    {/* Simple Instructions */}
                    <div className="bg-blue-900/20 border-2 border-blue-600 rounded-xl p-6">
                      <h4 className="font-bold text-blue-400 mb-3">📝 How to Connect:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-blue-200">
                        <li>Click the "Connect Google Drive" button above</li>
                        <li>Sign in with your Google account</li>
                        <li>Grant permission to access Google Drive</li>
                        <li>Done! Your content will auto-sync</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {contentError && (
                  <div className="bg-red-900/30 border-2 border-red-500 rounded-xl p-6 mt-6">
                    <h4 className="font-bold text-red-400 mb-2">⚠️ Connection Error:</h4>
                    <p className="text-sm text-red-300">{contentError}</p>
                    <button
                      onClick={() => {
                        setContentError(null);
                        if (googleDriveConfig.authenticated) {
                          window.location.reload();
                        }
                      }}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold text-sm"
                    >
                      Retry Connection
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
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
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-12 text-gradient font-bold tracking-wide">{siteContent.contact.heading}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-morphism rounded-xl luxury-shadow p-8">
            <h2 className="text-2xl font-serif font-bold mb-6 text-white">{siteContent.contact.heading}</h2>

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
    <div className={`fixed right-0 top-0 h-full w-full md:w-[450px] bg-gradient-to-b from-black via-neutral-900 to-black luxury-shadow-hover transform transition-all duration-400 z-50 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        {/* Enhanced Header */}
        <div className="p-6 border-b-2 bg-gradient-to-r from-black to-neutral-900" style={{ borderColor: '#D4AF37' }}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-3xl font-serif font-bold text-gradient flex items-center gap-2">
              <ShoppingCart className="text-gold" size={28} />
              Your Cart
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-all duration-300 hover:scale-110"
              style={{ color: '#D4AF37' }}
            >
              <X size={24} />
            </button>
          </div>
          {cart.length > 0 && (
            <div className="flex items-center justify-between text-sm font-sans">
              <span className="text-gray-400">{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}</span>
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 transition-colors duration-300 flex items-center gap-1"
              >
                <Trash2 size={14} />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center mt-20 animate-fadeIn">
              <div className="mb-6 relative">
                <ShoppingCart size={64} className="mx-auto opacity-30 text-gold" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 border-4 border-gold/20 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Your Cart is Empty</h3>
              <p className="text-gray-400 font-sans mb-6">Discover our luxury fragrances</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  setCurrentPage('forHer');
                }}
                className="luxury-gradient text-black px-8 py-3 rounded-lg font-sans font-bold hover:scale-105 transition-all duration-300 luxury-shadow-hover"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="glass-morphism border-2 rounded-xl p-3 hover:border-gold transition-all duration-300 luxury-shadow group animate-fadeIn"
                  style={{
                    borderColor: 'rgba(212, 175, 55, 0.3)',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-black/40 border border-gold/20">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/Final.png';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gold/50">
                          <ShoppingCart size={32} />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif font-bold text-white text-sm leading-tight pr-2 line-clamp-2">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 hover:scale-110 transition-all duration-300 flex-shrink-0"
                          title="Remove from cart"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs font-sans text-gray-400 mb-2">{item.size}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 border border-gold/50 rounded-md hover:bg-gold/20 transition-all duration-300 font-sans font-bold text-gold flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-bold font-sans text-white text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 border border-gold/50 rounded-md hover:bg-gold/20 transition-all duration-300 font-sans font-bold text-gold flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold font-sans text-gradient text-sm">R{(item.price * item.quantity).toFixed(2)}</p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500">R{item.price} each</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Cart Footer */}
        {cart.length > 0 && (
          <div className="border-t-2 p-6 space-y-4 bg-gradient-to-b from-neutral-900 to-black" style={{ borderColor: '#D4AF37' }}>
            {/* Discount Code Input */}
            <div className="pb-4 border-b border-gold/20">
              <label className="block text-sm font-sans font-medium text-gray-400 mb-2">Discount Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && applyDiscountCode(discountInput)}
                  placeholder="Enter code"
                  className="flex-1 bg-black/40 border border-gold/30 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-all duration-300 font-sans text-sm"
                />
                <button
                  onClick={() => applyDiscountCode(discountInput)}
                  className="luxury-gradient text-black px-4 py-2 rounded-lg font-sans font-bold hover:scale-105 transition-all duration-300 text-sm"
                >
                  Apply
                </button>
              </div>
              {appliedDiscount && (
                <div className="mt-2 flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-sm font-sans font-semibold">✓ {appliedDiscount.code}</span>
                    <span className="text-gray-400 text-xs font-sans">({appliedDiscount.description})</span>
                  </div>
                  <button
                    onClick={removeDiscount}
                    className="text-red-400 hover:text-red-300 text-xs font-sans"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Subtotal Breakdown */}
            <div className="space-y-2 pb-4 border-b border-gold/20">
              <div className="flex justify-between items-center text-sm font-sans">
                <span className="text-gray-400">Subtotal ({getTotalItems()} items)</span>
                <span className="text-white font-semibold">R{getTotalPrice().toFixed(2)}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between items-center text-sm font-sans">
                  <span className="text-green-400">Discount ({appliedDiscount.value}%)</span>
                  <span className="text-green-400 font-semibold">-R{calculateDiscount().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm font-sans">
                <span className="text-gray-400">Delivery</span>
                <span className="text-green-400 font-semibold">FREE</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-2">
              <span className="text-2xl font-serif font-bold text-white">Total:</span>
              <span className="text-3xl font-serif font-bold text-gradient">R{getFinalTotal().toFixed(2)}</span>
            </div>

            {/* Checkout Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 font-sans font-bold hover:from-green-700 hover:to-green-800 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 luxury-shadow-hover rounded-xl group"
              >
                <Phone size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Order via WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  // Peach Payments integration will go here
                  addToast('Peach Payments integration coming soon! Please use WhatsApp checkout.', 'info', 4000);
                }}
                className="w-full luxury-gradient text-black py-4 font-sans font-bold hover:scale-105 transition-all duration-300 animate-shimmer luxury-shadow-hover rounded-xl"
              >
                💳 Pay Online with Peach Payments
              </button>
            </div>

            {/* Continue Shopping Link */}
            <button
              onClick={() => setCartOpen(false)}
              className="w-full text-sm font-sans text-gold hover:text-gold-light transition-all duration-300 flex items-center justify-center gap-2 py-2"
            >
              <ChevronRight size={16} className="rotate-180" />
              Continue Shopping
            </button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-sans pt-2">
              <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span>Secure Checkout • Free Delivery</span>
            </div>
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
                src={siteContent.logo}
                alt="Perpetual Linger Logo"
                className="h-10 w-auto"
              />
              <div>
                <div className="font-serif text-xl text-gradient font-bold">{siteContent.hero.heading}</div>
                <div className="text-xs text-amber-400">{siteContent.hero.tagline}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              {siteContent.footer.description}
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
            <h3 className="font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-3 text-sm">Get 10% off your first order!</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                subscribeToNewsletter(email);
                e.target.reset();
              }}
              className="space-y-2"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full bg-black/40 border border-gold/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="w-full luxury-gradient text-black px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-4">
              <h3 className="font-bold mb-2">Connect</h3>
              <p className="text-gray-400 mb-2 text-sm">WhatsApp: 061 010 0845</p>
              <div className="flex space-x-4">
                <a href="#" className="text-amber-400 hover:text-amber-300"><Instagram /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2024 {siteContent.hero.heading}. All rights reserved.</p>
          <p className="mt-2">{siteContent.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Global Particles and Sparkles - Always Visible */}
      <GlobalFloatingParticles settings={particleEffects} />
      <GlobalSparkles settings={particleEffects} />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <Navigation />
      <Cart />

      {/* Newsletter Popup */}
      {showNewsletterPopup && !isAdmin && (
        <NewsletterPopup
          onSubscribe={subscribeToNewsletter}
          onDismiss={dismissNewsletter}
        />
      )}

      {/* Product Quick View Modal */}
      {quickViewProduct && !isAdmin && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={addToCart}
          getAverageRating={getAverageRating}
          getReviewCount={getReviewCount}
        />
      )}

      {currentPage === 'home' && !isAdmin && <HomePage />}
      {currentPage === 'forHer' && !isAdmin && <ProductGrid products={productList.forHer} title={siteContent.sections.forHer} />}
      {currentPage === 'forHim' && !isAdmin && <ProductGrid products={productList.forHim} title={siteContent.sections.forHim} />}
      {currentPage === 'wishlist' && !isAdmin && <WishlistPage />}
      {currentPage === 'product' && !isAdmin && <ProductPage />}
      {currentPage === 'about' && !isAdmin && <AboutPage />}
      {currentPage === 'contact' && !isAdmin && <ContactPage />}
      {currentPage === 'perfumeUsage' && !isAdmin && <PerfumeUsagePage />}
      {currentPage === 'refundPolicy' && !isAdmin && <RefundPolicyPage />}
      {currentPage === 'termsNotice' && !isAdmin && <TermsNoticePage />}
      {currentPage === 'adminLogin' && !isAdmin && <AdminLogin />}
      {currentPage === 'admin' && isAdmin && <AdminPanel />}

      {!isAdmin && <Footer />}
    </div>
  );
};

export default App;