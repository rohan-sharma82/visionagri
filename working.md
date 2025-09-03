# AgriVision AI: How It Works

This document provides a detailed breakdown of the AgriVision AI application, explaining its architecture, technologies, features, and key components. Its purpose is to serve as a comprehensive guide for understanding how the project is built and functions.

---

## 1. High-Level Architecture & Philosophy

AgriVision AI is built as a modern, server-centric web application. Most of the heavy lifting (like rendering pages and running AI models) is done on the server, sending a lightweight, fast, and interactive user interface to the user's device. This architecture is ideal for our target audience, who may have low-bandwidth internet.

- **Component-Based UI**: The user interface is built from small, reusable React components, which keeps the code organized and consistent.
- **AI Logic Decoupling**: We've intentionally separated the AI logic into its own set of "flows" using Google Genkit. This makes the AI functionality modular, easy to test, and maintain.
- **Database-Driven Personalization**: The application uses a **Supabase Postgres** database to store user data, enabling persistent and personalized experiences like the dashboard and chat history.
- **Multilingual First**: The app was designed from the ground up to be multilingual, using a centralized translation system to support various Indian languages.

---

## 2. Technology Stack Deep Dive

### Frontend

- **Next.js (with App Router)**: We use Next.js for its performance optimizations.
  - **App Router & Server Components**: This new paradigm allows us to render non-interactive parts of the UI on the server, drastically reducing the JavaScript sent to the client and making the app load very quickly.

- **React & TypeScript**: The foundation of our UI, enabling interactive components and ensuring code quality with static types.

### UI & Styling

- **Tailwind CSS & ShadCN UI**: This combination provides a vast library of pre-built, accessible, and easily customizable UI components (Buttons, Cards, Dialogs, etc.), which dramatically accelerates development.
- **Framer Motion & Custom CSS**: We use these for fluid animations and unique visual effects, like the animated cards, "gooey" buttons, and the 3D login prism, to create a polished and engaging user experience.
- **Recharts**: A composable charting library used to display the market price analysis graph on the dashboard.

### AI & Backend Logic

- **Google Genkit**: The heart of our AI capabilities. Genkit is a framework for building production-ready AI applications.
  - **Flows (`src/ai/flows/`)**: Each core AI feature has its own flow file (e.g., `ai-farmer-assistant.ts`, `market-price-analysis.ts`). A flow defines:
    1.  **Input/Output Schemas (with Zod)**: Enforces data integrity.
    2.  **Prompt Templates**: The instructions we give to the AI model, with dynamic data inserted using Handlebars syntax (`{{{...}}}`).
    3.  **Tool Usage**: The ability for a flow to use external tools, like our `weather.ts` tool.

- **Google AI Platform (Gemini Models)**: We use Google's powerful Gemini models for their excellent reasoning (AI Assistant), multi-modal (Disease/Animal Classification), and text-to-speech capabilities.

- **Supabase (Postgres)**: A serverless PostgreSQL database.
  - **Why?**: It's essential for storing user data to enable our key personalization features. It integrates seamlessly with our Vercel hosting environment.
  - **What it powers**: The login system, persistent chat history for the AI Assistant, and the personalized content on the user dashboard.

- **External APIs & Genkit Tools**:
  - **WeatherAPI (`src/ai/tools/weather.ts`)**: Wrapped as a Genkit tool, this allows our AI flows to fetch real-time weather data to provide contextual advice.
  - **Market Price API (`src/ai/tools/market-price.ts`)**: A tool that simulates fetching historical crop price data. This is then used by the `market-price-analysis` flow to generate trends and forecasts.

---

## 3. Feature Breakdown

### **Personalized Dashboard (`/dashboard`)**
This is the central hub for the farmer.
1.  **Authentication**: A user logs in via the interactive **3D Login Prism**. The prism is a CSS `preserve-3d` element where different faces (Login, Sign Up) are rotated into view.
2.  **Data Fetching**: Upon login, the page fetches data from a hardcoded user profile (`allDashboardData`) which specifies the user's location and primary crop.
3.  **Parallel AI Calls**: It then concurrently calls two Genkit flows:
    - `getDashboardWeather`: Fetches a comprehensive weather report for the user's location.
    - `getMarketPriceAnalysis`: Fetches historical prices for the user's primary crop and uses an AI prompt to generate a trend analysis and forecast.
4.  **Dynamic Rendering**: The results are displayed in a series of cards, including a `MarketPriceChart` for price visualization. The UI shows loading states while the AI calls are in progress.

### **AI Farmer Assistant (`/ai-farmer`)**
1.  **Chat Interface**: A standard chat UI that stores the conversation history in the **Supabase Postgres** database via Server Actions (`src/app/ai-farmer/actions.ts`). This ensures the conversation is persistent.
2.  **AI Integration**: When a user sends a message, the `getFarmingAdvice` Genkit flow is called. If a location is set, this flow uses the `getWeatherForLocation` tool to make its advice more relevant.
3.  **Speech-to-Text**: Uses the browser's native `SpeechRecognition` API to transcribe the user's voice into text, which is then submitted.
4.  **Text-to-Speech**: After receiving a response, the `textToSpeech` flow is called to generate an audio version of the advice, enhancing accessibility.

### **Classification Tools (Disease & Animal)**
These pages follow a similar pattern:
1.  **Image Upload**: The user uploads an image. A `FileReader` converts it into a Base64 Data URI.
2.  **API Call**: The Data URI is sent to the relevant Genkit flow (`classifyCropDisease` or `animalClassification`).
3.  **Display Results**: The structured JSON response from the AI (e.g., disease name, confidence score) is displayed in a result card.

### **Information Hubs (Govt. Schemes & Farm School)**
- **Static Content with Dynamic UI**: These pages display information from static data arrays (`src/lib/constants.ts`).
- **Interactive Components**: They use components like `Dialog` to show detailed information in pop-ups and `Accordion` to organize content neatly, providing a rich user experience without needing a complex backend.

### **Internationalization (i18n)**
- **`AppProvider` & `useTranslation` Hook**: This context/hook pattern provides a global `t(key)` function.
- **JSON Files (`/locales`)**: All display text is stored as key-value pairs (e.g., `home.welcome`). This allows the entire UI to be translated by simply switching the active language, which then loads the corresponding JSON file.
