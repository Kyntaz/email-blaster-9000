import { EmailSender } from "./EmailSender";
import { EventHandler } from "./EventHandler";
import { TemplateProcessor } from "./TemplateProcessor";
import { TemplateVariableManager } from "./TemplateVariableManager";

export const Services = {
    EventHandler: new EventHandler(),
    TemplateProcessor: new TemplateProcessor(),
    TemplateVariableManager: new TemplateVariableManager(),
    EmailSender: new EmailSender(),
}
