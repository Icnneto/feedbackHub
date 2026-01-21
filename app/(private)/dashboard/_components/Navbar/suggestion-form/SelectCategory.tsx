import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const categories = [
    { value: "FEATURE", label: "Feature" },
    { value: "BUG", label: "Bug" },
    { value: "IMPROVEMENT", label: "Improvement" }
];

interface SelectCategoryProps {
    defaultValue?: string;
}

export default function SelectCategory({ defaultValue }: SelectCategoryProps) {
    return (
        <Select name="category" defaultValue={defaultValue}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
