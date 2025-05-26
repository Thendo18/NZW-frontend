import { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "../Components/TextInput";

const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get("/api/Regions");
        setRegions(response.data);
      } catch (error) {
        console.error("There was an error fetching the regions!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
  }, []);

  const filteredRegions = regions.filter((region) =>
    region.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getGridSize = (index, totalItems) => {
    if (totalItems <= 3) {
      return "col-span-2 md:col-span-12";
    } else if (totalItems <= 6) {
      return index % 2 === 0 
        ? "col-span-2 md:col-span-8" 
        : "col-span-2 md:col-span-4";
    } else {
      const pattern = index % 6;
      switch (pattern) {
        case 0: return "col-span-2 md:col-span-6";
        case 1: return "col-span-2 md:col-span-6";
        case 2: return "col-span-2 md:col-span-4";
        case 3: return "col-span-2 md:col-span-8";
        case 4: return "col-span-2 md:col-span-7";
        case 5: return "col-span-2 md:col-span-5";
        default: return "col-span-2 md:col-span-6";
      }
    }
  };

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <TextInput
            placeholder="Search regions..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full max-w-md text-input"
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-600">Loading regions...</p>
          </div>
        ) : filteredRegions.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3">
            {filteredRegions.map((region, index) => (
              <div 
                key={region.name} 
                className={`${getGridSize(index, filteredRegions.length)} relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 aspect-video`}
              >
                {region.regionImageUrl ? (
                  <img
                    src={region.regionImageUrl}
                    alt={region.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">{region.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-600">No regions found.</p>
          </div>
        )}
      </div>
  );
};

export default Regions;
