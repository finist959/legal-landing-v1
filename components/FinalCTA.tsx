export default function FinalCTA() {
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-xl text-center space-y-6">
          <header className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Разберём вашу ситуацию и скажем, что делать дальше
            </h2>
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base">
              Это бесплатно и займёт пару минут
            </p>
          </header>

          <div className="space-y-2">
            <button
              type="button"
              className="inline-flex h-16 w-full items-center justify-center rounded-xl bg-zinc-950 px-6 text-lg font-semibold text-white shadow-lg shadow-zinc-950/25 transition-colors hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            >
              Разобрать ситуацию
            </button>
            <p className="text-sm font-medium text-zinc-700">
              Ответим в течение 10 минут
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

