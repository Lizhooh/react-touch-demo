import React, { Component } from 'react';
import styled from 'styled-components';
import Toolbar from './components/toolbar';
import FullImageView from './components/full-image-view';
import Dot from './components/dot';

const images = [
    require('./assets/d46122a667.jpg'),
    require('./assets/b0cd83bcd5.jpg'),
    require('./assets/7630457ba9.jpg'),
];

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullscreen: false,
            active: 0,
        }
    }

    showFullImageView = (index) => {
        this.setState({ fullscreen: true, active: index })
        document.querySelector('html').style.overflow = 'hidden';
    }

    hideFullImageView = () => {
        this.setState({ fullscreen: false })
        document.querySelector('html').style.overflow = 'auto';
    }

    render() {
        const { fullscreen, active } = this.state;

        return (
            <Container>
                <Toolbar />
                <ul className="flex flex-wrap">
                    {images.map((item, index) => (
                        <li key={index} onClick={e => this.showFullImageView(index)}>
                            <img src={item} style={{ width: 120 }} />
                        </li>
                    ))}
                </ul>

                <Dot />
                {
                    fullscreen &&
                    <FullImageView
                        data={images}
                        active={active}
                        onClose={this.hideFullImageView}
                        />
                }
            </Container>
        );
    }
}

const Container = styled.div`
    padding-top: 50px;
`;
