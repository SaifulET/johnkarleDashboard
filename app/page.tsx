"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  AiChat01Icon,
  Alert01Icon,
  AnalysisTextLinkIcon,
  Analytics01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Calendar01Icon,
  Cancel01Icon,
  CancelCircleIcon,
  ChartBarLineIcon,
  CheckmarkCircle02Icon,
  CheckmarkSquare01Icon,
  CreditCardPosIcon,
  DashboardSquare01Icon,
  DatabaseIcon,
  Download01Icon,
  EyeIcon,
  FileDownloadIcon,
  FilterHorizontalIcon,
  Invoice01Icon,
  LockPasswordIcon,
  Logout01Icon,
  MailReceive01Icon,
  Menu01Icon,
  MoneyReceive01Icon,
  Notification01Icon,
  Wrench01Icon,
  Settings01Icon,
  Shield01Icon,
  Upload01Icon,
  User03Icon,
  UserAdd01Icon,
  UserCircleIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { AiInsightsContent } from "./components/ai-insights/AiInsightsContent";
import { BulkEmailContent } from "./components/bulk-email/BulkEmailContent";
import { ConfigureContent } from "./components/configure/ConfigureContent";
import { CreateAdminContent } from "./components/create-admin/CreateAdminContent";
import { ProfileContent } from "./components/profile/ProfileContent";
import { ReportsContent } from "./components/reports/ReportsContent";
import { SettingsContent } from "./components/settings/SettingsContent";
import { SubscriptionBillingContent as SubscriptionBillingPage } from "./components/subscription-billing/SubscriptionBillingContent";

type NavKey =
  | "dashboard"
  | "users"
  | "earning"
  | "billing"
  | "insights"
  | "admin"
  | "report"
  | "email"
  | "configure"
  | "settings";

type NavItem = {
  key: NavKey;
  label: string;
  icon: IconSvgElement;
};

type UserRecord = {
  id: string;
  name: string;
  initials: string;
  contact: string;
  phone: string;
  subscription: "Legacy" | "Pro" | "Basic";
  profiles: number;
  lastActive: string;
  status: "Active" | "Pending" | "Suspended";
  audience: "All Users" | "Internal";
  joined: string;
  region: string;
  role: string;
  storage: string;
  memories: number;
  aiConversations: number;
  risk: string;
  linkedProfiles: string[];
  billingHistory: { invoice: string; date: string; amount: string }[];
  activityLog: string[];
};

type TransactionRecord = {
  id: string;
  userName: string;
  userId: string;
  initials: string;
  audience: "All Users" | "Internal";
  subscription: "Legacy" | "Pro" | "Basic";
  plan: string;
  price: string;
  date: string;
  modalDate: string;
  accountNumber: string;
  email: string;
  status: "Paid" | "Pending" | "Refunded";
  method: string;
};


const navItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: DashboardSquare01Icon },
  { key: "users", label: "Users", icon: UserGroupIcon },
  { key: "earning", label: "Earning", icon: MoneyReceive01Icon },
  { key: "billing", label: "Subscription & Billing", icon: CreditCardPosIcon },
  { key: "insights", label: "Ai Insights", icon: AnalysisTextLinkIcon },
  { key: "admin", label: "Create Admin", icon: UserAdd01Icon },
  { key: "report", label: "Report", icon: Analytics01Icon },
  { key: "email", label: "Bulk Email", icon: MailReceive01Icon },
  { key: "configure", label: "Configure", icon: Wrench01Icon },
  { key: "settings", label: "Settings", icon: Settings01Icon },
];

const metrics = [
  {
    label: "Total Users",
    value: "12,480",
    note: "+2%",
    icon: UserGroupIcon,
    sparkline: "M2 25 C14 17, 22 27, 33 18 S52 14, 62 20",
  },
  {
    label: "Active Person Profiles",
    value: "4,210",
    note: "Consistent growth",
    icon: UserCircleIcon,
    sparkline: "M2 23 C16 20, 24 23, 33 21 S45 6, 62 18",
  },
  {
    label: "AI Conversations Today",
    value: "856",
    note: "High engagement",
    icon: AiChat01Icon,
    sparkline: "M2 21 C18 15, 26 21, 38 20 S54 20, 62 10",
  },
  {
    label: "Storage Usage",
    value: "6.4 PB",
    note: "64% of 10PB allocated",
    icon: DatabaseIcon,
    progress: 64,
  },
];

const activities = [
  {
    title: "New profile created for Elias Vance",
    time: "Today at 10:42 AM",
    tone: "bg-[#46624E]",
  },
  {
    title: 'Memory "First Steps" uploaded',
    time: "Today at 09:15 AM",
    tone: "bg-[#CAEAD5]",
  },
  {
    title: "Invite accepted by Sarah Chen",
    time: "Yesterday at 04:30 PM",
    tone: "bg-[#E9DDFD]",
  },
  {
    title: "AI conversation flagged for emotional review",
    time: "Yesterday at 02:11 PM",
    tone: "bg-[#FFDAD6]",
  },
];

const plans = [
  { label: "Pro Plan", value: "6,240", color: "bg-[#46624E]" },
  { label: "Basic Plan", value: "4,120", color: "bg-[#486554]" },
  { label: "Legacy", value: "850", color: "bg-[#605872]" },
];

const health = [
  { label: "AI Latency", value: "120ms", icon: ChartBarLineIcon },
  { label: "Vector DB", value: "99.9%", icon: Shield01Icon },
  { label: "Storage", value: "Healthy", icon: CheckmarkCircle02Icon },
  { label: "API Usage", value: "45%", icon: DatabaseIcon },
];

const notifications = [
  {
    title: "Flagged conversation in Sanctuary Alpha",
    description:
      "AI detected a potential safety violation in the 'Personal Legacy' thread of the Alpha group. Immediate review required to ensure compliance with sanctuary guidelines.",
    time: "2 mins ago",
    icon: Alert01Icon,
    iconClass: "bg-[#FFF0F0] text-[#E35757]",
    actions: [
      { label: "Review", style: "primary" },
      { label: "Dismiss", style: "ghost" },
    ],
  },
  {
    title: "New access request from Sarah Chen",
    description:
      "Sarah Chen has requested viewer access to the 'Chen Family Heritage' vault. Her identity has been verified through the lineage verification protocol.",
    time: "45 mins ago",
    icon: UserAdd01Icon,
    iconClass: "bg-[#DFF4E6] text-[#55725D]",
    actions: [
      { label: "Approve", style: "primary" },
      { label: "View Profile", style: "secondary" },
    ],
  },
  {
    title: "Consent log export complete",
    description:
      "The full compliance audit trail for Q3 is ready. This includes all user consent changes and AI processing permissions across the platform.",
    time: "5 hours ago",
    icon: Download01Icon,
    iconClass: "bg-[#EEF9F0] text-[#55725D]",
    actions: [{ label: "Download", style: "primary" }],
  },
];

