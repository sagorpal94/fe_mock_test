import { useFormContext } from "react-hook-form"
import type { FormData } from "../../types"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

const CATEGORIES = [
    { id: "technology", label: "Technology" },
    { id: "health", label: "Health & Wellness" },
    { id: "finance", label: "Finance" },
    { id: "education", label: "Education" },
    { id: "entertainment", label: "Entertainment" },
    { id: "travel", label: "Travel" },
    { id: "food", label: "Food & Dining" },
    { id: "sports", label: "Sports & Fitness" },
]

const CategoriesStep = () => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<FormData>()

    const selectedCategories = watch("categories") || []

    const handleCategoryChange = (category: string, checked: boolean) => {
        if (checked) {
            setValue("categories", [...selectedCategories, category], { shouldValidate: true })
        } else {
            setValue(
                "categories",
                selectedCategories.filter((c) => c !== category),
                { shouldValidate: true },
            )
        }
    }
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Select Categories</h2>
            <p className="text-gray-600">Choose categories that interest you (select at least one).</p>

            <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                        />
                        <Label
                            htmlFor={category.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {category.label}
                        </Label>
                    </div>
                ))}
            </div>

            <input
                type="hidden"
                {...register("categories", {
                    validate: (value) => (value && value.length > 0) || "Please select at least one category",
                })}
            />

            {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>}
        </div>
    );
};

export default CategoriesStep;