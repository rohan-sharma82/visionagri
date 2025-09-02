

export const mainNavLinks = [
  { href: '/', label: 'nav.home' },
  { href: '/dashboard', label: 'nav.dashboard' },
  { href: '/crop-yield', label: 'nav.cropYield' },
  { href: '/ai-farmer', label: 'nav.aiFarmer' },
  { href: '/disease-classification', label: 'nav.diseaseClassification' },
  { href: '/animal-classification', label: 'nav.animalClassification' },
];

export const cardNavItems = [
    {
        label: "nav.govtSchemes",
        bgColor: "hsl(var(--card))",
        textColor: "hsl(var(--card-foreground))",
        links: [
            { label: "schemes.pmkisan.shortName", href: "/govt-schemes" },
            { label: "schemes.pmfby.shortName", href: "/govt-schemes" },
            { label: "schemes.enam.shortName", href: "/govt-schemes" },
            { label: "schemes.pmkmy.shortName", href: "/govt-schemes" }
        ]
    },
    {
        label: "nav.farmSchool",
        bgColor: "hsl(var(--muted))",
        textColor: "hsl(var(--muted-foreground))",
        links: [
            { label: "features.farmSchool.tools.title", href: "/farm-school/tools" },
            { label: "farmSchool.fertilizers.title", href: "#" },
            { label: "farmSchool.areaCalculator.title", href: "#" }
        ]
    }
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
  {
    id: 8,
    title: 'news.n8_title',
    source: 'sources.imdNews',
    date: 'dates.aug31_25',
    snippet: 'news.n8_snippet',
    article: 'news.n8_article',
    category: 'categories.weatherUpdates',
  },
  {
    id: 9,
    title: 'news.n9_title',
    source: 'sources.metDept',
    date: 'dates.aug31_25_2115',
    snippet: 'news.n9_snippet',
    article: 'news.n9_article',
    category: 'categories.weatherUpdates',
  },
  {
    id: 10,
    title: 'news.n10_title',
    source: 'sources.metDept',
    date: 'dates.aug31_25_2112',
    snippet: 'news.n10_snippet',
    article: 'news.n10_article',
    category: 'categories.weatherUpdates',
  },
  {
    id: 11,
    title: 'news.n11_title',
    source: 'sources.mhaNews',
    date: 'dates.aug31_25_2106',
    snippet: 'news.n11_snippet',
    article: 'news.n11_article',
    category: 'categories.weatherUpdates',
  },
  {
    id: 12,
    title: 'news.n12_title',
    source: 'sources.stateNews',
    date: 'dates.aug31_25_1250',
    snippet: 'news.n12_snippet',
    article: 'news.n12_article',
    category: 'categories.weatherUpdates',
  },
  {
    id: 13,
    title: 'news.n13_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n13_snippet',
    article: 'news.n13_article',
    category: 'categories.farmingTechniques',
  },
  {
    id: 14,
    title: 'news.n14_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n14_snippet',
    article: 'news.n14_article',
    category: 'categories.farmingTechniques',
  },
  {
    id: 15,
    title: 'news.n15_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n15_snippet',
    article: 'news.n15_article',
    category: 'categories.farmingTechniques',
  },
  {
    id: 16,
    title: 'news.n16_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n16_snippet',
    article: 'news.n16_article',
    category: 'categories.farmingTechniques',
  },
  {
    id: 17,
    title: 'news.n17_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n17_snippet',
    article: 'news.n17_article',
    category: 'categories.farmingTechniques',
  },
  {
    id: 18,
    title: 'news.n18_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n18_snippet',
    article: 'news.n18_article',
    category: 'categories.farmingTechniques',
  },
  {
    id: 19,
    title: 'news.n19_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n19_snippet',
    article: 'news.n19_article',
    category: 'categories.farmingTechniques',
  },
  {
    id: 20,
    title: 'news.n20_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n20_snippet',
    article: 'news.n20_article',
    category: 'categories.farmingTechniques',
  },
  {
    id: 21,
    title: 'news.n21_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n21_snippet',
    article: 'news.n21_article',
    category: 'categories.farmingTechniques',
  },
  {
    id: 22,
    title: 'news.n22_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n22_snippet',
    article: 'news.n22_article',
    category: 'categories.govtPolicies',
  },
  {
    id: 23,
    title: 'news.n23_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n23_snippet',
    article: 'news.n23_article',
    category: 'categories.technology',
  },
  {
    id: 24,
    title: 'news.n24_title',
    source: 'sources.agriKnowledge',
    date: 'dates.sep01_25',
    snippet: 'news.n24_snippet',
    article: 'news.n24_article',
    category: 'categories.technology',
  }
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
