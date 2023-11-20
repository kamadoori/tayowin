export const resolvePath = <T>(object: object, path: string, defaultValue: T) =>
  // @ts-ignore o[p] being implicitly 'any' is fine here, ignore this warning
  path.split('.').reduce((o, p) => (o ? o[p] : defaultValue), object)
