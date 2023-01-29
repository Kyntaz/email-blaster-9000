import { useState } from "react";
import { Services } from "../Services";

function GridCell({ index, variable }: { index: number; variable: string }) {
    const [value, setValue] = useState(Services.TemplateVariableManager.evaluate(index, variable));

    Services.EventHandler.handle(`GridCell.${index}.${variable}`, "VariableValueUpdated", (body) => {
        if (body.index === index && body.variable === variable) {
            setValue(body.value);
        }
    });

    return (
        <td>
            <input className="form-control" value={value} onChange={(event) => {
                setValue(event.target.value);
                Services.TemplateVariableManager.setValue(index, variable, event.target.value);
            }} />
        </td>
    );
}

function GridEntry({ index, variables }: { index: number; variables: string[] }) {


    const cols = variables.map((variable, i) => <GridCell
        index={index}
        variable={variable}
        key={i}
    />);

    return (
        <>
            <th>{index + 1}</th>
            {cols}
        </>
    );
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
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {entryElements}
            </tbody>
        </table>
    );
}
