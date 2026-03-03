import { cn } from "@/lib/utils";
import type { RuleCategory, RuleCategoryKey } from "@/lib/types";

interface RulesCategoryRailProps {
  categories: RuleCategory[];
  activeCategory: RuleCategoryKey;
  onChange: (category: RuleCategoryKey) => void;
}

export function RulesCategoryRail({ categories, activeCategory, onChange }: RulesCategoryRailProps) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      {categories.map((category) => {
        const isActive = category.key === activeCategory;
        const label = category.title.replace(/^\d+\.\d+\s*/, "");

        return (
          <button
            key={category.key}
            type="button"
            onClick={() => onChange(category.key)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "w-full rounded-2xl border px-3 py-2.5 text-left transition",
              isActive
                ? "border-black bg-black text-[#c8ee03] shadow-[0_10px_20px_rgba(2,2,2,0.22)]"
                : "border-black/15 bg-white/90 text-black/78 hover:border-black/30 hover:bg-white",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                {category.sectionRef}
              </span>
              <span className="rounded-full border border-current/25 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]">
                {category.rules.length}
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold leading-5 normal-case">{label}</p>
          </button>
        );
      })}
    </div>
  );
}
