import { Services } from "./Services";

export class EmailSender {
    #currentIndex = 0;
    #sending = false;

    constructor() {
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible" && this.#sending) {
                this.#sendEmail();
            }
        });
    }

    startSending() {
        this.#currentIndex = 0;
        this.#sending = true;

        this.#sendEmail();
    }

    #sendEmail() {
        const subject = Services.TemplateProcessor.renderSubject(this.#currentIndex);
        const body = Services.TemplateProcessor.renderTemplate(this.#currentIndex);
        const email = Services.TemplateVariableManager.evaluate(this.#currentIndex, "email");

        this.#currentIndex++;
        if (this.#currentIndex >= Services.TemplateVariableManager.nEntries) {
            this.#sending = false;
        }
        window.open(this.#renderEmailLink(email, subject, body), "_blank");
    }

    #renderEmailLink(email: string, subject: string, body: string) {
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);

        return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
    }
}
