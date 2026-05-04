"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    let result = "+7";

    if (digits.length > 1) {
      result += " (" + digits.slice(1, 4);
    }

    if (digits.length >= 5) {
      result += ") " + digits.slice(4, 7);
    }

    if (digits.length >= 8) {
      result += "-" + digits.slice(7, 9);
    }

    if (digits.length >= 10) {
      result += "-" + digits.slice(9, 11);
    }

    return result;
  };

  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-xl space-y-6 text-center">
          <header className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Разберём вашу ситуацию
            </h2>
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base">
              Оставьте телефон — свяжемся и подскажем, что делать дальше
            </p>
          </header>

          <form
            className="space-y-3 text-left"
            onSubmit={async (e) => {
              const now = Date.now();

              if (now - lastSubmitTime < 3000) {
                return;
              }

              setLastSubmitTime(now);

              e.preventDefault();
              setLoading(true);
              setStatus("idle");

              const form = e.currentTarget;

              const consent = form.consent.checked;

              const honeypot = form.website.value;

              if (honeypot) {
                setLoading(false);
                return;
              }

              const phone = form.phone.value;

              const cleanPhone = phone.replace(/\D/g, "");

              if (!cleanPhone || cleanPhone.length < 10) {
                setLoading(false);
                setStatus("error");
                return;
              }
              const message = form.message.value;

              try {

                const res = await fetch("/api/lead", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    phone,
                    message,
                    source: "ДТП",
                    consent,
                  }),
                });

                const data = await res.json();

                if (data.success) {
                  form.reset();
                  setLoading(false);
                  setStatus("success");
                } else {
                  setLoading(false);
                  setStatus("error");
                }

              } catch (error) {
                setLoading(false);
                setStatus("error");
              }

            }}
          >
            <input
              type="text"
              name="website"
              className="hidden"
              autoComplete="off"
            />

            <div className="space-y-3">
              <input
                type="tel"
                name="phone"
                inputMode="tel"
                placeholder="+7 (___) ___-__-__"
                pattern={"^\\+7\\s?\\(\\d{3}\\)\\s?\\d{3}-\\d{2}-\\d{2}$"}
                required
                onChange={(e) => {
                  e.target.value = formatPhone(e.target.value);
                  setStatus("idle");
                }}
                onFocus={(e) => {
                  if (!e.target.value) {
                    e.target.value = "+7";
                  }
                }}
                onKeyDown={(e) => {
                  const input = e.currentTarget;

                  // Prevent deleting +7
                  if (
                    (e.key === "Backspace" || e.key === "Delete") &&
                    input.selectionStart !== null &&
                    input.selectionStart <= 2
                  ) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  e.preventDefault();

                  const paste = e.clipboardData.getData("text");
                  const formatted = formatPhone(paste);

                  e.currentTarget.value = formatted;
                }}
                className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-base text-zinc-950 outline-none transition-shadow placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
              />

              <textarea
                name="message"
                rows={4}
                onChange={() => setStatus("idle")}
                placeholder="Коротко опишите ситуацию (необязательно)"
                className="w-full resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition-shadow placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-zinc-600">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1"
              />
              <span>
                Я даю согласие на обработку персональных данных
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-16 w-full items-center justify-center rounded-xl bg-zinc-950 px-6 text-lg font-semibold text-white shadow-lg shadow-zinc-950/25 transition-colors hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Отправка..." : "Отправить"}
            </button>
          </form>

          {status === "success" && (
            <p className="text-sm text-green-600 text-center">
              Спасибо! Мы свяжемся с вами в течение 10 минут
            </p>
          )}

          {status === "error" && (
            <p className="text-sm text-red-600 text-center">
              Ошибка отправки. Попробуйте ещё раз
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
