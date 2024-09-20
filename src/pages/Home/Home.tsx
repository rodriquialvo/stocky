import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={() => navigate('/about')}> about</Button>
    </div>
  )
}
