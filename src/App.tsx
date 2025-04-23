import {ThemeProvider} from "./context/theme-provider.tsx";
import Navbar from "./components/Navbar.tsx";
import MultiStepForm from "./components/multi-step-form.tsx";


function App() {

    return (
        <div className="bg-background">
            <ThemeProvider>
                <Navbar/>
                <main className="container mx-auto h-screen pb-10 px-4 max-w-4xl bg-background">
                    <div className="pt-16">
                        <h1 className="text-3xl font-bold text-center mb-8 text-primary">Create User Form</h1>
                        <MultiStepForm/>
                    </div>
                </main>
            </ThemeProvider>
        </div>
    )
}

export default App
