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
  { label: "voice", value: "voice" },
  { label: "chat", value: "chat" },
  { label: "VideoRoom", value: "VideoRoom" },
  { label: "Gaming", value: "gamingRoom" },
]
type Props = {
  roomType: string;
  setRoomType: React.Dispatch<React.SetStateAction<string>>;
};

export default function ComboboxBasic({
  roomType,
  setRoomType,
}: Props) {
  return (
    <Select
      value={roomType}
      onValueChange={(value) => setRoomType(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select room type" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}