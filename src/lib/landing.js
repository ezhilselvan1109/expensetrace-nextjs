import { Wallet, LineChart, CalendarClock, Bell, ClipboardList } from "lucide-react";

export const FEATURES = [
  {
    title: "Track Personal Expenses",
    Icon: Wallet,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Log every purchase, bill, or transfer to keep tabs on where your money goes.",
  },
  {
    title: "Visual Analytics",
    Icon: LineChart,
    bg: "bg-teal-100",
    color: "text-teal-600",
    description:
      "Understand your spending with clear charts and category-wise breakdowns.",
  },
  {
    title: "Monthly Budgets",
    Icon: ClipboardList,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Set custom monthly budgets and track how well you’re sticking to them.",
  },
  {
    title: "Reminders & Alerts",
    Icon: Bell,
    bg: "bg-amber-100",
    color: "text-amber-600",
    description:
      "Get timely reminders for bills, subscriptions, and spending limits.",
  },
  {
    title: "Recurring Expenses",
    Icon: CalendarClock,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Easily log recurring expenses like rent, EMIs, or subscriptions without redundancy.",
  },
  {
    title: "Real-Time Sync",
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 4v5h.582M20 20v-5h-.581M4 20h5v-.582M20 4h-5v.581" />
        <path d="M3 12a9 9 0 0118 0 9 9 0 01-18 0z" />
      </svg>
    ),
    bg: "bg-teal-100",
    color: "text-teal-600",
    description:
      "Your data updates instantly across all your devices — no delays, no syncing issues.",
  },
];

export const STEPS = [
  {
    label: "1",
    title: "Add Your Expenses",
    description:
      "Record your daily expenses easily under categories like food, transport, bills, etc.",
  },
  {
    label: "2",
    title: "Review Your Spending",
    description:
      "View detailed reports and charts to understand where your money goes each month.",
  },
  {
    label: "3",
    title: "Plan & Optimize",
    description:
      "Set goals, create budgets, and track recurring expenses to build smarter financial habits.",
  },
];