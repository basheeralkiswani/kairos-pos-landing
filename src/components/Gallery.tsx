"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { GALLERY_SHOTS } from "@/lib/constants";
import { LightningIcon, BarChartIcon, BoxIcon, TagIcon, ChatIcon, ClipboardIcon } from "@/components/Icons";
import { type ReactNode } from "react";

const TAB_ICONS: Record<string, ReactNode> = {
  cashier: <LightningIcon className="w-[17px] h-[17px]" />,
  overview: <BarChartIcon className="w-[17px] h-[17px]" />,
  products: <BoxIcon className="w-[17px] h-[17px]" />,
  categories: <TagIcon className="w-[17px] h-[17px]" />,
  inventory: <ChatIcon className="w-[17px] h-[17px]" />,
  orders: <ClipboardIcon className="w-[17px] h-[17px]" />,
};

const TAB_LABELS: Record<string, string> = {
  cashier: "الكاشير",
  overview: "لوحة التحكم",
  products: "المنتجات",
  categories: "التصنيفات",
  inventory: "المخزون",
  orders: "سجل الطلبات",
};

export default function Gallery() {
  const [active, setActive] = useState<string>("cashier");
  const [captionVisible, setCaptionVisible] = useState(true);
  const userInteracted = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const shot = GALLERY_SHOTS.find((s) => s.key === active) || GALLERY_SHOTS[0];

  const switchShot = useCallback((key: string) => {
    setCaptionVisible(false);
    setTimeout(() => {
      setActive(key);
      setCaptionVisible(true);
    }, 200);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !userInteracted.current) {
            const order: string[] = GALLERY_SHOTS.map((s) => s.key);
            let idx = order.indexOf(active);
            intervalRef.current = setInterval(() => {
              idx = (idx + 1) % order.length;
              switchShot(order[idx]);
            }, 3200);
          } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(stage);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, switchShot]);

  const handleTabClick = (key: string) => {
    userInteracted.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    switchShot(key);
  };

  return (
    <section className="py-[90px] relative" id="gallery">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1">
        <div className="text-center max-w-[680px] mx-auto mb-[50px] reveal">
          <span className="inline-block text-[13px] font-bold text-primary tracking-[1px] uppercase mb-3.5">
            جولة داخل النظام
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-black tracking-[-0.5px] leading-[1.18] mb-4">
            شوف الواجهات الحقيقية
          </h2>
          <p className="text-[17px] text-muted">
            اضغط على أي شاشة لتتصفّح النظام كما هو فعلاً — لقطات مباشرة من Kairos Space POS.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 reveal">
          {GALLERY_SHOTS.map((s) => (
            <button
              key={s.key}
              onClick={() => handleTabClick(s.key)}
              className={`inline-flex items-center gap-[9px] py-[11px] px-[18px] rounded-full border text-[15px] font-semibold cursor-pointer transition-all duration-220 ${
                active === s.key
                  ? "bg-primary text-[#0a0a0c] border-primary font-bold shadow-[0_8px_22px_-8px_rgba(212,175,55,0.5)]"
                  : "bg-surface border-secondary text-muted hover:text-text hover:border-[rgba(212,175,55,0.35)]"
              }`}
              aria-label={`عرض ${TAB_LABELS[s.key]}`}
            >
              {TAB_ICONS[s.key]}
              {TAB_LABELS[s.key]}
            </button>
          ))}
        </div>

        {/* Stage */}
        <div ref={stageRef} className="max-w-[880px] mx-auto reveal">
          <div className="relative">
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
                    sizes="880px"
                    loading={s.key === "cashier" ? "eager" : "lazy"}
                  />
                ))}
              </div>
            </div>
            <div className="laptop-base" />
          </div>

          {/* Caption */}
          <div className="text-center mt-[26px] min-h-[58px]">
            <h3
              className="text-[22px] font-extrabold mb-1.5 transition-opacity duration-300"
              style={{ opacity: captionVisible ? 1 : 0 }}
            >
              {shot.title}
            </h3>
            <p
              className="text-[15.5px] text-muted max-w-[560px] mx-auto transition-opacity duration-300"
              style={{ opacity: captionVisible ? 1 : 0 }}
            >
              {shot.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
