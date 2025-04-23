import React from 'react';
import {useFormContext} from 'react-hook-form';
import type {FormData} from "../types";

const Review: React.FC = () => {
    const {watch} = useFormContext<FormData>();
    const formData = watch();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Review Your Information</h2>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h3 className="font-bold mb-2">Personal Information</h3>
                <p><span className="font-semibold">Name:</span> {formData.name}</p>
                {formData.email && <p><span className="font-semibold">Email:</span> {formData.email}</p>}
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h3 className="font-bold mb-2">Contact Details</h3>
                <p><span className="font-semibold">Address:</span> {formData.address}</p>
                <p><span className="font-semibold">Phone:</span> {formData.phone}</p>
            </div>

            {(formData.preferences && formData.preferences.length > 0) &&
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <h3 className="font-bold mb-2">Preferences</h3>
                    <div className="flex flex-wrap gap-2">
                        {formData.preferences?.map(pref => (
                            <span
                                key={pref}
                                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-md text-sm"
                            >
                          {pref}
                        </span>
                        ))}
                    </div>
                </div>}
        </div>
    );
};

export default Review;