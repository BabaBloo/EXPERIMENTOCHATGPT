export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Sos un generador de frases breves y naturales en español.",
          },
          {
            role: "user",
            content:
              "Genera una frase distinta para alguien que quiere registrarse en una plataforma. Máximo 12 palabras, tono amable, en español.",
          },
        ],
        max_tokens: 30,
        temperature: 0.9,
      }),
    });

    const data = await response.json();
    const frase = data.choices[0].message.content.trim();

    res.status(200).json({ frase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando frase" });
  }
}
