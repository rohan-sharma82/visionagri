# AgriVision AI 🇮🇳

### Smart Farming for a Sustainable Future

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Genkit](https://img.shields.io/badge/Genkit-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://firebase.google.com/docs/genkit)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)

AgriVision AI is an intelligent, multilingual web platform designed to empower farmers by providing a suite of AI-driven tools, real-time information, and a personalized dashboard to address key agricultural challenges. This project is built for the Smart India Hackathon (SIH).

---

## 🚀 Key Features

-   **🤖 AI Farmer Assistant**: A 24/7 conversational AI expert providing instant, weather-aware advice on all farming queries. Features multilingual support with voice input/output.
-   **📈 Crop Yield Prediction**: A data-driven tool that forecasts crop yield based on soil type, weather, farm size, and other agricultural inputs.
-   **🌿 Crop Disease Classification**: An image recognition tool to diagnose crop diseases from a photo of a leaf, providing instant feedback and treatment suggestions.
-   **🐄 Animal Classification & Info**: An image recognition tool to identify livestock breeds (with a focus on Indian cattle) and provides detailed information and actionable advice.
-   **☀️ Personalized Dashboard**: A central hub for farmers, showcasing localized weather forecasts, market price analysis for their primary crop, and recommended government schemes.
-   **🇮🇳 Government Schemes & News**: A curated, easy-to-access repository of relevant government schemes and the latest agricultural news.
-   **📚 Farm School**: An educational section providing foundational knowledge on farming tools, fertilizers, cropping patterns, and profit-making tips.

---

## 🛠️ Tech Stack

-   **Frontend**:
    -   **Next.js & React**: For a high-performance, server-first architecture using the App Router.
    -   **Tailwind CSS & ShadCN UI**: For modern, accessible, and rapid UI development.
    -   **Recharts**: For interactive charts in the Market Price Analysis section.
    -   **Framer Motion**: For smooth animations and transitions.

-   **AI & Backend**:
    -   **Google Genkit**: The core AI backend, orchestrating robust, tool-enabled AI flows that call various services and models.
    -   **Google AI Platform (Gemini Models)**: For multi-modal capabilities, handling complex reasoning, image classification, and text-to-speech.

-   **Database**:
    -   **Supabase (Postgres with Connection Pooling)**: A serverless database for user authentication, profiles, and storing chat history.

-   **Hosting**:
    -   **Vercel**: For seamless deployment, CI/CD, and global performance.

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your-username/AgriVision-AI.git
    cd AgriVision-AI
    ```

2.  **Install NPM packages**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables**
    -   Create a `.env.local` file in the root of your project.
    -   You will need API keys for Supabase and the WeatherAPI.
    -   Copy the contents of `.env.example` into your new `.env.local` file and fill in the values.

    ```env
    # Supabase credentials (find these in your Supabase project settings)
    NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
    SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
    SUPABASE_DATABASE_URL="your-supabase-db-connection-string"

    # Google AI / Gemini API Key
    GEMINI_API_KEY="your-gemini-api-key"

    # WeatherAPI Key (for real-time weather data)
    WEATHER_API_KEY="your-weatherapi-key"
    ```

4.  **Run the Development Server**
    -   This command starts the Next.js app.
        ```sh
        npm run dev
        ```
    -   The application should now be running on [http://localhost:3000](http://localhost:3000).

5.  **Run the Genkit AI Flows (in a separate terminal)**
    -   This command starts the Genkit development server, which runs your AI flows.
        ```sh
        npm run genkit:watch
        ```

---

## 📸 Screenshots

*(Add screenshots of your application here to give a visual overview.)*

| Dashboard                                            | AI Farmer Assistant                                    |
| ---------------------------------------------------- | ------------------------------------------------------ |
| ![Dashboard](https://picsum.photos/800/600?random=1) | ![AI Assistant](https://picsum.photos/800/600?random=2) |

| Disease Classification                                   | Crop Yield Prediction                                    |
| -------------------------------------------------------- | -------------------------------------------------------- |
| ![Disease ID](https://picsum.photos/800/600?random=3) | ![Yield Prediction](https://picsum.photos/800/600?random=4) |

---

**Mission: Smarter Fields, Better Yields.**
