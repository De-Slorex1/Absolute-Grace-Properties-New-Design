import { notFound } from "next/navigation";
import { getDevelopmentByIdAdmin } from "@/lib/developments";
import { DevelopmentForm } from "@/components/admin/development-form";

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const development = await getDevelopmentByIdAdmin(id);
  if (!development) notFound();

  return (
    <div>
      <h1 className="mb-8 font-serif text-2xl font-semibold">Edit Listing</h1>
      <DevelopmentForm existing={development} />
    </div>
  );
}