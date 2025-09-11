
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
            { label: "farmSchool.fertilizers.title", href: "/farm-school/fertilizers" },
            { label: "farmSchool.areaCalculator.title", href: "/farm-school/area-calculator" }
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
        title: 'features.dashboard.title',
        imageUrl: '/images/dashboard.jpeg',
        dataAiHint: 'analytics dashboard',
        href: '/dashboard',
        description: 'features.dashboard.description'
    },
    {
        title: 'features.farmSchool.title',
        imageUrl: '/images/farmschool.jpeg',
        dataAiHint: 'farm school',
        href: '/farm-school',
        description: 'features.farmSchool.description'
    }
];

export const featuresData = baseFeaturesData;


export const newsCategories = [
  'categories.all',
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
    date: 'dates.aug04',
    snippet:'news.n1_snippet',
    article:'news.n1_article',
    category: 'categories.technology',
  },
  {
    id: 2,
    title: 'news.n2_title',
    source: 'sources.farmersJournal',
    date: 'dates.aug04',
    snippet: 'news.n2_snippet',
    article: 'news.n2_article',
    category: 'categories.govtPolicies',
  },
  {
    id: 3,
    title: 'news.n3_title',
    source: 'sources.globalFarming',
    date: 'dates.aug04',
    snippet: 'news.n3_snippet',
    article: 'news.n3_article',
    category: 'categories.weatherUpdates',
  },
    {
    id: 4,
    title: 'news.n4_title',
    source: 'sources.agriInvest',
    date: 'dates.aug04',
    snippet: 'news.n4_snippet',
    article: 'news.n4_article',
    category: 'categories.marketPrices',
  },
  {
    id: 25,
    title: 'news.n25_title_new',
    source: 'sources.agriBusinessUpdate',
    date: 'dates.sep01_25_1400',
    snippet: 'news.n25_snippet_new',
    article: 'news.n25_article_new',
    category: 'categories.farmingTechniques'
  },
  {
    id: 5,
    title: 'news.n5_title',
    source: 'sources.sustainableFarms',
    date: 'dates.aug04',
    snippet: 'news.n5_snippet',
    article: 'news.n5_article',
    category: 'categories.farmingTechniques',
  },
  {
    id: 6,
    title: 'news.n6_title',
    source: 'sources.techCrunch',
    date: 'dates.aug04',
    snippet: 'news.n6_snippet',
    article: 'news.n6_article',
    category: 'categories.technology',
  },
  {
    id: 7,
    title: 'news.n7_title',
    source: 'sources.govtIndia',
    date: 'dates.aug04',
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
  {
    id: 5,
    name: 'schemes.kcc.name',
    shortName: 'schemes.kcc.shortName',
    shortDescription: 'schemes.kcc.shortDescription',
    description: 'schemes.kcc.description',
    imageUrl: 'https://picsum.photos/300/200?random=1',
    dataAiHint: 'credit card',
  },
  {
    id: 6,
    name: 'schemes.pmkusum.name',
    shortName: 'schemes.pmkusum.shortName',
    shortDescription: 'schemes.pmkusum.shortDescription',
    description: 'schemes.pmkusum.description',
    imageUrl: 'https://bluebirdsolar.com/cdn/shop/articles/pm-kusum_655d3efc-4b18-4e4c-bedb-0850d1b671b7.jpg?v=1754551706',
    dataAiHint: 'solar panel farm',
  },
  {
    id: 7,
    name: 'schemes.shc.name',
    shortName: 'schemes.shc.shortName',
    shortDescription: 'schemes.shc.shortDescription',
    description: 'schemes.shc.description',
    imageUrl: 'https://kj1bcdn.b-cdn.net/media/102414/soil-health-card.jpg',
    dataAiHint: 'soil health card',
  },
  {
    id: 8,
    name: 'schemes.smam.name',
    shortName: 'schemes.smam.shortName',
    shortDescription: 'schemes.smam.shortDescription',
    description: 'schemes.smam.description',
    imageUrl: 'https://cdn.tractorkarvan.com/tr:f-webp/images/Blogs/top-central-government-schemes-for-farmers-in-india/smam.jpg',
    dataAiHint: 'farm machinery',
  },
  {
    id: 9,
    name: 'schemes.welfareOfFishermen.name',
    shortName: 'schemes.welfareOfFishermen.shortName',
    shortDescription: 'schemes.welfareOfFishermen.shortDescription',
    description: 'schemes.welfareOfFishermen.description',
    imageUrl: 'https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/national-scheme-for-welfare-of-fishermen.jpg',
    dataAiHint: 'fishermen welfare',
  },
  {
    id: 10,
    name: 'schemes.pmgsy.name',
    shortName: 'schemes.pmgsy.shortName',
    shortDescription: 'schemes.pmgsy.shortDescription',
    description: 'schemes.pmgsy.description',
    imageUrl: 'https://www.krishakjagat.org/wp-content/uploads/2024/12/Untitled-1-251.jpg',
    dataAiHint: 'rural road construction',
  },
  {
    id: 11,
    name: 'schemes.organicManure.name',
    shortName: 'schemes.organicManure.shortName',
    shortDescription: 'schemes.organicManure.shortDescription',
    description: 'schemes.organicManure.description',
    imageUrl: 'https://www.energyportal.in/images/bio/bioenergy01.jpg',
    dataAiHint: 'organic compost',
  },
  {
    id: 12,
    name: 'schemes.coffeeDev.name',
    shortName: 'schemes.coffeeDev.shortName',
    shortDescription: 'schemes.coffeeDev.shortDescription',
    description: 'schemes.coffeeDev.description',
    imageUrl: 'https://jaagrukbharat.com/_next/image?url=https%3A%2F%2Fjaagruk-public.s3.ap-south-1.amazonaws.com%2Farticle%2Fimages%2Fefd6b226-fff2-45f3-85c1-04caf3e96ca0_1XOkvQDhgyGml3c0wlMpI1bV8qO3ArmEP.webp&w=3840&q=10',
    dataAiHint: 'coffee drying yard',
  }
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

export const categorizedCropOptions = [
    {
        category: 'Kharif Crops',
        options: [
            { value: 'Rice', label: 'Rice (Paddy)' },
            { value: 'Maize', label: 'Maize (Corn)' },
            { value: 'Sugarcane', label: 'Sugarcane (Ganna)' },
            { value: 'Soybean', label: 'Soybean (Bhat)' },
            { value: 'Tur', label: 'Tur (Arhar / Pigeon Pea)' },
        ],
    },
    {
        category: 'Rabi Crops',
        options: [
            { value: 'Wheat', label: 'Wheat (Gehu)' },
            { value: 'Barley', label: 'Barley (Jau)' },
            { value: 'Mustard', label: 'Mustard (Sarson)' },
            { value: 'Gram', label: 'Gram (Chana)' },
            { value: 'Peas', label: 'Peas (Matar)' },
        ],
    },
    {
        category: 'Zaid Crops',
        options: [
            { value: 'Watermelon', label: 'Watermelon (Tarbooz)' },
            { value: 'Muskmelon', label: 'Muskmelon (Kharbooja)' },
            { value: 'Cucumber', label: 'Cucumber (Kheera)' },
        ],
    },
    {
        category: '🌿 Field & Commercial Crop',
        options: [
            { value: 'Castor', label: 'Castor (Arandi)'},
            { value: 'Jowar', label: 'Jowar / Sorghum (Jowar / Cholam)'},
            { value: 'Groundnut', label: 'Groundnut (Moongphali / Nilakadalai)'},
            { value: 'Red Gram', label: 'Red Gram (Arhar / Tur Dal)'},
            { value: 'Green Gram', label: 'Green Gram (Moong Dal / Hara Mung)'},
            { value: 'Black Gram', label: 'Black Gram (Urad Dal / Kali Dal)'},
            { value: 'Sesame', label: 'Sesame (Til / Gingelly / Ellu)'},
        ]
    },
    {
        category: '☕️ Plantation Crop',
        options: [
            { value: 'Tea', label: 'Tea (Chai Patti)'},
            { value: 'Coffee', label: 'Coffee (Kafi / Kaapi)'},
            { value: 'Rubber', label: 'Rubber (Rabar / Gutta Percha)'},
            { value: 'Cotton', label: 'Cotton (Kapās)'},
            { value: 'Jute', label: 'Jute (Pat / Resha / Gunnipat)'},
        ]
    },
    {
        category: '🍎 Fruits',
        options: [
            { value: 'Apples', label: 'Apples (Seb)'},
            { value: 'Pears', label: 'Pears (Nashpati)'},
            { value: 'Apricots', label: 'Apricots (Khubani)'},
            { value: 'Walnuts', label: 'Walnuts (Akhrot)'},
            { value: 'Grapes', label: 'Grapes (Angoor)'},
            { value: 'Pineapples', label: 'Pineapples (Ananas)'},
            { value: 'Litchi', label: 'Litchi (Lychee)'},
            { value: 'Guava', label: 'Guava (Amrood)'},
            { value: 'Bananas', label: 'Bananas (Kela)'},
            { value: 'Oranges', label: 'Oranges (Santra / Narangi)'},
            { value: 'Mangoes', label: 'Mangoes (Aam)'},
        ]
    }
];



export const toolsData = [
    {
      id: 'rotavator',
      name: '🚜 1. Rotavator',
      images: [
        '/images/rotavator(1).jpg',
        '/images/rotavetar(2).png'
      ],
      content: {
        introduction: 'A rotavator is a tractor-mounted implement that uses rotating blades to break, churn, and pulverize soil. It is considered one of the fastest and most efficient methods of seedbed preparation.',
        functions: [
          'Crushes soil clods into fine tilth.',
          'Incorporates crop residues into soil (helps composting).',
          'Helps mix organic manure and fertilizers evenly.',
          'Controls initial weed growth.',
        ],
        howItWorks: 'Blades rotate at high speed and cut through soil. Depth can be adjusted depending on crop needs.',
        benefits: [
          'Saves 30–40% time compared to traditional ploughing.',
          'Reduces fuel and labor cost.',
          'Improves soil aeration for root growth.',
        ],
        limitations: [
          'Requires medium to heavy tractor power.',
          'Not suitable for rocky or extremely hard soil.',
        ],
        types: 'Light-duty, Heavy-duty.',
        price: 'Rs. 80,000 – Rs. 2,50,000',
      },
    },
    {
      id: 'harrow',
      name: '🌾 2. Harrow',
      images: [
        '/images/harrow(1).jpg',
        '/images/harrow(2).webp',
        '/images/harrow(3).jpg',
      ],
      content: {
        introduction: 'A harrow is used after ploughing to refine and smooth the soil. It is useful for leveling and preparing a fine seedbed.',
        functions: [
          'Breaks clods and smoothens soil.',
          'Helps cover seeds after broadcasting.',
          'Incorporates fertilizers/manure.',
          'Controls small weeds.',
        ],
        howItWorks: 'Teeth, discs, or spikes drag through soil, breaking it into smaller particles.',
        benefits: [
          'Ensures even seed germination.',
          'Prepares soil faster than manual leveling.',
          'Improves soil texture for root penetration.',
        ],
        limitations: [
          'Multiple passes may be required for heavy soil.',
        ],
        types: 'Disc, Spike-tooth, Spring-tooth.',
        price: 'Rs. 40,000 – Rs. 1,20,000',
      },
    },
    {
      id: 'cultivator',
      name: '🌱 3. Cultivator',
      images: [],
      content: {
        introduction: 'A cultivator is used for secondary tillage — stirring soil, uprooting weeds, and conserving moisture. It is lighter and faster than a plough.',
        functions: [
          'Loosens soil around growing crops.',
          'Destroys weeds without chemicals.',
          'Mixes fertilizers into soil.',
          'Improves water infiltration.',
        ],
        howItWorks: 'Tines or shovels penetrate and stir soil. Some cultivators are fixed, while others are spring-loaded.',
        benefits: [
          'Reduces manual weeding.',
          'Enhances crop health by loosening soil.',
          'Saves time and fuel.',
        ],
        limitations: [
          'Less effective in rocky soil.',
          'Overuse may damage crop roots.',
        ],
        types: 'Rigid tine, Spring tine, Field cultivator.',
        price: 'Rs. 25,000 – Rs. 90,000',
      },
    },
    {
      id: 'sprayer',
      name: '🚿 4. Sprayer',
      images: [
        '/images/sprayer(1).webp',
        '/images/sprayer(2).jpg',
        '/images/sprayer(3).webp',
      ],
      content: {
        introduction: 'A sprayer is used to apply pesticides, herbicides, fungicides, and fertilizers uniformly over crops. It protects plants from pests and enhances yield.',
        functions: [
          'Protects crops from pests/diseases.',
          'Delivers liquid nutrients directly to plants.',
          'Helps in weed control (herbicide spraying).',
        ],
        howItWorks: 'Liquid chemical is pressurized and sprayed through nozzles in fine droplets, covering leaves and stems.',
        benefits: [
          'Reduces chemical wastage.',
          'Ensures uniform coverage.',
          'Saves labor compared to manual spraying.',
        ],
        limitations: [
          'Needs proper calibration to avoid crop damage.',
          'Overuse may harm soil and environment.',
        ],
        types: 'Hand sprayer, Knapsack, Tractor-mounted power sprayer.',
        price: 'Rs. 1,000 – Rs. 25,000',
      },
    },
    {
      id: 'seed-drill',
      name: '🌿 5. Seed Drill',
      images: [
        '/images/seeder.webp',
        '/images/seeder(2).jpg',
        '/images/seeder(3).jpg',
      ],
      content: {
        introduction: 'A seed drill is a machine that sows seeds at the correct depth and spacing, covering them with soil for proper germination.',
        functions: [
          'Places seeds uniformly.',
          'Ensures correct depth and row spacing.',
          'Saves seeds by preventing wastage.',
        ],
        howItWorks: 'Seeds drop from a hopper through tubes and get placed in furrows made by the machine, then covered with soil.',
        benefits: [
          'Increases yield due to uniform crop stand.',
          'Saves 10–15% seeds compared to manual sowing.',
          'Faster sowing → more timely harvest.',
        ],
        limitations: [
          'Needs trained handling for calibration.',
          'Tractor-mounted models are costly for small farmers.',
        ],
        types: 'Manual, Bullock-drawn, Tractor-mounted.',
        price: 'Rs. 15,000 – Rs. 1,50,000',
      },
    },
    {
      id: 'trailer',
      name: '🚛 6. Trailer',
      images: [
        '/images/trailer(1).webp',
        '/images/trailer(2).webp',
        '/images/trailer(3).jpg',
      ],
      content: {
        introduction: 'A trailer is a non-powered vehicle pulled by a tractor. It is essential for transporting crops, tools, and goods within and outside the farm.',
        functions: [
          'Transport of harvested crops to market.',
          'Carrying fertilizers, seeds, pesticides, and tools.',
          'Moving building materials, fodder, or livestock.',
        ],
        howItWorks: 'Attached to tractor with a hitch. Some trailers have hydraulic tipping for easy unloading.',
        benefits: [
          'Saves time and labor in transport.',
          'Reduces dependency on external transport.',
          'Flexible — can carry multiple types of loads.',
        ],
        limitations: [
          'Requires tractor for movement.',
          'Overloading can damage tractor engine.',
        ],
        types: 'Flatbed, Tipping, Enclosed.',
        price: 'Rs. 1,00,000 – Rs. 4,00,000',
      },
    },
  ];