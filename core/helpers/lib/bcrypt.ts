import bcrypt from 'bcrypt';

const bcrypts = {
  hash: async (data: string): Promise<string> => {
    const salt = bcrypt.genSaltSync(10);

    const crypt = bcrypt.hashSync(data, salt);

    return crypt;
  },

  compare: (data: string, encrypted: string): Promise<boolean> => {
    const match = bcrypt.compare(data, encrypted);

    return match;
  },
};

export default bcrypts;
