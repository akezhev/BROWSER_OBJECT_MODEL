import React from "react";
import Grid from "./Grid";


export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: null,
            year: null
        }
    }

    handleMonthInput(value) {
        this.month = value;
    }

    handleYearInput(value) {
        this.year = value;
    }

    generateGrid() {
        const {month, year} = this;
        if (this.validateMonth(month) && this.validateYear(year)) {
            this.setState({month, year});
        } else {
            alert("Проверьте данные!"); // временно
        }
    }

    validateMonth(month) {
        month = parseInt(month);    
        return month <= 12 && month > 0;
    }

    validateYear(year) {
        year =  parseInt(year);
        return !isNaN(year);
    }

    render() {
        const {month, year} = this.state;
        return (
            <div className="calendar border rounded mt-3 p-3">
                <div className="row mb-3">
                    <div className="col-6 form-floating">
                        <input onChange={e => this.handleMonthInput(e.target.value)} className="form-control" id="month" placeholder=""></input>
                        <label htmlFor="month">Month:</label>
                    </div>
                    <div className="col-6 form-floating">
                        <input onChange={e => this.handleYearInput(e.target.value)} className="form-control" id="year" placeholder=""></input>
                        <label htmlFor="year">Year:</label>
                    </div>
                </div>
                <div className="d-grid">
                    <button onClick={() => this.generateGrid()} className="btn btn-success" type="button">Generate</button>
                </div>
                <Grid month={month} year={year} />
            </div>
        );
    }
}