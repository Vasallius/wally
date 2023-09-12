interface Wallet {
	active: string;
	balance: number;
	dailyBudget: number;
	initial: number;
	name: string;
	weeklyBudget: number;
}

export function getActiveWallet(wallets: Wallet[]): Wallet | undefined {
	return wallets.find((wallet) => wallet.active == 'True');
}
