/**
 * Count unique tags from an array of tag strings.
 * @param tagRows - An array of tag strings, each representing a list of tags.
 * @returns The total number of unique tags found in the input.
 */
export const uniqueTags = (tagRows: string[]): number => {
  const set = new Set<string>();
  tagRows.forEach((raw) => {
    try {
      const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (Array.isArray(arr)) arr.forEach((t: any) => set.add(String(t)));
    } catch {
      // legacy string tags non JSON
      raw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((t) => set.add(t));
    }
  });
  return set.size;
};
