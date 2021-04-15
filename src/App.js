import './App.css';
import React from 'react';

/*
function App() {
  return (
    <body>
		<header>
			<div id="logo">Notely</div>
		</header>
		<div class="pageContent">
			<div class="sidebar"></div>
			<div class="explorerSection">
				<div class="addbar"></div>
				<div class="explorer"></div>
			</div>
		</div>
	</body>
  );
}
*/


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
				})
			}).catch((err) => {
				console.log(err)
			})
		}

	render() {
		console.log(this);
		if (this.state.loading) {
			console.log('IF')
			return (
				<div><h1>Loading</h1></div>
			);
		} else {
			console.log('ELSE');
			return (
				<div>
					<header>
						<div id="logo">Notely</div>
					</header>
					<div className="pageContent">
					<div className="sidebar"></div>
						<div className="explorerSection">
							<div className="addbar"></div>
							<div className="explorer"></div>
						</div>
					</div>
					<p>{ this.state.data[0].Inhalt} </p>
				</div>
			);
		}
		
	}
}

export default App;
