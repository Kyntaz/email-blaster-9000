import readXlsxFile from "read-excel-file";
import { Services } from "./Services";

export class ExcelReader {
    async readFile(file: File): Promise<void>  {
        const [header, ...entries] = await readXlsxFile(file);
        Services.TemplateVariableManager.setNEntries(entries.length);

        for (const [i, entry] of entries.entries()) {
            for (const [j, cell] of entry.entries()) {
                const name = header[j].toString();
                const value = cell.toString();
                Services.TemplateVariableManager.setValue(i, name, value);
            }
        }
    }
}
