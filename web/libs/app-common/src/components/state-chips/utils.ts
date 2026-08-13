/**
 * Shared utilities for state chip components
 *
 * This file re-exports the state registry functions for backward compatibility.
 * The actual implementation is in state-registry.ts which provides an extensible
 * semantic type system that LSE can extend.
 */

export {
  stateRegistry,
  StateType,
  getStateColorClass,
  getStateVariant,
  formatStateName,
  getStateDescription,
  getStateType,
  isTerminalState,
  requiresAttention,
  type EntityType,
  type StateMetadata,
} from "./state-registry";

/**
 * Format timestamp to human-readable string
 */
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "刚刚";
  if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? "分钟" : "分钟"}前`;
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? "小时" : "小时"}前`;
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? "天" : "天"}前`;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format user name from triggered_by object
 */
export function formatUserName(
  triggeredBy: {
    first_name?: string;
    last_name?: string;
    email?: string;
  } | null,
): string {
  if (!triggeredBy) return "System";

  const { first_name, last_name, email } = triggeredBy;

  if (first_name && last_name) return `${first_name} ${last_name}`;
  if (first_name) return first_name;
  if (last_name) return last_name;
  if (email) return email;

  return "System";
}
