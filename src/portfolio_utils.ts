import rawData from './portfolio_data.json';
import { PortfolioItem, CategoryKey } from './types';

// Let's type assert rawData as PortfolioItem[]
const items: PortfolioItem[] = rawData as PortfolioItem[];

// Custom high-resolution placeholder images requested by the user for subsequent pages
const PLACEHOLDERS = [
  "https://i.postimg.cc/kGTDn5vk/unnamed.jpg",
  "https://i.postimg.cc/x86q0d3h/unnamed-(1).jpg",
  "https://i.postimg.cc/QCfVXMJm/unnamed-(2).jpg",
  "https://i.postimg.cc/prsy2dJ1/unnamed-(3).jpg",
  "https://i.postimg.cc/tRksdrGs/unnamed-(4).jpg",
  "https://i.postimg.cc/05nzGt1Q/unnamed-(8).jpg"
];

// Custom high-resolution cover artwork mappings requested by the user
const COVER_IMAGES: Record<string, string[]> = {
  "Ótica": ["https://i.postimg.cc/QtYf186G/1.png", ...PLACEHOLDERS],
  "Academia": [
    "https://i.postimg.cc/667kcgC0/10.png",
    "https://i.postimg.cc/MKyfMWKj/unnamed.jpg",
    "https://i.postimg.cc/dVwkGzL1/unnamed-(1).jpg",
    "https://i.postimg.cc/4xs7prmv/unnamed-(2).jpg",
    "https://i.postimg.cc/Z54B61C0/unnamed-(3).jpg",
    "https://i.postimg.cc/7ZwGSpfd/unnamed-(6).jpg"
  ],
  "Psicologia": ["https://i.postimg.cc/w38cQ7LP/11.png", ...PLACEHOLDERS],
  "Mecânica de Carros": [
    "https://i.postimg.cc/fRs1wbpX/12.png",
    "https://i.postimg.cc/br5DxJSN/unnamed.jpg",
    "https://i.postimg.cc/J0FDNnHZ/unnamed-(1).jpg",
    "https://i.postimg.cc/4429k8LM/unnamed-(2).jpg",
    "https://i.postimg.cc/KcpMS9pv/unnamed-(4).jpg",
    "https://i.postimg.cc/T2NDMkNW/unnamed-(5).jpg"
  ],
  "Experiência Militar": [
    "https://i.postimg.cc/BQ9Vg6qg/13.png",
    "https://i.postimg.cc/HW0Jv1nw/2974848989427024099-51784631452.jpg",
    "https://i.postimg.cc/MZ0c3JH3/3048905076199006989-51784631452.jpg",
    "https://i.postimg.cc/66V7bxqz/3077090888291850274-51784631452.jpg",
    "https://i.postimg.cc/ncHX6SQc/3115514544906756938-51784631452.jpg",
    "https://i.postimg.cc/Pr2Chbmm/3196180762523510091-51784631452.jpg",
    "https://i.postimg.cc/9FJDVPGD/3204030779948197832-51784631452.jpg"
  ],
  "Projetos Editoriais": [
    "https://i.postimg.cc/MK7rrSHW/14.png",
    "https://i.postimg.cc/y8s9nQn4/unnamed.png",
    "https://i.postimg.cc/vBc5f4hV/unnamed-(1).png",
    "https://i.postimg.cc/76fS059b/unnamed-(2).png",
    "https://i.postimg.cc/664dQGTk/unnamed-(4).png",
    "https://i.postimg.cc/zXmTHXg1/unnamed-(5).png"
  ],
  "Desenvolvimento WordPress": ["https://i.postimg.cc/hPL33Bvb/16.png"],
  "Flyers Esportivos": [
    "https://i.postimg.cc/ZqMfyY78/17.png",
    "https://i.postimg.cc/CLTY393S/unnamed.jpg",
    "https://i.postimg.cc/90T24Bqg/unnamed-(1).jpg",
    "https://i.postimg.cc/gjRpwK6C/unnamed-(2).jpg",
    "https://i.postimg.cc/Pf8TFdFN/unnamed-(3).jpg",
    "https://i.postimg.cc/C5D0Z4q0/unnamed-(4).jpg",
    "https://i.postimg.cc/zXZ5s499/unnamed-(5).jpg",
    "https://i.postimg.cc/rFXcB7vH/unnamed-(6).jpg",
    "https://i.postimg.cc/J4VmfSf1/unnamed-(9).jpg"
  ],
  "Comunicação Social": [
    "https://i.postimg.cc/DZRYRf12/15.png"
  ],
  "Loja de Carros": [
    "https://i.postimg.cc/wTmwRdLk/2.png",
    "https://i.postimg.cc/9XbhgKfs/unnamed.jpg",
    "https://i.postimg.cc/L4DpQwsr/unnamed-(1).jpg",
    "https://i.postimg.cc/RCdBpyFt/unnamed-(2).jpg",
    "https://i.postimg.cc/qM7dPwhX/unnamed-(3).jpg",
    "https://i.postimg.cc/Nf0w3D98/unnamed-(4).jpg",
    "https://i.postimg.cc/yYNzMjg9/unnamed-(5).jpg",
    "https://i.postimg.cc/9XbhgKf6/unnamed-(6).jpg",
    "https://i.postimg.cc/T206NFw8/unnamed-(7).jpg"
  ],
  "Barbearia": [
    "https://i.postimg.cc/GmnqkSxS/3.png",
    ...PLACEHOLDERS
  ],
  "Doceria": ["https://i.postimg.cc/6q7YhkSn/4.png", ...PLACEHOLDERS],
  "Lancheria": ["https://i.postimg.cc/qM316dyx/5.png", ...PLACEHOLDERS],
  "Cervejaria": ["https://i.postimg.cc/V6hF57Nh/6.png", ...PLACEHOLDERS],
  "Pizzaria": ["https://i.postimg.cc/Vs33VgFB/7.png", ...PLACEHOLDERS],
  "Petshop": ["https://i.postimg.cc/DZ0gvV7p/8.png", ...PLACEHOLDERS],
  "Imobiliária": ["https://i.postimg.cc/s2wmCfCZ/9.png", ...PLACEHOLDERS]
};

