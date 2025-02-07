import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'form.errors.required',
  },
  string: {
    url: 'form.errors.invalid',
  },
});

export default yup;
