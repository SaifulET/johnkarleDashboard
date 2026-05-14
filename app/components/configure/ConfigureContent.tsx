"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  AiSettingIcon,
  Alert01Icon,
  ArrowRight01Icon,
  BalanceScaleIcon,
  BookOpenTextIcon,
  BrainCogIcon,
  Briefcase01Icon,
  CheckmarkCircle02Icon,
  CheckmarkSquare01Icon,
  CloudUploadIcon,
  Copy01Icon,
  CpuIcon,
  DatabaseSettingIcon,
  EyeIcon,
  FileEditIcon,
  HeartCheckIcon,
  LaptopIcon,
  LinkSquare02Icon,
  MailSetting01Icon,
  PlusSignIcon,
  RedoIcon,
  SaveIcon,
  Settings02Icon,
  Shield01Icon,
  SmartPhone01Icon,
  UndoIcon,
} from "@hugeicons/core-free-icons";

type Tab = "General" | "AI Settings" | "Email Templates";

const tabs: Tab[] = ["General", "AI Settings", "Email Templates"];

const integrations = [
  { initial: "S", name: "Stripe", status: "Connected", active: true },
  { initial: "O", name: "OpenAI", status: "Connected", active: true },
  { initial: "A", name: "AWS S3", status: "Auth Required", active: false },
];

const toneProfiles = [
  {
    icon: HeartCheckIcon,
    title: "Compassionate",
    description: "Warm and empathetic tone, sensitive to legacy and memory.",
    active: true,
  },
  {
    icon: BalanceScaleIcon,
    title: "Neutral",
    description: "Balanced and objective reporting of historical facts.",
    active: false,
  },
  {
    icon: Briefcase01Icon,
    title: "Professional",
    description: "Formal, scholarly tone suitable for academic research.",
    active: false,
  },
];

const emailTemplates = [
  {
    icon: MailSetting01Icon,
    title: "Memory Anniversary",
    description: "Sent every 1, 5, 10 years",
    active: true,
  },
  {
    icon: HeartCheckIcon,
    title: "Welcome Series",
    description: "Onboarding for new descendants",
    active: false,
  },
  {
    icon: Shield01Icon,
    title: "Security Alert",
    description: "Vault access notifications",
    active: false,
  },
  {
    icon: LinkSquare02Icon,
    title: "Family Invitation",
    description: "Join a lineage circle",
    active: false,
  },
];

const tokens = [
  "[[User_Name]]",
  "[[Memory_Title]]",
  "[[Anniversary_Year]]",
  "[[Vault_Link]]",
  "[[Asset_Thumbnail]]",
];

const defaultEmailSubject =
  "A beautiful memory from [[Anniversary_Year]] years ago...";

const defaultEmailContent = `Dear [[User_Name]],

Time flows quickly, but some moments are carved in eternity. Today marks the [[Anniversary_Year]] anniversary of [[Memory_Title]].

We invite you to step back into the vault and relive this precious moment with your loved ones. Our AI has curated a high-fidelity restoration of the original media for this special occasion.

Warmly,
The Lineage Team`;

