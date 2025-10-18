import React, { useEffect, useState } from 'react';
import Card from '../../components/cards/Card';
import './SchoolList.css';

function SchoolList() {
  const [schools, setSchools] = useState([]);
  const [allSchools, setAllSchools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const applyFilter = (q = '') => {
    const query = q.trim().toLowerCase();
    if (!query) {
      setSchools(allSchools);
      return;
    }

    const filtered = allSchools.filter((s) => {
      const name = (s.name || s.schoolName || '').toLowerCase();
      const city = (s.city || s.town || s.location || '').toLowerCase();
      return name.includes(query) || city.includes(query);
    });

    setSchools(filtered);
  };

  const fetchSchools = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/schools');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setSchools(data);
      setAllSchools(data); // initialize master copy here
    } catch (error) {
      console.error('Error fetching school data:', error);
    }
  };

  const handleEdit = async (schoolId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/school/${schoolId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update school');
      fetchSchools();
    } catch (error) {
      console.error('Error updating school:', error);
    }
  };

  const handleDelete = async (schoolId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/school/${schoolId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete school');
      const updated = schools.filter((s) => s.id !== schoolId && s._id !== schoolId);
      setSchools(updated);
      setAllSchools(updated);
      alert('School has been deleted successfully');
    } catch (error) {
      console.error('Error deleting school:', error);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    applyFilter(searchQuery);
  }, [searchQuery, allSchools]);

  return (
    <div className="SchoolList_container">
      <h1>Schools List</h1>
      <div className="search_container">
        <input
          type="text"
          placeholder="Search school"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') applyFilter(e.target.value);
          }}
        />
        <button type="button" onClick={() => applyFilter(searchQuery)}>
          Search
        </button>
      </div>
      <div className="card_list_container">
        {schools.map((school) => (
          <Card
            key={school.id ?? school._id ?? school.name}
            school={school}
            onDelete={() => handleDelete(school.id ?? school._id)}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default SchoolList;