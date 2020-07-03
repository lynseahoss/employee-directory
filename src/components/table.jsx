import React, { Component } from "react";
import User from "../lib/user.json";
import TableBody from "./TableBody";
export default class Table extends Component {
  state = {
    mainList: [],
    activeList: [],
    orderList: ""
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
    });
  };
  sortUser = () => {
    console.log("clicked");
    const newList = this.state.activeList.sort((a, b)=>{
    
      if (this.state.orderList === "asc" || !this.state.orderList) {
        if (a.name.first > b.name.first) {
          return 1;
        }
        if (a.name.first < b.name.first) {
          return -1;
        }
        return 0;
      } else {
        if (a.name.first < b.name.first) {
          return 1;
        }
        if (a.name.first > b.name.first) {
          return -1;
        }
        return 0;
      }
    });
    const newDirection = "asc" === this.state.orderList ? "des" : "asc";
    this.setState({
      orderList: newDirection,
      activeList: newList
    });
  };
  render() {
    //return is a callback
    return (
      <>
      <h1>Employee Directory</h1>
        <input onChange={event => this.searchHandler(event.target.value)} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee Image</th>
              <th scope="col" style={{cursor:'pointer'}}onClick={this.sortUser}>
                Name {
                  this.state.orderList === 'asc'? ('⬇🦄'):(this.state.orderList === 'des' ? '⬆🐵  ':'')
                }
              </th>
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
 