const users: UserRecord[] = [
  {
    id: "LA-8892",
    name: "Evelyn Thorne",
    initials: "ET",
    contact: "evelyn.thorne@example.com",
    phone: "+1 (555) 012-3456",
    subscription: "Legacy",
    profiles: 12,
    lastActive: "2 hours ago",
    status: "Active",
    audience: "All Users",
    joined: "Jan 12, 2022",
    region: "North America",
    role: "Family Archive Owner",
    storage: "2.8 TB",
    memories: 1842,
    aiConversations: 326,
    risk: "Low",
    linkedProfiles: [
      "Arthur Thorne",
      "Elena Thorne",
      "Lucas Thorne",
      "Margaret Thorne",
      "Iris Vance",
      "Noah Ellis",
    ],
    billingHistory: [
      { invoice: "Inv #9982", date: "Oct 2023", amount: "$24.99" },
      { invoice: "Inv #9421", date: "Sep 2023", amount: "$24.99" },
      { invoice: "Inv #8874", date: "Aug 2023", amount: "$24.99" },
    ],
    activityLog: [
      "Uploaded 18 new family photos",
      "Approved viewer access for Arthur Thorne",
      "Completed 2FA verification by SMS",
      "Generated AI memory summary for Legacy Vault",
    ],
  },
  {
    id: "LA-9104",
    name: "Marcus Chen",
    initials: "MC",
    contact: "m.chen@designstudio.io",
    phone: "+1 (555) 987-6543",
    subscription: "Pro",
    profiles: 4,
    lastActive: "Yesterday",
    status: "Active",
    audience: "Internal",
    joined: "Mar 04, 2023",
    region: "Asia Pacific",
    role: "Workspace Admin",
    storage: "880 GB",
    memories: 548,
    aiConversations: 101,
    risk: "Low",
    linkedProfiles: ["Sarah Chen", "Lily Chen", "Andrew Chen", "Mei Chen"],
    billingHistory: [
      { invoice: "Inv #1041", date: "Oct 2023", amount: "$39.99" },
      { invoice: "Inv #1002", date: "Sep 2023", amount: "$39.99" },
    ],
    activityLog: [
      "Invited Sarah Chen as collaborator",
      "Exported consent records",
      "Updated profile visibility permissions",
    ],
  },
  {
    id: "LA-7721",
    name: "Sarah Jenkins",
    initials: "SJ",
    contact: "sarah.j@outlook.com",
    phone: "+1 (555) 234-5678",
    subscription: "Basic",
    profiles: 2,
    lastActive: "3 days ago",
    status: "Pending",
    audience: "All Users",
    joined: "Jun 18, 2023",
    region: "Europe",
    role: "Viewer",
    storage: "210 GB",
    memories: 96,
    aiConversations: 12,
    risk: "Medium",
    linkedProfiles: ["Thomas Jenkins", "Ava Jenkins"],
    billingHistory: [
      { invoice: "Inv #7390", date: "Oct 2023", amount: "$9.99" },
    ],
    activityLog: [
      "Started identity verification",
      "Requested access to Jenkins Heritage Vault",
      "Password reset requested",
    ],
  },
  {
    id: "LA-6540",
    name: "Robert Vance",
    initials: "RV",
    contact: "rvance@vanceholdings.com",
    phone: "+1 (555) 345-6789",
    subscription: "Legacy",
    profiles: 8,
    lastActive: "Oct 12, 2023",
    status: "Suspended",
    audience: "All Users",
    joined: "Nov 02, 2021",
    region: "North America",
    role: "Account Owner",
    storage: "1.7 TB",
    memories: 932,
    aiConversations: 211,
    risk: "High",
    linkedProfiles: ["Elias Vance", "Iris Vance", "Clara Vance", "June Vance"],
    billingHistory: [
      { invoice: "Inv #8232", date: "Sep 2023", amount: "$24.99" },
      { invoice: "Inv #7781", date: "Aug 2023", amount: "$24.99" },
    ],
    activityLog: [
      "Suspended after payment dispute",
      "Flagged conversation sent for review",
      "Admin note added by compliance team",
    ],
  },
  {
    id: "LA-4418",
    name: "Anika Rao",
    initials: "AR",
    contact: "anika.rao@lineage.ai",
    phone: "+1 (555) 456-0198",
    subscription: "Pro",
    profiles: 6,
    lastActive: "15 mins ago",
    status: "Active",
    audience: "Internal",
    joined: "Feb 15, 2022",
    region: "North America",
    role: "Support Specialist",
    storage: "1.1 TB",
    memories: 721,
    aiConversations: 408,
    risk: "Low",
    linkedProfiles: ["Rao Support Vault", "Training Archive", "Demo Family"],
    billingHistory: [
      { invoice: "Internal", date: "Oct 2023", amount: "$0.00" },
    ],
    activityLog: [
      "Reviewed 7 user support cases",
      "Resolved consent agreement question",
      "Viewed security audit trail",
    ],
  },
  {
    id: "LA-3087",
    name: "Julian Reed",
    initials: "JR",
    contact: "julian.reed@example.com",
    phone: "+1 (555) 221-7788",
    subscription: "Basic",
    profiles: 1,
    lastActive: "1 week ago",
    status: "Pending",
    audience: "All Users",
    joined: "Aug 25, 2023",
    region: "Europe",
    role: "Trial User",
    storage: "55 GB",
    memories: 33,
    aiConversations: 4,
    risk: "Medium",
    linkedProfiles: ["Julian Reed"],
    billingHistory: [
      { invoice: "Trial", date: "Oct 2023", amount: "$0.00" },
    ],
    activityLog: [
      "Started onboarding",
      "Uploaded profile photo",
      "Verification email sent",
    ],
  },
];

const transactions: TransactionRecord[] = [
  {
    id: "#12345678",
    userName: "Evelyn Thorne",
    userId: "LA-8892",
    initials: "ET",
    audience: "All Users",
    subscription: "Legacy",
    plan: "Monthly Subscription",
    price: "$75",
    date: "2 hours ago",
    modalDate: "02-24-2024",
    accountNumber: "**** **** **** *545",
    email: "evelyn.thorne@example.com",
    status: "Paid",
    method: "Visa ending 545",
  },
  {
    id: "#12345679",
    userName: "Evelyn Thorne",
    userId: "LA-8892",
    initials: "ET",
    audience: "All Users",
    subscription: "Pro",
    plan: "Monthly Subscription",
    price: "$25",
    date: "2 hours ago",
    modalDate: "02-24-2024",
    accountNumber: "**** **** **** *545",
    email: "evelyn.thorne@example.com",
    status: "Paid",
    method: "Visa ending 545",
  },
  {
    id: "#12345680",
    userName: "Marcus Chen",
    userId: "LA-9104",
    initials: "MC",
    audience: "Internal",
    subscription: "Basic",
    plan: "Team Seat Subscription",
    price: "$25",
    date: "Yesterday",
    modalDate: "02-23-2024",
    accountNumber: "**** **** **** *210",
    email: "m.chen@designstudio.io",
    status: "Paid",
    method: "Mastercard ending 210",
  },
  {
    id: "#12345681",
    userName: "Sarah Jenkins",
    userId: "LA-7721",
    initials: "SJ",
    audience: "All Users",
    subscription: "Legacy",
    plan: "Monthly Subscription",
    price: "$25",
    date: "2 hours ago",
    modalDate: "02-24-2024",
    accountNumber: "**** **** **** *884",
    email: "sarah.j@outlook.com",
    status: "Pending",
    method: "ACH transfer",
  },
  {
    id: "#12345682",
    userName: "Robert Vance",
    userId: "LA-6540",
    initials: "RV",
    audience: "All Users",
    subscription: "Legacy",
    plan: "Annual Legacy Plan",
    price: "$250",
    date: "Oct 12, 2023",
    modalDate: "10-12-2023",
    accountNumber: "**** **** **** *731",
    email: "rvance@vanceholdings.com",
    status: "Refunded",
    method: "Visa ending 731",
  },
  {
    id: "#12345683",
    userName: "Anika Rao",
    userId: "LA-4418",
    initials: "AR",
    audience: "Internal",
    subscription: "Pro",
    plan: "Internal Pro Workspace",
    price: "$0",
    date: "15 mins ago",
    modalDate: "02-24-2024",
    accountNumber: "Internal billing",
    email: "anika.rao@lineage.ai",
    status: "Paid",
    method: "Internal comp",
  },
];


