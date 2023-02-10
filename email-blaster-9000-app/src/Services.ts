import { EmailSender } from "./EmailSender";
import { EventHandler } from "./EventHandler";
import { ExcelReader } from "./ExcelReader";
import { TemplateProcessor } from "./TemplateProcessor";
import { TemplateVariableManager } from "./TemplateVariableManager";
import { TextReader } from "./TextReader";

export const Services = {
    EventHandler: new EventHandler(),
    TemplateProcessor: new TemplateProcessor(),
    TemplateVariableManager: new TemplateVariableManager(),
    EmailSender: new EmailSender(),
    ExcelReader: new ExcelReader(),
    TextReader: new TextReader(),
}
