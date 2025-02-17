import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingVideoTrimmer() {
  return (
    <div className="w-full flex flex-row gap-10 max-w-6xl mx-auto space-y-6 bg-white p-6">
      {/* Video Player Area */}
      <div className="flex flow-row gap-3">
        <Skeleton className="w-[300px] h-[550px] rounded-lg" />
        <Skeleton className="w-[300px] h-[550px] rounded-lg" />
      </div>

      {/* Controls Section */}
      <div className="w-full">
        <div className="flex justify-end gap-2">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>

        {/* Trim Ranges Section */}
        <div className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-[100px]" />
          </div>
          {/* Trim Range Items */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="flex justify-center">
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
