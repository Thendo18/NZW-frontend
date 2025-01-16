import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";

const Home = () => {
  const [walks, setWalks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalks = async () => {
      try {
        const response = await axios.get("https://localhost:7135/api/Walks"); // Replace with your API URL
        setWalks(response.data);
      } catch (error) {
        console.error("Error fetching walks data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalks();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading walks...</div>;
  }
  return (
    <><div>
      <Navbar />
    </div><div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {walks.map((walk) => (
            <div
              key={walk.id}
              className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Walk Image */}
              <img
                src={walk.imageUrl}
                alt={walk.name}
                className="w-full h-48 object-cover rounded-t-lg" />
              {/* Walk Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{walk.name}</h3>
                <p className="text-sm text-gray-700">{walk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div></>
  );
};

export default Home;
