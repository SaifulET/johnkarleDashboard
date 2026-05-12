"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Alert01Icon,
  Edit02Icon,
  EyeIcon,
  Invoice01Icon,
} from "@hugeicons/core-free-icons";
import { BillingMetricCard } from "./BillingMetricCard";
import { BillingSummaryRow } from "./BillingSummaryRow";
import { servicePlans } from "./data";
import { ServicePlanEditor } from "./ServicePlanEditor";
import type { PlanEditorMode, ServicePlan } from "./types";

export function SubscriptionBillingContent() {
  const [plans, setPlans] = useState<ServicePlan[]>(servicePlans);
  const [screen, setScreen] = useState<"list" | PlanEditorMode>("list");
  const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);

  function openPlan(mode: "edit" | "view", plan: ServicePlan) {
    setSelectedPlan(plan);
    setScreen(mode);
  }

  function savePlan(plan: ServicePlan) {
    setPlans((currentPlans) => {
      const exists = currentPlans.some((item) => item.id === plan.id);

      if (exists) {
        return currentPlans.map((item) => (item.id === plan.id ? plan : item));
      }

      return [...currentPlans, plan];
    });
    setSelectedPlan(null);
    setScreen("list");
  }

  if (screen !== "list") {
    return (
      <ServicePlanEditor
        mode={screen}
        plan={selectedPlan}
        onCancel={() => {
          setSelectedPlan(null);
          setScreen("list");
        }}
        onEdit={(plan) => {
          setSelectedPlan(plan);
          setScreen("edit");
        }}
        onSave={savePlan}
      />
    );
  }

  return (
    <section className="w-full">
      <div>
        <h1 className="text-[32px] font-bold leading-tight text-[#46624E]">
          Subscription & Billing
        </h1>
        <p className="mt-2 text-[15px] font-medium text-[#626A64]">
          Manage revenue performance, service plans, and enterprise billing
          accounts.
        </p>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        <BillingMetricCard
          badge="+12.4%"
          eyebrow="Monthly Recurring Revenue"
          value="$142,850"
          visual="bars"
        />
        <BillingMetricCard
          badge="+85 new"
          eyebrow="Subscription Growth"
          value="1,248"
          visual="line"
        />
        <BillingMetricCard
          badge="-0.2%"
          eyebrow="Net Churn Rate"
          tone="danger"
          value="1.8%"
          visual="churn"
        />
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-[#E6E6E0] bg-white shadow-[0_12px_30px_rgba(31,47,40,0.06)]">
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <h2 className="text-[18px] font-bold text-[#5B735F]">
            Service Plan Distribution
          </h2>
          <button
            type="button"
            onClick={() => {
              setSelectedPlan(null);
              setScreen("add");
            }}
            className="flex h-11 items-center gap-2 rounded-lg bg-[#46624E] px-5 text-[13px] font-bold text-white transition hover:bg-[#3C5544]"
          >
            <HugeiconsIcon icon={Add01Icon} size={18} strokeWidth={1.8} />
            Add New Plan
          </button>
        </div>

        <div className="overflow-x-auto">
        <table className="min-w-[840px] w-full border-collapse text-left">
          <thead className="bg-[#EEF2FF]">
            <tr className="text-[12px] font-bold uppercase tracking-wide text-[#7B827B]">
              <th className="px-7 py-4">Plan Name</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Storage Limit</th>
              <th className="px-5 py-4">User Count</th>
              <th className="px-5 py-4">Conversion Rate</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr key={plan.id} className="border-t border-[#EFF0EC] bg-white">
                <td className="px-7 py-5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        index === 0
                          ? "bg-[#5C775F]"
                          : index === 1
                            ? "bg-[#7E987F]"
                            : "bg-[#69667E]"
                      }`}
                    />
                    <span className="text-[13px] font-bold text-[#28334A]">
                      {plan.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-5 text-[13px] font-bold text-[#687168]">
                  {plan.price === "Custom" ? "Custom" : `$${plan.price}/mo`}
                </td>
                <td className="px-5 py-5 text-[13px] font-semibold text-[#687168]">
                  {plan.storageLimit === "Unlimited"
                    ? "Unlimited"
                    : `${plan.storageLimit} GB`}
                </td>
                <td className="px-5 py-5 text-[13px] font-semibold text-[#687168]">
                  {plan.userCount}
                </td>
                <td className="px-5 py-5 text-[13px] font-bold text-[#6E8A71]">
                  {plan.conversionRate}
                </td>
                <td className="px-5 py-5">
                  <div className="flex justify-end gap-3 text-[#647064]">
                    <button
                      type="button"
                      aria-label={`View ${plan.name}`}
                      title="View"
                      onClick={() => openPlan("view", plan)}
                      className="flex h-9 w-9 items-center justify-center rounded border border-[#E0E5DE] transition hover:border-[#46624E] hover:bg-[#F2F4EE] hover:text-[#46624E]"
                    >
                      <HugeiconsIcon icon={EyeIcon} size={20} strokeWidth={1.8} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Edit ${plan.name}`}
                      title="Edit"
                      onClick={() => openPlan("edit", plan)}
                      className="flex h-9 w-9 items-center justify-center rounded border border-[#E0E5DE] transition hover:border-[#46624E] hover:bg-[#F2F4EE] hover:text-[#46624E]"
                    >
                      <HugeiconsIcon
                        icon={Edit02Icon}
                        size={20}
                        strokeWidth={1.8}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_410px]">
        <section className="rounded-lg border border-[#E6E6E0] bg-white shadow-[0_12px_30px_rgba(31,47,40,0.06)]">
          <h2 className="border-b border-[#EFF0EC] px-7 py-5 text-[18px] font-bold text-[#5B735F]">
            Recent Billing Activity
          </h2>
          <div>
            {[
              [
                "Eleanor Vance",
                "ST-938210 - sanctuary-core",
                "$29.00",
                "Successful",
              ],
              [
                "Julian Blackwood",
                "ST-884122 - archive-pro",
                "$89.00",
                "Failed",
              ],
              [
                "Sophia Meriam",
                "ST-102934 - sanctuary-core",
                "$29.00",
                "Successful",
              ],
            ].map(([name, detail, amount, status]) => (
              <div
                key={name}
                className="grid grid-cols-1 gap-3 border-b border-[#EFF0EC] px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-5 sm:px-7"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      status === "Failed"
                        ? "bg-[#FFE4E4] text-[#E15555]"
                        : "bg-[#DCEFE3] text-[#46624E]"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={status === "Failed" ? Alert01Icon : Invoice01Icon}
                      size={20}
                      strokeWidth={1.8}
                    />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-[#28334A]">
                      {name}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-[#7B827B]">
                      {detail}
                    </p>
                  </div>
                </div>
                <p className="text-[13px] font-bold text-[#28334A]">{amount}</p>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                    status === "Failed"
                      ? "bg-[#FFE8E8] text-[#D24747]"
                      : "bg-[#DDF0E3] text-[#46624E]"
                  }`}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-[#E6E6E0] bg-white p-7 shadow-[0_12px_30px_rgba(31,47,40,0.06)]">
          <p className="text-[13px] font-bold uppercase tracking-wide text-[#9A9E98]">
            Renewal Monitoring
          </p>
          <div className="mt-6 space-y-5">
            <BillingSummaryRow label="Next Auto-Pay Cycle" value="Oct 24, 2023" />
            <BillingSummaryRow label="Pending Settlements" value="$1,420.00" />
            <BillingSummaryRow
              danger
              label="Dunning Active"
              value="4 Accounts"
            />
          </div>
          <button
            type="button"
            className="mt-7 h-12 w-full rounded-lg border border-[#BFC6BC] bg-white text-[13px] font-bold text-[#334155] transition hover:bg-[#F2F4EE]"
          >
            View Stripe Dashboard
          </button>
        </section>
      </div>
    </section>
  );
}
