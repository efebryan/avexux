/**
 * Shared deposit utility functions.
 * Standardizes the deposit-detection logic that was previously duplicated across 6+ components.
 */

export interface TransactionLike {
  type?: string;
  amount?: number | string;
  metadata?: { description?: string } | null;
  description?: string;
}

/**
 * Determines whether a transaction record represents a deposit.
 * Checks both the `type` field and metadata/description for the keyword "deposit".
 */
export function isDepositTransaction(tx: TransactionLike): boolean {
  if (tx.type?.toLowerCase() === "deposit") return true;
  if ((tx.metadata?.description || "").toLowerCase().includes("deposit")) return true;
  if ((tx.description || "").toLowerCase().includes("deposit")) return true;
  return false;
}

/**
 * Calculates the highest single deposit amount from a list of transactions.
 * Used to determine the user's plan/rank tier.
 */
export function getHighestDeposit(transactions: TransactionLike[]): number {
  return transactions
    .filter(isDepositTransaction)
    .reduce((max, tx) => Math.max(max, Number(tx.amount || 0)), 0);
}

/**
 * Calculates the total sum of all deposit amounts from a list of transactions.
 */
export function getTotalDeposits(transactions: TransactionLike[]): number {
  return transactions
    .filter(isDepositTransaction)
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
}

/**
 * Shared ranks configuration used across the app for plan tier determination.
 */
export const ranksConfig = [
  { id: "bronze", threshold: 0 },
  { id: "silver", threshold: 18000 },
  { id: "gold", threshold: 42000 },
  { id: "platinum", threshold: 88000 },
] as const;

/**
 * Determines the user's rank based on their highest deposit amount.
 * Returns the rank ID (e.g., "bronze", "silver", "gold", "platinum").
 */
export function getUserRank(highestDeposit: number): string {
  const rankIndex = Math.max(
    0,
    ranksConfig.findLastIndex((r) => highestDeposit >= r.threshold)
  );
  return ranksConfig[rankIndex].id;
}
