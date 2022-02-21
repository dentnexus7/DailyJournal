import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">
        <div className="text-center">
          <h1>{this.props.name}</h1>
        </div>
        <table className="table table-borderless text-muted">
          <thead>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
            <th>Meditation</th>
            <th>Day</th>
            <th>Date</th>
            <th>Task #</th>
            <th>startTime</th>
            <th>endTime</th>
            <th>description</th>
          </thead>
          <tbody>
            {this.props.entries.map((entry, key) => {
              return (
                <tr>
                  <td width="5%">{entry.breakfast}</td>
                  <td width="5%">{entry.lunch}</td>
                  <td width="5%">{entry.dinner}</td>
                  <td width="5%">{entry.meditation}</td>
                  <td width="5%">{entry.day}</td>
                  <td width="7%">{entry.date}</td>
                  <td width="3%">
                    {this.props.tasks.map((task, key) => {
                      if(entry.id === task.entryId) {
                        return (
                          <tr >
                              {task.id}
                          </tr>
                        )
                      }
                    })}
                  </td>
                  <td width="5%">
                    {this.props.tasks.map((task, key) => {
                      if(entry.id === task.entryId) {
                        return (
                          <tr >
                              {task.startTime}
                          </tr>
                        )
                      }
                    })}
                  </td>
                  <td width="5%">
                    {this.props.tasks.map((task, key) => {
                      if(entry.id === task.entryId) {
                        return (
                          <tr>
                              {task.endTime}
                          </tr>
                        )
                      }
                    })}
                  </td>
                  <td>
                    {this.props.tasks.map((task, key) => {
                      if(entry.id === task.entryId) {
                        return (
                          <tr>
                              {task.description}
                          </tr>
                        )
                      }
                    })}
                  </td>
                </tr>
              )
            })}
            <tr>
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
                    id="startTime"
                    type="text"
                    ref={(startTime) => { this.startTime = startTime }}
                    className="form-control"
                    placeholder="Start Time"
                    required 
                  />
                </td>
                <td>
                  <input
                    id="endTime"
                    type="text"
                    ref={(endTime) => { this.endTime = endTime }}
                    className="form-control"
                    placeholder="End Time"
                    required 
                  />
                </td>
                <td>
                  <input
                    id="description"
                    type="text"
                    ref={(description) => { this.description = description }}
                    className="form-control"
                    placeholder="Description"
                    required 
                  />
                </td>
                <td>
                  <form onSubmit={(event) => {
                    event.preventDefault();
                    const breakfast = this.breakfast.value;
                    const lunch = this.lunch.value;
                    const dinner = this.dinner.value;
                    const meditation = this.meditation.value;
                    const day = this.day.value;
                    const date = this.date.value;
                    this.props.createEntry(breakfast, lunch, dinner, meditation, day, date);
                  }}>
                    <button type="submit" className="btn btn-primary btn-block">New Entry</button>
                  </form>
                  <br/>
                  <form onSubmit={(event) => {
                    event.preventDefault();
                    const entryId = this.props.entryCount;
                    const startTime = this.startTime.value;
                    const endTime = this.endTime.value;
                    const description = this.description.value;
                    this.props.createTask(entryId, startTime, endTime, description);
                  }}>
                    <button type="submit" className="btn btn-primary btn-block">New Task</button>
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