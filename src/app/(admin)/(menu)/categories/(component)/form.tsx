'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    BusFront, Bike, TrainFront, CircleParking, Fuel, UtensilsCrossed, Sandwich,
    Wine, Apple, IceCreamCone, Pizza, Cake, Shirt, ShoppingCart, ShoppingBag,
    CirclePercent, Film, Clapperboard, TvMinimalPlay, ReceiptText, GraduationCap,
    Gamepad2, Gift, Hospital, ShieldPlus, ShieldCheck, BriefcaseMedical,
    CarTaxiFront, House, Pill, FileMusic, Syringe, HandCoins, Banknote,
    Landmark, Dumbbell, Smartphone
} from 'lucide-react';

import { CategoryRequestDto, CategoryService } from '@/api-client';

const tabs = ['Expense', 'Income'] as const;

const colorOptions = [
    { label: 'red', value: '#EF4444' },
    { label: 'rose', value: '#F43F5E' },
    { label: 'pink', value: '#EC4899' },
    { label: 'fuchsia', value: '#D946EF' },
    { label: 'purple', value: '#8B5CF6' },
    { label: 'violet', value: '#A78BFA' },
    { label: 'indigo', value: '#6366F1' },
    { label: 'blue', value: '#3B82F6' },
    { label: 'sky', value: '#0EA5E9' },
    { label: 'cyan', value: '#06B6D4' },
    { label: 'teal', value: '#14B8A6' },
    { label: 'emerald', value: '#10B981' },
    { label: 'green', value: '#22C55E' },
    { label: 'lime', value: '#84CC16' },
    { label: 'yellow', value: '#EAB308' },
    { label: 'amber', value: '#F59E0B' },
    { label: 'orange', value: '#F97316' },
    { label: 'warmGray', value: '#78716C' },
    { label: 'gray', value: '#6B7280' },
    { label: 'coolGray', value: '#4B5563' },
    { label: 'trueGray', value: '#525252' },
    { label: 'neutral', value: '#737373' },
    { label: 'stone', value: '#78716C' },
    { label: 'zinc', value: '#71717A' },
    { label: 'slate', value: '#64748B' },
    { label: 'black', value: '#000000' },
    { label: 'white', value: '#FFFFFF' },
];

const lucideIcons = {
    travel: [
        { label: 'Bus', icon: <BusFront size={24} />, key: 'bus' },
        { label: 'Bike', icon: <Bike size={24} />, key: 'bike' },
        { label: 'Train', icon: <TrainFront size={24} />, key: 'train' },
        { label: 'Parking', icon: <CircleParking size={24} />, key: 'parking' },
        { label: 'Fuel', icon: <Fuel size={24} />, key: 'fuel' },
        { label: 'Taxi', icon: <CarTaxiFront size={24} />, key: 'taxi' },
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
        { label: 'Gamepad', icon: <Gamepad2 size={24} />, key: 'gamepad' },
        { label: 'Gift', icon: <Gift size={24} />, key: 'gift' },
        { label: 'Music File', icon: <FileMusic size={24} />, key: 'music' },
    ],
    utilities: [
        { label: 'Receipt', icon: <ReceiptText size={24} />, key: 'receipt' },
        { label: 'Home', icon: <House size={24} />, key: 'home' },
    ],
    health: [
        { label: 'Hospital', icon: <Hospital size={24} />, key: 'hospital' },
        { label: 'Shield+', icon: <ShieldPlus size={24} />, key: 'shieldplus' },
        { label: 'Shield✓', icon: <ShieldCheck size={24} />, key: 'shieldcheck' },
        { label: 'Medical Briefcase', icon: <BriefcaseMedical size={24} />, key: 'medicalbriefcase' },
        { label: 'Pill', icon: <Pill size={24} />, key: 'pill' },
        { label: 'Syringe', icon: <Syringe size={24} />, key: 'syringe' },
    ],
    education: [
        { label: 'Graduation', icon: <GraduationCap size={24} />, key: 'graduation' },
    ],
    finance: [
        { label: 'Coins', icon: <HandCoins size={24} />, key: 'coins' },
        { label: 'Banknote', icon: <Banknote size={24} />, key: 'banknote' },
        { label: 'Landmark', icon: <Landmark size={24} />, key: 'landmark' },
    ],
    lifestyle: [
        { label: 'Dumbbell', icon: <Dumbbell size={24} />, key: 'dumbbell' },
        { label: 'Smartphone', icon: <Smartphone size={24} />, key: 'smartphone' },
    ],
};

