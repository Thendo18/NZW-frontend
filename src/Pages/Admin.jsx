import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminRegions = () => {
  const [regions, setRegions] = useState([]);
  const [newRegion, setNewRegion] = useState({ name: '', code: '', regionImageUrl: '' });
  const [editingRegionId, setEditingRegionId] = useState(null);
  const [editingRegion, setEditingRegion] = useState({ name: '', code: '', regionImageUrl: '' });

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await axios.get('/api/Regions');
      setRegions(response.data);
    } catch (error) {
      console.error("Failed to fetch regions", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this region?")) {
      await axios.delete(`/api/Regions/${id}`);
      fetchRegions();
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch('/api/Regions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRegion),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to add region:", error);
        return;
      }

      setNewRegion({ name: '', code: '', regionImageUrl: '' });
      fetchRegions();
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleChange = (e) => {
    setNewRegion({ ...newRegion, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditingRegion({ ...editingRegion, [e.target.name]: e.target.value });
  };

  const startEditing = (region) => {
    setEditingRegionId(region.id);
    setEditingRegion({
      name: region.name,
      code: region.code,
      regionImageUrl: region.regionImageUrl,
    });
  };

  const cancelEditing = () => {
    setEditingRegionId(null);
    setEditingRegion({ name: '', code: '', regionImageUrl: '' });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`/api/Regions/${id}`, editingRegion);
      cancelEditing();
      fetchRegions();
    } catch (err) {
      console.error("Failed to update region", err);
    }
  };

  return (
    <>
      <h1 className="admin-title">Manage Regions</h1>

      {/* Add Region Form */}
      <div className="form-container">
        <h2>Add New Region</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newRegion.name}
          onChange={handleChange}
        />
        {newRegion.name.length > 0 && newRegion.name.length < 3 && (
          <p style={{ color: 'red', fontSize: '0.875rem' }}>Name must be at least 3 characters</p>
        )}

        <input
          type="text"
          name="code"
          placeholder="Code"
          value={newRegion.code}
          onChange={handleChange}
        />
        {newRegion.code.length > 0 && newRegion.code.length < 3 && (
          <p style={{ color: 'red', fontSize: '0.875rem' }}>Code must be at least 3 characters</p>
        )}

        <input
          type="text"
          name="regionImageUrl"
          placeholder="Image URL"
          value={newRegion.regionImageUrl}
          onChange={handleChange}
        />

        <button
          onClick={handleAdd}
          disabled={
            newRegion.name.trim().length < 3 || newRegion.code.trim().length < 3
          }
        >
          Add Region
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <h2>All Regions</h2>
        <div className="table-responsive"> 
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region) => (
              <tr key={region.id}>
                {editingRegionId === region.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editingRegion.name}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="code"
                        value={editingRegion.code}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="regionImageUrl"
                        value={editingRegion.regionImageUrl}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button className="btn btn-save" onClick={() => saveEdit(region.id)}>
                        Save
                      </button>{' '}
                      <button className="btn btn-cancel" onClick={cancelEditing}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{region.name}</td>
                    <td>{region.code}</td>
                    <td>
                      {region.regionImageUrl ? (
                        <img
                          src={region.regionImageUrl}
                          alt={region.name}
                          className="region-image"
                        />
                      ) : (
                        <span style={{ fontStyle: 'italic', color: '#9ca3af' }}>
                          No Image
                        </span>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-edit" onClick={() => startEditing(region)}>
                        Edit
                      </button>{' '}
                      <button className="btn btn-delete" onClick={() => handleDelete(region.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default AdminRegions;
