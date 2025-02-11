"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {   Dialog,   DialogContent,   DialogDescription,   DialogHeader,   DialogTitle,   DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Trash } from "lucide-react"
import { nanoid } from "nanoid"

interface TeamMember {
  id: string
  name: string
  email: string
  department: string
  lastSignIn: string
  assignedTasks: number
  completedTasks: number
  pendingTasks: number
  avgTime: string
  avatar: string
}

export default function TeamTable() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Abc Xyz",
      email: "abc@example.com",
      department: "Decoding",
      lastSignIn: "Today 8 Pm",
      assignedTasks: 4,
      completedTasks: 4,
      pendingTasks: 0,
      avgTime: "48 mins",
      avatar: "/placeholder.svg",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newMember, setNewMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  })

  const addMember = () => {
    if (!newMember.firstName || !newMember.lastName || !newMember.email || !newMember.department) {
      return alert("Please fill all fields")
    }
    const fullName = `${newMember.firstName} ${newMember.lastName}`
    const newTeamMember: TeamMember = {
      id: nanoid(),
      name: fullName,
      email: newMember.email,
      department: newMember.department,
      lastSignIn: "Never",
      assignedTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      avgTime: "N/A",
      avatar: "/placeholder.svg",
    }
    setTeamMembers([...teamMembers, newTeamMember])
    setIsDialogOpen(false)
    setNewMember({ firstName: "", lastName: "", email: "", department: "" })
  }

  const removeMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  return (
    <div className="w-full p-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Team</h2>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add member
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Active Team Members</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Last Sign In</TableHead>
              <TableHead>Assigned Task</TableHead>
              <TableHead>Completed Task</TableHead>
              <TableHead>Pending Task</TableHead>
              <TableHead>Avg Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>{member.lastSignIn}</TableCell>
                <TableCell>{member.assignedTasks} tasks</TableCell>
                <TableCell>{member.completedTasks} tasks</TableCell>
                <TableCell>{member.pendingTasks} tasks</TableCell>
                <TableCell>{member.avgTime}</TableCell>
                <TableCell className="pl-4">
                  <Button variant="destructive" size="icon" onClick={() => removeMember(member.id)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>Fill in all the required information below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" value={newMember.firstName} onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })} />
              <Input placeholder="Last Name" value={newMember.lastName} onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })} />
            </div>
            <Input placeholder="Email" type="email" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} />
            <Select onValueChange={(value) => setNewMember({ ...newMember, department: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Decoding">Decoding</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={addMember}>Add Member</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}