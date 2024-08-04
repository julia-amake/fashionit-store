import React from 'react';
import { AboutLink } from '../AboutLink';
import { links } from './mocks';
import s from './AboutFooter.modules.css';

export const AboutFooter = () => {
  return (
    <footer className={s.footer}>
      Контакты:
      {links.map(({ title, url }) => (
        <AboutLink title={title} url={url} key={title} />
      ))}
    </footer>
  );
};
