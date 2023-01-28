import { useState } from "react";
import { Services } from "../Services";

function GridEntry({ index, variables }: { index: number; variables: string[] }) {
    const cols = variables.map((variable, i) => (
        <td key={i}>
            <input onChange={(event) => {
                Services.TemplateVariableManager.setValue(index, variable, event.target.value);
            }} />
        </td>
    ));

    return <>{cols}</>;
}

export function VariableGrid() {
    const [variables, setVariables] = useState([] as string[]);
    const [entries, setEntries] = useState(Services.TemplateVariableManager.nEntries);

    Services.EventHandler.handle("VariableGrid", "VariablesUpdated", (body) => {
        setVariables(body.variables);
    });

    Services.EventHandler.handle("VariableGrid", "EntriesUpdated", (body) => {
        setEntries(body.nEntries);
    });

    const allVariables = ["email", ...variables];
    const headers = allVariables.map((variable, i) => <th key={i}>{variable}</th>);
    const entryElements = [...Array(entries).keys()].map((index, i) => <tr key={i}><GridEntry
        index={index}
        variables={allVariables}
    ></GridEntry></tr>);

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>
                {entryElements}
            </tbody>
        </table>
    );
}
