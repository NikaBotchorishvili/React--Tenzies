import React from "react";

export default function Dice(props) {
	const { value, isHeld, id, onClick } = props;

    const styles = {
        backgroundColor: isHeld ? "#59E391": "white"
    }
	return (
        <div style={styles} onClick={(event) => onClick(event, id)} className="dice"><h3 className="dice-num ">{ value }</h3></div>
    )
}
