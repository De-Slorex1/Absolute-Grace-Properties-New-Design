import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getAllDevelopmentsAdmin } from "@/lib/developments";
import { DeleteListingButton } from "@/components/admin/delete-listing-button";

export default async function AdminListingsPage() {
  const developments = await getAllDevelopmentsAdmin();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold">Listings</h1>
        <Link
          href="/admin/listings/new"
          className="flex items-center gap-2 rounded-sm bg-indigo px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-deep"
        >
          <Plus className="h-4 w-4" />
          Add New Listing
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-line bg-white">
        <table className="w-full text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-line text-[11.5px] uppercase tracking-wider text-ink/45">
              <th className="p-4 font-medium">Photo</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Plots</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {developments.map((dev) => (
              <tr key={dev.id} className="border-b border-line last:border-none hover:bg-parchment-warm">
                <td className="p-4">
                  <div className="relative h-12 w-16 overflow-hidden rounded-sm">
                    <Image src={dev.image} alt={dev.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4 font-medium">{dev.name}</td>
                <td className="p-4 text-ink/60">{dev.location}</td>
                <td className="p-4 text-ink/60">
                  {dev.priceFrom} <span className="text-[11.5px]">{dev.priceUnit}</span>
                </td>
                <td className="p-4 text-ink/60">
                  {dev.plotsAvailable} / {dev.plotsTotal}
                </td>
                <td className="p-4">
                  <span
                    className={`rounded-sm px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider ${
                      dev.published ? "bg-whatsapp/10 text-whatsapp" : "bg-ink/5 text-ink/50"
                    }`}
                  >
                    {dev.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/listings/${dev.id}/edit`}
                      className="text-ink/50 hover:text-ink"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteListingButton id={dev.id} slug={dev.slug} name={dev.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {developments.length === 0 && (
          <p className="p-6 text-center text-[13px] text-ink/45">
            No listings yet — click &quot;Add New Listing&quot; to create one.
          </p>
        )}
      </div>
    </div>
  );
}