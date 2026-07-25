import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-secondary bg-surface-2/60 pt-[46px] pb-9 mt-20">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1">
        <div className="flex items-start justify-between gap-8 flex-wrap">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="" width={40} height={40} className="h-10 w-auto" />
            <span className="font-extrabold text-[17px]">
              Kairos <b className="text-primary">Space</b> POS
            </span>
          </div>

          {/* كانت روابط سطر واحد بارتفاع 24px — تحت حدّ اللمس (44px) وملتصقة.
              الآن قائمة بأعمدة، كل رابط بارتفاع 44px كاملة. وسوم <a> عادية
              عمداً للروابط المُرسّاة — انظر التعليق في Navbar. */}
          <nav aria-label="روابط الموقع">
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 list-none">
              {[
                { href: "/#features", label: "المميزات", hash: true },
                { href: "/#gallery", label: "واجهات النظام", hash: true },
                { href: "/#pricing", label: "الأسعار", hash: true },
                { href: "/download", label: "تحميل النظام", hash: false },
                { href: "/docs", label: "دليل الاستخدام", hash: false },
                { href: "/support", label: "الدعم الفني", hash: false },
                { href: "/jofotara", label: "جوفوترة", hash: false },
                { href: "/sales-channels", label: "قنوات البيع", hash: false },
                { href: "/foodics-alternative", label: "بديل فودكس", hash: false },
                { href: "/#contact", label: "تواصل معنا", hash: true },
              ].map((l) => (
                <li key={l.href}>
                  {l.hash ? (
                    <a
                      href={l.href}
                      className="flex items-center min-h-[44px] text-muted no-underline text-[15px] hover:text-primary transition-colors"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="flex items-center min-h-[44px] text-muted no-underline text-[15px] hover:text-primary transition-colors"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="w-full text-center text-muted text-[13px] mt-7 pt-6 border-t border-secondary">
          © <span className="num">2026</span> Kairos Space POS · جميع الحقوق محفوظة · صُنع بشغف في الأردن
        </div>
      </div>
    </footer>
  );
}
