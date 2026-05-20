"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Lead } from "@/lib/types/lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const leads: Lead[] = [
  {
    id: "1",
    name: "Kolya",
    email: "kolaov356@gmail.com",
    phone: "+380986359129",
    company: "Home",
    status: "new",
    tags: [],
    notes: "yes",
    source: "no",
  },
  {
    id: "2",
    name: "John",
    email: "johnexample@gmail.com",
    phone: "",
    company: "mcdonalds",
    status: "contacted",
    tags: [],
    notes: "test",
  },
  {
    id: "3",
    name: "Alex",
    email: "Alexexample@gmail.com",
    phone: "+44444444",
    company: "Apple",
    status: "qualified",
    tags: [],
    notes: "yes",
    source: "no",
  },
  {
    id: "4",
    name: "Mark",
    email: "markexample@gmail.com",
    phone: "+1241241124",
    company: "adidas",
    status: "won",
    tags: [],
    notes: "test",
  },
  {
    id: "5",
    name: "Adam",
    email: "adamexample@gmail.com",
    phone: "+8777777777",
    company: "Sony",
    status: "lost",
    tags: [],
    notes: "yes",
    source: "no",
  },
];
const statusStyle = { 
  new: 'bg-blue-50 text-blue-700',
  contacted: 'bg-sky-50 text-sky-700',
  qualified: 'bg-purple-50 text-purple-700',
  won: 'bg-green-50 text-green-700',
  lost: 'bg-red-50 text-red-700'
}

export default function TableLeads() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell className="font-medium">{lead.name}</TableCell>
            <TableCell>{lead.email}</TableCell>
            <TableCell>{lead.phone}</TableCell>
            <TableCell>{lead.company}</TableCell>
            <TableCell>{lead.status}</TableCell>
            <TableCell>{lead.tags.join(", ")}</TableCell>

            <TableCell>
              <Button onClick={() => console.log("edit", lead.id)}>Edit</Button>
              <Button onClick={() => console.log("view", lead.id)}>View</Button>
              <Button onClick={() => console.log("delete", lead.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
