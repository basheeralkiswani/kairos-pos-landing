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
    <section className="py-[90px] relative" id="testimonials">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1">
        <div className="text-center max-w-[680px] mx-auto mb-[50px] reveal">
          <span className="inline-block text-[13px] font-bold text-primary tracking-[1px] uppercase mb-3.5">
            آراء العملاء
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-black tracking-[-0.5px] leading-[1.18] mb-4">
            ماذا يقول أصحاب المقاهي والمطاعم
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-[1080px] mx-auto items-stretch max-[900px]:grid-cols-1">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="reveal bg-gradient-to-b from-[rgba(24,24,27,0.8)] to-[rgba(18,18,20,0.6)] border border-secondary rounded-[22px] p-[30px] flex flex-col"
            >
              <Stars count={t.rating ?? 5} />
              <blockquote className="text-[16px] leading-[1.7] text-[#d4d4d8] my-5 flex-1">
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
