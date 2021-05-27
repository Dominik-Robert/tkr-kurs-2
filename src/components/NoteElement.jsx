import React from "react";
import { useState } from "react";

import { Form, FormControl, FormGroup, Button } from "react-bootstrap";

import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";

function NoteElement({ reload, id, name, lastChanged, created }) {
	const [showHover, setShowHover] = useState(false);
	const [newVal, setNewVal] = useState("");
	const [editName, setEditName] = useState(false);

	const months = [
		"Jan",
		"Feb",
		"Mär",
		"Apr",
		"Mai",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Okt",
		"Nov",
		"Dez",
	];

	const sendDeleteReq = () => {
		fetch("http://localhost:3001/api/v1/notes/" + id, {
			method: "DELETE",
		}).then(() => {
			reload();
		});
	};

	const updateName = (option) => {
		fetch(`http://localhost:3001/api/v1/note/${id}/${option}/${newVal}`, {
			method: "PUT",
		}).then(() => {
			reload();
		});
	};

	const correctDates = (stamp) => {
		let splittedDate = stamp.split(".");

		return (
			splittedDate[0] +
			" " +
			months[parseInt(splittedDate[1])] +
			". " +
			splittedDate[2]
		);
	};

	return (
		<div
			className="noteWrapper"
			onMouseEnter={() => setShowHover(true)}
			onMouseLeave={() => setShowHover(false)}
		>
			{showHover && (
				<div className="delete" onClick={() => sendDeleteReq()}>
					<ClearIcon className="deleteIcon" />
				</div>
			)}
			{showHover && (
				<div
					className="edit"
					onClick={(e) => {
						setEditName(true);
					}}
				>
					<EditIcon />
				</div>
			)}

			<div className="name row">
				{editName ? (
					<Form
						className="formFlex"
						onSubmit={(e) => {
							e.preventDefault();
							updateName("Titel");
							setNewVal("");
							setEditName(false);
							setTimeout(() => {
								reload();
							}, 200);
						}}
					>
						<FormGroup className="formFlex">
							<FormControl
								autoFocus
								placeholder="Name"
								className="nameInputInElement"
								aria-label="Small"
								aria-describedby="inputGroup-sizing-sm"
								onChange={(e) => setNewVal(e.target.value)}
							/>
							<Button type="submit" className="nonSubmit"></Button>
						</FormGroup>
					</Form>
				) : (
					name
				)}
			</div>
			<div className="lastChanged row">
				{correctDates(lastChanged.toString())}
			</div>
			<div className="created row">{correctDates(created.toString())}</div>
			<div className="empty row"></div>
		</div>
	);
}

export default NoteElement;
