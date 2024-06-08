import React from "react";
import Calendar from "./Calendar";

export default class App extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-3">
                        <Calendar />
                    </div>
                </div>
            </div>
        );
    }
}