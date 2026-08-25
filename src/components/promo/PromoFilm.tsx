"use client";

/* Kairos Space POS — الفيلم الترويجي، النسخة الدافئة.
   منقول من مشروع Claude Design «Kairos Promo Video Warm» (promo-warm.jsx +
   محرّك animations-v3.jsx). الشاشات هي إعادة البناء الحقيقية في Screens.tsx.

   المحرّك الأصلي عام الغرض (تحرير مَشاهد، شريط تشغيل، تصدير). هنا نحتاج منه
   شيئاً واحداً: محور زمن مؤلَّف واحد T تُشتق منه كل الحركة كدالة خالصة. بما أن
   كل مشهد يُعرض بمدّته الطبيعية (dur === nat) فإن T = زمن التشغيل، ولا حاجة
   لطبقة تشويه الزمن كلها. */

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CashierScreen,
  DashboardScreen,
  Icon,
  LowStockScreen,
  TablesScreen,
  WaiterScreen,
} from "./Screens";

/* ── لوحة الفيلم ── */
const CREAM = "#f5ead8";
const INK = "#201e1d";
const TERRA = "#c67139";
const TERRA_D = "#8a4a22";
const SAGE = "#7a8a5e";
const SAND = "#eadbc2";

/* الأصل يطلب Cairo/Figtree/Caprasimo. على الموقع نستعمل خطّيه فلا نُحمّل
   ثلاث عائلات إضافية في الهيرو (وهي أثقل ما يمكن إضافته فوق الطية). */
const AR = "var(--font-ar), 'Segoe UI', Tahoma, sans-serif";
const EN = "var(--font-en), system-ui, sans-serif";

export const STAGE_W = 1920;
export const STAGE_H = 1080;

const W = 1040;
const H = 585; // نافذة الشاشة داخل البطاقة
const BASE = W / STAGE_W; // تكبير «يملأ تماماً»

/* ── المَشاهد: نفس OM_SCENES في ملف التصميم ── */
export const SCENES: { name: string; dur: number; label: string }[] = [
  { name: "Opening", dur: 5, label: "المقدّمة" },
  { name: "Cashier", dur: 9, label: "الكاشير" },
  { name: "Tables", dur: 8, label: "الطاولات" },
  { name: "Waiter", dur: 7, label: "الويتر" },
  { name: "Reports", dur: 9, label: "التقارير" },
  { name: "Inventory", dur: 7, label: "المخزون" },
  { name: "Cloud", dur: 7, label: "الفروع" },
  { name: "Close", dur: 5, label: "الختام" },
];

export const CUES: Record<string, number> = (() => {
  const t: Record<string, number> = {};
  let at = 0;
  for (const s of SCENES) {
    if (!(s.name in t)) t[s.name] = at;
    at += s.dur;
  }
  return t;
})();

export const FILM_DURATION = SCENES.reduce((s, x) => s + x.dur, 0);

/* الثانية التي يقف عندها الإطار الساكن (بديل «تقليل الحركة»): منتصف مشهد
   الكاشير — البطاقة مستقرّة والنص كامل، أي أفضل إطار مفرد في الفيلم. */
export const POSTER_T = CUES.Cashier + 4.2;

/* ── التخفيفات (من animations-v3) ── */
const easeOutCubic = (t: number) => --t * t * t + 1;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const linear = (t: number) => t;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* تكميم: الوسائط المستمرة التي تدخل شاشةً مذكَّرة (memo) يجب أن تستقرّ على
   درجات، وإلا تغيّرت كل إطار وأبطلت المقارنة فتُعاد الشاشة كاملة ستين مرة في
   الثانية. الدرجات هنا أدقّ بكثير من قدرة العين على التمييز. */
const step = (v: number, n: number) => Math.round(v * n) / n;

