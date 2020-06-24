import React from 'react';
import Switch from './Switch';
import styled from 'styled-components';
import {DarkGold, LightTan, BurntOrange, DarkPurple, LightPurple} from '../ColorPalette'

const completeBackground = 'rgba(64, 86, 161, .3)';

const DisplayListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({complete}) => complete ? completeBackground : undefined};
    margin: 1%;
    border-radius: 15px;
    max-height: 2em;
`;

const DisplayListHeader = styled.h3`
    margin-left: 1%;
`;




const DisplayList = ({task, id, setRenderToDo, renderToDo }) => {
   
    return (
        <DisplayListContainer complete={task.complete}>
            <DisplayListHeader>{task.description}</DisplayListHeader>
            <Switch task={task} id={id} setRenderToDo={setRenderToDo} renderToDo={renderToDo}/>
        </DisplayListContainer>
    )
}

export default DisplayList