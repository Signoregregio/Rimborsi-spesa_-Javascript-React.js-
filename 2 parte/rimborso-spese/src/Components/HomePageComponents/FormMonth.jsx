import "./homePage.css";

export default function FormMonth() {
	function doSomething(event) {
		console.log(event);
	}
	return (
		<div className="container">
			<div className="divFormMonth">
				<h2> Scegli il mese </h2>
				<form onSubmit={doSomething}>
					<div className="formbox divInputMonth">
						<input type="month" className="inputMonth"></input>
					</div>
					<button type="submit"> Confirm</button>
				</form>
			</div>
		</div>
	);
}
