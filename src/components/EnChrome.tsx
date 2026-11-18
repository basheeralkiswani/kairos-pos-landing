// Header and footer for the English pages (/en and /en/*). The site chrome (Navbar/Footer)
// is Arabic and RTL; half-Arabic chrome on an English page reads as broken to visitors and
// as mixed-language to crawlers — see the note at the top of src/app/en/page.tsx.
import Link from "next/link";
import { APP_URL, WA_NUMBER } from "@/lib/constants";

export function enWaUrl(msg = "Hello 👋 I would like to know more about Kairos Space POS."): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function EnHeader({ arabicHref = "/" }: { arabicHref?: string }) {
  return (
    <header className="border-b border-secondary bg-surface/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1100px] mx-auto px-5 h-[72px] flex items-center justify-between gap-4">
        <Link href="/en" className="text-[19px] font-extrabold text-text no-underline tracking-tight">
          Kairos <span className="text-primary">Space</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4">
          <Link
            href={arabicHref}
            hrefLang="ar"
            className="text-[14px] font-semibold text-muted hover:text-primary no-underline px-2 py-2 transition-colors"
          >
            العربية
          </Link>
          <a
            href={APP_URL}
            className="hidden sm:inline-flex text-[14px] font-semibold text-muted hover:text-primary no-underline px-2 py-2 transition-colors"
          >
            Sign in
          </a>
          <a
            href={enWaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold !py-[10px] !px-[18px] !text-[14px] whitespace-nowrap"
          >
            Talk to us
          </a>
        </nav>
      </div>
    </header>
  );
}

export function EnFooter() {
  return (
    <footer className="border-t border-secondary py-10">
      <div className="max-w-[1100px] mx-auto px-5 flex flex-wrap items-center justify-between gap-4 text-[14px]">
        <p className="text-muted">© Kairos Space — point of sale for Jordan.</p>
        <nav className="flex flex-wrap items-center gap-5">
          <Link href="/" hrefLang="ar" className="text-muted hover:text-primary no-underline">
            الموقع بالعربية
          </Link>
          <Link href="/en/best-pos-jordan" className="text-muted hover:text-primary no-underline">
            Choosing a POS in Jordan
          </Link>
          <Link href="/jofotara" className="text-muted hover:text-primary no-underline">JoFotara</Link>
          <Link href="/support" className="text-muted hover:text-primary no-underline">Support</Link>
          <a href={APP_URL} className="text-muted hover:text-primary no-underline">Sign in</a>
        </nav>
      </div>
    </footer>
  );
}
