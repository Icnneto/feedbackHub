import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import SelectCategory from "./SelectCategory"
import SelectStatus from "./SelectStatus"

interface SuggestionFormFieldsProps {
    defaultValues?: {
        id?: string;
        title?: string;
        description?: string;
        category?: string;
        status?: string;
    };
}

export default function SuggestionFormFields({ defaultValues }: SuggestionFormFieldsProps) {
    return (
        <div className="grid gap-4">
            {defaultValues?.id && (
                <input type="hidden" name="id" value={defaultValues.id} />
            )}
            <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={defaultValues?.title} />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={defaultValues?.description} />
            </div>
            <div className="flex gap-12 my-4">
                <SelectCategory defaultValue={defaultValues?.category} />
                <SelectStatus defaultValue={defaultValues?.status} />
            </div>
        </div>
    )
}
