import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CustomerMap = () => {
  const [locations, setLocations] = useState([]);
  const mapRef = useRef();

  // Static mapping for state names to coordinates
  const locationCoordinates = {
    "karnataka": [12.9716, 77.5946],
    "tamil nadu": [13.0827, 80.2707],
    "kerala": [8.5241, 76.9366],
    "maharashtra": [19.0760, 72.8777],
    "delhi": [28.6139, 77.2090],
    "gujarat": [23.0225, 72.5714],
    "uttar pradesh": [26.8467, 80.9462],
    "rajasthan": [26.9124, 75.7873],
    "west bengal": [22.5726, 88.3639],
    "punjab": [30.7333, 76.7794],
    "andhra pradesh": [16.5062, 80.6480],
    "bihar": [25.5941, 85.1376],
    "madhya pradesh": [23.2599, 77.4126],
    "odisha": [20.2961, 85.8245],
    "assam": [26.2006, 92.9376],
    "jharkhand": [23.6102, 85.2799],
    "chhattisgarh": [21.2514, 81.6296],
    "haryana": [29.0588, 76.0856],
    "telangana": [17.3850, 78.4867]
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/customers`)
      .then(res => res.json())
      .then(data => {
        const locs = data
          .map(customer => {
            const coords = locationCoordinates[customer.location?.toLowerCase()?.trim()];
            if (!coords) return null;
            return {
              id: customer.id,
              name: customer.name,
              lat: coords[0],
              lng: coords[1]
            };
          })
          .filter(Boolean);
        setLocations(locs);
      });
  }, []);

  // Fix for blank/gray area on the left when resizing
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }
  }, [locations]);

  return (
    <div
      style={{
        width: '800px',
        maxWidth: '1100px',
        height: '350px',
        border: '2px solid #ccc',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
        margin: '30px auto',
        backgroundColor: '#f9f9f9',
      }}
    >
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '100%', width: '1300px' }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map(loc => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CustomerMap;
