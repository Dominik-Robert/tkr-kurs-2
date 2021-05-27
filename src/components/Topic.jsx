import React from "react";

function Topic({ Name, currentTopic, setCurrentTopic, data, setData }) {
	const updateNote = () => {
		fetch(`http://localhost:3001/api/v1/notes/inTopic/${Name}`)
			.then((response) => response.json())
			.then((myData) => {
				console.log(data);
				setData(myData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleClick = () => {
		setCurrentTopic(Name);
		updateNote();
	};

	return (
		<div className="topic" onClick={() => handleClick()}>
			<div className="topicName">{Name}</div>
			<div className="numberNotes"></div>
		</div>
	);
}

export default Topic;
