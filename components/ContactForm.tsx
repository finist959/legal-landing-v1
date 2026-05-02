"use client";

export default function ContactForm() {
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
            onSubmit={(e) => {
              e.preventDefault();
              alert("Спасибо! Мы свяжемся с вами в течение 10 минут");
            }}
          >
            <div className="space-y-3">
              <input
                type="tel"
                name="phone"
                required
                placeholder="Ваш телефон"
                className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-base text-zinc-950 outline-none transition-shadow placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Коротко опишите ситуацию (необязательно)"
                className="w-full resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition-shadow placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-16 w-full items-center justify-center rounded-xl bg-zinc-950 px-6 text-lg font-semibold text-white shadow-lg shadow-zinc-950/25 transition-colors hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
