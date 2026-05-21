"use client";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";

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
          <SelectTrigger className="w-full max-w-48 rounded-xl">
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
        <p className="p-2  ml-auto">Total Leads: {filterLeads.length}</p>
        <Button
          className="ml-auto rounded-xl bg-blue-300 hover:bg-blue-500 shadow-xl cursor-pointer"
          onClick={() => console.log("Add Lead")}
        >
          Add Lead
        </Button>
      </div>

      <Table>
        <TableHeader  >
          <TableRow >
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Phone</TableHead>
            <TableHead className="text-center">Company</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Tags</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterLeads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="py-4 text-center text-gray-500">
                No leads found
              </TableCell>
            </TableRow>
          ) : (
            filterLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="text-center">{lead.name}</TableCell>
                <TableCell className="text-center">{lead.email}</TableCell>
                <TableCell className="text-center">{lead.phone}</TableCell>
                <TableCell className="text-center">{lead.company}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={
                      statusStyle[lead.status as keyof typeof statusStyle]
                    }
                  >
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{lead.tags.join(", ")}</TableCell>

                <TableCell className="flex flex-row gap-1 justify-center ">
                  <Button
                    className="cursor-pointer rounded-xl bg-white-700 hover:bg-gray-300 text-black h-6 p-1 "
                    onClick={() => console.log("edit", lead.id)}
                  >
                    <AiFillEdit />
                  </Button>
                  <Button
                    className="cursor-pointer rounded-xl bg-white-700 hover:bg-gray-300 text-black h-6 p-1 "
                    onClick={() => console.log("view", lead.id)}
                  >
                    <GrView />
                  </Button>
                  <Button
                    className="cursor-pointer rounded-xl bg-white-700 hover:bg-gray-300 text-black h-6 p-1"
                    onClick={() => console.log("delete", lead.id)}
                  >
                    <MdDelete />
                  </Button>
                  
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
