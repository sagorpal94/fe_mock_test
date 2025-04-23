import {
    Sheet,
    SheetContent,
    SheetHeader, SheetTitle, SheetDescription
} from "./ui/sheet";
import React, {useEffect, useState} from "react";
import {colorThemes} from "../types";
import {useTheme} from "../context/theme-provider.tsx";
import {RotateCw} from "lucide-react";

interface SettingsPanelProps {
    onClose: () => void;
    isOpen: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({isOpen, onClose}) => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<keyof typeof colorThemes | null>('blue');
    const [selectedFont, setSelectedFont] = useState<string>("Public Sans");
    const {isDark} = useTheme()

    const handleColorChange = (theme: string) => {
        if (!colorThemes[theme]) return;
        setSelectedColor(theme);
        localStorage.setItem("selectedThemeColor", theme);
        // Update CSS variables
        const themeVars = isDark ? colorThemes[theme].dark : colorThemes[theme].light;
        Object.entries(themeVars).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    };

    const fonts = ['Public Sans', 'Audiowide', 'Philosopher', 'Inter', 'Nunito Sans', 'Rubik'];

    // Handle font change
    const onFontChange = (font: string) => {
        setSelectedFont(font);
        localStorage.setItem("selectedFont", font);
        (document.body as HTMLElement).style.fontFamily = font;
    };

    const resetFont = () => {
        setSelectedFont(fonts[0]);
        localStorage.setItem("selectedFont", fonts[0]);
    }

