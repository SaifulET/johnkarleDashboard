"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const reportRows = [
  ["01", "Robert Fox", "Unprofessional behavior", "Robert Fox", "02-24-2025"],
  ["01", "Robert Fox", "Spam", "Robert Fox", "02-24-2025"],
  ["01", "Robert Fox", "Unprofessional behavior", "Robert Fox", "02-24-2025"],
  ["01", "Robert Fox", "Other", "Robert Fox", "02-24-2025"],
  ["01", "Robert Fox", "Other", "Robert Fox", "02-24-2025"],
  ["01", "Robert Fox", "Spam", "Robert Fox", "02-24-2025"],
  ["01", "Robert Fox", "Other", "Robert Fox", "02-24-2025"],
  ["01", "Robert Fox", "Other", "Robert Fox", "02-24-2025"],
  ["01", "Robert Fox", "Other", "Robert Fox", "02-24-2025"],
  ["01", "Robert Fox", "Unprofessional behavior", "Robert Fox", "02-24-2025"],
  ["01", "Robert Fox", "Unprofessional behavior", "Robert Fox", "02-24-2025"],
  ["01", "Robert Fox", "Unprofessional behavior", "Robert Fox", "02-24-2025"],
];

export function ReportsContent() {
  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-lg border border-[#E2E6DF] bg-white shadow-[0_12px_30px_rgba(31,47,40,0.08)]">
        <header className="bg-[#66785F] px-5 py-5 sm:px-7">
          <h1 className="text-[30px] font-bold leading-tight text-white sm:text-[34px]">
            Reports
          </h1>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[12%]" />
              <col className="w-[25%]" />
              <col className="w-[29%]" />
              <col className="w-[24%]" />
              <col className="w-[10%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-[#AEB6AE] text-[13px] font-bold text-[#879083]">
                <th className="px-6 py-5">S.ID</th>
                <th className="px-6 py-5">Report From</th>
                <th className="px-6 py-5 text-left">Report Reason</th>
                <th className="px-6 py-5">Report TO</th>
                <th className="px-6 py-5 text-right">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {reportRows.map(([id, from, reason, to, date], index) => (
                <tr
                  key={`${id}-${reason}-${index}`}
                  className="border-b border-[#ECEFEC] text-[13px] font-semibold text-[#334155]"
                >
                  <td className="px-6 py-4">{id}</td>
                  <td className="px-6 py-4">
                    <ReportUser name={from} seed={index} />
                  </td>
                  <td className="px-6 py-4 text-left text-[#526052]">
                    {reason}
                  </td>
                  <td className="px-6 py-4">
                    <ReportUser name={to} seed={index + 3} />
                  </td>
                  <td className="px-6 py-4 text-right">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-col gap-4 px-5 py-7 text-[#7B8778] sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="text-[15px] font-semibold uppercase">
            Showing 1-8 of 250
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous reports page"
              className="flex h-8 w-8 items-center justify-center rounded text-[#7B827B] transition hover:bg-[#F2F4EE]"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={1.8} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                className={`h-8 min-w-8 rounded px-3 text-[13px] font-bold transition ${
                  page === 1
                    ? "bg-[#66785F] text-white"
                    : "text-[#8B918B] hover:bg-[#F2F4EE]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              aria-label="Next reports page"
              className="flex h-8 w-8 items-center justify-center rounded text-[#7B827B] transition hover:bg-[#F2F4EE]"
            >
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={18}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}

function ReportUser({ name, seed }: { name: string; seed: number }) {
  const colors = [
    "from-[#8AC0D6] to-[#E8B090]",
    "from-[#A4C7A5] to-[#F0C28B]",
    "from-[#9CA8D5] to-[#BEE0D2]",
  ];

  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${colors[seed % colors.length]} text-[10px] font-bold text-white ring-2 ring-white`}
      >
        RF
      </span>
      <span>{name}</span>
    </span>
  );
}
