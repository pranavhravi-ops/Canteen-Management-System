import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import CustomerMap from './CustomerMap';

// Keep the API base in one place. Set REACT_APP_API_URL in the frontend .env
// when the backend is hosted somewhere other than localhost.
const API_BASE = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '');

// APIs may return an array directly or wrap it in a common object property.
// Always normalize responses before calling .map().
const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object') {
    if (Array.isArray(value.data)) return value.data;
    if (Array.isArray(value.results)) return value.results;
    if (Array.isArray(value.items)) return value.items;
  }
  return [];
};

const Dashboard = () => {
  const [genderData, setGenderData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [categorySales, setCategorySales] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

useEffect(() => {
    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || ''; // Set in .env; restrict this key by domain in OpenWeather
    const fetchWeather = async (lat, lon) => {
      if (!API_KEY) {
        console.warn('Weather is disabled: set REACT_APP_OPENWEATHER_API_KEY in the frontend .env file.');
        return;
      }

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Weather API error:", error);
      }
    };

    const getLocationAndFetchWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error("Geolocation error:", error);
            fetchWeather(28.6139, 77.2090); 
          }
        );
      } else {
        console.error("Geolocation not supported");
        fetchWeather(28.6139, 77.2090);
      }
    };

    getLocationAndFetchWeather();
  }, []);

 useEffect(() => {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  setCurrentDate(date.toLocaleDateString('en-US', options));

    // Fetch analytics data
    fetchGenderData();
    fetchSalesData();
    

  }, []);

  useEffect(() => {
  axios.get(`${API_BASE}/api/total-revenue`) 
    .then((response) => {
      setTotalRevenue(Number(response.data?.total_revenue) || 0);
    })
    .catch((error) => {
      console.error('Error fetching total revenue:', error);
    });
}, []);

  useEffect(() => {
    const fetchCategorySales = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/analytics/category-sales`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || `Category sales request failed (${response.status})`);
        }

        const rows = toArray(data);
        console.log('Fetched category sales rows:', rows);
        setCategorySales(rows);
      } catch (error) {
        console.error('Failed to fetch category sales:', error);
        setCategorySales([]);
      }
    };

    fetchCategorySales();
  }, []);


  const fetchGenderData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/analytics/gender`);
      const rows = toArray(res.data);
      const formatted = rows.map((g) => ({
        name: g.gender ?? 'Unknown',
        y: Number(g.count) || 0
      }));
      setGenderData(formatted);
    } catch (err) {
      console.error('Failed to fetch gender data:', err);
      setGenderData([]);
    }
  };

  const fetchSalesData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/analytics/sales-daily`);
      const rows = toArray(res.data);
      const formatted = rows.map((s) => ({
        name: s.item ?? 'Unknown',
        y: Number(s.count) || 0
      }));
      setSalesData(formatted);
    } catch (err) {
      console.error('Failed to fetch sales data:', err);
      setSalesData([]);
    }
  };

  const categorySalesData = toArray(categorySales).map((item) => ({
    name: item.category ?? 'Uncategorized',
    y: Number(item.total_sales) || 0
  }));


  const genderChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Gender Distribution' },
    series: [{
      name: 'Count',
      colorByPoint: true,
      data: genderData
    }],
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    }
  };
  const [locationStats, setLocationStats] = useState([]);

useEffect(() => {
  fetchLocationStats();
}, []);


const fetchLocationStats = async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/customers/location-count`);
    setLocationStats(toArray(res.data));
  } catch (err) {
    console.error('Failed to fetch location stats:', err);\n    setLocationStats([]);
  }
};


  const salesChartOptions = {
  chart: {
    type: 'pie'
  },
  title: {
    text: "Today's Item Sales"
  },
  tooltip: {
    pointFormat: '<b>{point.name}</b>: {point.y} units'
  },
  accessibility: {
    point: {
      valueSuffix: ' units'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y}'
      }
    }
  },
  series: [{
    name: 'Sales',
    colorByPoint: true,
    data: salesData
  }]
};

