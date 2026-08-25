/* إعادة بناء أمينة لشاشات Kairos Space POS الحقيقية — القيم منقولة من
   basheeralkiswani/kairos-space-pos@main:
     src/index.css (اللوحة الداكنة)، src/components/Header.tsx،
     src/components/Menu/{Menu,CategoryTabs,ProductCard}.tsx،
     src/components/Cart/{Cart,CartItem,CartSummary,OrderTypeSelector}.tsx،
     src/pages/admin/{AdminLayout,Dashboard,LowStockDashboard}.tsx،
     src/pages/waiter/WaiterTables.tsx

   مصدر هذا الملف: مشروع Claude Design «Kairos Promo Video Warm» (screens.jsx).
   تعديلان مقصودان عن الأصل:
   1) الأيقونات مضمّنة محلياً بدل جلبها من unpkg وقت التشغيل.
   2) الخط: الأصل يطلب Cairo؛ هنا نستخدم خط الموقع (--font-ar) فلا نُحمّل
      عائلة خطوط رابعة في الهيرو. */

import { memo, type CSSProperties, type ReactNode } from "react";
import { LUCIDE } from "./lucide-paths";

export const C = {
  bg: "#0a0a0c",
  surface: "#18181b",
  primary: "#d4af37",
  secondary: "#27272a",
  text: "#f4f4f5",
  muted: "#a1a1aa",
  green: "#4ade80",
  blue: "#60a5fa",
  purple: "#c084fc",
  amber: "#f59e0b",
  amber3: "#fcd34d",
  red: "#f87171",
  slate: "#cbd5e1",
};

export const FONT = "var(--font-ar), 'Cairo', 'Segoe UI', Tahoma, sans-serif";

/* الأصل يبني المنسّق في كل استدعاء داخل حلقة الرسم (60 مرة/ث × عشرات الخلايا).
   Intl.NumberFormat ثقيل الإنشاء — نبنيه مرة واحدة. */
const JOD = new Intl.NumberFormat("en-JO", { style: "currency", currency: "JOD" });
export const jod = (n: number) => JOD.format(n);

/* الأصل يكتب `hsl(h,50%,55%)22` — لصق شفافية بصيغة hex على دالة hsl لا يُنتج
   لوناً صالحاً، فيسقطه المتصفّح (الرقاقة بلا خلفية ولا حدّ، وأيقونة الصنف
   تختفي لأن قيمة stroke غير صالحة). النية واضحة، فنكتبها بصيغة صحيحة. */
const hsla = (h: number, a: number) => `hsla(${h}, 50%, 55%, ${a})`;

export function Icon({
  name,
  size = 20,
  color = "currentColor",
  stroke = 2,
  style,
}: {
  name: string;
  size?: number;
  color?: string;
  stroke?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, display: "block", ...style }}
      dangerouslySetInnerHTML={{ __html: LUCIDE[name] || "" }}
    />
  );
}

/* ── الشريط العلوي (Header.tsx: h-16 bg-surface border-b border-secondary px-6) ── */
function AppHeader({ tablesBadge = 4, pendingBadge = 2 }: { tablesBadge?: number; pendingBadge?: number }) {
  const iconBtn: CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: C.muted,
    position: "relative",
  };
  const badge: CSSProperties = {
    position: "absolute",
    top: -2,
    insetInlineEnd: -2,
    minWidth: 18,
    height: 18,
    padding: "0 4px",
    borderRadius: 999,
    color: C.bg,
    fontSize: 10,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <header
      style={{
        height: 64,
        background: C.surface,
        borderBottom: `1px solid ${C.secondary}`,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: C.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: C.bg,
            fontSize: 20,
            boxShadow: "0 0 10px rgba(212,175,55,0.3)",
          }}
        >
          K
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.025em", margin: 0, color: C.text }}>
          Kairos <span style={{ fontWeight: 300, color: C.muted }}>Space</span>
        </h1>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text, fontVariantNumeric: "tabular-nums" }}>
            10:42:18
          </span>
          <span style={{ fontSize: 11, color: C.muted }}>الثلاثاء، 25 آب</span>
        </div>
        <div style={{ height: 28, width: 1, background: C.secondary }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 10px",
            height: 36,
            borderRadius: 999,
            color: C.muted,
          }}
        >
          <Icon name="cloud" size={18} />
          <span style={{ fontSize: 11, fontWeight: 500 }}>الآن</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 10px",
            height: 36,
            borderRadius: 999,
            color: C.muted,
          }}
        >
          <Icon name="languages" size={18} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>EN</span>
        </div>
        <div style={iconBtn}>
          <Icon name="sun" size={19} />
        </div>
        <div style={iconBtn}>
          <Icon name="monitor-play" size={19} />
        </div>
        <div style={iconBtn}>
          <Icon name="armchair" size={19} />
          <span style={{ ...badge, background: C.amber }}>{tablesBadge}</span>
        </div>
        <div style={iconBtn}>
          <Icon name="clipboard-list" size={19} />
          <span style={{ ...badge, background: C.primary }}>{pendingBadge}</span>
        </div>
        <div style={iconBtn}>
          <Icon name="settings" size={19} />
        </div>
        <div style={{ height: 28, width: 1, background: C.secondary }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: C.primary, fontWeight: 700, fontSize: 14 }}>ب</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: C.text, lineHeight: 1.2 }}>بشير</span>
            <span style={{ fontSize: 11, color: C.muted, lineHeight: 1 }}>مدير</span>
          </div>
        </div>
        <div style={iconBtn}>
          <Icon name="log-out" size={18} />
        </div>
      </div>
    </header>
  );
}

