import React from 'react';
import type { Meta } from '@storybook/react';
import { Collapse } from './Collapse';

const meta: Meta<typeof Collapse> = {
  title: 'shared/Collapse',
  component: Collapse,
  args: {
    children: (
      <div>
        Это компонент Collapse. Он принимает только opened и children. Когда opened: true, дочерние
        компоненты сначала монтируются, а потом плавно появляются. В обратном случае наоборот, после
        скрытия дочерних компонентов, они размонтируются.
      </div>
    ),
    opened: true,
  },
};

export default meta;

export const Default = {};
