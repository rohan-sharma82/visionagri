
export interface Veterinarian {
    name: string;
    type: string;
    rating?: string;
    experience?: string;
    location: string;
    hours: string;
    phone?: string;
    comment?: string;
}

export const veterinarianData: { [key: string]: Veterinarian[] } = {
    'delhi': [
        { name: 'My Vet Pet Clinic & Surgery Center', type: 'Medical Clinic', rating: '5.0 (46)', location: 'Delhi', hours: 'Opens 9 am', phone: '08766250309' },
        { name: 'Agrawal Dog and Cat Clinic', type: 'Veterinarian', experience: '3+ years', location: 'New Delhi, Delhi', hours: 'Open 24 hours', phone: '09016754325', comment: 'Dr. Himanshu, knowledgeable and skilled veterinarian.' },
        { name: 'DCC Animal Hospital & Petcare', type: 'Veterinarian', experience: '5+ years', location: 'New Delhi, Delhi', hours: 'Opens 10 am', phone: '09311560101', comment: 'Great care and planned post-operative approach.' },
        { name: 'BLU CROSS Veterinary Hospital', type: 'Veterinarian', experience: '3+ years', location: 'New Delhi, Delhi', hours: 'Open 24 hours', phone: '09629046142', comment: 'Experienced doctor who handles pets with love and care.' },
        { name: 'Vet Fort Pet Clinic', type: 'Veterinarian', experience: '3+ years', location: 'New Delhi, Delhi', hours: 'Open 24 hours', phone: '08887829840' },
        { name: 'Dr. Poonia Pet Centre 24x7', type: 'Veterinarian', experience: '5+ years', location: 'New Delhi, Delhi', hours: 'Open 24 hours', phone: '08595452204', comment: 'Dr. Poonia is excellent, very helpful, treats pets very well.' },
        { name: 'Vetic Pet Clinic Greater Kailash 1', type: 'Veterinarian', rating: '4.7 (557)', location: 'Delhi', hours: 'Open 24 hours', phone: '09811379153' },
        { name: "Dr. Choudhary's Pet Clinic", type: 'Veterinarian', experience: '15+ years', location: 'New Delhi, Delhi', hours: 'Opens 10 am', phone: '01124113000', comment: 'Doctors saved my pet’s life at least twice.' },
        { name: 'Dog and Cat Clinic – Premier Veterinary Hospital', type: 'Veterinarian', experience: '15+ years', location: 'New Delhi, Delhi', hours: 'Opens 10 am', phone: '09810013156' },
        { name: 'Veterinary Hospital NDMC', type: 'Animal Hospital', experience: '10+ years', location: 'New Delhi, Delhi', hours: 'Opens 9 am', phone: '01124672161', comment: 'They ensure your pet is healed and pain-free.' },
        { name: 'Loyal Pet Clinic & Surgery Centre', type: 'Veterinarian', experience: '5+ years', location: 'New Delhi, Delhi', hours: 'Opens 10 am', phone: '08585991213', comment: 'Vets explain diagnoses and treatment options clearly.' },
        { name: "Dr. Kharb's Pet Clinic & Surgery", type: 'Veterinarian', experience: '10+ years', location: 'New Delhi, Delhi', hours: 'Opens 9 am', phone: '09968844927', comment: 'Great doctors and excellent veterinary care.' },
        { name: 'Vet4Pet Clinic', type: 'Animal Hospital', rating: '4.3 (56)', location: 'Delhi', hours: 'Open 24 hours', phone: '09079368567', comment: 'Won’t take our pet anywhere else.' },
        { name: "Dr. Surinder Singh's Dog Clinic", type: 'Veterinarian', experience: '35+ years', location: 'New Delhi, Delhi', hours: 'Opens 8:30 am', phone: '08595471249', comment: 'Clean, hygienic, experienced staff and vet.' },
        { name: 'Dr. Davender Singh Pet Clinic', type: 'Veterinarian', experience: '7+ years', location: 'Delhi', hours: 'Opens 9 am', phone: '25258900', comment: 'Gives very good suggestions about pets.' },
        { name: "Dr. Ankush Maini's Pet Clinic", type: 'Veterinarian', experience: '10+ years', location: 'New Delhi, Delhi', hours: 'Opens 10 am', phone: '08882670800', comment: 'Does not give unnecessary medicines, reasonable charges.' },
        { name: "Dr. Puri's Pet Clinic", type: 'Veterinarian', experience: '7+ years', location: 'New Delhi, Delhi', hours: 'Opens 9:30 am', phone: '09312260168', comment: 'Best advice for your pets at a reasonable price.' },
        { name: 'Vetic Pet Clinic Defence Colony', type: 'Veterinarian', rating: '4.7 (609)', location: 'Delhi', hours: 'Opens 10 am', phone: '08929008896' },
        { name: 'Creative Veterinary Hospital – Shahdara', type: 'Veterinarian', rating: '4.6 (222)', location: 'New Delhi, Delhi', hours: 'Opens 9 am', phone: '07505609311', comment: 'Low-cost, good treatment and staff.' }
    ],
    'haryana': [
        { name: 'SKRD Veterinary Hospital', type: 'Veterinarian', rating: '4.5 (1.7K)', experience: '15+ years', location: 'Gurugram, Haryana', hours: 'Open 24 hours', phone: '09911116896', comment: 'Dr Sandeep Yadav is extremely experienced and learned Vet.' },
        { name: 'Doctor MINTU Dahiya', type: 'Emergency Veterinarian', rating: '5.0 (41)', location: 'Nakloi, Haryana', hours: 'Open 24 hours', phone: '08053700403' },
        { name: 'Haryana Veterinary Council', type: 'Council', rating: '3.5 (12)', location: 'Panchkula, Haryana', hours: 'Opens 9 am', phone: '01722579777' },
        { name: 'VetHome Pet Clinic (Home Visit)', type: 'Veterinarian', rating: '4.9 (203)', experience: '5+ years', location: 'Rohtak, Haryana', hours: 'Open 24 hours', phone: '08570903230' },
        { name: 'Parth Vet Clinic and Laboratory', type: 'Veterinarian', rating: '5.0 (113)', location: 'Hansi, Haryana', hours: 'Open 24 hours', phone: '09992309002' },
        { name: 'Pet Solutions Multi Speciality Pet Hospital', type: 'Veterinarian', rating: '4.2 (516)', experience: '10+ years', location: 'Panipat, Haryana', hours: 'Open 24 hours', phone: '09254292543' },
        { name: 'Dr. Rajender Sharma', type: 'Veterinarian', rating: '4.5 (8)', experience: '7+ years', location: 'Patti Kalyana, Haryana', hours: 'Open 24 hours', phone: '09416392596' },
        { name: 'CGS Veterinary Hospital', type: 'Animal Hospital', rating: '4.2 (2.5K)', experience: '10+ years', location: 'Gurugram, Haryana', hours: 'Open 24 hours', phone: '09311014490' },
        { name: 'SJS Pet Care and Clinic', type: 'Veterinarian', rating: '4.9 (2.1K)', experience: '7+ years', location: 'Gurugram, Haryana', hours: 'Opens 10 am', phone: '09971004223' },
        { name: 'Veterinary Doctor – Dr. Sharma', type: 'Veterinarian', rating: '5.0 (11)', location: 'Panchkula, Haryana', hours: 'N/A', phone: 'N/A' },
        { name: 'Pet Clinic Hisar', type: 'Emergency Veterinarian', rating: '4.8 (186)', location: 'Hisar, Haryana', hours: 'Open 24 hours', phone: '09992959935' },
        { name: 'Teaching Veterinary Clinical Complex', type: 'Veterinarian', rating: '4.5 (514)', experience: '10+ years', location: 'Hisar, Haryana', hours: 'Opens 7 am', phone: '01662256102' },
        { name: 'Haryana Veterinary Council – Sec 3', type: 'Animal Hospital', rating: '4.2 (66)', experience: '7+ years', location: 'Panchkula, Haryana', hours: 'Closes 5 am', phone: '01722579777' },
        { name: 'Pet Chikitsa Veterinary Hospital', type: 'Veterinarian', rating: '4.8 (2K)', experience: '10+ years', location: 'Gurugram, Haryana', hours: 'Opens 9:30 am', phone: '07303022201' },
        { name: 'Govt Vet Hospital', type: 'Animal Hospital', rating: '4.0 (79)', experience: '10+ years', location: 'Ambala, Haryana', hours: 'Opens 9 am', phone: 'N/A' },
        { name: 'Dr. Vikrant Singh Dog & Vet Clinic', type: 'Emergency Veterinarian', rating: '4.6 (40)', location: 'Haryana', hours: 'Open 24 hours', phone: '09548569761' },
        { name: 'Veterinary Polyclinic Jind', type: 'Hospital', rating: '5.0 (1)', location: 'Jind, Haryana', hours: 'Open 24 hours', phone: '01681245229' },
        { name: 'Lala Lajpat Rai University of Veterinary Sciences', type: 'University', rating: '4.5 (479)', location: 'Hisar, Haryana', hours: 'Opens 9 am', phone: '01662256065' },
        { name: 'Pet Town Dog and Cat Clinic', type: 'Veterinarian', rating: '4.9 (32)', location: 'tcp3, Haryana', hours: 'Open 24 hours', phone: '08295314017' },
        { name: 'Dr. Subhash Gujjar Barsi', type: 'Emergency Veterinarian', rating: '5.0 (4)', location: 'Bawani Khera, Haryana', hours: 'Open 24 hours', phone: '09992060004' },
        { name: 'City Pet Hospital Kurukshetra', type: 'Veterinarian', rating: '4.2 (159)', experience: '3+ years', location: 'Kurukshetra, Haryana', hours: 'Open 24 hours', phone: '09499111197' },
        { name: 'Your Pet Dog Clinic – Ambala', type: 'Veterinarian', rating: '4.1 (100)', experience: '7+ years', location: 'Ambala Sadar, Haryana', hours: 'Opens 10 am', phone: '09896227819' },
        { name: 'Pet Tales Vet Hospital', type: 'Veterinarian', rating: '4.8 (23)', experience: '3+ years', location: 'Rohtak, Haryana', hours: 'Open 24 hours', phone: '09996333888' },
        { name: 'Dabla Pet Care & Clinic', type: 'Emergency Veterinarian', rating: '4.4 (67)', location: 'Ambala, Haryana', hours: 'Open 24 hours', phone: '08814075858' },
        { name: 'Government Veterinary Hospital – Kurukshetra', type: 'Animal Hospital', rating: '4.4 (17)', experience: '7+ years', location: 'Kurukshetra, Haryana', hours: 'Open 24 hours', phone: 'N/A' },
        { name: 'Military Veterinary Clinic', type: 'Veterinarian', rating: '4.3 (101)', experience: '10+ years', location: 'Panchkula, Haryana', hours: 'Open 24 hours', phone: 'N/A' },
        { name: 'Safe Hands Veterinary Hospital', type: 'Veterinarian', rating: '5.0 (8)', experience: '3+ years', location: 'Ambala Cantt, Haryana', hours: 'Opens 10 am', phone: '08722196655' },
        { name: 'Dogs Care Clinic', type: 'Veterinarian', rating: '4.4 (145)', experience: '10+ years', location: 'Ambala, Haryana', hours: 'Opens 9 am', phone: '09316040619' },
        { name: 'Dr. Nain', type: 'Hospital', rating: '4.3 (6)', location: 'Kalwan, Haryana', hours: 'Open 24 hours', phone: '08570809100' },
        { name: 'Pet Animal Medical Centre', type: 'Animal Hospital', rating: '4.3 (1.1K)', experience: '7+ years', location: 'Panchkula, Haryana', hours: 'Opens 8 am', phone: '01722562055' },
        { name: 'Buffalo Hospital', type: 'Animal Hospital', rating: '4.6 (5)', experience: '5+ years', location: 'Mohla, Haryana', hours: 'Open 24 hours', phone: 'N/A' },
        { name: 'Government Veterinary Hospital – Karnal', type: 'Animal Hospital', rating: '3.6 (24)', experience: '7+ years', location: 'Karnal, Haryana', hours: 'Open 24 hours', phone: 'N/A' },
        { name: "Rishi's Den Vet Care", type: 'Emergency Veterinarian', rating: '5.0 (2)', location: 'Bhali Anandpur, Haryana', hours: 'Open 24 hours', phone: 'N/A' },
        { name: 'Ani-Vets Pet Hospital', type: 'Veterinarian', rating: '4.9 (113)', experience: '10+ years', location: 'Yamuna Nagar, Haryana', hours: 'Opens 10:30 am', phone: 'N/A' },
        { name: 'Govt. Veterinary Dispensary – Bhatol Jattan', type: 'Animal Hospital', rating: '5.0 (1)', experience: '5+ years', location: 'Haryana', hours: 'Opens 8 am', phone: 'N/A' },
        { name: 'Government Veterinary Hospital – Kalka', type: 'Animal Hospital', rating: '4.2 (66)', experience: '10+ years', location: 'Kalka', hours: 'Opens 8 am', phone: 'N/A' },
        { name: 'Govt Animal Hospital – Jamba', type: 'Veterinary Care', rating: '4.7 (3)', experience: '10+ years', location: 'Jamba', hours: 'N/A', phone: '01745261112' },
        { name: 'Government Veterinary Dispensary – Mohabatpur', type: 'Animal Hospital', rating: '5.0 (3)', experience: '5+ years', location: 'Mohabatpur', hours: 'N/A', phone: 'N/A' },
        { name: 'Animal Hospital – Urlana Khurd', type: 'Animal Hospital', rating: '4.4 (11)', experience: '7+ years', location: 'Urlana Khurd', hours: 'N/A', phone: 'N/A' },
        { name: 'Government Veterinary Hospital – Ahlisadar', type: 'Hospital', rating: '5.0 (1)', location: 'Ahlisadar', hours: 'Opens 8:30 am', phone: 'N/A' },
        { name: 'Govt. Veterinary Hospital – Uklana', type: 'Animal Hospital', rating: '4.0 (26)', experience: '10+ years', location: 'Budha Khera', hours: 'N/A', phone: 'N/A' },
        { name: 'Vikas Malik – Umra', type: 'Veterinarian', rating: '5.0 (1)', experience: '30+ years', location: 'Umra', hours: 'Open 24 hours', phone: '09813417507' },
        { name: 'Govt Veterinary Hospital – Sunarian', type: 'Government Office', location: 'Sunarian', hours: 'N/A', phone: 'N/A' },
        { name: 'Veterinary Hospital – Bara', type: 'Veterinary Pharmacy', rating: '5.0 (3)', location: 'Bara', hours: 'Opens 8:30 am', phone: 'N/A' },
        { name: 'Malhotra Vet Pharma', type: 'Veterinary Care', rating: '4.5 (6)', location: 'N/A', hours: 'N/A', phone: 'N/A', comment: 'You can get food and medicine for your pets.' },
        { name: 'Govt Veterinary Hospital – Kharbala', type: 'Veterinary Pharmacy', location: 'Kharbala', hours: 'Closes 2:30 am', phone: 'N/A' },
        { name: 'Dr. Raj Pet Hospital – Jind', type: 'Animal Hospital', rating: '3.8 (10)', experience: '3+ years', location: 'Jind', hours: 'Opens 9:30 am', phone: '09050602494' },
        { name: 'Government Veterinary Hospital – Mundia Khera', type: 'Animal Hospital', rating: '4.3 (24)', experience: '10+ years', location: 'Mundia Khera', hours: 'Opens 8 am', phone: 'N/A' },
        { name: 'Life Line Pet Clinic', type: 'Doctor', rating: '5.0 (23)', location: 'Kurukshetra', hours: 'Opens 9 am', phone: '01744459944' },
        { name: 'Pet Purrfect Veterinary Clinic', type: 'Emergency Veterinarian', rating: '4.9 (143)', location: 'Bhiwani', hours: 'Opens 10:30 am', phone: '09053949400' },
        { name: 'Jind Pet Clinic', type: 'Veterinarian', rating: '4.5 (138)', experience: '10+ years', location: 'Jind', hours: 'Opens 9 am', phone: '09466630027' },
        { name: 'DR. U.S. Pet Clinic', type: 'Veterinarian', rating: '4.9 (134)', experience: '5+ years', location: 'Faridabad', hours: 'Opens 10 am', phone: '08630571025' },
        { name: 'Petpals Veterinary Clinic', type: 'Veterinarian', rating: '5.0 (4)', location: 'Sonipat', hours: 'Opens 10 am', phone: '09306997065' },
        { name: 'Vet Care Dog Clinic', type: 'Veterinarian', rating: '4.1 (168)', experience: '10+ years', location: 'Panchkula', hours: 'Opens 10 am', phone: '09417350877' },
        { name: 'Govt. Animals Hospital – Mohra', type: 'Animal Hospital', rating: '3.7 (3)', experience: '7+ years', location: 'Mohra', hours: 'Opens 9 am', phone: 'N/A' },
        { name: 'Animal Husbandry & Dairying Department', type: 'Government Office', rating: '3.5 (31)', location: 'Panchkula', hours: 'Opens 9 am', phone: '01722580338' },
        { name: 'PETS ‘n’ VETS City Dog Clinic', type: 'Animal Hospital', rating: '4.6 (42)', location: 'Rohtak', hours: 'Opens 8 am', phone: 'N/A', comment: 'Doctors here saved my dog’s life.' },
        { name: 'Government Veterinary Hospital – Faridabad', type: 'Animal Hospital', rating: '3.7 (607)', location: 'Faridabad', hours: 'N/A', phone: 'N/A' }
    ],
    // Add other states here with empty arrays as placeholders
    'andhra-pradesh': [], 'arunachal-pradesh': [], 'assam': [], 'bihar': [],
    'chhattisgarh': [], 'goa': [], 'gujarat': [], 'himachal-pradesh': [],
    'jharkhand': [], 'karnataka': [], 'kerala': [], 'madhya-pradesh': [],
    'maharashtra': [], 'manipur': [], 'meghalaya': [], 'mizoram': [],
    'nagaland': [], 'odisha': [], 'punjab': [], 'rajasthan': [], 'sikkim': [],
    'tamil-nadu': [], 'telangana': [], 'tripura': [], 'uttar-pradesh': [],
    'uttarakhand': [], 'west-bengal': []
};
