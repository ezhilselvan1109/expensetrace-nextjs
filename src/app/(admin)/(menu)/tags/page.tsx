import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TagsClient from "./TagsClient";

export default function TagsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Tags" />
      <TagsClient />
    </div>
  );
}
