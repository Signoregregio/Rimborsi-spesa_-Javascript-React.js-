export default function EditableRow({handleEditFormChange, editFormData, handleCancelClick, row}){
    return(
        <tr >
            <td>
                <input type="text" required="required" placeholder="Enter a date..." name="date" value={editFormData.dateRefund} onChange={handleEditFormChange}/>               
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter a type..." name="type" value={editFormData.type} onChange={handleEditFormChange}/>               
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter an amount..." name="amount" value={editFormData.amount} onChange={handleEditFormChange}/>               
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter ticket..." name="ticket" value={editFormData.ticket} onChange={handleEditFormChange}/>               
            </td>
            <td>
                Loading...            
            </td>
            <td>
                Loading...              
            </td>
            <td>
                <button className="editButton" type="submit">Save</button>
                <button className="editButton" type="button" onClick={() => handleCancelClick()}>Cancel</button>
            </td>
        </tr>
    )
}