export interface Dot {
  def?: string,
  path: string | string[],
  target: (args: string) => void,
  shouldReturnUndefined?: boolean,
}
