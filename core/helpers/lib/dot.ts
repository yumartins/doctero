import { Dot } from './types';

const dot = ({
  def = '',
  path,
  target,
  shouldReturnUndefined = false,
}: Dot): void | null => {
  const splited = Array.isArray(path)
    ? path
    : path.split('.');

  const key = splited.shift();

  const isUndefined = key && typeof target[key] === 'undefined';

  if (! target || isUndefined) {
    if (isUndefined && shouldReturnUndefined) {
      return null;
    }

    return target(def);
  }

  return dot({
    target: target[key || 0],
    path: splited,
    def,
  });
};

export default dot;
