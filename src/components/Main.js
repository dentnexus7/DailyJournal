import React, { Component } from 'react'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

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
            <tr>
              <td>Hello</td>
              <td>Goodbye</td>
              <td>Hola</td>
              <td>Ciao</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;