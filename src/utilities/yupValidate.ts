import i18next from 'i18next';
import * as yup from 'yup';
import { requireField } from './format';
import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    REGEX_EMAIL,
    REGEX_PASSWORD,
    REGEX_PHONE,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
} from './validate';

const yupValidate = {
    name: () =>
        yup
            .string()
            .required(() => requireField('username'))
            .trim(i18next.t('error.trimSpace'))
            .strict(true)
            .min(USERNAME_MIN_LENGTH, i18next.t('error.nameLength'))
            .max(USERNAME_MAX_LENGTH, i18next.t('error.nameLength')),
    gender: () => yup.string().required(() => requireField('gender')),
    address: () => yup.string().required(() => requireField('address')),
    description: () => yup.string().required(() => requireField('description')),
    currentDate: () => yup.string().required(() => requireField('currentDate')),
    note: () => yup.string().required(() => requireField('note')),
    email: () =>
        yup
            .string()
            .required(() => requireField('email'))
            .email(i18next.t('error.emailInvalid'))
            .matches(REGEX_EMAIL, i18next.t('error.emailInvalid')),

    phone: () =>
        yup
            .string()
            .required(() => requireField('phone'))
            .matches(REGEX_PHONE, i18next.t('error.phoneInvalid')),

    /**
     * @param ref : the name of StyledInputForm want to compare
     * @param isMatchCurrentPassword
     * password() : input password
     * password(ref) : input passwordConfirm, have to be the same with password
     * password(ref, false) : input newPassword, have not to be the same with currentPassword
     */
    password: (ref?: string, isMatchCurrentPassword = true): any => {
        if (ref) {
            // NEW PASSWORD
            if (!isMatchCurrentPassword)
                return yupValidate.password().not([yup.ref(ref), null], i18next.t('error.duplicatePassword'));

            // CONFIRM PASSWORD
            return yup
                .string()
                .required(() => requireField('passwordConfirm'))
                .oneOf([yup.ref(ref), null], i18next.t('error.passwordNotMatch'));
        }

        return yup
            .string()
            .required(() => requireField('password'))
            .trim(i18next.t('error.trimSpace'))
            .min(PASSWORD_MIN_LENGTH, i18next.t('error.passwordMinLength'))
            .max(PASSWORD_MAX_LENGTH, i18next.t('error.passwordMaxLength'))
            .matches(REGEX_PASSWORD, i18next.t('error.validatePassword'));
    },

    birthday: () => yup.string().required(() => requireField('birthday')),

    labelPicker: () => yup.string().required(() => requireField('labelPicker')),
    policy: () => yup.string().required(() => requireField('policy')),
    newPassWord: (ref?: string, isMatchCurrentPassword = true): any => {
        if (ref) {
            // NEW PASSWORD
            if (!isMatchCurrentPassword)
                return yupValidate.password().not([yup.ref(ref), null], i18next.t('error.duplicatePassword'));

            // CONFIRM PASSWORD
            return yup
                .string()
                .required(() => requireField('passwordConfirm'))
                .oneOf([yup.ref(ref), null], i18next.t('error.passwordNotMatch'));
        }

        return yup
            .string()
            .required(() => requireField('password'))
            .trim(i18next.t('error.trimSpace'))
            .strict(true)
            .min(PASSWORD_MIN_LENGTH, i18next.t('error.passwordLength'))
            .max(PASSWORD_MAX_LENGTH, i18next.t('error.passwordLength'))
            .matches(REGEX_PASSWORD, i18next.t('error.validatePassword'));
    },
};

export default yupValidate;
