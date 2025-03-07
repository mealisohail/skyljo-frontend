"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { makeApiCall } from "@/hooks/api-call";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/auth-provider";
import { CompanyCardSkeleton } from "@/components/skletons/company-card-skletons";

export default function ContractorsGrid() {
  const { accessToken } = useAuth();

  const [contractors, setContractors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log('accessToken===>', accessToken)


  const getContractors = async () => {
    try {
      const contractors = await makeApiCall(
        "contractor",
        "GET",
        null,
        {},
        accessToken
      );
      setContractors(contractors?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      getContractors();
  }, [accessToken]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Contractors</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CompanyCardSkeleton />
          <CompanyCardSkeleton />
          <CompanyCardSkeleton />
          <CompanyCardSkeleton />
          <CompanyCardSkeleton />
          <CompanyCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contractors?.map((contractor) => (
            <Link key={contractor.id} href={`/snipping/test/${contractor.id}`}>
              <Card key={contractor.id} className="overflow-hidden">
                <CardContent className="p-4 space-y-2 flex justify-center items-center flex-col">
                  <div className="w-[100px] h-[100px] relative">
                    <Image
                      src={
                        contractor?.companyLogo === 'https://example.com/logo.png' ? 
                        "https://cdn-icons-png.flaticon.com/512/8015/8015003.png" : contractor?.companyLogo
                      }
                      alt={`${contractor?.companyName} logo`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p>{contractor?.companyName}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
