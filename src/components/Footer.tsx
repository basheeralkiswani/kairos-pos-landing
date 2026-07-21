import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-secondary bg-surface-2/60 pt-[46px] pb-9 mt-20">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Kairos Space" width={40} height={40} className="h-10 w-auto" />
            <span className="font-extrabold text-[17px]">
              Kairos <b className="text-primary">Space</b> POS
            </span>
          </div>
          <div className="flex gap-[26px] flex-wrap">
            {/* وسوم <a> عادية عمداً — انظر التعليق في Navbar: الـ Link يُسقط
                الـ hash عند الانتقال من صفحة فرعية. */}
            <a href="/#features" className="text-muted no-underline text-[14.5px] hover:text-primary transition-colors">
              المميزات
            </a>
            <a href="/#gallery" className="text-muted no-underline text-[14.5px] hover:text-primary transition-colors">
              واجهات النظام
            </a>
            <a href="/#pricing" className="text-muted no-underline text-[14.5px] hover:text-primary transition-colors">
              الأسعار
            </a>
            <Link href="/download" className="text-muted no-underline text-[14.5px] hover:text-primary transition-colors">
              تحميل النظام
            </Link>
            <Link href="/docs" className="text-muted no-underline text-[14.5px] hover:text-primary transition-colors">
              دليل الاستخدام
            </Link>
            <Link href="/support" className="text-muted no-underline text-[14.5px] hover:text-primary transition-colors">
              الدعم الفني
            </Link>
            <Link href="/jofotara" className="text-muted no-underline text-[14.5px] hover:text-primary transition-colors">
              جوفوترة
            </Link>
            <Link href="/sales-channels" className="text-muted no-underline text-[14.5px] hover:text-primary transition-colors">
              قنوات البيع
            </Link>
            <Link href="/foodics-alternative" className="text-muted no-underline text-[14.5px] hover:text-primary transition-colors">
              بديل فودكس
            </Link>
            <a href="/#contact" className="text-muted no-underline text-[14.5px] hover:text-primary transition-colors">
              تواصل معنا
            </a>
          </div>
        </div>
        <div className="w-full text-center text-muted text-[13px] mt-7 pt-6 border-t border-secondary">
          © <span className="num">2026</span> Kairos Space POS · جميع الحقوق محفوظة · صُنع بشغف في الأردن
        </div>
      </div>
    </footer>
  );
}
