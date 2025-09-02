
export const regionalUnitsData = [
    {
      id: 'north-india',
      region: 'North India (Punjab, Haryana, Himachal Pradesh)',
      units: [
        {
          name: 'Killa',
          description: 'A "Killa" is a term commonly used in Punjab and Haryana and is essentially equivalent to 1 Acre.',
          conversion: '1 Killa = 1 Acre = 43,560 square feet.'
        },
        {
          name: 'Bigha',
          description: "The size of a Bigha varies. In Punjab and Haryana, it's often a fraction of a Killa. It's important to note there are also 'Kaccha Bigha' and 'Pucca Bigha' with different values.",
          conversion: '1 Bigha = 0.25 Killa = 10,890 square feet (in consolidated areas).'
        },
        {
          name: 'Kanal',
          description: 'Often used in conjunction with Marla and Killa.',
          conversion: '1 Kanal = 0.125 Acre = 5,445 square feet.'
        },
        {
          name: 'Marla',
          description: 'A smaller unit related to Kanal and Killa.',
          conversion: '1 Marla = 272.25 square feet. , 1 Kanal = 20 Marlas ,1 Killa = 8 Kanals = 160 Marlas.'
        }
      ]
    },
    {
      id: 'central-west-india',
      region: 'Central & West India (Uttar Pradesh, Rajasthan, Madhya Pradesh, Gujarat)',
      units: [
        {
          name: 'Bigha',
          description: "This unit has significant variation. In Uttar Pradesh, 1 Pucca Bigha can be around 27,000 sq ft. In Rajasthan, a Bigha can be around 27,225 sq ft or more. A 'Pucca Bigha' is also used, which equals 3,025 square yards or about 27,225 square feet.",
          conversion: 'Varies significantly by region.'
        },
        {
          name: 'Biswa',
          description: 'Biswa is a sub-unit of a Bigha, with 20 Biswa usually making up 1 Bigha. The size of a Biswa, therefore, depends on the size of a Bigha in that specific location.',
          conversion: '1 Bigha = 20 Biswa.'
        },
        {
          name: 'Guntha',
          description: 'Used in Maharashtra, Karnataka, and Andhra Pradesh.',
          conversion: '1 Guntha = 1,089 square feet. 1 Acre = 40 Gunthas.'
        }
      ]
    },
    {
      id: 'south-india',
      region: 'South India (Tamil Nadu, Kerala, Karnataka, Andhra Pradesh)',
      units: [
        {
          name: 'Cent',
          description: 'This is a very common unit in South India.',
          conversion: '1 Cent = 435.6 square feet. 1 Acre = 100 Cents.'
        },
        {
          name: 'Ground',
          description: 'Primarily used in Tamil Nadu, particularly in Chennai.',
          conversion: '1 Ground = 2,400 square feet.'
        },
        {
          name: 'Ankanam',
          description: 'Used in parts of Andhra Pradesh and Karnataka.',
          conversion: '1 Ankanam = 72 square feet.'
        },
        {
          name: 'Kuncham',
          description: 'Used in Andhra Pradesh.',
          conversion: '1 Kuncham = 484 square yards.'
        }
      ]
    },
    {
      id: 'east-india',
      region: 'East India (West Bengal, Bihar, Assam)',
      units: [
        {
          name: 'Katha',
          description: 'The size of a Katha varies dramatically by state.',
          conversion: 'West Bengal: 1 Katha ≈ 720 sq ft.\nBihar: 1 Katha ≈ 1,361 sq ft.\nAssam: 1 Katha ≈ 2,880 sq ft.'
        },
        {
          name: 'Dhur',
          description: 'A smaller unit often used in Bihar and Jharkhand.',
          conversion: '1 Dhur = 68.06 square feet.'
        },
        {
          name: 'Decimal',
          description: 'Used in West Bengal.',
          conversion: '1 Decimal = 48.4 square yards. 1 Acre = 100 Decimals.'
        }
      ]
    }
  ];

