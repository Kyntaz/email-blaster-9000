import { Services } from "./Services";

function renderEmailLink(email: string, subject: string, body: string) {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
}

function openWindow(url?: string): Window | null {
    return window.open(url, "_blank");
}

type EmailMechanism = {
    reset: () => void;
    sendEmail: () => void;
    isSending: () => boolean;
}

class BasicEmailMechanism implements EmailMechanism {
    #sending = false;
    #currentIndex = 0;

    reset() {
        this.#sending = true;
        this.#currentIndex = 0;
    }

    sendEmail(): void {
        const subject = Services.TemplateProcessor.renderSubject(this.#currentIndex);
        const body = Services.TemplateProcessor.renderTemplate(this.#currentIndex);
        const email = Services.TemplateVariableManager.evaluate(this.#currentIndex, "email");

        this.#currentIndex++;
        if (this.#currentIndex >= Services.TemplateVariableManager.nEntries) {
            this.#sending = false;
        }
        openWindow(renderEmailLink(email, subject, body));
    }

    isSending(): boolean {
        return this.#sending;
    }
}

class HTMLEmailMechanism implements EmailMechanism {
    #sending = false;
    #currentIndex = 0;
    #lastShown: "body" | "email" | "none" = "none";

    reset(): void {
        this.#sending = true;
        this.#currentIndex = 0;
        this.#lastShown = "none";
    }

    sendEmail(): void {
        if (this.#lastShown === "body") {
            this.#showEmail();
        } else {
            this.#showBody();
        }
    }

    isSending(): boolean {
        return this.#sending;
    }

    #showBody(): void {
        this.#lastShown = "body";
        const body = Services.TemplateProcessor.renderTemplate(this.#currentIndex);
        const popup = openWindow();
        popup?.document.write(body);
    }

    #showEmail(): void {
        this.#lastShown = "email";
        const subject = Services.TemplateProcessor.renderSubject(this.#currentIndex);
        const email = Services.TemplateVariableManager.evaluate(this.#currentIndex, "email");

        this.#currentIndex++;
        if (this.#currentIndex >= Services.TemplateVariableManager.nEntries) {
            this.#sending = false;
        }
        openWindow(renderEmailLink(email, subject, ""));
    }
}

export class EmailSender {
    #basicMechanism = new BasicEmailMechanism();
    #htmlMechanism = new HTMLEmailMechanism();

    constructor() {
        document.addEventListener("visibilitychange", () => {
            const mechanism = this.#getMechanism();
            if (document.visibilityState === "visible" && mechanism.isSending()) {
                mechanism.sendEmail();
            }
        });
    }

    startSending(): void {
        const mechanism = this.#getMechanism();
        mechanism.reset();
        mechanism.sendEmail();
    }

    #getMechanism(): EmailMechanism {
        if (Services.TemplateProcessor.isHTML) {
            return this.#htmlMechanism;
        } else {
            return this.#basicMechanism;
        }
    }
}
