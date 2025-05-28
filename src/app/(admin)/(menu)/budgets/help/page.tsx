'use client';

import { useState } from 'react';

const steps = [
  {
    title: 'Choose Your Budget Period',
    description:
      `Select whether you want to set up a monthly or annual budget.

Choose the month or year for which you want to set up the budget. By default, the app will select the current or upcoming period for which the budget is not set.`,
  },
  {
    title: 'Copy Budget from Previous Period (if available)',
    description:
      `If you have set budgets for previous months or years, you can copy those budgets to the current period.

This option will copy the total budget amount, included categories, and any category limits that were set in the old budget.`,
  },
  {
    title: 'Select Categories to Include',
    description:
      `Pick the categories that you want to include in your budget.

Only the spending done in the included categories will be counted against your budget.`,
  },
  {
    title: 'Enter Your Total Budget Amount',
    description:
      `Specify the total amount you plan to spend for the selected period on the included categories.`,
  },
  {
    title: 'Set Category Limits (optional)',
    description:
      `Set individual spending limits for each selected category, if you want.

All other included categories won't have a spending limit but will be included in your total budget.`,
  },
];

const tips = [
  {
    title: 'Enable Budget Alerts',
    description: 'Get notified about key insights and progress in your budget. Go to Settings and enable Budget Alerts.',
  },
  {
    title: 'Review Regularly',
    description: 'Check your budget frequently to ensure you\'re on track.',
  },
  {
    title: 'Adjust as Needed',
    description: 'Don\'t hesitate to tweak your budget categories or amounts as your financial situation changes.',
  },
  {
    title: 'Use Insights',
    description: 'Leverage the app\'s analysis features to understand your spending patterns and make informed decisions.',
  },
];

export default function BudgetHelpAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Budget Help
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Let&apos;s get started on how to set up your budget in just a few simple steps.
        </p>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                <span>
                  {index + 1}. {step.title}
                </span>
                <span className="text-blue-600 dark:text-blue-400 text-xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {step.description}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-950 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Additional Tips</h2>
          <ul className="space-y-3 text-blue-900 dark:text-blue-200 list-disc list-inside">
            {tips.map((tip, i) => (
              <li key={i}>
                <strong>{tip.title}:</strong> {tip.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
