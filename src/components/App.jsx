import { createContext, useState } from "react";
import Tenzies from "./Tenzies";

export const ScoresContext = createContext();
function App() {
	const [score, setScore] = useState([]);
	return (
		<ScoresContext.Provider value={[score, setScore]}>
			<Tenzies />
		</ScoresContext.Provider>
	);
}

export default App;
