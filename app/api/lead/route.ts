const requests = new Map<string, number>();
const recentLeads = new Map<string, number>();

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const now = Date.now();

  const lastTime = requests.get(ip) || 0;

  if (now - lastTime < 10000) {
    return Response.json({ success: false });
  }

  requests.set(ip, now);
  const userAgent = request.headers.get("user-agent") || "";

  if (
    !userAgent ||
    userAgent.toLowerCase().includes("curl") ||
    userAgent.toLowerCase().includes("python") ||
    userAgent.toLowerCase().includes("node")
  ) {
    return Response.json({ success: false });
  }
  try {
    const body = (await request.json()) as unknown;
    const sourceRaw = (body as { source?: unknown }).source;
    const source = typeof sourceRaw === "string" ? sourceRaw : "unknown";
    console.log("Incoming lead:", body);
    if (!body || typeof body !== "object") {
      return Response.json({ success: false });
    }

    const phoneRaw = (body as { phone?: unknown }).phone;
    const messageRaw = (body as { message?: unknown }).message;

    const phone = typeof phoneRaw === "string" ? phoneRaw.trim() : "";
    const message = typeof messageRaw === "string" ? messageRaw.trim() : "";

    const consentRaw = (body as { consent?: unknown }).consent;

    const consent = consentRaw === true;

    if (!consent) {
      return Response.json({ success: false });
    }

    const rawPhone = phone.trim();

    const cleanPhone = rawPhone.replace(/\D/g, "");

    // Strict Russian phone validation
    let normalizedPhone = "";

    // Case 1: starts with +7
    if (rawPhone.startsWith("+7")) {
      normalizedPhone = rawPhone.replace(/\D/g, "");
      normalizedPhone = "+" + normalizedPhone;

      if (!/^\+7\d{10}$/.test(normalizedPhone)) {
        return Response.json({ success: false });
      }
    }

    // Case 2: starts with 8
    else if (rawPhone.startsWith("8")) {
      const digits = cleanPhone;

      if (digits.length !== 11) {
        return Response.json({ success: false });
      }

      normalizedPhone = "+7" + digits.slice(1);
    }

    // Case 3: starts with 7 (without +)
    else if (rawPhone.startsWith("7")) {
      const digits = cleanPhone;

      if (digits.length !== 11) {
        return Response.json({ success: false });
      }

      normalizedPhone = "+" + digits;
    }

    // Everything else → reject
    else {
      return Response.json({ success: false });
    }

    // Final safety check
    if (!/^\+7\d{10}$/.test(normalizedPhone)) {
      return Response.json({ success: false });
    }

    if (message && message.length > 500) {
      return Response.json({ success: false });
    }

    const lastLeadTime = recentLeads.get(normalizedPhone) || 0;

    if (Date.now() - lastLeadTime < 5 * 60 * 1000) {
      return Response.json({ success: false });
    }

    recentLeads.set(normalizedPhone, Date.now());

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    const CHAT_ID_2 = process.env.CHAT_ID_2;

    if (!BOT_TOKEN || !CHAT_ID || !phone) {
      return Response.json({ success: false });
    }

    console.log("Sending to Telegram:", { phone, message });

    const text = `
📍 Источник: ${source}

🚗 Новый лид

📞 Телефон: ${normalizedPhone}
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

    if (CHAT_ID_2) {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID_2,
          text,
        }),
      });
    }

    const telegramJson = (await telegramRes.json()) as { ok?: boolean };

    if (!telegramRes.ok || telegramJson.ok !== true) {
      return Response.json({ success: false });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return Response.json({ success: false });
  }
}
