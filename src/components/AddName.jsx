import { Form, FormControl, FormGroup, Modal, Button } from "react-bootstrap";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

function AddName({ show, setShow, element }) {
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
							}}
						>
							<FormGroup>
								<FormControl
									placeholder="Name"
									className="nameInput"
									aria-label="Small"
									aria-describedby="inputGroup-sizing-sm"
								/>
								<Button type="submit" className="nonSubmit"></Button>
							</FormGroup>
						</Form>
					</Modal.Body>
				</Modal.Header>
			</Modal>
		</div>
	);
}

export default AddName;