export default function CategoryForm() {
    const router = useRouter();
    const params = useParams();
    const categoryId = params?.id as string | undefined;

    const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Expense');
    const [form, setForm] = useState({
        name: '',
        color: '#3B82F6',
        icon: 'bus',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (categoryId) {
            CategoryService.getCategoryById(categoryId).then((res) => {
                const cat = res.data;
                if (cat) {
                    setForm({
                        name: cat.name,
                        color: cat.color,
                        icon: cat.icon,
                    });
                    setActiveTab(cat.type === 2 ? 'Income' : 'Expense');
                }
            });
        }
    }, [categoryId]);

    const handleFormChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!form.name.trim()) return;

        setLoading(true);
        setMessage('');
        const payload: CategoryRequestDto = {
            name: form.name,
            type: tabs.indexOf(activeTab) + 1 as unknown as CategoryRequestDto['type'],
            color: form.color,
            icon: form.icon,
        };

        try {
            if (categoryId) {
                await CategoryService.updateCategory(categoryId, payload);
            } else {
                await CategoryService.addCategory(payload);
            }
            router.push('/categories');
        } catch (err) {
            setMessage(`❌ Error: ${(err as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this category?');
        if (!confirmed || !categoryId) return;

        setLoading(true);
        setMessage('');

        try {
            await CategoryService.deleteCategory(categoryId);
            router.push('/categories');
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
        <div className="max-w-lg mx-auto mt-3 px-2 text-gray-800 dark:text-gray-100">
            <div className="mb-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {categoryId ? 'Update Category' : 'Add Category'}
                    </h1>
                    {categoryId && (
                        <button
                            disabled={loading}
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
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
                <div>
                    <label className="block mb-2 text-sm font-semibold">Category Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        placeholder="e.g. Groceries"
                        className="w-full pl-2 py-2 pr-10 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Color Picker */}
            <section className="mb-6">
                <h4 className="mb-3 font-semibold">Category Color</h4>
                <div className="flex flex-wrap gap-4">
                    {colorOptions.map(({ value }) => {
                        const isSelected = form.color === value;
                        return (
                            <button
                                key={value}
                                onClick={() => handleFormChange('color', value)}
                                className={`w-7 h-7 rounded-full border-4 transition-all duration-200 ${isSelected
                                    ? 'ring-2 ring-offset-2 ring-blue-500 border-white dark:border-gray-800 scale-110 shadow-md'
                                    : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                                    }`}
                                style={{ backgroundColor: value }}
                            />
                        );
                    })}
                </div>
            </section>

            {/* Icon Picker */}
            <section className="mb-6">
                <h4 className="mb-3 font-semibold">Category Icon</h4>
                <div className="grid grid-cols-3 gap-3">
                    {Object.entries(lucideIcons).map(([group, icons]) => (
                        <div key={group} className="col-span-3">
                            <p className="text-sm mb-2 font-semibold capitalize">{group}</p>
                            <div className="flex flex-wrap gap-3">
                                {icons.map(({ key, label, icon }) => (
                                    <button
                                        key={key}
                                        onClick={() => handleFormChange('icon', key)}
                                        className={`w-10 h-10 flex justify-center items-center rounded-full ${form.icon === key
                                            ? 'bg-blue-600 text-white shadow'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200'
                                            }`}
                                        title={label}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Submit Button */}
            <button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow transition"
            >
                {loading ? 'Saving...' : categoryId ? 'Update Category' : 'Add Category'}
            </button>

            {/* Error Message */}
            {message && <p className="mt-3 text-sm text-red-500">{message}</p>}
        </div>
    );
}
