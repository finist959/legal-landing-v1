type Benefit = {
  title: string;
  description: string;
};

const BENEFITS: Benefit[] = [
  {
    title: "Фокус на делах по ДТП",
    description:
      "Регулярно работаем с подобными ситуациями и понимаем, где риски и как их избежать.",
  },
  {
    title: "Разбор ситуации в день обращения",
    description:
      "Подскажем следующий шаг сразу, чтобы вы не теряли время и деньги.",
  },
  {
    title: "Понятно объясняем каждый шаг",
    description:
      "Без сложных терминов — вы понимаете, что происходит и почему.",
  },
  {
    title: "Вы контролируете процесс",
    description:
      "Всегда знаете, на каком этапе дело и что будет дальше.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="space-y-5">
          <header>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
              Почему выбирают нас
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {BENEFITS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-zinc-950">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-700">
                    {item.description}
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

