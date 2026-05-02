type Step = {
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    title: "Вы оставляете заявку",
    description:
      "Коротко описываете ситуацию — это занимает меньше минуты.",
  },
  {
    title: "Мы разбираем ситуацию",
    description:
      "Смотрим документы и объясняем, какие есть риски и варианты.",
  },
  {
    title: "Предлагаем план действий",
    description:
      "Говорим, что делать дальше и какие шаги дадут результат.",
  },
  {
    title: "Сопровождаем до результата",
    description:
      "Помогаем пройти процесс и добиться выплаты или решения спора.",
  },
];

export default function Process() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="space-y-5">
          <header>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
              Как мы работаем
            </h2>
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base">
              Всё максимально просто — разберём ситуацию и подскажем, что делать
              дальше.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {STEPS.map((step) => (
              <article
                key={step.title}
                className="rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-zinc-950">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-700">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

