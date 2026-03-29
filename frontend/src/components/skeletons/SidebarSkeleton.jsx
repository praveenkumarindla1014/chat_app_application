import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300/50 flex flex-col bg-base-100 transition-all duration-300">
      <div className="p-4 border-b border-base-300/50">
        <div className="flex items-center gap-2 text-primary opacity-50">
          <Users className="size-5 shrink-0" />
          <span className="font-bold text-base hidden lg:block tracking-tight text-base-content/80">
            Contacts
          </span>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 py-1">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            <div className="relative mx-auto lg:mx-0 shrink-0">
              <div className="size-10 rounded-2xl bg-base-300/50 skeleton-shimmer" />
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1 space-y-2">
              <div className="h-3 w-32 bg-base-300/50 rounded-full skeleton-shimmer" />
              <div className="h-2 w-16 bg-base-300/50 rounded-full skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;