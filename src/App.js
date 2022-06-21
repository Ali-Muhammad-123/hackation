import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import EditComponent from "./components/editComponent";

function App() {
	const [allStudents, setAllStudents] = useState([]);
	const [allHeads, setAllHeads] = useState([]);
	const [allMarks, setAllMarks] = useState([]);
	const [allGrades, setAllGrades] = useState([]);
	const [selected, setSelected] = useState(null);
	const [shouldUpdate, setShouldUpdate] = useState(false);
	var i = 0;
	var hundPer = 0;

	useEffect(() => {
		async function fetchStudents() {
			const allStds = await axios({
				method: "GET",
				url: "http://localhost:3001/students",
			});
			setAllStudents(allStds.data);
			console.log(allStds);
		}
		fetchStudents();

		async function fetchHeads() {
			const allHds = await axios({
				method: "GET",
				url: "http://localhost:3001/heads",
			});
			setAllHeads(allHds.data);
			console.log(allHds);
		}
		fetchHeads();

		async function fetchMarks() {
			const allMks = await axios({
				method: "GET",
				url: "http://localhost:3001/marks",
			});
			setAllMarks(allMks.data);
			console.log(allMks);
		}
		fetchMarks();

		async function fetchGrades() {
			const all = await axios({
				method: "GET",
				url: "http://localhost:3001/grades",
			});
			setAllGrades(all.data);
			console.log(all);
		}
		fetchGrades();
	}, [shouldUpdate]);

	return (
		<div style={{ display: "flex", gap: "30px" }}>
			<div>
				<table className="main-table">
					<tr>
						<th>S#</th>
						<th>Name</th>
						<th>Reg. #</th>

						{allHeads.map((el) => (
							<th>{el.headname}</th>
						))}

						<th>Total</th>
						<th>100%</th>
						<th>Grade</th>
					</tr>
					{allStudents.length > 0 &&
						allStudents.map((el) => (
							<tr className="individual_rows" onClick={() => setSelected(el)}>
								<td>{(i += 1)}</td>
								<td>{el.name}</td>
								<td>{el.regno}</td>
								{allHeads.map((ele) => (
									<td>
										{allMarks.find(
											(elem) => ele.hid === elem.hid && elem.regno === el.regno
										)
											? allMarks.find(
													(elem) =>
														ele.hid === elem.hid && elem.regno === el.regno
											  ).marks
											: 0}
									</td>
								))}
								<td>
									{allMarks
										.filter((ele) => ele.regno === el.regno)
										.reduce((a, b) => a + b.marks, 0)}
								</td>

								<td>
									{
										(hundPer = Math.round(
											allMarks
												.filter((ele) => ele.regno === el.regno)
												.reduce((a, b) => a + b.marks, 0)
										))
									}
								</td>
								<td>
									{allGrades.find(
										(el) => el.start <= hundPer && el.end >= hundPer
									)
										? allGrades.find(
												(el) => el.start <= hundPer && el.end >= hundPer
										  ).grade
										: ""}
								</td>
							</tr>
						))}
				</table>
			</div>
			{selected !== null ? (
				<EditComponent
					Name={selected.name}
					Regno={selected.regno}
					Heads={allHeads}
					AllMarks={allMarks}
					AllGrades={allGrades}
					setShouldUpdate={setShouldUpdate}
					ShouldUpdate={shouldUpdate}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default App;
