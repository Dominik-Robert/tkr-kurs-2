import React from "react";
import { useEffect } from "react";
import NoteElement from "./NoteElement";

import TocIcon from "@material-ui/icons/Toc";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

import { Button } from "@material-ui/core";

function Explorer({ data, setData, currentTopic, setCurrentTopic }) {
	useEffect(() => {
		fetch(`http://localhost:3001/api/v1/notes/inTopic/${currentTopic}`)
			.then((response) => response.json())
			.then((myData) => {
				console.log(data);
				setData(myData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const reloadNotes = () => {
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

	return (
		<div className="explorer">
			<div className="rowAbove">
				<div className="secName">{currentTopic}</div>
				<div className="viewOption">
					<Button id="btn" variant="contained" color="primary" disableElevation>
						<TocIcon />
					</Button>
					<Button variant="contained" color="primary" disableElevation>
						<DragIndicatorIcon />
					</Button>
				</div>
			</div>

			<div className="elementSection">
				<div className="legendWrapper">
					<div className="name legendElement">Name</div>
					<div className="lastChanged legendElement">letzte Änderung</div>
					<div className="created legendElement">Erstellt</div>
					<div className="empty"></div>
				</div>
				{console.log(data)}
				{data
					.slice(0)
					.reverse()
					.map((note) => {
						return (
							<NoteElement
								reload={reloadNotes}
								id={note.NotizID}
								name={note.Titel}
								lastChanged={note.LetzteAenderung}
								created={note.Erstellung}
							/>
						);
					})}
				<div className="bottomExplore">
					<p className="btm"></p>
				</div>
			</div>
		</div>
	);
}

export default Explorer;
