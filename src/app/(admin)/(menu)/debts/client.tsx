"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DebtRequestDto, DebtService, DebtTransactionRequestDto, DebtTransactionsService } from "@/api-client";

export default function CreateDebtPage() {
  const [formData, setFormData] = useState({
    personName: "",
    dueDate: "",
    additionalDetail: "",
    type: DebtRequestDto.type._1, // '1' = LENDING
    transaction: {
      debtId:"",
      date: "",
      time: "",
      amount: "",
      description: "",
      accountId: "",
      type: DebtTransactionRequestDto.type._1, // '1' = PAID
    },
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("transaction.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        transaction: {
          ...prev.transaction,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: DebtRequestDto = {
      personName: formData.personName,
      dueDate: formData.dueDate,
      additionalDetail: formData.additionalDetail,
      type: formData.type,
    };

    const res=await DebtService.addDebt(payload);
    setFormData((prev) => ({
        ...prev,
        transaction: {
          ...prev.transaction,
          ["debtId"]: res.data?.id,
        },
      }));
  };

  const handleTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert time string "HH:mm" into LocalTime object expected by API
    const [hourStr, minuteStr] = formData.transaction.time.split(":");
    const localTime = {
      hour: parseInt(hourStr, 10),
      minute: parseInt(minuteStr, 10),
      second: 0,
    };

    const payload: DebtTransactionRequestDto = {
        date: formData.transaction.date,
        time: localTime,
        amount: parseFloat(formData.transaction.amount),
        description: formData.transaction.description,
        accountId: formData.transaction.accountId,
        type: formData.transaction.type
    };

    await DebtTransactionsService.addDebtTransaction(formData.transaction.debtId,payload);

    router.push("/debts");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Debt</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="personName"
          placeholder="Person Name"
          className="w-full p-2 border rounded"
          value={formData.personName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dueDate"
          className="w-full p-2 border rounded"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
        <input
          name="additionalDetail"
          placeholder="Additional Details"
          className="w-full p-2 border rounded"
          value={formData.additionalDetail}
          onChange={handleChange}
        />
        <select
          name="type"
          className="w-full p-2 border rounded"
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value as DebtRequestDto.type })
          }
          required
        >
          <option value={DebtRequestDto.type._1}>LENDING</option>
          <option value={DebtRequestDto.type._2}>BORROWING</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
</form>
        <h2 className="text-xl font-semibold mt-4">Transaction</h2>
<form onSubmit={handleTransactionSubmit} className="space-y-4">
        <input
          type="date"
          name="transaction.date"
          className="w-full p-2 border rounded"
          value={formData.transaction.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="transaction.time"
          className="w-full p-2 border rounded"
          value={formData.transaction.time}
          onChange={handleChange}
          required
        />
        <input
          name="transaction.amount"
          placeholder="Amount"
          type="number"
          step="0.01"
          className="w-full p-2 border rounded"
          value={formData.transaction.amount}
          onChange={handleChange}
          required
        />
        <input
          name="transaction.description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.transaction.description}
          onChange={handleChange}
        />
        <input
          name="transaction.accountId"
          placeholder="Account ID"
          className="w-full p-2 border rounded"
          value={formData.transaction.accountId}
          onChange={handleChange}
          required
        />
        <select
          name="transaction.type"
          className="w-full p-2 border rounded"
          value={formData.transaction.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              transaction: {
                ...formData.transaction,
                type: e.target.value as DebtTransactionRequestDto.type,
              },
            })
          }
          required
        >
          <option value={DebtTransactionRequestDto.type._1}>PAID</option>
          <option value={DebtTransactionRequestDto.type._2}>RECEIVED</option>
          <option value={DebtTransactionRequestDto.type._3}>ADJUSTMENT</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
