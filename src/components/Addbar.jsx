import React from "react";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddName from "./AddName";

function Addbar() {
	const [element, setElement] = useState("");
	const handleSelectElement = (e) => {
		setElement(e);
	};

	const [show, setShow] = useState(false);

	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<span
			href=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
		</span>
	));

	return (
		<div className="addbar">
			<div id="space"></div>
			<div className="addbarItem">
				<Dropdown
					onSelect={(e) => {
						handleSelectElement(e);
						setShow(true);
					}}
				>
					<Dropdown.Toggle as={CustomToggle}>
						<div className="addContainer">
							<AddIcon className="icon" />
							<span className="label">Neu</span>
							<ExpandMoreIcon className="expander" />
						</div>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item eventKey="Kategorie">Kategorie</Dropdown.Item>
						<Dropdown.Item eventKey="Thema">Thema</Dropdown.Item>
						<Dropdown.Item eventKey="Notiz">Notiz</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<AddName show={show} setShow={setShow} element={element} />
			</div>
		</div>
	);
}

export default Addbar;
