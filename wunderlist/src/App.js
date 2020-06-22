import React from 'react';
import { Link, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import { device } from './Breakpoints';
import { LightTan } from './ColorPalette';
import PrivateRoute from './Components/PrivateRoute';
import WunderList from './Components/Wunderlist';
import MainHeader from './Components/MainHeader'
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

  a {
    text-decoration: none;
    color: black;
  }
`;


const ButtonContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  @media ${device.laptop} {
    width: 40%;
}  
@media ${device.tablet} {
    width: 55%;
}  
  @media ${device.mobileL} {
    width: 70%;
}
@media ${device.mobileM} {
    width: 90%;
}
`;

const Button = styled.button`
  width: 5em;
  font-size: 1.6rem;
  margin: 1%;
`;

function App() {
  return (
    <MainContainer>
      <Route exact path="/">
        <MainHeader />
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
      <PrivateRoute exact path ="/wunderlist/:id" component ={WunderList}/>
    </MainContainer>
  );
}

export default App;