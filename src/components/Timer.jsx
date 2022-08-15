import React, { useState, useEffect } from "react";

export default function Timer() {
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);


	let timer;
	useEffect(() => {
		timer = setInterval(() => {
			setSeconds((prevSeconds) => prevSeconds + 1);

			if (seconds === 59) {
				setMinutes((prevMinutes) => prevMinutes + 1);
				setSeconds(0);
			}
		}, 1000);
		return () => clearInterval(timer);
	});

	return (
		<div className="counter">
			<div className="counter-container">
				<div>{minutes < 10 ? "0" + minutes : minutes}</div>

				<div>:</div>

				<div>{seconds < 10 ? "0" + seconds : seconds}</div>
			</div>
		</div>
	);
}
