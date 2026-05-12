"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ImageUploadIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";

type SettingsPage =
  | "list"
  | "change-password"
  | "forgot-password"
  | "otp"
  | "privacy"
  | "terms"
  | "about";

const settingsItems: { label: string; page: SettingsPage }[] = [
  { label: "Change Password", page: "change-password" },
  { label: "Privacy Policy", page: "privacy" },
  { label: "Terms & Conditions", page: "terms" },
  { label: "About Us", page: "about" },
];

const legalCopy = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie maecenas. Leo blandit ac porttitor rutrum aliquet porta penatibus mi est. Nisl velit vel lacus nulla eu netus pretium. Pellentesque scelerisque tellus nisl eu nisl sed senectus nunc. Porta sollicitudin vel elit varius nulla sit diam sed. Bibendum elit facilisi nulla viverra augue pellentesque gravida morbi.",
  "Diam pellentesque orci eget gravida cursus. Ut ut nulla sapien eget vitae at eget pretium. Tristique nibh ipsum iaculis quam. Vestibulum magna cursus facilisis adipiscing cras dui. Risus auctor faucibus orci tortor tristique elit. Sit tincidunt id felis malesuada placerat ultricies enim. Purus ut congue ornare id sed. Enim libero tincidunt facilisis non facilisis mattis praesent.",
  "Ut suscipit cursus id mauris. Accumsan egestas sit arcu sed. Feugiat tortor pharetra id ipsum elit diam viverra tortor. Mattis tincidunt eget ut nunc in. Mauris ipsum ut purus laoreet nisi eu viverra velit adipiscing. Diam sit cursus id semper sit. Urna morbi nisl est vel tincidunt.",
];

