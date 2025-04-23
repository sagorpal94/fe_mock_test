import {ThemeToggle} from "./theme-toggle.tsx";
import {Codesandbox} from "lucide-react";
import SettingButton from "./SettingButton.tsx";
import {useState} from "react";
import SettingsPanel from "./SettingsPanel.tsx";


const Navbar = () => {
    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
    return (
        <>
            <header
                className="h-14 flex items-center fixed w-full top-0 left-0  border-b-input border-b border-solid bg-background shrink-0 items-center gap-2 px-4"
            >

                <div className="sm:w-[250px] sm:me-16 h-[33px]">
                    <a className="hidden sm:inline-flex outline-transparent text-black transition-[outline-color] duration-[0.2s]"
                       aria-label="Logo">
                        <Codesandbox className="text-primary"/>
                    </a>
                    <a
                        className="inline-flex sm:hidden outline-transparent transition-[outline-color] duration-[0.2s]"
                        aria-label="Logo">
                        <Codesandbox className="text-primary"/>
                    </a>
                </div>

                <div className="ml-auto px-3">
                    <div className="flex items-center gap-4 sm:gap-5 m-0 p-0">
                        <ThemeToggle/>
                        <SettingButton onClick={() => setIsSettingsPanelOpen(!isSettingsPanelOpen)}/>
                    </div>
                </div>
            </header>
            <SettingsPanel isOpen={isSettingsPanelOpen} onClose={() => setIsSettingsPanelOpen(false)}/>
        </>
    );
};

export default Navbar;