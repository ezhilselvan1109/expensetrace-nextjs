import TagsClient from "./TagsClient";
import ComponentCard from "@/components/common/ComponentCard";

export default function TagsPage() {
  return (
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <TagsClient />
        </ComponentCard>
      </div>
  );
}
