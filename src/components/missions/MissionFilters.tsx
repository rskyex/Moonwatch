"use client";

import { useState, useCallback } from "react";
import { FilterBar } from "@/components/shared";
import { MissionStatus, MissionType } from "@/types";
import { getMissionStatusLabel } from "@/lib/formatting";

interface MissionFiltersProps {
  entityOptions: { value: string; label: string }[];
  regionOptions: { value: string; label: string }[];
  onFilterChange: (filters: {
    status: string;
    type: string;
    entityId: string;
    regionId: string;
  }) => void;
}

const statusOptions = Object.values(MissionStatus).map((s) => ({
  value: s,
  label: getMissionStatusLabel(s),
}));

const typeOptions = Object.values(MissionType).map((t) => ({
  value: t,
  label: t
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" "),
}));

export default function MissionFilters({
  entityOptions,
  regionOptions,
  onFilterChange,
}: MissionFiltersProps) {
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [entityId, setEntityId] = useState("");
  const [regionId, setRegionId] = useState("");

  const emit = useCallback(
    (patch: Partial<{ status: string; type: string; entityId: string; regionId: string }>) => {
      const next = {
        status,
        type,
        entityId,
        regionId,
        ...patch,
      };
      onFilterChange(next);
    },
    [status, type, entityId, regionId, onFilterChange],
  );

  return (
    <FilterBar
      filters={[
        {
          id: "mission-status",
          label: "Status",
          options: statusOptions,
          value: status,
          onChange: (v) => {
            setStatus(v);
            emit({ status: v });
          },
        },
        {
          id: "mission-type",
          label: "Type",
          options: typeOptions,
          value: type,
          onChange: (v) => {
            setType(v);
            emit({ type: v });
          },
        },
        {
          id: "mission-entity",
          label: "Entity",
          options: entityOptions,
          value: entityId,
          onChange: (v) => {
            setEntityId(v);
            emit({ entityId: v });
          },
        },
        {
          id: "mission-region",
          label: "Region",
          options: regionOptions,
          value: regionId,
          onChange: (v) => {
            setRegionId(v);
            emit({ regionId: v });
          },
        },
      ]}
    />
  );
}
