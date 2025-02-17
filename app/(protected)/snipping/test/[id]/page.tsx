"use client";

import ContractorTestTable from "@/components/core/contractor-table";
import LoadingTable from "@/components/skletons/loading-table";
import { makeApiCall } from "@/hooks/api-call";
import { useAuth } from "@/hooks/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { accessToken } = useAuth();
  const [contractor, setContractor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getContractorById = async () => {
    try {
      const contractors = await makeApiCall(
        `test/${id}`,
        "GET",
        null,
        {},
        accessToken
      );
      setContractor(contractors?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getContractorById();
  }, [accessToken]);

  const handleSendAI = async (testId) => {
    const sendToAi = await makeApiCall(
      "send-test-to-visisens",
      "POST",
      { testId: testId },
      {},
      accessToken
    );
    if (sendToAi?.success) {
      toast({
        title: "Sent Successfully",
        description: "Sent to ai successfully!!",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      {isLoading ? (
        <LoadingTable />
      ) : (
        <ContractorTestTable data={contractor} handleSendAI={handleSendAI} />
      )}
    </div>
  );
};

export default page;
