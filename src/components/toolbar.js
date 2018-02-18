import React from 'react';
import styled from 'styled-components';

export default () => (
    <Container>
        <i className="material-icons">menu</i>
    </Container>
)

const Container = styled.div`
    height: 50px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 1px 2px 12px rgba(1, 1, 1, 0.32);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    padding: 12px;
    color: #333;
`;
