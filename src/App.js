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

	
	render() {
		
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
			</div>
		);
	}		
}

export default App;