    const resetThemeColor = () => {
        const theme = 'zinc'
        setSelectedColor(theme);
        localStorage.setItem("selectedThemeColor", theme);
        const themeVars = isDark ? colorThemes[theme].dark : colorThemes[theme].light;
        Object.entries(themeVars).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.body.requestFullscreen().then(() => {
                setIsFullScreen(true);
            }).catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen().then(() => {
                setIsFullScreen(false);
            }).catch(err => {
                console.error(`Error attempting to exit full-screen mode: ${err.message}`);
            });
        }
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("selectedThemeColor");
        const selectedFont = localStorage.getItem("selectedFont");
        if (savedTheme && colorThemes[savedTheme]) {
            setSelectedColor(savedTheme);

            const themeVars = isDark ? colorThemes[savedTheme].dark : colorThemes[savedTheme].light;
            Object.entries(themeVars).forEach(([key, value]) => {
                document.documentElement.style.setProperty(key, value);
            });
        }
        if (selectedFont) {
            setSelectedFont(selectedFont);
        }
    }, [isDark]);

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-[90vw] sm:w-[3600px] sm:max-w-[360px] z-[9999999999]" hideCloseButton={true}>
                <SheetHeader>
                    <SheetTitle className="text-2xl font-semibold mb-1 flex space-between items-center w-full">
                        <span className="font-medium !text-xl grow">
                          Settings
                        </span>

                        <button
                            className="inline-flex items-center justify-center relative box-border text-primary cursor-pointer select-none align-middle appearance-none text-center text-2xl text-gray-600 outline-none border-0 m-0 no-underline p-2 hover:bg-[rgba(99_115_129_/_0.08)] hover:rounded-full"
                            aria-label="Full Screen"
                        >
                            {
                                isFullScreen ?

                                    <svg
                                        aria-hidden="true" role="img" className="w-5 h-5 inline-flex shrink-0"
                                        width="1em" height="1em" viewBox="0 0 24 24"
                                        onClick={toggleFullScreen}
                                    >
                                        <path fill="currentColor" fillRule="evenodd"
                                              d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.114c0 2.309 0 4.118-.19 5.53c-.194 1.444-.6 2.584-1.494 3.479c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.895-.895-1.3-2.035-1.494-3.48c-.19-1.411-.19-3.22-.19-5.529v-.114c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386s.002 4.086.176 5.386c.172 1.279.5 2.05 1.069 2.62c.57.569 1.34.896 2.619 1.068c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069c.569-.57.896-1.34 1.068-2.619c.174-1.3.176-3.008.176-5.386s-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176m4.134 3.068a.75.75 0 0 1-.743.756c-.856.007-1.454.035-1.904.124c-.428.084-.666.212-.84.386s-.302.412-.386.84c-.088.45-.117 1.048-.124 1.904a.75.75 0 0 1-1.5-.013c.007-.85.034-1.577.152-2.179c.122-.623.351-1.167.797-1.613s.99-.675 1.613-.797c.602-.118 1.328-.145 2.179-.152a.75.75 0 0 1 .756.744m2.503 0a.75.75 0 0 1 .757-.744c.85.007 1.576.034 2.179.152c.623.122 1.166.351 1.612.797s.676.99.798 1.613c.118.602.144 1.328.151 2.179a.75.75 0 0 1-1.5.013c-.007-.856-.035-1.454-.123-1.904c-.084-.428-.212-.666-.386-.84s-.412-.302-.84-.386c-.45-.088-1.048-.117-1.904-.124a.75.75 0 0 1-.744-.756M5.994 13.25a.75.75 0 0 1 .756.744c.007.856.035 1.454.124 1.903c.084.429.212.666.386.84c.174.175.412.303.84.387c.45.088 1.048.116 1.904.124a.75.75 0 0 1-.013 1.5c-.85-.008-1.577-.034-2.179-.152c-.623-.122-1.167-.352-1.613-.798s-.675-.99-.797-1.612c-.118-.603-.145-1.329-.152-2.18a.75.75 0 0 1 .744-.756m12.01 0a.75.75 0 0 1 .743.757c-.007.85-.033 1.576-.151 2.179c-.122.623-.352 1.166-.798 1.612s-.99.676-1.612.798c-.603.118-1.329.144-2.18.151a.75.75 0 1 1-.012-1.5c.856-.007 1.454-.035 1.903-.123c.429-.084.666-.212.84-.386c.175-.175.303-.412.387-.84c.088-.45.116-1.048.124-1.904a.75.75 0 0 1 .756-.744"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    :
                                    <svg
                                        aria-hidden="true" role="img" className="w-5 h-5 inline-flex shrink-0"
                                        width="1em" height="1em" viewBox="0 0 24 24"
                                        onClick={toggleFullScreen}
                                    >
                                        <path fill="currentColor" fillRule="evenodd"
                                              d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.114c0 2.309 0 4.118-.19 5.53c-.194 1.444-.6 2.584-1.494 3.479c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.895-.895-1.3-2.035-1.494-3.48c-.19-1.411-.19-3.22-.19-5.529v-.114c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386s.002 4.086.176 5.386c.172 1.279.5 2.05 1.069 2.62c.57.569 1.34.896 2.619 1.068c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069c.569-.57.896-1.34 1.068-2.619c.174-1.3.176-3.008.176-5.386s-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176m3.39 2.324a.75.75 0 0 1 .745.757c-.008.85-.034 1.576-.152 2.179c-.122.623-.352 1.166-.798 1.612s-.99.676-1.612.798c-.603.118-1.329.144-2.18.152a.75.75 0 1 1-.012-1.5c.856-.008 1.453-.036 1.903-.124c.429-.084.666-.212.84-.386c.175-.175.303-.412.387-.84c.088-.45.116-1.048.124-1.904a.75.75 0 0 1 .756-.744m3.99 0a.75.75 0 0 1 .757.744c.007.856.036 1.453.124 1.903c.084.429.212.666.386.84c.174.175.412.303.84.387c.45.088 1.048.116 1.904.124a.75.75 0 0 1-.013 1.5c-.85-.008-1.577-.034-2.179-.152c-.623-.122-1.167-.352-1.613-.798s-.675-.99-.797-1.612c-.118-.603-.145-1.329-.152-2.18a.75.75 0 0 1 .744-.756M5.25 13.994a.75.75 0 0 1 .757-.744c.85.007 1.576.034 2.179.152c.623.122 1.166.351 1.612.797s.676.99.798 1.613c.118.602.144 1.328.152 2.179a.75.75 0 0 1-1.5.013c-.008-.856-.036-1.454-.124-1.904c-.084-.428-.212-.666-.386-.84s-.412-.302-.84-.386c-.45-.088-1.048-.117-1.904-.124a.75.75 0 0 1-.744-.756m13.497 0a.75.75 0 0 1-.743.756c-.856.007-1.454.036-1.904.124c-.428.084-.666.212-.84.386s-.302.412-.386.84c-.088.45-.117 1.048-.124 1.904a.75.75 0 0 1-1.5-.013c.007-.85.034-1.577.152-2.179c.122-.623.351-1.167.797-1.613s.99-.675 1.613-.797c.602-.118 1.328-.145 2.179-.152a.75.75 0 0 1 .756.744"
                                              clipRule="evenodd"></path>
                                    </svg>
                            }
                        </button>

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
                <div className="flex flex-col gap-12 pb-1">
                    <div className="min-w-0 min-h-0 grow flex flex-col">
                        <div className="flex flex-col pb-10 gap-12 px-5">
                            <div className="grid gap-4 py-4">
                                <div
                                    className="flex px-4 pt-8 pb-4 relative flex-col gap-5 rounded-2xl border border-input">
                                  <span
                                      className="leading-[22px] absolute items-center inline-flex text-[0.8125rem] font-semibold text-primary-foreground bg-primary px-[10px] rounded-[22px] -top-3">
                                      <RotateCw
                                          onClick={resetThemeColor}
                                          className='cursor-pointer w-[14px] h-[14px] shrink-0 inline-flex  mr-1'/>
                                    Presets
                                  </span>
                                    <div className="grid gap-3 grid-cols-3">
                                        {Object.keys(colorThemes).map((theme) => (
                                            <button
                                                key={theme}
                                                style={{
                                                    backgroundColor: selectedColor === theme ? `${
                                                        isDark ? colorThemes[theme].dark["--primary"].replace(')', ` / 0.08)`) : colorThemes[theme].light["--primary"].replace(')', ` / 0.08)`)
                                                    }` : 'transparent',
                                                }}
                                                onClick={() => handleColorChange(theme)} // Handle color selection
                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shrink-0 h-16 bg-background hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-2 sm:px-3 text-xs"
                                            >
                                                <svg
                                                    className="select-none inline-block shrink-0 text-2xl w-7 h-7 transition-[fill] duration-300 ease-in-out"
                                                    // className={`dark:colorThemes[theme].dark["--primary"]`}
                                                    focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="24"
                                                    height="24" fill="none" xmlns="http://www.w3.org/2000/svg"

                                                    style={{
                                                        color: `${
                                                            isDark ? colorThemes[theme].dark["--primary"] : colorThemes[theme].light["--primary"]
                                                        }`,
                                                    }}
                                                >
                                                    <path opacity="0.4" fillRule="evenodd" clipRule="evenodd"
                                                          d="M20.828 4.172C22 5.343 22 7.229 22 11V13C22 16.771 22 18.657 20.828 19.828C19.657 21 17.771 21 14 21H9V3H14C17.771 3 19.657 3 20.828 4.172Z"
                                                          fill="currentColor"></path>
                                                    <path
                                                        d="M18.5 9.244C18.6989 9.244 18.8897 9.32302 19.0303 9.46367C19.171 9.60432 19.25 9.79509 19.25 9.994C19.25 10.1929 19.171 10.3837 19.0303 10.5243C18.8897 10.665 18.6989 10.744 18.5 10.744H12.5C12.3011 10.744 12.1103 10.665 11.9697 10.5243C11.829 10.3837 11.75 10.1929 11.75 9.994C11.75 9.79509 11.829 9.60432 11.9697 9.46367C12.1103 9.32302 12.3011 9.244 12.5 9.244H18.5ZM17.5 13.244C17.6989 13.244 17.8897 13.323 18.0303 13.4637C18.171 13.6043 18.25 13.7951 18.25 13.994C18.25 14.1929 18.171 14.3837 18.0303 14.5243C17.8897 14.665 17.6989 14.744 17.5 14.744H13.5C13.3011 14.744 13.1103 14.665 12.9697 14.5243C12.829 14.3837 12.75 14.1929 12.75 13.994C12.75 13.7951 12.829 13.6043 12.9697 13.4637C13.1103 13.323 13.3011 13.244 13.5 13.244H17.5ZM2 12.994V10.994C2 7.223 2 5.337 3.172 4.166C4.146 3.191 6.364 3.027 9 3V20.988C6.364 20.961 4.146 20.797 3.172 19.822C2 18.651 2 16.765 2 12.994Z"
                                                        fill="currentColor"></path>
                                                </svg>

                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                className="flex px-4 pt-8 pb-4 relative flex-col gap-5 rounded-2xl border border-input">
                                  <span
                                      className="leading-[22px] absolute items-center inline-flex text-[0.8125rem] font-semibold text-primary-foreground bg-primary px-12 rounded-[22px] -top-3">
                                    Font
                                  </span>
                                <div className="flex flex-col gap-5">
                                    <button
                                        className="cursor-pointer hover:text-primary inline-flex items-center justify-center relative box-border select-none align-middle appearance-none leading-4 self-start text-[0.6875rem] font-semibold no-underline gap-[2px] transition-[color] duration-300 ease-in-out m-0 p-0 rounded-none border-0">
                                        <RotateCw
                                            onClick={resetFont}
                                            className='w-[14px] h-[14px] shrink-0 inline-flex opacity-[0.64] mr-1'/>
                                        Family
                                    </button>
                                    <div className="grid gap-3 grid-cols-2">
                                        {fonts.map((font) => (
                                            <button
                                                key={font}
                                                onClick={() => onFontChange(font)}
                                                className={`inline-flex items-center justify-center relative box-border cursor-pointer align-middle appearance-none no-underline w-full leading-[18px] card-background gap-1.5 flex-col m-0 px-0 py-4 rounded-[10px] transition-all duration-300 ease-in-out border hover:card-background/10 hover:border-primary/50 hover:scale-[1.04] transform-gpu origin-center
                                                            ${selectedFont === font ? "shadow-lg font-bold border-primary text-base text-primary" : "shadow-none font-normal border-input text-xs"}
                                                          `}
                                                style={{
                                                    fontFamily: selectedFont === font ? font : "inherit",
                                                }}
                                            >
                                                <svg
                                                    className="shrink-0 inline-flex w-7 h-7 text-[current]"
                                                    focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                                    width="24" height="24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4"
                                                          d="M17.1229 18.16C16.5754 18.16 16.0833 18.0577 15.6464 17.8531C15.2096 17.6485 14.864 17.3526 14.6096 16.9656C14.3552 16.5729 14.228 16.0974 14.228 15.5389C14.228 14.5988 14.5792 13.8855 15.2814 13.3989C15.9837 12.9067 17.0924 12.6523 18.6076 12.6357L19.6776 12.6192V12.1049C19.6776 11.7123 19.5615 11.4109 19.3292 11.2008C19.1025 10.9851 18.7486 10.88 18.2675 10.8856C17.9136 10.8911 17.5763 10.974 17.2556 11.1344C16.9404 11.2948 16.7247 11.574 16.6086 11.9722H14.593C14.6262 11.3528 14.8059 10.8441 15.1321 10.446C15.4584 10.0423 15.9008 9.74368 16.4593 9.55013C17.0233 9.35106 17.662 9.25153 18.3754 9.25153C19.2546 9.25153 19.9596 9.36212 20.4905 9.58331C21.0214 9.79897 21.4057 10.1114 21.6435 10.5206C21.8812 10.9243 22.0001 11.4054 22.0001 11.9639V17.9941H19.9762L19.7772 16.5176C19.4841 17.137 19.1163 17.5655 18.674 17.8033C18.2371 18.0411 17.7201 18.16 17.1229 18.16ZM17.9357 16.5674C18.1569 16.5674 18.3698 16.5287 18.5744 16.4513C18.7846 16.3683 18.9698 16.2605 19.1302 16.1278C19.2961 15.9896 19.4288 15.8347 19.5283 15.6633C19.6278 15.4919 19.6776 15.3149 19.6776 15.1324V13.8634L18.8067 13.8799C18.403 13.8855 18.027 13.9352 17.6786 14.0292C17.3302 14.1177 17.0482 14.2643 16.8326 14.4689C16.6224 14.6735 16.5174 14.95 16.5174 15.2983C16.5174 15.6965 16.6556 16.0089 16.9321 16.2356C17.2086 16.4568 17.5431 16.5674 17.9357 16.5674Z"
                                                          fill="currentColor"></path>
                                                    <path
                                                        d="M2 17.9941L6.29663 6H8.85139L13.1397 17.9941H10.726L9.74721 15.2154H5.43399L4.43033 17.9941H2ZM5.97314 13.1002H9.16658L7.5823 8.33909L5.97314 13.1002Z"
                                                        fill="currentColor"></path>
                                                </svg>


                                                {font}
                                            </button>
                                        ))}
                                    </div>
                                </div>


                                {/*<div*/}
                                {/*    className={`flex flex-col items-start gap-10 rounded-xl`}>*/}
                                {/*    <button*/}
                                {/*        onClick={() => setFontSize(defaultSize)}*/}
                                {/*        className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"*/}
                                {/*    >*/}
                                {/*        <RotateCw className="w-3.5 h-3.5"/>*/}
                                {/*        <span className="text-xs font-bold ">Size</span>*/}
                                {/*    </button>*/}

                                {/*    <div className="relative w-full h-10">*/}
                                {/*        <div*/}
                                {/*            className="absolute w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-xl top-1/2 -translate-y-1/2"></div>*/}
                                {/*        <div*/}
                                {/*            className="absolute h-2 rounded-xl top-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-400 to-emerald-600"*/}
                                {/*            style={{width: `${calculatePercentage()}%`, left: 0}}*/}
                                {/*        ></div>*/}
                                {/*        {ticks.map((tick, index) => (*/}
                                {/*            <div*/}
                                {/*                key={index}*/}
                                {/*                className=" absolute w-0.5 h-1 bg-gray-300 dark:bg-gray-600 top-1/2 -translate-y-1/2"*/}
                                {/*                style={{left: `${tick}%`}}*/}
                                {/*            ></div>*/}
                                {/*        ))}*/}
                                {/*        <div className="absolute top-1/2 -translate-y-1/2"*/}
                                {/*             style={{left: `${calculatePercentage()}%`}}>*/}
                                {/*            <div className="relative">*/}
                                {/*                <div*/}
                                {/*                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded">*/}
                                {/*                    {fontSize}px*/}
                                {/*                </div>*/}
                                {/*                <div*/}
                                {/*                    className="font-shadow w-4 h-4 bg-white dark:bg-gray-200 rounded-full shadow-md border border-gray-200 dark:border-gray-600 -translate-x-1/2"></div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <input*/}
                                {/*            type="range"*/}
                                {/*            min={minValue}*/}
                                {/*            max={maxValue}*/}
                                {/*            step={step}*/}
                                {/*            value={fontSize}*/}
                                {/*            onChange={(e) => setFontSize(Number(e.target.value))}*/}
                                {/*            className="absolute w-full h-2 opacity-0 cursor-pointer top-1/2 -translate-y-1/2"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                            </div>

                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SettingsPanel;