"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { fetchPdf } from "@/app/actions/doc";
// Dynamically import PDF viewer to avoid SSR issues
const PDFViewers = dynamic(
  () => import("@/components/admin/document/pdf-viewer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    ),
  }
);

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  duration: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  complaints: string[];
  clinicalFindings: string;
  diagnosis: string;
  medicines: Medicine[];
  advice: string[];
  additionalNotes: string;
}

const initialMedicines = [
  {
    id: 1,
    name: "TAB. ABCIXMAB",
    dosage: "1 Morning",
    duration: "8 Days ( Tot:8 Tab)",
  },
  {
    id: 2,
    name: "TAB. VOMIART",
    dosage: "1 Morning, 1 Night",
    duration: "8 Days ( Tot:16 Tab)",
  },
  { id: 3, name: "CAP. ZOCLAR 500", dosage: "1 Morning", duration: "3 Days" },
  {
    id: 4,
    name: "TAB. GESTADINE 10/5R",
    dosage: "1 Night",
    duration: "4 Days ( Tot:4 Tab)",
  },
];
export default function DecodedDocument() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "OPDS PATIENT",
    lastName: "",
    complaints: ["Fever with chills", "Headache"],
    clinicalFindings: "THESE ARE TEST FINDINGS FOR A TEST PATIENT",
    diagnosis: "MALARIA",
    medicines: initialMedicines,
    advice: [
      "TAKE BED REST",
      "TAKE PLENTY OF FLUID",
      "EAT EASY TO DIGEST FOOD LIKE BOILED RICE WITH DAAL",
    ],
    additionalNotes: "",
  });

  const [availableComplaints] = useState([
    "Fever with chills",
    "Headache",
    "Cough",
    "Cold",
  ]);

  const [selectedFile] = useState<string>(
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    // "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-17%20134343%201%20(1)-FAUw95cwUSknZF9uReQvzzQToWT71c.png",
  );
  const [pdfBuffer, setPdfBuffer] = useState<ArrayBuffer | null>(null);



  const handleComplaintToggle = (complaint: string) => {
    setFormData((prev) => ({
      ...prev,
      complaints: prev.complaints.includes(complaint)
        ? prev.complaints.filter((c) => c !== complaint)
        : [...prev.complaints, complaint],
    }));
  };

  const addMedicine = () => {
    const newMedicine = {
      id: formData.medicines.length + 1,
      name: "",
      dosage: "",
      duration: "",
    };
    setFormData((prev) => ({
      ...prev,
      medicines: [...prev.medicines, newMedicine],
    }));
  };

  const addAdvice = () => {
    setFormData((prev) => ({
      ...prev,
      advice: [...prev.advice, ""],
    }));
  };

  const handleSave = () => {
    console.log("Saving form data:", formData);
    // Implement save functionality
  };

  // Add file type detection
  const isFileTypePDF = selectedFile.toLowerCase().endsWith(".pdf");

  return (
    <div className="flex h-dvh hide-scrollbar">
      {/* Left Side - Form */}
      <div className="flex-1 p-6 overflow-y-auto hide-scrollbar overflow-hidden overscroll-contain">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Decoded Document</h2>
          <Button onClick={handleSave}>Save</Button>
        </div>

        <div className="space-y-6">
          {/* Patient Name */}
          <div className="space-y-2">
            <Label>Patient Name</Label>
            <Input
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              placeholder="OPDS PATIENT"
            />
          </div>

          {/* Chief complaints */}
          <div className="space-y-2">
            <Label>Chief complaints</Label>
            <div className="flex flex-wrap gap-2">
              {availableComplaints.map((complaint) => (
                <Badge
                  key={complaint}
                  variant={
                    formData.complaints.includes(complaint)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => handleComplaintToggle(complaint)}
                >
                  {complaint}
                  {formData.complaints.includes(complaint) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Clinical Findings */}
          <div className="space-y-2">
            <Label>Clinical Findings</Label>
            <Textarea
              value={formData.clinicalFindings}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  clinicalFindings: e.target.value,
                }))
              }
            />
          </div>

          {/* Diagnosis */}
          <div className="space-y-2">
            <Label>Diagnosis</Label>
            <Input
              value={formData.diagnosis}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, diagnosis: e.target.value }))
              }
            />
          </div>

          {/* Medicines */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Medicines</Label>
              <Button variant="outline" size="sm" onClick={addMedicine}>
                Add Medicine
              </Button>
            </div>
            <Card className="p-4">
              {formData.medicines.map((medicine, index) => (
                <div
                  key={medicine.id}
                  className="grid grid-cols-3 gap-4 mb-4 last:mb-0"
                >
                  <div className="space-y-2">
                    <Label>{`${index + 1}.Medicine Name`}</Label>
                    <Input
                      value={medicine.name}
                      onChange={(e) => {
                        const newMedicines = [...formData.medicines];
                        newMedicines[index] = {
                          ...medicine,
                          name: e.target.value,
                        };
                        setFormData((prev) => ({
                          ...prev,
                          medicines: newMedicines,
                        }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Dosage</Label>
                    <Input
                      value={medicine.dosage}
                      onChange={(e) => {
                        const newMedicines = [...formData.medicines];
                        newMedicines[index] = {
                          ...medicine,
                          dosage: e.target.value,
                        };
                        setFormData((prev) => ({
                          ...prev,
                          medicines: newMedicines,
                        }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={medicine.duration}
                      onChange={(e) => {
                        const newMedicines = [...formData.medicines];
                        newMedicines[index] = {
                          ...medicine,
                          duration: e.target.value,
                        };
                        setFormData((prev) => ({
                          ...prev,
                          medicines: newMedicines,
                        }));
                      }}
                    />
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Advice */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Advice</Label>
              <Button variant="outline" size="sm" onClick={addAdvice}>
                Add Advice
              </Button>
            </div>
            <Card className="p-4">
              {formData.advice.map((advice, index) => (
                <Input
                  key={index}
                  value={advice}
                  className="mb-2 last:mb-0"
                  onChange={(e) => {
                    const newAdvice = [...formData.advice];
                    newAdvice[index] = e.target.value;
                    setFormData((prev) => ({ ...prev, advice: newAdvice }));
                  }}
                />
              ))}
            </Card>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label>Additional Notes</Label>
            <Textarea
              value={formData.additionalNotes}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  additionalNotes: e.target.value,
                }))
              }
              placeholder="Write here..."
            />
          </div>
        </div>
      </div>

      {/* Right Side - Preview */}
      <div className="w-[600px] border-l flex-1 overflow-y-auto hide-scrollbar overflow-hidden overscroll-contain">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Uploaded Prescription</h3>
          <div className="relative aspect-[1/1.4] border rounded-lg overflow-hidden bg-white">
            {isFileTypePDF ? (
              <PDFViewers />
            ) : (
              <img
                src={selectedFile || "/placeholder.svg"}
                alt="Prescription Preview"
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <div className="mt-4 space-y-2">
            <div className="text-sm text-muted-foreground">
              Uploaded on 30th Aug 2023
            </div>
            <Card className="p-4">
              <h4 className="font-medium mb-2 flex items-center">
                Information
                <span className="ml-2 w-4 h-4 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">
                  i
                </span>
              </h4>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-muted-foreground">Decoded by - </span>
                  Dr. Akshara
                </div>
                <div>
                  <span className="text-muted-foreground">
                    M.S., Reg No NMC 2018
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Decoded date - </span>
                  30/08/2023
                </div>
                <div>
                  <span className="text-muted-foreground">Decoded time - </span>
                  13:00 PM
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
