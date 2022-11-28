import Form from "./formRefund/Form";
import TableRefund from "./Table/TableRefund";
import { useState } from "react";

export default function RefundPage() {
	return (
		<div className="container">
			<div className="left">
				<Form></Form>
			</div>
			<div>
				<TableRefund></TableRefund>
			</div>
		</div>
	);
}
