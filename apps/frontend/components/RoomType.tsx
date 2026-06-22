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
import axios from "axios";


const items = [
  { label: "Voice", value: "Voice" },
  { label: "Chat", value: "Chat" },
  { label: "VideoRoom", value: "VideoRoom" },
  { label: "Gaming", value: "Gaming" },
]
export default function ComboboxBasic() {

  
  const [roomType, setRoomType] = useState("");
  

  
    return (
  <>
  <Select value={roomType} onValueChange={(value) => setRoomType(value)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="" />
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