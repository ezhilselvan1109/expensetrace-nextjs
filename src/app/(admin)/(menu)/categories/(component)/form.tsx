'use client';

import { useState } from 'react';
import {
    BusFront,
    Bike,
    TrainFront,
    CircleParking,
    Fuel,
    UtensilsCrossed,
    Sandwich,
    Wine,
    Apple,
    IceCreamCone,
    Pizza,
    Cake,
    Shirt,
    ShoppingCart,
    ShoppingBag,
    CirclePercent,
    Film,
    Clapperboard,
    TvMinimalPlay,
} from 'lucide-react';
import { CategoryRequestDto, CategoryService } from '@/api-client';
import { useRouter } from 'next/navigation';

const tabs = ['Expense', 'Income'] as const;

const colorOptions = [
    { label: 'Red', value: '#EF4444' },
    { label: 'Blue', value: '#3B82F6' },
    { label: 'Green', value: '#10B981' },
    { label: 'Yellow', value: '#F59E0B' },
    { label: 'Purple', value: '#8B5CF6' },
    { label: 'Gray', value: '#6B7280' },
];

const lucideIcons = {
    travel: [
        { label: 'Bus', icon: <BusFront size={24} />, key: 'bus' },
        { label: 'Bike', icon: <Bike size={24} />, key: 'bike' },
        { label: 'Train', icon: <TrainFront size={24} />, key: 'train' },
        { label: 'Parking', icon: <CircleParking size={24} />, key: 'parking' },
        { label: 'Fuel', icon: <Fuel size={24} />, key: 'fuel' },
    ],
    food: [
        { label: 'Utensils', icon: <UtensilsCrossed size={24} />, key: 'utensils' },
        { label: 'Sandwich', icon: <Sandwich size={24} />, key: 'sandwich' },
        { label: 'Wine', icon: <Wine size={24} />, key: 'wine' },
        { label: 'Apple', icon: <Apple size={24} />, key: 'apple' },
        { label: 'Ice Cream', icon: <IceCreamCone size={24} />, key: 'icecream' },
        { label: 'Pizza', icon: <Pizza size={24} />, key: 'pizza' },
        { label: 'Cake', icon: <Cake size={24} />, key: 'cake' },
    ],
    shopping: [
        { label: 'Shirt', icon: <Shirt size={24} />, key: 'shirt' },
        { label: 'Cart', icon: <ShoppingCart size={24} />, key: 'cart' },
        { label: 'Bag', icon: <ShoppingBag size={24} />, key: 'bag' },
        { label: 'Discount', icon: <CirclePercent size={24} />, key: 'discount' },
    ],
    entertainment: [
        { label: 'Film', icon: <Film size={24} />, key: 'film' },
        { label: 'Clapperboard', icon: <Clapperboard size={24} />, key: 'clapper' },
        { label: 'TV', icon: <TvMinimalPlay size={24} />, key: 'tv' },
    ],
};

export default function CategoryForm() {
    const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Expense');
    const [form, setForm] = useState({
        name: '',
        color: '#3B82F6',
        icon: 'bus',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();
    const handleFormChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!form.name.trim()) return;

        setLoading(true);
        setMessage('');
        try {
            const payload: CategoryRequestDto = {
                name: form.name,
                type: tabs.indexOf(activeTab) + 1 as unknown as CategoryRequestDto['type'],
                color: form.color,
                icon: form.icon,
            };

            await CategoryService.addCategory(payload)
            setForm({ name: '', color: '#3B82F6', icon: 'bus' });
            router.push("/categories");
        } catch (err) {
            setMessage(`❌ Error: ${(err as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    const getSelectedIcon = () => {
        for (const group of Object.values(lucideIcons)) {
            const match = group.find((item) => item.key === form.icon);
            if (match) return match.icon;
        }
        return <CircleParking size={24} />;
    };

    return (
        <div className="max-w-lg mx-auto mt-10 px-4 text-gray-800 dark:text-gray-100">
            {/* Tabs */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
                            ? 'bg-white dark:bg-gray-900 shadow text-black dark:text-white'
                            : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Preview and Input */}
            <div className="flex items-center gap-4 mb-6">
                <div
                    className="w-16 h-16 rounded-full flex justify-center items-center"
                    style={{ backgroundColor: form.color }}
                >
                    {getSelectedIcon()}
                </div>
                <div className="w-full">
                    <label
                        htmlFor="category-name"
                        className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
                    >
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="category-name"
                        placeholder="Enter category name (e.g. Groceries)"
                        value={form.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>
            </div>

            {/* Color Picker */}
            {/* Color Picker */}
            <section className="mb-6">
                <h4 className="text-left font-semibold mb-3 text-gray-700 dark:text-gray-300">Color</h4>
                <div className="flex flex-wrap gap-4">
                    {colorOptions.map(({ label, value }) => {
                        const isSelected = form.color === value;
                        return (
                            <div key={value} className="relative group">
                                <button
                                    onClick={() => handleFormChange('color', value)}
                                    className={`w-10 h-10 rounded-full transition-all duration-200 border-4 ${isSelected
                                        ? 'ring-2 ring-offset-2 ring-blue-500 border-white dark:border-gray-800 scale-110 shadow-md'
                                        : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                                        }`}
                                    style={{ backgroundColor: value }}
                                    aria-label={`Select ${label}`}
                                />
                                <div className="absolute top-full mt-1 w-max left-1/2 -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition">
                                    {label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>


            {/* Icon Picker */}
            <section className="mb-6">
                <h4 className="text-left font-semibold mb-3 text-gray-700 dark:text-gray-300">Icon</h4>
                {Object.entries(lucideIcons).map(([category, icons]) => (
                    <div key={category} className="mb-4">
                        <p className="text-left mb-2 capitalize text-sm text-gray-600 dark:text-gray-400">
                            {category}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {icons.map(({ label, icon, key }) => (
                                <button
                                    key={key}
                                    onClick={() => handleFormChange('icon', key)}
                                    className={`rounded-xl p-2 border-2 transition ${form.icon === key
                                        ? 'border-black dark:border-white scale-110 shadow'
                                        : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                    style={{ backgroundColor: form.icon === key ? form.color : 'transparent' }}
                                    aria-label={`Select icon ${label}`}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Submit */}
            <button
                onClick={handleSubmit}
                disabled={loading || !form.name.trim()}
                className={`w-full py-3 rounded-full text-white flex items-center justify-center gap-2 transition ${loading || !form.name.trim()
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {loading && (
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                )}
                {loading ? 'Submitting...' : `Add ${activeTab}`}
            </button>

            {message && (
                <p className={`text-sm mt-4 text-center ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}
