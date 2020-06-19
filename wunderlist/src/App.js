import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { DarkGold, LightTan, BurntOrange, DarkPurple, LightPurple } from './ColorPalette'
import styled from 'styled-components';

import PrivateRoute from './components/PrivateRoute';
import LoginForm from './components/LoginForm';

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
  ${prop => prop.type === 'signup' ? 'axios locations' : 'axios location'}
`;

function App() {
  return (
    <MainContainer>
      <MainHeading>
        Wonderlust 2.0
      </MainHeading>
        <MainParagraph>
          All the words
        </MainParagraph>
    <Switch>
      <Route exact path="/" >
        <ButtonContainer>
          <Link to='/signup'><Button type={'signup'}>Sign Up</Button></Link>
          <Link to='/login'><Button type={'signup'}>Log In</Button></Link>
        </ButtonContainer>
      </Route>
      {/* <PrivateRoute exact path ="/wunderlist" component ={WunderList}/> */}
      <Route path="/login" component={LoginForm} />
     </Switch>
    </MainContainer>
  );
}

export default App;
