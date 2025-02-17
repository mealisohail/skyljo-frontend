import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LoadingTable() {
  return (
    <div className="space-y-6 bg-white p-6">
      {/* Header Skeletons */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      {/* Table Skeleton */}
      <Table>
        <TableHeader>
          <TableRow>
        <TableHead>Test Title</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Generate 3 skeleton rows */}
          {[...Array(3)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-5 w-[180px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[80px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[120px]" />
              </TableCell>
              <TableCell className="space-x-2">
                <Skeleton className="h-9 w-[120px] inline-block" />
                <Skeleton className="h-9 w-[120px] inline-block" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Footer Skeleton */}
      <Skeleton className="h-4 w-[200px]" />
    </div>
  )
}

