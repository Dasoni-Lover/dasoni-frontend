import React from 'react'
import { useLocation } from 'react-router-dom';

export default function EditHallInfoPage() {
  const location = useLocation();
  const hallId = location.state?.hallId; 
  const page = location.state?.page;

  return (
    <div>EditHallInfoPage</div>
  )
}
