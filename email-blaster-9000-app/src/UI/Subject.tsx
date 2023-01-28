import { Services } from "../Services";

export function Subject() {
    return (
        <div>
            <span>Subject:</span>
            <input onChange={(event) => {
                Services.TemplateProcessor.setSubject(event.target.value);
            }} />
        </div>
    );
}
