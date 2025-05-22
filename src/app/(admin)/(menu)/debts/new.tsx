"use client";
import { useState } from "react";
import { DebtsType } from "../../../../../types";

export default function CreateDebtPage() {
  const [form, setForm] = useState({
    personName: "",
    dueDate: "",
    additionalDetail: "",
    type: DebtsType.LENDING,
  });

  const handleSubmit = async () => {
    const debtRes = await fetch("/api/debts", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    const { data: createdDebt } = await debtRes.json();

    await fetch(`/api/debts-transactions/${createdDebt.id}`, {
      method: "POST",
      body: JSON.stringify({
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toISOString().slice(11, 19),
        amount: 0,
        description: "Initial",
        type: 3, // ADJUSTMENT
        accountId: "dummy-account-id",
      }),
      headers: { "Content-Type": "application/json" },
    });

    alert("Debt and initial transaction created!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Create Debt</h1>
      <input className="input" placeholder="Person Name" onChange={e => setForm({ ...form, personName: e.target.value })} />
      <input className="input" type="date" onChange={e => setForm({ ...form, dueDate: e.target.value })} />
      <textarea className="input" placeholder="Details" onChange={e => setForm({ ...form, additionalDetail: e.target.value })} />
      <select className="input" onChange={e => setForm({ ...form, type: Number(e.target.value) })}>
        <option value={1}>Lending</option>
        <option value={2}>Borrowing</option>
      </select>
      <button className="btn mt-4" onClick={handleSubmit}>Create</button>
    </div>
  );
}
