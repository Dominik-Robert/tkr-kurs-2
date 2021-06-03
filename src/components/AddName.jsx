import {
	Form,
	FormControl,
	FormLabel,
	FormGroup,
	Modal,
	Button,
} from "react-bootstrap";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";

function AddName({
	show,
	setShow,
	element,
	data,
	setData,
	categories,
	setCategories,
	topics,
	setTopics,
	currentTopic,
	setCurrentTopic,
}) {
	const [title, setTitle] = useState("");
	const [inCategory, setInCategory] = useState("");

	let first = true;

	const handleSubmit = () => {
		if (element === "Notiz") {
			createNote();
		} else if (element === "Kategorie") {
			createCategory();
		} else if (element === "Thema") {
			createTopic();
		}
	};

	const createNote = () => {
		fetch("http://localhost:3001/api/v1/notes", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: title, themenName: currentTopic }),
		}).then(() => {
			console.log("new note created");
		});
	};

	const updateNote = () => {
		fetch(`http://localhost:3001/api/v1/notes/inTopic/${currentTopic}`)
			.then((response) => response.json())
			.then((myData) => {
				console.log(data);
				setData(myData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const createCategory = () => {
		fetch("http://localhost:3001/api/v1/categories", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: title }),
		}).then(() => {
			console.log("new Category created");
		});
	};

	const updateCategory = () => {
		fetch("http://localhost:3001/api/v1/categories")
			.then((response) => response.json())
			.then((myData) => {
				console.log(data);
				setCategories(myData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const createTopic = () => {
		fetch("http://localhost:3001/api/v1/topics", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: title, categoryName: inCategory }),
		}).then(() => {
			console.log("new Topic created");
		});
	};

	const updateTopic = () => {
		fetch("http://localhost:3001/api/v1/topics")
			.then((response) => response.json())
			.then((myData) => {
				console.log(data);
				setTopics(myData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateData = () => {
		if (element === "Notiz") {
			updateNote();
		} else if (element === "Kategorie") {
			updateCategory();
		} else if (element === "Thema") {
			updateTopic();
		}
	};

	return (
		<div>
			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header className="modalHeader">
					<Modal.Title className="modalTitle">
						<div className="modalTitleLine">
							<div id="titleContainer">
								<span id="title">{element}</span>
							</div>
							<div id="modalCloseContainer">
								<CloseIcon id="modalClose" onClick={() => setShow(false)} />
							</div>
						</div>
					</Modal.Title>
					<Modal.Title className="modalTitle"></Modal.Title>
					<Modal.Body>
						<Form
							onSubmit={(e) => {
								e.preventDefault();
								if (title.trim().length) {
									setTitle(title.trim());
									handleSubmit();
									setTimeout(() => {
										setTitle("");
										setShow(false);
										setTimeout(() => {
											updateData();
										}, 200);
									}, 100);
								}
							}}
						>
							<FormGroup>
								<FormControl
									autoFocus
									placeholder="Name"
									className="nameInput"
									aria-label="Small"
									aria-describedby="inputGroup-sizing-sm"
									onChange={(e) => setTitle(e.target.value)}
								/>
								<Button type="submit" className="nonSubmit"></Button>
							</FormGroup>
							{element === "Thema" && (
								<FormGroup controlId="exampleForm.ControlSelect1">
									<FormLabel>Kategorie: </FormLabel>
									<FormControl
										as="select"
										onChange={(e) => setInCategory(e.target.value)}
									>
										{categories.map((category) => {
											return <option>{category.Name}</option>;
										})}
										{first
											? () => {
													setInCategory("hallo");
													console.log(inCategory);
													first = false;
											  }
											: ""}
									</FormControl>
								</FormGroup>
							)}
						</Form>
					</Modal.Body>
				</Modal.Header>
			</Modal>
		</div>
	);
}

export default AddName;
