# AgriVision AI - SIH 2025

This document outlines the project details for the Smart India Hackathon 2025 submission, structured to align with the official PPT guidelines.

---

### **Slide 1: Title Page**

- **Problem Statement ID:** (To be filled by the team)
- **Problem Statement Title:** (To be filled by the team)
- **Theme:** Agriculture, FoodTech & Rural Development
- **PS Category:** Software
- **Team ID:** (To be filled by the team)
- **Team Name:** (To be filled by the team)
- **Idea Title:** AgriVision AI: Smart Farming for a Sustainable Future

---

### **Slide 2: Proposed Solution**

**Idea: AgriVision AI** is an intelligent, multilingual web platform designed to empower farmers by providing a suite of AI-driven tools, real-time information, and a personalized dashboard to address key agricultural challenges.

**How it Addresses the Problem:**
- **Reduces Guesswork:** Our AI models replace traditional guesswork with data-driven predictions for crop yield and disease detection, leading to better decision-making.
- **Improves Financial Outcomes:** The **Market Price Analysis** feature provides historical price trends and an AI-driven forecast, empowering farmers to decide the most profitable time to sell their produce.
- **Breaks Down Barriers:** The platform is fully multilingual and features a simple, intuitive UI with voice input/output, making advanced technology accessible to farmers of all literacy levels.
- **Provides Instant Expertise:** The AI Farmer Assistant acts as a 24/7 agricultural expert, offering instant, weather-aware advice that was previously hard to obtain.
- **Centralizes and Personalizes Information:** The **Personalized Dashboard** consolidates critical information like localized weather forecasts, market analysis for the farmer's specific crops, and recommended government schemes into a single, easy-to-use hub.

**Innovation & Uniqueness:**
- **Hyper-Localized & Context-Aware AI:** Our solution integrates real-time, location-specific weather data directly into our Genkit AI flows, providing highly contextual advice (e.g., suggesting not to spray pesticides before rain).
- **Multi-Modal AI Interaction:** Farmers can interact via text or voice, and receive responses in text and audio format, catering to diverse user preferences and literacy levels.
- **Proactive & Predictive Tools:** Instead of just providing information, our platform offers predictive tools for crop yield, early disease detection, and market price forecasting, enabling proactive farm management.
- **Unified & Personalized Farmer Dashboard:** AgriVision AI is more than a collection of tools; it's a comprehensive ecosystem with a personalized dashboard that provides a holistic view of a farmer's operations, creating a single source of truth for decision-making. This dashboard is powered by a **Supabase Postgres database**, enabling true personalization and persistent data storage.

---

### **Slide 3: Technical Approach**

**Technologies Used:**
- **Frontend:**
  - **Next.js & React:** Chosen for its high-performance, server-first approach. We leverage the Next.js App Router and Server Components to minimize client-side JavaScript, ensuring the app is fast and responsive even on low-bandwidth connections.
  - **Tailwind CSS & ShadCN UI:** This combination allows for rapid development of a modern, accessible, and aesthetically pleasing user interface.
  - **Recharts:** Used for creating the interactive market price analysis charts on the dashboard.

- **AI & Backend:**
  - **Google Genkit:** The core of our AI backend. Genkit enables us to create robust, observable, and tool-enabled AI flows. It orchestrates calls to various models and external APIs (like the WeatherAPI), making our AI agents more powerful.
  - **Google AI Platform (Gemini Models):** We use the powerful Gemini family of models for their state-of-the-art multi-modal capabilities, handling everything from complex reasoning for the AI Assistant to market data analysis and image classification.

- **Database:**
  - **Supabase (Postgres with Connection Pooling):** A serverless PostgreSQL database used to store and manage user data, including profiles and chat history for the AI Farmer Assistant. We use a **transaction pooler** to efficiently manage database connections, making the application scalable and resilient to handle a high volume of concurrent users.

- **Hosting:**
  - **Vercel:** The ideal platform for deploying Next.js applications, providing a seamless CI/CD pipeline, global CDN, and serverless functions for scalability and performance.

- **APIs & Tools:**
  - **WeatherAPI Tool:** A Genkit Tool that provides real-time, location-specific weather data, making our AI's advice more accurate and context-aware.
  - **Market Price Tool:** A Genkit Tool (currently using mock data) to simulate fetching historical crop price data, which is then analyzed by an AI flow.

**Methodology & Flowchart:**

