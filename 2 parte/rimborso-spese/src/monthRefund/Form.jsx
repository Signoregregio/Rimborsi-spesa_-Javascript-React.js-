import { useForm } from "react-hook-form";
import dayjs from "dayjs";

export default function Form() {
	const { register, errors, handleSubmit } = useForm();

	return (
		<form onSubmit={handleSubmit((data) => console.log(data))}>
			<h1>Nuovo rimborso</h1>
			<div className="formBox">
				<label>Mese :</label>
				<input name="mese" type="month" {...register("test", { required: true })} max={dayjs().format("YYYY-MM")} />
                {errors.mese && "Required"}
			</div>

			<div className="formBox">
				<label>Tipo:</label>
				<select name="Tipo" {...register("test", { required: true })}>
					<option value="" defaultValue={"Inserire il tipo"} disabled>
						Inserire il tipo
					</option>
					<option value="Taxi">Taxi</option>
					<option value="Vitto">Vitto</option>
					<option value="Hotel">Hotel</option>
					<option value="Treno">Treno</option>
				</select>
			</div>

			<div className="formBox">
				<label>Data:</label>
				<input type="date" name="Data" {...register("test", { required: true })} max={dayjs().format("YYYY-MM-DD")} />
			</div>

			<div className="formBox">
				<label>Importo richiesto:</label>
				<input
					name="Importo"
					{...register("test", { required: true, pattern: /^[+]?\d+(\.\d{1,2})?$/})}
				/>
			</div>

			<div className="formBox">
				<label>Ricevuta?</label>
				<input type="checkbox" name="Ricevuta" {...register("value_name")} />
			</div>
			<input type="submit" />
		</form>
	);
}
