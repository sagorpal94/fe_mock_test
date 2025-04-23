import {useFormContext} from "react-hook-form"
import type {FormData} from "../types"
import {Label} from "./ui/label"
import {Textarea} from "./ui/textarea"
import {Input} from "./ui/input.tsx";


const ContactDetails = () => {
    const {
        register,
        formState: {errors},
    } = useFormContext<FormData>()


    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold ">Contact Information</h2>
                <p className="">How can we reach you?</p>
            </div>

            <div className="space-y-4">
                <div className="grid w-full gap-1.5">
                    <div className="space-y-2">
                        <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                        <Textarea
                            id="address"
                            placeholder="123 Main St, City, Country"
                            {...register("address", {
                                required: "Address is required",
                            })}
                            className={errors.address ? "border-red-500 resize-none" : " resize-none"}
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>
                </div>

                <div className="grid w-full gap-1.5">
                    <div>
                        <Label className="block mb-2" htmlFor="phone">
                            Phone Number <span className="text-red-500">*</span>
                        </Label>
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
        </div>
    );
};

export default ContactDetails;