import { Services } from "../Services";

export function Template() {
    return (
        <>
            <textarea
                className="form-control my-1"
                placeholder="Body Template"
                onChange={(event) => {
                    Services.TemplateProcessor.setTemplate(event.target.value);
                }}
            />
        </>
    );
}
