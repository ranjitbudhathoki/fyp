import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Robot from '../components/chat/robot.gif';
export default function NoContent({ username, content }) {
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1 className="text-2xl">
        Welcome, <span>{username}!</span>
      </h1>
      <h3 className="text-2xl">{content}.</h3>
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
