import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const status = [
    { value: "OPEN", label: "Open" },
    { value: "PLANNED", label: "Planned" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "LIVE", label: "Live" },
];

interface SelectStatusProps {
    defaultValue?: string;
}

export default function SelectStatus({ defaultValue }: SelectStatusProps) {
    return (
        <Select name="status" defaultValue={defaultValue}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {status.map((status) => (
                        <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
