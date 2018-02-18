import React, { Component } from 'react';
import styled from 'styled-components';

export default class Dot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offsetX: 0,
            offsetY: 0,
            animation: true,
        };
        this._touch = {};
    }

    onTouchStart = e => {
        e.preventDefault();
        e.stopPropagation();
        this._touch.pageX = e.touches[0].pageX;
        this._touch.pageY = e.touches[0].pageY;
        this._touch.startOffsetX = this.state.offsetX;
        this._touch.startOffsetY = this.state.offsetY;
        this.setState({ animation: false });
    }

    onTouchMove = e => {
        e.preventDefault();
        e.stopPropagation();
        if (this._touch.pageX) {
            const newOffsetX = this._touch.startOffsetX + (e.touches[0].pageX - this._touch.pageX);
            const newOffsetY = this._touch.startOffsetY + (e.touches[0].pageY - this._touch.pageY);
            if (newOffsetX < 0 || newOffsetY < 0) return;
            this.dot.style.webkitTransform = `translate3d(${newOffsetX}px, ${newOffsetY}px, 0)`;
            this._touch.newOffsetX = newOffsetX;
            this._touch.newOffsetY = newOffsetY;
        }
    }

    onTouchEnd = e => {
        e.preventDefault();
        e.stopPropagation();
        this.dot.style = '';
        this.setState({
            // offsetX: this._touch.newOffsetX,
            // offsetY: this._touch.newOffsetY,
            offsetX: 0,
            offsetY: 0,
            animation: true,
        });
    }

    render() {
        const { offsetX, offsetY, animation } = this.state;

        return (
            <Container
                innerRef={r => this.dot = r}
                onTouchEnd={this.onTouchEnd}
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                offsetX={offsetX}
                offsetY={offsetY}
                animation={animation}
                >

            </Container>
        );
    }
}

const Container = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: #3af;
    box-shadow: 1px 2px 3px rgba(1, 1, 1, 0.12);
    transform: translate3d(${p => p.offsetX}px, ${p => p.offsetY}px, 0);
    ${p => p.animation && `
        transition: all 0.3s ease-in-out;
    `};
`;

