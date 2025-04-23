
import { useFormContext } from 'react-hook-form';
import type { FormData } from "../types"
import {Checkbox} from "./ui/checkbox.tsx";

const categories = [
    'Technology',
    'Sports',
    'Music',
    'Movies',
    'Books',
    'Travel',
    'Food'
];

const Preferences = () => {
    const { setValue, watch, formState: { errors } } = useFormContext<FormData>();
    const selectedPreferences = watch('preferences') || [];

    const handleCheckboxChange = (category: string, checked: boolean) => {
        const currentPreferences = [...selectedPreferences];
        if (checked) {
            currentPreferences.push(category);
        } else {
            const index = currentPreferences.indexOf(category);
            if (index > -1) {
                currentPreferences.splice(index, 1);
            }
        }
        setValue('preferences', currentPreferences);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Preferences</h2>

            <div>
                <label className="block mb-2">
                    Select Categories
                </label>
                <div className="grid grid-cols-2 gap-4">
                    {categories.map(category => (
                        <label key={category} className="flex items-center space-x-2">
                            <Checkbox
                                checked={selectedPreferences.includes(category)}
                                onCheckedChange={(checked) => handleCheckboxChange(category, checked as boolean)}
                                value={category}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span>{category}</span>
                        </label>
                    ))}
                </div>
                {errors.preferences && (
                    <p className="text-red-500 text-sm mt-1">{errors.preferences.message}</p>
                )}
            </div>

            <div className="mt-4">
                <p className="text-sm text-gray-600">
                    Selected: {selectedPreferences.length} / {categories.length}
                </p>
            </div>
        </div>
    );
};

export default Preferences;