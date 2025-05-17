
import React from "react";
import { Badge } from "@/components/ui/badge";
import { LostItemStatus } from "@/types/lost-found-types";

interface StatusBadgeProps {
  status: LostItemStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "Stored":
      return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>;
    case "Returned to Guest":
      return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>;
    case "Disposed":
      return <Badge className="bg-red-500 hover:bg-red-600">{status}</Badge>;
    case "In Process":
      return <Badge className="bg-amber-500 hover:bg-amber-600">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}
