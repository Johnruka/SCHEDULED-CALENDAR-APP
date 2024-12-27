import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
  const apiEndPoint = "http://localhost:8080/api/analytics";

  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndPoint);
        if (response.data && Array.isArray(response.data)) {
          setAnalyticsData(response.data);
        } else {
          setAnalyticsData([]);
        }
      } catch (err) {
        console.error("Error loading analytics data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Analytics</h1>
      {loading ? (
        <div style={styles.message}>Loading...</div>
      ) : error ? (
        <div style={styles.error}>Error: {error.message}</div>
      ) : !analyticsData.length ? (
        <div style={styles.message}>No analytics data available.</div>
      ) : (
        <ul style={styles.list}>
          {analyticsData.map((item, index) => (
            <li key={index} style={styles.listItem}>
              <strong>{item.metricName}:</strong> {item.metricValue}
              <br />
              <em>Date:</em> {new Date(item.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: 'auto'
  },
  heading: {
    color: '#333',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
  },
  message: {
    color: '#666',
    fontSize: '1.2em',
  },
  error: {
    color: 'red',
    fontSize: '1.2em',
  },
  list: {
    listStyleType: 'none',
    padding: '50px 0',
    margin: 0,
  },
  listItem: {
    padding: '30px',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
    backgroundColor: 'white',
    borderRadius: '5px',
  }
};

export default Analytics;
