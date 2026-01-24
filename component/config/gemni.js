


const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
console.log("Debug: API Key loaded from env?", apiKey ? "Yes" : "No");
if (apiKey) console.log("Debug: Key starts with:", apiKey.substring(0, 4));

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
        "HTTP-Referer": window.location.origin,
        "X-Title": "Gemini Clone",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "nvidia/nemotron-3-nano-30b-a3b:free",
        "messages": [
          { "role": "user", "content": prompt }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("OpenRouter API Error Details:", data);
      const errorMessage = data.error ? data.error.message : "Unknown error";
      return `OpenRouter Error (${response.status}): ${errorMessage}`;
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error("Request failed:", error);
    return "Network/Client Error: " + error.message;
  }
}

export default runChat;