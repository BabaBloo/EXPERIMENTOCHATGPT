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
            content: "Genera una frase distinta para alguien que quiere registrarse en una plataforma. Máximo 12 palabras, tono amable, en español.",
          },
        ],
        max_tokens: 30,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      console.error("Error HTTP de OpenAI:", response.status);
      // 🔹 Fallback en caso de error de OpenAI
      return res.status(200).json({
        frase: "¡Buenas! Me gustaría crear un usuario. Mi nombre es:",
      });
    }

    const data = await response.json();

    // Validar que tenga respuesta válida
    if (!data.choices || !data.choices[0].message) {
      console.error("Respuesta inesperada de OpenAI:", data);
      return res.status(200).json({
        frase: "¡Buenas! Me gustaría crear un usuario. Mi nombre es:",
      });
    }

    const frase = data.choices[0].message.content.trim();

    res.status(200).json({ frase });
  } catch (error) {
    console.error("Error en servidor:", error);
    // 🔹 Fallback en caso de error total (timeout, token inválido, etc.)
    res.status(200).json({
      frase: "¡Buenas! Me gustaría crear un usuario. Mi nombre es:",
    });
  }
}
