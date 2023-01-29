type EventBodyMap = {
    VariablesUpdated: { variables: string[] };
    EntriesUpdated: { nEntries: number };
    VariableValueUpdated: { variable: string; index: number; value: string };
}

type Events = keyof EventBodyMap;

type Handler = (body: any) => void;

type HandlerMap = Map<string, Handler>;

export class EventHandler {
    #handlers = new Map<Events, HandlerMap>();

    handle<Event extends Events>(
        id: string,
        event: Event,
        handler: (body: EventBodyMap[Event]) => void,
    ): void {
        const handlerMap = this.#handlers.get(event) ?? new Map<string, Handler>();
        handlerMap.set(id, handler);
        this.#handlers.set(event, handlerMap);
    }

    trigger<Event extends Events>(event: Event, body: EventBodyMap[Event]): void {
        const handlers = this.#handlers.get(event)?.values() ?? [];
        for (const handler of handlers) {
            handler(body);
        }
    }
}
