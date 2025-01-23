import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaPlus, FaPlusCircle } from "react-icons/fa";

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  image: string;
}

const familyMembers: FamilyMember[] = [
  {
    id: "1",
    name: "Mr. Anand Sharma",
    relation: "(Father)",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Mr. Anand Sharma",
    relation: "(Father)",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "3",
    name: "Mr. Anand Sharma",
    relation: "(Father)",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "4",
    name: "Mr. Anand Sharma",
    relation: "(Father)",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "5",
    name: "Mr. Anand Sharma",
    relation: "(Father)",
    image: "https://github.com/shadcn.png",
  }
];

export default function FamilyTree() {
  return (
    <div className="mt-6 rounded-lg">
      <div className="flex items-center justify-between mb-4 border-b">
        <h3 className="text-lg font-semibold text-[#59748A]">Family Tree</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground"
        >
          Edit
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {familyMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg text-center"
          >
            <Avatar className="mx-auto w-10 h-10">
              <AvatarImage src={member.image} alt="@shadcn" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <span className="text-sm text-[#112449] font-medium">
              {member.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {member.relation}
            </span>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg text-center">
          <span className="text-sm text-[#112449] font-medium">
            <FaPlus className="mx-auto w-8 h-8 mb-2" />
          </span>
          <span className="text-xs text-muted-foreground">
            Add Family Member
          </span>
        </div>
      </div>
    </div>
  );
}
