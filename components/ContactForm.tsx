"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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

              e.preventDefault();
              setLoading(true);
              setStatus("idle");

              const form = e.currentTarget;

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
            <div className="space-y-3">
              <input
                type="tel"
                name="phone"
                required
                onChange={() => setStatus("idle")}
                placeholder="Ваш телефон"
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
