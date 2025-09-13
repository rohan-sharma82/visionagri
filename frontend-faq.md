# AgriVision AI: Frontend FAQ

This document provides answers to common questions about the frontend architecture and implementation of the AgriVision AI application.

---

### **Directory Basics**

**Q1. Which folder in the project contains all frontend code and page definitions?**

**A:** The `src/app/` directory contains all the frontend code, including page definitions, layouts, and components.

**Q2. In the Next.js App Router, what does each folder inside `/app` represent?**

**A:** In the Next.js App Router, each folder inside `/app` represents a **route segment**. A `page.tsx` file within a folder makes that route publicly accessible. For example, the folder `/app/crop-yield/` corresponds to the `/crop-yield` URL path.

---

### **Layout & Pages**

**Q3. What is the role of `src/app/layout.tsx` in the project?**

**A:** `src/app/layout.tsx` is the **root layout**. It defines the main `<html>` and `<body>` structure that wraps every page in the application. It is used for shared UI like the header, theme provider, and global styles.

**Q4. Which file defines the homepage of the application?**

**A:** The file `src/app/page.tsx` defines the homepage, which corresponds to the `/` route.

**Q5. How are feature-specific pages (like Crop Yield Prediction) organized inside `/app`?**

**A:** Each feature-specific page has its own dedicated folder within the `/app` directory. For example, the Crop Yield Prediction feature is located at `src/app/crop-yield/page.tsx`, making it accessible at the `/crop-yield` URL.

---

### **Core Frontend Concepts**

**Q6. What does `"use client";` do inside a component file?**

**A:** The `"use client";` directive marks a component as a **Client Component**. This means it will be rendered on the client-side (in the browser), allowing it to use interactive features like React Hooks (`useState`, `useEffect`) and handle browser events (like button clicks).

**Q7. Why is state management (`useState`) important in frontend pages?**

**A:** State management with `useState` is crucial for creating interactive user interfaces. It allows a component to keep track of data that can change over time, such as user input, loading statuses, or API results. When the state changes, React automatically re-renders the component to reflect the new data.

**Q8. Which libraries are used for form handling and validation in the frontend?**

**A:** The application uses `react-hook-form` for managing form state and submissions, and `zod` (with `@hookform/resolvers/zod`) for defining validation schemas to ensure the user enters valid data.

---

### **Integration with Backend**

**Q9. How does the frontend call backend AI flows without traditional REST APIs or manual `fetch()` calls?**

**A:** The frontend calls backend AI flows directly by importing them as if they were regular functions. This is made possible by Next.js Server Actions. The `"use server";` directive at the top of the AI flow files (e.g., `src/ai/flows/predict-crop-yield.ts`) tells Next.js to handle the underlying network communication automatically and securely.

**Q10. What happens behind the scenes when a user clicks "Predict" on a frontend page like `crop-yield/page.tsx`?**

**A:**
1.  The `onSubmit` function in the component is triggered by the form submission.
2.  It calls the imported `predictCropYield` async function, passing the form data as an argument.
3.  Because `predictCropYield` is a Server Action, Next.js securely sends the request to the server-side Genkit flow.
4.  The server executes the AI flow, gets a result from the Gemini model, and returns the result to the frontend.
5.  The frontend component receives the result and updates its state using `setPrediction()`, causing the UI to display the prediction to the user.
