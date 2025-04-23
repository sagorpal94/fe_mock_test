import {ThemeProvider} from "./context/theme-provider.tsx";
import Navbar from "./components/Navbar.tsx";
import MultiStepForm from "./components/multi-step-form.tsx";


function App() {

    return (
        <ThemeProvider>
            <Navbar/>
            <main className="container mx-auto mt-16 pb-10 px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-center mb-8 text-primary">Create User Form</h1>
                <MultiStepForm/>
            </main>

        </ThemeProvider>
    )
}

export default App
