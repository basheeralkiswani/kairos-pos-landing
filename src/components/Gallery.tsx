"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import Image from "next/image";
import { GALLERY_SHOTS } from "@/lib/constants";
import {
  LightningIcon,
  BarChartIcon,
  BoxIcon,
  UsersIcon,
  ClipboardIcon,
  ReceiptIcon,
} from "@/components/Icons";

const TAB_ICONS: Record<string, ReactNode> = {
  cashier: <LightningIcon className="w-[17px] h-[17px]" />,
  overview: <BarChartIcon className="w-[17px] h-[17px]" />,
  orders: <ClipboardIcon className="w-[17px] h-[17px]" />,
  purchases: <BoxIcon className="w-[17px] h-[17px]" />,
  suppliers: <UsersIcon className="w-[17px] h-[17px]" />,
  waiter: <ReceiptIcon className="w-[17px] h-[17px]" />,
};

const TAB_LABELS: Record<string, string> = {
  cashier: "الكاشير",
  overview: "لوحة التحكم",
  orders: "سجل الطلبات",
  purchases: "المشتريات",
  suppliers: "الموردون",
  waiter: "أجهزة الويتر",
};

// GALLERY_SHOTS مُعلَّن `as const` فمفاتيحه اتحاد حرفي — نوسّعه إلى string
// حتى يقبل indexOf قيمة الـref العامة.
const ORDER: string[] = GALLERY_SHOTS.map((s) => s.key);
const ROTATE_MS = 4500; // كان 3200 — قصير جداً لقراءة الشرح تحت الصورة

