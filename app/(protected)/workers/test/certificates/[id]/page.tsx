  "use client";

  import React, { useState, useEffect } from "react";
  import { useParams, useRouter } from "next/navigation";
  import Image from "next/image";
  import { makeApiCall } from "@/hooks/api-call";
  import { useAuth } from "@/hooks/auth-provider";

  interface WorkerInfo {
    _id: string;
    name: string;
    email?: string;
    phoneNumber: string;
    profilePicture?: string;
  }

  interface CertificateInfo {
    worker: WorkerInfo;
    certificateId: string;
    score: number | null;
    verified: boolean;
    sentToAI: boolean;
    aiToken: string | null;
    isVideoSnipped: boolean;
    videoSnipTimeStamp: {
      start: string;
      stop: string;
    }[];
  }

  export default function CertificateTablePage() {
    const { accessToken } = useAuth();
    const { id } = useParams() as { id: string };
    const router = useRouter();

    const [certificates, setCertificates] = useState<CertificateInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const fetchCertificates = async () => {
      setIsLoading(true);
      try {
        const response = await makeApiCall(
          `certificates/${id}`,
          "GET",
          null,
          {},
          accessToken
        );
        setCertificates(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      if (accessToken) {
        fetchCertificates();
      }
    }, [accessToken, id]);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = certificates.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(certificates.length / rowsPerPage);

    const handleSendToAI = async (certificateId: string) => {
      try {
        await makeApiCall(
          `send-to-ai-worker/${certificateId}`,
          "POST",
          null,
          {},
          accessToken
        );
        fetchCertificates();
      } catch (error) {
        console.error("Failed to send to AI:", error);
      }
    };

    const handleStartSnipping = (certificateId: string) => {
      router.push(`/workers/test/snip/${certificateId}`);
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-gray-800">
            Certificates
          </h1>
          <p className="text-sm text-gray-600">
            Total Certificates: {certificates.length}
          </p>
        </div>

        {isLoading ? (
          <p className="text-gray-600">Loading certificates...</p>
        ) : (
          <>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Sr. No.</th>
                    <th className="px-4 py-3 text-left">Profile</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Score</th>
                    <th className="px-4 py-3 text-left">Verified</th>
                    <th className="px-4 py-3 text-left">Sent to AI</th>
                    <th className="px-4 py-3 text-left">Video Snipped</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                  {currentRows.map((item, index) => (
                    <tr key={item.certificateId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border-t">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td className="px-4 py-3 border-t">
                        {item.worker.profilePicture ? (
                          <div className="relative w-10 h-10">
                            <Image
                              src={item.worker.profilePicture}
                              alt="Worker Profile"
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">
                            No Img
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 border-t">{item.worker.name}</td>
                      <td className="px-4 py-3 border-t">{item.worker.phoneNumber}</td>
                      <td className="px-4 py-3 border-t">{item.score !== null ? item.score : "N/A"}</td>
                      <td className="px-4 py-3 border-t">{item.verified ? "Yes" : "No"}</td>
                      <td className="px-4 py-3 border-t">{item.sentToAI ? "Yes" : "No"}</td>
                      <td className="px-4 py-3 border-t">{item.isVideoSnipped ? "Yes" : "No"}</td>
                      <td className="px-4 py-3 border-t space-x-2">
                        {!item.sentToAI ? (
                          <button
                            onClick={() => handleSendToAI(item.certificateId)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                          >
                            Send to AI
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStartSnipping(item.certificateId)}
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm"
                          >
                            Start Snipping
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}

                  {currentRows.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center p-4 text-gray-500">
                        No certificates found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {certificates.length > rowsPerPage && (
              <div className="flex items-center justify-between mt-6">
                <span className="text-sm text-gray-600">
                  Showing {indexOfFirstRow + 1} - {Math.min(indexOfLastRow, certificates.length)} of {certificates.length}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
