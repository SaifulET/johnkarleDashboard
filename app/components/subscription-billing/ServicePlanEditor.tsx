"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
  CheckmarkSquare01Icon,
  DatabaseIcon,
  Invoice01Icon,
} from "@hugeicons/core-free-icons";
import { planFeatureOptions } from "./data";
import {
  PlanFormSection,
  PlanHealthMini,
  PlanSelectField,
  PlanTextField,
} from "./PlanFormFields";
import type { PlanEditorMode, ServicePlan } from "./types";

type ServicePlanEditorProps = {
  mode: PlanEditorMode;
  plan: ServicePlan | null;
  onCancel: () => void;
  onEdit: (plan: ServicePlan) => void;
  onSave: (plan: ServicePlan) => void;
};

export function ServicePlanEditor({
  mode,
  plan,
  onCancel,
  onEdit,
  onSave,
}: ServicePlanEditorProps) {
  const isView = mode === "view";
  const isAdd = mode === "add";
  const initialPlan =
    plan ??
    ({
      id: "new-plan",
      name: "",
      price: "",
      billingCycle: "Monthly",
      storageLimit: "",
      userLimit: "",
      userCount: "0 users",
      conversionRate: "0.0%",
      activeSubscribers: "0",
      churnRate: "0.0%",
      mrr: "$0",
      selectedFeatures: [],
    } satisfies ServicePlan);
  const [form, setForm] = useState<ServicePlan>(initialPlan);

  function updateForm(field: keyof ServicePlan, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  function toggleFeature(feature: string) {
    if (isView) {
      return;
    }

    setForm((currentForm) => {
      const selected = currentForm.selectedFeatures.includes(feature);

      return {
        ...currentForm,
        selectedFeatures: selected
          ? currentForm.selectedFeatures.filter((item) => item !== feature)
          : [...currentForm.selectedFeatures, feature],
      };
    });
  }

  function handleSave() {
    const cleanedName = form.name.trim() || "Untitled Plan";
    const generatedId = cleanedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const id = isAdd || form.id === "new-plan" ? generatedId : form.id;

    onSave({
      ...form,
      id: id || "untitled-plan",
      name: cleanedName,
      userCount:
        form.userLimit === "Unlimited"
          ? "0 accounts"
          : `${Number(form.userLimit || 0).toLocaleString()} users`,
    });
  }

  const title = isAdd
    ? "Add Service Plan"
    : isView
      ? "View Service Plan"
      : "Edit Service Plan";
  const subtitle = isAdd
    ? "Create the main information, resource limits, and included features for a new plan."
    : isView
      ? "Review plan details and limits. This view is locked from editing."
      : "Modify the details and limits for this service plan. Changes will take effect for new subscribers immediately.";

  return (
    <section className="w-full">
      <div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Back to service plans"
            title="Back"
            onClick={onCancel}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#D7DDD5] bg-white text-[#46624E] transition hover:bg-[#F2F4EE]"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={22}
              strokeWidth={1.8}
            />
          </button>
          <h1 className="text-[24px] font-bold leading-tight text-[#172235] sm:text-[30px]">
            {title}
          </h1>
        </div>
        <p className="mt-3 max-w-[760px] text-[14px] font-medium leading-6 text-[#626A64]">
          {subtitle}
        </p>
      </div>

      <div
        className={`mt-7 grid gap-6 ${
          isAdd ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-[1fr_250px]"
        }`}
      >
        <div className="space-y-5">
          <PlanFormSection title="Basic Information" icon={Invoice01Icon}>
            <PlanTextField
              className="sm:col-span-2"
              label="Plan Name"
              readOnly={isView}
              value={form.name}
              onChange={(value) => updateForm("name", value)}
            />
            <PlanTextField
              hint="Nominal fee between $2.00 - $3.00"
              label="Monthly Price (USD)"
              readOnly={isView}
              value={form.price}
              onChange={(value) => updateForm("price", value)}
            />
            <PlanSelectField
              label="Billing Cycle"
              options={["Weekly", "Monthly", "Yearly"]}
              readOnly={isView}
              value={form.billingCycle}
              onChange={(value) => updateForm("billingCycle", value)}
            />
          </PlanFormSection>

          <PlanFormSection title="Resource Limits" icon={DatabaseIcon}>
            <PlanTextField
              label="Storage Limit (GB)"
              readOnly={isView}
              suffix="GB"
              value={form.storageLimit}
              onChange={(value) => updateForm("storageLimit", value)}
            />
            <PlanTextField
              label="User Count Limit"
              readOnly={isView}
              suffix="users"
              value={form.userLimit}
              onChange={(value) => updateForm("userLimit", value)}
            />
          </PlanFormSection>

          <PlanFormSection
            badge={`${form.selectedFeatures.length} Selected`}
            icon={CheckmarkCircle02Icon}
            title="Included Features"
          >
            <div className="col-span-1 grid grid-cols-1 gap-3 sm:col-span-2 sm:grid-cols-2">
              {planFeatureOptions.map((feature) => {
                const selected = form.selectedFeatures.includes(feature);

                return (
                  <button
                    key={feature}
                    type="button"
                    disabled={isView}
                    onClick={() => toggleFeature(feature)}
                    className={`flex h-12 items-center gap-3 rounded-lg border px-4 text-left text-[13px] font-bold transition disabled:cursor-default ${
                      selected
                        ? "border-[#8AA08A] bg-[#F8FBF8] text-[#334155]"
                        : "border-[#D7DDD5] bg-white text-[#687168]"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded border ${
                        selected
                          ? "border-[#46624E] bg-[#46624E] text-white"
                          : "border-[#C7CEC5] bg-white text-transparent"
                      }`}
                    >
                      <HugeiconsIcon
                        icon={CheckmarkSquare01Icon}
                        size={14}
                        strokeWidth={2}
                      />
                    </span>
                    {feature}
                  </button>
                );
              })}
            </div>
          </PlanFormSection>
        </div>

        {!isAdd ? (
          <aside className="space-y-4">
            <section className="rounded-lg border border-[#E6E6E0] bg-white p-6 shadow-[0_12px_30px_rgba(31,47,40,0.06)]">
              <h2 className="text-[15px] font-bold text-[#334155]">
                Plan Health
              </h2>
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#8A928B]">
                    Active Subscribers
                  </span>
                  <span className="text-[12px] font-bold text-[#334155]">
                    {form.activeSubscribers}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EEF0FA]">
                  <div className="h-full w-[68%] rounded-full bg-[#46624E]" />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <PlanHealthMini label="Churn Rate" value={form.churnRate} />
                <PlanHealthMini label="MRR" value={form.mrr} />
              </div>
            </section>

            {isView ? (
              <>
                <button
                  type="button"
                  onClick={() => onEdit(form)}
                  className="h-12 w-full rounded-lg bg-[#46624E] text-[13px] font-bold text-white transition hover:bg-[#3C5544]"
                >
                  Edit Plan
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="h-12 w-full rounded-lg border border-[#D7DDD5] bg-white text-[13px] font-bold text-[#5F675F] transition hover:bg-[#F2F4EE]"
                >
                  Back to Plans
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="h-12 w-full rounded-lg bg-[#46624E] text-[13px] font-bold text-white transition hover:bg-[#3C5544]"
                >
                  Save Plan Changes
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="h-12 w-full rounded-lg border border-[#D7DDD5] bg-white text-[13px] font-bold text-[#5F675F] transition hover:bg-[#F2F4EE]"
                >
                  Cancel & Discard
                </button>
              </>
            )}
          </aside>
        ) : null}
      </div>

      {isAdd ? (
        <div className="mt-6 flex flex-col justify-end gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="h-12 rounded-lg border border-[#D7DDD5] bg-white px-8 text-[13px] font-bold text-[#5F675F] transition hover:bg-[#F2F4EE]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="h-12 rounded-lg bg-[#46624E] px-9 text-[13px] font-bold text-white transition hover:bg-[#3C5544]"
          >
            Save
          </button>
        </div>
      ) : null}
    </section>
  );
}
