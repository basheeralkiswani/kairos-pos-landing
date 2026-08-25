"use client";

/* حامل الفيلم في الهيرو.
   الفيلم مسرح ثابت 1920×1080 يُصغَّر بـ transform إلى عرض الحاوية — نفس ما
   يفعله محرّك التصميم. مسؤولية هذا الملف ثلاث: القياس، والبوّابات (متى يُسمح
   للفيلم أن يدور أصلاً)، وأدوات التحكّم.

   البوّابات مهمّة: هذا شريط 60 إطاراً/ث في أعلى صفحة هبوط. يدور فقط عندما
   يكون مرئياً، والتبويب ظاهر، والزائر لم يوقفه، ولم يطلب تقليل الحركة. */

import { useCallback, useEffect, useRef, useState } from "react";
import PromoFilm, {
  FILM_DURATION,
  POSTER_T,
  SCENES,
  STAGE_H,
  STAGE_W,
  useFilmClock,
} from "./PromoFilm";

const CREAM = "#f5ead8";
const INK = "#201e1d";
const TERRA = "#c67139";

function PlayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

function PauseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5h3.2v14H7zM13.8 5H17v14h-3.2z" />
    </svg>
  );
}

export default function HeroPromo() {
  const frameRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(0);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [wantsMotion, setWantsMotion] = useState(true);
  const [userPaused, setUserPaused] = useState(false);

  /* القياس: عرض الحاوية ÷ 1920. يبدأ بصفر حتى أول قياس فلا يومض المسرح
     بحجمه الكامل قبل التصغير. */
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / STAGE_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* الرؤية: هامش 200px حتى يبدأ الفيلم قبل وصوله للطيّة بقليل */
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px 0px",
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  /* «تقليل الحركة» ليس مجرّد إبطاء هنا: الفيلم كلّه حركة، فالبديل الصحيح هو
     إطار ساكن + زرّ يبدأ التشغيل بطلب صريح من الزائر. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setWantsMotion(!mq.matches);
      setUserPaused(mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const playing = inView && tabVisible && !userPaused;
  const { T, seek } = useFilmClock(playing, wantsMotion ? 0 : POSTER_T);

  const sceneIndex = (() => {
    let at = 0;
    for (let i = 0; i < SCENES.length; i++) {
      at += SCENES[i].dur;
      if (T < at) return i;
    }
    return SCENES.length - 1;
  })();

  const jumpTo = useCallback(
    (i: number) => {
      let at = 0;
      for (let k = 0; k < i; k++) at += SCENES[k].dur;
      seek(at);
      setUserPaused(false);
    },
    [seek],
  );

  const progress = (T / FILM_DURATION) * 100;

  return (
    <>
      <div
        ref={frameRef}
        className="relative w-full overflow-hidden rounded-[clamp(16px,2vw,26px)] border border-[rgba(168,128,26,0.28)] shadow-[0_36px_80px_-38px_rgba(60,45,12,0.55)]"
        style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}`, background: CREAM }}
      >
        {/* المسرح — بصريّ محض؛ محتواه مكرّر نصّياً في أقسام الصفحة، فنُخفيه عن
            قارئ الشاشة بدل أن نُغرقه بعشرات العقد بلا ترتيب معنوي. الإخفاء على
            هذه الطبقة وحدها: زرّ التشغيل تحتها يجب أن يبقى مرئياً للقارئ. */}
        {scale > 0 && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: STAGE_W,
              height: STAGE_H,
              transform: `scale(${scale})`,
              /* المسرح مبنيّ بإحداثيات فيزيائية (left/right صريحة) وقد أُلِّف
                 على صفحة LTR. داخل صفحة RTL يجب تثبيت الاتجاه هنا، وإلا انقلب
                 ترتيب الفلكس داخل الفيلم. لذلك left/top الفيزيائيان لا
                 المنطقيان: الإرساء يجب ألّا يتبع اتجاه الصفحة. */
              transformOrigin: "top left",
              direction: "ltr",
              willChange: "transform",
            }}
          >
            <PromoFilm T={T} />
          </div>
        )}

        {/* غلاف «تقليل الحركة»: إطار ساكن حتى يطلب الزائر التشغيل */}
        {!wantsMotion && userPaused && (
          <button
            type="button"
            onClick={() => setUserPaused(false)}
            className="absolute inset-0 z-10 flex items-center justify-center bg-[rgba(245,234,216,0.55)] backdrop-blur-[2px]"
          >
            <span
              className="inline-flex items-center gap-2.5 py-3 px-5 rounded-full text-[15px] font-extrabold shadow-[0_18px_40px_-16px_rgba(32,30,29,0.5)]"
              style={{ background: TERRA, color: CREAM }}
            >
              <PlayIcon size={20} />
              شغّل العرض
            </span>
          </button>
        )}
      </div>

      {/* شريط التقدّم + أدوات التحكّم + فصول الفيلم */}
      <div className="mt-3">
        <div className="h-[3px] w-full rounded-full bg-secondary overflow-hidden" aria-hidden="true">
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: TERRA, transition: userPaused ? "width .2s" : "none" }}
          />
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-pressed={userPaused}
            className="hit-44 inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-surface border border-secondary text-[12px] font-bold text-text hover:border-[rgba(198,113,57,0.6)] transition-colors"
          >
            {userPaused ? <PlayIcon size={15} /> : <PauseIcon size={15} />}
            {userPaused ? "تشغيل" : "إيقاف مؤقت"}
          </button>
          <span className="w-px h-5 bg-secondary mx-1" aria-hidden="true" />
          {SCENES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => jumpTo(i)}
              aria-current={i === sceneIndex ? "true" : undefined}
              className="py-1.5 px-3 rounded-full text-[12px] font-bold border transition-colors"
              style={
                i === sceneIndex
                  ? { background: TERRA, borderColor: TERRA, color: CREAM }
                  : { background: "transparent", borderColor: "var(--color-secondary)", color: INK, opacity: 0.72 }
              }
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
