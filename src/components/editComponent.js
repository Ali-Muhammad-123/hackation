import React, { useEffect, useState } from "react";
import axios from "axios";
function EditComponent(props) {
	var i = 1;
	var hundPer = 0;
	const [inpMark, setInpMark] = useState(null);
	const [inpMark1, setInpMark1] = useState(null);
	const [inpMark2, setInpMark2] = useState(null);
	const [inpMark3, setInpMark3] = useState(null);
	const [inpMark4, setInpMark4] = useState(null);
	const [inpMark5, setInpMark5] = useState(null);
	const [inpMark6, setInpMark6] = useState(null);
	const [inpMark7, setInpMark7] = useState(null);
	const arrSets = [
		{ stateName: inpMark, stateSet: setInpMark },
		{ stateName: inpMark1, stateSet: setInpMark1 },
		{ stateName: inpMark2, stateSet: setInpMark2 },
		{ stateName: inpMark3, stateSet: setInpMark3 },
		{ stateName: inpMark4, stateSet: setInpMark4 },
		{ stateName: inpMark5, stateSet: setInpMark5 },
		{ stateName: inpMark6, stateSet: setInpMark6 },
		{ stateName: inpMark7, stateSet: setInpMark7 },
	];
	const [error, setError] = useState(null);

	function changeFun(setStateInp, hName, max, val, marksId) {
		if (val <= max) {
			setStateInp(val);
			setError(null);
			console.log(inpMark);
			axios({
				method: "POST",
				url: "http://localhost:3001/updateRecord",
				data: { IdChange: marksId, markChange: val },
			}).then((el) => props.setShouldUpdate(!props.ShouldUpdate));
		} else {
			setStateInp(max);
			setError(`${hName} marks should be between 0 and ${max}`);
			axios({
				method: "POST",
				url: "http://localhost:3001/updateRecord",
				data: { IdChange: marksId, markChange: max },
			}).then((el) => props.setShouldUpdate(!props.ShouldUpdate));
		}
	}
	return (
		<div>
			<table className="main-table">
				<tr>
					<th>Reg #:</th>
					<td>{props.Regno}</td>
				</tr>
				<tr>
					<th>Name :</th>
					<td>{props.Name}</td>
				</tr>
			</table>
			<p style={{ color: "red" }}>{error}</p>
			<table className="main-table">
				<tr>
					<th>#</th>
					<th>Heads</th>
					<th>Total</th>
					<th>Marks</th>
				</tr>
				{props.Heads.map((el, index) => (
					<tr>
						<td>{i++}</td>
						<td>{el.headname}</td>
						<td>{el.total}</td>
						<td>
							<input
								value={
									arrSets[index].stateName === null
										? props.AllMarks.find(
												(elem) =>
													el.hid === elem.hid && elem.regno === props.Regno
										  ).marks
										: arrSets[index].stateName
								}
								onChange={(e) =>
									changeFun(
										arrSets[index].stateSet,
										el.headname,
										el.total,
										e.target.value,
										props.AllMarks.find(
											(elem) =>
												el.hid === elem.hid && elem.regno === props.Regno
										).mid
									)
								}
							/>
						</td>
					</tr>
				))}
				<tr>
					<th colSpan={3}>Total</th>
					<td>
						{props.AllMarks.filter((ele) => ele.regno === props.Regno).reduce(
							(a, b) => a + b.marks,
							0
						)}
					</td>
				</tr>
				<tr>
					<th colSpan={3}>100%</th>
					<td>
						{
							(hundPer = Math.round(
								props.AllMarks.filter(
									(ele) => ele.regno === props.Regno
								).reduce((a, b) => a + b.marks, 0)
							))
						}
					</td>
				</tr>
				<tr>
					<th colSpan={3}>Grade</th>
					<td>
						{props.AllGrades.find(
							(el) => el.start <= hundPer && el.end >= hundPer
						)
							? props.AllGrades.find(
									(el) => el.start <= hundPer && el.end >= hundPer
							  ).grade
							: ""}
					</td>
				</tr>
			</table>
		</div>
	);
}

export default EditComponent;
