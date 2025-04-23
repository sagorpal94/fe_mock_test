import {useState, useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {motion, AnimatePresence} from 'framer-motion';
import {FormData, steps} from '../types';
import PersonalInfo from "./PersonalInfo.tsx";
import ContactDetails from "./ContactDetails.tsx";
import Preferences from './Preferences.tsx';
import Review from "./Review.tsx";
import {ArrowLeft, ArrowRight, CheckIcon, RotateCcw} from "lucide-react";
import {Button} from "./ui/button.tsx";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog"
import UserList from "./user-list.tsx";
import {Card, CardContent} from "./ui/card.tsx";

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(() => {
        const savedStep = localStorage.getItem('currentStep');
        return savedStep ? parseInt(savedStep, 10) : 0;
    });
    const [submittedData, setSubmittedData] = useState<FormData[]>([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [showResetDialog, setShowResetDialog] = useState(false)
    const methods = useForm<FormData>();

    // Load both form data and submitted entries from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('formData');
        const savedSubmissions = localStorage.getItem('UserData');

        if (savedData) {
            methods.reset(JSON.parse(savedData));
        }

        if (savedSubmissions) {
            setSubmittedData(JSON.parse(savedSubmissions));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('currentStep', currentStep.toString());
    }, [currentStep]);

    const handleSubmit = (data: FormData) => {
        if (currentStep === steps.length - 1) {
            setShowConfirmDialog(true);
        } else {
            localStorage.setItem('formData', JSON.stringify(data));
            setCurrentStep(prev => prev + 1);
        }
    };


    const onSubmit = (data: FormData) => {
        if (currentStep === steps.length - 1) {
            const previous = JSON.parse(localStorage.getItem('UserData') || '[]');
            const newSubmittedData = [...previous, {...data, id: Date.now()}];
            setSubmittedData(newSubmittedData);
            // Save submitted entries to localStorage
            localStorage.setItem('UserData', JSON.stringify(newSubmittedData));
            localStorage.removeItem('formData');
            methods.reset();
            setCurrentStep(0);
            methods.setValue("name", "")
            methods.setValue("email", "")
            methods.setValue("address", "")
            methods.setValue("phone", "")
            methods.setValue("preferences", [])
            setShowConfirmDialog(false)
        } else {
            localStorage.setItem('formData', JSON.stringify(data));
            setCurrentStep(prev => prev + 1);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <PersonalInfo/>;
            case 1:
                return <ContactDetails/>;
            case 2:
                return <Preferences/>;
            case 3:
                return <Review/>;
            default:
                return null;
        }
    };

    const handleReset = () => {
        const formValues = methods.getValues();
        if (formValues.name || formValues.email) {
            setShowResetDialog(true);
        }
    }

    const confirmReset = () => {
        if (showResetDialog) {
            methods.reset()
            localStorage.removeItem("formData")
            setCurrentStep(0)
            methods.setValue("name", "")
            methods.setValue("email", "")
            methods.setValue("address", "")
            methods.setValue("phone", "")
            methods.setValue("preferences", [])
            setShowResetDialog(false);
        }
    }

    return (
        <>
            <Card className="shadow-lg border-0 pb-0">
                <CardContent className="p-6">
                    <div className="mx-auto p-6">
                        <div className="mb-8">
                            <div className="flex flex-col gap-10 sm:gap-0 sm:flex-row justify-between items-center">
                                {steps.map((step, index) => (
                                    <div key={index} className="relative flex flex-col items-center group w-full">

                                        {index > 0 && (
                                            <div
                                                className={`absolute sm:left-[calc(-50%+1.5rem)] right-[calc(50%+1.5rem)] top-5 h-0.5 rounded-full ${
                                                    index <= currentStep ? "bg-purple-600" : "bg-gray-300"
                                                }`}
                                            />
                                        )}

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
                                                <CheckIcon className="w-5 h-5"/>
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{opacity: 0, x: 20}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={{opacity: 0, x: -20}}
                                        transition={{duration: 0.2}}
                                    >
                                        {renderStep()}
                                    </motion.div>
                                </AnimatePresence>

                                <div className="mt-8 flex justify-between w-full gap-5">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentStep}
                                            initial={{opacity: 0, x: 20}}
                                            animate={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: -20}}
                                            transition={{duration: 0.2}}

                                            className="mt-8 flex justify-between w-full gap-5"
                                        >
                                            <Button
                                                type="button"
                                                onClick={() => setCurrentStep(prev => prev - 1)}
                                                className={`px-4 py-2 cursor-pointer  rounded-md ${
                                                    currentStep === 0 ? 'invisible' : ''
                                                }`}
                                            >
                                                <ArrowLeft className="w-5 h-5"/>
                                                Previous
                                            </Button>

                                            <Button
                                                type="button"
                                                onClick={handleReset}
                                                className={`px-4 py-2 cursor-pointer rounded-md ${
                                                    currentStep === 0 ? 'invisible' : ''
                                                }`}
                                            >
                                                Reset Form
                                                <RotateCcw className="w-5 h-5"/>
                                            </Button>

                                            <Button
                                                className="px-4 py-2 cursor-pointer rounded-md"
                                            >
                                                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                                                <ArrowRight className="w-5 h-5" />
                                            </Button>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-5 ">
                <UserList UserData={submittedData} setUserData={setSubmittedData}/>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to submit this form? Please review your information before confirming.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={methods.handleSubmit(onSubmit)}>Ok</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Confirmation Dialog */}
            <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Reset</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to reset the form? All progress will be lost.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmReset}>Ok</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
};


export default MultiStepForm;