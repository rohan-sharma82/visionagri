
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
        title: 'nav.cropYield',
        imageUrl: 'https://jcblagri.in/x_images/blog_pics/1667806089agri_blog.png',
        dataAiHint: 'crop field',
        href: '/crop-yield'
    },
    {
        title: 'nav.aiFarmer',
        imageUrl: 'https://framerusercontent.com/images/g0YTRh7uRHpbWQgSZz62bO050.png?width=1378&height=880',
        dataAiHint: 'chatbot robot',
        href: '/ai-farmer'
    },
    {
        title: 'nav.diseaseClassification',
        imageUrl: 'https://cdn11.bigcommerce.com/s-tjrce8etun/product_images/uploaded_images/leave-with-fungus.jpg',
        dataAiHint: 'diseased crop',
        href: '/disease-classification'
    },
    {
        title: 'nav.animalClassification',
        imageUrl: 'https://www.shunya.live/wp-content/uploads/2024/07/Farmer-dairy-economy-india-shunya-1024x579.png',
        dataAiHint: 'farm animals',
        href: '/animal-classification'
    },
    {
        title: 'nav.govtSchemes',
        imageUrl: 'https://timesofagriculture.in/wp-content/uploads/2023/08/feature-image-2-1-1-1-scaled.jpg',
        dataAiHint: 'government scheme',
        href: '/govt-schemes'
    },
];

