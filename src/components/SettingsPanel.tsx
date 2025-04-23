import {
    Sheet,
    SheetContent,
    SheetHeader, SheetTitle, SheetDescription
} from "./ui/sheet";
import React from "react";

interface SettingsPanelProps {
    onClose: () => void;
    isOpen: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({isOpen, onClose}) => {

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-[90vw] sm:w-[3600px] sm:max-w-[360px]" hideCloseButton={true}>
                <SheetHeader>
                    <SheetTitle className="text-2xl font-semibold mb-1 flex space-between items-center w-full">
            <span className="font-medium !text-xl grow">
              Settings
            </span>
                        <button
                            className="inline-flex items-center justify-center relative box-border text-primary cursor-pointer select-none align-middle appearance-none text-center text-2xl text-gray-600 outline-none border-0 m-0 no-underline p-2 hover:bg-[rgba(99_115_129_/_0.08)] hover:rounded-full"
                            type="button"
                            aria-label="Close"
                            onClick={onClose}
                        >
                            <svg
                                aria-hidden="true"
                                role="img"
                                className="w-5 h-5 inline-flex shrink-0"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <g fill="none" fillRule="evenodd">
                                    <path
                                        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                    <path fill="currentColor"
                                          d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z"></path>
                                </g>
                            </svg>
                        </button>
                    </SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">

                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SettingsPanel;