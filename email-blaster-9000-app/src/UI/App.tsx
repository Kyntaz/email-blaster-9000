import { AddEntry } from "./AddEntry";
import { SendEmails } from "./SendEmails";
import { Subject } from "./Subject";
import { Template } from "./Template";
import { VariableGrid } from "./VariableGrid";

export function App() {
    return (
        <>
            <h1>EMAIL BLASTER 9000</h1>
            <Subject />
            <Template />
            <VariableGrid />
            <AddEntry />
            <SendEmails />
        </>
    );
}
