import React, { memo, useContext } from 'react';
import { LANGUAGES } from 'src/shared/consts/langs';
import { TranslationsContext } from 'src/shared/lib/context/TranslationsContext';
import { ToggleSwitch } from 'src/shared/ui/ToggleSwitch/ToggleSwitch';
import IconEn from 'src/shared/assets/icons/LangEn.svg';
import IconEnBold from 'src/shared/assets/icons/LangEnBold.svg';
import IconRu from 'src/shared/assets/icons/LangRu.svg';
import IconRuBold from 'src/shared/assets/icons/LangRuBold.svg';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
  const { language, changeLanguage } = useContext(TranslationsContext);

  const handleClick = (lang: ObjectValue<typeof LANGUAGES>) => () => {
    if (language === lang.SHORT) return;
    changeLanguage(lang.SHORT);
  };

  return (
    <ToggleSwitch className={className}>
      <ToggleSwitch.Item
        title={LANGUAGES.RU.LONG_CAP}
        icon={IconRu}
        iconFilled={IconRuBold}
        isActive={language === LANGUAGES.RU.SHORT}
        onClick={handleClick(LANGUAGES.RU)}
      />
      <ToggleSwitch.Item
        title={LANGUAGES.EN.LONG_CAP}
        icon={IconEn}
        iconFilled={IconEnBold}
        isActive={language === LANGUAGES.EN.SHORT}
        onClick={handleClick(LANGUAGES.EN)}
      />
    </ToggleSwitch>
  );
});

LangSwitcher.displayName = 'LangSwitcher';
