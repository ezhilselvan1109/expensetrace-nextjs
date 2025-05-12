"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input";

type FormProps = {
    mode: "add" | "edit";
    tag: { id: number; name: string } | null;
    onSuccess: () => void;
    onCancel: () => void;
};

export default function Form({ mode, tag, onSuccess, onCancel }: FormProps) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (mode === "edit" && tag) {
            setName(tag.name);
        }
    }, [mode, tag]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("process.env.NEXT_PUBLIC_API_BASE_URL : "+process.env.NEXT_PUBLIC_API_BASE_URL)
        const url =
            mode === "add"
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/tags/add`
                : `${process.env.NEXT_PUBLIC_API_BASE_URL}/tags/tag/${tag?.id}/update`;

        const res = await fetch(url, {
            method: mode === "add" ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name }),
        });

        if (res.ok) {
            onSuccess();
        } else {
            console.error("Failed to submit form");
        }
    };

    return (
        <ComponentCard title={mode === "add" ? "Add Tag" : "Edit Tag"}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter tag name"
                    />

                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        {mode === "add" ? "Add" : "Update"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-gray-600 hover:underline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </ComponentCard>
    );
}
