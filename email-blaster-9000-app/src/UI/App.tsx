import { AddEntry } from "./AddEntry";
import { SendEmails } from "./SendEmails";
import { Subject } from "./Subject";
import { Template } from "./Template";
import { VariableGrid } from "./VariableGrid";

export function App() {
    return (
        <div className="container">
            <h1 className="text-center m-5">✉️ EMAIL BLASTER 9000 💥</h1>

            <h4 className="mt-5">Email Template</h4>
            <Subject />
            <Template />
            
            <h4 className="mt-5">Attributes</h4>
            <VariableGrid />
            <AddEntry />
            <SendEmails />
        </div>
    );
}
