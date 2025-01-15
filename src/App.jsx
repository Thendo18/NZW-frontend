import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Regions from './Pages/Regions';
import Loader from './Components/Loader';
// import Navbar from './Components/Navbar';
// import Table from './Components/Table';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    // const [activeContent, setActiveContent] = useState('home'); // Manage active content

    // const handleMenuClick = (menuItem) => {
    //     setActiveContent(menuItem); // Update the active content based on menu click
    // };
    // Simulate data loading (use this for the loader to appear for some time)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Stop the loader after 3 seconds
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader /> // Show loader while isLoading is true
            ) : (
                <Router>
                <div>
                  {/* <nav>
                    <ul>
                      <li><a href="/">Home</a></li>
                      <li><a href="/regions">Regions</a></li>
                    </ul>
                  </nav> */}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/regions" element={<Regions />} />
                  </Routes>
                </div>
              </Router>
                
            )}
        </>
    );
}

export default App;
