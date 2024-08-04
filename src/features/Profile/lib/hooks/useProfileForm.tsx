import { useCallback, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import { FormikErrors } from 'formik/dist';
import { useTranslation } from 'react-i18next';
import { ProfileRequest, useFetchProfileQuery } from 'src/entities/Profile';
import { isNotDefinedString } from 'src/shared/lib/utils/validation/common';
import { useEditProfileMutation } from '../../api/profileMutationApi';

type ProfileFormErrors = FormikErrors<ProfileRequest>;

export const useProfileForm = () => {
  const { data: profile, isFetching: profileIsLoading } = useFetchProfileQuery();
  const [editProfile, { isLoading, error }] = useEditProfileMutation();
  const { t } = useTranslation();

  const initialValues: ProfileRequest = useMemo(
    () => ({
      name: profile?.name || '',
    }),
    [profile]
  );

  const onSubmit = useCallback(
    (values: ProfileRequest) => {
      editProfile(values);
    },
    [editProfile]
  );

  const validate = useCallback(
    (values: ProfileRequest) => {
      const errors: ProfileFormErrors = {};
      if (isNotDefinedString(values.name)) {
        errors.name = t('Обязательное поле');
      }
      return errors;
    },
    [t]
  );

  const manager = useFormik<ProfileRequest>({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });

  const { setStatus } = manager;

  useEffect(() => {
    if (error) {
      setStatus(error);
    }
  }, [error, setStatus]);

  return {
    ...manager,
    isLoading: profileIsLoading,
    isSaving: isLoading,
  };
};
