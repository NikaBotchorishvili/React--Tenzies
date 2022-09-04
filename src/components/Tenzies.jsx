import React, { useEffect, useState } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Timer from "./Timer";
import { ScoresContext } from "./App";

export default function Tenzies() {
	const [dice, setDice] = useState(generateRandomDices());
	const [won, setWon] = useState(false);
	const [winsCounter, setWinsCounter] = useState(0);
	const [highscore, setHighscore] = useState();
	const [totalRolls, setTotalRolls] = useState(0);
	const [scoreTime, setScoreTime] = useState(0);
	const [scores, setScores] = React.useContext(ScoresContext);

	useEffect(() => {
		const firstValue = dice[0].value;
		const allDiceHeld = dice.every((d) => d.isHeld);
		const allValuesSame = dice.every((d) => d.value == firstValue);

		if (allDiceHeld && allValuesSame) {
			setWon(true);
			setScores((prevScores) => [...prevScores, scoreTime]);
			setWinsCounter((prevWinsCounter) => prevWinsCounter + 1);
		}
	}, [dice]);

	function generateRandomDices() {
		const newDices = [];
		for (let i = 0; i < 10; i++) {
			const randomValue = Math.ceil(Math.random() * 6);

			newDices.push({
				value: randomValue,
				isHeld: false,
				id: nanoid(),
			});
		}

		return newDices;
	}

	const DiceElements = dice.map((d) => {
		return (
			<Dice
				value={d.value}
				isHeld={d.isHeld}
				key={d.id}
				id={d.id}
				onClick={holdDice}
			/>
		);
	});

	function roll() {
		setDice((prevDice) =>
			prevDice.map((dice) => {
				return dice.isHeld
					? dice
					: { ...dice, value: Math.ceil(Math.random() * 6) };
			})
		);

		setTotalRolls((prevTotalRolls) => prevTotalRolls + 1);
	}

	function holdDice(event, key) {
		setDice((prevDice) =>
			prevDice.map((dice) => {
				return key == dice.id ? { ...dice, isHeld: !dice.isHeld } : dice;
			})
		);
	}

	function playAgain() {
		setWon(false);
		setDice(generateRandomDices);
		getHighscore();
	}
	const { width, height } = useWindowSize();

	function getHighscore() {
		setHighscore(() => {
			return scores.length == 1 ? scores[0] : Math.min(...scores);
		});
	}
	const winCounterMessage =
		winsCounter == 0 ? (
			<h1 className="wins-counter">No wins</h1>
		) : (
			<h1 className="wins-counter">
				You have {winsCounter} {winsCounter < 2 ? "win" : "wins"}, Good Job!
			</h1>
		);
	return (
		<>
			<Timer won={won} setScoreTime={setScoreTime} />
			<div className="info">
				{highscore && (
					<h2>
						Highscore: <span className="info-colored">{highscore}</span> seconds
					</h2>
				)}

				<h2>
					Total Rolls: <span className="info-colored">{totalRolls}</span>
				</h2>
			</div>
			<main className="tenzies">
				<h2 className="wins-counter">{winCounterMessage}</h2>
				<div className="container">
					<h1 className="title">Tenzies</h1>
					<small className="description">
						Roll until all dice are the same. Click each die to freeze it at its
						current value between rolls.
					</small>

					<div className="dice-container">{DiceElements}</div>
					{!won ? (
						<button onClick={roll} className="roll-btn">
							Roll
						</button>
					) : (
						<button className="roll-btn" onClick={playAgain}>
							Play again
						</button>
					)}
					{won && (
						<Confetti height={height} width={width} numberOfPieces={400} />
					)}
				</div>
			</main>
		</>
	);
}