function Icon({
  icon,
  size = 30,
  className = "",
}: {
  icon: IconSvgElement;
  size?: 20 | 30;
  className?: string;
}) {
  const dimensionClass = size === 20 ? "h-5 w-5" : "h-[30px] w-[30px]";

  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={1.7}
      className={`${dimensionClass} shrink-0 ${className}`}
    />
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState<NavKey>("billing");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [contentView, setContentView] = useState<
    "nav" | "notifications" | "profile"
  >("nav");

  const activeLabel = useMemo(
    () => navItems.find((item) => item.key === activeNav)?.label ?? "Dashboard",
    [activeNav],
  );

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#263029]">
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-10 h-[112px] bg-[#FAFAF7] md:h-[136px]"
      />
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-[#263029]/20 md:hidden"
        />
      ) : null}
      <Sidebar
        activeNav={activeNav}
        isOpen={sidebarOpen}
        onLogout={() => setLogoutOpen(true)}
        onChange={(key) => {
          setActiveNav(key);
          setContentView("nav");
          setSidebarOpen(false);
        }}
      />
      <Topbar
        onMenuClick={() => setSidebarOpen((open) => !open)}
        onNotificationsClick={() => setContentView("notifications")}
        onProfileClick={() => setContentView("profile")}
      />

      <section className="px-4 pb-6 pt-[112px] sm:px-6 md:pl-[352px] md:pr-8 md:pt-[136px] md:pb-8">
        {contentView === "notifications" ? (
          <NotificationsContent />
        ) : contentView === "profile" ? (
          <ProfileContent />
        ) : activeNav === "dashboard" ? (
          <DashboardContent />
        ) : activeNav === "users" ? (
          <UserManagementContent />
        ) : activeNav === "earning" ? (
          <EarningsManagementContent />
        ) : activeNav === "billing" ? (
          <SubscriptionBillingPage />
        ) : activeNav === "insights" ? (
          <AiInsightsContent />
        ) : activeNav === "admin" ? (
          <CreateAdminContent />
        ) : activeNav === "report" ? (
          <ReportsContent />
        ) : activeNav === "email" ? (
          <BulkEmailContent />
        ) : activeNav === "configure" ? (
          <ConfigureContent />
        ) : activeNav === "settings" ? (
          <SettingsContent />
        ) : (
          <PlaceholderContent title={activeLabel} />
        )}
      </section>
      <LogoutConfirmModal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => {
          window.location.href = "/auth/signin";
        }}
      />
    </main>
  );
}

