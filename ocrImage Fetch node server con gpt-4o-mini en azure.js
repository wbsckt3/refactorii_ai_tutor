




app.post('/ocrImage', async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "imageUrl required" });
  }

  try {
    // 1) Descargar imagen captcha
    const imageResponse = await fetch(imageUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    if (!imageResponse.ok) {
      return res.status(400).json({
        error: `No se pudo descargar imageUrl. status=${imageResponse.status}`
      });
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    // 2) Llamar Vision Model
    const ghResponse = await fetch(
      "https://models.inference.ai.azure.com/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GH_PAT}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0,
          max_tokens: 12,
          messages: [
            {
              role: "system",
              content:
                "You are a CAPTCHA OCR parser. Return exactly 5 uppercase alphanumeric characters (A-Z, 0-9). " +
                "Output must contain only those 5 characters, no spaces, no punctuation, no extra words."
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text:
                    "Read this CAPTCHA image and return exactly 5 uppercase alphanumeric characters only. " +
                    "Example valid output: YTFE4"
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/png;base64,${base64Image}`
                  }
                }
              ]
            }
          ]
        })
      }
    );

    if (!ghResponse.ok) {
      const body = await ghResponse.text();
      return res.status(502).json({
        error: `Vision model error. status=${ghResponse.status}`,
        detail: body
      });
    }

    const data = await ghResponse.json();
    const raw = (data?.choices?.[0]?.message?.content || "").trim().toUpperCase();

    // 3) Sanitizar salida para garantizar 5 alfanuméricos
    const cleaned = raw.replace(/[^A-Z0-9]/g, "");
    const match5 = cleaned.match(/[A-Z0-9]{5}/);
    const captcha = match5 ? match5[0] : "";

    if (!captcha) {
      return res.status(422).json({
        error: "No se pudo extraer captcha alfanumerico de 5 caracteres",
        rawModelOutput: raw
      });
    }

    return res.json({ captcha });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "OCR processing error",
      detail: String(err)
    });
  }
});