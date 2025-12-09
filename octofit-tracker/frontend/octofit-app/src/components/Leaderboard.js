import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched data:', json);
        setData(json.results || json);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-lg p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="card-title fw-bold text-primary">Leaderboard</h2>
        <button className="btn btn-success" type="button">Refresh</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
              <th scope="col">Details</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((item, idx) => (
              <tr key={item.id || idx}>
                <th scope="row">{item.id || idx + 1}</th>
                <td>{item.name || '-'}</td>
                <td>{item.score || '-'}</td>
                <td>{item.details || JSON.stringify(item)}</td>
                <td>
                  <button className="btn btn-primary btn-sm mx-1">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
