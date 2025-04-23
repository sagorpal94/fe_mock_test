import {useFormContext} from "react-hook-form"
import type {FormData} from "../../types"

const CATEGORIES_MAP: Record<string, string> = {
    technology: "Technology",
    health: "Health & Wellness",
    finance: "Finance",
    education: "Education",
    entertainment: "Entertainment",
    travel: "Travel",
    food: "Food & Dining",
    sports: "Sports & Fitness",
}

export function ReviewStep() {
    const {watch} = useFormContext<FormData>()
    const formData = watch()

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Review Your Information</h2>
            <p className="text-gray-600">Please review your information before submitting.</p>

            <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{formData.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="font-medium">{formData.email}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium">{formData.address}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Phone Number</p>
                            <p className="font-medium">{formData.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">Selected Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {formData.categories?.map((category) => (
                            <span key={category}
                                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                {CATEGORIES_MAP[category] || category}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
