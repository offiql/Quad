"use client";

import { getpatientData } from "@/lib/getTokens";
import { backend_url } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MonitoringChart from "./monitoring-charts";
import { useRouter } from "next/navigation";
import { Patient } from "../types/patient";

interface DataPoint {
  date: string;
  value: number;
  _id:string
}

const diabetesData = [
  { date: "2025-01-22", value: 85 },
  { date: "2025-01-23", value: 65 },
  { date: "2025-01-24", value: 35 },
  { date: "2025-01-25", value: 45 },
  { date: "2025-01-26", value: 75 },
  { date: "2025-01-27", value: 40 },
  { date: "2025-01-28", value: 90 },
];

const bloodPressureData = [
  { date: "2025-01-22", value: 80 },
  { date: "2025-01-23", value: 60 },
  { date: "2025-01-24", value: 30 },
  { date: "2025-01-25", value: 40 },
  { date: "2025-01-26", value: 70 },
  { date: "2025-01-27", value: 35 },
  { date: "2025-01-28", value: 85 },
];

export default function HealthMonitoring() {
  const [isExpanded1, setIsExpanded1] = useState(true);
  const [isExpanded2, setIsExpanded2] = useState(true);
  const [diabetes, setDiabetes] = useState<DataPoint[]>([]);
  const [bloodpressure, setBloodpressure] = useState<DataPoint[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const updateBackend = async (updatedData: DataPoint[], type: string) => {
    console.log("Starting updateBackend with:", { updatedData, type });

    try {
      const response = await fetch(`${backend_url}/patient/update-chart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chartData: updatedData,
          type,
          patientId: patient?._id,
        }),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Parsed result:", result);

      if (!response.ok) {
        console.error("Response not ok:", response);
        toast.error("Failed to update chart data");
        return;
      }

      if (type === "diabetes") {
        setDiabetes(result.data);
      } else if (type === "bloodpressure") {
        setBloodpressure(result.data);
      }

      toast.success("Chart data updated successfully");
      // window.location.reload();
    } catch (error) {
      console.error("Detailed error:", error);
      toast.error("Failed to update chart data");
    }
  };
  const fetchData = async (type: string): Promise<DataPoint[]> => {
    const patient = getpatientData();
    try {
      const response = await fetch(
        `${backend_url}/patient/fetch-chart?patientId=${patient._id}&type=${type}`
      );

      if (!response.ok) {
        // toast.error("Failed to update chart data");
        return [];
      }

      const result = await response.json();
      console.log(`Fetched ${type} data:`, result);
      return result;
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      // toast.error(`Failed to fetch ${type} data`);
      return [];
    }
  };
  // Fetch initial data
  const fetchInitialData = async () => {
    const diabetesData = await fetchData("diabetes");
    const bloodPressureData = await fetchData("bloodpressure");

    setDiabetes(diabetesData);
    setBloodpressure(bloodPressureData);
  };
  useEffect(() => {
    const patient = getpatientData();
    setPatient(patient);
    fetchInitialData();
  }, []);

  return (
    <div className="grid xl:grid-cols-2 w-full gap-4 px-4 md:px-8">
      {patient?.isDiabetic === "Yes" && (
        <MonitoringChart
          title="Diabetes Monitoring"
          data={diabetes}
          updateBackend={updateBackend}
          type={"diabetes"}
          yAxisLabel="mg/dl"
          maxValue={100}
          isCollapsible
          isExpanded={isExpanded1}
          onToggle={() => setIsExpanded1(!isExpanded1)}
        />
      )}
      {patient?.hasBloodPressure === "Yes" && (
        <MonitoringChart
          title="Blood Pressure Monitoring"
          data={bloodpressure}
          updateBackend={updateBackend}
          type={"bloodpressure"}
          yAxisLabel="mm/Hg"
          maxValue={100}
          isCollapsible
          isExpanded={isExpanded2}
          onToggle={() => setIsExpanded2(!isExpanded2)}
        />
      )}
    </div>
  );
}
