import { useFormContext } from "react-hook-form"
import type { FormData } from "../../types"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

const ContactInfo = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<FormData>()
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
            <p className="text-gray-600">How can we reach you?</p>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                        id="address"
                        placeholder="123 Main St, City, Country"
                        {...register("address", {
                            required: "Address is required",
                        })}
                        className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        placeholder="1234567890"
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Phone number must contain only digits",
                            },
                        })}
                        className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;