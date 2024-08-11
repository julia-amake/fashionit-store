import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { ChangePasswordForm, ProfileForm } from 'src/features/Profile';
import { Heading } from 'src/shared/ui/Heading';
import { ContentLayout } from 'src/shared/ui/layouts/ContentLayout';
import s from './ProfileSettingsPage.module.scss';

interface ProfileSettingsPageProps {
  className?: string;
}

export const ProfileSettingsPage = memo(({ className }: ProfileSettingsPageProps) => {
  const { t } = useTranslation();

  return (
    <ContentLayout
      className={cn(s.outer, className)}
      sidebarLeft={
        <Heading as="h1" size="h2">
          {t('Настройки профиля')}
        </Heading>
      }
    >
      <div className={s.forms}>
        <ProfileForm />
        <ChangePasswordForm />
      </div>
    </ContentLayout>
  );
});

ProfileSettingsPage.displayName = 'ProfileSettingsPage';
