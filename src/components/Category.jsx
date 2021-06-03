import React from "react";

import Topic from "./Topic";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useState } from "react";

function Category({ Name, currentTopic, setCurrentTopic, data, setData }) {
	const [expand, setExpand] = useState(false);
	const [topics, setTopics] = useState([]);

	const getTopics = () => {
		console.log("hi");
		fetch(`http://localhost:3001/api/v1/topics/${Name}`)
			.then((response) => response.json())
			.then((myData) => {
				setTopics(myData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleExpand = () => {
		setExpand((prev) => !prev);
		getTopics();
	};

	return (
		<>
			<div className="category" onClick={() => handleExpand()}>
				<div className="expand">
					{expand ? (
						<>
							<ArrowDropDownIcon />
						</>
					) : (
						<ArrowRightIcon />
					)}
				</div>
				<div className="categoryName">{Name}</div>
			</div>
			{expand && (
				<div className="topicInCategory">
					{topics.map((topic) => {
						return (
							<Topic
								data={data}
								setData={setData}
								Name={topic.Name}
								currentTopic={currentTopic}
								setCurrentTopic={setCurrentTopic}
							/>
						);
					})}
				</div>
			)}
		</>
	);
}

export default Category;
