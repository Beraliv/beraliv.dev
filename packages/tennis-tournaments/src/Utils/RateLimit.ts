class EventBus<TValue extends string = string> {
  private callbacks = {} as Record<TValue, VoidFunction[]>;

  constructor() {}

  public addEventListener(
    event: TValue,
    addedCallback: VoidFunction
  ): VoidFunction {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(addedCallback);

    return () => {
      this.removeEventListener(event, addedCallback);
    };
  }

  public dispatch(event: TValue): void {
    for (const callback of this.callbacks[event]) {
      callback();
    }
  }

  private removeEventListener(
    event: TValue,
    removingCallback: VoidFunction
  ): void {
    if (!this.callbacks[event]) {
      return;
    }

    this.callbacks[event] = this.callbacks[event].filter(
      (callback) => callback !== removingCallback
    );
  }
}

const ONE_SECOND = 1000;

const createRateLimit = (rateLimit: number) => {
  const eventBus = new EventBus<"acquire" | "release">();

  let requestsLeft = rateLimit;

  eventBus.addEventListener("acquire", () => {
    requestsLeft--;
  });

  eventBus.addEventListener("release", () => {
    requestsLeft++;
  });

  return {
    async acquire(): Promise<void> {
      if (requestsLeft > 0) {
        eventBus.dispatch("acquire");
        return Promise.resolve();
      }

      await new Promise<void>((resolve) => {
        const removeEventListener = eventBus.addEventListener("release", () => {
          if (requestsLeft > 0) {
            // it prevents next subscriptions to use this release dispatch
            // to proceed with the request

            eventBus.dispatch("acquire");

            removeEventListener();
            resolve();
          }
        });
      });
    },
    release() {
      setTimeout(() => {
        eventBus.dispatch("release");
      }, ONE_SECOND);
    },
  };
};

export { createRateLimit };
