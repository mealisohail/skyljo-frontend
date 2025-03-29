"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { CompanyCardSkeleton } from "@/components/skletons/company-card-skletons";
import { makeApiCall } from "@/hooks/api-call";
import { useAuth } from "@/hooks/auth-provider";

interface JobTrade {
  _id: string;
  tradeName: string;
}

interface TestItem {
  _id: string;
  TestTitle: string;
  GaresRequired: string;
  MasterVideoCount: number;
  jobTradeID: JobTrade;
}

export default function ContractorTestsPage() {
  const { accessToken } = useAuth();
  const { id } = useParams() as { contractorID: string };

  const [tests, setTests] = useState<TestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTests = async () => {
    try {
      const response = await makeApiCall(
        `test/${id}`,
        "GET",
        null,
        {},
        accessToken
      );
      setTests(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch tests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchTests();
    }
  }, [accessToken]);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CompanyCardSkeleton />
          <CompanyCardSkeleton />
          <CompanyCardSkeleton />
          <CompanyCardSkeleton />
        </div>
      ) : (
        // Force each row to have a fixed 200px height
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
          {tests.map((test) => (
            <Link key={test._id} href={`/workers/test/certificates/${test._id}`}>
              <Card
                className="
                  border border-gray-200 rounded-md overflow-hidden
                  hover:border-[#FE5209] hover:shadow-md transition-shadow
                  cursor-pointer flex flex-col h-full
                "
              >
                {/* Use flex or a scroll container to handle content that might overflow */}
                <CardContent
                  className="
                    p-4 space-y-2 overflow-hidden
                    flex flex-col justify-between h-full
                  "
                >
                  <h2 className="text-base text-gray-800 line-clamp-2">
                    {test.TestTitle}
                  </h2>
                  <div className="text-sm text-gray-600">
                    <p>Gares Required: {test.GaresRequired}</p>
                    <p>Trade Name: {test.jobTradeID?.tradeName}</p>
                    <p>Total Master Count: {test.MasterVideoCount}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
