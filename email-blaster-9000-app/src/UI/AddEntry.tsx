import { Services } from "../Services"

export function AddEntry() {
    return (
        <button className="btn btn-primary m-1" onClick={() => {
            Services.TemplateVariableManager.addEntry();
        }}>➕ Add Entry</button>
    )
}
