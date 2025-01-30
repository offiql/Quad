import MobileHeader from "@/components/mobile-header";
import PatientProfile from "@/components/profile/patientProfile";

export default function ProfilePage() {
  return (
    <main className="h-full w-full">
      <MobileHeader />
      <PatientProfile />
    </main>
  );
}
