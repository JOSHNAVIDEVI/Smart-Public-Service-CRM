import React, { useState, useEffect } from 'react';

const CitizenComplaint = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    department: '',
    description: '',
    photo: null as File | null,
  });
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: 'Fetching location...',
  });
  const [locationError, setLocationError] = useState('');
  const [photoName, setPhotoName] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation((prev) => ({ ...prev, latitude, longitude }));

          // Reverse geocoding using Nominatim (OpenStreetMap)
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            const address = data.display_name || 'Address not found';
            setLocation((prev) => ({ ...prev, address }));
          } catch (_error) {
            setLocation((prev) => ({ ...prev, address: 'Unable to fetch address' }));
          }
        },
        (_error) => {
          setLocationError('Unable to retrieve your location. Please enable location services.');
          setLocation((prev) => ({ ...prev, address: 'Location access denied' }));
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, photo: e.target.files![0] }));
      setPhotoName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    alert('Complaint submitted!');
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10">
        {/* <CitizenNavbar /> */}
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-6">
      <h2 className="text-2xl font-bold mb-1">Report a Civic Issue</h2>
      <p className="text-gray-500 mb-6">Help improve our city by reporting infrastructure problems</p>
      {locationError && <p className="text-red-500 mb-4">{locationError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Your Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Your phone number"
            required
          />
        </div>
        <div>
            <label className="block mb-1 font-medium">Department</label>
            <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
            >
                <option value="">Select a department</option>
                <option value="public_works">Public Works</option>
                <option value="police">Police</option>
                <option value="fire_department">Fire Department</option>
            </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Issue Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., Large pothole on Main Street"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 min-h-[80px]"
            placeholder="Please describe the issue in detail..."
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Location</label>
          <div className="bg-blue-50 rounded p-3 text-sm">
            <div><span className="font-semibold">Latitude:</span> {location.latitude || 'Loading...'}</div>
            <div><span className="font-semibold">Longitude:</span> {location.longitude || 'Loading...'}</div>
            <div><span className="font-semibold">Address:</span> {location.address}</div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-1">Photo</label>
          <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            {photoName ? photoName : 'Click to upload photo'}
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-colors text-lg"
        >
          Submit Complaint
        </button>
      </form>
    </div>
    </div>
  );
};

export default CitizenComplaint;
