import React from "react";
import Category from "./Category";
import { useEffect } from "react";

function Sidebar({
	categories,
	setCategories,
	currentTopic,
	setCurrentTopic,
	data,
	setData,
	topics,
	setTopics,
}) {
	useEffect(() => {
		fetch("http://localhost:3001/api/v1/categories")
			.then((response) => response.json())
			.then((myData) => {
				setCategories(myData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebarTop"></div>
			<div className="sidebarElements">
				{categories.map((category) => {
					return (
						<Category
							topics={topics}
							setTopics={setTopics}
							data={data}
							setData={setData}
							Name={category.Name}
							currentTopic={currentTopic}
							setCurrentTopic={setCurrentTopic}
						/>
					);
				})}
				{/* <h4>Login</h4> */}
			</div>
			<div className="sidebarBottom"></div>
		</div>
	);
}

export default Sidebar;
