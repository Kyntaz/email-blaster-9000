import { Services } from "../Services";

export function Subject() {
    return (
        <div>
            <input className="form-control my-1" placeholder="Subject" onChange={(event) => {
                Services.TemplateProcessor.setSubject(event.target.value);
            }} />
        </div>
    );
}
