type TrustItem = {
  text: string;
};

const TRUST_ITEMS: TrustItem[] = [
  { text: "Более 10 лет практики" },
  { text: "Сотни дел по ДТП" },
  { text: "Работаем по Санкт-Петербургу" },
  { text: "Конфиденциально" },
];

export default function TrustStrip() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.text}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-center text-sm font-medium leading-snug text-zinc-900"
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

