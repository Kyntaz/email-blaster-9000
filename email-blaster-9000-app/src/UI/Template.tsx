import { Services } from "../Services";

export function Template() {
    return (
        <textarea onChange={(event) => {
            Services.TemplateProcessor.setTemplate(event.target.value);
        }} />
    );
}
