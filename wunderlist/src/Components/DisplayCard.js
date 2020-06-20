import React from 'react';
import styled from 'styled-components';
import { LightTan } from '../ColorPalette';



const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 1%;
    height: 100%;
    min-width: 30%;
    border: 2px solid red;
`;

const CardTitle = styled.h2`
    text-align: center;
`;

const CardDate = styled.h2`
    text-align: center;
`;

const DisplayCard = ({card}) => {
    return (
    <CardContainer >
        <CardTitle>{card.title}</CardTitle>
        <CardDate>{(card.date !== null ? (card.date.split('T')[0]): undefined)}</CardDate>
    </CardContainer>)
}

export default DisplayCard