const kf = (T: number, stops: [number, number][], ease = easeInOutCubic) => {
  if (T <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    const [t0, v0] = stops[i - 1];
    const [t1, v1] = stops[i];
    if (T <= t1) {
      const p = t1 === t0 ? 1 : ease((T - t0) / (t1 - t0));
      return v0 + (v1 - v0) * p;
    }
  }
  return stops[stops.length - 1][1];
};

/* دخول/خروج ناعم، يستعمله كل عنصر */
const settle = (T: number, start: number, end: number, rise = 70) => {
  const i = easeOutCubic(clamp01((T - start) / 1.0));
  const o = easeInOutQuad(clamp01((T - (end - 0.75)) / 0.75));
  return { opacity: i * (1 - o), y: (1 - i) * rise - o * 34 };
};

/* ── الساعة: محور T واحد، تتوقّف عند عدم التشغيل ── */
export function useFilmClock(playing: boolean, seedT = 0) {
  const [T, setT] = useState(seedT);
  const tRef = useRef(seedT);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last: number | null = null;
    const frame = (ts: number) => {
      if (last === null) last = ts;
      /* قفزة الوقت تُقصّ عند 1/4 ثانية: العودة من تبويب مخفي أو من توقّف
         طويل لا يجوز أن تُقفز الفيلم مَشاهد كاملة دفعة واحدة. */
      const dt = Math.min((ts - last) / 1000, 0.25);
      last = ts;
      tRef.current = (tRef.current + dt) % FILM_DURATION;
      setT(tRef.current);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const seek = (to: number) => {
    tRef.current = ((to % FILM_DURATION) + FILM_DURATION) % FILM_DURATION;
    setT(tRef.current);
  };
  return { T, seek };
}

/* ── لقطة: أطفالها ظاهرون بين زمنين مؤلَّفين (يبقون مُركَّبين) ── */
function Shot({ T, from, to, children }: { T: number; from: number; to: number; children: ReactNode }) {
  const on = T >= from && T < to;
  return <div style={{ position: "absolute", inset: 0, visibility: on ? "visible" : "hidden" }}>{children}</div>;
}

/* ── البطاقة المؤطَّرة التي تجلس الشاشة داخلها ── */
function ScreenCard({
  side = "right",
  zoom,
  fx = 0,
  fy = 0,
  opacity = 1,
  y = 0,
  tilt = 0,
  children,
}: {
  side?: "right" | "left";
  zoom: number;
  fx?: number;
  fy?: number;
  opacity?: number;
  y?: number;
  tilt?: number;
  children: ReactNode;
}) {
  const maxFx = Math.max(0, (STAGE_W * zoom - W) / (2 * zoom));
  const maxFy = Math.max(0, (STAGE_H * zoom - H) / (2 * zoom));
  const cx = Math.max(-maxFx, Math.min(maxFx, fx));
  const cy = Math.max(-maxFy, Math.min(maxFy, fy));
  const left = side === "right" ? STAGE_W - W - 96 : 96;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top: 540 - H / 2 + 30,
        width: W,
        height: H,
        opacity,
        transform: `translateY(${y}px) rotate(${tilt}deg)`,
        transformOrigin: "50% 50%",
        padding: 16,
        background: CREAM,
        borderRadius: 40,
        boxShadow: "0 46px 90px -34px rgba(32,30,29,0.42), 0 0 0 1px rgba(32,30,29,0.06)",
      }}
    >
      <div style={{ position: "absolute", inset: 16, borderRadius: 26, overflow: "hidden", background: "#0a0a0c" }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: STAGE_W,
            height: STAGE_H,
            marginLeft: -960,
            marginTop: -540,
            transformOrigin: "50% 50%",
            transform: `translate(${-cx * zoom}px, ${-cy * zoom}px) scale(${zoom})`,
            willChange: "transform",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── عمود النص المقابل للبطاقة ── */
function Words({
  n,
  ar,
  en,
  T,
  start,
  end,
  side = "left",
  showEnglish = true,
}: {
  n: string;
  ar: string;
  en: string;
  T: number;
  start: number;
  end: number;
  side?: "left" | "right";
  showEnglish?: boolean;
}) {
  const { opacity, y } = settle(T, start, end, 58);
  const enP = clamp01((T - (start + 0.5)) / 0.9);
  const barP = easeOutCubic(clamp01((T - (start + 0.15)) / 0.8));
  return (
    <div
      style={{
        position: "absolute",
        top: 300,
        width: 640,
        direction: "rtl",
        left: side === "left" ? 110 : "auto",
        right: side === "right" ? 110 : "auto",
        textAlign: "right",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 16, marginBottom: 30 }}>
        <div
          style={{
            fontFamily: EN,
            direction: "ltr",
            fontSize: 21,
            fontWeight: 500,
            color: "#fff",
            background: TERRA,
            borderRadius: 999,
            padding: "7px 20px",
            letterSpacing: "0.08em",
          }}
        >
          {n}
        </div>
        <div style={{ height: 3, borderRadius: 999, background: SAGE, width: 120 * barP, opacity: 0.7 }} />
      </div>
      <div
        style={{
          fontFamily: AR,
          fontWeight: 700,
          fontSize: 66,
          color: INK,
          lineHeight: 1.22,
          letterSpacing: "-0.01em",
          textWrap: "pretty",
        }}
      >
        {ar}
      </div>
      {showEnglish && (
        <div
          style={{
            fontFamily: EN,
            direction: "ltr",
            textAlign: "right",
            marginTop: 22,
            fontSize: 24,
            fontWeight: 400,
            color: TERRA_D,
            lineHeight: 1.45,
            opacity: enP,
            transform: `translateY(${(1 - enP) * 12}px)`,
          }}
        >
          {en}
        </div>
      )}
    </div>
  );
}

/* ── الأرضية: كريمي وشكلان ناعمان يعبران الفيلم كله ── */
function Ground({ T }: { T: number }) {
  const a = { x: Math.sin(T / 8) * 420 + 260, y: Math.cos(T / 11) * 220 - 120 };
  const b = { x: Math.cos(T / 9.5) * 480 - 300, y: Math.sin(T / 7.5) * 180 + 240 };
  return (
    <div style={{ position: "absolute", inset: 0, background: CREAM, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1120,
          height: 1120,
          marginLeft: -560,
          marginTop: -560,
          borderRadius: 999,
          background: SAND,
          transform: `translate(${a.x}px, ${a.y}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 760,
          height: 760,
          marginLeft: -380,
          marginTop: -380,
          borderRadius: 999,
          background: "rgba(122,138,94,0.13)",
          transform: `translate(${b.x}px, ${b.y}px)`,
        }}
      />
    </div>
  );
}

function Logo({ size = 300, scale = 1 }: { size?: number; scale?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: 999,
        background: CREAM,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        boxShadow: "0 34px 70px -28px rgba(32,30,29,0.4)",
        transform: `scale(${scale})`,
      }}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={Math.round(size * 0.7)}
        height={Math.round(size * 0.7)}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}

/* ── الفيلم: دالة خالصة في T ── */
export default function PromoFilm({ T, showEnglish = true }: { T: number; showEnglish?: boolean }) {
  /* انسياب بطيء تشترك فيه كل البطاقات: التكبير يتنفّس والتأطير يتجوّل */
  const drift = (t0: number, dur: number, dz = 0.055, dx = 120, dy = 70) => ({
    zoom: BASE + easeInOutCubic(clamp01((T - t0) / dur)) * dz,
    fx: Math.sin((T - t0) / 3.4) * dx,
    fy: Math.cos((T - t0) / 4.1) * dy,
  });

  /* 1 — المقدّمة */
  const o = settle(T, 0.4, CUES.Cashier + 0.2, 40);
  const line2 = clamp01((T - 2.0) / 0.9);
  const ring = easeOutCubic(clamp01((T - 0.5) / 1.4));

  /* 2 — الكاشير */
  const c0 = CUES.Cashier;
  const cash = drift(c0, 8);
  const cashCard = settle(T, c0 - 0.5, c0 + 8.9, 150);
  const added = T > c0 + 2.6 && T < c0 + 3.5 ? 2 : -1;

  /* 3 — الطاولات */
  const t0 = CUES.Tables;
  const tab = drift(t0, 7, 0.05, 150, 60);
  const tabCard = settle(T, t0 - 0.5, t0 + 7.9, 150);

  /* 4 — الويتر */
  const w0 = CUES.Waiter;
  const waitCard = settle(T, w0 - 0.5, w0 + 6.9, 170);
  const waitTilt = kf(T, [
    [w0 - 0.5, -3.2],
    [w0 + 2.0, -1.4],
    [w0 + 6.9, 0.6],
  ]);
  const waitScale = kf(
    T,
    [
      [w0 - 0.5, 0.9],
      [w0 + 6.9, 0.97],
    ],
    linear,
  );

  /* 5 — التقارير */
  const r0 = CUES.Reports;
  const rep = drift(r0, 8, 0.06, 110, 120);
  const repCard = settle(T, r0 - 0.5, r0 + 8.9, 150);
  const countUp = step(clamp01((T - (r0 + 0.4)) / 1.7), 120);
  const chart = step(clamp01((T - (r0 + 2.2)) / 2.6), 120);

  /* 6 — المخزون */
  const i0 = CUES.Inventory;
  const inv = drift(i0, 6.5, 0.05, 60, 130);
  const invCard = settle(T, i0 - 0.5, i0 + 7.0, 150);
  const pulse = step((Math.sin((T - i0) * 2.4) + 1) / 2, 24);

  /* 7 — الفروع */
  const b0 = CUES.Cloud;
  const bIn = settle(T, b0 - 0.6, b0 + 6.9, 120);
  const fan = easeOutCubic(clamp01((T - (b0 - 0.4)) / 1.4));
  const arc = clamp01((T - (b0 + 0.7)) / 2.0);
  const float = Math.sin((T - b0) / 2.2) * 12;
  const branches: [number, number][] = [
    [-620, -7],
    [0, 0],
    [620, 7],
  ];

  /* 8 — الختام */
  const e0 = CUES.Close;
  const eIn = clamp01((T - (e0 - 0.2)) / 1.0);
  const eOut = clamp01((T - (e0 + 3.9)) / 1.0);
  const eOp = eIn * (1 - eOut);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: CREAM }}>
      <Ground T={T} />

      {/* 1 — المقدّمة */}
      <Shot T={T} from={0} to={CUES.Cashier + 0.7}>
        <div style={{ position: "absolute", inset: 0, direction: "rtl", opacity: o.opacity, transform: `translateY(${o.y}px)` }}>
          <div
            style={{
              position: "absolute",
              right: 210,
              top: 200,
              width: 560,
              height: 560,
              borderRadius: 999,
              border: `3px solid ${TERRA}`,
              opacity: 0.35 * ring,
              transform: `scale(${0.86 + ring * 0.14})`,
            }}
          />
          <div style={{ position: "absolute", right: 150, top: 240, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 22, marginBottom: 48 }}>
              <Logo size={96} />
              <div style={{ fontFamily: EN, fontWeight: 800, direction: "ltr", fontSize: 34, color: INK, letterSpacing: "0.01em" }}>
                Kairos <span style={{ color: TERRA }}>Space</span>
              </div>
            </div>
            <div style={{ fontFamily: AR, fontWeight: 700, fontSize: 112, color: INK, lineHeight: 1.14 }}>إدارة مطعمك؟</div>
            <div
              style={{
                fontFamily: AR,
                fontWeight: 700,
                fontSize: 112,
                color: TERRA,
                lineHeight: 1.14,
                opacity: line2,
                transform: `translateY(${(1 - line2) * 38}px)`,
              }}
            >
              خلّيها على Kairos.
            </div>
          </div>
        </div>
      </Shot>

      {/* 2 — الكاشير */}
      <Shot T={T} from={CUES.Cashier - 0.6} to={CUES.Tables + 0.6}>
        <ScreenCard side="right" tilt={1.1} zoom={cash.zoom} fx={cash.fx} fy={cash.fy} opacity={cashCard.opacity} y={cashCard.y}>
          <CashierScreen addedIndex={added} payActive={T > c0 + 6.2 ? "cash" : null} cartCount={3} />
        </ScreenCard>
        <Words
          n="01"
          side="left"
          T={T}
          start={c0 + 0.5}
          end={CUES.Tables - 0.1}
          showEnglish={showEnglish}
          ar="بيع بلمسة واحدة"
          en="One tap to sell — cash, card, wallet, split or credit."
        />
      </Shot>

      {/* 3 — الطاولات */}
      <Shot T={T} from={CUES.Tables - 0.7} to={CUES.Waiter + 0.6}>
        <ScreenCard side="left" tilt={-1.1} zoom={tab.zoom} fx={tab.fx} fy={tab.fy} opacity={tabCard.opacity} y={tabCard.y}>
          <TablesScreen highlight={T > t0 + 2.6 ? 0 : -1} />
        </ScreenCard>
        <Words
          n="02"
          side="right"
          T={T}
          start={t0 + 0.5}
          end={CUES.Waiter - 0.1}
          showEnglish={showEnglish}
          ar="خريطة طاولات تعرف كل شي"
          en="Live table map: ordering, bill printed, free."
        />
      </Shot>

      {/* 4 — الويتر */}
      <Shot T={T} from={CUES.Waiter - 0.7} to={CUES.Reports + 0.6}>
        <div
          style={{
            position: "absolute",
            left: 900,
            top: 160,
            width: 1000,
            height: 716,
            opacity: waitCard.opacity,
            transform: `translateY(${waitCard.y}px) scale(${waitScale}) rotate(${waitTilt}deg)`,
            transformOrigin: "40% 50%",
            borderRadius: 46,
            background: CREAM,
            padding: 34,
            boxShadow: "0 50px 96px -34px rgba(32,30,29,0.45), 0 0 0 1px rgba(32,30,29,0.06)",
          }}
        >
          <div style={{ width: 932, height: 648, borderRadius: 26, overflow: "hidden" }}>
            <div style={{ width: 1180, height: 820, transform: "scale(0.79)", transformOrigin: "0 0" }}>
              <WaiterScreen highlight={T > w0 + 2.6 ? 4 : -1} />
            </div>
          </div>
        </div>
        <Words
          n="03"
          side="left"
          T={T}
          start={w0 + 0.5}
          end={CUES.Reports - 0.1}
          showEnglish={showEnglish}
          ar="الويتر يرسل الطلب من التابلت"
          en="Waiter tablets send each round straight to the kitchen."
        />
      </Shot>

      {/* 5 — التقارير */}
      <Shot T={T} from={CUES.Reports - 0.7} to={CUES.Inventory + 0.6}>
        <ScreenCard side="right" tilt={0.8} zoom={rep.zoom} fx={rep.fx} fy={rep.fy} opacity={repCard.opacity} y={repCard.y}>
          <DashboardScreen count={countUp} chart={chart} />
        </ScreenCard>
        <Words
          n="04"
          side="left"
          T={T}
          start={r0 + 0.5}
          end={CUES.Inventory - 0.1}
          showEnglish={showEnglish}
          ar="أرقامك لحظة بلحظة"
          en="Sales, cash, receivables and profit — every 30 seconds."
        />
      </Shot>

      {/* 6 — المخزون */}
      <Shot T={T} from={CUES.Inventory - 0.7} to={CUES.Cloud + 1.0}>
        <ScreenCard side="left" tilt={-0.8} zoom={inv.zoom} fx={inv.fx} fy={inv.fy} opacity={invCard.opacity} y={invCard.y}>
          <LowStockScreen pulse={pulse} />
        </ScreenCard>
        <Words
          n="05"
          side="right"
          T={T}
          start={i0 + 0.5}
          end={CUES.Cloud - 0.1}
          showEnglish={showEnglish}
          ar="المخزون ينبّهك قبل ما يخلص"
          en="Stock, recipes and low-stock alerts that arrive in time."
        />
      </Shot>

      {/* 7 — الفروع والسحابة */}
      <Shot T={T} from={CUES.Cloud - 1.6} to={CUES.Close + 0.6}>
        <div style={{ position: "absolute", inset: 0, opacity: bIn.opacity }}>
          <svg width={STAGE_W} height={STAGE_H} style={{ position: "absolute", inset: 0 }}>
            {branches.map(([bx], i) => {
              const x1 = 960 + bx * fan;
              const y1 = 660;
              const x2 = 960;
              const y2 = 468;
              const d = `M${x1},${y1} C${x1},${y1 - 120} ${x2},${y2 + 130} ${x2},${y2}`;
              return (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={SAGE}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="700"
                  strokeDashoffset={700 * (1 - arc)}
                  opacity="0.75"
                />
              );
            })}
          </svg>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 250,
              marginLeft: -110,
              width: 220,
              height: 220,
              borderRadius: 999,
              background: CREAM,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 34px 70px -30px rgba(32,30,29,0.35)",
              transform: `translateY(${float}px)`,
            }}
          >
            <Icon name="cloud" size={124} color={TERRA} stroke={2.75} />
          </div>
          {branches.map(([bx, rot], i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: 660 + (1 - fan) * 90,
                width: STAGE_W,
                height: STAGE_H,
                marginLeft: -960,
                opacity: fan,
                transform: `translateX(${bx * fan}px) scale(0.225) rotate(${rot * fan}deg)`,
                transformOrigin: "50% 0%",
                borderRadius: 70,
                overflow: "hidden",
                boxShadow: "0 60px 110px -30px rgba(32,30,29,0.45), 0 0 0 6px rgba(245,234,216,1)",
              }}
            >
              {i === 0 ? <CashierScreen cartCount={2} /> : i === 1 ? <TablesScreen /> : <DashboardScreen count={1} chart={1} />}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: 92,
            left: 0,
            right: 0,
            textAlign: "center",
            direction: "rtl",
            opacity: bIn.opacity,
            transform: `translateY(${bIn.y}px)`,
          }}
        >
          <div style={{ fontFamily: AR, fontWeight: 700, fontSize: 78, color: INK, lineHeight: 1.2 }}>
            يعمل بدون إنترنت · ويزامن فروعك
          </div>
          {showEnglish && (
            <div style={{ fontFamily: EN, direction: "ltr", marginTop: 16, fontSize: 26, color: TERRA_D }}>
              Offline-first. Cloud sync across every branch.
            </div>
          )}
        </div>
      </Shot>

      {/* 8 — الختام */}
      <Shot T={T} from={CUES.Close - 0.4} to={CUES.Close + 6}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 84,
            direction: "rtl",
            opacity: eOp,
          }}
        >
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: AR, fontWeight: 700, fontSize: 98, color: INK, lineHeight: 1.18 }}>
              خلّيها على Kairos.
            </div>
            <div
              style={{
                fontFamily: EN,
                fontWeight: 800,
                direction: "ltr",
                textAlign: "right",
                marginTop: 24,
                fontSize: 32,
                color: TERRA,
                letterSpacing: "0.02em",
              }}
            >
              Kairos Space POS
            </div>
          </div>
          <Logo size={320} scale={0.94 + eIn * 0.06} />
        </div>
      </Shot>
    </div>
  );
}
