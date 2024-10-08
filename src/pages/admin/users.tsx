import {DashboardLayout} from "@/components";

export const AdminUsers = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          {/* Add your content here */}
        </div>
      </div>
    </DashboardLayout>
  );
}