import './App.css';
import React from 'react';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			isLoading: true,
			error: '',
		}
	}

	componentDidMount() {
		fetch('http://localhost:3001/api/v1/notes')
			.then(response => response.json())
			.then(myData => {
				this.setState({
					data: myData,
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
		if (this.state.isLoading && this.state.error !== '') {
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