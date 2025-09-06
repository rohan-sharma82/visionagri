# AgriVision AI - The Owner's Manual (Raaz Di Gal)

This is your personal guide to understanding and making changes to the AgriVision AI application. This document is written for someone who isn't a professional coder. Think of it as the "secret key" (`raaz di gal`) to controlling your app.

---

## 1. The Big Picture: How the App is Organized

Your app is built with Next.js and React. Don't worry about the jargon. Just think of it like this: your entire app is made of small, reusable building blocks called **Components**. Each page is a component, each button is a component, and they are all nested inside each other.

All the important files you'll ever need to touch are inside the `src` folder.

### Quick File Guide: Where to Go When You Want to...

*   **Change Text (Translate)?** -> Go to `/src/locales/`
*   **Change Colors or Core Styles?** -> Go to `/src/app/globals.css`
*   **Change Fonts?** -> Go to `tailwind.config.ts` and `/src/app/layout.tsx`
*   **Add/Change News, Schemes, or Features?** -> Go to `/src/lib/constants.ts`
*   **Change a Specific Page's Layout?** -> Go to `/src/app/` and find the folder for that page (e.g., `/src/app/dashboard/page.tsx`).
*   **Change the AI's Brain (Prompts)?** -> Go to `/src/ai/flows/` and find the relevant file (e.g., `ai-farmer-assistant.ts`).

---

## 2. Making Visual Changes (Styling)

This is how you change the look and feel of your app.

### How to Change Colors

The entire color scheme is controlled from one place!

1.  **Go to the file**: `src/app/globals.css`
2.  **Find the `:root` section**: At the very top, you'll see a section that looks like this:

    ```css
    :root {
      --background: 60 40% 95%; /* This is the main page background */
      --foreground: 45 10% 20%; /* This is the main text color */
      --primary: 45 70% 40%;    /* This is the main button/accent color */
      /* ...and so on */
    }
    ```

3.  **How to Change a Color**: The colors are defined using HSL (Hue, Saturation, Lightness).
    *   **Hue**: The color itself on a 0-360 degree wheel (e.g., 0 is red, 120 is green, 240 is blue).
    *   **Saturation**: The intensity of the color (100% is pure, 0% is grey).
    *   **Lightness**: How light or dark the color is (100% is white, 0% is black).

    **Example**: To make your main primary color a bright blue instead of "Harvest Gold", you would change:
    `--primary: 45 70% 40%;`
    to
    `--primary: 220 80% 55%;`

    You can use an online HSL color picker to find the numbers for the color you want.

### How to Change Fonts

Your app uses specific fonts for headlines and body text.

1.  **Find the Font Definitions**: Go to the file `tailwind.config.ts`. Find the `fontFamily` section inside `extend`.

    ```javascript
    fontFamily: {
        body: ['PT Sans', 'sans-serif'],
        headline: ['PT Sans', 'sans-serif'],
        // ... other fonts
    },
    ```

2.  **Import the Font**: If you want to use a new font from Google Fonts:
    *   Go to `src/app/layout.tsx`.
    *   Find the `<link>` tag that imports fonts from `https://fonts.googleapis.com`.
    *   Add your new font to the URL. For example, to add the "Lato" font, you'd modify the link.

3.  **Apply the Font**: Go back to `tailwind.config.ts` and change the `body` or `headline` font to your new font name. For example:
    `body: ['Lato', 'sans-serif'],`

### How to Create a Reusable Style (like a template)

Let's say you want all your important headings to be a specific color and font. You can create a "template" or a "utility class" for it.

1.  **Define the Style**: Go to `src/app/globals.css`. At the bottom, inside the `@layer components` section, add your new style.

    ```css
    @layer components {
        .my-special-heading {
            @apply text-3xl font-headline text-accent;
        }
    }
    ```
    This creates a style called `my-special-heading` that makes text large (`text-3xl`), uses the headline font, and applies the accent color.

