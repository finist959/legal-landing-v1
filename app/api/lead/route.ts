const requests = new Map<string, number>();
const recentLeads = new Map<string, number>();

const maskPhone = (value: string) => {
  if (value.length < 6) return "***";
  return value.slice(0, 4) + "***" + value.slice(-2);
};

const maskToken = (value: string) => {
  if (value.length < 10) return "***";
  return value.slice(0, 6) + "..." + value.slice(-4);
};

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const userAgent = request.headers.get("user-agent") || "";
  let phone = "";
  let source = "unknown";

  const now = Date.now();

  const lastTime = requests.get(ip) || 0;

  if (now - lastTime < 10000) {
    const reason = "rate_limit";
    console.warn("REJECTED_LEAD", {
      time: new Date().toISOString(),
      ip,
      phone: maskPhone(phone),
      userAgent,
      source,
      reason,
    });
    return Response.json({ success: false });
  }

  requests.set(ip, now);

  if (
    !userAgent ||
    userAgent.toLowerCase().includes("curl") ||
    userAgent.toLowerCase().includes("python") ||
    userAgent.toLowerCase().includes("node")
  ) {
    const reason = "bad_user_agent";
    console.warn("REJECTED_LEAD", {
      time: new Date().toISOString(),
      ip,
      phone: maskPhone(phone),
      userAgent,
      source,
      reason,
    });
    return Response.json({ success: false });
  }
  try {
    const body = (await request.json()) as unknown;
    const sourceRaw = (body as { source?: unknown }).source;
    source = typeof sourceRaw === "string" ? sourceRaw : "unknown";
    if (!body || typeof body !== "object") {
      const reason = "invalid_body";
      console.warn("REJECTED_LEAD", {
        time: new Date().toISOString(),
        ip,
        phone: maskPhone(phone),
        userAgent,
        source,
        reason,
      });
      return Response.json({ success: false });
    }

    const phoneRaw = (body as { phone?: unknown }).phone;
    const messageRaw = (body as { message?: unknown }).message;

    phone = typeof phoneRaw === "string" ? phoneRaw.trim() : "";
    const message = typeof messageRaw === "string" ? messageRaw.trim() : "";

    const consentRaw = (body as { consent?: unknown }).consent;

    const consent = consentRaw === true;

    console.log("INCOMING_LEAD", {
      phone: maskPhone(phone),
      source,
      consent,
      messageLength: message.length,
    });

    if (!consent) {
      const reason = "no_consent";
      console.warn("REJECTED_LEAD", {
        time: new Date().toISOString(),
        ip,
        phone: maskPhone(phone),
        userAgent,
        source,
        reason,
      });
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
        const reason = "invalid_phone";
        console.warn("REJECTED_LEAD", {
          time: new Date().toISOString(),
          ip,
          phone: maskPhone(phone),
          userAgent,
          source,
          reason,
        });
        return Response.json({ success: false });
      }
    }

    // Case 2: starts with 8
    else if (rawPhone.startsWith("8")) {
      const digits = cleanPhone;

      if (digits.length !== 11) {
        const reason = "invalid_phone";
        console.warn("REJECTED_LEAD", {
          time: new Date().toISOString(),
          ip,
          phone: maskPhone(phone),
          userAgent,
          source,
          reason,
        });
        return Response.json({ success: false });
      }

      normalizedPhone = "+7" + digits.slice(1);
    }

    // Case 3: starts with 7 (without +)
    else if (rawPhone.startsWith("7")) {
      const digits = cleanPhone;

      if (digits.length !== 11) {
        const reason = "invalid_phone";
        console.warn("REJECTED_LEAD", {
          time: new Date().toISOString(),
          ip,
          phone: maskPhone(phone),
          userAgent,
          source,
          reason,
        });
        return Response.json({ success: false });
      }

      normalizedPhone = "+" + digits;
    }

    // Everything else → reject
    else {
      const reason = "invalid_phone";
      console.warn("REJECTED_LEAD", {
        time: new Date().toISOString(),
        ip,
        phone: maskPhone(phone),
        userAgent,
        source,
        reason,
      });
      return Response.json({ success: false });
    }

    // Final safety check
    if (!/^\+7\d{10}$/.test(normalizedPhone)) {
      const reason = "invalid_phone";
      console.warn("REJECTED_LEAD", {
        time: new Date().toISOString(),
        ip,
        phone: maskPhone(phone),
        userAgent,
        source,
        reason,
      });
      return Response.json({ success: false });
    }

    if (message && message.length > 500) {
      const reason = "message_too_long";
      console.warn("REJECTED_LEAD", {
        time: new Date().toISOString(),
        ip,
        phone: maskPhone(phone),
        userAgent,
        source,
        reason,
      });
      return Response.json({ success: false });
    }

    const lastLeadTime = recentLeads.get(normalizedPhone) || 0;

    if (Date.now() - lastLeadTime < 5 * 60 * 1000) {
      const reason = "duplicate";
      console.warn("REJECTED_LEAD", {
        time: new Date().toISOString(),
        ip,
        phone: maskPhone(phone),
        userAgent,
        source,
        reason,
      });
      return Response.json({ success: false });
    }

    recentLeads.set(normalizedPhone, Date.now());

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? process.env.BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? process.env.CHAT_ID;
    const CHAT_ID_2 = process.env.CHAT_ID_2;

    console.log("TELEGRAM_ENV_CHECK", {
      botTokenPresent: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      chatIdPresent: Boolean(process.env.TELEGRAM_CHAT_ID),
    });

    if (!BOT_TOKEN || !CHAT_ID || !phone) {
      const reason = "missing_telegram_config";
      console.warn("REJECTED_LEAD", {
        time: new Date().toISOString(),
        ip,
        phone: maskPhone(phone),
        userAgent,
        source,
        reason,
      });
      return Response.json({ success: false });
    }

    console.log("Sending to Telegram:", {
      phone: maskPhone(phone),
      source,
      messageLength: message.length,
    });

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
      console.log("TELEGRAM_API_RESPONSE", {
        status: telegramRes.status,
        ok: telegramJson.ok,
        error_code:
          typeof (telegramJson as { error_code?: unknown }).error_code ===
          "number"
            ? (telegramJson as { error_code?: number }).error_code
            : undefined,
        description:
          typeof (telegramJson as { description?: unknown }).description ===
          "string"
            ? (telegramJson as { description?: string }).description
            : undefined,
      });
      const reason = "telegram_failed";
      console.warn("REJECTED_LEAD", {
        time: new Date().toISOString(),
        ip,
        phone: maskPhone(phone),
        userAgent,
        source,
        reason,
      });
      return Response.json({ success: false });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("SERVER_ERROR", {
      time: new Date().toISOString(),
      ip,
      phone: maskPhone(phone),
      userAgent,
      source,
      error: error instanceof Error ? error.message : String(error),
    });
    return Response.json({ success: false });
  }
}
