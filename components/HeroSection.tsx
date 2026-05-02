export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 pb-6 pt-8 sm:px-6 sm:pb-10 sm:pt-12">
        <div className="space-y-6">
          <header className="space-y-3">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-6xl">
              Попали в ДТП? Поможем защитить ваши права, чтобы не потерять деньги
            </h1>
            <p className="text-base leading-relaxed text-zinc-700 sm:text-lg">
              Разберём вашу ситуацию и подскажем, как действовать уже сегодня
            </p>
            <p className="text-sm font-semibold text-zinc-950 sm:text-base">
              Ответим в течение 10 минут
            </p>
          </header>

          <div className="flex flex-col gap-3">
            <div className="space-y-2">
              <p className="text-center text-xs font-semibold text-zinc-900">
                Кратко разберём ситуацию и подскажем следующий шаг
              </p>
              <a
                href="#contact"
                className="inline-flex h-16 w-full items-center justify-center rounded-xl bg-zinc-950 px-6 text-lg font-semibold text-white shadow-lg shadow-zinc-950/25 transition-colors hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:h-16 sm:text-lg"
              >
                Разобрать ситуацию
              </a>
              <p className="text-center text-xs font-medium text-zinc-600">
                Работаем с подобными случаями ежедневно
              </p>
            </div>
            <a
              href="#callback"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 text-base font-medium text-zinc-800 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            >
              Срочно нужен звонок
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-3 text-sm text-zinc-800 sm:text-base">
            <li className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 leading-snug">
              Конфиденциально
            </li>
            <li className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 leading-snug">
              Ответ в течение 10 минут
            </li>
            <li className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 leading-snug">
              Работаем по Санкт-Петербургу
            </li>
            <li className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 leading-snug">
              Практический опыт
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