export const featuresData = baseFeaturesData.map((feature, index) => {
    const descriptions = [
        'features.cropYield.description',
        'features.aiFarmer.description',
        'features.diseaseClassification.description',
        'features.animalClassification.description',
        'features.govtSchemes.description',
    ];
    return {
        ...feature,
        description: descriptions[index]
    };
});


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
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    shortName: 'PM-KISAN',
    shortDescription: 'Provides income support to all landholding farmers\' families to supplement their financial needs for agriculture and domestic needs.',
    description: `Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a new Central Sector Scheme to provide income support to all landholding farmers' families in the country to supplement their financial needs for procuring various inputs related to agriculture and allied activities as well as domestic needs.

Eligibility
All land holding eligible farmer families (subject to the prevalent exclusion criteria) are to avail of the benefits under this scheme.

The following categories of beneficiaries of higher economic status shall not be eligible for benefit under the scheme.

All Institutional Land holders.
Farmer families in which one or more of its members belong to following categories
Former and present holders of constitutional posts
Former and present Ministers/ State Ministers and former/present Members of LokSabha/ RajyaSabha/ State Legislative Assemblies/ State Legislative Councils,former and present Mayors of Municipal Corporations, former and present Chairpersons of District Panchayats.
All serving or retired officers and employees of Central/ State Government Ministries /Offices/Departments and its field units Central or State PSEs and Attached offices /Autonomous Institutions under Government as well as regular employees of the Local Bodies (Excluding Multi Tasking Staff /Class IV/Group D employees)
All superannuated/retired pensioners whose monthly pension is Rs.10,000/-or more (Excluding Multi Tasking Staff / Class IV/Group D employees) of above category
All Persons who paid Income Tax in last assessment year
Professionals like Doctors, Engineers, Lawyers, Chartered Accountants, and Architects registered with Professional bodies and carrying out profession by undertaking practices.

Benefits
Under the PM-KISAN scheme, all landholding farmers' families shall be provided the financial benefit of Rs. 6000 per annum per family payable in three equal installments of Rs. 2000 each, every four months.

How to apply
The eligible farmers may apply with the village Patwaris, revenue officials or other designated officers / agencies and submit their required details to them.
Farmers can also visit their nearest Common Service Centres (CSCs) for registration in the Scheme upon payment of fees.
Farmers can also do their self-registration through the Farmers Corner in the PM KISAN portal. To check the status of the registration, click here.
Details required for registration include Name, Age, Gender, Category(SC/ST), Aadhaar Number (in case Aadhaar Number has not been issued then Aadhaar Enrollment Number together with any other prescribed documents for purposes of the identification such as Driving Licence, Voters’ ID Card, NREGA Job Card, or any other identification documents issued by Central/State/UT Governments or their authorities,etc.), Bank Account Number and the Mobile Number of the beneficiaries.
For more details visit PM KISAN portal.`,
    imageUrl: 'https://cdn.tractorkarvan.com/tr:f-webp/images/Blogs/top-central-government-schemes-for-farmers-in-india/pm-kisan.jpg',
    dataAiHint: 'government building',
  },
  {
    id: 2,
    name: 'Pradhan Mantri Fasal Bima Yojana',
    shortName: 'PM fasal Yojna',
    shortDescription: 'Provides insurance coverage and financial support to farmers in the event of crop failure due to natural calamities, pests, and diseases.',
    description: `The Pradhan Mantri Fasal Bima Yojana (PMFBY) is a crop insurance scheme launched by the Government of India in 2016. The scheme aims to provide financial protection to farmers against crop losses due to natural calamities, pests, and diseases.

The scheme is mandatory for all farmers cultivating notified crops in notified areas. The premium for the scheme is shared between the government and the farmers. The government bears 50% of the premium for small and marginal farmers, while the farmers bear the remaining 50%.

The scheme provides coverage against crop losses due to drought, flood, hailstorm, cyclone, pests, and disease. The scheme also provides coverage against post-harvest losses due to fire, theft, and other unforeseen events.

The scheme is administered by the National Agricultural Insurance Company (NIAC) and its subsidiaries. The scheme has been well-received by farmers and has helped to reduce their vulnerability to crop losses.

Here are some of the benefits of the PMFBY scheme:

It provides financial protection to farmers against crop losses due to natural calamities, pests, and diseases.
It helps to reduce farmers' vulnerability to crop losses.
It helps to improve the income of farmers.
It helps to stabilize the agricultural sector.
It helps to promote sustainable agriculture.
The PMFBY scheme is a major step towards ensuring food security in India. The scheme has helped to reduce farmers' vulnerability to crop losses and has helped to improve their income. The scheme is a major boost to the agricultural sector and is helping to promote sustainable agriculture.`,
    imageUrl: 'https://ik.imagekit.io/tractorkarvan/tr:f-webp/images/Articles/pradhan-mantri-fasal-bima-yojana/pradhan-Mantri-Fasal-Bima-Hindi-Blog1.jpg',
    dataAiHint: 'crop insurance',
  },
  {
    id: 3,
    name: 'E-NAM(National Agriculture Market)',
    shortName: 'E-NAM',
    shortDescription: 'eNAM (National Agriculture Market) is a pan-India electronic trading portal that networks the existing APMC (Agriculture Produce Marketing Committee) mandis to create a unified national market for agricultural commodities.',
    description: `🌾 National Agriculture Market (eNAM)

eNAM (National Agriculture Market) is a pan-India electronic trading portal that networks the existing APMC (Agriculture Produce Marketing Committee) mandis to create a unified national market for agricultural commodities. It was launched on April 14, 2016, by the Ministry of Agriculture and Farmers’ Welfare, Government of India, with the Small Farmers Agribusiness Consortium (SFAC) as the lead implementing agency.

🎯 Vision

To promote uniformity in agricultural marketing by streamlining procedures across integrated markets.

To remove information gaps between buyers and sellers.

To enable real-time price discovery based on actual demand and supply.

🚀 Mission

Integration of APMCs across the country through a common online market platform.

Facilitate pan-India trade in agricultural commodities.

Ensure better price discovery through a transparent auction process based on quality of produce.

Provide timely online payments to farmers.

🌟 Key Benefits of eNAM

✅ Real-time price discovery based on demand & supply
✅ Reduced transaction costs for farmers, traders, and buyers
✅ Wider market access beyond local mandis
✅ Transparent & accountable trading process
✅ Improved mandi infrastructure and facilities
✅ Faster payments through online system

📊 eNAM in Numbers (as of March 8, 2023)

1,260 mandis onboarded across 22 states & 3 union territories

Trade facilitated: 120+ million MT of commodities

Value of trade: ₹1.2 trillion+

🛠 Key Features

A single-window platform for all APMC-related information and services.

Online trading of agricultural commodities.

Transparent auctions based on quality.

Better market linkages for farmers across India.

🏬 India’s Largest Agriculture Market

The Enumamula Agriculture Market in Warangal, Telangana, is the largest wholesale turmeric market in the world and one of the biggest agricultural markets in India.

✨ eNAM is a major government initiative aimed at transforming agricultural marketing in India by giving farmers fair prices, wider reach, and more transparency.`,
    imageUrl: 'https://pbs.twimg.com/media/FLEoCcWakAID1Vq.jpg',
    dataAiHint: 'agriculture market',
  },
  {
    id: 4,
    name: 'Pradhan Mantri Kisan Maandhan Yojana',
    shortName: 'PM Kisan Maandhan',
    shortDescription: 'A voluntary and contributory pension scheme for small and marginal farmers in India to ensure financial security in their old age.',
    description: `🌾 Pradhan Mantri Kisan Maandhan Yojana (PM-KMY)

Pradhan Mantri Kisan Maandhan Yojana (PM-KMY) is a voluntary and contributory pension scheme for small and marginal farmers in India. It was launched on 12 September 2019 by Prime Minister Narendra Modi to ensure financial security for farmers in their old age.

🎯 Objective

To provide a guaranteed monthly pension of ₹3,000 to small and marginal farmers after the age of 60 years.

👩‍🌾 Eligibility

Small and marginal farmers with cultivable land up to 2 hectares

Age group: 18 to 40 years

💰 Contributions

Farmers contribute a fixed amount (₹55 – ₹200 per month) depending on age.

Contribution continues for 20 years or until the farmer turns 60 years, whichever is earlier.

Government matches the farmer’s contribution (up to ₹1,000/month).

🏦 How to Join

Farmers need to open a pension account with LIC (Life Insurance Corporation of India).

LIC manages the pension funds and ensures payouts.

📌 Benefits

✅ Guaranteed ₹3,000 monthly pension after 60 years
✅ Pension continues for the rest of the farmer’s life
✅ Financial security in old age
✅ Shared contribution between farmer & government

✨ PM-KMY is a safety net for India’s small and marginal farmers, ensuring dignity and stability in their later years.`,
    imageUrl: 'https://www.gyan.bharatagri.com/wp-content/uploads/2024/08/5_Pradhan-Mantri-Kisan-MaanDhan-Yojana-PM-KMY.webp',
    dataAiHint: 'pension scheme',
  },
];

