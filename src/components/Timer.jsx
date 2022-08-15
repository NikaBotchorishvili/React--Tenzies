import React, { useState, useEffect } from "react";

export default function Timer(props) {
	const { won, handleHighscore } = props;
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [scoreTime, setScoreTime] = useState(0);

	let timer;
	useEffect(() => {
		if (!won) {
			timer = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds + 1);
				setScoreTime((prevHighscoreTime) => prevHighscoreTime + 1);

				if (seconds === 59) {
					setMinutes((prevMinutes) => prevMinutes + 1);
					setSeconds(0);
				}
			}, 1000);
			console.log(won)
		} else {
			console.log(won);
			handleHighscore(scoreTime);
			setSeconds(0);
			setMinutes(0);
			setScoreTime(0);
		}

		return () => clearInterval(timer);
	}, [seconds, minutes, scoreTime, won]);

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