export const soilTypeExplanations = [
    {
      name: "Alluvial Soil",
      description: "Rich in humus and very fertile. Found in the Great Northern Plains, river valleys, and coastal plains. Suitable for a wide variety of crops like rice, wheat, sugarcane, and vegetables."
    },
    {
      name: "Black Soil (Regur)",
      description: "Clayey, retains moisture. Ideal for cotton cultivation, also suitable for oilseeds, wheat, and millets. Found in the Deccan Plateau (Maharashtra, Madhya Pradesh, Gujarat)."
    },
    {
      name: "Red and Yellow Soil",
      description: "Less fertile, rich in iron. Suitable for millets, pulses, and tobacco. Found in parts of the Deccan Plateau, Odisha, and Chhattisgarh. Requires fertilizers for good yields."
    },
    {
      name: "Laterite Soil",
      description: "Found in areas with high temperature and rainfall. Rich in iron and aluminum. Suitable for tea, coffee, rubber, and cashew nuts. Found in Western Ghats, Eastern Ghats, and parts of Assam."
    },
    {
      name: "Arid (Desert) Soil",
      description: "Sandy and saline. Low in moisture and humus. Suitable for drought-resistant crops like barley, millet, and some pulses with irrigation. Found in Western Rajasthan and parts of Gujarat."
    },
    {
      name: "Forest and Mountain Soil",
      description: "Varies in composition. Generally acidic with low humus. Suitable for tea, coffee, spices, and temperate fruits. Found in the Himalayan region and other mountain areas."
    },
    {
      name: "Loamy Soil",
      description: "A mix of sand, silt, and clay. Considered ideal for agriculture as it has good drainage and aeration, and retains moisture and nutrients. Suitable for most crops."
    },
    {
      name: "Sandy Soil",
      description: "Large particles, poor water retention. Drains quickly and has low nutrient content. Best for crops that don't require much water, like cacti, or with heavy irrigation and fertilization."
    },
    {
      name: "Clay Soil",
      description: "Small particles, high water retention. Can become waterlogged. Rich in nutrients. Suitable for crops that thrive in wet conditions like rice."
    }
  ];
  
  export const indianStatesData = [
    {
      name: "Andhra Pradesh",
      rainfall: "900 - 1100 mm",
      temperature: "25 - 35°C",
      soilTypes: ["Red Soil", "Black Soil", "Alluvial Soil"],
      notes: "Coastal areas are prone to cyclones, affecting rainfall patterns."
    },
    {
      name: "Arunachal Pradesh",
      rainfall: "2000 - 4000 mm",
      temperature: "15 - 25°C",
      soilTypes: ["Forest and Mountain Soil", "Laterite Soil"],
      notes: "Heavy rainfall during monsoon season. Mountainous terrain."
    },
    {
      name: "Assam",
      rainfall: "2000 - 3000 mm",
      temperature: "20 - 30°C",
      soilTypes: ["Alluvial Soil", "Laterite Soil"],
      notes: "Known for tea cultivation. Prone to flooding from the Brahmaputra river."
    },
    {
      name: "Bihar",
      rainfall: "1000 - 1200 mm",
      temperature: "20 - 35°C",
      soilTypes: ["Alluvial Soil"],
      notes: "Ganges plains are extremely fertile."
    },
    {
      name: "Chhattisgarh",
      rainfall: "1200 - 1400 mm",
      temperature: "25 - 38°C",
      soilTypes: ["Red and Yellow Soil", "Laterite Soil"],
      notes: "Known as the 'rice bowl' of India."
    },
    {
      name: "Goa",
      rainfall: "3000 - 3500 mm",
      temperature: "25 - 30°C",
      soilTypes: ["Laterite Soil", "Alluvial Soil"],
      notes: "Coastal climate with high humidity."
    },
    {
      name: "Gujarat",
      rainfall: "400 - 1000 mm",
      temperature: "25 - 40°C",
      soilTypes: ["Black Soil", "Arid Soil", "Alluvial Soil"],
      notes: "Large arid and semi-arid regions in Kutch and Saurashtra."
    },
    {
      name: "Haryana",
      rainfall: "450 - 650 mm",
      temperature: "15 - 40°C",
      soilTypes: ["Alluvial Soil", "Arid Soil"],
      notes: "Relies heavily on irrigation from Yamuna river."
    },
    {
      name: "Himachal Pradesh",
      rainfall: "1200 - 1800 mm",
      temperature: "0 - 25°C",
      soilTypes: ["Forest and Mountain Soil"],
      notes: "Altitude greatly affects temperature and crop suitability (apples, potatoes)."
    },
    {
      name: "Jharkhand",
      rainfall: "1200 - 1400 mm",
      temperature: "20 - 35°C",
      soilTypes: ["Red and Yellow Soil", "Laterite Soil"],
      notes: "Plateau region with significant forest cover."
    },
    {
      name: "Karnataka",
      rainfall: "600 - 3000 mm",
      temperature: "20 - 35°C",
      soilTypes: ["Red Soil", "Black Soil", "Laterite Soil"],
      notes: "Vast variation in rainfall between coastal areas (heavy) and northern plains (dry)."
    },
    {
      name: "Kerala",
      rainfall: "2500 - 3500 mm",
      temperature: "25 - 32°C",
      soilTypes: ["Laterite Soil", "Alluvial Soil"],
      notes: "Tropical climate ideal for spices, rubber, and coconut."
    },
    {
      name: "Madhya Pradesh",
      rainfall: "800 - 1200 mm",
      temperature: "22 - 40°C",
      soilTypes: ["Black Soil", "Red and Yellow Soil"],
      notes: "Largest producer of pulses and soybeans in India."
    },
    {
      name: "Maharashtra",
      rainfall: "600 - 3000 mm",
      temperature: "25 - 38°C",
      soilTypes: ["Black Soil", "Laterite Soil", "Red Soil"],
      notes: "Deccan Plateau is dominated by black cotton soil. Vidarbha region is drought-prone."
    },
    {
      name: "Manipur",
      rainfall: "1500 - 2500 mm",
      temperature: "15 - 28°C",
      soilTypes: ["Forest and Mountain Soil", "Red Soil"],
      notes: "Loktak Lake influences local agriculture."
    },
    {
      name: "Meghalaya",
      rainfall: "2500 - 12000 mm",
      temperature: "15 - 25°C",
      soilTypes: ["Laterite Soil", "Red and Yellow Soil"],
      notes: "Home to Mawsynram, the wettest place on Earth."
    },
    {
      name: "Mizoram",
      rainfall: "2000 - 3000 mm",
      temperature: "18 - 28°C",
      soilTypes: ["Forest and Mountain Soil"],
      notes: "Hilly terrain, practices 'Jhum' or shifting cultivation."
    },
    {
      name: "Nagaland",
      rainfall: "1800 - 2500 mm",
      temperature: "16 - 28°C",
      soilTypes: ["Forest and Mountain Soil"],
      notes: "Agriculture is the main source of livelihood."
    },
    {
      name: "Odisha",
      rainfall: "1400 - 1600 mm",
      temperature: "25 - 38°C",
      soilTypes: ["Red and Yellow Soil", "Alluvial Soil", "Laterite Soil"],
      notes: "Frequently hit by cyclones on its coast."
    },
    {
      name: "Punjab",
      rainfall: "600 - 800 mm",
      temperature: "15 - 40°C",
      soilTypes: ["Alluvial Soil"],
      notes: "Known as the 'Granary of India'. Highly dependent on canal irrigation."
    },
    {
      name: "Rajasthan",
      rainfall: "200 - 800 mm",
      temperature: "25 - 45°C",
      soilTypes: ["Arid Soil", "Sandy Soil", "Alluvial Soil"],
      notes: "Large part is covered by the Thar Desert. Extreme temperatures."
    },
    {
      name: "Sikkim",
      rainfall: "2500 - 3500 mm",
      temperature: "5 - 20°C",
      soilTypes: ["Forest and Mountain Soil"],
      notes: "First state in the world to be 100% organic."
    },
    {
      name: "Tamil Nadu",
      rainfall: "900 - 1200 mm",
      temperature: "25 - 38°C",
      soilTypes: ["Red Soil", "Black Soil", "Laterite Soil"],
      notes: "Receives most of its rainfall from the Northeast monsoon (Oct-Dec)."
    },
    {
      name: "Telangana",
      rainfall: "700 - 1000 mm",
      temperature: "25 - 40°C",
      soilTypes: ["Red Soil", "Black Soil"],
      notes: "Hot and dry climate."
    },
    {
      name: "Tripura",
      rainfall: "2200 - 2500 mm",
      temperature: "22 - 32°C",
      soilTypes: ["Red and Yellow Soil", "Laterite Soil"],
      notes: "Known for rubber and bamboo cultivation."
    },
    {
      name: "Uttar Pradesh",
      rainfall: "800 - 1200 mm",
      temperature: "20 - 40°C",
      soilTypes: ["Alluvial Soil"],
      notes: "Largest producer of wheat, sugarcane, and potatoes."
    },
    {
      name: "Uttarakhand",
      rainfall: "1500 - 2000 mm",
      temperature: "5 - 30°C",
      soilTypes: ["Forest and Mountain Soil"],
      notes: "Plain and mountainous regions have distinct agro-climatic zones."
    },
    {
      name: "West Bengal",
      rainfall: "1400 - 2000 mm",
      temperature: "25 - 35°C",
      soilTypes: ["Alluvial Soil", "Laterite Soil"],
      notes: "Major producer of rice and jute. Gangetic delta is very fertile."
    }
  ];
  
