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

]

export default function SelectStatus() {
    return (
        <Select name="status">
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