/* ── شاشة الكاشير (CashierView + Menu + Cart) ── */
const CATS = ["الكل", "مشروبات ساخنة", "مشروبات باردة", "حلويات", "مأكولات"];

type Product = { name: string; desc: string; price: number; cat: string; hue: number };
const PRODUCTS: Product[] = [
  { name: "قهوة عربية", desc: "حبوب محمصة مع هيل", price: 1.5, cat: "مشروبات ساخنة", hue: 25 },
  { name: "إسبريسو دوبل", desc: "شوت مزدوج", price: 1.75, cat: "مشروبات ساخنة", hue: 25 },
  { name: "كابتشينو", desc: "حليب مبخّر ورغوة", price: 2.25, cat: "مشروبات ساخنة", hue: 25 },
  { name: "شاي بالنعنع", desc: "نعنع طازج", price: 1.0, cat: "مشروبات ساخنة", hue: 25 },
  { name: "آيس لاتيه", desc: "مثلج مع حليب", price: 2.5, cat: "مشروبات باردة", hue: 200 },
  { name: "ليموناضة نعنع", desc: "ليمون طازج", price: 2.0, cat: "مشروبات باردة", hue: 200 },
  { name: "موهيتو فراولة", desc: "صودا وفراولة", price: 2.75, cat: "مشروبات باردة", hue: 200 },
  { name: "عصير برتقال", desc: "طازج 100%", price: 2.0, cat: "مشروبات باردة", hue: 200 },
  { name: "كنافة نابلسية", desc: "جبنة وقطر", price: 3.5, cat: "حلويات", hue: 330 },
  { name: "تشيز كيك", desc: "قطعة مع فراولة", price: 3.0, cat: "حلويات", hue: 330 },
  { name: "براوني", desc: "شوكولاتة داكنة", price: 2.75, cat: "حلويات", hue: 330 },
  { name: "كوكيز", desc: "قطعتان", price: 1.25, cat: "حلويات", hue: 330 },
];

type CartItemT = { name: string; variant: string | null; qty: number; price: number; mods?: string[] };
const CART: CartItemT[] = [
  { name: "كابتشينو", variant: "وسط · ساخن", qty: 2, price: 2.25 },
  { name: "كنافة نابلسية", variant: null, qty: 1, price: 3.5, mods: ["قشطة إضافية"] },
  { name: "آيس لاتيه", variant: "كبير", qty: 1, price: 2.5 },
];

