
// server.js — endpoint /fetchAIExpectationsAgnostic (molde: ocrImage + Azure gpt-4o-mini)

app.post('/fetchAIExpectationsAgnostic', async (req, res) => {
  const { code, challenge } = req.body;

  if (!code || !challenge) {
    return res.status(400).json({
      success: false,
      message: "Faltan parámetros: code y challenge"
    });
  }

  if (!GH_PAT) {
    return res.status(500).json({
      success: false,
      message: "GH_PAT no configurado en el servidor"
    });
  }

  try {
    // 1) Llamar a Azure OpenAI (gpt-4o-mini) para evaluar el código del estudiante
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
          response_format: {
            type: "json_object"
          },
          messages: [
            {
              role: "system",
              content:
                "Eres un evaluador de ejercicios de programación. " +
                "Compara challenge.codeOkForExpect con el código del estudiante (studentCode). " +
                "Analiza si ambos producen el mismo comportamiento y la misma salida de consola. " +
                "Responde EXCLUSIVAMENTE un JSON con esta estructura: " +
                '{"isCorrect":true,"feedback":"texto","output":"salida obtenida","differences":[{"element":"variable o instrucción","expected":"valor esperado","actual":"valor encontrado","issue":"explicación"}]} ' +
                "No uses markdown. No uses bloques ```. Devuelve únicamente JSON válido."
            },
            {
              role: "user",
              content: JSON.stringify({
                challenge,
                studentCode: code
              })
            }
          ]
        })
      }
    );

    if (!ghResponse.ok) {
      const body = await ghResponse.text();
      return res.status(502).json({
        success: false,
        message: `Error llamando a gpt-4o-mini. status=${ghResponse.status}`,
        detail: body
      });
    }

    const data = await ghResponse.json();
    const rawContent = (data?.choices?.[0]?.message?.content || "").trim();

    if (!rawContent) {
      return res.status(500).json({
        success: false,
        message: "GPT no devolvió contenido"
      });
    }

    // 2) Parsear y validar la respuesta JSON del modelo
    let expectations;

    try {
      expectations = JSON.parse(rawContent);
    } catch (err) {
      console.error("JSON inválido:", rawContent);
      return res.status(500).json({
        success: false,
        message: "GPT devolvió JSON inválido",
        raw: rawContent
      });
    }

    // 3) Normalizar campos esperados por el frontend (index_free.html)
    const normalized = {
      isCorrect: Boolean(expectations.isCorrect),
      feedback: String(expectations.feedback || ""),
      output: String(expectations.output || ""),
      differences: Array.isArray(expectations.differences)
        ? expectations.differences
        : []
    };

    return res.json({
      success: true,
      expectations: normalized
    });
  } catch (err) {
    console.error("Error en fetchAIExpectationsAgnostic:", err);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      detail: String(err)
    });
  }
});
