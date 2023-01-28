import { Services } from "./Services";

export class TemplateProcessor {
    #variableRegex = /\$\{(?<name>\w+)\}/g
    #template = "";
    #subject = "";

    setTemplate(template: string): void {
        this.#template = template;
        this.#updateVariables();
    }

    setSubject(subject: string): void {
        this.#subject = subject;
        this.#updateVariables();
    }

    renderTemplate(index: number): string {
        return this.#render(index, this.#template);
    }

    renderSubject(index: number): string {
        return this.#render(index, this.#subject);
    }

    #updateVariables(): void {
        const templateVariables = this.#getVariables(this.#template);
        const subjectVariables = this.#getVariables(this.#subject);
        Services.EventHandler.trigger("VariablesUpdated", {
            variables: this.#combineVariables(templateVariables, subjectVariables),
        });
    }

    #getVariables(template: string): string[] {
        const matches = [...template.matchAll(this.#variableRegex)];

        const variables = matches.flatMap((match) => {
            const name = match.groups?.["name"];
            return name ? [name] : [];
        });

        return variables;
    }

    #combineVariables(...args: string[][]): string[] {
        return [...new Set(args.flat())]
    }

    #render(index: number, template: string): string {
        return template.replaceAll(
            this.#variableRegex,
            (_, name) => Services.TemplateVariableManager.evaluate(index, name),
        );
    }
}
