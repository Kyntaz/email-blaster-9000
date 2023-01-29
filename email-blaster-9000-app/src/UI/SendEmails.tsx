import { Services } from "../Services";

export function SendEmails() {
    return (
        <button className="btn btn-success m-1" onClick={() => {
            Services.EmailSender.startSending();
        }}>✉️ Send Emails</button>
    );
}