import bcrypt from 'bcrypt';

const rounds = process.env.B_SALT || 8;

const bcrypts = {
  hash: async (data: string): Promise<string> => {
    const salt = bcrypt.genSaltSync(rounds);

    const crypt = bcrypt.hashSync(data, salt);

    return crypt;
  },

  compare: (data: string, encrypted: string): boolean => {
    const match = bcrypt.compare(data, encrypted);

    return match;
  },
};

export default bcrypts;