function ProductTile({ p, added, big }: { p: Product; added?: boolean; big?: boolean }) {
  return (
    <div
      style={{
        background: C.surface,
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${added ? C.primary : C.secondary}`,
        boxShadow: added ? "0 0 16px rgba(212,175,55,0.2)" : "0 1px 2px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        transform: added ? "scale(1.02)" : "none",
        transition: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          height: big ? 176 : 160,
          background: `hsl(${p.hue},35%,18%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: hsla(p.hue, 0.13),
            border: `1.5px solid ${hsla(p.hue, 0.27)}`,
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 24, lineHeight: 1, color: `hsl(${p.hue},50%,55%)` }}>
            {p.name.charAt(0)}
          </span>
        </div>
        <Icon name="package" size={14} color={hsla(p.hue, 0.53)} />
        {added && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(212,175,55,0.15)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                background: C.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.bg}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3 style={{ fontWeight: 500, fontSize: 15, color: C.text, margin: "0 0 4px", lineHeight: 1.2 }}>{p.name}</h3>
        <p style={{ fontSize: 12, color: C.muted, margin: "0 0 12px", flexGrow: 1 }}>{p.desc}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 8,
          }}
        >
          <span style={{ fontWeight: 600, color: C.primary, fontSize: 14 }}>{jod(p.price)}</span>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: added ? C.primary : C.secondary,
              color: added ? C.bg : C.muted,
            }}
          >
            <Icon name="plus" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CartLine({ it }: { it: CartItemT }) {
  const gross = it.price * it.qty;
  const stepBtn: CSSProperties = {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: C.muted,
  };
  return (
    <div style={{ background: C.surface, borderRadius: 8, border: "1px solid rgba(39,39,42,0.6)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 10px" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "baseline", gap: 6 }}>
          <h4
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: C.text,
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {it.name}
          </h4>
          {it.variant && (
            <span style={{ fontSize: 11, color: "rgba(212,175,55,0.8)", fontWeight: 500 }}>{it.variant}</span>
          )}
        </div>
        <span
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: C.primary,
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {jod(gross)}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: C.bg,
            borderRadius: 999,
            border: `1px solid ${C.secondary}`,
          }}
        >
          <div style={stepBtn}>
            <Icon name="minus" size={16} />
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              width: 24,
              textAlign: "center",
              color: C.text,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {it.qty}
          </span>
          <div style={stepBtn}>
            <Icon name="plus" size={16} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={stepBtn}>
            <Icon name="pencil" size={15} />
          </div>
          <div style={stepBtn}>
            <Icon name="tag" size={15} />
          </div>
          <div style={stepBtn}>
            <Icon name="trash-2" size={16} />
          </div>
        </div>
      </div>
      {it.mods && (
        <ul style={{ padding: "0 12px 6px", margin: 0, listStyle: "none" }}>
          {it.mods.map((m) => (
            <li key={m} style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ color: "rgba(212,175,55,0.6)" }}>•</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PayBtn({ label, icon, color, active }: { label: string; icon: string; color: string; active?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "12px 0",
        borderRadius: 12,
        border: `1px solid ${active ? color : C.secondary}`,
        background: active ? `${color}1a` : "transparent",
        color,
        fontWeight: 600,
        transform: active ? "scale(1.05)" : "none",
      }}
    >
      <Icon name={icon} size={18} />
      <span style={{ fontSize: 12 }}>{label}</span>
    </div>
  );
}

function CashierScreenBase({
  addedIndex = -1,
  cartCount = 3,
  payActive = null,
  orderType = "صالة",
}: {
  addedIndex?: number;
  cartCount?: number;
  payActive?: "cash" | "card" | "wallet" | null;
  orderType?: string;
}) {
  const items = CART.slice(0, cartCount);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const service = subtotal * 0.1;
  const total = subtotal + service;
  const ghostBtn: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    border: `1px solid ${C.secondary}`,
    color: C.muted,
  };
  return (
    <div
      dir="rtl"
      style={{
        width: 1920,
        height: 1080,
        background: C.bg,
        color: C.text,
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <AppHeader />
      <main style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* القائمة */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: C.bg }}>
          <div style={{ padding: "24px 24px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, lineHeight: 1.2 }}>القائمة</h2>
                <p style={{ fontSize: 12, color: C.muted, margin: "2px 0 0" }}>12 صنف معروض</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={ghostBtn}>
                  <Icon name="zap" size={16} />
                  <span>بند سريع</span>
                </div>
                <div style={ghostBtn}>
                  <Icon name="maximize-2" size={16} />
                  <span>كاشير</span>
                </div>
                <div style={{ position: "relative", width: 208 }}>
                  <div
                    style={{
                      position: "absolute",
                      insetInlineStart: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: C.muted,
                    }}
                  >
                    <Icon name="search" size={16} />
                  </div>
                  <div
                    style={{
                      background: C.surface,
                      border: `1px solid ${C.secondary}`,
                      borderRadius: 8,
                      padding: "9px 36px",
                      fontSize: 14,
                      color: "rgba(161,161,170,0.6)",
                    }}
                  >
                    بحث… (Ctrl+F)
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 8 }}>
              {CATS.map((c, i) => (
                <div
                  key={c}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    background: i === 0 ? C.primary : C.surface,
                    color: i === 0 ? C.bg : C.muted,
                    border: i === 0 ? "none" : `1px solid ${C.secondary}`,
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: "rgba(39,39,42,0.5)", marginTop: 16 }} />
          </div>
          <div style={{ flex: 1, padding: "20px 24px 24px", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {PRODUCTS.map((p, i) => (
                <ProductTile key={p.name} p={p} added={i === addedIndex} />
              ))}
            </div>
          </div>
        </div>
        {/* الفاصل */}
        <div style={{ width: 6, flexShrink: 0, background: C.secondary }} />
        {/* السلة */}
        <div
          style={{
            width: "30%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            background: C.bg,
            borderInlineStart: `1px solid ${C.secondary}`,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${C.secondary}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: C.surface,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="shopping-bag" size={19} color={C.primary} />
              <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: C.primary }}>الطلب الحالي</h2>
              {items.length > 0 && (
                <span
                  style={{
                    background: C.primary,
                    color: C.bg,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 999,
                  }}
                >
                  {items.reduce((s, i) => s + i.qty, 0)}
                </span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: C.muted, fontSize: 12 }}>
              <Icon name="trash-2" size={13} />
              <span>تفريغ</span>
            </div>
          </div>
          <div
            style={{
              padding: "12px 20px",
              borderBottom: `1px solid ${C.secondary}`,
              background: "rgba(24,24,27,0.6)",
            }}
          >
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>نوع الطلب</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
              {(
                [
                  ["صالة", "utensils"],
                  ["سفري", "shopping-bag"],
                  ["توصيل", "bike"],
                ] as const
              ).map(([l, ic]) => {
                const on = l === orderType;
                return (
                  <div
                    key={l}
                    style={{
                      height: 44,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      background: on ? C.primary : C.bg,
                      color: on ? C.bg : C.muted,
                      border: `1px solid ${on ? C.primary : C.secondary}`,
                      boxShadow: on ? "0 0 12px rgba(212,175,55,0.35)" : "none",
                    }}
                  >
                    <Icon name={ic} size={16} />
                    <span>{l}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
            {items.map((it) => (
              <CartLine key={it.name} it={it} />
            ))}
          </div>
          <div
            style={{
              padding: 16,
              borderTop: `1px solid ${C.secondary}`,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 8,
                  border: `1px solid ${C.secondary}`,
                  color: C.muted,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                <Icon name="tag" size={13} />
                <span>خصم</span>
              </div>
              <div
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 8,
                  border: "1px solid rgba(245,158,11,0.5)",
                  background: "rgba(245,158,11,0.1)",
                  color: C.amber,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                <Icon name="concierge-bell" size={13} />
                <span>بدل خدمة</span>
                <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>+{jod(service)}</span>
              </div>
            </div>
            <div
              style={{
                background: C.surface,
                borderRadius: 12,
                border: `1px solid ${C.secondary}`,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: C.muted }}>
                <span>المجموع الفرعي</span>
                <span>{jod(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: C.amber }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="concierge-bell" size={12} /> بدل خدمة (10%)
                </span>
                <span>+{jod(service)}</span>
              </div>
              <div style={{ height: 1, background: C.secondary }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, color: C.text }}>الإجمالي</span>
                <span
                  style={{ fontSize: 24, fontWeight: 700, color: C.primary, fontVariantNumeric: "tabular-nums" }}
                >
                  {jod(total)}
                </span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              <PayBtn label="نقداً" icon="banknote" color={C.green} active={payActive === "cash"} />
              <PayBtn label="بطاقة" icon="credit-card" color={C.blue} active={payActive === "card"} />
              <PayBtn label="محفظة" icon="wallet" color={C.purple} active={payActive === "wallet"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
              <div
                style={{
                  padding: "10px 0",
                  borderRadius: 12,
                  border: `1px solid ${C.secondary}`,
                  color: C.muted,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                <Icon name="split-square-horizontal" size={16} />
                <span>دفع مختلط</span>
              </div>
              <div
                style={{
                  padding: "10px 0",
                  borderRadius: 12,
                  border: `1px solid ${C.secondary}`,
                  color: C.amber,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                <Icon name="book-user" size={16} />
                <span>آجل</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── خريطة الطاولات (TablesView.tsx / WaiterTables.tsx: ثلاث حالات) ── */
type TableT = {
  name: string;
  zone: string;
  cap: number;
  state: "busy" | "free" | "billed";
  total?: number;
  items?: number;
  guests?: number;
  waiter?: string;
};
const TABLES: TableT[] = [
  { name: "طاولة 1", zone: "صالة داخلية", cap: 4, state: "busy", total: 18.75, items: 6, guests: 3, waiter: "أحمد" },
  { name: "طاولة 2", zone: "صالة داخلية", cap: 2, state: "free" },
  { name: "طاولة 3", zone: "صالة داخلية", cap: 6, state: "billed", total: 42.5 },
  { name: "طاولة 4", zone: "صالة داخلية", cap: 4, state: "free" },
  { name: "طاولة 5", zone: "صالة داخلية", cap: 2, state: "busy", total: 7.25, items: 3, guests: 2, waiter: "سامر" },
  { name: "تراس 1", zone: "التراس", cap: 6, state: "free" },
  { name: "تراس 2", zone: "التراس", cap: 4, state: "busy", total: 25.0, items: 8, guests: 4, waiter: "أحمد" },
  { name: "تراس 3", zone: "التراس", cap: 4, state: "free" },
  { name: "تراس 4", zone: "التراس", cap: 2, state: "free" },
  { name: "VIP 1", zone: "VIP", cap: 8, state: "busy", total: 61.5, items: 14, guests: 7, waiter: "ليث" },
];

export function TableCard({ t, size = "lg", highlight = false }: { t: TableT; size?: "lg" | "sm"; highlight?: boolean }) {
  const busy = t.state === "busy";
  const billed = t.state === "billed";
  const bg = billed ? "rgba(100,116,139,0.15)" : busy ? "rgba(245,158,11,0.10)" : C.surface;
  const border = billed ? "rgba(148,163,184,0.5)" : busy ? "rgba(245,158,11,0.5)" : "rgba(39,39,42,0.5)";
  const fg = billed ? C.slate : busy ? C.amber3 : C.text;
  return (
    <div
      style={{
        aspectRatio: "1/1",
        borderRadius: 16,
        border: `1px solid ${highlight ? C.primary : border}`,
        background: bg,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        color: fg,
        boxShadow: highlight ? "0 0 30px rgba(212,175,55,0.35)" : "none",
      }}
    >
      <Icon
        name={billed ? "receipt" : busy ? "utensils" : "armchair"}
        size={size === "lg" ? 26 : 22}
        color={billed ? C.slate : busy ? C.amber : C.muted}
      />
      <span style={{ fontWeight: 600, fontSize: size === "lg" ? 18 : 16 }}>{t.name}</span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 11,
          color: "rgba(161,161,170,0.7)",
          marginTop: -4,
        }}
      >
        {t.zone ? `${t.zone} · ` : ""}
        <Icon name="users" size={10} /> {t.cap}
      </span>
      {busy && (
        <span style={{ fontSize: 12, textAlign: "center", lineHeight: 1.35 }}>
          {jod(t.total ?? 0)}
          <br />
          {t.items} أصناف
          <br />
          <span style={{ color: "rgba(161,161,170,0.7)" }}>{t.waiter}</span>
        </span>
      )}
      {billed && (
        <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontSize: 12 }}>
          {jod(t.total ?? 0)}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              fontWeight: 600,
              color: C.slate,
              background: "rgba(100,116,139,0.2)",
              border: "1px solid rgba(148,163,184,0.3)",
              borderRadius: 999,
              padding: "2px 8px",
            }}
          >
            <Icon name="receipt" size={11} /> طُبعت الفاتورة
          </span>
        </span>
      )}
      {!busy && !billed && <span style={{ fontSize: 12, color: "rgba(74,222,128,0.9)", fontWeight: 500 }}>فارغة</span>}
    </div>
  );
}

function TablesScreenBase({ highlight = -1 }: { highlight?: number }) {
  const zones: [string, number, number][] = [
    ["الكل", 4, 10],
    ["صالة داخلية", 3, 5],
    ["التراس", 1, 4],
    ["VIP", 1, 1],
  ];
  return (
    <div
      dir="rtl"
      style={{
        width: 1920,
        height: 1080,
        background: C.bg,
        color: C.text,
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <AppHeader />
      <div style={{ padding: "28px 40px 0" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, margin: 0 }}>الطاولات</h2>
        <p style={{ color: C.muted, fontSize: 14, margin: "6px 0 0" }}>
          اضغط طاولة فارغة لبدء طلب · الطاولات المشغولة تُفتح لإضافة جلسة
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          {zones.map(([z, busy, all], i) => (
            <div
              key={z}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                background: i === 0 ? C.primary : C.surface,
                color: i === 0 ? C.bg : C.muted,
                border: i === 0 ? "none" : `1px solid ${C.secondary}`,
              }}
            >
              {z}{" "}
              <span style={{ fontSize: 12, opacity: 0.7 }}>
                ({busy}/{all})
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: "28px 40px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
          {TABLES.map((t, i) => (
            <TableCard key={t.name} t={t} highlight={i === highlight} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── تابلت الويتر (WaiterTables.tsx) ── */
function WaiterScreenBase({ highlight = -1 }: { highlight?: number }) {
  return (
    <div
      dir="rtl"
      style={{
        width: 1180,
        height: 820,
        background: C.bg,
        color: C.text,
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(39,39,42,0.5)",
          background: "rgba(24,24,27,0.6)",
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: 18 }}>مقهى كايروس</div>
          <div style={{ color: C.muted, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
            الويتر: أحمد <span style={{ color: "rgba(161,161,170,0.6)", fontSize: 12 }}>· تم التحديث قبل 3 ثوانٍ</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              padding: "12px 12px",
              borderRadius: 8,
              border: `1px solid ${C.primary}`,
              background: "rgba(212,175,55,0.1)",
              color: C.primary,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            طاولاتي
          </div>
          <div
            style={{
              padding: 12,
              borderRadius: 8,
              background: C.surface,
              border: "1px solid rgba(39,39,42,0.5)",
              color: C.muted,
            }}
          >
            <Icon name="refresh-cw" size={18} />
          </div>
          <div
            style={{
              padding: 12,
              borderRadius: 8,
              background: C.surface,
              border: "1px solid rgba(39,39,42,0.5)",
              color: C.muted,
            }}
          >
            <Icon name="log-out" size={18} />
          </div>
        </div>
      </header>
      <div style={{ flex: 1, padding: 20 }}>
        <h3 style={{ color: C.muted, fontSize: 14, fontWeight: 500, margin: "0 0 12px" }}>صالة داخلية</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {TABLES.slice(0, 8).map((t, i) => (
            <TableCard key={t.name} t={t} size="sm" highlight={i === highlight} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── الشريط الجانبي للإدارة (AdminLayout.tsx) ── */
function AdminSidebar() {
  const items: [string, string][] = [["نظرة عامة", "layout-dashboard"]];
  const groups: [string, string][] = [
    ["الكتالوج والمنتجات", "package"],
    ["المخزون", "file-text"],
    ["التحليلات", "gauge"],
    ["المشتريات والموردون", "shopping-cart"],
    ["الصالة والمطعم", "armchair"],
    ["التقارير والعملاء", "clipboard-list"],
    ["الإعدادات والنظام", "sliders-horizontal"],
  ];
  return (
    <aside
      style={{
        width: 256,
        background: "rgba(24,24,27,0.8)",
        borderInlineEnd: "1px solid rgba(39,39,42,0.5)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div style={{ padding: 24, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: C.bg,
              fontSize: 20,
              boxShadow: "0 0 15px rgba(212,175,55,0.4)",
            }}
          >
            K
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
            Kairos <span style={{ fontWeight: 300, color: C.muted }}>الإدارة</span>
          </h1>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {items.map(([n, ic]) => (
            <div
              key={n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 8,
                background: "rgba(212,175,55,0.1)",
                color: C.primary,
                border: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <Icon name={ic} size={20} />
              <span style={{ fontWeight: 500 }}>{n}</span>
            </div>
          ))}
          {groups.map(([n, ic]) => (
            <div
              key={n}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                padding: "10px 16px",
                borderRadius: 8,
                color: C.muted,
                marginTop: 8,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Icon name={ic} size={18} />
                <span style={{ fontWeight: 600, fontSize: 14 }}>{n}</span>
              </span>
              <span style={{ transform: "rotate(90deg)" }}>
                <Icon name="chevron-down" size={16} />
              </span>
            </div>
          ))}
        </nav>
      </div>
      <div
        style={{
          padding: 24,
          borderTop: "1px solid rgba(39,39,42,0.5)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", color: C.muted }}>
          <Icon name="log-out" size={20} />
          <span style={{ fontWeight: 500 }}>إغلاق الإدارة</span>
        </div>
      </div>
    </aside>
  );
}

/* ── لوحة التحكّم (Dashboard.tsx) ── */
function StatCard({
  title,
  value,
  icon,
  sub,
  accent = C.text,
}: {
  title: string;
  value: ReactNode;
  icon: string;
  sub: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        background: "rgba(24,24,27,0.6)",
        border: `1px solid ${C.secondary}`,
        padding: 24,
        borderRadius: 16,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.4)",
      }}
    >
      <div style={{ position: "absolute", top: 0, insetInlineEnd: 0, padding: 16, opacity: 0.07, color: C.text }}>
        <Icon name={icon} size={60} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: C.muted, margin: 0 }}>{title}</h3>
        <Icon name={icon} size={16} color={C.primary} />
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, color: accent, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <p style={{ fontSize: 12, color: "rgba(161,161,170,0.7)", margin: "8px 0 0" }}>{sub}</p>
    </div>
  );
}

const TREND = [
  { d: "السبت", rev: 210, exp: 90 },
  { d: "الأحد", rev: 260, exp: 110 },
  { d: "الاثنين", rev: 190, exp: 80 },
  { d: "الثلاثاء", rev: 320, exp: 120 },
  { d: "الأربعاء", rev: 380, exp: 140 },
  { d: "الخميس", rev: 470, exp: 160 },
  { d: "الجمعة", rev: 540, exp: 180 },
];
const TOP = [
  { n: "كابتشينو", c: 148 },
  { n: "كنافة نابلسية", c: 121 },
  { n: "آيس لاتيه", c: 96 },
  { n: "قهوة عربية", c: 88 },
  { n: "عصير برتقال", c: 64 },
  { n: "تشيز كيك", c: 51 },
];

function TrendChart({ progress = 1, w = 880, h = 256 }: { progress?: number; w?: number; h?: number }) {
  const max = 600;
  const pad = 24;
  const pts = (key: "rev" | "exp") =>
    TREND.map((p, i) => [
      pad + (i / (TREND.length - 1)) * (w - pad * 2),
      h - pad - (p[key] / max) * (h - pad * 2),
    ]);
  const path = (key: "rev" | "exp") =>
    pts(key)
      .map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
      .join(" ");
  const len = w * 1.4;
  const line = (key: "rev" | "exp", color: string) => (
    <g key={key}>
      <path
        d={path(key)}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - progress)}
      />
      {pts(key).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={color} opacity={progress > (i + 0.5) / TREND.length ? 1 : 0} />
      ))}
    </g>
  );
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={pad}
          x2={w - pad}
          y1={pad + i * ((h - pad * 2) / 3)}
          y2={pad + i * ((h - pad * 2) / 3)}
          stroke={C.secondary}
          strokeDasharray="3 3"
        />
      ))}
      {line("exp", "#fb7185")}
      {line("rev", C.primary)}
      {TREND.map((p, i) => (
        <text
          key={p.d}
          x={pad + (i / (TREND.length - 1)) * (w - pad * 2)}
          y={h - 2}
          fill={C.muted}
          fontSize="11"
          textAnchor="middle"
          fontFamily={FONT}
        >
          {p.d}
        </text>
      ))}
    </svg>
  );
}

function DashboardScreenBase({ count = 1, chart = 1 }: { count?: number; chart?: number }) {
  const f = (n: number) => `${(n * count).toFixed(2)} د.أ`;
  return (
    <div
      dir="rtl"
      style={{
        width: 1920,
        height: 1080,
        background: C.bg,
        color: C.text,
        fontFamily: FONT,
        display: "flex",
        overflow: "hidden",
      }}
    >
      <AdminSidebar />
      <main style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            insetInlineEnd: 0,
            width: 384,
            height: 384,
            background: "rgba(212,175,55,0.05)",
            borderRadius: 999,
            filter: "blur(100px)",
          }}
        />
        <div style={{ padding: 32, position: "relative", display: "flex", flexDirection: "column", gap: 28 }}>
          <header style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h2 style={{ fontSize: 30, fontWeight: 700, margin: 0 }}>نظرة عامة</h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.3)",
                    color: C.green,
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: 999, background: C.green }} /> طلب جديد!
                </div>
              </div>
              <p style={{ color: C.muted, margin: "4px 0 0", fontSize: 14 }}>
                الأداء بنظرة واحدة · يُحدَّث تلقائياً كل 30 ثانية
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(24,24,27,0.5)",
                padding: 8,
                borderRadius: 12,
                border: `1px solid ${C.secondary}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  padding: 4,
                  background: "rgba(10,10,12,0.5)",
                  borderRadius: 8,
                  border: "1px solid rgba(39,39,42,0.5)",
                }}
              >
                {["اليوم", "هذا الأسبوع", "هذا الشهر", "مخصص"].map((p, i) => (
                  <div
                    key={p}
                    style={{
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      borderRadius: 6,
                      background: i === 1 ? C.primary : "transparent",
                      color: i === 1 ? C.bg : C.muted,
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
              <div style={{ color: C.muted }}>
                <Icon name="refresh-cw" size={15} />
              </div>
            </div>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            <StatCard title="إجمالي المبيعات" value={f(2370.5)} icon="coins" sub="كل المبيعات غير الملغاة" accent={C.primary} />
            <StatCard title="النقد المُحصّل" value={f(1685.25)} icon="banknote" sub="المبالغ المُستلمة فعلياً" accent={C.green} />
            <StatCard title="الذمم المدينة" value={f(310.75)} icon="hourglass" sub="بانتظار التحصيل · اعرض التفصيل" accent={C.amber3} />
            <StatCard title="صافي الربح" value={f(1204.0)} icon="trending-up" sub="المبيعات − المصاريف" accent={C.green} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
            <div style={{ background: "rgba(24,24,27,0.4)", border: `1px solid ${C.secondary}`, padding: 24, borderRadius: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 24px" }}>اتجاه المبيعات</h3>
              <TrendChart progress={chart} />
            </div>
            <div style={{ background: "rgba(24,24,27,0.4)", border: `1px solid ${C.secondary}`, padding: 24, borderRadius: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <Icon name="trophy" size={16} color={C.primary} />
                <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>أفضل المنتجات</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {TOP.map((p, i) => (
                  <div key={p.n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, width: 16, textAlign: "end" }}>
                      #{i + 1}
                    </span>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: C.secondary }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{p.n}</div>
                      <div style={{ width: "100%", background: C.secondary, borderRadius: 999, height: 6, marginTop: 4 }}>
                        <div
                          style={{
                            width: `${Math.round((p.c / TOP[0].c) * 100 * Math.min(1, chart * 1.2))}%`,
                            background: C.primary,
                            height: 6,
                            borderRadius: 999,
                          }}
                        />
                      </div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>{Math.round(p.c * count)}×</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── المخزون المنخفض (LowStockDashboard.tsx) ── */
const LOW = [
  { n: "حبوب قهوة عربية", stock: 2, th: 10, low: true },
  { n: "حليب طازج 1ل", stock: 4, th: 12, low: true },
  { n: "جبنة نابلسية", stock: 5, th: 8, low: true },
  { n: "شراب فانيلا", stock: 7, th: 6, low: false },
  { n: "أكواب ورقية 12oz", stock: 220, th: 150, low: false },
];

function LowStockScreenBase({ pulse = 0 }: { pulse?: number }) {
  return (
    <div
      dir="rtl"
      style={{
        width: 1920,
        height: 1080,
        background: C.bg,
        color: C.text,
        fontFamily: FONT,
        display: "flex",
        overflow: "hidden",
      }}
    >
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: 30, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 12 }}>
                <Icon name="alert-triangle" size={28} color={C.amber3} /> مخزون منخفض
              </h2>
              <p style={{ color: C.muted, margin: "8px 0 0" }}>3 أصناف عند حد التنبيه أو أقل.</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(39,39,42,0.4)",
                border: `1px solid ${C.secondary}`,
                padding: "10px 16px",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 500,
                color: C.text,
              }}
            >
              <Icon name="file-spreadsheet" size={16} /> إعادة تخزين بالجملة
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                border: "1px solid rgba(212,175,55,0.6)",
                background: "rgba(212,175,55,0.1)",
                color: C.primary,
              }}
            >
              عرض المنخفض فقط
            </div>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                border: `1px solid ${C.secondary}`,
                color: C.muted,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon name="arrow-up-down" size={14} /> ترتيب حسب المخزون
            </div>
          </div>
          <div
            style={{
              background: "rgba(24,24,27,0.5)",
              border: `1px solid ${C.secondary}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    background: "rgba(24,24,27,0.8)",
                    borderBottom: `1px solid ${C.secondary}`,
                    color: C.muted,
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  <th style={{ padding: "16px 24px", textAlign: "start" }}>المنتج</th>
                  <th style={{ padding: 16, textAlign: "end" }}>المخزون</th>
                  <th style={{ padding: 16, textAlign: "end" }}>حد التنبيه</th>
                  <th style={{ padding: 16, textAlign: "center" }}>الحالة</th>
                  <th style={{ padding: "16px 24px", textAlign: "center" }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {LOW.map((r, i) => (
                  <tr
                    key={r.n}
                    style={{
                      borderTop: "1px solid rgba(39,39,42,0.5)",
                      background: r.low ? `rgba(239,68,68,${0.05 + (i === 0 ? pulse * 0.08 : 0)})` : "transparent",
                    }}
                  >
                    <td style={{ padding: "16px 24px", fontWeight: 600 }}>{r.n}</td>
                    <td style={{ padding: 16, textAlign: "end", fontWeight: 700, color: r.low ? C.red : C.primary }}>
                      {r.stock}
                    </td>
                    <td style={{ padding: 16, textAlign: "end", color: "rgba(244,244,245,0.8)" }}>{r.th}</td>
                    <td style={{ padding: 16, textAlign: "center" }}>
                      {r.low ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#fca5a5",
                            background: "rgba(239,68,68,0.1)",
                            border: "1px solid rgba(239,68,68,0.3)",
                            padding: "2px 8px",
                            borderRadius: 999,
                          }}
                        >
                          <Icon name="alert-triangle" size={11} /> منخفض
                        </span>
                      ) : (
                        <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(52,211,153,0.8)" }}>سليم</span>
                      )}
                    </td>
                    <td style={{ padding: "16px 24px", textAlign: "center" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 14,
                          color: C.primary,
                          fontWeight: 500,
                        }}
                      >
                        <Icon name="package-plus" size={15} /> إعادة التخزين
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

/* الفيلم يُعاد رسمه كل إطار (60 مرة/ث). الشاشات نفسها لا تتغيّر في معظم تلك
   الإطارات — ما يتغيّر هو تحويل البطاقة الحاملة لها. بدون memo يُعاد بناء
   شجرة الشاشة كاملة (مئات العقد) ستين مرة في الثانية بلا سبب.
   يقابل هذا في PromoFilm تكميمُ الوسائط المستمرة (نبضة/عدّاد/رسم) إلى درجات
   خشنة، وإلا لتغيّرت قيمتها كل إطار وأبطلت المقارنة. */
export const CashierScreen = memo(CashierScreenBase);
export const TablesScreen = memo(TablesScreenBase);
export const WaiterScreen = memo(WaiterScreenBase);
export const DashboardScreen = memo(DashboardScreenBase);
export const LowStockScreen = memo(LowStockScreenBase);
