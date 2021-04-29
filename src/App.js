import './App.css';
import React from 'react';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3001/api/v1/notes')
			.then(response => response.json())
			.then(myData => {
				this.setState({
					data: myData
				})
			})
			.catch((err) => {
				console.log(err)
		})
	}

	render() {
		const items = this.state.data.map((item) => {
			return (
				<li>{item.Inhalt}</li>
			)
		})

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
					</div>
				</div>
			</div>
		);
	}		
}

export default App;