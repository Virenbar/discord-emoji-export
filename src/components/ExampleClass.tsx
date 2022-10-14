import React from "react";

export class ExampleClass extends React.Component<unknown, State> {
    constructor() {
        super({});
        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Click me
                </button>
            </div>
        );
    }
}

interface State {
    count: number
}
