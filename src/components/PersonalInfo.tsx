import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../types';
import {Label} from "./ui/label.tsx";
import {Input} from "./ui/input.tsx";

const PersonalInfo: React.FC = () => {
    const { register, formState: { errors } } = useFormContext<FormData>();
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">Personal Information</h2>
            <p className="text-secondary-foreground">Please provide your personal details.</p>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        {...register("name", {
                            required: "Name is required",
                        })}
                        className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        {...register("email", {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                        className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;