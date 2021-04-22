import "./style.css";
import Sidebar from "./components/Sidebar.jsx";
import Addbar from "./components/Addbar";
import Explorer from "./components/Explorer.jsx";
import { useState } from "react";

function App() {
	const [elements, setElements] = useState([
		{
			name: "testOrdner",
		},
	]);

	return (
		<div className="App">
			<header id="nav">
				<div id="appLogo">Notely</div>
			</header>
			<div className="pageContent">
				<Sidebar />
				<div className="explorerSection">
					<Addbar />
					<Explorer elements={elements} setElements={setElements} />
				</div>
			</div>
		</div>
	);
}

export default App;
