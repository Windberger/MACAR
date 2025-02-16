let tokenUpdater: ((token: string) => void) | null = null;

export const setTokenUpdater = (updater: (token: string) => void) => {
    tokenUpdater = updater;
};

export const updateToken = (token: string) => {
    if (tokenUpdater) {
        tokenUpdater(token);
    } else {
        console.warn("Token-Updater was not initialized.");
    }
};
