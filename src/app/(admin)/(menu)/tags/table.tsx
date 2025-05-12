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
    <Table>
      <TableHeader className="border-y border-gray-100 dark:border-gray-800">
        <TableRow>
          <TableCell isHeader>Name</TableCell>
          <TableCell isHeader>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
        {tags.map((tag) => (
          <TableRow key={tag.id}>
            <TableCell>{tag.name}</TableCell>
            <TableCell>
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
  );
}
