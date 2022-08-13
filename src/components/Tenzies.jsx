import React from "react";

export default function Tenzies() {
	return (
		<main className="tenzies">
			<div className="container">
				<h1 className="title">Tenzies</h1>
				<small className="description">
					Roll until all dice are the same. Click each die to freeze it at its
					current value between rolls.
				</small>

				<div className="dice-container">
					<div className="first-row flex">
						<div className="dice dice-active">1</div>
						<div className="dice">1</div>
						<div className="dice">1</div>
						<div className="dice">1</div>
						<div className="dice">1</div>
					</div>

					<div className="second-row flex">
						<div className="dice">1</div>
						<div className="dice">1</div>
						<div className="dice">1</div>
						<div className="dice">1</div>
						<div className="dice">1</div>
					</div>
				</div>
                <button className="roll-btn">Roll</button>
			</div>
		</main>
	);
}
