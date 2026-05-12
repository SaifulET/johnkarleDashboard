"use client";

import type { ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Attachment01Icon,
  Cancel01Icon,
  Image01Icon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  Link01Icon,
  MailSend01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

type EmailAudience = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Trial" | "Inactive";
};

type AttachmentFile = {
  id: string;
  name: string;
  size: number;
  type: string;
};

const audience: EmailAudience[] = [
  {
    id: "alex",
    name: "Alex Rivera",
    email: "alex.r@enterprise.com",
    status: "Active",
  },
  {
    id: "sarah",
    name: "Sarah Jenkins",
    email: "s.jenkins@globex.co",
    status: "Trial",
  },
  {
    id: "marcus",
    name: "Marcus Thorne",
    email: "m.thorne@startup.io",
    status: "Active",
  },
  {
    id: "elena",
    name: "Elena Rod",
    email: "elena.rod@design.co",
    status: "Inactive",
  },
  {
    id: "julian",
    name: "Julian Kim",
    email: "j.kim@techflow.net",
    status: "Active",
  },
];

const initialSelectedIds = ["alex", "marcus", "julian"];

export function BulkEmailContent() {
  const editorRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [attachments, setAttachments] = useState<AttachmentFile[]>([
    {
      id: "release-notes",
      name: "release_notes_v2.pdf",
      size: 1024 * 1024,
      type: "application/pdf",
    },
  ]);

  const filteredAudience = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return audience;
    }

    return audience.filter(
      (person) =>
        person.name.toLowerCase().includes(normalized) ||
        person.email.toLowerCase().includes(normalized),
    );
  }, [query]);

  const selectedRecipients = audience.filter((person) =>
    selectedIds.includes(person.id),
  );

  function toggleRecipient(id: string) {
    setSelectedIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((item) => item !== id)
        : [...currentIds, id],
    );
  }

  function runEditorCommand(command: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  }

  function addLink() {
    const url = window.prompt("Paste a link URL");

    if (url) {
      runEditorCommand("createLink", url);
    }
  }

  function addImage() {
    imageInputRef.current?.click();
  }

  function insertLocalImage(file: File | undefined) {
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

  function addAttachments(files: FileList | File[]) {
    const nextFiles = Array.from(files).map((file, index) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setAttachments((currentFiles) => [...currentFiles, ...nextFiles]);
  }

  function removeAttachment(id: string) {
    setAttachments((currentFiles) =>
      currentFiles.filter((file) => file.id !== id),
    );
  }

  return (
    <section className="grid w-full grid-cols-1 gap-6 xl:grid-cols-[minmax(360px,0.86fr)_1.22fr]">
      <section className="overflow-hidden rounded-lg border border-[#E8EAE8] bg-white shadow-[0_12px_30px_rgba(31,47,40,0.06)]">
        <div className="px-5 py-5">
          <h1 className="text-[18px] font-bold text-[#334155]">
            Target Audience
          </h1>
          <label className="relative mt-4 block">
            <HugeiconsIcon
              icon={Search01Icon}
              size={18}
              strokeWidth={1.8}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA5B5]"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search users by name or email"
              className="h-11 w-full rounded-lg border border-[#E2E6EA] bg-[#F8FAFD] pl-11 pr-4 text-[13px] font-medium text-[#334155] outline-none transition focus:border-[#66785F] focus:bg-white"
            />
          </label>
        </div>

        <div className="overflow-x-auto border-t border-[#EFF0EC]">
          <table className="w-full min-w-[520px] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[48px]" />
              <col className="w-[34%]" />
              <col className="w-[42%]" />
              <col className="w-[24%]" />
            </colgroup>
            <thead className="bg-[#FBFCFE]">
              <tr className="text-[10px] font-bold uppercase tracking-wide text-[#98A1AE]">
                <th className="px-4 py-4">
                  <span className="sr-only">Select</span>
                </th>
                <th className="px-3 py-4">Name</th>
                <th className="px-3 py-4">Email</th>
                <th className="px-3 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAudience.map((person) => {
                const selected = selectedIds.includes(person.id);

                return (
                  <tr
                    key={person.id}
                    className="border-t border-[#EFF0EC] text-[12px] font-semibold text-[#334155] transition hover:bg-[#F7F9F7]"
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleRecipient(person.id)}
                        className="h-4 w-4 rounded border-[#CBD4CE] accent-[#66785F]"
                        aria-label={`Select ${person.name}`}
                      />
                    </td>
                    <td className="px-3 py-4 align-middle">
                      <span className="block leading-4">{person.name}</span>
                    </td>
                    <td className="px-3 py-4 align-middle text-[#7B8490]">
                      <span className="block break-all leading-4">
                        {person.email}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center align-middle">
                      <StatusPill status={person.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-[#E8EAE8] bg-white p-5 shadow-[0_12px_30px_rgba(31,47,40,0.06)] sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="max-w-[190px] text-[18px] font-bold leading-6 text-[#334155]">
            Compose Campaign
          </h1>
          <button
            type="button"
            className="flex h-11 items-center justify-center gap-3 rounded-lg bg-[#66785F] px-8 text-[13px] font-bold text-white shadow-[0_5px_14px_rgba(31,47,40,0.18)] transition hover:bg-[#596B53]"
          >
            <HugeiconsIcon icon={MailSend01Icon} size={18} strokeWidth={1.8} />
            Send Email
          </button>
        </div>

        <div className="mt-7 space-y-5">
          <div>
            <p className="text-[12px] font-semibold leading-4 text-[#6F7670]">
              Recipients ({selectedRecipients.length} selected)
            </p>
            <div className="mt-2 flex min-h-12 flex-wrap items-center gap-2 rounded-lg border border-[#E2E6EA] bg-[#F8FAFD] px-3 py-2">
              {selectedRecipients.length > 0 ? (
                selectedRecipients.map((person) => (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => toggleRecipient(person.id)}
                    className="inline-flex min-h-7 items-center gap-2 rounded-md border border-[#DDE3EA] bg-white px-3 text-[11px] font-bold text-[#526052] transition hover:border-[#66785F]"
                  >
                    {person.name}
                    <span className="text-[#A0A8A0]">x</span>
                  </button>
                ))
              ) : (
                <span className="text-[12px] font-medium text-[#8A928B]">
                  Select recipients from the audience table.
                </span>
              )}
            </div>
          </div>

          <FormSelect
            label="Select Template"
            options={[
              "Monthly Product Update",
              "Renewal Reminder",
              "Feature Announcement",
            ]}
          />

          <label className="block">
            <span className="text-[12px] font-semibold text-[#6F7670]">
              Email Subject
            </span>
            <input
              defaultValue="Exciting New Updates to Your Workspace"
              className="mt-2 h-11 w-full rounded-lg border border-[#E2E6EA] bg-[#F8FAFD] px-4 text-[13px] font-bold text-[#334155] outline-none transition focus:border-[#66785F] focus:bg-white"
            />
          </label>

          <div>
            <p className="text-[12px] font-semibold text-[#6F7670]">
              Email Body
            </p>
            <div className="mt-2 overflow-hidden rounded-lg border border-[#E2E6EA] bg-white">
              <div className="flex flex-wrap items-center gap-1 border-b border-[#E2E6EA] bg-[#FBFCFE] px-3 py-2">
                <ToolbarButton label="Bold" onClick={() => runEditorCommand("bold")}>
                  B
                </ToolbarButton>
                <ToolbarButton
                  label="Italic"
                  onClick={() => runEditorCommand("italic")}
                >
                  <span className="italic">I</span>
                </ToolbarButton>
                <ToolbarButton
                  label="Underline"
                  onClick={() => runEditorCommand("underline")}
                >
                  <span className="underline">U</span>
                </ToolbarButton>
                <ToolbarDivider />
                <ToolbarButton
                  label="Align left"
                  onClick={() => runEditorCommand("justifyLeft")}
                >
                  <span className="text-[11px]">L</span>
                </ToolbarButton>
                <ToolbarButton
                  label="Align center"
                  onClick={() => runEditorCommand("justifyCenter")}
                >
                  <span className="text-[11px]">C</span>
                </ToolbarButton>
                <ToolbarButton
                  label="Align right"
                  onClick={() => runEditorCommand("justifyRight")}
                >
                  <span className="text-[11px]">R</span>
                </ToolbarButton>
                <ToolbarButton
                  label="Bulleted list"
                  onClick={() => runEditorCommand("insertUnorderedList")}
                >
                  <HugeiconsIcon
                    icon={LeftToRightListBulletIcon}
                    size={17}
                    strokeWidth={1.8}
                  />
                </ToolbarButton>
                <ToolbarButton
                  label="Numbered list"
                  onClick={() => runEditorCommand("insertOrderedList")}
                >
                  <HugeiconsIcon
                    icon={LeftToRightListNumberIcon}
                    size={17}
                    strokeWidth={1.8}
                  />
                </ToolbarButton>
                <ToolbarDivider />
                <ToolbarButton label="Add link" onClick={addLink}>
                  <HugeiconsIcon icon={Link01Icon} size={17} strokeWidth={1.8} />
                </ToolbarButton>
                <ToolbarButton label="Insert image" onClick={addImage}>
                  <HugeiconsIcon
                    icon={Image01Icon}
                    size={17}
                    strokeWidth={1.8}
                  />
                </ToolbarButton>
                <ToolbarButton
                  label="HTML block"
                  onClick={() => runEditorCommand("formatBlock", "blockquote")}
                  className="ml-auto"
                >
                  {"<>"}
                </ToolbarButton>
              </div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  insertLocalImage(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />

              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="min-h-[300px] px-7 py-7 text-[13px] font-medium leading-6 text-[#526052] outline-none [&_img]:my-3 [&_img]:max-w-full [&_img]:rounded-lg [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
              >
                <p>
                  <strong>Hi there,</strong>
                </p>
                <p>
                  We&apos;ve been working hard to bring you a better experience.
                  In our latest update, we&apos;ve introduced several key
                  features designed to streamline your administrative workflow:
                </p>
                <p>
                  <strong>Automated Reporting:</strong> Get insights delivered
                  straight to your inbox every Monday.
                  <br />
                  <strong>Smart Filters:</strong> Drill down into your user base
                  with surgical precision.
                  <br />
                  <strong>Performance Boost:</strong> The dashboard now loads
                  40% faster.
                </p>
                <p>
                  Check out the new features today and let us know what you
                  think!
                </p>
                <p>
                  Best regards,
                  <br />
                  The MailFlow Team
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[12px] font-semibold text-[#6F7670]">
              Attachments
            </p>
            <button
              type="button"
              onClick={() => attachmentInputRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                addAttachments(event.dataTransfer.files);
              }}
              className="mt-2 flex min-h-[120px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#DCCBFF] bg-[#FCFAFF] text-center text-[#7B6E92] transition hover:border-[#BFA7F5] hover:bg-[#F8F3FF]"
            >
              <HugeiconsIcon icon={Attachment01Icon} size={28} strokeWidth={1.8} />
              <span className="mt-3 text-[12px] font-bold">
                Click to upload or drag and drop
              </span>
              <span className="mt-1 text-[10px] font-medium">
                PDF, JPG, PNG, MP3 or ZIP (max. 10MB)
              </span>
            </button>
            <input
              ref={attachmentInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(event) => {
                if (event.target.files) {
                  addAttachments(event.target.files);
                }
                event.target.value = "";
              }}
            />
            {attachments.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {attachments.map((file) => (
                  <AttachmentCard
                    key={file.id}
                    file={file}
                    onRemove={() => removeAttachment(file.id)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </section>
  );
}

function StatusPill({ status }: { status: EmailAudience["status"] }) {
  const className =
    status === "Active"
      ? "bg-[#E2F4E7] text-[#27A15B]"
      : status === "Trial"
        ? "bg-[#FFF4C8] text-[#C5901F]"
        : "bg-[#EDF1F6] text-[#667085]";

  return (
    <span
      className={`inline-flex min-h-6 items-center justify-center rounded-full px-3 text-[9px] font-bold uppercase leading-none ${className}`}
    >
      {status}
    </span>
  );
}

function FormSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-[#6F7670]">{label}</span>
      <select className="mt-2 h-11 w-full rounded-lg border border-[#E2E6EA] bg-[#F8FAFD] px-4 text-[13px] font-bold text-[#334155] outline-none transition focus:border-[#66785F] focus:bg-white">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ToolbarButton({
  label,
  onClick,
  children,
  className = "",
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
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
      className={`flex h-8 min-w-8 items-center justify-center rounded px-2 text-[13px] font-bold text-[#263029] transition hover:bg-[#EEF2EE] ${className}`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <span className="mx-1 h-5 w-px bg-[#DDE2DD]" />;
}

function AttachmentCard({
  file,
  onRemove,
}: {
  file: AttachmentFile;
  onRemove: () => void;
}) {
  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-lg border border-[#E5E8EA] bg-white px-3 py-2 text-[11px] font-bold text-[#334155]">
      <span className="flex h-8 w-9 shrink-0 items-center justify-center rounded bg-[#EEF2FF] text-[10px] text-[#66785F]">
        {getFileLabel(file.name)}
      </span>
      <span className="min-w-0">
        <span className="block max-w-[180px] truncate">{file.name}</span>
        <span className="block text-[9px] font-semibold text-[#8A928B]">
          {formatFileSize(file.size)}
        </span>
      </span>
      <button
        type="button"
        aria-label={`Remove ${file.name}`}
        onClick={onRemove}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-[#9AA2A0] transition hover:bg-[#FFF0F0] hover:text-[#D84D4D]"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={1.8} />
      </button>
    </div>
  );
}

function getFileLabel(name: string) {
  const extension = name.split(".").pop()?.slice(0, 3).toUpperCase();

  return extension || "FILE";
}

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${Math.max(1, Math.round(size / (1024 * 1024)))}MB`;
  }

  return `${Math.max(1, Math.round(size / 1024))}KB`;
}
