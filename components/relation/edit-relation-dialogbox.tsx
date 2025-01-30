import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Relation } from "../types/patient"

interface EditRelationDialogProps {
  relation: Relation | null
  onClose: () => void
  onSave: (
    newYourRelation: string,
    newTheirRelation: string,
    newStatus: "pending" | "confirmed" | "rejected",
  ) => Promise<void>
  loggedInUserId: string
}

export function EditRelationDialog({ relation, onClose, onSave, loggedInUserId }: EditRelationDialogProps) {
  const [yourRelation, setYourRelation] = useState("")
  const [theirRelation, setTheirRelation] = useState("")
  const [status, setStatus] = useState<"pending" | "confirmed" | "rejected">("pending")

  useEffect(() => {
    if (relation) {
      const isRequester = relation.requester.id === loggedInUserId
      setYourRelation(isRequester ? relation.requesterRelation : relation.responderRelation)
      setTheirRelation(isRequester ? relation.responderRelation : relation.requesterRelation)
      setStatus(relation.status as "pending" | "confirmed" | "rejected")
    }
  }, [relation, loggedInUserId])

  const handleSave = async () => {
    if (relation) {
      await onSave(yourRelation, theirRelation, status)
      onClose()
    }
  }

  return (
    <Dialog open={!!relation} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Relationship</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="yourRelation" className="text-right">
              Your Relation
            </Label>
            <Input
              id="yourRelation"
              value={yourRelation}
              onChange={(e) => setYourRelation(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="theirRelation" className="text-right">
              Their Relation
            </Label>
            <Input
              id="theirRelation"
              value={theirRelation}
              onChange={(e) => setTheirRelation(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={(value: "pending" | "confirmed" | "rejected") => setStatus(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

