import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';

interface Element {
    id: string; // Assuming each element has a unique ID
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

interface State {
    elements: Element[];
}

const initialState: State = {
    elements: []
};

class GameBoard extends React.PureComponent<{}, State> {
    state = initialState;

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        return (
            <Stage width={this.state.width || window.innerWidth} height={this.state.height || window.innerHeight}>
                <Layer>
                    {this.state.elements.map((el) => (
                        <Rect
                            key={el.id}
                            x={el.x}
                            y={el.y}
                            width={el.width}
                            height={el.height}
                            fill={el.color}
                            draggable
                        />
                    ))}
                </Layer>
            </Stage>
        );
    }
}

export default GameBoard;
