"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { makeApiCall } from "@/hooks/api-call";
import { useAuth } from "@/hooks/auth-provider";

interface MasterVideo {
  safetyMeasures: string;
  instructions: string;
  videoCaptions: string;
  StatusFromAI: string;
  createdAt: string;
}

interface ContractorTest {
  TestTitle: string;
  GaresRequired: string;
  MasterVideoArray: MasterVideo[];
  createdAt: string;
}

export default function ContractorTestTable({ data, handleSendAI }) {
  const router = useRouter();
  const { accessToken } = useAuth();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full min-w-[1100px]">
      <CardHeader>
        <CardTitle>Contractor Tests</CardTitle>
        <CardDescription>
          A list of all contractor safety tests and their requirements.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Table className="w-full">
          <TableCaption>A list of contractor safety tests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Test Title</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="">Created At</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {data.map((test) =>
              test.MasterVideoArray.map((video, videoIndex) => (
                <TableRow key={`${test.TestTitle}-${videoIndex}`}>
                  {videoIndex === 0 && (
                    <TableCell
                      rowSpan={test.MasterVideoArray.length}
                      className="font-medium"
                    >
                      {test.TestTitle}
                    </TableCell>
                  )}
                  <TableCell >
                    Master {videoIndex + 1}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        video.videoURLArray[0]?.videoSnipTimeStamp?.length > 0 ? "success" : "secondary"
                      }
                    >
                      {video.videoURLArray[0]?.videoSnipTimeStamp?.length > 0 ? 'Snipping Done' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="">
                    {formatDate(video.createdAt)}
                  </TableCell>
                  <TableCell className="space-x-3 text-right">
                    {!video?.AIUniqueToken && (
                      <Button
                        onClick={() => handleSendAI(test?._id)}
                        className="bg-[#ff6652]"
                      >
                        Send to AI
                      </Button>
                    )}
                    <Button
                      disabled={!video?.AIUniqueToken}
                      onClick={() =>
                        router.push(`/snipping/test/snip/${video?._id}`)
                      }
                      className="bg-[#ff6652]"
                    >
                      {video.videoURLArray[0]?.videoSnipTimeStamp?.length > 0 ? 'Edit Snipping'  : 'Start Snipping'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
