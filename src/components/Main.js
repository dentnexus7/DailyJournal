import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">
        <div className="text-center">
          <h1>{this.props.name}</h1>
        </div>
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Date</th>
              <th scope="col">Breakfast</th>
              <th scope="col">Lunch</th>
              <th scope="col">Dinner</th>
              <th scope="col">Meditation</th>
            </tr>
          </thead>
          <tbody>
              {this.props.entries.map((entry, key) => {
                return (
                  <tr key={key}>
                    <td>{entry.day}</td>
                    <td>{entry.date}</td>
                    <td>{entry.breakfast}</td>
                    <td>{entry.lunch}</td>
                    <td>{entry.dinner}</td>
                    <td>{entry.meditation}</td>
                  </tr>
                )  
              })}
              <tr>
                <td>
                  <input
                    id="day"
                    type="text"
                    ref={(day) => { this.day = day }}
                    className="form-control"
                    placeholder="Day"
                    required 
                  />
                </td>
                <td>
                  <input
                    id="date"
                    type="text"
                    ref={(date) => { this.date = date }}
                    className="form-control"
                    placeholder="Date"
                    required 
                  />
                </td>
                <td>
                  <input
                    id="breakfast"
                    type="text"
                    ref={(breakfast) => { this.breakfast = breakfast }}
                    className="form-control"
                    placeholder="Breakfast"
                    required 
                  />
                </td>
                <td>
                  <input
                    id="lunch"
                    type="text"
                    ref={(lunch) => { this.lunch = lunch }}
                    className="form-control"
                    placeholder="Lunch"
                    required 
                  />
                </td>
                <td>
                  <input
                    id="dinner"
                    type="text"
                    ref={(dinner) => { this.dinner = dinner }}
                    className="form-control"
                    placeholder="Dinner"
                    required 
                  />
                </td>
                <td>
                  <input
                    id="meditation"
                    type="text"
                    ref={(meditation) => { this.meditation = meditation }}
                    className="form-control"
                    placeholder="Meditation"
                    required 
                  />
                </td>
                <td>
                  <form onSubmit={(event) => {
                    event.preventDefault();
                    const day = this.day.value;
                    const date = this.date.value;
                    const breakfast = this.breakfast.value;
                    const lunch = this.lunch.value;
                    const dinner = this.dinner.value;
                    const meditation = this.meditation.value;
                    this.props.createEntry(day, date, breakfast, lunch, dinner, meditation);
                  }}>
                    <button type="submit" className="btn btn-primary btn-block">Add</button>
                  </form>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;