


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

async function runChat(prompt) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:5173", // Required by OpenRouter for free tier
        "X-Title": "Gemini Clone", // Optional
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "nvidia/nemotron-nano-12b-v2-vl:free", // The free model you requested
        "messages": [
          { "role": "user", "content": prompt }
        ]
      })
    });

    const data = await response.json();
    
    // Check if there's an error from the API
    if(data.error) {
        console.error("OpenRouter Error:", data.error);
        return "Error: " + data.error.message;
    }

    // Return the text content
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Request failed:", error);
    return "Error: Unable to fetch response from OpenRouter.";
  }
}

export default runChat;