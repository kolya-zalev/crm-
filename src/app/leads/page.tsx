"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  new: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  contacted: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  qualified:
    "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  won: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  lost: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export default function TableLeads() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const filterLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" || filter === "" ? true : lead.status === filter;

    return matchesSearch && matchesFilter;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <div className="flex flex-col gap-4  ">
      <div className="flex flex-row gap-2">
        <Input
          className="rounded-xl w-64 max-w-xs"
          value={search}
          onChange={handleChange}
          placeholder="Search"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="won">Won</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="ml-auto"
          onClick={() => console.log("Add Lead")}
          variant="outline"
        >
          Add Lead
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterLeads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.company}</TableCell>
              <TableCell>
                <Badge className={statusStyle[lead.status]}>
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell>{lead.tags.join(", ")}</TableCell>

              <TableCell>
                <Button onClick={() => console.log("edit", lead.id)}>
                  Edit
                </Button>
                <Button onClick={() => console.log("view", lead.id)}>
                  View
                </Button>
                <Button onClick={() => console.log("delete", lead.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
