import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURES, STEPS } from "@/lib/landing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ExpenseTrace – Personal Expense Tracker & Budget Manager",
  description:
    "Track your personal expenses effortlessly with ExpenseTrace. Visualize spending trends, manage your budget, and gain control over your finances with our easy-to-use dashboard.",
  keywords: [
    "expense tracker",
    "personal finance",
    "budget manager",
    "spending tracker",
    "money management",
    "financial planning",
    "expense tracking app",
    "budgeting tool",
    "ExpenseTrace"
  ]
};

export default function LandingPage() {
  const mainBlue = "#2563eb";
  const lightBlue = "#bfdbfe";
  const darkBlue = "#1e40af";

  return (
    <div className="flex flex-col pt-16">
      {/* ───── Hero ───── */}
      <section className="mt-20 pb-20 space-y-12 px-4 md:px-6">
        <div className="container mx-auto text-center space-y-6">
          <span
            className="inline-block rounded-full px-4 py-1 text-sm font-medium"
            style={{ backgroundColor: lightBlue, color: mainBlue }}
          >
            Take control of your finances
          </span>

          <h1 className="gradient-title mx-auto max-w-5xl text-4xl font-bold md:text-7xl">
            Your personal expense tracker to master your money
          </h1>

          <p className="mx-auto max-w-2xl text-gray-500 md:text-lg">
            Easily track your spending, visualize trends, and manage your budget—all
            in one place.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white hover:brightness-90 transition"
              style={{ backgroundColor: mainBlue }}
            >
              Start Tracking
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 border transition"
              style={{ borderColor: mainBlue, color: mainBlue }}
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ───── Features ───── */}
      <section id="features" className="bg-gray-50 py-20 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <span
            className="inline-block rounded-full px-4 py-1 text-sm font-medium"
            style={{ backgroundColor: lightBlue, color: mainBlue }}
          >
            Features
          </span>
          <h2 className="gradient-title mt-4 text-3xl md:text-4xl font-bold">
            Everything you need to track your expenses
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500 md:text-lg">
            Gain clarity and control over your personal finances with these powerful
            tools.
          </p>

          <div className="mx-auto mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
            {FEATURES.map(({ title, Icon, description }) => (
              <div key={title} className="space-y-4 text-left">
                <div
                  className="w-fit rounded-full p-3"
                  style={{ backgroundColor: lightBlue }}
                >
                  <Icon className="h-6 w-6" style={{ color: mainBlue }} />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── How it works ───── */}
      <section id="how-it-works" className="py-20 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <span
            className="inline-block rounded-full px-4 py-1 text-sm font-medium"
            style={{ backgroundColor: lightBlue, color: mainBlue }}
          >
            How It Works
          </span>
          <h2 className="gradient-title mt-4 text-3xl md:text-4xl font-bold">
            Stay on top of your personal finances in 3 easy steps
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500 md:text-lg">
            Get started in minutes. Track, analyze, and manage your money with ease.
          </p>

          <div className="mx-auto mt-12 grid gap-10 md:grid-cols-3 max-w-5xl">
            {STEPS.map(({ label, title, description }) => (
              <div
                key={label}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                  style={{ backgroundColor: lightBlue, color: mainBlue }}
                >
                  {label}
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Call to Action ───── */}
      <section
        className="py-20 text-white text-center"
        style={{
          background: `linear-gradient(to right, ${darkBlue}, ${mainBlue}, #3b82f6)`,
        }}
      >
        <div className="container mx-auto px-4 md:px-6 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Ready to take charge of your spending?
          </h2>
          <p className="mx-auto max-w-xl text-white md:text-lg">
            Start using ExpenseTracer to build smarter money habits today.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold hover:bg-gray-100 transition"
            style={{ backgroundColor: "white", color: mainBlue }}
          >
            Start Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="border-t bg-gray-50 py-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ExpenseTracer. All rights reserved.
      </footer>
    </div>
  );
}
