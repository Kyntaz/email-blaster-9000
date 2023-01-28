import { Services } from "../Services"

export function AddEntry() {
    return (
        <button onClick={() => {
            Services.TemplateVariableManager.addEntry();
        }}>Add Entry</button>
    )
}
