"use client";

import { useState } from "react";
import DocumentTypeSelection from "@/components/upload-doc/doc-type-selection";
import UploadDocumentsStep from "@/components/upload-doc/upload-doc";
import DocumentDetailsStep from "@/components/upload-doc/detail-step";
import UploadSuccess from "@/components/upload-doc/upload-success";
import MobileHeader from "@/components/mobile-header";

type DocumentType = "prescription" | "lab-report" | null;
type UploadStep = "type-selection" | "upload" | "details" | "success";

export default function UploadDocumentsPage() {
  const [step, setStep] = useState<UploadStep>("type-selection");
  const [documentType, setDocumentType] = useState<DocumentType>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleTypeSelection = (type: "prescription" | "lab-report") => {
    setDocumentType(type);
    setStep("upload");
  };

  const handleFilesUploaded = (files: File[]) => {
    setUploadedFiles(files);
    setStep("details");
  };

  const handleDetailsSubmitted = (details: any) => {
    // Here you would typically send the files and details to your server
    console.log("Files:", uploadedFiles);
    console.log("Details:", details);
    setStep("success");
  };

  const handleReset = () => {
    setStep("type-selection");
    setDocumentType(null);
    setUploadedFiles([]);
  };
  const handleBack = () => {
    switch (step) {
      case "upload":
        setStep("type-selection");
        setDocumentType(null);
        break;
      case "details":
        setStep("upload");
        break;
      default:
        break;
    }
  };

  return (
    <main className="">
      <MobileHeader />
      <div className="pb-8 pt-10">
        <div className="flex justify-center flex-col pb-8 items-center">
          <h1 className="text-center text-2xl font-semibold">
            Upload Your Medical Reports
          </h1>
          <p className="text-center text-gray-500/70 text-sm">
            Upload your prescriptions or lab reports to maintain easy access to
            your medical history
          </p>
        </div>
        {step === "type-selection" && (
          <DocumentTypeSelection onSelect={handleTypeSelection} />
        )}
        {step === "upload" && documentType && (
          <UploadDocumentsStep
            documentType={documentType}
            onNext={handleFilesUploaded}
            onBack={handleBack}
          />
        )}
        {step === "details" && (
          <DocumentDetailsStep
            onNext={handleDetailsSubmitted}
            onBack={handleBack}
          />
        )}
        {step === "success" && <UploadSuccess onReset={handleReset} />}
      </div>
    </main>
  );
}
