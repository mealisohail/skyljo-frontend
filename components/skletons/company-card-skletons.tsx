import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CompanyCardSkeleton() {
  return (
    <Card className="">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
        <Skeleton className="w-[120px] h-[120px] rounded-lg" />
        <Skeleton className="h-4 w-[180px]" />
      </CardContent>
    </Card>
  )
}

