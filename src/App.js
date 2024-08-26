import logo from './logo.svg';
import './App.css';
import Todo from "./Todo";
import React from "react";
import {AppBar, Button, Container, dividerClasses, Grid, List, Paper, Toolbar, Typography} from "@mui/material";
import AddTodo from "./AddTodo";
import {call, signout} from "./service/ApiService";

// <div className="App">
//   <Todo item={this.state.item}/>
// </div>

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
        };
    }

    update = (item) => {
        call("/todo", "PUT", item).then((response) =>
            this.setState({items:response.data})
        );
    }

    componentDidMount() {
        call("/todo", "GET", null).then((response) =>
                this.setState({items: response.data, loading: false})
        );
    }

    add = (item) => {
        call("/todo", "POST", item).then((response) =>
            this.setState({items: response.data})
        );
    }

    delete = (item) => {
        call("/todo", "DELETE", item).then((response) =>
            this.setState({items: response.data})
        );
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
                        <Todo
                            item={item}
                            key={item.id}
                            delete={this.delete}
                            update={this.update}
                        />
                    ))}
                </List>
            </Paper>
        );

        var navigationBar = (
            <AppBar position="static">
                <Toolbar>
                    <Grid justify="space-between" container>
                        <Grid item>
                            <Typography variant="h6">오늘의 할일</Typography>
                        </Grid>
                    </Grid>
                    <Button color="inherit" onClick={signout}>로그아웃</Button>
                </Toolbar>
            </AppBar>
        )

        var todoListPage= (
            <div>
                {navigationBar}
                <Container maxWidth="md">
                    <AddTodo add={this.add} />
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );

        var loadingPage = <h1> 로딩중.. </h1>
        var content = loadingPage;
        if (!this.state.loading) {
            content = todoListPage;
        }

        return <div className="App">{content}</div>;

        // return (
        //     <div className="App">
        //         {navigationBar}
        //         <Container maxWidth="md">
        //             <AddTodo add={this.add}/>
        //             <div className="TodoList">{todoItems}</div>
        //         </Container>
        //     </div>
        // );
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
