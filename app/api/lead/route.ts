export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    if (!body || typeof body !== "object") {
      return Response.json({ success: false });
    }

    const phoneRaw = (body as { phone?: unknown }).phone;
    const messageRaw = (body as { message?: unknown }).message;

    const phone = typeof phoneRaw === "string" ? phoneRaw.trim() : "";
    const message = typeof messageRaw === "string" ? messageRaw.trim() : "";

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID || !phone) {
      return Response.json({ success: false });
    }

    const text = `
🚗 Новый лид

📞 Телефон: ${phone}
📝 Ситуация: ${message || "не указана"}
`;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      },
    );

    const telegramJson = (await telegramRes.json()) as { ok?: boolean };

    if (!telegramRes.ok || telegramJson.ok !== true) {
      return Response.json({ success: false });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false });
  }
}
