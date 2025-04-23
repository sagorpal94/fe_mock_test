import {CheckIcon} from "lucide-react"

interface FormStepperProps {
    currentStep: number
    steps: string[]
}

export function FormStepper({currentStep, steps}: FormStepperProps) {
    return (
        <div className="w-full max-w-3xl mx-auto py-8">
            <div className="relative flex justify-between">


                {/*/!* Connecting line *!/*/}
                {/*<div className="absolute top-[35%] left-0 right-0 h-[2px] bg-gray-200 -translate-y-1/2 z-0"/>*/}

                {/*{steps.map((step, index) => (*/}
                {/*    <div key={index} className="relative flex flex-col items-center z-10">*/}
                {/*        <div*/}
                {/*            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${*/}
                {/*                index < currentStep*/}
                {/*                    ? "bg-purple-600 border-purple-600 text-white"*/}
                {/*                    : index === currentStep*/}
                {/*                        ? "bg-primary border-input text-white"*/}
                {/*                        : "bg-white border-gray-300 text-gray-400"*/}
                {/*            }`}*/}
                {/*        >*/}
                {/*            {index < currentStep ? <CheckIcon className="w-5 h-5"/> : <span>{index + 1}</span>}*/}
                {/*        </div>*/}
                {/*        <span*/}
                {/*            className={`mt-2 text-sm font-medium ${index <= currentStep ? "text-primary" : "text-primary/50"}`}>*/}
                {/*          {step}*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*))}*/}

                {steps.map((step, index) => (
                    <div key={index} className="relative flex flex-col items-center group w-full">
                        {/* Connector line between steps */}
                        {index > 0 && (
                            <div
                                className={`absolute left-[calc(-50%+1.5rem)] right-[calc(50%+1.5rem)] top-5 h-0.5 rounded-full ${
                                    index <= currentStep ? "bg-purple-600" : "bg-gray-300"
                                }`}
                            />
                        )}

                        {/* Step circle */}
                        <button
                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 z-10 ${
                                index < currentStep
                                    ? "bg-purple-600 border-purple-600 text-white"
                                    : index === currentStep
                                        ? "bg-purple-600 border-purple-600 text-white ring-2 ring-purple-300 ring-offset-2"
                                        : "bg-white border-gray-300 text-gray-400"
                            }`}
                            disabled={index > currentStep}
                            aria-current={index === currentStep ? "step" : undefined}
                        >
                            {index < currentStep ? (
                                <CheckIcon className="w-5 h-5" />
                            ) : (
                                <span>{index + 1}</span>
                            )}
                        </button>

                        {/* Step label */}
                        <div className="mt-2 text-center">
                            <h4 className={`text-sm font-medium ${
                                index <= currentStep ? "text-purple-600" : "text-gray-400"
                            }`}>
                                {step}
                            </h4>
                            {/*{step.description && (*/}
                            {/*    <p className="text-xs text-gray-500 mt-1">*/}
                            {/*        {step.description}*/}
                            {/*    </p>*/}
                            {/*)}*/}
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}
