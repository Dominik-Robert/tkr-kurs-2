import './App.css';
import React from 'react';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: true,
		};
	}

	componentDidMount() {
		fetch('http://localhost:3001/api/v1/notes')
			.then(response => response.json())
			.then(myData => {
				console.log('My Data', myData)
				this.setState({
					data: myData,
					loading: false,
					error: '',
				})
			}).catch((err) => {
				console.log('my error', err.toString())
				this.setState({
					isLoading: false,
					error: err.toString(),
				})
			})
		}

	render() {
		const items = this.state.data.map((item) => {
			return (
				<li>{item.Inhalt}</li>
			)
		})
		if (this.state.isLoading && this.state.error === '' ) {
			return (
				<div>
					Is Loading
				</div>
			)
		}
		else if (this.state.isLoading === false && this.state.error !== '' ) {
			return (
				<div>
					{ this.state.error }
				</div>
			)
		}
		else {
			return (
				<div>
					<header>
						<div id="logo">Notely</div>
					</header>
					<div className="pageContent">
						<div className="sidebar"></div>
						<div className="explorerSection">
							<div className="addbar"></div>
							<div className="explorer">
								{ items }
							</div>
							<input type="text" />
						</div>
					</div>
				</div>
			);
		}
	}		
}

export default App;