export const farmingQuotes = [
  "quotes.q1", "quotes.q2", "quotes.q3", "quotes.q4", "quotes.q5", "quotes.q6", "quotes.q7", "quotes.q8", "quotes.q9", "quotes.q10",
  "quotes.q11", "quotes.q12", "quotes.q13", "quotes.q14", "quotes.q15", "quotes.q16", "quotes.q17", "quotes.q18", "quotes.q19", "quotes.q20",
  "quotes.q21", "quotes.q22", "quotes.q23", "quotes.q24", "quotes.q25", "quotes.q26", "quotes.q27", "quotes.q28", "quotes.q29", "quotes.q30",
  "quotes.q31", "quotes.q32", "quotes.q33", "quotes.q34", "quotesq.35", "quotes.q36", "quotes.q37", "quotes.q38", "quotes.q39", "quotes.q40",
  "quotes.q41", "quotes.q42", "quotes.q43", "quotes.q44", "quotes.q45", "quotes.q46", "quotes.q47", "quotes.q48", "quotes.q49", "quotes.q50",
  "quotes.q51", "quotes.q52", "quotes.q53", "quotes.q54", "quotes.q55", "quotes.q56", "quotes.q57", "quotes.q58", "quotes.q59", "quotes.q60",
  "quotes.q61", "quotes.q62", "quotes.q63", "quotes.q64", "quotes.q65", "quotes.q66", "quotes.q67", "quotes.q68", "quotes.q69", "quotes.q70"
];
