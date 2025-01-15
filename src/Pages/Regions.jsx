import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../Components/Table";

const Regions = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get("https://localhost:7135/api/Regions"); // Update with your actual API URL
        setRegions(response.data);
      } catch (error) {
        console.error("There was an error fetching the regions!", error);
      }
    };

    fetchRegions();
  }, []);

  const headers = ["ID", "Name", "Image"];

  const tableData = regions.map((region) => ({
    id: region.id,
    name: region.name,
    image: (
      region.regionImageUrl ? (
        <img
          src={region.regionImageUrl}
          alt={region.name}
          className="w-16 h-16 object-cover rounded"
        />
      ) : (
        "No Image"
      )
    ),
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Regions</h1>
      {regions.length > 0 ? (
        <Table headers={headers} data={tableData} />
      ) : (
        <p>Loading regions...</p>
      )}
    </div>
  );
};

export default Regions;
