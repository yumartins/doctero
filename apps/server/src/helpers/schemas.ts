import * as Yup from 'yup';

const schemas = {
  email: Yup.string().required('The email is required.'),
  role_id: Yup.number().required('Permission is mandatory.'),
  company: Yup.string().required('Company name is required.'),
  password: Yup.string().required('Password is required.'),
  document: Yup.string().required('The document is required (CPF or CNPJ).'),
};

export default schemas;
