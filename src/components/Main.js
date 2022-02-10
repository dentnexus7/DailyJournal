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
              <th scope="col">Date</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
              {this.props.entries.map((entry, key) => {
                return (
                  <tr key={key}>
                    <td>{entry.date}</td>
                    <td>{entry.startTime}</td>
                    <td>{entry.endTime}</td>
                    <td>{entry.description}</td>
                  </tr>
                )  
              })}
              <tr>
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
                    id="startTime"
                    type="text"
                    ref={(startTime) => { this.startTime = startTime }}
                    className="form-control"
                    placeholder="startTime"
                    required 
                  />
                </td>
                <td>
                  <input
                    id="endTime"
                    type="text"
                    ref={(endTime) => { this.endTime = endTime }}
                    className="form-control"
                    placeholder="endTime"
                    required 
                  />
                </td>
                <td>
                  <input
                    id="description"
                    type="text"
                    ref={(description) => { this.description = description }}
                    className="form-control"
                    placeholder="description"
                    required 
                  />
                </td>
                <td>
                <form onSubmit={(event) => {
                  event.preventDefault();
                  const date = this.date.value;
                  const startTime = this.startTime.value;
                  const endTime = this.endTime.value;
                  const description = this.description.value;
                  this.props.createEntry(date, startTime, endTime, description);
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