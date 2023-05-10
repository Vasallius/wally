// @ts-nocheck
// stores.js
import { writable } from 'svelte/store';
export const authStore = writable(null);
function createWalletStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        set,
        update,
        walletAdded: () => update(wallets => {
            // Emit a custom event when a wallet is added
            const event = new CustomEvent('walletAdded');
            document.dispatchEvent(event);
            return wallets;
        })
    };
}

export const recordsStore = writable(null)

export const walletStore = createWalletStore();