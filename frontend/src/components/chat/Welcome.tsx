import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Robot from './robot.gif';
export default function Welcome({ username }) {
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1 className="text-2xl">
        Welcome, <span>{username}!</span>
      </h1>
      <h3 className="text-2xl">Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
