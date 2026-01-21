


// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } from "@google/generative-ai";

//   const MODEL_NAME = "gemini-pro";
//     const API_KEY = "AIzaSyDa4Ar55LfnimkAKLyu3iLIWa2823wZfGQ";

//   async function runChat(prompt) {
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//     const generationConfig = {
//       temperature: 0.9,
//       topK: 1,
//       topP: 1,
//       maxOutputTokens: 2048,
//     };

//     const safetySettings = [
//       {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//     ];

//     const chat = model.startChat({
//       generationConfig,
//       safetySettings,
//       history: [
//       ],
//     });

//     const result = await chat.sendMessage(prompt);
//     const response = result.response;
//     console.log(response.text());
//     return response.text();
//   }

//    export default runChat;

/* src/config/gemini.js */


const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
console.log("API Key loaded:", apiKey ? "Yes (starts with " + apiKey.substring(0, 4) + ")" : "No");

async function runChat(prompt) {
  if (!apiKey) {
    console.error("API Key is missing in runChat");
    return "Error: API Key is not configured. Please add VITE_OPENROUTER_API_KEY to your environment variables (or GitHub Secrets).";
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin, // Dynamic origin for production
        "X-Title": "Gemini Clone",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "nvidia/nemotron-nano-12b-v2-vl:free",
        "messages": [
          { "role": "user", "content": prompt }
        ]
      })
    });

    const data = await response.json();

    // Check if there's an error from the API
    if (!response.ok || data.error) {
      console.error("OpenRouter API Error Details:", {
        status: response.status,
        statusText: response.statusText,
        data: data
      });
      return "Error: " + (data.error ? data.error.message : "Start failed with status " + response.status);
    }

    // Return the text content
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Request failed:", error);
    return "Error: Unable to fetch response from OpenRouter. Check console for details.";
  }
}

export default runChat;