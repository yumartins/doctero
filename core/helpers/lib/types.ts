export interface Value {
  args?: string,
  target: (args: string) => void | string
}
