"use client";

import ContractorTestTable from "@/components/core/contractor-table";
import { makeApiCall } from "@/hooks/api-call";
import { useAuth } from "@/hooks/auth-provider";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [contractor, setContractor] = useState([]);

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
    } catch (error) {}
  };

  useEffect(() => {
    if (accessToken) {
      getContractorById();
    }
  }, [accessToken]);

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <ContractorTestTable data={contractor} />
    </div>
  );
};

export default page;
