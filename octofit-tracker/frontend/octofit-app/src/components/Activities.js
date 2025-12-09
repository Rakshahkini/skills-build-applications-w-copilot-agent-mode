import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Activities API endpoint:', endpoint);
        console.log('Fetched data:', json);
        setData(json.results || json);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-lg p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="card-title fw-bold text-primary">Activities</h2>
        <button className="btn btn-success" type="button">Add Activity</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Details</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((item, idx) => (
              <tr key={item.id || idx}>
                <th scope="row">{item.id || idx + 1}</th>
                <td>{item.name || '-'}</td>
                <td>{item.type || '-'}</td>
                <td>{item.details || JSON.stringify(item)}</td>
                <td>
                  <button className="btn btn-primary btn-sm mx-1">View</button>
                  <button className="btn btn-warning btn-sm mx-1">Edit</button>
                  <button className="btn btn-danger btn-sm mx-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
