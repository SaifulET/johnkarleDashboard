import type { ReactNode } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

type PlanFormSectionProps = {
  title: string;
  icon: IconSvgElement;
  badge?: string;
  children: ReactNode;
};

export function PlanFormSection({
  title,
  icon,
  badge,
  children,
}: PlanFormSectionProps) {
  return (
    <section className="rounded-lg border border-[#E6E6E0] bg-white p-5 shadow-[0_12px_30px_rgba(31,47,40,0.06)] sm:p-7">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7EEE9] text-[#46624E]">
            <HugeiconsIcon icon={icon} size={18} strokeWidth={1.8} />
          </span>
          <h2 className="text-[15px] font-bold text-[#334155]">{title}</h2>
        </div>
        {badge ? (
          <span className="rounded-full bg-[#DCEFE3] px-3 py-1 text-[10px] font-bold text-[#46624E]">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

type PlanTextFieldProps = {
  label: string;
  value: string;
  readOnly: boolean;
  onChange: (value: string) => void;
  hint?: string;
  suffix?: string;
  className?: string;
};

export function PlanTextField({
  label,
  value,
  readOnly,
  onChange,
  hint,
  suffix,
  className = "",
}: PlanTextFieldProps) {
  return (
    <label className={className}>
      <span className="text-[12px] font-semibold text-[#5E685F]">{label}</span>
      <span className="relative mt-2 block">
        <input
          readOnly={readOnly}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`h-12 w-full rounded-lg border px-4 text-[13px] font-semibold text-[#334155] outline-none transition ${
            readOnly
              ? "border-[#DCE1DA] bg-[#F6F8F5]"
              : "border-[#C9D0C7] bg-[#F1F4FF] focus:border-[#46624E] focus:bg-white"
          } ${suffix ? "pr-14" : ""}`}
        />
        {suffix ? (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#6F7670]">
            {suffix}
          </span>
        ) : null}
      </span>
      {hint ? (
        <span className="mt-1 block text-[10px] font-semibold text-[#8A928B]">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

type PlanSelectFieldProps = {
  label: string;
  value: string;
  readOnly: boolean;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
};

export function PlanSelectField({
  label,
  value,
  readOnly,
  onChange,
  options,
  className = "",
}: PlanSelectFieldProps) {
  return (
    <label className={className}>
      <span className="text-[12px] font-semibold text-[#5E685F]">{label}</span>
      <select
        disabled={readOnly}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`mt-2 h-12 w-full rounded-lg border px-4 text-[13px] font-semibold text-[#334155] outline-none transition disabled:opacity-100 ${
          readOnly
            ? "border-[#DCE1DA] bg-[#F6F8F5]"
            : "border-[#C9D0C7] bg-[#F1F4FF] focus:border-[#46624E] focus:bg-white"
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function PlanHealthMini({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-[#F7F8FD] p-4">
      <p className="text-[9px] font-bold uppercase text-[#8A928B]">{label}</p>
      <p className="mt-2 text-[17px] font-bold text-[#46624E]">{value}</p>
    </div>
  );
}
