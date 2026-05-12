"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Edit02Icon,
  UserCircleIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";

type ProfileTab = "profile" | "password";

export function ProfileContent() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-lg border border-[#E2E6DF] bg-white shadow-[0_12px_30px_rgba(31,47,40,0.08)]">
        <header className="bg-[#66785F] px-5 py-5 sm:px-7">
          <h1 className="text-[30px] font-bold leading-tight text-white sm:text-[34px]">
            Profile
          </h1>
        </header>

        <div className="px-5 pb-12 pt-8 sm:px-8">
          <section className="flex flex-col items-center border-b border-[#F0F1EF] pb-7">
            <div className="relative">
              <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#E6EEE7] text-[#66785F] shadow-inner">
                <HugeiconsIcon
                  icon={UserCircleIcon}
                  size={76}
                  strokeWidth={1.35}
                />
              </span>
              <button
                type="button"
                aria-label="Edit profile image"
                className="absolute bottom-1 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#D6DDD3] text-[#66785F] shadow-sm transition hover:bg-[#C9D4C5]"
              >
                <HugeiconsIcon icon={Edit02Icon} size={17} strokeWidth={1.8} />
              </button>
            </div>
            <h2 className="mt-4 text-[30px] font-bold text-[#B8C7B1]">
              Mr. Admin
            </h2>
          </section>

          <div className="mt-5 flex justify-center gap-8 text-[13px] font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`border-b-2 pb-1 transition ${
                activeTab === "profile"
                  ? "border-[#66785F] text-[#66785F]"
                  : "border-transparent text-[#8B918B] hover:text-[#66785F]"
              }`}
            >
              Edit Profile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("password")}
              className={`border-b-2 pb-1 transition ${
                activeTab === "password"
                  ? "border-[#66785F] text-[#66785F]"
                  : "border-transparent text-[#8B918B] hover:text-[#66785F]"
              }`}
            >
              Change Password
            </button>
          </div>

          <div className="mx-auto mt-8 max-w-[520px]">
            {activeTab === "profile" ? <ProfileForm /> : <PasswordForm />}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileForm() {
  return (
    <form className="space-y-6">
      <ProfileField label="User Name" defaultValue="userdemo" />
      <ProfileField label="Email" defaultValue="email@gmail.com" />
      <ProfileField label="Contact No" defaultValue="+1 222 333 4444" />
      <button
        type="button"
        className="h-12 w-full rounded-md bg-[#66785F] text-[15px] font-bold text-white shadow-[0_4px_8px_rgba(31,47,40,0.16)] transition hover:bg-[#596B53]"
      >
        Update Profile
      </button>
    </form>
  );
}

function PasswordForm() {
  return (
    <form className="space-y-6">
      <ProfilePasswordField
        label="Current Password"
        placeholder="Enter current password"
      />
      <ProfilePasswordField
        label="New Password"
        placeholder="Enter new password"
      />
      <ProfilePasswordField
        label="Confirm Password"
        placeholder="Confirm new password"
      />
      <button
        type="button"
        className="h-12 w-full rounded-md bg-[#66785F] text-[15px] font-bold text-white shadow-[0_4px_8px_rgba(31,47,40,0.16)] transition hover:bg-[#596B53]"
      >
        Update Password
      </button>
    </form>
  );
}

function ProfilePasswordField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block">
      <span className="text-[15px] font-bold text-[#334155]">{label}</span>
      <span className="relative mt-2 block">
        <input
          placeholder={placeholder}
          type={visible ? "text" : "password"}
          className="h-11 w-full border border-[#AEB4AE] bg-white px-4 pr-12 text-[14px] font-medium text-[#334155] outline-none transition placeholder:text-[#9DA49E] focus:border-[#66785F] focus:ring-2 focus:ring-[#66785F]/15"
        />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((value) => !value)}
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-[#66785F] transition hover:bg-[#F2F4EE]"
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

function ProfileField({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[15px] font-bold text-[#334155]">{label}</span>
      <input
        defaultValue={defaultValue}
        type={type}
        className="mt-2 h-11 w-full border border-[#AEB4AE] bg-white px-4 text-[14px] font-medium text-[#334155] outline-none transition focus:border-[#66785F] focus:ring-2 focus:ring-[#66785F]/15"
      />
    </label>
  );
}
