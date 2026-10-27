
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Configure Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const locationCoordinates = {
  karnataka: [12.9716, 77.5946],
  'tamil nadu': [13.0827, 80.2707],
  kerala: [8.5241, 76.9366],
  maharashtra: [19.0760, 72.8777],
  delhi: [28.6139, 77.2090],
  gujarat: [23.0225, 72.5714],
  'uttar pradesh': [26.8467, 80.9462],
  rajasthan: [26.9124, 75.7873],
  'west bengal': [22.5726, 88.3639],
  punjab: [30.7333, 76.7794],
  'andhra pradesh': [16.5062, 80.6480],
  bihar: [25.5941, 85.1376],
  'madhya pradesh': [23.2599, 77.4126],
  odisha: [20.2961, 85.8245],
  assam: [26.2006, 92.9376],
  jharkhand: [23.6102, 85.2799],
  chhattisgarh: [21.2514, 81.6296],
  haryana: [29.0588, 76.0856],
  telangana: [17.3850, 78.4867],
};

function extractArray(responseData) {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  // Support common API response formats.
  if (responseData && typeof responseData === 'object') {
    if (Array.isArray(responseData.customers)) {
      return responseData.customers;
    }

    if (Array.isArray(responseData.data)) {
      return responseData.data;
    }

    if (Array.isArray(responseData.results)) {
      return responseData.results;
    }
  }

  console.error('Unexpected /api/customers response:', responseData);
  return [];
}

export default function CustomerMap() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchCustomers() {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get(`${API_URL}/api/customers`);
        const customers = extractArray(response.data);

        const mappedLocations = customers
          .map((customer, index) => {
            const location =
              typeof customer.location === 'string'
                ? customer.location.trim().toLowerCase()
                : '';

            const coordinates = locationCoordinates[location];

            if (!coordinates) {
              return null;
            }

            return {
              id: customer.id ?? `${customer.name ?? 'customer'}-${index}`,
              name: customer.name || 'Unnamed customer',
              lat: coordinates[0],
              lng: coordinates[1],
              location: customer.location,
            };
          })
          .filter(Boolean);

        if (!cancelled) {
          setLocations(mappedLocations);
        }
      } catch (err) {
        console.error(
          'Failed to fetch customers for map:',
          err.response?.data || err.message
        );

        if (!cancelled) {
          setError(
            'Unable to load customer locations. Check that the backend and database are running.'
          );
          setLocations([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchCustomers();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto' }}>
      {loading && <p>Loading customer locations...</p>}

      {error && (
        <p role="alert" style={{ color: 'crimson' }}>
          {error}
        </p>
      )}

      {!loading && !error && locations.length === 0 && (
        <p>No customers with recognized locations were found.</p>
      )}

      <div
        style={{
          width: '100%',
          height: '350px',
          border: '2px solid #ccc',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
            >
              <Popup>
                <strong>{location.name}</strong>
                <br />
                {location.location}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