export function SettingsContent() {
  const [page, setPage] = useState<SettingsPage>("list");
  const [otp, setOtp] = useState(["8", "0", "", ""]);

  if (page === "change-password") {
    return (
      <SettingsShell title="Change Password" onBack={() => setPage("list")}>
        <ChangePasswordForm onForgot={() => setPage("forgot-password")} />
      </SettingsShell>
    );
  }

  if (page === "forgot-password") {
    return (
      <SettingsShell title="Forgot Password" onBack={() => setPage("change-password")}>
        <ForgotPasswordForm onGetOtp={() => setPage("otp")} />
      </SettingsShell>
    );
  }

  if (page === "otp") {
    return (
      <SettingsShell title="Settings" onBack={() => setPage("forgot-password")}>
        <OtpVerification otp={otp} onOtpChange={setOtp} />
      </SettingsShell>
    );
  }

  if (page === "privacy" || page === "terms" || page === "about") {
    const title =
      page === "privacy"
        ? "Privacy Policy"
        : page === "terms"
          ? "Terms & Conditions"
          : "About Us";

    return (
      <SettingsShell title={title} onBack={() => setPage("list")} showSave>
        <LegalEditor />
      </SettingsShell>
    );
  }

  return (
    <section className="w-full">
      <div className="min-h-[620px] overflow-hidden rounded-lg border border-[#E2E6DF] bg-white shadow-[0_12px_30px_rgba(31,47,40,0.08)]">
        <header className="bg-[#66785F] px-5 py-5 sm:px-7">
          <h1 className="text-[30px] font-bold leading-tight text-white sm:text-[34px]">
            Settings
          </h1>
        </header>
        <div className="px-5 sm:px-7">
          {settingsItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setPage(item.page)}
              className="flex min-h-[58px] w-full items-center justify-between border-b border-[#BFC6BC] text-left text-[18px] font-medium text-[#263029] transition hover:bg-[#F7F9F7]"
            >
              <span>{item.label}</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={18}
                strokeWidth={1.8}
                className="text-[#263029]"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SettingsShell({
  title,
  onBack,
  showSave = false,
  children,
}: {
  title: string;
  onBack: () => void;
  showSave?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="w-full">
      <div className="min-h-[620px] overflow-hidden rounded-lg border border-[#E2E6DF] bg-white shadow-[0_12px_30px_rgba(31,47,40,0.08)]">
        <header className="flex min-h-[66px] items-center justify-between gap-4 bg-[#66785F] px-5 py-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to settings"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-white transition hover:bg-white/10"
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={20}
                strokeWidth={1.8}
              />
            </button>
            <h1 className="truncate text-[28px] font-bold leading-tight text-white sm:text-[34px]">
              {title}
            </h1>
          </div>
          {showSave ? (
            <button
              type="button"
              className="h-10 rounded bg-white px-8 text-[13px] font-bold text-[#66785F] transition hover:bg-[#F2F4EE]"
            >
              Save
            </button>
          ) : null}
        </header>
        <div className="px-5 py-8 sm:px-8 lg:px-14">{children}</div>
      </div>
    </section>
  );
}

function ChangePasswordForm({ onForgot }: { onForgot: () => void }) {
  return (
    <form className="mx-auto max-w-[620px] space-y-5">
      <PasswordField
        label="Current Password"
        placeholder="Enter current password"
      />
      <PasswordField label="New Password" placeholder="Enter new password" />
      <PasswordField
        label="Confirm New Password"
        placeholder="Confirm new password"
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onForgot}
          className="text-[12px] font-semibold text-[#66785F] underline"
        >
          Forgot password?
        </button>
      </div>
      <button
        type="button"
        className="h-12 w-full rounded-md bg-[#66785F] text-[18px] font-bold text-white transition hover:bg-[#596B53]"
      >
        Change Password
      </button>
    </form>
  );
}

function ForgotPasswordForm({ onGetOtp }: { onGetOtp: () => void }) {
  return (
    <form className="mx-auto max-w-[620px] space-y-7">
      <h2 className="max-w-[620px] text-[26px] font-medium leading-tight text-[#334155]">
        Enter your email address to ger a verification code for resetting your
        password.
      </h2>
      <label className="block">
        <span className="text-[17px] font-semibold text-[#334155]">Email</span>
        <input
          placeholder="Enter your email"
          className="mt-3 h-11 w-full rounded border border-[#9EA79C] px-3 text-[14px] outline-none transition focus:border-[#66785F] focus:ring-2 focus:ring-[#66785F]/15"
        />
      </label>
      <button
        type="button"
        onClick={onGetOtp}
        className="h-12 w-full rounded-md bg-[#66785F] text-[18px] font-bold text-white transition hover:bg-[#596B53]"
      >
        Get OTP
      </button>
    </form>
  );
}

function OtpVerification({
  otp,
  onOtpChange,
}: {
  otp: string[];
  onOtpChange: (value: string[]) => void;
}) {
  return (
    <div className="mx-auto max-w-[620px]">
      <h2 className="text-[26px] font-medium leading-tight text-[#334155]">
        Please check your email. We have sent a code to contact @gmail.com
      </h2>
      <div className="mt-7 flex justify-center gap-6">
        {otp.map((value, index) => (
          <input
            key={index}
            value={value || "-"}
            maxLength={1}
            onChange={(event) => {
              const nextOtp = [...otp];
              nextOtp[index] = event.target.value.replace(/[^0-9]/g, "");
              onOtpChange(nextOtp);
            }}
            className="h-16 w-16 rounded border border-[#9EA79C] text-center text-[38px] font-medium text-[#263029] outline-none transition focus:border-[#66785F] focus:ring-2 focus:ring-[#66785F]/15"
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[12px] font-medium text-[#334155]">
        <span>Didn&apos;t receive code?</span>
        <button type="button" className="underline">
          Resend
        </button>
      </div>
      <button
        type="button"
        className="mt-6 h-12 w-full rounded-md bg-[#66785F] text-[18px] font-bold text-white transition hover:bg-[#596B53]"
      >
        Verify
      </button>
    </div>
  );
}

function PasswordField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block">
      <span className="text-[20px] font-medium text-[#334155]">{label}</span>
      <span className="relative mt-2 block">
        <input
          placeholder={placeholder}
          type={visible ? "text" : "password"}
          className="h-11 w-full rounded border border-[#9EA79C] px-3 pr-12 text-[14px] outline-none transition focus:border-[#66785F] focus:ring-2 focus:ring-[#66785F]/15"
        />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((value) => !value)}
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-[#8A928B] transition hover:bg-[#F2F4EE]"
        >
          <HugeiconsIcon
            icon={visible ? ViewOffSlashIcon : ViewIcon}
            size={18}
            strokeWidth={1.8}
          />
        </button>
      </span>
    </label>
  );
}

function LegalEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const selectionRef = useRef<Range | null>(null);

  function saveSelection() {
    const selection = window.getSelection();
    const anchorNode = selection?.anchorNode;

    if (
      selection &&
      selection.rangeCount > 0 &&
      anchorNode &&
      editorRef.current?.contains(anchorNode)
    ) {
      selectionRef.current = selection.getRangeAt(0).cloneRange();
    }
  }

  function restoreSelection() {
    const selection = window.getSelection();

    if (selection && selectionRef.current) {
      selection.removeAllRanges();
      selection.addRange(selectionRef.current);
    }
  }

  function runEditorCommand(command: string, value?: string) {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand(command, false, value);
    saveSelection();
  }

  function uploadImage(file: File | undefined) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        runEditorCommand("insertImage", reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={saveSelection}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        className="min-h-[360px] text-[17px] font-medium leading-7 text-[#626A64] outline-none [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-lg"
      >
        {legalCopy.map((item) => (
          <p key={item} className="mb-6">
            {item}
          </p>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F3F1] text-[#66785F]">
            <HugeiconsIcon icon={ImageUploadIcon} size={22} strokeWidth={1.7} />
          </span>
          <div>
            <p className="text-[13px] font-bold text-[#334155]">
              Upload your image
            </p>
            <p className="text-[11px] font-medium text-[#8A928B]">
              jpg/png - Max. 5MB
            </p>
          </div>
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="h-9 rounded bg-[#66785F] px-6 text-[12px] font-bold text-white transition hover:bg-[#596B53]"
          >
            Upload
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              uploadImage(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 text-[#66785F]">
          <select
            className="h-6 rounded border border-[#D9DED7] bg-white px-1 text-[11px] font-medium text-[#66785F] outline-none"
            onMouseDown={saveSelection}
            onChange={(event) => runEditorCommand("fontSize", event.target.value)}
            defaultValue="3"
          >
            <option value="2">12</option>
            <option value="3">14</option>
            <option value="4">16</option>
          </select>
          <EditorButton label="Bold" onClick={() => runEditorCommand("bold")}>
            B
          </EditorButton>
          <EditorButton label="Italic" onClick={() => runEditorCommand("italic")}>
            <span className="italic">I</span>
          </EditorButton>
          <EditorButton
            label="Underline"
            onClick={() => runEditorCommand("underline")}
          >
            <span className="underline">U</span>
          </EditorButton>
          <ToolbarSeparator />
          <EditorButton
            label="Align left"
            onClick={() => runEditorCommand("justifyLeft")}
          >
            <AlignGlyph align="left" />
          </EditorButton>
          <EditorButton
            label="Align center"
            onClick={() => runEditorCommand("justifyCenter")}
          >
            <AlignGlyph align="center" />
          </EditorButton>
          <EditorButton
            label="Align right"
            onClick={() => runEditorCommand("justifyRight")}
          >
            <AlignGlyph align="right" />
          </EditorButton>
          <ToolbarSeparator />
          <EditorButton
            label="Decrease indent"
            onClick={() => runEditorCommand("outdent")}
          >
            <IndentGlyph direction="left" />
          </EditorButton>
          <EditorButton
            label="Increase indent"
            onClick={() => runEditorCommand("indent")}
          >
            <IndentGlyph direction="right" />
          </EditorButton>
        </div>
      </div>
    </div>
  );
}

function EditorButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onMouseDown={(event) => {
        event.preventDefault();
        onClick();
      }}
      className="flex h-6 min-w-6 items-center justify-center rounded border border-[#D9DED7] bg-white px-1 text-[11px] font-bold text-[#66785F] transition hover:bg-[#F2F4EE]"
    >
      {children}
    </button>
  );
}

function ToolbarSeparator() {
  return <span className="mx-1 h-5 w-px bg-[#D9DED7]" />;
}

function AlignGlyph({ align }: { align: "left" | "center" | "right" }) {
  const lines =
    align === "left"
      ? ["w-4", "w-3", "w-4"]
      : align === "center"
        ? ["w-3", "w-4", "w-3"]
        : ["w-4 self-end", "w-3 self-end", "w-4 self-end"];

  return (
    <span className="flex w-4 flex-col gap-[2px]">
      {lines.map((line, index) => (
        <span key={index} className={`h-px rounded bg-current ${line}`} />
      ))}
    </span>
  );
}

function IndentGlyph({ direction }: { direction: "left" | "right" }) {
  return (
    <span className="flex items-center gap-[2px]">
      <span className="text-[9px] leading-none">
        {direction === "left" ? "<" : ">"}
      </span>
      <span className="flex flex-col gap-[2px]">
        <span className="h-px w-3 rounded bg-current" />
        <span className="h-px w-2 rounded bg-current" />
        <span className="h-px w-3 rounded bg-current" />
      </span>
    </span>
  );
}