// Identify universal background assets that appear on almost all pages (e.g. general headers, profile backgrounds)
// We will filter these out of individual project sliders to ensure galleries remain project-specific.
export function getCleanedProjects() {
  const imageCount: Record<string, number> = {};
  
  // Count image occurrences
  items.forEach(item => {
    item.images.forEach(img => {
      imageCount[img] = (imageCount[img] || 0) + 1;
    });
  });

  // Any image appearing in more than 3 pages is considered a "global asset"
  const globalAssets = new Set(
    Object.keys(imageCount).filter(img => imageCount[img] > 3)
  );

  return items.map(item => {
    // Filter out global assets, blank/empty image urls
    const filteredImages = item.images.filter(img => !globalAssets.has(img) && img.length > 5);
    
    // Determine Category Key based on name/path
    let category: CategoryKey = 'social';
    if (item.name === 'Desenvolvimento WordPress') {
      category = 'wordpress';
    } else if (item.name === 'Flyers Esportivos') {
      category = 'sports';
    } else if (item.name === 'Projetos Editoriais') {
      category = 'editorial';
    } else if (item.name === 'Experiência Militar') {
      category = 'military';
    } else if (item.name === 'Página Inicial' || item.name === 'Sobre mim') {
      // These are core sections in the landing page
      category = 'all';
    }

    // Set brief description and default mock metadata if needed
    let shortDesc = '';
    if (item.paragraphs.length > 0) {
      // Pick first paragraph that isn't the project name itself
      const firstValidPara = item.paragraphs.find(p => p !== item.name && p.length > 10);
      shortDesc = firstValidPara || item.paragraphs[0] || '';
    }

    // Prepend high resolution covers if they exist for this specific item name
    const mappedCovers = COVER_IMAGES[item.name] || [];
    const baseImages = filteredImages.length > 0 ? filteredImages : item.images;
    const finalImages = mappedCovers.length > 0 ? mappedCovers : baseImages;

    return {
      ...item,
      category,
      shortDesc,
      images: finalImages.length > 0 ? finalImages : baseImages
    };
  }).filter(item => item.name !== 'Página Inicial' && item.name !== 'Sobre mim'); // we use landing page data manually
}

export function getBiographyData() {
  const home = items.find(i => i.name === 'Página Inicial');
  const about = items.find(i => i.name === 'Sobre mim');
  
  const bioParagraphs = about ? about.paragraphs : (home ? home.paragraphs : []);
  const email = about?.paragraphs.find(p => p.includes('@')) || 'photoshopeditores@gmail.com';
  const phone = about?.paragraphs.find(p => p.replace(/\s/g, '').includes('99664')) || '55 55 99664-9651';

  return {
    name: 'Igor Lopes',
    tagline: 'Designer Gráfico & Criador WordPress',
    subtagline: 'Criando soluções visuais inovadoras há mais de 8 anos!',
    email,
    phone,
    bioParagraphs: bioParagraphs.filter(p => !p.includes('@') && !p.replace(/\s/g, '').includes('99664') && p.length > 15),
    avatar: 'https://i.postimg.cc/TYgKWkw4/Imagem-do-Whats-App-de-2024-10-24-a(s)-20-11-55-0fb7d09e.jpg'
  };
}
