import type { MetadataRoute } from "next";

const BASE = "https://www.kairos-pos.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    // صفحة التحميل تتغيّر مع كل نشرة إصدار، فتُفحص يومياً.
    { url: `${BASE}/download`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/signup`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // نقطة الدخول الإنجليزية — المحتوى الإنجليزي الوحيد على الموقع، وهو ما يجعل
    // الظهور في البحث الإنجليزي ممكناً أصلاً (جوجل تحدّد اللغة من النصّ لا الوسوم).
    { url: `${BASE}/en`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // صفحات محتوى تستهدف البحث العضوي (عنقود موضوعي).
    { url: `${BASE}/jofotara`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/foodics-alternative`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/sales-channels`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/docs`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