const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Category-wise Sales Breakdown',
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'Category',
      },
    },
    yAxis: {
      title: {
        text: 'Total Items Sold',
      },
    },
    series: [
      {
        name: 'Sales',
        colorByPoint: true,
        data: categorySalesData,
      },
    ],
  };

  return (
    <>
      <style>{`
          body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f4f8;
}

.sidebar {
  height: 100vh;
  width: 240px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #2c3e50;
  padding-top: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar a {
  padding: 15px 20px;
  text-decoration: none;
  font-size: 18px;
  color: #ecf0f1;
  display: block;
  transition: background-color 0.3s ease;
}

.sidebar a:hover {
  background-color: #ecf0f1;
  color: #2c3e50;
}

.content {
  margin-left: 260px;
  padding: 20px;
}

/* Cards Section */
.cards-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.card {
  flex: 1;
  min-width: 200px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.card h2 {
  font-size: 24px;
  color:rgb(12, 12, 12);
  margin: 0;
  align:center;
}

/* Charts Section */
.chart-wrapper {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.chart-container {
  flex: 1;
  min-width: 300px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.chart-category {
 flex: 1;
  min-width: 300px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Geolocation + Details Section */
.bottom-section {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 30px;
}

/* Map Container */
.details-section {
  flex: 0 0 60%; /* Fixed width for map section */
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Location List */
.location-list {
  flex: 1;
  min-width: 250px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-height: 468px;
  overflow-y: auto;
}

.location-list h3 {
  font-size: 20px;
  color: #2c3e50;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin: 0 0 10px 0;
}

.location-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.location-list li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.location-name {
  font-weight: 500;
  color: #34495e;
}

.customer-count {
  background-color: #2980b9;
  color: #fff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
}


/* Responsive Design */
@media (max-width: 768px) {
  .cards-container,
  .chart-wrapper,
  .bottom-section {
    flex-direction: column;
  }

  .content {
    margin-left: 0;
  }

  .sidebar {
    position: relative;
    width: 100%;
    height: auto;
  }

  .sidebar a {
    float: left;
    width: 100%;
  }
}


      `}</style>

      <div className="sidebar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/customer">Customer</Link>
        <Link to="/Vieworder">Food Section</Link>
        <Link to="/viewfeedback">Feedbacks</Link>
        <Link to="/login">Logout</Link>
      </div>

      <div className="content">
  {/* Dashboard Cards */}
  <div className="cards-container">
    <Link
      to="/customers"
      className="card"
      style={{ backgroundColor: '#add8e6', textDecoration: 'none' }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold'}}>Total Customers</h2>
    </Link>

    <Link
      to="/invoices"
      className="card"
      style={{ backgroundColor: '#f08080', textDecoration: 'none' }}
    >
      <h2>Total Invoice</h2>
    </Link>

    {weatherData && (
  <div className="card" style={{ backgroundColor: '#90ee90' }}>
    <h2 id="current-date">{currentDate}</h2>
    <p> Temp: {Math.round(weatherData.main.temp)}°C</p>
    <p>Wind: {weatherData.wind.speed} m/s</p>
    <p>Condition: {weatherData.weather[0].description}</p>
  </div>
)}


    <div className="card" style={{ backgroundColor: '#fafad2' }}>
      <h2>Total Revenue</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>₹ {totalRevenue}</p>
    </div>
  </div>

  {/* Charts Section */}
  <div className="chart-wrapper">
    <div className="chart-container">
      <HighchartsReact highcharts={Highcharts} options={genderChartOptions} />
    </div>
    <div className="chart-container">
      <HighchartsReact highcharts={Highcharts} options={salesChartOptions} />
    </div>
  </div>
<div className="chart-container">
  <HighchartsReact highcharts={Highcharts} options={options} />
</div>
  {/* Bottom Section: Geolocation + Location List */}
  <div className="bottom-section">
    <div className="details-section">
      <h2 className="text-xl font-bold mb-4">Customer Locations</h2>
      <CustomerMap />
    </div>

    <div className="location-list">
      <h3>Location-wise Customers</h3>
      <ul>
        {locationStats.map((loc, index) => (
          <li key={index}>
            <span className="location-name">{loc.location}</span>
            <span className="customer-count">{loc.count}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>



    </>
  );
};

export default Dashboard;
