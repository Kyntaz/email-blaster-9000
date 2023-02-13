export class Destroyer {
    #deferred: (() => any)[] = [];

    defer(action: () => any): void {
        this.#deferred.push(action);
    }

    async destroy(): Promise<void> {
        console.log("Destroying allocated resources");
        for (const action of this.#deferred) {
            try {
                await action();
            } catch (e) {
                console.error(chalk.red("Error while tearing down"), e);
            }
        }
    }
}

export const GlobalDestroyer = new Destroyer();
