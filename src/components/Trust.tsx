import { CoffeeIcon, NavigationIcon, ShoppingBagIcon, BookIcon } from "@/components/Icons";

export default function Trust() {
  return (
    <div className="py-[18px] pb-1.5">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1 flex items-center justify-center gap-x-12 gap-y-3.5 flex-wrap opacity-82 reveal">
        <span className="text-[13px] text-muted">موثوق لإدارة:</span>
        <span className="flex items-center gap-2 font-bold text-[15px] text-[#d4d4d8]">
          <CoffeeIcon className="w-[18px] h-[18px] text-primary" /> المقاهي
        </span>
        <span className="flex items-center gap-2 font-bold text-[15px] text-[#d4d4d8]">
          <NavigationIcon className="w-[18px] h-[18px] text-primary" /> المطاعم
        </span>
        <span className="flex items-center gap-2 font-bold text-[15px] text-[#d4d4d8]">
          <ShoppingBagIcon className="w-[18px] h-[18px] text-primary" /> المتاجر
        </span>
        <span className="flex items-center gap-2 font-bold text-[15px] text-[#d4d4d8]">
          <BookIcon className="w-[18px] h-[18px] text-primary" /> مساحات العمل
        </span>
      </div>
    </div>
  );
}
