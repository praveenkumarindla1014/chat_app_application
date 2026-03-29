import {
  format,
  isToday,
  isYesterday,
  differenceInMinutes,
} from "date-fns";

/**
 * Format a message timestamp for display inline.
 * e.g., "14:32"
 */
export function formatMessageTime(date) {
  return format(new Date(date), "HH:mm");
}

/**
 * Format a date for date separators between messages.
 * Returns "Today", "Yesterday", or "Mar 28, 2026"
 */
export function formatDateSeparator(date) {
  const d = new Date(date);
  if (isToday(d)) return "Today";
  if (isYesterday(d)) return "Yesterday";
  return format(d, "MMM d, yyyy");
}

/**
 * Format "last seen" time.
 * e.g., "Just now", "5 min ago", "Yesterday", "Mar 28"
 */
export function formatLastSeen(date) {
  if (!date) return "Unknown";
  const d = new Date(date);
  const now = new Date();
  const mins = differenceInMinutes(now, d);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  if (isToday(d)) return `Today at ${format(d, "HH:mm")}`;
  if (isYesterday(d)) return `Yesterday at ${format(d, "HH:mm")}`;
  return format(d, "MMM d, yyyy");
}

/**
 * Check if two dates are on the same calendar day.
 */
export function isSameDay(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}