import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DarkGold } from '../ColorPalette';

const MainHeading = styled.h1`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 4rem;
  font-weight: 700;
  text-shadow: 3px 3px ${DarkGold};
`;


const MainHeader = ({type}) => {
    return (
        <MainHeading >
            <Link to="/">Wonderlist 2.0</Link>
        </MainHeading>
    )
}

export default MainHeader