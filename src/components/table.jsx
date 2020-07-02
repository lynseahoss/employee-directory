import React, { Component } from "react";
import User from "../lib/user.json";
import TableBody from "./TableBody";
export default class Table extends Component {
  state = {
    mainList: [],
    activeList: []
  };
  componentDidMount() {
    this.setState({
      mainList: User,
      activeList: User
    });
  }
  searchHandler = term => {
    const newList = this.state.mainList.filter(
      user =>
        user.name.first.toLowerCase().includes(term.toLowerCase()) ||
        user.name.last.toLowerCase().includes(term.toLowerCase())
       );
      this.setState({
          activeList: newList
      })
  };
  render() {
    //return is a callback
    return (
      <>
        <input onChange={event => this.searchHandler(event.target.value)} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Cell Phone</th>
            </tr>
          </thead>
          <tbody>
            {/* that is a component below */}
            {this.state.activeList.map((user, index) => (
              <TableBody User={user} index={index} key={user.cell} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
