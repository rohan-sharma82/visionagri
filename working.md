# AgriVision AI: Technical Deep Dive for SIH Judges

This document provides a comprehensive breakdown of the AgriVision AI application, explaining its architecture, technologies, features, and key components. Its purpose is to serve as a comprehensive guide for understanding how the project is built and functions.

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
- **Framer Motion & Custom CSS**: We use these for fluid animations and unique visual effects, like the animated cards and gooey buttons, to create a polished and engaging user experience.
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

## 3. Feature-by-Feature Breakdown

### **a. Personalized Dashboard (`/dashboard`)**

- **What it is**: A central, personalized hub for each farmer, providing the most critical information at a glance.
- **How it works**:
  1.  **Authentication**: Users sign in via the `/login` page. Supabase handles user authentication. The Next.js middleware protects the `/dashboard` route, redirecting unauthenticated users.
  2.  **Data Fetching**: Upon a successful login, the dashboard fetches the user's profile from the Supabase database (e.g., their name, primary crop).
  3.  **Parallel AI Calls**: It concurrently calls two Genkit flows:
      - `getDashboardWeather`: Fetches a comprehensive weather report using the WeatherAPI tool.
      - `getMarketPriceAnalysis`: Fetches historical prices for the user's primary crop and uses an AI prompt to generate a trend analysis and forecast.
  4.  **Dynamic Rendering**: The results are displayed in a series of cards. The UI shows loading skeletons while the AI calls are in progress to provide a smooth user experience.
- **Future Scope**:
    - Allow farmers to enter their actual harvest data to compare against predictions, creating a feedback loop to fine-tune the AI models.
    - Integrate live Mandi price APIs to replace the current mock data.

### **b. AI Farmer Assistant (`/ai-farmer`)**

- **What it is**: A 24/7 conversational AI expert that answers farming-related questions.
- **How it works**:
  1.  **Chat Interface**: A standard chat UI that saves the conversation history to the **Supabase Postgres** database via Server Actions (`src/app/ai-farmer/actions.ts`). This makes the chat persistent across sessions.
  2.  **Context-Aware AI**: When a user asks a question, the `getFarmingAdvice` Genkit flow is called. If the user has set a location, this flow first uses the `getWeatherForLocation` tool to fetch real-time weather data. It then includes this weather data in the prompt sent to the Gemini model, allowing the AI to give highly contextual advice (e.g., "Don't spray pesticides, it's about to rain.").
  3.  **Accessibility**:
      - **Speech-to-Text**: Uses the browser's native `SpeechRecognition` API to transcribe the user's voice into text.
      - **Text-to-Speech**: After receiving a response, the `textToSpeech` flow is called to generate an audio version of the advice, making the app accessible to users with varying literacy levels.
- **Future Scope**:
    - Allow the AI Assistant to access more tools, like a tool to check the user's crop history or recent disease reports from the database.
    - Implement multi-turn conversation memory to have more stateful, follow-up discussions.

### **c. Disease & Animal Classification (`/disease-classification`, `/animal-classification`)**

- **What it is**: AI-powered tools that use computer vision to identify crop diseases or animal species from an uploaded image.
- **How it works**:
  1.  **Image Upload**: The user uploads an image. The frontend uses a `FileReader` to convert the image into a Base64 Data URI.
  2.  **API Call**: This Data URI is sent as a string to the appropriate Genkit flow (`classifyCropDisease` or `animalClassification`). The `{{media url=...}}` Handlebars helper in the prompt allows the Gemini Vision model to "see" the image.
  3.  **Structured Output**: The AI is prompted to return a structured JSON object containing not just the classification, but also a confidence score, a description, and actionable suggestions.
- **Future Scope**:
    - Store classification history in the database so a farmer can track disease outbreaks over time.
    - Expand the model to identify pests and nutrient deficiencies.

### **d. Government Schemes & Farm School (`/govt-schemes`, `/farm-school`)**

- **What they are**: Centralized, easy-to-navigate information hubs for critical farming knowledge.
- **How they work**:
  - **Static Content, Dynamic UI**: The information for these pages is stored in local data files (`src/lib/constants.ts`). This makes the pages extremely fast to load as no database call is needed.
  - **Interactive Components**: They use UI components like `Dialog` (for pop-up details) and `Accordion` (for collapsible sections) to present a large amount of information in a clean, user-friendly way. This provides a rich user experience without the need for a complex backend.
- **Future Scope**:
    - **Personalized Scheme Suggestions**: Create a Genkit flow that analyzes a farmer's profile (location, crops, land size) and proactively recommends the most relevant government schemes, linking directly to them from the dashboard.

### **e. Multilingual Support (Internationalization)**

- **What it is**: The ability for the entire user interface to be displayed in multiple Indian languages.
- **How it works**:
  - **`AppProvider` & `useTranslation` Hook**: A React Context provider wraps the entire application. This provides a `t(key)` translation function to all components.
  - **JSON Files (`/locales`)**: All display text is stored as key-value pairs in JSON files (e.g., `en.json`, `pa.json`). The `t('home.welcome')` function looks up the `home.welcome` key in the currently active language file.
  - **Language Switcher**: The language switcher component simply calls `setLanguage('pa')`, which updates the context, loads the `pa.json` file, and causes React to re-render the UI with the new text.
- **Future Scope**:
    - Add real-time AI-powered translation for user-generated content, such as messages in a future community forum.