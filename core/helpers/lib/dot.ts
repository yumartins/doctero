import { Value } from './types';

const value = ({ target, ...args }: Value): void | string => (typeof target === 'function'
  ? target(args)
  : target);

const dot = (target, path, def = null, shouldReturnUndefined = false) => {
  const splited = Array.isArray(path)
    ? path
    : path.split('.');

  const key = splited.shift();

  if (! key) {
    return target === null
      ? value(def)
      : target;
  }

  const isUndefined = typeof target[key] === 'undefined';

  if (! target || isUndefined) {
    if (isUndefined && shouldReturnUndefined) {
      return; //eslint-disable-line
    }

    return value(def);
  }

  return dot(target[key], splited, def);
};

export default dot;
