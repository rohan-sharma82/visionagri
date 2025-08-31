
export const navLinks = [
  { href: '/', label: 'nav.home' },
  { href: '/crop-yield', label: 'nav.cropYield' },
  { href: '/ai-farmer', label: 'nav.aiFarmer' },
  { href: '/disease-classification', label: 'nav.diseaseClassification' },
  { href: '/animal-classification', label: 'nav.animalClassification' },
  { href: '/govt-schemes', label: 'nav.govtSchemes' },
];

const baseFeaturesData = [
    {
        title: 'features.cropYield.title',
        imageUrl: 'https://jcblagri.in/x_images/blog_pics/1667806089agri_blog.png',
        dataAiHint: 'crop field',
        href: '/crop-yield',
        description: 'features.cropYield.description'
    },
    {
        title: 'features.aiFarmer.title',
        imageUrl: 'https://framerusercontent.com/images/g0YTRh7uRHpbWQgSZz62bO050.png?width=1378&height=880',
        dataAiHint: 'chatbot robot',
        href: '/ai-farmer',
        description: 'features.aiFarmer.description'
    },
    {
        title: 'features.diseaseClassification.title',
        imageUrl: 'https://cdn11.bigcommerce.com/s-tjrce8etun/product_images/uploaded_images/leave-with-fungus.jpg',
        dataAiHint: 'diseased crop',
        href: '/disease-classification',
        description: 'features.diseaseClassification.description'
    },
    {
        title: 'features.animalClassification.title',
        imageUrl: 'https://www.shunya.live/wp-content/uploads/2024/07/Farmer-dairy-economy-india-shunya-1024x579.png',
        dataAiHint: 'farm animals',
        href: '/animal-classification',
        description: 'features.animalClassification.description'
    },
    {
        title: 'features.govtSchemes.title',
        imageUrl: 'https://timesofagriculture.in/wp-content/uploads/2023/08/feature-image-2-1-1-1-scaled.jpg',
        dataAiHint: 'government scheme',
        href: '/govt-schemes',
        description: 'features.govtSchemes.description'
    },
    {
        title: 'features.farmSchool.title',
        imageUrl: '/images/farmschool.jpeg',
        dataAiHint: 'farm school education',
        href: '/farm-school',
        description: 'features.farmSchool.description'
    }
];

export const featuresData = baseFeaturesData;


export const newsCategories = [
  'categories.all',
  'categories.marketPrices',
  'categories.weatherUpdates',
  'categories.govtPolicies',
  'categories.farmingTechniques',
  'categories.technology',
];

export const newsData = [
  {
    id: 1,
    title: 'news.n1_title',
    source: 'sources.agriTech',
    date: 'dates.oct26',
    snippet:'news.n1_snippet',
    article:'news.n1_article',
    category: 'categories.technology',
  },
  {
    id: 2,
    title: 'news.n2_title',
    source: 'sources.farmersJournal',
    date: 'dates.oct25',
    snippet: 'news.n2_snippet',
    article: 'news.n2_article',
    category: 'categories.govtPolicies',
  },
  {
    id: 3,
    title: 'news.n3_title',
    source: 'sources.globalFarming',
    date: 'dates.oct24',
    snippet: 'news.n3_snippet',
    article: 'news.n3_article',
    category: 'categories.weatherUpdates',
  },
    {
    id: 4,
    title: 'news.n4_title',
    source: 'sources.agriInvest',
    date: 'dates.oct23',
    snippet: 'news.n4_snippet',
    article: 'news.n4_article',
    category: 'categories.marketPrices',
  },
  {
    id: 5,
    title: 'news.n5_title',
    source: 'sources.sustainableFarms',
    date: 'dates.oct22',
    snippet: 'news.n5_snippet',
    article: 'news.n5_article',
    category: 'categories.farmingTechniques',
  },
  {
    id: 6,
    title: 'news.n6_title',
    source: 'sources.techCrunch',
    date: 'dates.oct21',
    snippet: 'news.n6_snippet',
    article: 'news.n6_article',
    category: 'categories.technology',
  },
  {
    id: 7,
    title: 'news.n7_title',
    source: 'sources.govtIndia',
    date: 'dates.oct27',
    snippet: 'news.n7_snippet',
    article: 'news.n7_article',
    category: 'categories.govtPolicies',
  },
];

export const schemesData = [
  {
    id: 1,
    name: 'schemes.pmkisan.name',
    shortName: 'schemes.pmkisan.shortName',
    shortDescription: 'schemes.pmkisan.shortDescription',
    description: 'schemes.pmkisan.description',
    imageUrl: 'https://cdn.tractorkarvan.com/tr:f-webp/images/Blogs/top-central-government-schemes-for-farmers-in-india/pm-kisan.jpg',
    dataAiHint: 'government building',
  },
  {
    id: 2,
    name: 'schemes.pmfby.name',
    shortName: 'schemes.pmfby.shortName',
    shortDescription: 'schemes.pmfby.shortDescription',
    description: 'schemes.pmfby.description',
    imageUrl: 'https://ik.imagekit.io/tractorkarvan/tr:f-webp/images/Articles/pradhan-mantri-fasal-bima-yojana/pradhan-Mantri-Fasal-Bima-Hindi-Blog1.jpg',
    dataAiHint: 'crop insurance',
  },
  {
    id: 3,
    name: 'schemes.enam.name',
    shortName: 'schemes.enam.shortName',
    shortDescription: 'schemes.enam.shortDescription',
    description: 'schemes.enam.description',
    imageUrl: 'https://pbs.twimg.com/media/FLEoCcWakAID1Vq.jpg',
    dataAiHint: 'agriculture market',
  },
  {
    id: 4,
    name: 'schemes.pmkmy.name',
    shortName: 'schemes.pmkmy.shortName',
    shortDescription: 'schemes.pmkmy.shortDescription',
    description: 'schemes.pmkmy.description',
    imageUrl: 'https://www.gyan.bharatagri.com/wp-content/uploads/2024/08/5_Pradhan-Mantri-Kisan-MaanDhan-Yojana-PM-KMY.webp',
    dataAiHint: 'pension scheme',
  },
];

export const farmingQuotes = [
  "quotes.q1", "quotes.q2", "quotes.q3", "quotes.q4", "quotes.q5", "quotes.q6", "quotes.q7", "quotes.q8", "quotes.q9", "quotes.q10",
  "quotes.q11", "quotes.q12", "quotes.q13", "quotes.q14", "quotes.q15", "quotes.q16", "quotes.q17", "quotes.q18", "quotes.q19", "quotes.q20",
  "quotes.q21", "quotes.q22", "quotes.q23", "quotes.q24", "quotes.q25", "quotes.q26", "quotes.q27", "quotes.q28", "quotes.q29", "quotes.q30",
  "quotes.q31", "quotes.q32", "quotes.q33", "quotes.q34", "quotes.q35", "quotes.q36", "quotes.q37", "quotes.q38", "quotes.q39", "quotes.q40",
  "quotes.q41", "quotes.q42", "quotes.q43", "quotes.q44", "quotes.q45", "quotes.q46", "quotes.q47", "quotes.q48", "quotes.q49", "quotes.q50",
  "quotes.q51", "quotes.q52", "quotes.q53", "quotes.q54", "quotes.q55", "quotes.q56", "quotes.q57", "quotes.q58", "quotes.q59", "quotes.q60",
  "quotes.q61", "quotes.q62", "quotes.q63", "quotes.q64", "quotes.q65", "quotes.q66", "quotes.q67", "quotes.q68", "quotes.q69", "quotes.q70"
];
