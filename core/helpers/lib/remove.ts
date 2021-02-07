const remove = (key: string, object: Record<string, never>): Record<string, never> => {
  const {
    [key]: _, //eslint-disable-line
    ...rest
  } = object;

  return rest;
};

export default remove;
