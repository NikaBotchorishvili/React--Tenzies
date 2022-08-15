import React, { useEffect, useState } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Timer from "./Timer";

export default function Tenzies() {
	const [dice, setDice] = useState(generateRandomDices());
	const [won, setWon] = useState(false);
	const [winsCounter, setWinsCounter] = useState(0);
	const [scores, setScores] = useState([]);
	const [highscore, setHighscore] = useState();

	useEffect(() => {
		const firstValue = dice[0].value;
		const allDiceHeld = dice.every((d) => d.isHeld);
		const allValuesSame = dice.every((d) => d.value == firstValue);

		if (allDiceHeld && allValuesSame) {
			setWon(true);
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
		if (won) {
			setWon(false);
			setDice(generateRandomDices());
			setWinsCounter((prevWinsCounter) => prevWinsCounter + 1);
		} else {
			setDice((prevDice) =>
				prevDice.map((dice) => {
					return dice.isHeld
						? dice
						: { ...dice, value: Math.ceil(Math.random() * 6) };
				})
			);
		}
	}

	function holdDice(event, key) {
		setDice((prevDice) =>
			prevDice.map((dice) => {
				return key == dice.id ? { ...dice, isHeld: !dice.isHeld } : dice;
			})
		);
	}

	function handleScores(score) {
		// const newScore = {
		// 	score: score,
		// };

		setScores((prevHighscores) => [...prevHighscores, score]);
		console.log(scores);
		getHighscore();
	}

	const { width, height } = useWindowSize();

	function getHighscore() {
		let maxValue = scores[0]
		setHighscore(() => {
			for (let i = 0; i < scores.length; i++) {
				if (scores[i] > maxValue) {
					maxValue = scores[i];
				}
				console.log(maxValue)
			}
			return maxValue;
		});
	}

	return (
		<>
			<Timer won={won} handleHighscore={handleScores} />
			{highscore && <h2>{highscore}</h2>}
			<main className="tenzies">
				<h1 className="wins-counter">
					You have {winsCounter} {winsCounter < 2 ? "win" : "wins"}, Good Job!
				</h1>
				<div className="container">
					<h1 className="title">Tenzies</h1>
					<small className="description">
						Roll until all dice are the same. Click each die to freeze it at its
						current value between rolls.
					</small>

					<div className="dice-container">{DiceElements}</div>
					<button onClick={roll} className="roll-btn">
						{won ? "Start over" : "Role"}
					</button>
					{won && (
						<Confetti height={height} width={width} numberOfPieces={400} />
					)}
				</div>
			</main>
		</>
	);
}
