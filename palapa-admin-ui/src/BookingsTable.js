import React, { useEffect, useState } from 'react';

export default function BookingsTable() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/bookings`)
      .then(res => res.json())
      .then(setBookings);
  }, []);

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Hut</th><th>Room</th><th>Time</th></tr>
      </thead>
      <tbody>
        {bookings.map((b, i) => (
          <tr key={i}>
            <td>{b.name}</td><td>{b.hut_number}</td>
            <td>{b.room}</td><td>{b.scheduledTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}