import React from "react";

export default function DebtsHelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Managing Your Debts</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Managing your debts is essential for maintaining clear and stress-free finances. With the Debts feature, you can easily track money you&#39;ve lent or borrowed, keep a record of repayments, and stay on top of your financial commitments.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Let&#39;s Get Started</h2>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h3 className="font-semibold">1. Add a Debt Entry</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Go to the Debts page and tap on the &#34;+&#34; button.</li>
            <li>Select Lending (money you gave) or Borrowing (money you owe).</li>
            <li>Fill in the person&#39;s name, due date, and notes.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">2. Add Initial Transaction</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Enter amount, payment mode, and optional note/attachment.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">3. Track Your Debts</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Get a summary of what you owe and what others owe you.</li>
            <li>Switch tabs for Lending or Borrowing.</li>
            <li>Click on a person&#39;s name to view debt history.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">4. Update or Adjust Records</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Add repayments or new transactions via Add Record.</li>
            <li>Adjust remaining balance directly from history page.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">5. Stay Notified</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Receive reminders on due dates.</li>
            <li>Never miss a payment—stay on track.</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Additional Tips</h2>
      <ul className="list-disc list-inside pl-4 text-gray-700 dark:text-gray-300 space-y-2">
        <li><strong>Enable Notifications:</strong> Get notified on due dates.</li>
        <li><strong>Review Regularly:</strong> Check the Debts Page often.</li>
        <li><strong>Archive Settled Debts:</strong> Keep records organized.</li>
        <li><strong>One Entry Per Person:</strong> Lending and borrowing with one person are auto-combined.</li>
      </ul>
    </div>
  );
}
