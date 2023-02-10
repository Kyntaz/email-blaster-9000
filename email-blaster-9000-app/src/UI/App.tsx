import { AddEntry } from "./AddEntry";
import { LoadExcelFile } from "./LoadExcelFile";
import { SendEmails } from "./SendEmails";
import { Subject } from "./Subject";
import { TemplateTabs } from "./TemplateTabs";
import { VariableGrid } from "./VariableGrid";

export function App() {
    return (
        <div className="container">
            <h1 className="text-center m-5 display-1">✉️ EMAIL BLASTER 9000 💥</h1>

            <h4 className="mt-5">Email Template</h4>
            <Subject />
            <TemplateTabs />
            <p className="fw-light">
                Declare variables in your email template using
                <span className="text-primary fw-bold"> {"${variable}"}</span>
                .
            </p>

            <h4 className="mt-5">Variables</h4>
            <VariableGrid />

            <LoadExcelFile />
            <AddEntry />
            <SendEmails />
        </div>
    );
}
