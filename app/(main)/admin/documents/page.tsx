"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import PDFViewer from "@/components/admin/document/pdf-viewer";
import { Badge } from "@/components/ui/badge";

interface Document {
  documentName: string;
  patientName: string;
  assignedTo: string;
  receivedDate: string;
  uploadTime: string;
  labelledDate: string;
  processStatus: string;
}

const documents: Document[] = [
  {
    documentName: "Document 1",
    patientName: "Patient 1",
    assignedTo: "Doctor 1",
    receivedDate: "2024-03-08",
    uploadTime: "10:00 AM",
    labelledDate: "2024-03-09",
    processStatus: "Labelled",
  },
  {
    documentName: "Document 2",
    patientName: "Patient 2",
    assignedTo: "Doctor 2",
    receivedDate: "2024-03-09",
    uploadTime: "11:00 AM",
    labelledDate: "2024-03-10",
    processStatus: "Pending",
  },
  {
    documentName: "Document 3",
    patientName: "Patient 3",
    assignedTo: "Doctor 3",
    receivedDate: "2024-03-09",
    uploadTime: "11:00 AM",
    labelledDate: "2024-03-10",
    processStatus: "In process",
  },
  {
    documentName: "Document 4",
    patientName: "Patient 4",
    assignedTo: "Doctor 4",
    receivedDate: "2024-03-09",
    uploadTime: "11:00 AM",
    labelledDate: "2024-03-10",
    processStatus: "Rejected",
  },
];

const DocumentTable = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const handleCloseDialog = () => {
    setSelectedDocument(null);
  };
  const getStatusColor = (status: Document["processStatus"]) => {
    switch (status) {
      case "Labelled":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "In process":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "Pending":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "Rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };
  return (
    <div className="w-full p-4 pt-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Submitted document</h2>{" "}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Document Name</TableCell>
            <TableCell>Patient Name</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Received Date</TableCell>
            <TableCell>Upload Time</TableCell>
            <TableCell>Labelled Date</TableCell>
            <TableCell>Process Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.documentName}>
              <TableCell>{doc.documentName}</TableCell>
              <TableCell>{doc.patientName}</TableCell>
              <TableCell>{doc.assignedTo}</TableCell>
              <TableCell>{doc.receivedDate}</TableCell>
              <TableCell>{doc.uploadTime}</TableCell>
              <TableCell>{doc.labelledDate}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(doc.processStatus)} font-normal`}
                >
                  {doc.processStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleViewDocument(doc)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={selectedDocument !== null} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Document Details</DialogTitle>
          </DialogHeader>
          <PDFViewer />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentTable;
