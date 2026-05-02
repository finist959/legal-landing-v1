type ScenarioCard = {
  title: string;
  description: string;
};

const SCENARIOS: ScenarioCard[] = [
  {
    title: "Попал в ДТП и не знаю, что делать",
    description:
      "Подскажем порядок действий, какие документы собрать и как зафиксировать обстоятельства.",
  },
  {
    title: "Страховая занижает выплату",
    description:
      "Поможем подготовить позицию и документы для пересмотра расчёта и взыскания полной суммы.",
  },
  {
    title: "Страховая отказала в выплате",
    description:
      "Разберём причины отказа и подскажем, как оспорить решение и добиться выплаты.",
  },
  {
    title: "Виновник не признаёт вину",
    description:
      "Разберём доказательства, объясним, как выстроить линию защиты и подтвердить вашу правоту.",
  },
  {
    title: "Нужно взыскать ущерб",
    description:
      "Подскажем, как рассчитать и подтвердить ущерб, и какой порядок взыскания наиболее эффективен.",
  },
  {
    title: "Есть спор с ГИБДД",
    description:
      "Оценим постановление и материалы, подскажем, как обжаловать и что важно не упустить по срокам.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="space-y-5">
          <header className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
              Частые ситуации после ДТП
            </h2>
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base">
              Выберите вашу ситуацию — подскажем следующий шаг и что делать
              сейчас, чтобы не потерять деньги.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {SCENARIOS.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-1 flex-col">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold leading-snug text-zinc-950">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-700">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-3">
                    <a
                      href="#contact"
                      className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-zinc-950 px-4 text-sm font-semibold text-white shadow-md shadow-zinc-950/15 transition-colors hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
                    >
                      Разобрать ситуацию
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

