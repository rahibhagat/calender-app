import React from "react";
import dateFns from "date-fns";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      // <div className="header">
      //   <div className="col col-start">
      //     <div className="icon" onClick={this.prevMonth}>
      //       chevron_left
      //     </div>
      //   </div>
      //   <div className="col col-center">
      //     <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
      //   </div>
      //   <div className="col col-end" onClick={this.nextMonth}>
      //     <div className="icon">chevron_right</div>
      //   </div>
      // </div>
     <div className="header col-8 row px-3">
              <div className="col col-start" onClick={this.prevMonth}>
                <div className="icon">chevron_left</div>
              </div>
              <div className="col col-center">
                <span>
                  {dateFns.format(this.state.currentMonth, dateFormat)}
                </span>
              </div>
              <div className="col col-end" onClick={this.nextMonth}>
                <div className="icon">chevron_right</div>
              </div>
            </div>
    );
  }

  renderDays() {
    const dateFormat = "ddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth, { weekStartsOn: 1});

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="days col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="col-8 row px-3">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart, {weekStartsOn: 1});
    const endDate = dateFns.endOfWeek(monthEnd, {weekStartsOn: 1});

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
          //className="col col-center rounded py-2 calender-cell"
            className={`col col-center rounded py-2 calender-cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => {this.onDateClick(dateFns.parse(cloneDay))}}
          >
            <span className="number">{formattedDate}</span>
            {/* <span className="bg">{formattedDate}</span> */}
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div  className="row g-2"
                    style={{
                      gap: "0.5rem",
                    }} key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body row-gap col-12 px-3">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar col-md-6 col-sm-6 col-lg-6 col bg-white">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