function Sidebar({
  activeNav,
  isOpen,
  onLogout,
  onChange,
}: {
  activeNav: NavKey;
  isOpen: boolean;
  onLogout: () => void;
  onChange: (key: NavKey) => void;
}) {
  return (
    <aside
      className={`fixed bottom-4 left-4 top-4 z-40 flex w-[min(calc(100vw-2rem),288px)] flex-col rounded-lg bg-white px-5 py-6 shadow-[0_18px_45px_rgba(31,47,40,0.14)] transition-transform duration-200 md:bottom-8 md:left-8 md:top-8 md:w-[288px] md:px-7 md:py-8 ${
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)] md:translate-x-0"
      }`}
    >
      <div className="flex justify-center">
        <Image src="/logo.png" alt="Lineage.AI" width={150} height={126} />
      </div>

      <nav className="mt-9 flex flex-1 flex-col gap-3">
        {navItems.map((item) => {
          const isActive = item.key === activeNav;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChange(item.key)}
              className={`flex min-h-[50px] w-full items-center gap-3 rounded px-5 text-left text-[16px] font-medium transition ${
                isActive
                  ? "bg-[#4B5F45] text-white"
                  : "text-[#6D7A69] hover:bg-[#F2F4EE] hover:text-[#46624E]"
              }`}
            >
              <Icon icon={item.icon} size={20} />
              <span className="leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="flex min-h-[48px] items-center gap-3 rounded px-5 text-left text-[14px] font-medium text-[#FF8E8E] transition hover:bg-[#FFF2F2]"
      >
        <Icon icon={Logout01Icon} size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

function Topbar({
  onMenuClick,
  onNotificationsClick,
  onProfileClick,
}: {
  onMenuClick: () => void;
  onNotificationsClick: () => void;
  onProfileClick: () => void;
}) {
  return (
    <header className="fixed left-4 right-4 top-4 z-20 flex h-[72px] items-center justify-between rounded-lg bg-white px-3 shadow-[0_14px_35px_rgba(31,47,40,0.07)] sm:px-5 md:left-[352px] md:right-8 md:top-8 md:px-6">
      <div className="flex min-w-0 items-center gap-3 sm:gap-5">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
          className="flex h-[42px] w-[42px] items-center justify-center rounded text-[#52614F] transition hover:bg-[#F2F4EE]"
        >
          <Icon icon={Menu01Icon} size={20} />
        </button>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-bold leading-tight text-[#28322B] sm:text-[17px]">
            Welcome, James
          </p>
          <p className="mt-1 hidden text-[12px] font-medium text-[#7C837C] sm:block">
            Have a nice day!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <IconButton
          label="Notifications"
          icon={Notification01Icon}
          hasBadge
          onClick={onNotificationsClick}
        />
        <IconButton label="Profile" icon={User03Icon} onClick={onProfileClick} />
      </div>
    </header>
  );
}

function IconButton({
  label,
  icon,
  hasBadge = false,
  onClick,
}: {
  label: string;
  icon: IconSvgElement;
  hasBadge?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#95A092] text-[#52614F] transition hover:bg-[#F2F4EE]"
    >
      <Icon icon={icon} size={20} />
      {hasBadge ? (
        <span className="absolute right-2 top-2 h-3 w-3 rounded-full border-2 border-white bg-[#FF4D4D]" />
      ) : null}
    </button>
  );
}

function LogoutConfirmModal({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-white/80 px-4">
      <section className="w-full max-w-[380px] rounded-lg bg-white px-7 py-8 text-center shadow-[0_24px_70px_rgba(31,47,40,0.18)]">
        <h2 className="text-[28px] font-bold leading-tight text-[#0F172A]">
          Confirm logging out!
        </h2>
        <div className="mt-7 grid grid-cols-2 gap-5">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 rounded border border-[#5B5BFF] text-[14px] font-bold text-[#5B5BFF] transition hover:bg-[#F2F2FF]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 rounded bg-[#FF4B4B] text-[14px] font-bold text-white transition hover:bg-[#E84343]"
          >
            Yes, Confirm
          </button>
        </div>
      </section>
    </div>
  );
}

function NotificationsContent() {
  return (
    <section className="w-full">
      <div>
        <h1 className="text-[32px] font-bold leading-tight text-[#172235]">
          Notifications Center
        </h1>
        <p className="mt-3 text-[16px] font-medium text-[#626A64]">
          Stay updated with system activities, security events, and user
          requests.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {notifications.map((notification) => (
          <article
            key={notification.title}
            className="grid min-h-[160px] gap-5 rounded-lg border border-[#E6E6E0] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(31,47,40,0.05)] sm:grid-cols-[56px_1fr_auto] sm:px-7 sm:py-7"
          >
            <span
              className={`mt-1 flex h-12 w-12 items-center justify-center rounded-full ${notification.iconClass}`}
            >
              <Icon icon={notification.icon} />
            </span>

            <div className="min-w-0 max-w-[690px]">
              <h2 className="text-[16px] font-bold leading-6 text-[#263247]">
                {notification.title}
              </h2>
              <p className="mt-2 text-[15px] font-medium leading-7 text-[#686F6A]">
                {notification.description}
              </p>

              <div className="mt-5 flex items-center gap-4">
                {notification.actions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    className={
                      action.style === "primary"
                        ? "min-h-[42px] rounded bg-[#46624E] px-6 text-[14px] font-semibold text-white transition hover:bg-[#3D5745]"
                        : action.style === "secondary"
                          ? "min-h-[42px] rounded border border-[#D6DAD4] bg-white px-6 text-[14px] font-semibold text-[#687168] transition hover:bg-[#F2F4EE]"
                          : "min-h-[42px] rounded px-2 text-[14px] font-semibold text-[#687168] transition hover:text-[#46624E]"
                    }
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="pt-1 text-left text-[13px] font-medium text-[#8A928B] sm:text-right">
              {notification.time}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center">
        <p className="text-[13px] font-medium text-[#8D958E]">
          Showing 5 of 24 notifications
        </p>
        <button
          type="button"
          className="mt-4 flex min-h-[48px] items-center gap-2 rounded-full border border-[#D6DAD4] bg-white px-7 text-[15px] font-semibold text-[#6A7869] transition hover:bg-[#F2F4EE] hover:text-[#46624E]"
        >
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={18}
            strokeWidth={1.8}
            className="h-[18px] w-[18px]"
          />
          <span>Load more notifications</span>
        </button>
      </div>
    </section>
  );
}

function DashboardContent() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-[30px] font-bold leading-tight text-[#253043]">
          Good Morning, Sarah
        </h1>
        <p className="mt-2 text-[15px] text-[#788078]">
          The sanctuary is thriving. 12 new memories were preserved today.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:h-[505.77px] xl:grid-cols-[minmax(0,1fr)_316px]">
        <ActivityFeed />
        <SubscriptionInsights />
      </section>

      <section>
        <h2 className="mb-4 text-[18px] font-bold text-[#2D384B]">
          AI System Health
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {health.map((item) => (
            <article
              key={item.label}
              className="flex h-[74px] items-center gap-4 rounded-lg border border-[#E6E6E0] bg-white px-6 shadow-[0_12px_30px_rgba(31,47,40,0.06)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF5ED] text-[#55725D]">
                <Icon icon={item.icon} />
              </span>
              <div>
                <p className="text-[12px] font-medium text-[#8A928B]">
                  {item.label}
                </p>
                <p className="mt-1 text-[14px] font-bold text-[#2B3748]">
                  {item.value}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({ metric }: { metric: (typeof metrics)[number] }) {
  return (
    <article className="flex h-[190px] flex-col justify-between rounded-lg border border-[#E6E6E0] bg-white p-6 shadow-[0_12px_30px_rgba(31,47,40,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="max-w-[150px] text-[14px] font-medium leading-5 text-[#7B827B]">
            {metric.label}
          </p>
          <p className="mt-2 text-[24px] font-bold text-[#2B3748]">
            {metric.value}
          </p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF5ED] text-[#55725D]">
          <Icon icon={metric.icon} />
        </span>
      </div>

      {"progress" in metric ? (
        <div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#E5E2D9]">
            <div
              className="h-full rounded-full bg-[#6C815F]"
              style={{ width: `${metric.progress}%` }}
            />
          </div>
          <p className="mt-3 text-[13px] leading-5 text-[#828980]">
            {metric.note}
          </p>
        </div>
      ) : (
        <div className="flex items-end justify-between gap-3">
          <p className="text-[13px] font-medium text-[#6F826C]">
            {metric.note}
          </p>
          <svg
            aria-hidden="true"
            className="h-9 w-[72px] text-[#6C815F]"
            viewBox="0 0 64 32"
            fill="none"
          >
            <path
              d={metric.sparkline}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </article>
  );
}

function ActivityFeed() {
  return (
    <article className="flex h-[505.75px] flex-col items-start gap-6 rounded-[16px] border border-[#E8E6E1] bg-white px-8 pb-[165.39px] pt-8 shadow-[0_4px_20px_rgba(63,91,75,0.05)]">
      <div className="flex h-[30px] w-full items-center justify-between gap-6">
        <h2 className="flex h-[30px] items-center text-[20px] font-medium leading-[30px] text-[#111C2D]">
          Recent Activity Feed
        </h2>
        <button
          type="button"
          className="flex h-[25.59px] items-center text-center text-[16px] font-normal leading-[26px] text-[#46624E] hover:text-[#314D3D]"
        >
          View All
        </button>
      </div>

      <div className="relative flex h-[252.36px] w-full flex-col items-start gap-6">
        <span className="absolute bottom-[7.98px] left-[11px] top-2 w-px bg-[#C2C8C0]" />
        {activities.map((activity, index) => (
          <div
            key={activity.title}
            className="relative z-[1] flex h-[45.09px] w-full items-start pl-8"
          >
            <span
              className={`absolute left-0 top-1 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${activity.tone}`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 13 10"
                className={`h-[9.33px] ${
                  index === 2 ? "w-[11.67px]" : "w-[12.83px]"
                } ${
                  index === 0
                    ? "text-white"
                    : index === 2
                      ? "text-[#605872]"
                      : index === 3
                        ? "text-[#BA1A1A]"
                        : "text-[#46624E]"
                }`}
              >
                <path
                  d="M1 5.1 4.6 8.5 12 1"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <div className="min-w-0">
              <p
                className={`truncate text-[16px] leading-[26px] text-[#111C2D] ${
                  index === 0 ? "font-bold" : "font-normal"
                }`}
              >
                {activity.title}
              </p>
              <p className="text-[13px] font-normal leading-5 text-[#424843] opacity-60">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function SubscriptionInsights() {
  return (
    <article className="flex h-[505.77px] flex-col items-start gap-[23px] rounded-[16px] border border-[#E8E6E1] bg-white p-8 shadow-[0_4px_20px_rgba(63,91,75,0.05)]">
      <h2 className="flex h-[30px] w-full items-center text-[20px] font-medium leading-[30px] text-[#111C2D]">
        Subscription Insights
      </h2>
      <div className="flex w-full flex-col items-start gap-[3.01px]">
        <p className="flex h-[26.59px] w-full items-center text-[16px] font-normal leading-[26px] text-[#424843]">
          Current MRR
        </p>
        <p className="flex h-[45.8px] w-full items-center text-[32px] font-semibold leading-[45px] tracking-[-0.64px] text-[#111C2D]">
          $142,480
        </p>
      </div>

      <div className="flex w-full flex-col items-start gap-4 py-[9px]">
        {plans.map((plan) => (
          <div
            key={plan.label}
            className="flex h-[49.59px] w-full items-center justify-between rounded-[12px] bg-[#F0F3FF] p-3 text-[16px] leading-[26px] text-[#111C2D]"
          >
            <span className="flex items-center gap-3 font-normal">
              <span className={`h-3 w-3 rounded-full ${plan.color}`} />
              {plan.label}
            </span>
            <span className="font-bold">{plan.value}</span>
          </div>
        ))}
      </div>

      <div className="flex h-[66.59px] w-full flex-col items-start gap-2 border-t border-[#E8E6E1] pt-6">
        <div className="flex h-[25.59px] w-full items-center justify-between text-[16px] leading-[26px]">
          <span className="font-normal text-[#424843]">Trial Conversions</span>
          <span className="font-bold text-[#46624E]">12.5%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#F5F2EB]">
          <div className="h-full w-[12.5%] bg-[#46624E]" />
        </div>
      </div>
    </article>
  );
}

function UserManagementContent() {
  const [audience, setAudience] = useState<"All Users" | "Internal">(
    "All Users",
  );
  const [statusFilter, setStatusFilter] = useState<"All" | UserRecord["status"]>(
    "All",
  );
  const [planFilter, setPlanFilter] = useState<
    "All" | UserRecord["subscription"]
  >("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const pageSize = 4;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesAudience =
        audience === "All Users" || user.audience === "Internal";
      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;
      const matchesPlan =
        planFilter === "All" || user.subscription === planFilter;

      return matchesAudience && matchesStatus && matchesPlan;
    });
  }, [audience, planFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function resetFilters() {
    setStatusFilter("All");
    setPlanFilter("All");
    setPage(1);
  }

  function exportUsers() {
    const headers = [
      "Name",
      "ID",
      "Email",
      "Phone",
      "Subscription",
      "Profiles",
      "Last Active",
      "Status",
      "Region",
    ];
    const rows = filteredUsers.map((user) => [
      user.name,
      user.id,
      user.contact,
      user.phone,
      user.subscription,
      String(user.profiles),
      user.lastActive,
      user.status,
      user.region,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lineage-users.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <section className="w-full">
        <div className="flex flex-col items-stretch justify-between gap-5 xl:flex-row xl:items-start">
          <div>
            <h1 className="text-[30px] font-bold leading-tight text-[#172235]">
              User Management
            </h1>
            <p className="mt-3 max-w-[520px] text-[15px] font-medium leading-6 text-[#626A64]">
              Monitor, manage and support all registered accounts within the
              Lineage.AI ecosystem.
            </p>
          </div>

          <div className="relative flex flex-wrap items-center gap-3 xl:pt-9">
            <div className="flex h-10 overflow-hidden rounded-lg border border-[#E2E6EA] bg-white p-1 shadow-sm">
              {(["All Users", "Internal"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setAudience(item);
                    setPage(1);
                  }}
                  className={`rounded-md px-5 text-[13px] font-bold transition ${
                    audience === item
                      ? "bg-[#F2F4FF] text-[#334155]"
                      : "text-[#7B827B] hover:text-[#46624E]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              className="flex h-10 items-center gap-2 rounded-lg border border-[#D6DAD4] bg-white px-4 text-[13px] font-bold text-[#5E685F] shadow-sm transition hover:bg-[#F2F4EE]"
            >
              <HugeiconsIcon
                icon={FilterHorizontalIcon}
                size={18}
                strokeWidth={1.8}
                className="h-[18px] w-[18px]"
              />
              Filters
            </button>

            <button
              type="button"
              onClick={exportUsers}
              className="flex h-10 items-center gap-2 rounded-lg border border-[#D6DAD4] bg-white px-4 text-[13px] font-bold text-[#5E685F] shadow-sm transition hover:bg-[#F2F4EE]"
            >
              <HugeiconsIcon
                icon={Upload01Icon}
                size={18}
                strokeWidth={1.8}
                className="h-[18px] w-[18px]"
              />
              Export
            </button>

            {filtersOpen ? (
              <div className="absolute right-0 top-12 z-10 w-[min(calc(100vw-2rem),280px)] rounded-lg border border-[#E0E3DE] bg-white p-5 shadow-[0_18px_45px_rgba(31,47,40,0.12)] xl:right-[86px] xl:top-[88px]">
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#6F826C]">
                  Table Filters
                </p>
                <label className="mt-4 block">
                  <span className="text-[13px] font-semibold text-[#5E685F]">
                    Status
                  </span>
                  <select
                    value={statusFilter}
                    onChange={(event) => {
                      setStatusFilter(
                        event.target.value as "All" | UserRecord["status"],
                      );
                      setPage(1);
                    }}
                    className="mt-2 h-10 w-full rounded border border-[#D6DAD4] bg-[#FAFAF7] px-3 text-[13px] font-medium text-[#334155] outline-none"
                  >
                    <option>All</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Suspended</option>
                  </select>
                </label>
                <label className="mt-4 block">
                  <span className="text-[13px] font-semibold text-[#5E685F]">
                    Subscription
                  </span>
                  <select
                    value={planFilter}
                    onChange={(event) => {
                      setPlanFilter(
                        event.target.value as
                          | "All"
                          | UserRecord["subscription"],
                      );
                      setPage(1);
                    }}
                    className="mt-2 h-10 w-full rounded border border-[#D6DAD4] bg-[#FAFAF7] px-3 text-[13px] font-medium text-[#334155] outline-none"
                  >
                    <option>All</option>
                    <option>Legacy</option>
                    <option>Pro</option>
                    <option>Basic</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 h-10 w-full rounded bg-[#46624E] text-[13px] font-bold text-white transition hover:bg-[#3D5745]"
                >
                  Clear Filters
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-7 overflow-hidden rounded-lg border border-[#E6E6E0] bg-white shadow-[0_12px_30px_rgba(31,47,40,0.06)]">
          <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse text-left">
            <thead className="bg-[#FBFBFA]">
              <tr className="text-[11px] font-bold uppercase tracking-wide text-[#7B827B]">
                <th className="px-7 py-5">User Name</th>
                <th className="px-5 py-5">Contact</th>
                <th className="px-5 py-5">Subscription</th>
                <th className="px-5 py-5">Profiles</th>
                <th className="px-5 py-5">Last Active</th>
                <th className="px-5 py-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {pageUsers.length > 0 ? (
                pageUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    tabIndex={0}
                    role="button"
                    onClick={() => setSelectedUser(user)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        setSelectedUser(user);
                      }
                    }}
                    className="cursor-pointer border-t border-[#EFF0EC] bg-white transition hover:bg-[#F2F4EE]"
                  >
                    <td className="px-7 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar user={user} size="sm" />
                        <div>
                          <p className="text-[13px] font-bold leading-5 text-[#28334A]">
                            {user.name}
                          </p>
                          <p className="text-[12px] font-medium text-[#6F7670]">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <p className="text-[13px] font-medium text-[#334155]">
                        {user.contact}
                      </p>
                      <p className="mt-1 text-[12px] font-medium text-[#6F7670]">
                        {user.phone}
                      </p>
                    </td>
                    <td className="px-5 py-5">
                      <SubscriptionBadge plan={user.subscription} />
                    </td>
                    <td className="px-5 py-5 text-[13px] font-bold text-[#334155]">
                      {user.profiles}
                    </td>
                    <td className="px-5 py-5 text-[13px] font-medium text-[#334155]">
                      {user.lastActive}
                    </td>
                    <td className="px-5 py-5">
                      <StatusBadge status={user.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-7 py-12 text-center text-[14px] font-medium text-[#7B827B]"
                  >
                    No users match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-[#EFF0EC] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-[12px] font-medium text-[#6F7670]">
              Showing {(currentPage - 1) * pageSize + (pageUsers.length ? 1 : 0)}{" "}
              to {(currentPage - 1) * pageSize + pageUsers.length} of{" "}
              {filteredUsers.length} users
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="flex h-8 w-8 items-center justify-center rounded text-[#647064] transition hover:bg-[#F2F4EE] disabled:opacity-35"
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={18}
                  strokeWidth={1.8}
                />
              </button>
              {[1, 2, 3].map((item) => (
                <button
                  key={item}
                  type="button"
                  disabled={item > totalPages}
                  onClick={() => setPage(item)}
                  className={`h-8 min-w-8 rounded px-3 text-[13px] font-bold transition disabled:opacity-35 ${
                    currentPage === item
                      ? "bg-[#46624E] text-white"
                      : "text-[#647064] hover:bg-[#F2F4EE]"
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((value) => Math.min(totalPages, value + 1))
                }
                className="flex h-8 w-8 items-center justify-center rounded text-[#647064] transition hover:bg-[#F2F4EE] disabled:opacity-35"
              >
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  strokeWidth={1.8}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <UserDetailsDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </>
  );
}

function Avatar({
  user,
  size = "md",
}: {
  user: Pick<UserRecord, "initials" | "name">;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "h-20 w-20 text-[22px]" : size === "md" ? "h-10 w-10" : "h-8 w-8 text-[11px]";

  return (
    <span
      aria-label={user.name}
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full border-2 border-white bg-[linear-gradient(135deg,#21352C,#91B4A0)] font-bold text-white shadow-sm`}
    >
      {user.initials}
    </span>
  );
}

function SubscriptionBadge({ plan }: { plan: UserRecord["subscription"] }) {
  const className =
    plan === "Pro"
      ? "bg-[#55725D] text-white"
      : plan === "Legacy"
        ? "bg-[#D7F2DE] text-[#55725D]"
        : "bg-[#E7ECFA] text-[#64718C]";

  return (
    <span
      className={`inline-flex min-h-[24px] items-center rounded-full px-3 text-[11px] font-bold ${className}`}
    >
      {plan}
    </span>
  );
}

function StatusBadge({ status }: { status: UserRecord["status"] }) {
  const dot =
    status === "Active"
      ? "bg-[#55725D]"
      : status === "Suspended"
        ? "bg-[#D92D2D]"
        : "bg-[#8C928A]";
  const text = status === "Suspended" ? "text-[#D92D2D]" : "text-[#526052]";

  return (
    <span className={`inline-flex items-center gap-2 text-[12px] font-bold ${text}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

function UserDetailsDrawer({
  user,
  onClose,
}: {
  user: UserRecord | null;
  onClose: () => void;
}) {
  const [displayUser, setDisplayUser] = useState<UserRecord | null>(user);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayUser(user);
      const timeout = window.setTimeout(() => setIsVisible(true), 20);

      return () => window.clearTimeout(timeout);
    }

    setIsVisible(false);
    const timeout = window.setTimeout(() => setDisplayUser(null), 320);

    return () => window.clearTimeout(timeout);
  }, [user]);

  if (!displayUser) {
    return null;
  }

  const visibleProfiles = displayUser.linkedProfiles.slice(0, 3);
  const remainingProfiles = Math.max(0, displayUser.linkedProfiles.length - 3);

  return (
    <>
      <button
        type="button"
        aria-label="Close user details"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-[#263029]/20 transition-opacity duration-300 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full flex-col border-l border-[#E6E6E0] bg-white shadow-[-18px_0_45px_rgba(31,47,40,0.12)] transition-transform duration-300 ease-out sm:w-[390px] ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#ECEDEA] px-5">
          <h2 className="text-[17px] font-bold text-[#334155]">User Details</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close user details"
            className="flex h-9 w-9 items-center justify-center rounded text-[#334155] transition hover:bg-[#F2F4EE]"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.8} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 pb-8 pt-9">
          <section className="flex flex-col items-center">
            <Avatar user={displayUser} size="lg" />
            <h3 className="mt-4 text-[22px] font-bold text-[#2D384B]">
              {displayUser.name}
            </h3>
            <SubscriptionBadge plan={displayUser.subscription} />
          </section>

          <section className="mt-7 rounded-lg bg-[#F6F7FF] p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#667085]">
              Core Information
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
              <InfoItem label="Email Address" value={displayUser.contact} />
              <InfoItem label="Phone Number" value={displayUser.phone} />
              <InfoItem label="Joined Date" value={displayUser.joined} />
              <InfoItem label="Region" value={displayUser.region} />
              <InfoItem label="Account ID" value={displayUser.id} />
              <InfoItem label="Risk Level" value={displayUser.risk} />
            </div>
          </section>

          <section className="mt-7">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#334155]">
                Linked Profiles ({displayUser.profiles})
              </p>
              <button
                type="button"
                className="text-[11px] font-bold text-[#46624E]"
              >
                View All
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {visibleProfiles.map((profile) => (
                <div
                  key={profile}
                  className="flex min-h-[48px] items-center gap-3 rounded-lg border border-[#E6E6E0] bg-white px-3"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#21352C] text-[10px] font-bold text-white">
                    {profile
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span className="text-[12px] font-bold text-[#334155]">
                    {profile}
                  </span>
                </div>
              ))}
              {remainingProfiles > 0 ? (
                <button
                  type="button"
                  className="min-h-[48px] rounded-lg border border-dashed border-[#C9CEC7] text-[12px] font-semibold text-[#6F7670]"
                >
                  +{remainingProfiles} more
                </button>
              ) : null}
            </div>
          </section>

          <section className="mt-7">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#334155]">
              Billing History Overview
            </p>
            <div className="mt-4 space-y-4">
              {displayUser.billingHistory.map((item) => (
                <div
                  key={`${item.invoice}-${item.date}`}
                  className="flex items-center justify-between text-[12px] font-bold text-[#334155]"
                >
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Invoice01Icon}
                      size={18}
                      strokeWidth={1.8}
                      className="text-[#667085]"
                    />
                    {item.invoice} - {item.date}
                  </span>
                  <span>{item.amount}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7 space-y-3">
            <DrawerLink
              icon={LockPasswordIcon}
              title="2FA Enabled"
              description="Protected via SMS"
            />
            <DrawerLink
              icon={CheckmarkSquare01Icon}
              title="Consents Agreement"
              description="Privacy V2.1 Signed"
            />
            <DrawerLink
              icon={Calendar01Icon}
              title="Next Review"
              description="Scheduled compliance check in 18 days"
            />
          </section>

          <section className="mt-7 rounded-lg border border-[#E6E6E0] p-5">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#334155]">
              Usage Summary
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <InfoStat label="Storage" value={displayUser.storage} />
              <InfoStat label="Memories" value={String(displayUser.memories)} />
              <InfoStat
                label="AI Chats"
                value={String(displayUser.aiConversations)}
              />
              <InfoStat label="Role" value={displayUser.role} />
            </div>
          </section>

          <section className="mt-7">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#334155]">
              Recent Activity
            </p>
            <div className="mt-4 space-y-4">
              {displayUser.activityLog.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#55725D]" />
                  <p className="text-[13px] font-medium leading-5 text-[#626A64]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <button
            type="button"
            className="mt-10 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#E35757] text-[13px] font-bold text-[#D92D2D] transition hover:bg-[#FFF0F0]"
          >
            <HugeiconsIcon icon={CancelCircleIcon} size={18} strokeWidth={1.8} />
            Suspend Account Access
          </button>
        </div>
      </aside>
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium text-[#747C76]">{label}</p>
      <p className="mt-1 break-words text-[13px] font-bold leading-5 text-[#334155]">
        {value}
      </p>
    </div>
  );
}
function InfoStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#FAFAF7] p-3">
      <p className="text-[11px] font-semibold text-[#747C76]">{label}</p>
      <p className="mt-1 text-[14px] font-bold text-[#334155]">{value}</p>
    </div>
  );
}

function DrawerLink({
  icon,
  title,
  description,
}: {
  icon: IconSvgElement;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      className="flex min-h-[64px] w-full items-center justify-between rounded-lg border border-[#E6E6E0] bg-[#FBFCFD] px-4 text-left transition hover:bg-[#F2F4EE]"
    >
      <span className="flex items-center gap-3">
        <HugeiconsIcon
          icon={icon}
          size={24}
          strokeWidth={1.8}
          className="text-[#55725D]"
        />
        <span>
          <span className="block text-[13px] font-bold text-[#334155]">
            {title}
          </span>
          <span className="mt-1 block text-[11px] font-medium text-[#747C76]">
            {description}
          </span>
        </span>
      </span>
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        size={18}
        strokeWidth={1.8}
        className="text-[#334155]"
      />
    </button>
  );
}

function EarningsManagementContent() {
  const [audience, setAudience] = useState<"All Users" | "Internal">(
    "All Users",
  );
  const [planFilter, setPlanFilter] = useState<
    "All" | TransactionRecord["subscription"]
  >("All");
  const [statusFilter, setStatusFilter] = useState<
    "All" | TransactionRecord["status"]
  >("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionRecord | null>(null);
  const pageSize = 4;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesAudience =
        audience === "All Users" || transaction.audience === "Internal";
      const matchesPlan =
        planFilter === "All" || transaction.subscription === planFilter;
      const matchesStatus =
        statusFilter === "All" || transaction.status === statusFilter;

      return matchesAudience && matchesPlan && matchesStatus;
    });
  }, [audience, planFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / pageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const pageTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function exportTransactions() {
    const headers = [
      "Transaction ID",
      "User",
      "User ID",
      "Plan",
      "Subscription",
      "Price",
      "Date",
      "Status",
      "Email",
    ];
    const rows = filteredTransactions.map((transaction) => [
      transaction.id,
      transaction.userName,
      transaction.userId,
      transaction.plan,
      transaction.subscription,
      transaction.price,
      transaction.modalDate,
      transaction.status,
      transaction.email,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lineage-transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function downloadInvoice(transaction: TransactionRecord) {
    const invoice = [
      "Lineage.AI Invoice",
      `Transaction ID: ${transaction.id}`,
      `Name: ${transaction.userName}`,
      `Plan: ${transaction.plan}`,
      `Date: ${transaction.modalDate}`,
      `Amount: ${transaction.price}`,
      `Email: ${transaction.email}`,
    ].join("\n");
    const blob = new Blob([invoice], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${transaction.id.replace("#", "invoice-")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <section className="w-full">
        <div className="grid grid-cols-1 items-center rounded-lg border border-[#E6E6E0] bg-white shadow-[0_12px_30px_rgba(31,47,40,0.06)] sm:h-[96px] sm:grid-cols-3">
          <RevenueStat value="1.2k" label="Today" />
          <RevenueStat value="18.6K" label="This Month" divided />
          <RevenueStat value="4.9M" label="Total Revenue" divided />
        </div>

        <div className="mt-8 flex flex-col items-stretch justify-between gap-5 xl:flex-row xl:items-start">
          <div>
            <h1 className="text-[30px] font-bold leading-tight text-[#172235]">
              Earnings Management
            </h1>
            <p className="mt-3 max-w-[520px] text-[15px] font-medium leading-6 text-[#626A64]">
              Monitor, manage and support all the transactions
            </p>
          </div>

          <div className="relative flex flex-wrap items-center gap-3 xl:pt-9">
            <div className="flex h-10 overflow-hidden rounded-lg border border-[#E2E6EA] bg-white p-1 shadow-sm">
              {(["All Users", "Internal"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setAudience(item);
                    setPage(1);
                  }}
                  className={`rounded-md px-5 text-[13px] font-bold transition ${
                    audience === item
                      ? "bg-[#F2F4FF] text-[#334155]"
                      : "text-[#7B827B] hover:text-[#46624E]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              className="flex h-10 items-center gap-2 rounded-lg border border-[#D6DAD4] bg-white px-4 text-[13px] font-bold text-[#5E685F] shadow-sm transition hover:bg-[#F2F4EE]"
            >
              <HugeiconsIcon
                icon={FilterHorizontalIcon}
                size={18}
                strokeWidth={1.8}
                className="h-[18px] w-[18px]"
              />
              Filters
            </button>

            <button
              type="button"
              onClick={exportTransactions}
              className="flex h-10 items-center gap-2 rounded-lg border border-[#D6DAD4] bg-white px-4 text-[13px] font-bold text-[#5E685F] shadow-sm transition hover:bg-[#F2F4EE]"
            >
              <HugeiconsIcon
                icon={Upload01Icon}
                size={18}
                strokeWidth={1.8}
                className="h-[18px] w-[18px]"
              />
              Export
            </button>

            {filtersOpen ? (
              <div className="absolute right-0 top-12 z-10 w-[min(calc(100vw-2rem),280px)] rounded-lg border border-[#E0E3DE] bg-white p-5 shadow-[0_18px_45px_rgba(31,47,40,0.12)] xl:right-[86px] xl:top-[88px]">
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#6F826C]">
                  Transaction Filters
                </p>
                <label className="mt-4 block">
                  <span className="text-[13px] font-semibold text-[#5E685F]">
                    Subscription
                  </span>
                  <select
                    value={planFilter}
                    onChange={(event) => {
                      setPlanFilter(
                        event.target.value as
                          | "All"
                          | TransactionRecord["subscription"],
                      );
                      setPage(1);
                    }}
                    className="mt-2 h-10 w-full rounded border border-[#D6DAD4] bg-[#FAFAF7] px-3 text-[13px] font-medium text-[#334155] outline-none"
                  >
                    <option>All</option>
                    <option>Legacy</option>
                    <option>Pro</option>
                    <option>Basic</option>
                  </select>
                </label>
                <label className="mt-4 block">
                  <span className="text-[13px] font-semibold text-[#5E685F]">
                    Status
                  </span>
                  <select
                    value={statusFilter}
                    onChange={(event) => {
                      setStatusFilter(
                        event.target.value as
                          | "All"
                          | TransactionRecord["status"],
                      );
                      setPage(1);
                    }}
                    className="mt-2 h-10 w-full rounded border border-[#D6DAD4] bg-[#FAFAF7] px-3 text-[13px] font-medium text-[#334155] outline-none"
                  >
                    <option>All</option>
                    <option>Paid</option>
                    <option>Pending</option>
                    <option>Refunded</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setPlanFilter("All");
                    setStatusFilter("All");
                    setPage(1);
                  }}
                  className="mt-5 h-10 w-full rounded bg-[#46624E] text-[13px] font-bold text-white transition hover:bg-[#3D5745]"
                >
                  Clear Filters
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-7 overflow-hidden rounded-lg border border-[#E6E6E0] bg-white shadow-[0_12px_30px_rgba(31,47,40,0.06)]">
          <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse text-left">
            <thead className="bg-[#FBFBFA]">
              <tr className="text-[11px] font-bold uppercase tracking-wide text-[#7B827B]">
                <th className="px-7 py-5">Users</th>
                <th className="px-5 py-5">Trx ID</th>
                <th className="px-5 py-5">Subscription</th>
                <th className="px-5 py-5">Price</th>
                <th className="px-5 py-5">Date</th>
                <th className="px-5 py-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageTransactions.length > 0 ? (
                pageTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    tabIndex={0}
                    role="button"
                    onClick={() => setSelectedTransaction(transaction)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        setSelectedTransaction(transaction);
                      }
                    }}
                    className="cursor-pointer border-t border-[#EFF0EC] bg-white transition hover:bg-[#F2F4EE]"
                  >
                    <td className="px-7 py-6">
                      <div className="flex items-center gap-4">
                        <Avatar
                          user={{
                            name: transaction.userName,
                            initials: transaction.initials,
                          }}
                          size="sm"
                        />
                        <div>
                          <p className="text-[13px] font-bold leading-5 text-[#28334A]">
                            {transaction.userName}
                          </p>
                          <p className="text-[12px] font-medium text-[#6F7670]">
                            ID: {transaction.userId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-6 text-[13px] font-bold text-[#334155]">
                      {transaction.id.replace("#", "#")}
                    </td>
                    <td className="px-5 py-6">
                      <SubscriptionBadge plan={transaction.subscription} />
                    </td>
                    <td className="px-5 py-6 text-[13px] font-bold text-[#334155]">
                      {transaction.price}
                    </td>
                    <td className="px-5 py-6 text-[13px] font-medium text-[#334155]">
                      {transaction.date}
                    </td>
                    <td className="px-5 py-6">
                      <div className="flex items-center gap-4 text-[#647064]">
                        <button
                          type="button"
                          aria-label={`Download invoice ${transaction.id}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            downloadInvoice(transaction);
                          }}
                          className="transition hover:text-[#46624E]"
                        >
                          <HugeiconsIcon
                            icon={FileDownloadIcon}
                            size={22}
                            strokeWidth={1.7}
                          />
                        </button>
                        <button
                          type="button"
                          aria-label={`View transaction ${transaction.id}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedTransaction(transaction);
                          }}
                          className="transition hover:text-[#46624E]"
                        >
                          <HugeiconsIcon
                            icon={EyeIcon}
                            size={22}
                            strokeWidth={1.7}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-7 py-12 text-center text-[14px] font-medium text-[#7B827B]"
                  >
                    No transactions match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-[#EFF0EC] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-[12px] font-medium text-[#6F7670]">
              Showing {(currentPage - 1) * pageSize + (pageTransactions.length ? 1 : 0)}{" "}
              to {(currentPage - 1) * pageSize + pageTransactions.length} of{" "}
              {filteredTransactions.length} transactions
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="flex h-8 w-8 items-center justify-center rounded text-[#647064] transition hover:bg-[#F2F4EE] disabled:opacity-35"
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={18}
                  strokeWidth={1.8}
                />
              </button>
              {[1, 2, 3].map((item) => (
                <button
                  key={item}
                  type="button"
                  disabled={item > totalPages}
                  onClick={() => setPage(item)}
                  className={`h-8 min-w-8 rounded px-3 text-[13px] font-bold transition disabled:opacity-35 ${
                    currentPage === item
                      ? "bg-[#46624E] text-white"
                      : "text-[#647064] hover:bg-[#F2F4EE]"
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((value) => Math.min(totalPages, value + 1))
                }
                className="flex h-8 w-8 items-center justify-center rounded text-[#647064] transition hover:bg-[#F2F4EE] disabled:opacity-35"
              >
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  strokeWidth={1.8}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <TransactionModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        onDownload={downloadInvoice}
      />
    </>
  );
}

function RevenueStat({
  value,
  label,
  divided = false,
}: {
  value: string;
  label: string;
  divided?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col items-center justify-center ${
        divided ? "border-l border-[#AEB6AF]" : ""
      }`}
    >
      <p className="text-[26px] font-bold text-[#253043]">{value}</p>
      <p className="mt-4 text-[12px] font-bold text-[#C4D9BE]">{label}</p>
    </div>
  );
}

function TransactionModal({
  transaction,
  onClose,
  onDownload,
}: {
  transaction: TransactionRecord | null;
  onClose: () => void;
  onDownload: (transaction: TransactionRecord) => void;
}) {
  const [displayTransaction, setDisplayTransaction] =
    useState<TransactionRecord | null>(transaction);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (transaction) {
      setDisplayTransaction(transaction);
      const timeout = window.setTimeout(() => setIsVisible(true), 20);

      return () => window.clearTimeout(timeout);
    }

    setIsVisible(false);
    const timeout = window.setTimeout(() => setDisplayTransaction(null), 300);

    return () => window.clearTimeout(timeout);
  }, [transaction]);

  if (!displayTransaction) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/20 px-4 py-6 transition-opacity duration-300 ease-out sm:px-6 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <section
        className={`w-full max-w-[520px] rounded bg-white px-5 py-7 shadow-[0_24px_70px_rgba(31,47,40,0.24)] transition duration-300 ease-out sm:px-14 sm:py-10 ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 text-[#6D7F68]">
            <HugeiconsIcon
              icon={MoneyReceive01Icon}
              size={30}
              strokeWidth={1.7}
            />
            <h2 className="text-[30px] font-bold leading-tight">
              Transaction Details
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close transaction details"
            className="flex h-9 w-9 items-center justify-center rounded text-[#334155] transition hover:bg-[#F2F4EE]"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.8} />
          </button>
        </div>

        <div className="mt-8 space-y-6 text-[16px]">
          <ModalRow label="Transaction ID" value={displayTransaction.id} />
          <ModalRow label="Plans" value={displayTransaction.plan} />
          <ModalRow label="Date" value={displayTransaction.modalDate} />
          <ModalRow label="Name" value={displayTransaction.userName} />
          <ModalRow
            label="A/C number"
            value={displayTransaction.accountNumber}
          />
          <ModalRow label="Email" value={displayTransaction.email} />
          <ModalRow label="Payment method" value={displayTransaction.method} />
          <ModalRow
            label="Transaction amount"
            value={displayTransaction.price}
          />
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded border border-[#9AA596] text-[14px] font-bold text-[#6C7869] transition hover:bg-[#F2F4EE]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onDownload(displayTransaction)}
            className="h-10 rounded bg-[#64785E] text-[14px] font-bold text-white transition hover:bg-[#52684F]"
          >
            Download Invoice
          </button>
        </div>
      </section>
    </div>
  );
}

function ModalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr] sm:gap-8">
      <p className="font-bold text-[#334155]">{label}</p>
      <p className="font-medium text-[#334155] sm:text-right">{value}</p>
    </div>
  );
}

function PlaceholderContent({ title }: { title: string }) {
  return (
    <section className="rounded-lg border border-[#E6E6E0] bg-white p-6 shadow-[0_12px_30px_rgba(31,47,40,0.06)] sm:p-10">
      <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-[#6F826C]">
        {title}
      </p>
      <h1 className="mt-3 text-[30px] font-bold text-[#253043]">
        {title} page
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#788078]">
        This dashboard shell is ready. When you share the details for this
        section, this content area can be replaced while the fixed sidebar and
        topbar stay in place.
      </p>
    </section>
  );
}
