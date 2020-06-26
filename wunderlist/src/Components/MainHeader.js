import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { DarkGold } from "../ColorPalette";

const MainHeading = styled.h1`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 4rem;
  font-weight: 700;
  text-shadow: 3px 3px ${DarkGold};
`;

const MainHeader = ({ type }) => {
  let userID = useParams().id;
  let path =
    type === "signup" || type === "login" ? "/" : `/wunderlist/${userID}`;
  return (
    <MainHeading>
      <Link to={path}>Wunderlist 2.0</Link>
    </MainHeading>
  );
};

export default MainHeader;
