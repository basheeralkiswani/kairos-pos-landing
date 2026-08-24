// آراء العملاء — أضف شهادات حقيقية فقط.
// لتفعيل القسم: عبّئ المصفوفة أدناه بشهادة حقيقية واحدة على الأقل.
// طالما المصفوفة فاضية، القسم لا يظهر إطلاقاً (بدون أي محتوى وهمي).
const TESTIMONIALS: {
  quote: string;
  name: string;
  role: string;
  rating?: number; // 1..5
}[] = [
  // مثال (احذف هذا التعليق واملأ ببيانات حقيقية):
  // { quote: "وفّرت ساعتين يومياً من المحاسبة اليدوية.", name: "اسم العميل", role: "صاحب مقهى — عمّان", rating: 5 },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} من 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-[17px] h-[17px] text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.77l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="section" id="testimonials">
      <div className="shell">
        <div className="section-head reveal">
          <span className="eyebrow">آراء العملاء</span>
          <h2>ماذا يقول أصحاب المقاهي والمطاعم</h2>
        </div>

        <div className="grid grid-cols-3 gap-7 max-w-[1100px] mx-auto items-stretch max-[900px]:grid-cols-1">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="reveal card flex flex-col"
            >
              <Stars count={t.rating ?? 5} />
              <blockquote className="text-[16px] leading-[1.7] text-text my-5 flex-1">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex flex-col">
                <span className="font-bold text-text text-[15px]">{t.name}</span>
                <span className="text-[13px] text-muted">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
