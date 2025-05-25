"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Form from "./form";
import TableContent from "./table";
import { TagService } from "@/api-client";

export default function TagsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode"); // "add" | "edit" | null
  const editId = searchParams.get("id"); // ID for editing
  const [editTag, setEditTag] = useState<{ id: number; name: string } | null>(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    async function fetchTag() {
      try {
        if (mode === "edit" && editId) {
          const data = await TagService.getTagById(editId);
          if (data && data.data && typeof data.data.id === "number" && typeof data.data.name === "string") {
            setEditTag({ id: data.data.id, name: data.data.name });
          } else {
            setEditTag(null);
          }
        } else {
          setEditTag(null);
        }
      } catch (error) {
        console.error("Failed to fetch", error);
        setEditTag(null);
      }
    }
    fetchTag();
  }, [mode, editId]);

  const handleSuccess = () => {
    router.push("/tags"); // Remove query params to return to table
    setReloadFlag((prev) => !prev);
  };

  return (
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      {mode === "add" || (mode === "edit" && editTag) ? (
        <Form
          mode={mode === "add" ? "add" : "edit"}
          tag={editTag}
          onSuccess={handleSuccess}
          onCancel={handleSuccess}
        />
      ) : (
        <>
          <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-end sm:justify-end">
            <button
              onClick={() => router.push("/tags?mode=add")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Tag
            </button>
          </div>
          <div className="max-w-full overflow-x-auto">
            <TableContent
              onEdit={(tag) =>
                router.push(`/tags?mode=edit&id=${tag.id}`)
              }
              reloadFlag={reloadFlag}
            />
          </div>
        </>
      )}
    </div>
  );
}
