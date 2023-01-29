import { Services } from "./Services";

export class TemplateVariableManager {
    #nEntries = 1;
    #entries = new Map<string, string>();

    evaluate(index: number, name: string): string {
        return this.#entries.get(this.#buildId(index, name)) ?? "";
    }

    setValue(index: number, name: string, value: string): void {
        this.#entries.set(this.#buildId(index, name), value);
        Services.EventHandler.trigger("VariableValueUpdated", { variable: name, index, value });
    }

    addEntry(): void {
        this.#nEntries++;
        Services.EventHandler.trigger("EntriesUpdated", { nEntries: this.#nEntries });
    }

    setNEntries(nEntries: number): void {
        this.#nEntries = nEntries;
        Services.EventHandler.trigger("EntriesUpdated", { nEntries: this.#nEntries });
    }

    get nEntries() {
        return this.#nEntries;
    }

    #buildId(index: number, name: string): string {
        return `${index}.${name}`;
    }
}
