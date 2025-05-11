"use client";
import React, { useState } from "react";
import Form from "./form";
import TableContent from "./table";

export default function TagsClient() {
  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [editTag, setEditTag] = useState<{ id: number; name: string } | null>(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  const handleAdd = () => {
    setFormMode("add");
    setEditTag(null);
  };

  const handleEdit = (tag: { id: number; name: string }) => {
    setFormMode("edit");
    setEditTag(tag);
  };

  const handleBack = () => {
    setFormMode(null);
    setEditTag(null);
    setReloadFlag((prev) => !prev);
  };

  return (
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      {formMode ? (
        <Form
          mode={formMode}
          tag={editTag}
          onSuccess={handleBack}
          onCancel={handleBack}
        />
      ) : (
        <>
          <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-end sm:justify-end">
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Tag
            </button>
          </div>
          <div className="max-w-full overflow-x-auto">
            <TableContent onEdit={handleEdit} reloadFlag={reloadFlag} />
          </div>
        </>
      )}
    </div>
  );
}
