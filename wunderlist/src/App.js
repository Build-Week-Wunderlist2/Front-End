import React from 'react';
import { Link, Route } from 'react-router-dom'
import LoginForm from './Components/LoginForm'
import { DarkGold, LightTan, BurntOrange, DarkPurple, LightPurple } from './ColorPalette'
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${LightTan};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  margin: 0;
`;

const MainHeading = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-weight: 700;
  text-shadow: 3px 3px ${DarkGold};
`;

const MainParagraph = styled.p`
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
`;

const Button = styled.button`
  width: 5em;
  font-size: 1.6rem;
  margin: 1%;
`;

function App() {
  return (
    <MainContainer>
      <MainHeading>
        Wonderlist 2.0
      </MainHeading>
      <Route exact path="/">
        <ButtonContainer>
          <Link to='/signup'><Button>Sign Up</Button></Link>
          <Link to='/login'><Button>Log In</Button></Link>
        </ButtonContainer>
      </Route>
      <Route path="/signup">
        <LoginForm type= 'signup'/>
      </Route>
      <Route path="/login">
        <LoginForm type= 'login'/>
      </Route>
    </MainContainer>
  );
}

export default App;
