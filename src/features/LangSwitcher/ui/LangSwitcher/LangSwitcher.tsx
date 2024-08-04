import React, { memo, useContext, useMemo } from 'react';
import { LANGUAGES } from 'src/shared/consts/langs';
import { TranslationsContext } from 'src/shared/lib/context';
import { SwitcherElem, SwitcherElems, ToggleSwitch } from 'src/shared/ui/ToggleSwitch';
import IconEn from 'src/shared/assets/icons/LangEn.svg';
import IconEnBold from 'src/shared/assets/icons/LangEnBold.svg';
import IconRu from 'src/shared/assets/icons/LangRu.svg';
import IconRuBold from 'src/shared/assets/icons/LangRuBold.svg';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
  const { language, changeLanguage } = useContext(TranslationsContext);

  const elems = useMemo((): SwitcherElems => {
    const handleClick = (lang: KeyValueOfInterface<typeof LANGUAGES>) => () => {
      if (language === lang.SHORT) return;
      changeLanguage(lang.SHORT);
    };

    const getElem = (
      lang: KeyValueOfInterface<typeof LANGUAGES>,
      icon: SVGType,
      iconFilled: SVGType
    ): SwitcherElem => {
      return {
        title: lang.LONG_CAP,
        icon,
        iconFilled,
        isActive: language === lang.SHORT,
        onClick: handleClick(lang),
      };
    };

    return {
      firstElem: getElem(LANGUAGES.RU, IconRu, IconRuBold),
      lastElem: getElem(LANGUAGES.EN, IconEn, IconEnBold),
    };
  }, [language, changeLanguage]);

  return <ToggleSwitch {...elems} className={className} />;
});

LangSwitcher.displayName = 'LangSwitcher';
