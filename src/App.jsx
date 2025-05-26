import { useEffect, useState, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Regions from './Pages/Regions';
import AdminRegions from "./Pages/Admin";
import Navbar from './Components/Navbar';
import Loader from './Components/Loader';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const isFirstLoad = useRef(true); 

    useEffect(() => {
        if (isFirstLoad.current) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                isFirstLoad.current = false;
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setIsLoading(false); 
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/regions" element={<Regions />} />
                        <Route path="/admin" element={<AdminRegions />} />
                    </Routes>
                </Router>
            )}
        </>
    );
}

export default App;
