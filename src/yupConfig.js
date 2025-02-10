import * as yup from 'yup';
import i18next from './i18n.js';

yup.setLocale({
  mixed: {
    required: () => i18next.t('form.errors.required'),
  },
  string: {
    url: () => i18next.t('form.errors.invalid_url'),
  },
});

export const urlSchema = yup.object().shape({
  url: yup.string().url().required(),
});