**User Interaction Flow:**
*A farmer opens AgriVision AI and selects a feature (e.g., AI Assistant, Dashboard, Crop Prediction).*
*The user provides input via text, forms, or image uploads. For the dashboard, a simulated login retrieves the user's profile from the database.*
*The Next.js frontend securely sends the data to the appropriate server-side Genkit flow.*

**Genkit AI Flow (Backend):**
*The specific Genkit flow is invoked (e.g., `getFarmingAdviceFlow`, `getMarketPriceAnalysisFlow`).*
*The flow can use **Tools** to call external services, like fetching real-time weather or historical market prices.*
*It then calls the appropriate Google Gemini model with a structured prompt.*
*The AI model processes the input and returns a structured JSON output (e.g., advice, prediction, diagnosis, analysis).*
*This result is sent back to the user's screen and rendered as text, charts, or audio.*
*For the AI Assistant, conversations are saved to and retrieved from the Supabase Postgres database.*

**(A flowchart image would be ideal here, showing User -> Next.js -> Genkit Flow (with Tools) -> Google AI -> Supabase DB -> User)**

![Flowchart Placeholder](https://picsum.photos/800/400?data-ai-hint=flowchart+diagram)

---

### **Slide 4: Feasibility & Viability**

**Analysis of Feasibility:**
- **Technical Feasibility:** The tech stack (Next.js, Genkit, Supabase) is modern, well-documented, and designed for scalability. The use of managed services reduces infrastructure overhead.
- **Economic Feasibility:** The operational cost is low due to the serverless architecture. We have a clear monetization path via a **Freemium model**:
  - **Free Tier:** Core features (News, Schemes, limited AI Assistant) will be free to ensure wide accessibility.
  - **Premium Tier:** A subscription will unlock advanced features like the personalized dashboard, unlimited AI queries, historical data analysis, and detailed farm analytics. Revenue from this tier will subsidize the free tier.
- **Operational Feasibility:** The multilingual and voice-enabled interface ensures the platform is usable by the target demographic with minimal training.

**Potential Challenges & Risks:**
- **Internet Connectivity:** Rural areas may have poor internet access.
  - **Mitigation:** Design the app for low-bandwidth usage. Future versions can explore offline capabilities for key features.
- **Data Accuracy:** AI model accuracy depends on data quality. Real-world market price data would require a reliable API.
  - **Mitigation:** Continuously fine-tune models with user feedback. For market data, integrate with a verified government or private API.
- **User Adoption:** Overcoming resistance to new technology.
  - **Mitigation:** Partner with local agricultural bodies (Krishi Vigyan Kendras) for outreach. A simple, intuitive UI is key.

---

### **Slide 5: Impact & Benefits**

**Potential Impact on Target Audience (Farmers):**
- **Increased Profitability:** Optimized resource use, higher yields, and better market timing for sales lead directly to increased income.
- **Reduced Crop Loss:** Early disease detection and timely advice help prevent catastrophic crop failures.
- **Empowerment:** Access to information, personalized insights, and advanced tools empowers farmers to make independent, data-driven decisions.

**Social, Economic & Environmental Benefits:**
- **Social:** Improves the livelihood and knowledge base of farming communities. Reduces the digital divide.
- **Economic:** Boosts the agricultural sector's contribution to the GDP. Creates a more resilient and efficient food supply chain.
- **Environmental:** Promotes sustainable farming by optimizing the use of water, fertilizers, and pesticides, reducing environmental impact.

---

### **Slide 6: Research & References**

- **Datasets:**
  - Crop Diseases Classification Dataset (for disease classification model training).
  - Government of India's open data portals (for schemes and agricultural statistics) (Data.gov.in, https://agriwelfare.gov.in/).
- **References:**
  - "Image-based crop disease detection using machine learning" - (https://bsppjournals.onlinelibrary.wiley.com/doi/10.1111/ppa.14006).
  - "Machine Learning for Crop Yield Prediction" - (https://link.springer.com/article/10.1007/s00521-024-10226-x).
- **APIs and Services:**
  - Google Genkit Documentation: [https://firebase.google.com/docs/genkit](https://firebase.google.com/docs/genkit)
  - WeatherAPI: [https://www.weatherapi.com/](https://www.weatherapi.com/)
  - Supabase: [https://supabase.com/](https://supabase.com/)

**Mission: Smarter Fields, Better Yields.**
