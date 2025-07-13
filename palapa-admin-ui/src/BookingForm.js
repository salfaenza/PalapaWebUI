import React, { useState } from 'react';

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '', first: '', last: '',
    hut_number: '', room: '',
    email: '', phone: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      alert("Booking scheduled!");
    } else {
      alert("Failed to schedule booking");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(form).map(field => (
        <input
          key={field}
          name={field}
          placeholder={field.replace("_", " ")}
          value={form[field]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Schedule</button>
    </form>
  );
}