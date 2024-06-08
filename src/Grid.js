import React from "react";

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let d = new Date(this.props.year, this.props.month - 1);
        const firstDayOfMonth = d.getDay();
        const nextMonth = new Date(this.props.year, this.props.month);
        const daysInMonth = (nextMonth - d) / 1000 / 60 / 60 / 24;
        const weeksInMonth = Math.ceil((firstDayOfMonth + daysInMonth) / 7);
        let layout = [];
        for (let i = 0; i < weeksInMonth; i++) {
            layout.push([])
            for (let j = 0; j < 7; j++) {
                let day = 1 + (j + i * 7) - firstDayOfMonth;
                let content = "";
                if (day > 0 && day <= daysInMonth) {
                    content = day;
                }
                layout[i][j] = (<td key={j + i * 7}>{content}</td>)
            }
        }
        layout = layout.map((week, i) => <tr key={i}>{week}</tr>)


        return (
            <div className="calendar-grid">
                <h6>{this.props.month}, {this.props.year}</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Вск.</th>
                            <th>Пн.</th>
                            <th>Вт.</th>
                            <th>Ср.</th>
                            <th>Чт.</th>
                            <th>Пт.</th>
                            <th>Сб.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {layout}
                    </tbody>
                </table>
            </div>
        );
    }
}