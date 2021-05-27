import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import SignUp from './components/SignUp.js'
import Login from './components/Login.js'

import MainMenu from './components/MainMenu'
import Sidebar from './components/Sidebar'
import Note from './components/Note'
import Home from './components/Home'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notizData: [],
			userData: [],
			isLoading: true,
			error: '',
		}
	}

	componentDidMount() {
		fetch('http://localhost:3001/api/v1/notes')
			.then(response => response.json())
			.then(myData => {
				this.setState({
					notizData: myData,
					isLoading: false,
				})
			})
			.catch((err) => {
				this.setState({
					isLoading: false,
					error: err
				})
		})
		fetch('http://localhost:3001/api/v1/users')
			.then(response => response.json())
			.then(myData => {
				this.setState({
					userData: myData,
					isLoading: false,
				})
			})
			.catch((err) => {
				this.setState({
					isLoading: false,
					error: err
				})
		})
	}

	// auf unseren Branches arbeiten
	// von TextInput 
	render() {
		// return(<Login/>)
		const notizItems = this.state.notizData.map((item) => {
			return (
				<li>{item.Titel}</li>
			)
		})

		const userItems = this.state.userData.map((item) => {
			return (
				<li>{item.Name}</li>
			)
		})
		if (this.state.isLoading && this.state.error === '' ) {
			return (
				<div>
					Is Loading
				</div>
			)
		}
		if (this.state.isLoading && this.state.error !== '') {
			return (
				<div>
					{ this.state.error }
				</div>
			)
		}

		else {
			return(
				<Router>
					<div className="App">
						<MainMenu />
						<div className ="middleBody">
						<Sidebar />
						<div className="content">
							<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route path="/note">
								<Note />
							</Route>
							<Route path="/login">
								<Login />
							</Route>
							<Route path="/signup">
								<SignUp />
							</Route>
							</Switch>
						</div>
						</div>
					</div>
				</Router>
			);
		}
	}		
}

export default App;