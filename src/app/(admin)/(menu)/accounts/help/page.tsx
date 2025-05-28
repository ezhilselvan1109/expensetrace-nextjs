export default function AccountHelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        Account Help
      </h1>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
        <div className="space-y-2 text-base leading-relaxed">
          <p>Accounts in this app are for tracking purposes only and are not linked to your actual bank accounts.</p>
          <p>Use them when adding transactions to categorize your spending.</p>
          <p>Balances displayed are based on transactions in the app and may differ from your actual balances.</p>
          <p>Update balances in the app periodically to keep records in sync.</p>
        </div>
      </section>

      {/* Getting Started */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
        <div className="space-y-2 text-base leading-relaxed">
          <p>
            Create accounts like credit cards, bank accounts, wallets, etc. We&apos;ve set up two default accounts for you:
            <strong> Bank</strong> and <strong> Cash</strong>.
          </p>
          <p>You can modify these or add new accounts as needed.</p>
          <p>Select the appropriate account when adding transactions for precise tracking.</p>
          <p>View all your accounts and their balances in one place.</p>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
          <li>
            <strong>Credit Card Payment Alerts:</strong> Reminders to pay your bills on time.
          </li>
          <li>
            <strong>Unified Account Overview:</strong> See all your accounts and balances at a glance.
          </li>
          <li>
            <strong>Insightful Tracking:</strong> Understand your spending to make better decisions.
          </li>
        </ul>
      </section>
    </div>
  );
}
