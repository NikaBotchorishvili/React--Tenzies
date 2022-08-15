import React, { useEffect, useState } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Timer from "./Timer";

export default function Tenzies() {
	const [dice, setDice] = useState(generateRandomDices());
	const [tenzies, setTenzies] = useState(false);
	const [winsCounter, setWinsCounter] = useState(0);

	useEffect(() => {
		const firstValue = dice[0].value;
		const allDiceHeld = dice.every((d) => d.isHeld);
		const allValuesSame = dice.every((d) => d.value == firstValue);

		if (allDiceHeld && allValuesSame) {
			setTenzies(true);
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
		if (tenzies) {
			setTenzies(false);
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

	const { width, height } = useWindowSize();

	return (
		<>
			{/* <Timer/> */}
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
						{tenzies ? "Start over" : "Role"}
					</button>
					{tenzies && (
						<Confetti height={height} width={width} numberOfPieces={400} />
					)}
				</div>
			</main>
		</>
	);
}
