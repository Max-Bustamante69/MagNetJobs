import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 mt-20 justify-center w-full md:w-1/2  xg:w-1/3">
      <Skeleton className="bg-white bg-opacity-10 h-[520px] w-full  rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="bg-white bg-opacity-10 h-4  w-full " />
        <Skeleton className="bg-white bg-opacity-10 h-4 w-1/3" />
      </div>
    </div>
  );
}
