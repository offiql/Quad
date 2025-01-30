import { useState } from "react";
import type { Relation } from "../types/patient";

interface RelationshipTableProps {
  relationships: Relation[];
  onUpdateAccess: (relationId: string, canView: boolean) => void;
}

export default function RelationshipTable({
  relationships,
  onUpdateAccess,
}: RelationshipTableProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-5">
      <h2 className="text-xl font-semibold mb-4">
        Manage Relations & View Access
      </h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Person</th>
            <th className="p-2 border">Relation</th>
            <th className="p-2 border">View Access</th>
          </tr>
        </thead>
        <tbody>
          {relationships
            .filter((relation) => {
              // Show responder if requester matches patient
              if (relation.requester.id === "patient123")
                return relation.status === "confirmed";

              // Show requester if responder matches patient
              if (relation.responder.id === "patient123")
                return relation.status === "confirmed";

              return false;
            })
            .map((relation) => {
              const isRequester = relation.requester.id === "patient123";
              const displayPerson = isRequester
                ? relation.responder
                : relation.requester;
              return (
                <tr key={relation._id} className="border">
                  <td className="p-2">{displayPerson.name} </td>
                  <td className="p-2">{isRequester ? relation.requesterRelation : relation.responderRelation}</td>
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={relation.canView}
                      onChange={(e) =>
                        onUpdateAccess(relation._id, e.target.checked)
                      }
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
