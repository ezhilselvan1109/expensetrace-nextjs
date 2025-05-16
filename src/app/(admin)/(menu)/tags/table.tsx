"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Tag = { id: number; name: string };
type Props = {
  onEdit: (tag: Tag) => void;
  reloadFlag: boolean;
};

export default function TableContent({ onEdit, reloadFlag }: Props) {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetchTags();
  }, [reloadFlag]);

  const fetchTags = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tags/all`, {
      credentials: "include",
    });
    const result = await res.json();
    if (result.data) {
      setTags(result.data);
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tags/tag/${id}/delete`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    } else {
      console.error("Failed to delete tag");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell
                    className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {tag.name}
                  </TableCell>
                  <TableCell
                    className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    <button
                      onClick={() => onEdit(tag)}
                      className="text-blue-500 hover:underline mr-4"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </div>
    </div>
  );
}
