import "./style.css";
import Sidebar from "./components/Sidebar.jsx";
import Addbar from "./components/Addbar";
import Explorer from "./components/Explorer.jsx";
import { useState } from "react";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";

function App() {
	const [data, setData] = useState([]);
	const [categories, setCategories] = useState([]);
	const [topics, setTopics] = useState([]);
	const [currentTopic, setCurrentTopic] = useState("");
	const [inCategory, setInCategory] = useState("");

	return (
		<div className="App">
			<header id="nav">
				<div id="appLogo">Notely</div>
				<div className="account">
					<div className="accountIcon">
						<IconButton style={{ width: "50px", height: "50px" }}>
							<AccountCircleIcon />
						</IconButton>
					</div>
				</div>
			</header>
			<div className="pageContent">
				<Sidebar
					data={data}
					setData={setData}
					categories={categories}
					setCategories={setCategories}
					topics={topics}
					setTopics={setTopics}
					currentTopic={currentTopic}
					setCurrentTopic={setCurrentTopic}
				/>
				<div className="explorerSection">
					<Addbar
						data={data}
						setData={setData}
						categories={categories}
						setCategories={setCategories}
						topics={topics}
						setTopics={setTopics}
						currentTopic={currentTopic}
						setCurrentTopic={setCurrentTopic}
						inCategory={inCategory}
						setInCategory={setInCategory}
					/>
					{currentTopic === "" ? (
						<div className="replacement">
							<div className="message">
								<p>Noch nichts hier</p>
							</div>
							<div className="message2">
								<p>
									Jetzt neue neue Themen erstellen oder bestehende anklicken
								</p>
							</div>
						</div>
					) : (
						<Explorer
							data={data}
							setData={setData}
							currentTopic={currentTopic}
							setCurrentTopic={setCurrentTopic}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
