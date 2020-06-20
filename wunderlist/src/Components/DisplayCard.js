import React from 'react';
import styled from 'styled-components';
import { LightTan } from '../ColorPalette';



const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 1%;
    height: 100%;
    min-width: 30%;
    border: 2px solid red;

    p {
        width: 10%;
        padding: 1%;
        margin: 1%;
    }

`;


const DisplayCard = ({card}) => {
    return (
    <CardContainer >
        <button>Edit</button>
        <h2>{card.title}</h2>
        <p>{(card.date !== null ? (card.date.split('T')[0]): undefined)}</p>
    </CardContainer>)
}

export default DisplayCard
