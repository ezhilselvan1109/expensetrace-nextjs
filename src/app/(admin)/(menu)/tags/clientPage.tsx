'use client';

import React from 'react';
import useSWR from 'swr';
import { TagService } from '@/api-client';
import { EllipsisVertical } from 'lucide-react';

interface Tag {
  id: string;
  name: string;
}

const fetcher = async (): Promise<Tag[]> => {
  const res = await TagService.getAllTagsByUser();
  return res.data as Tag[];
};

export default function ClientPage() {
  const { data: tags = [], error, isLoading } = useSWR('tags', fetcher);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Tags</h1>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-17 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-12 text-lg">
          Failed to load tags.
        </div>
      ) : tags.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-12 text-lg">
          No tags found.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {tags.map((tag: Tag) => (
                  <tr
                    key={tag.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{tag.name}</td>
                    <td className="flex justify-between items-center px-6 py-4 text-gray-800 dark:text-gray-100">
                      <button
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Edit
                      </button>
                      
                      <button
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Merge
                      </button>

                      <button
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mt-4">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-black-600 dark:text-white">
                    {tag.name}
                  </div>
                  <div className="text-base font-bold text-gray-800 dark:text-white">
                    <EllipsisVertical />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
