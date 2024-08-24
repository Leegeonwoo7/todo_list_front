import logo from './logo.svg';
import './App.css';
import Todo from "./Todo";
import React from "react";
import {Container, dividerClasses, List, Paper} from "@mui/material";
import AddTodo from "./AddTodo";

// <div className="App">
//   <Todo item={this.state.item}/>
// </div>

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        };

        fetch("http://localhost:8080/todo", requestOptions)
            .then((response) => response.json())
            .then(
                (response) => {
                    this.setState({
                        items: response.data,
                    });
                },
                (error) => {
                    this.setState({
                        error,
                    });
                }
            );
    }

    add = (item) => {
        const thisItems = this.state.items;
        item.id = "ID-" + thisItems.length;
        item.done = false;
        thisItems.push(item);
        this.setState({ items: thisItems});
        console.log("items : ", this.state.items);
    }

    delete = (item) => {
        const thisItems = this.state.items;
        console.log("Before Update Items: ", this.state.items)
        const newItems = thisItems.filter(e => e.id !== item.id);
        this.setState({items: newItems}, () => {
            console.log("Update Items: ", this.state.items)
        });
    }

    render() {
        const {items} = this.state;
        if (!items) {
            return <div>Loading...</div>
        }

        var todoItems = this.state.items.length > 0 && (
            <Paper style={{margin: 16}}>
                <List>
                    {this.state.items.map((item, idx) => (
                        <Todo item={item} key={item.id} delete={this.delete}/>
                    ))}
                </List>
            </Paper>
        );

        return (
            <div className="App">
                <Container>
                    <AddTodo add={this.add}/>
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );
    }
}


// function App() {
//   return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo"/>
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//               className="App-link"
//               href="https://reactjs.org"
//               target="_blank"
//               rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//   );
// }

export default App;
