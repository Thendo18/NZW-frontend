import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../Components/Table";
import TextInput from "../Components/TextInput";
import Navbar from "../Components/Navbar";

const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get("https://localhost:7135/api/Regions"); 
        setRegions(response.data);
      } catch (error) {
        console.error("There was an error fetching the regions!", error);
      }
    };

    fetchRegions();
  }, []);

  const headers = ["Name", "Image"];

  const filteredRegions = regions.filter((region) =>
    region.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  

  const tableData = filteredRegions.map((region) => ({
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
    <><Navbar /><div>
            <TextInput
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
< br/>
      {regions.length > 0 ? (
        <Table headers={headers} data={tableData} />
      ) : (
        <p>Loading regions...</p>
      )}
    </div></>
  );
};

export default Regions;
