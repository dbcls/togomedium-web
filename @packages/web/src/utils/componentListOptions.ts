import type { SearchComponentsFacetsResponse } from "%api/searchComponentsFacets/definitions";
import type { ListCountOption } from "@/components/molecules/list-controls/ListCountSelect";

/** Preserve every Role once, including orphaned or cyclic ancestry, in parent-first order. */
export const componentRoleOptions = (
  roles: SearchComponentsFacetsResponse["roles"],
  includeCounts: boolean,
): ListCountOption[] => {
  const sorted = [...roles].sort(
    (left, right) =>
      left.label_en.localeCompare(right.label_en, "en") || left.gmo_id.localeCompare(right.gmo_id),
  );
  const byId = new Map(sorted.map((role) => [role.gmo_id, role]));
  const children = new Map<string, typeof roles>();
  for (const role of sorted) {
    if (role.parent && byId.has(role.parent)) {
      const siblings = children.get(role.parent) ?? [];
      siblings.push(role);
      children.set(role.parent, siblings);
    }
  }
  const visited = new Set<string>();
  const options: ListCountOption[] = [];
  const visit = (role: (typeof roles)[number], depth: number) => {
    if (visited.has(role.gmo_id)) return;
    visited.add(role.gmo_id);
    options.push({
      id: role.gmo_id,
      label: role.label_en || role.gmo_id,
      depth,
      count: includeCounts ? role.count : undefined,
    });
    for (const child of children.get(role.gmo_id) ?? []) visit(child, depth + 1);
  };
  for (const role of sorted) if (!role.parent || !byId.has(role.parent)) visit(role, 0);
  for (const role of sorted) visit(role, 0);
  return options;
};
