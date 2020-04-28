import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import "./App.css";
import { SearchBox } from "./components/search-box/search-box.components";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
    /*
    '.bind' is a method on any function which retruns a new function 
    where the context of 'this' is set to whatever we pass to it
    Now 'this' can access state, so we can bind with it
    this === this.setState({})
    */
    // this.handleChange = this.handleChange.bind(this);
    //This is not used if we use arrow functions as themesleves define the scope of 'this'
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }
  /*
  This will throw here as 'this' is not defined, 'this' doesn't get global scope in function, 
  so for that we have to bind this.handleChange with the 'state' at the constructor level
  */
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };
  render() {
    //Destructuring -->  so that we don't modify the existing monster array as per search field
    const { monsters, searchField } = this.state;
    // Similar to --> const monsters = this.state.monsters;
    // Similar to --> const searchField = this.state.searchField;
    const filterMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLocaleLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="Search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filterMonsters} />
      </div>
    );
  }
}

export default App;
