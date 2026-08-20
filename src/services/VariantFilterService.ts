export function filterVariantsByIdentifiers<T>(
  variants: T[],
  identifiers: string[] | undefined,
  matches: (variant: T, identifiers: ReadonlySet<string>) => boolean,
): T[] {
  if (identifiers === undefined) {
    return variants
  }

  if (identifiers.length === 0) {
    return []
  }

  const identifierSet = new Set(identifiers)
  return variants.filter(variant => matches(variant, identifierSet))
}
