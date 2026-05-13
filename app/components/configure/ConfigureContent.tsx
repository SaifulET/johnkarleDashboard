"use client";

import Image from "next/image";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  AiSettingIcon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  BrainCogIcon,
  CheckmarkCircle02Icon,
  CloudUploadIcon,
  CpuIcon,
  DatabaseSettingIcon,
  LinkSquare02Icon,
  SaveIcon,
  Settings02Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";

const tabs = [
  "General",
  "Branding",
  "AI Settings",
  "Storage",
  "Email Templates",
  "Integrations",
  "Security",
];

const integrations = [
  { initial: "S", name: "Stripe", status: "Connected", active: true },
  { initial: "O", name: "OpenAI", status: "Connected", active: true },
  { initial: "A", name: "AWS S3", status: "Auth Required", active: false },
];

export function ConfigureContent() {
  return (
    <section className="flex w-full flex-col items-start gap-8">
      <header className="flex w-full flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="[font-family:Manrope,Inter,sans-serif] text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-[#46624E]">
            Configure
          </h1>
          <p className="mt-1 text-[16px] font-normal leading-6 text-[#424843]">
            Configure your Lineage.AI platform environment and global
            preferences.
          </p>
        </div>
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-[#46624E] px-8 text-[16px] font-bold leading-6 text-white shadow-[0_10px_15px_-3px_rgba(70,98,78,0.2),0_4px_6px_-4px_rgba(70,98,78,0.2)] transition hover:bg-[#3C5544] sm:w-auto"
        >
          <HugeiconsIcon icon={SaveIcon} size={18} strokeWidth={1.8} />
          Save Changes
        </button>
      </header>

      <nav className="flex w-full gap-8 overflow-x-auto border-b border-[rgba(194,200,192,0.3)]">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`flex h-[39px] shrink-0 items-start justify-center whitespace-nowrap pb-4 text-[14px] leading-5 ${
              index === 0
                ? "border-b-2 border-[#46624E] font-bold text-[#46624E]"
                : "font-normal text-[#424843] transition hover:text-[#46624E]"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(300px,328px)]">
        <div className="space-y-8">
          <ConfigCard title="General Configuration" icon={Settings02Icon}>
            <SettingRow
              label="Platform Name"
              description="The public-facing name of your instance."
            >
              <input
                value="Lineage.AI"
                readOnly
                className="h-12 w-full rounded-[12px] bg-[#F5F2EB] px-4 text-[16px] font-normal leading-[19px] text-[#111C2D] outline-none"
              />
            </SettingRow>

            <SettingRow
              label="Platform Logo"
              description="SVG or PNG format. Recommended 512x512px."
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[16px] border-2 border-dashed border-[rgba(70,98,78,0.2)] bg-[#CAEAD5]">
                  <Image
                    src="/logo.png"
                    alt="Lineage.AI logo preview"
                    width={40}
                    height={40}
                    className="opacity-50"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    className="flex h-[42px] items-center gap-2 rounded-[12px] border border-[#C2C8C0] bg-white px-4 text-[14px] font-semibold leading-5 text-[#111C2D] transition hover:bg-[#F5F2EB]"
                  >
                    <HugeiconsIcon
                      icon={CloudUploadIcon}
                      size={16}
                      strokeWidth={1.8}
                      className="text-[#46624E]"
                    />
                    Choose New Logo
                  </button>
                  <p className="mt-2 text-[10px] font-normal leading-[15px] text-[#424843]">
                    Maximum file size: 2MB.
                  </p>
                </div>
              </div>
            </SettingRow>

            <div className="grid gap-6 border-t border-[rgba(194,200,192,0.1)] pt-6 sm:grid-cols-2">
              <LabeledSelect
                label="Default Timezone"
                value="Pacific Standard Time (PST)"
              />
              <LabeledSelect label="Default Language" value="English (US)" />
            </div>
          </ConfigCard>

          <ConfigCard
            title="AI Logic & Constraints"
            icon={BrainCogIcon}
            badge="Advanced Feature"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[16px] font-bold leading-6 text-[#46624E]">
                  Response Grounding Strictness
                </p>
                <p className="text-[16px] font-bold leading-6 text-[#46624E]">
                  High (0.8)
                </p>
              </div>
              <div className="h-2 rounded-lg bg-[#CAEAD5]" />
              <div className="flex justify-between text-[10px] font-normal uppercase leading-[15px] tracking-[-0.5px] text-[#424843]">
                <span>Creative</span>
                <span>Strict (Fact-Only)</span>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <AiOptionCard
                icon={DatabaseSettingIcon}
                title="Memory Retrieval Depth"
                description="How many historical context nodes the AI pulls per query."
                value="Standard (5 Nodes)"
              />
              <AiOptionCard
                icon={Shield01Icon}
                title="Content Filtering"
                description="Safety protocol level for sensitive genealogical data."
                value="Institutional Grade"
              />
            </div>
          </ConfigCard>
        </div>

        <aside className="space-y-8">
          <SystemIntegrityCard />
          <IntegrationCard />
          <KnowledgeCard />
        </aside>
      </div>
    </section>
  );
}

function ConfigCard({
  title,
  icon,
  badge,
  children,
}: {
  title: string;
  icon: IconSvgElement;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[16px] border border-[#E8E6E1] bg-white p-6 shadow-[0_4px_20px_rgba(109,139,116,0.05)] sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-[#CAEAD5] text-[#46624E]">
            <HugeiconsIcon icon={icon} size={18} strokeWidth={1.8} />
          </span>
          <h2 className="[font-family:Manrope,Inter,sans-serif] text-[20px] font-medium leading-7 text-[#46624E]">
            {title}
          </h2>
        </div>
        {badge ? (
          <span className="shrink-0 rounded-full bg-[rgba(70,98,78,0.1)] px-3 py-1 text-[12px] font-bold leading-4 text-[#46624E]">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[189px_minmax(0,1fr)] md:gap-6">
      <div>
        <p className="text-[16px] font-bold leading-6 text-[#46624E]">
          {label}
        </p>
        <p className="mt-1 text-[12px] font-normal leading-4 text-[#424843]">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

function LabeledSelect({ label, value }: { label: string; value: string }) {
  return (
    <label>
      <span className="text-[16px] font-bold leading-6 text-[#46624E]">
        {label}
      </span>
      <select
        defaultValue={value}
        className="mt-2 h-12 w-full rounded-[12px] bg-[#F5F2EB] px-4 text-[16px] font-normal leading-6 text-[#111C2D] outline-none"
      >
        <option>{value}</option>
      </select>
    </label>
  );
}

function AiOptionCard({
  icon,
  title,
  description,
  value,
}: {
  icon: IconSvgElement;
  title: string;
  description: string;
  value: string;
}) {
  return (
    <div className="rounded-[12px] border border-[rgba(194,200,192,0.2)] bg-[#F0F3FF] p-4">
      <div className="flex items-center gap-2">
        <HugeiconsIcon
          icon={icon}
          size={13}
          strokeWidth={1.8}
          className="text-[#46624E]"
        />
        <p className="text-[16px] font-bold leading-6 text-[#46624E]">
          {title}
        </p>
      </div>
      <p className="mt-2 min-h-10 text-[12px] font-normal leading-4 text-[#424843]">
        {description}
      </p>
      <select
        defaultValue={value}
        className="mt-2 h-[38px] w-full rounded-lg border border-[rgba(194,200,192,0.3)] bg-white px-2 text-[14px] font-normal leading-5 text-[#111C2D] outline-none"
      >
        <option>{value}</option>
      </select>
    </div>
  );
}

function SystemIntegrityCard() {
  return (
    <section className="rounded-[16px] bg-[#46624E] p-6 text-white shadow-[0_10px_15px_-3px_rgba(70,98,78,0.2),0_4px_6px_-4px_rgba(70,98,78,0.2)]">
      <h2 className="flex items-center gap-2 text-[16px] font-bold leading-6">
        <HugeiconsIcon icon={CpuIcon} size={22} strokeWidth={1.8} />
        System Integrity
      </h2>
      <div className="mt-4 space-y-4">
        <StatusRow label="API Latency" value="24ms" />
        <StatusRow label="Sync Status">
          <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase leading-5 tracking-[1px]">
            Active
          </span>
        </StatusRow>
        <StatusRow label="Last Backup" value="2023-10-24 04:00" compact />
      </div>
    </section>
  );
}

function StatusRow({
  label,
  value,
  compact,
  children,
}: {
  label: string;
  value?: string;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 last:border-b-0 last:pb-0">
      <span className="text-[14px] font-normal leading-5 text-white/80">
        {label}
      </span>
      {children ?? (
        <span
          className={`font-mono text-white ${
            compact ? "text-[12px] leading-4" : "text-[14px] leading-5"
          }`}
        >
          {value}
        </span>
      )}
    </div>
  );
}

function IntegrationCard() {
  return (
    <section className="rounded-[16px] border border-[#E8E6E1] bg-white p-6 shadow-[0_4px_20px_rgba(109,139,116,0.05)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[16px] font-bold leading-6 text-[#46624E]">
          Active Integrations
        </h2>
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          size={18}
          strokeWidth={1.8}
          className="text-[#424843]"
        />
      </div>
      <div className="mt-6 space-y-4">
        {integrations.map((integration) => (
          <div key={integration.name} className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5F2EB] text-[12px] font-bold leading-4 text-[#46624E]">
              {integration.initial}
            </span>
            <div>
              <p className="text-[14px] font-semibold leading-5 text-[#46624E]">
                {integration.name}
              </p>
              <p
                className={`text-[10px] font-bold uppercase leading-[15px] ${
                  integration.active ? "text-[#16A34A]" : "text-[#424843]"
                }`}
              >
                {integration.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function KnowledgeCard() {
  return (
    <section className="overflow-hidden rounded-[16px] bg-[#F5F2EB]">
      <div className="relative h-32 w-full">
        <Image
          src="/configure.png"
          alt="Configuration knowledge base preview"
          fill
          sizes="328px"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <p className="text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-[#46624E]">
          Knowledge Base
        </p>
        <h2 className="mt-1 text-[14px] font-bold leading-5 text-[#46624E]">
          Need help configuring?
        </h2>
        <p className="mt-2 text-[12px] font-normal leading-5 text-[#424843]">
          Visit our comprehensive documentation to learn more about advanced AI
          grounding and data privacy protocols.
        </p>
        <button
          type="button"
          className="mt-3 flex items-center gap-1 text-[12px] font-bold leading-4 text-[#46624E]"
        >
          Explore Docs
          <HugeiconsIcon icon={ArrowRight01Icon} size={8} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
