import React, {FC} from 'react';
import { HomeProps } from './interfaces';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export const HomePage: FC<
  HomeProps
> = props => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={() => navigate('/about')}> about</Button>
    </div>
  )
};
