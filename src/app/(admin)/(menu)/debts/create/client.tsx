'use client';

import { DebtRequestDto, DebtService } from '@/api-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { User, CalendarDays, FileText, PlusCircle } from 'lucide-react'

export default function CreateDebtPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type'); // 1 = lending, 2 = borrowing
    const parsedType = type === '1' || type === '2' 
        ? (type as DebtRequestDto.type)
        : undefined;
    const [form, setForm] = useState<DebtRequestDto>({
        personName: '',
        dueDate: '',
        additionalDetail: '',
        type: parsedType,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await DebtService.addDebt(form);
            router.push(`/debts/${res.data?.id}/create?type=${type}`);
        } catch {
            alert('Error creating debt');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6 flex items-center justify-center gap-2">
                <PlusCircle className="w-7 h-7 text-blue-600" />
                Create Debt
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8 p-6">
                {/* Person Name */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="personName" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Person Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-2 top-2.5 w-5 h-5 text-gray-500" />
                        <input
                            id="personName"
                            type="text"
                            name="personName"
                            value={form.personName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-2 bg-transparent text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:outline-none transition-all duration-300"
                            required
                        />
                    </div>
                </div>

                {/* Due Date */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="dueDate" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Due Date
                    </label>
                    <div className="relative">
                        <CalendarDays className="absolute left-2 top-2.5 w-5 h-5 text-gray-500" />
                        <input
                            id="dueDate"
                            type="date"
                            name="dueDate"
                            value={form.dueDate}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 bg-transparent text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:outline-none transition-all duration-300"
                            required
                        />
                    </div>
                </div>

                {/* Additional Details */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="additionalDetail" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Additional Details
                    </label>
                    <div className="relative">
                        <FileText className="absolute left-2 top-3 w-5 h-5 text-gray-500" />
                        <textarea
                            id="additionalDetail"
                            name="additionalDetail"
                            value={form.additionalDetail}
                            onChange={handleChange}
                            placeholder="Optional notes"
                            rows={3}
                            className="w-full pl-10 pr-4 py-2 bg-transparent text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:outline-none transition-all duration-300 resize-none"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-transform duration-300 transform hover:scale-[1.02] focus:outline-none flex items-center justify-center gap-2"
                >
                    <PlusCircle className="w-5 h-5" />
                    Create Debt
                </button>
            </form>



        </div>

    );
}