2.  **Use the Style**: Now, in any page file (like `.../page.tsx`), you can apply this to a heading:
    `<h1 className="my-special-heading">This is my special heading</h1>`

---

## 3. Changing and Adding Content

This is how you change the text and information in your app.

### The Magic of Translation: How to Change Any Text

Every piece of text in the app uses a translation key. This is what allows the app to be multilingual.

1.  **Go to the `locales` folder**: `/src/locales/`. You will see files like `en.json`, `pa.json` (Punjabi), `ta.json` (Tamil), etc.
2.  **Open `en.json`**: This is the English reference file. It's a list of keys and text values.

    ```json
    {
        "home": {
            "welcome": "Welcome to AgriVision AI",
            "tagline": "Revolutionizing farming..."
        },
        "features": {
            "title": "Our Features"
        }
    }
    ```

3.  **How to Change Text**:
    *   Find the key that corresponds to the text you want to change on the screen. For example, to change the main welcome message, you'd find `"welcome": "Welcome to AgriVision AI"`.
    *   Change the text value on the right side: `"welcome": "Welcome, Farmer, to AgriVision AI"`.
    *   **IMPORTANT**: If you change it in `en.json`, you should also change it in the other language files (`pa.json`, `ta.json`, etc.) with the correct translation to keep everything consistent.

### How to Add a New News Article or Govt. Scheme

1.  **Go to the file**: `src/lib/constants.ts`
2.  **Find the `newsData` or `schemesData` array**: This is a list of all the news articles or schemes. Each item is an object `{ ... }`.
3.  **Add a New Object**: Copy an existing article object and paste it at the end of the list. Change the details:

    ```javascript
    {
        id: 26, // Make sure this ID is unique!
        title: 'news.n26_title', // This is a NEW translation key
        source: 'sources.agriTech',
        date: 'dates.sep02_25', // Another new key
        snippet: 'news.n26_snippet', // New translation key
        article: 'news.n26_article', // New translation key
        category: 'categories.technology',
    }
    ```

4.  **Add the Translations**: Now, go to `/src/locales/en.json` and add the new keys you created:
    ```json
    "news": {
        // ... existing news ...
        "n26_title": "AI Predicts Bumper Harvest for Wheat",
        "n26_snippet": "A new AI model is forecasting record-breaking wheat yields this season.",
        "n26_article": "<h3>AI Predicts Bumper Harvest...</h3><p>Full article content here. You can use HTML tags like <h4> and <ul> for formatting.</p>"
    },
    "dates": {
        // ... existing dates ...
        "sep02_25": "Sep 02, 2025"
    }
    ```
    Remember to add these keys to the other language files as well!

### How to Change the AI's Brain (The Prompts)

The "personality" and expertise of your AI assistants come from their prompts.

1.  **Go to the AI Flows folder**: `/src/ai/flows/`.
2.  **Choose the AI you want to change**:
    *   For the AI Farmer Assistant, open `ai-farmer-assistant.ts`.
    *   For the Crop Yield Predictor, open `crop-yield-prediction.ts`.
3.  **Find the `prompt` section**: Inside each file, you will see a variable defined like `ai.definePrompt`. Inside that, there is a `prompt` string.

    **Example from `crop-yield-prediction.ts`**:
    ```javascript
    prompt: `You are an expert in agricultural science... Your language should be simple, encouraging, and easy to understand.
    
    Based on the data provided, predict the total crop yield...
    
    Data:
    - Crop Type: {{{cropType}}}
    - Soil Type: {{{soilType}}}
    ...`
    ```

4.  **How to Change it**: You can edit the text inside the backticks (` `) to change the AI's instructions. For example, if you wanted the AI to always start its response with "Greetings, Farmer!", you could add that to the beginning of the prompt.

    The `{{{cropType}}}` parts are placeholders where the app inserts the user's data. Don't change those.

---

## 4. How to Edit a Specific Page

