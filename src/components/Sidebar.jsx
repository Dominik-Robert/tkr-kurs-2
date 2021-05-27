import React from "react";
import Category from "./Category";
import { useState, useEffect } from "react";
import Topic from "./Topic";

function Sidebar({
	categories,
	setCategories,
	currentTopic,
	setCurrentTopic,
	data,
	setData,
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
					if (category.Name != null) {
						console.log(category.Name);
						return (
							<Category
								data={data}
								setData={setData}
								Name={category.Name}
								currentTopic={currentTopic}
								setCurrentTopic={setCurrentTopic}
							/>
						);
					}
				})}
			</div>
			<div className="sidebarBottom"></div>
		</div>
	);
}

export default Sidebar;
