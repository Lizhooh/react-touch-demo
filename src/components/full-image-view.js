import React, { Component } from 'react';
import styled from 'styled-components';

export default class FullImageView extends Component {

    static defaultProps = {
        data: [],
        active: 0,
        onClose: _ => _,
    }

    constructor(props) {
        super(props);
        this.width = document.body.clientWidth;
        this.state = {
            active: this.props.active,
            offsetX: this.props.active * this.width,
            animation: true,
        };
        this._touch = {};
    }

    onTouchStart = e => {
        e.preventDefault();
        e.stopPropagation();
        this._touch.startOffset = this.state.offsetX;  // 开始时的偏移值
        this._touch.pageX = e.touches[0].pageX;        // 开始的位置
        this.setState({ animation: false });
    }

    onTouchMove = e => {
        e.preventDefault();
        e.stopPropagation();
        // 移动
        if (this._touch.pageX) {
            // 计算新的位置
            const newOffset = this._touch.startOffset - (e.touches[0].pageX - this._touch.pageX);
            // 边界处理
            if (newOffset < -100 || newOffset > this.width * (this.props.data.length - 1) + 100) return;
            this.list.style.webkitTransform = `translate3d(${-newOffset}px, 0, 0)`;
            this._touch.newOffset = newOffset;
        }
    }

    onTouchEnd = e => {
        e.preventDefault();
        e.stopPropagation();
        this.list.style = '';
        // 方向
        const direction = (e.changedTouches[0].pageX - this._touch.pageX) < 0 ? 0.25 : -0.25;
        // 回弹的位置
        let active = Math.round(this._touch.newOffset / this.width + direction) || 0;

        if (active > this.props.data.length - 1) active = this.props.data.length - 1;
        if (active < 0) active = 0;

        this.setState({
            animation: true,
            offsetX: Math.abs(active) * this.width,
            active: active,
        });
    }

    render() {
        const { data, onClose } = this.props;
        const { offsetX, animation, active } = this.state;

        return (
            <Container>
                <Header className="flex flex-ai-center">
                    <span className="text">{active + 1} / {data.length}</span>
                    <i className="material-icons" onClick={onClose}>close</i>
                </Header>

                <List
                    innerRef={r => this.list = r}
                    width={this.width * data.length}
                    offsetX={offsetX}
                    onTouchStart={this.onTouchStart}
                    onTouchMove={this.onTouchMove}
                    onTouchEnd={this.onTouchEnd}
                    animation={animation}
                    >
                    {data.map((item, index) => (
                        <li key={`full-image-view-${index}`}>
                            <img src={item} />
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}

const Container = styled.div`
    background-color: rgba(1, 1, 1, 1);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    transform: translate3d(0, 0, 0);
    color: #fff;
`;

const Header = styled.header`
    height: 50px;
    display: flex;
    width: 100%;
    padding: 12px;
    > span.text { flex: 1 }
    > i { font-size: 20px }
`;

const List = styled.ul`
    overflow-x: auto;
    width: ${p => p.width}px;
    display: flex;
    flex: 1;
    animation: full-image-view-list-start 0.24s ease-in-out 0.1s;
    animation-fill-mode: both;
    @keyframes full-image-view-list-start {
        0% { opacity: 0 }
        100% { opacity: 1 }
    }

    > li {
        flex: 1;
        text-align: center;
        padding: 8px;
        > img {
            max-height: 100%;
        }
    }
    /* 设置偏移量 */
    transform: translate3d(${p => -p.offsetX}px, 0, 0);
    ${p => p.animation && `
        transition: all 0.2s ease;
    `};
`;
