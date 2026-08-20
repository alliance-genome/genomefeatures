export declare function filterVariantsByIdentifiers<T>(variants: T[], identifiers: string[] | undefined, matches: (variant: T, identifiers: ReadonlySet<string>) => boolean): T[];