Each page of the app has its own folder and a `page.tsx` file inside it. This is where the layout and components for that specific page are defined.

### **a. Crop Yield Prediction Page**

*   **File to Edit**: `src/app/crop-yield/page.tsx`
*   **What it does**: This file contains the main form that users fill out to get a yield prediction.
*   **How it works**:
    *   It uses a library called **React Hook Form** to manage the form fields (Crop Type, Soil Type, etc.).
    *   The dropdowns for "Crop Type" and "Soil Type" are populated from lists defined in `src/lib/constants.ts` and `src/lib/area-data.ts`.
    *   The "Know Your Area" button opens a dialog box. The content for this dialog (soil types, state data) is located in `src/lib/area-data.ts`.
    *   When the "Predict Yield" button is clicked, it calls the `predictCropYield` function from `/src/ai/flows/crop-yield-prediction.ts` and displays the results in a green card.
*   **How to Change**: To change the text or layout of the form, you would edit the `page.tsx` file. To change the AI's prediction logic, you would edit the `crop-yield-prediction.ts` file.

### **b. AI Farmer Assistant Page**

*   **File to Edit**: `src/app/ai-farmer/page.tsx`
*   **What it does**: This is the chat interface for the AI assistant.
*   **How it works**:
    *   It manages a list of messages (the chat history).
    *   When a user sends a message, it calls the `getFarmingAdvice` function from `/src/ai/flows/ai-farmer-assistant.ts`.
    *   It also calls the `textToSpeech` function to create an audio version of the response.
    *   The chat history is saved to the database using functions from `src/app/ai-farmer/actions.ts`.
*   **How to Change**: To change the appearance of the chat bubbles or buttons, you would edit this `page.tsx` file. To change the AI's personality or the type of advice it gives, you would edit the `ai-farmer-assistant.ts` flow.

### **c. Disease & Animal Classification Pages**

*   **Files to Edit**: `src/app/disease-classification/page.tsx` and `src/app/animal-classification/page.tsx`
*   **What they do**: These pages allow a user to upload an image and get an AI classification.
*   **How they work**:
    *   When a user selects a file, the app reads it and creates a preview.
    *   When the "Classify" button is clicked, it sends the image data to the corresponding AI flow (`classifyCropDisease` or `animalClassification`).
    *   The AI returns a structured result (disease name, confidence, suggestions), which is then displayed in a report card.
*   **How to Change**: To change the layout of the upload button or the results card, you would edit the respective `page.tsx` file.

### **d. Government Schemes & Farm School Pages**

*   **Files to Edit**: `/src/app/govt-schemes/page.tsx` and `/src/app/farm-school/page.tsx`.
*   **What they do**: These are information hubs.
*   **How they work**:
    *   They get their data from lists defined in `src/lib/constants.ts`.
    *   They loop through this data and create a card for each item (each scheme or each school topic).
    *   Clicking a card opens a dialog or navigates to a new page with more details.
*   **How to Change**: To add a new scheme or a new school topic, you would first add the item to the list in `constants.ts`. Then, you would add the necessary translation keys to the `en.json` file (and other languages). The page will update automatically.

### **e. Dashboard Page**

*   **File to Edit**: `src/app/dashboard/page.tsx`
*   **What it does**: This is the personalized hub for a logged-in user.
*   **How it works**:
    *   It first checks if a user is logged in.
    *   It then fetches the user's data (like their name and primary crop) from the database.
    *   It calls two AI flows at the same time: `getDashboardWeather` and `getMarketPriceAnalysis`.
    *   It displays the weather report and the market price chart. It also shows a list of recommended schemes and a mock yield history table.
*   **How to Change**: To change the layout of the dashboard cards, you would edit this `page.tsx` file. The content of the cards is dynamic and comes from the AI flows and the user's data.

This guide should give you a solid starting point for making many common updates yourself. Good luck with your presentation to the SIH judges! You've got this.
