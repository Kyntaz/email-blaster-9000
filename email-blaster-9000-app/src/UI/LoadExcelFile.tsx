import { Services } from "../Services";

export function LoadExcelFile() {
    return (
        <div className="input-group my-2">
            <label className="input-group-text">Load file with values</label>
            <input type="file" placeholder="Load file with values" className="form-control" onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                    Services.ExcelReader.readFile(file);
                }
            }} />
        </div>
    );
}