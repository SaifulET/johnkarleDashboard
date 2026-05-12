type BillingSummaryRowProps = {
  label: string;
  value: string;
  danger?: boolean;
};

export function BillingSummaryRow({
  label,
  value,
  danger = false,
}: BillingSummaryRowProps) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-5">
      <p className="text-[13px] font-semibold leading-5 text-[#737B74]">
        {label}
      </p>
      <p
        className={`text-right text-[13px] font-bold leading-5 ${
          danger ? "text-[#D54E4E]" : "text-[#28334A]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
