import { Services } from "./Services";

export class TextReader {
    #fileReader = new FileReader();

    constructor() {
        this.#fileReader.addEventListener("load", (event) => {
            const result = event.target?.result;
            if (typeof result === "string") {
                Services.TemplateProcessor.setTemplate(result);
            }
        });
    }

    readFile(file: File): void {
        this.#fileReader.readAsText(file);
    }
}