export function ConfigureContent() {
  const [activeTab, setActiveTab] = useState<Tab>("General");

  return (
    <section className="flex w-full flex-col items-start gap-8">
      <header className="flex w-full flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="[font-family:Manrope,Inter,sans-serif] text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-[#46624E]">
            Configure
          </h1>
          <p className="mt-1 text-[16px] font-normal leading-6 text-[#424843]">
            Fine-tune Lineage.AI platform environment and global AI intelligence
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
        {tabs.map((tab) => {
          const isActive = tab === activeTab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex h-[39px] shrink-0 items-start justify-center whitespace-nowrap pb-4 text-[14px] leading-5 ${
                isActive
                  ? "border-b-2 border-[#46624E] font-bold text-[#46624E]"
                  : "font-normal text-[#424843] transition hover:text-[#46624E]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>

      {activeTab === "General" ? (
        <GeneralTab />
      ) : activeTab === "AI Settings" ? (
        <AiSettingsTab />
      ) : (
        <EmailTemplatesTab />
      )}
    </section>
  );
}

function GeneralTab() {
  return (
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
  );
}

function AiSettingsTab() {
  const [strictness, setStrictness] = useState(0.8);
  const [deepArchiveEnabled, setDeepArchiveEnabled] = useState(true);
  const strictnessPercent = Math.round(strictness * 100);
  const strictnessLabel =
    strictness >= 0.85
      ? "Strict"
      : strictness >= 0.65
        ? "High"
        : strictness >= 0.35
          ? "Balanced"
          : "Creative";

  return (
    <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(300px,328px)]">
      <div className="space-y-8">
        <AiSettingsCard
          title="Grounding & Strictness"
          icon={AiSettingIcon}
          description="Define how strictly the AI adheres to genealogical data."
          badge="Advanced Feature"
          iconClassName="bg-[#E9DDFD] text-[#4B435C]"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-[16px] uppercase leading-6 text-[#424843]">
              <span>Creative Narrative</span>
              <span className="font-bold text-[#46624E]">
                {strictnessLabel} ({strictness.toFixed(2)} Strictness)
              </span>
              <span>Strict Fact-Only</span>
            </div>

            <div className="relative h-6">
              <input
                aria-label="Response grounding strictness"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={strictness}
                onChange={(event) =>
                  setStrictness(Number(event.currentTarget.value))
                }
                className="strictness-range absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 cursor-pointer appearance-none rounded-full outline-none"
                style={{
                  background: `linear-gradient(to right, #46624E 0%, #46624E ${strictnessPercent}%, #DDE5DA ${strictnessPercent}%, #DDE5DA 100%)`,
                }}
              />
            </div>

            <div className="flex items-start gap-3 rounded-[12px] border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3 text-[13px] leading-5 text-[#92400E]">
              <HugeiconsIcon
                icon={Alert01Icon}
                size={20}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-[#D97706]"
              />
              <p>
                <span className="font-bold">High strictness</span> reduces
                hallucinations but may result in less engaging narrative
                generation. Ideal for formal family reports.
              </p>
            </div>
          </div>
        </AiSettingsCard>

        <AiSettingsCard title="Emotional Tone Profile">
          <div className="grid gap-4 md:grid-cols-3">
            {toneProfiles.map((profile) => (
              <ToneCard key={profile.title} {...profile} />
            ))}
          </div>
        </AiSettingsCard>

        <div className="grid gap-8 lg:grid-cols-2">
          <AiSettingsCard
            title="Retrieval Depth"
            icon={DatabaseSettingIcon}
            compact
          >
            <ToggleRow
              title="Deep Archive Search"
              description="Access older historical nodes"
              enabled={deepArchiveEnabled}
              onToggle={() => setDeepArchiveEnabled((enabled) => !enabled)}
            />
            <CompactSelect
              label="Context Nodes per Query"
              value="Standard (5 Nodes)"
            />
          </AiSettingsCard>

          <AiSettingsCard
            title="Safety & Filtering"
            icon={Shield01Icon}
            iconClassName="text-[#BA1A1A]"
            compact
          >
            <CheckRow label="Automated PII Redaction" />
            <CheckRow label="Grief Sensitivity Mode" />
            <CheckRow label="Block Sensitive Content" />
          </AiSettingsCard>
        </div>
      </div>

      <aside className="space-y-8">
        <SystemIntegrityCard />
        <KnowledgeCard />
        <ResourceUsageCard />
      </aside>
    </div>
  );
}

function EmailTemplatesTab() {
  const [subject, setSubject] = useState(defaultEmailSubject);
  const [emailContent, setEmailContent] = useState(defaultEmailContent);

  return (
    <div className="grid w-full gap-6 xl:grid-cols-[minmax(260px,360px)_minmax(0,1fr)]">
      <div className="space-y-6">
        <section className="rounded-[16px] border border-[#E8E6E1] bg-white p-5 shadow-[0_4px_20px_rgba(109,139,116,0.05)]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="flex items-center gap-2 text-[20px] font-medium leading-[30px] text-[#111C2D]">
              <HugeiconsIcon icon={BookOpenTextIcon} size={20} strokeWidth={1.8} />
              Template Library
            </h2>
            <button
              type="button"
              aria-label="Add template"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#46624E] transition hover:bg-[#F5F2EB]"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={18} strokeWidth={1.8} />
            </button>
          </div>

          <div className="space-y-3">
            {emailTemplates.map((template) => (
              <TemplateCard key={template.title} {...template} />
            ))}
          </div>
        </section>

        <section className="rounded-[16px] border border-[#E8E6E1] bg-white p-5 shadow-[0_4px_20px_rgba(109,139,116,0.05)]">
          <h2 className="mb-4 flex items-center gap-2 text-[20px] font-medium leading-[30px] text-[#111C2D]">
            <HugeiconsIcon icon={Copy01Icon} size={18} strokeWidth={1.8} />
            Tokens
          </h2>
          <div className="flex flex-wrap gap-2">
            {tokens.map((token) => (
              <button
                key={token}
                type="button"
                onClick={() =>
                  setEmailContent((content) => `${content}\n${token}`)
                }
                className="rounded-full border border-[#C2C8C0] bg-[#F0F3FF] px-3 py-1 font-mono text-[13px] font-normal leading-5 text-[#46624E] transition hover:bg-[#DDE6F3]"
              >
                {token}
              </button>
            ))}
          </div>
          <p className="mt-4 text-[11px] italic leading-4 text-[#424843]">
            Click a token to copy or drag it into the editor.
          </p>
        </section>
      </div>

      <section className="grid overflow-hidden rounded-[16px] border border-[#E8E6E1] bg-white shadow-[0_4px_20px_rgba(109,139,116,0.05)] lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]">
        <div className="p-5">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-[16px] font-semibold leading-6 text-[#111C2D]">
              <HugeiconsIcon icon={FileEditIcon} size={18} strokeWidth={1.8} />
              Editing: Memory Anniversary
            </h2>
            <div className="flex items-center gap-2">
              <IconButton icon={UndoIcon} label="Undo" />
              <IconButton icon={RedoIcon} label="Redo" />
              <IconButton icon={EyeIcon} label="Preview" />
            </div>
          </div>

          <label className="block">
            <span className="text-[13px] font-semibold leading-5 text-[#424843]">
              Subject Line
            </span>
            <textarea
              value={subject}
              onChange={(event) => setSubject(event.currentTarget.value)}
              className="mt-2 h-16 w-full resize-none rounded-lg border border-[#DCE0D8] bg-[#FAFAF7] px-4 py-3 text-[16px] font-normal leading-6 text-[#111C2D] outline-none transition focus:border-[#46624E]"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-[13px] font-semibold leading-5 text-[#424843]">
              Email Content
            </span>
            <textarea
              value={emailContent}
              onChange={(event) => setEmailContent(event.currentTarget.value)}
              className="mt-2 min-h-[360px] w-full resize-none rounded-lg border border-[#DCE0D8] bg-[#FAFAF7] px-4 py-4 font-serif text-[18px] font-normal leading-[29px] text-[#111C2D] outline-none transition focus:border-[#46624E]"
            />
          </label>

          <div className="mt-4 rounded-[12px] bg-[#EEF7EF] p-4 text-[12px] leading-5 text-[#46624E]">
            <span className="font-bold">AI Suggestion:</span> Adding a
            call-to-action button here increases engagement by 24% for ancestry
            accounts.
          </div>
        </div>

        <div className="flex flex-col items-center bg-[#EEF3FF] p-5">
          <EmailPreview subject={subject} content={emailContent} />
          <div className="mt-4 flex items-center gap-3 text-[#8B96A3]">
            <HugeiconsIcon icon={SmartPhone01Icon} size={18} strokeWidth={1.8} />
            <HugeiconsIcon icon={LaptopIcon} size={18} strokeWidth={1.8} />
          </div>
        </div>
      </section>
    </div>
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
  children: ReactNode;
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

function AiSettingsCard({
  title,
  icon,
  description,
  badge,
  iconClassName = "bg-[#CAEAD5] text-[#46624E]",
  compact = false,
  children,
}: {
  title: string;
  icon?: IconSvgElement;
  description?: string;
  badge?: string;
  iconClassName?: string;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`rounded-[16px] border border-[#E8EEFF] bg-white shadow-[0_4px_20px_rgba(63,91,75,0.05)] ${
        compact ? "p-8" : "p-8"
      }`}
    >
      {icon || description || badge ? (
        <div
          className={`mb-8 flex gap-5 ${
            badge
              ? "flex-col sm:flex-row sm:items-center sm:justify-between"
              : "items-center"
          }`}
        >
          <div className="flex min-w-0 items-center gap-4">
            {icon ? (
              <span
                className={`flex h-12 w-10 shrink-0 items-center justify-center rounded-[12px] ${iconClassName}`}
              >
                <HugeiconsIcon icon={icon} size={20} strokeWidth={1.8} />
              </span>
            ) : null}
            <div className="min-w-0">
              <h2 className="text-[20px] font-medium leading-[30px] text-[#111C2D]">
                {title}
              </h2>
              {description ? (
                <p className="mt-0 text-[16px] font-normal leading-6 text-[#424843]">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
          {badge ? (
            <span className="w-fit shrink-0 rounded-full border border-[#C2C8C0] bg-[#DFE8FF] px-3 py-1 text-[16px] font-normal leading-6 text-[#424843]">
              {badge}
            </span>
          ) : null}
        </div>
      ) : (
        <h2 className="mb-6 text-[20px] font-medium leading-[30px] text-[#111C2D]">
          {title}
        </h2>
      )}
      <div className={compact ? "space-y-6" : undefined}>{children}</div>
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
  children: ReactNode;
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
    <label className="block">
      <span className="text-[14px] font-bold leading-5 text-[#46624E]">
        {label}
      </span>
      <select
        defaultValue={value}
        className="mt-2 h-12 w-full rounded-[12px] border border-[rgba(194,200,192,0.3)] bg-[#F5F2EB] px-4 text-[14px] font-normal leading-6 text-[#111C2D] outline-none"
      >
        <option>{value}</option>
      </select>
    </label>
  );
}

function CompactSelect({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-[16px] font-normal leading-6 text-[#424843]">
        {label}
      </span>
      <select
        defaultValue={value}
        className="mt-2 h-[42px] w-full rounded-[12px] border border-[#C2C8C0] bg-[#F0F3FF] px-3 text-[15px] font-normal leading-6 text-[#111C2D] outline-none"
      >
        <option>{value}</option>
        <option>Extended (8 Nodes)</option>
        <option>Deep (12 Nodes)</option>
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

function ToneCard({
  icon,
  title,
  description,
  active,
}: {
  icon: IconSvgElement;
  title: string;
  description: string;
  active: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex min-h-[298px] flex-col rounded-[16px] border p-[23px_24px_24px] text-left transition ${
        active
          ? "border-2 border-[#46624E] bg-[rgba(202,234,213,0.3)] text-[#46624E]"
          : "border-[#C2C8C0] bg-white text-[#424843] hover:border-[#46624E]"
      }`}
    >
      <HugeiconsIcon icon={icon} size={24} strokeWidth={1.8} />
      <span className="mt-4 text-[18px] font-normal leading-[27px] text-[#111C2D]">
        {title}
      </span>
      <span className="mt-1 text-[16px] font-normal leading-[26px] text-[#424843]">
        {description}
      </span>
      {active ? (
        <HugeiconsIcon
          icon={CheckmarkCircle02Icon}
          size={20}
          strokeWidth={1.8}
          className="mt-auto self-end text-[#46624E]"
        />
      ) : null}
    </button>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex min-h-[72px] items-center justify-between gap-4">
      <div>
        <p className="text-[16px] font-semibold leading-6 text-[#111C2D]">
          {title}
        </p>
        <p className="text-[16px] font-normal leading-6 text-[#424843]">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={`flex h-6 w-10 shrink-0 items-center rounded-full p-1 transition ${
          enabled ? "justify-end bg-[#46624E]" : "justify-start bg-[#D9DDD6]"
        }`}
      >
        <span className="h-4 w-4 rounded-full bg-white" />
      </button>
    </div>
  );
}

function CheckRow({ label }: { label: string }) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center gap-[11px] rounded-[12px] px-[11px] py-3">
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded bg-[#46624E] text-white">
        <HugeiconsIcon icon={CheckmarkSquare01Icon} size={14} strokeWidth={1.8} />
      </span>
      <span className="text-[16px] font-normal leading-6 text-[#111C2D]">
        {label}
      </span>
    </label>
  );
}

function TemplateCard({
  icon,
  title,
  description,
  active,
}: {
  icon: IconSvgElement;
  title: string;
  description: string;
  active: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-4 rounded-[12px] border p-4 text-left transition ${
        active
          ? "border-[#46624E] bg-[#CAEAD5]"
          : "border-[#D9DDD6] bg-[#F7F8FB] hover:border-[#46624E]"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          active ? "bg-[#46624E] text-white" : "bg-white text-[#6D7A69]"
        }`}
      >
        <HugeiconsIcon icon={icon} size={20} strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-bold leading-5 text-[#46624E]">
          {title}
        </span>
        <span className="block text-[11px] leading-4 text-[#424843]">
          {description}
        </span>
      </span>
      {active ? (
        <HugeiconsIcon
          icon={CheckmarkCircle02Icon}
          size={18}
          strokeWidth={1.8}
          className="shrink-0 text-[#46624E]"
        />
      ) : null}
    </button>
  );
}

function IconButton({ icon, label }: { icon: IconSvgElement; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#46624E] transition hover:bg-[#F5F2EB]"
    >
      <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} />
    </button>
  );
}

function EmailPreview({
  subject,
  content,
}: {
  subject: string;
  content: string;
}) {
  const previewSubject =
    subject.trim().length > 0
      ? subject
          .replaceAll("[[Anniversary_Year]]", "5th")
          .replaceAll("[[Memory_Title]]", "Summer Cabin Reunion")
      : defaultEmailSubject;
  const previewContent =
    content.trim().length > 0
      ? content
          .replaceAll("[[User_Name]]", "James")
          .replaceAll("[[Anniversary_Year]]", "5th")
          .replaceAll("[[Memory_Title]]", "Summer Cabin Reunion")
      : defaultEmailContent;

  return (
    <div className="w-full max-w-[240px] overflow-hidden rounded-[24px] bg-white shadow-[0_22px_50px_rgba(70,98,78,0.18)]">
      <div className="relative h-[150px] w-full">
        <Image
          src="/configure.png"
          alt="Memory anniversary email preview"
          fill
          sizes="240px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <h3 className="absolute bottom-5 left-5 right-5 text-[24px] font-semibold leading-[34px] tracking-[-0.24px] text-white">
          {previewSubject}
        </h3>
      </div>
      <div className="flex flex-col px-7 py-7 text-center">
        <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-[#46624E]" />
        <h4 className="text-[20px] font-medium leading-[30px] text-[#46624E]">
          A Moment Preserved
        </h4>
        <p className="mt-5 text-[16px] italic leading-[26px] text-[#424843]">
          Memory is a way of holding onto the things you love, the things you
          are, the things you never want to lose.
        </p>
        <div className="mt-6 max-h-[136px] overflow-y-auto overflow-x-hidden pr-1 text-[16px] font-normal leading-8 text-[#111C2D]">
          {previewContent.split("\n").map((line, index) => (
            <p key={`${line}-${index}`} className={line ? "" : "h-4"}>
              {line}
            </p>
          ))}
        </div>
        <button
          type="button"
          className="relative z-10 mt-6 min-h-20 w-full shrink-0 rounded-full bg-[#46624E] px-8 py-4 text-[16px] font-semibold leading-6 text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
        >
          Relive the Memory
        </button>
        <div className="mt-7 shrink-0 border-t border-[#C2C8C0] pt-6 text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#727972]">
          Lineage.AI Sanctuary
        </div>
      </div>
    </div>
  );
}

function SystemIntegrityCard() {
  return (
    <section className="min-h-[226px] rounded-[16px] bg-[#46624E] p-6 text-white shadow-[0_4px_20px_rgba(63,91,75,0.05)]">
      <h2 className="flex items-center gap-2 text-[16px] font-normal leading-6">
        <HugeiconsIcon icon={CpuIcon} size={18} strokeWidth={1.8} />
        System Integrity
      </h2>
      <div className="mt-6 space-y-4">
        <StatusRow label="AI Latency" value="24ms" />
        <StatusRow label="Sync Status">
          <span className="rounded bg-white/20 px-2 py-0.5 text-[11px] font-bold uppercase leading-4">
            Active
          </span>
        </StatusRow>
        <StatusRow label="Last Training" value="Today, 04:00 AM" compact />
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
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 last:border-b-0 last:pb-0">
      <span className="text-[16px] font-normal leading-6 text-white/80">
        {label}
      </span>
      {children ?? (
        <span
          className={`font-semibold text-white ${
            compact ? "text-[16px] leading-6" : "text-[16px] leading-6"
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
          icon={LinkSquare02Icon}
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
    <section className="min-h-[450px] overflow-hidden rounded-[16px] bg-white shadow-[0_4px_20px_rgba(63,91,75,0.05)]">
      <div className="relative h-[160px] w-full">
        <Image
          src="/configure.png"
          alt="Configuration knowledge base preview"
          fill
          sizes="328px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="min-h-[290px] p-6">
        <p className="text-[16px] font-normal uppercase leading-6 text-[#46624E]">
          Knowledge Base
        </p>
        <h2 className="mt-1 text-[16px] font-normal leading-6 text-[#111C2D]">
          Need help configuring AI?
        </h2>
        <p className="mt-2 text-[16px] font-normal leading-[26px] text-[#424843]">
          Visit our comprehensive documentation to learn more about advanced AI
          grounding and data privacy protocols for genealogical research.
        </p>
        <button
          type="button"
          className="mt-5 flex items-center gap-2 text-[16px] font-semibold leading-6 text-[#46624E]"
        >
          Explore Docs
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}

function ResourceUsageCard() {
  return (
    <section className="rounded-[16px] border border-[#CFD8F5] bg-[#EDF2FF] p-5 shadow-[0_4px_20px_rgba(109,139,116,0.05)]">
      <p className="text-[12px] font-bold uppercase leading-4 tracking-[1px] text-[#7C8793]">
        AI Resource Usage
      </p>
      <Meter label="Tokens Remaining" value="78%" width="78%" />
      <Meter label="Processing Load" value="12%" width="12%" />
    </section>
  );
}

function Meter({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between gap-3 text-[12px] font-bold leading-4 text-[#46624E]">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white">
        <div className="h-full rounded-full bg-[#46624E]" style={{ width }} />
      </div>
    </div>
  );
}
