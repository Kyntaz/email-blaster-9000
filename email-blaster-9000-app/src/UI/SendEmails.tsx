import { Services } from "../Services";

export function SendEmails() {
    return (
        <button onClick={() => {
            Services.EmailSender.startSending();
        }}>Send Emails</button>
    );
}