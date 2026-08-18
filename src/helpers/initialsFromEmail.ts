/**
 * Extract initials from an email address.
 * @param email - The email address to process initials from.
 * @returns The initials as a string.
 */
export const initialsFromEmail = (email: string): string => {
  const [local = ""] = email.split("@");
  const clean = local.replace(/[^a-zA-Z0-9]/g, "");
  if (clean.length === 0) return email.slice(0, 2).toUpperCase();
  if (clean.length === 1) return clean.toUpperCase();
  return (clean[0] + clean[clean.length - 1]).toUpperCase();
};
