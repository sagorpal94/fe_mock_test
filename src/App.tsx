import {ThemeProvider} from "./context/theme-provider.tsx";
import Navbar from "./components/Navbar.tsx";
import {useEffect, useState} from "react";
import type { FormData } from "./types"
import {FormProvider, useForm} from "react-hook-form";
import {Card, CardContent} from "./components/ui/card.tsx";
import PersonalInfo from "./components/steps/personal-info.tsx";
import {FormStepper} from "./components/form-stepper.tsx";
import ContactInfo from "./components/steps/contact-info.tsx";
import CategoriesStep from "./components/steps/categories-step.tsx";
import {ReviewStep} from "./components/steps/review-step.tsx";


function App() {

    const [currentStep, setCurrentStep] = useState(0)
    const [submissions, setSubmissions] = useState<FormData[]>([])

    const formMethods = useForm<FormData>({
        defaultValues: {
            name: "",
            email: "",
            address: "",
            phone: "",
            categories: [],
        },
        mode: "onChange",
    })

    // Load saved form data and submissions from localStorage on mount
    useEffect(() => {
        const savedFormData = localStorage.getItem("formData")
        const savedSubmissions = localStorage.getItem("submissions")

        if (savedFormData) {
            const parsedData = JSON.parse(savedFormData)
            Object.keys(parsedData).forEach((key) => {
                formMethods.setValue(key as keyof FormData, parsedData[key])
            })
        }

        if (savedSubmissions) {
            setSubmissions(JSON.parse(savedSubmissions))
        }
    }, [formMethods])

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        const subscription = formMethods.watch((data) => {
            localStorage.setItem("formData", JSON.stringify(data))
        })

        return () => subscription.unsubscribe()
    }, [formMethods])

    const steps = [
        { title: "Personal Info",  component: <PersonalInfo /> },
        { title: "Contact Info", component: <ContactInfo /> },
        { title: "Categories", component: <CategoriesStep /> },
        { title: "Review", component: <ReviewStep /> },
    ]

    const handleNext = async () => {
        const isValid = await formMethods.trigger(
            currentStep === 0
                ? ["name", "email"]
                : currentStep === 1
                    ? ["address", "phone"]
                    : currentStep === 2
                        ? ["categories"]
                        : [],
        )

        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
        }
    }

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0))
    }

    const handleSubmit = formMethods.handleSubmit((data) => {
        const newSubmission = { ...data, id: Date.now() }
        const updatedSubmissions = [...submissions, newSubmission]

        setSubmissions(updatedSubmissions)
        localStorage.setItem("submissions", JSON.stringify(updatedSubmissions))

        // Reset form and go back to first step
        formMethods.reset()
        setCurrentStep(0)
        localStorage.removeItem("formData")
    })

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset the form? All progress will be lost.")) {
            formMethods.reset()
            localStorage.removeItem("formData")
            setCurrentStep(0)
        }
    }

    return (
        <>
            <ThemeProvider>
                <>
                    <Navbar/>
                    <main className="container mx-auto mt-16 pb-10 px-4 max-w-4xl">
                        <h1 className="text-3xl font-bold text-center mb-8 text-primary">Multi-Step Form</h1>
                        <Card className="mb-10 shadow-lg border-0">
                            <CardContent className="p-6">
                                <FormStepper currentStep={currentStep} steps={steps.map((s) => s.title)}/>

                                <FormProvider {...formMethods}>
                                    <form onSubmit={handleSubmit} className="mt-8">
                                        {steps[currentStep].component}

                                        <div className="flex justify-between mt-8">
                                            {currentStep > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={handlePrevious}
                                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                                                >
                                                    Previous
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                onClick={handleReset}
                                                className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                                            >
                                                Reset Form
                                            </button>

                                            {currentStep < steps.length - 1 ? (
                                                <button
                                                    type="button"
                                                    onClick={handleNext}
                                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                                >
                                                    Next
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                                >
                                                    Submit
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </FormProvider>
                            </CardContent>
                        </Card>
                    </main>
                </>
            </ThemeProvider>
        </>
    )
}

export default App
