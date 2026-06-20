"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const items = [
  { label: "Voice", value: "Voice" },
  { label: "Chat", value: "Chat" },
  { label: "VideoRoom", value: "VideoRoom" },
  { label: "Gaming", value: "Gaming" },
]
export default function ComboboxBasic() {
    return (
  <>
  <Select items={items}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>

    </>
  );
}