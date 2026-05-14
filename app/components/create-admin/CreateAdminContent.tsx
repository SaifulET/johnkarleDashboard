"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ImageUploadIcon,
  UserAdd01Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";

export function CreateAdminContent() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageMessage, setProfileImageMessage] = useState(
    "PNG, JPG, or SVG up to 2MB",
  );
  const [profileImageError, setProfileImageError] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function uploadProfileImage(file: File | undefined) {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setProfileImageMessage("Please choose a valid image file.");
      setProfileImageError(true);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setProfileImageMessage("Image must be 2MB or smaller.");
      setProfileImageError(true);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setProfileImageMessage("Could not read that image.");
        setProfileImageError(true);
        return;
      }

      setProfileImage(reader.result);
      setProfileImageMessage(file.name);
      setProfileImageError(false);
    };

    reader.onerror = () => {
      setProfileImageMessage("Could not read that image.");
      setProfileImageError(true);
    };

    reader.readAsDataURL(file);
  }

  function handleProfileImageChange(event: ChangeEvent<HTMLInputElement>) {
    uploadProfileImage(event.target.files?.[0]);
    event.target.value = "";
  }

  function handleProfileImageDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    uploadProfileImage(event.dataTransfer.files?.[0]);
  }

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-lg border border-[#E2E6DF] bg-white shadow-[0_12px_30px_rgba(31,47,40,0.08)]">
        <div className="bg-[#66785F] px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <HugeiconsIcon
              icon={UserAdd01Icon}
              size={30}
              strokeWidth={1.7}
              className="hidden text-white sm:block"
            />
            <h1 className="text-[28px] font-bold leading-tight text-white sm:text-[34px]">
              Create Admin
            </h1>
          </div>
        </div>

        <form className="px-5 py-6 sm:px-7 sm:py-7">
          <div className="space-y-6">
            <AdminTextField label="Name" defaultValue="jhon doe" />
            <AdminTextField label="Email" defaultValue="abc@gmail.com" />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AdminPasswordField
                label="New Password"
                placeholder="Enter new password"
                visible={showNewPassword}
                onToggle={() => setShowNewPassword((visible) => !visible)}
              />
              <AdminPasswordField
                label="Confirm New Password"
                placeholder="Confirm new password"
                visible={showConfirmPassword}
                onToggle={() =>
                  setShowConfirmPassword((visible) => !visible)
                }
              />
            </div>

            <div>
              <label className="text-[15px] font-semibold text-[#3F4642]">
                Profile Image
              </label>
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleProfileImageDrop}
                className={`mt-3 flex min-h-[118px] w-full flex-col items-center justify-center rounded-lg border bg-[#F7F8F7] transition hover:border-[#AAB8A8] hover:bg-[#F2F4EE] ${
                  profileImageError
                    ? "border-[#D56A6A] text-[#B44444]"
                    : "border-[#E4E8E3] text-[#66785F]"
                }`}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Selected admin profile"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <HugeiconsIcon
                    icon={ImageUploadIcon}
                    size={24}
                    strokeWidth={1.7}
                  />
                )}
                <span className="mt-2 text-[14px] font-semibold">
                  {profileImage ? "Change Image" : "Upload Image"}
                </span>
                <span className="mt-1 text-[12px] font-medium">
                  {profileImageMessage}
                </span>
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleProfileImageChange}
              />
            </div>
          </div>

          <div className="mt-7 flex justify-center">
            <button
              type="button"
              className="h-12 w-full rounded-lg bg-[#66785F] px-8 text-[16px] font-bold text-white transition hover:bg-[#596B53] sm:max-w-[520px]"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function AdminTextField({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="block">
      <span className="text-[15px] font-semibold text-[#3F4642]">{label}</span>
      <input
        defaultValue={defaultValue}
        className="mt-3 h-11 w-full rounded-md border border-[#AEB4AE] bg-white px-3 text-[14px] font-medium text-[#334155] outline-none transition focus:border-[#66785F] focus:ring-2 focus:ring-[#66785F]/15"
      />
    </label>
  );
}

function AdminPasswordField({
  label,
  placeholder,
  visible,
  onToggle,
}: {
  label: string;
  placeholder: string;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="block">
      <span className="text-[15px] font-semibold text-[#3F4642]">{label}</span>
      <span className="relative mt-3 block">
        <input
          placeholder={placeholder}
          type={visible ? "text" : "password"}
          className="h-11 w-full rounded-md border border-[#AEB4AE] bg-white px-3 pr-12 text-[14px] font-medium text-[#334155] outline-none transition focus:border-[#66785F] focus:ring-2 focus:ring-[#66785F]/15"
        />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={onToggle}
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-[#334155] transition hover:bg-[#F2F4EE]"
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
