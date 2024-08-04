import React from 'react';
import type { Meta } from '@storybook/react';
import { Heading } from 'src/shared/ui/Heading';
import { Modal } from './Modal';
import s from './Storybook.module.scss';

const meta: Meta<typeof Modal> = {
  title: 'shared/Modal',
  component: Modal,
  args: {
    children: (
      <>
        <Heading className={s.heading} size="h4">
          Добро пожаловать!
        </Heading>
        <p className={s.text}>
          Стая серебристых рыбок скользила в&nbsp;глубоководной синеве океана, их&nbsp;чешуйки
          переливались в&nbsp;лучах пробившегося сквозь толщу воды солнца. Они двигались всей стаей,
          словно одно целое существо, изгибаясь и&nbsp;поворачиваясь с&nbsp;невероятной
          слаженностью.
        </p>
      </>
    ),
    visible: true,
  },
};

export default meta;

export const Default = {};