export default function Gallery() {
  const [active, setActive] = useState<string>("cashier");
  const [captionVisible, setCaptionVisible] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const shot = GALLERY_SHOTS.find((s) => s.key === active) || GALLERY_SHOTS[0];

  const switchShot = useCallback((key: string) => {
    setCaptionVisible(false);
    setTimeout(() => {
      setActive(key);
      setCaptionVisible(true);
    }, 200);
  }, []);

  // من يفضّل تقليل الحركة لا يُفرض عليه تبديل تلقائي. القاعدة في CSS كانت
  // تعطّل الأنيميشن البصري فقط بينما يستمر الـinterval يعمل — فشل WCAG 2.2.2.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPlaying(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // مراقب الظهور منفصل عن المؤقّت — سابقاً كانا في نفس الـeffect المعتمد على
  // `active`، فكان كل تبديل يهدم المراقب ويعيد بناءه ويخاطر بمؤقّتين معاً.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  // ref لا state في تبعيات المؤقّت: لو وضعنا `active` هنا لأُعيد بناء المؤقّت
  // مع كل تبديل فينحرف الإيقاع. والـref يُقرأ داخل الـcallback فقط.
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (!playing || !inView || zoomed) return;
    const id = setInterval(() => {
      const next = ORDER[(ORDER.indexOf(activeRef.current) + 1) % ORDER.length];
      switchShot(next);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [playing, inView, zoomed, switchShot]);

  // العارض المكبَّر: Escape للخروج، والتركيز ينتقل لزر الإغلاق.
  useEffect(() => {
    if (!zoomed) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed]);

  const handleTabClick = (key: string) => {
    setPlaying(false); // تفاعل المستخدم يوقف التبديل التلقائي نهائياً
    switchShot(key);
  };

  return (
    <section className="py-[90px] relative scroll-mt-[104px]" id="gallery">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1">
        <div className="text-center max-w-[680px] mx-auto mb-[50px] reveal">
          <span className="inline-block text-[13px] font-bold text-primary tracking-[1px] uppercase mb-3.5">
            جولة داخل النظام
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-black tracking-[-0.5px] leading-[1.3] mb-4">
            شوف الواجهات الحقيقية
          </h2>
          <p className="text-[17px] max-sm:text-[16px] text-muted">
            اضغط على أي شاشة لتتصفّح النظام كما هو فعلاً — لقطات مباشرة من Kairos Space POS.
          </p>
        </div>

        {/* التبويبات — نمط tablist صحيح: قارئ الشاشة يعرف الآن أي شاشة معروضة */}
        <div
          role="tablist"
          aria-label="شاشات النظام"
          className="flex flex-wrap justify-center gap-2.5 mb-6 reveal"
        >
          {GALLERY_SHOTS.map((s) => (
            <button
              key={s.key}
              role="tab"
              id={`tab-${s.key}`}
              aria-selected={active === s.key}
              aria-controls="gallery-panel"
              onClick={() => handleTabClick(s.key)}
              className={`inline-flex items-center gap-[9px] min-h-[44px] py-[11px] px-[18px] rounded-full border text-[15px] font-semibold cursor-pointer transition-all duration-220 ${
                active === s.key
                  ? "bg-gradient-to-l from-[#e3c14f] to-[#c49b25] text-[#221b10] border-transparent font-bold shadow-[0_8px_22px_-8px_rgba(133,101,18,0.55)]"
                  : "bg-surface border-secondary text-muted hover:text-text hover:border-[rgba(133,101,18,0.4)]"
              }`}
            >
              {TAB_ICONS[s.key]}
              {TAB_LABELS[s.key]}
            </button>
          ))}
        </div>

        {/* زر إيقاف/تشغيل العرض التلقائي — WCAG 2.2.2 يوجب مخرجاً من أي محتوى
            يتحرّك تلقائياً. */}
        <div className="flex justify-center mb-8 reveal">
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            className="hit-44 inline-flex items-center gap-2 text-[14px] font-semibold text-muted hover:text-text transition-colors"
          >
            {playing ? (
              <>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
                إيقاف العرض التلقائي
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                تشغيل العرض التلقائي
              </>
            )}
          </button>
        </div>

        {/* المسرح */}
        <div ref={stageRef} className="max-w-[880px] mx-auto reveal">
          <div
            id="gallery-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            className="relative"
          >
            {/* اللقطة بعرض 1917px تُعرض على الموبايل بـ288px — أي 15% من حجمها،
                فلا تُقرأ. الضغط يفتح عارضاً بملء الشاشة يقبل التكبير بالإصبعين. */}
            <button
              type="button"
              onClick={() => setZoomed(true)}
              aria-label={`تكبير ${shot.title}`}
              className="block w-full text-right cursor-zoom-in"
            >
              <div className="laptop-lid">
                <div className="laptop-cam" />
                <div className="laptop-screen">
                  {GALLERY_SHOTS.map((s) => (
                    <Image
                      key={s.key}
                      src={s.src}
                      alt={s.alt}
                      fill
                      className={`gallery-img ${active === s.key ? "active" : ""}`}
                      /* كانت "880px" ثابتة، فيحمّل الموبايل ستّ صور بمقاس
                         سطح المكتب لمساحة عرضها 288px فعلياً.
                         85vw ≈ العرض الحقيقي بعد حشوة الحاوية وإطار اللابتوب
                         (375 − 56 − 28)، فلا يبالغ المتصفح في الاختيار. */
                      sizes="(max-width: 768px) 85vw, 880px"
                      loading={s.key === "cashier" ? "eager" : "lazy"}
                    />
                  ))}
                </div>
              </div>
            </button>
            <div className="laptop-base" />
          </div>

          {/* الشرح */}
          <div className="text-center mt-[26px] min-h-[58px]">
            <h3
              className="text-[22px] font-extrabold mb-1.5 transition-opacity duration-300"
              style={{ opacity: captionVisible ? 1 : 0 }}
            >
              {shot.title}
            </h3>
            <p
              className="text-[16px] text-muted max-w-[560px] mx-auto transition-opacity duration-300"
              style={{ opacity: captionVisible ? 1 : 0 }}
            >
              {shot.desc}
            </p>
            <p className="lg:hidden text-[13px] text-primary font-semibold mt-3">
              اضغط على الشاشة لتكبيرها
            </p>
          </div>
        </div>
      </div>

      {/* العارض بملء الشاشة */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[300] bg-[rgba(20,16,8,0.92)] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={shot.title}
          onClick={() => setZoomed(false)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="إغلاق العارض"
            className="absolute top-4 left-4 w-11 h-11 rounded-full bg-[rgba(255,252,244,0.94)] text-[#221b10] flex items-center justify-center font-bold text-[22px] leading-none"
          >
            ×
          </button>
          <div
            className="relative w-full max-w-[1400px]"
            style={{ aspectRatio: "1917 / 867" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
