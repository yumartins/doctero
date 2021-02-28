const remove = (key: string, object: Record<string, any>): Record<string, any> => {
  const {
    [key]: _, //eslint-disable-line
    ...rest
  } = object;

  return rest;
};

export default remove;
