import { Category } from 'src/entities/Product';
import { CategoryName } from 'src/entities/Product/mocks/productsMocks';

// export const categories = {
//   Face: 'https://www.azyaamode.com/files/stories/group0/original/shutterstock_318602609.jpg',
//   Hair: 'https://brando-s.ru/wp-content/uploads/maska_uhod.jpg',
//   Body: 'https://avatars.dzeninfra.ru/get-zen_doc/9348320/pub_641221a5aad9141a24c137d7_641221c6aad9141a24c13cf0/scale_1200',
//   Makeup:
//     'https://mykaleidoscope.ru/uploads/posts/2023-12/thumbs/1702576373_mykaleidoscope-ru-p-makiyazh-s-sinimi-strelkami-zhenskie-pinte-49.jpg',
//   Perfumery: 'https://i.pinimg.com/originals/dd/da/67/ddda678d0385a6f5a398fdeaf59201be.png',
// };

export const categories: Category[] = [
  {
    id: '1',
    name: 'Face',
    photo: 'https://www.azyaamode.com/files/stories/group0/original/shutterstock_318602609.jpg',
  },
  {
    id: '2',
    name: 'Hair',
    photo: 'https://brando-s.ru/wp-content/uploads/maska_uhod.jpg',
  },
  {
    id: '3',
    name: 'Body',
    photo:
      'https://avatars.dzeninfra.ru/get-zen_doc/9348320/pub_641221a5aad9141a24c137d7_641221c6aad9141a24c13cf0/scale_1200',
  },
  {
    id: '4',
    name: 'Makeup',
    photo:
      'https://mykaleidoscope.ru/uploads/posts/2023-12/thumbs/1702576373_mykaleidoscope-ru-p-makiyazh-s-sinimi-strelkami-zhenskie-pinte-49.jpg',
  },
  {
    id: '5',
    name: 'Perfumery',
    photo: 'https://i.pinimg.com/originals/dd/da/67/ddda678d0385a6f5a398fdeaf59201be.png',
  },
];

export const products: {
  [key in CategoryName]: string[];
} = {
  Face: [
    'https://amake.ru/assets/img/ot/product/face-1.jpg',
    'https://amake.ru/assets/img/ot/product/face-2.jpg',
    'https://amake.ru/assets/img/ot/product/face-3.jpg',
    'https://amake.ru/assets/img/ot/product/face-4.jpg',
    'https://amake.ru/assets/img/ot/product/face-5.jpg',
    'https://amake.ru/assets/img/ot/product/face-6.jpg',
    'https://amake.ru/assets/img/ot/product/face-7.jpg',
    'https://amake.ru/assets/img/ot/product/face-8.jpg',
    'https://amake.ru/assets/img/ot/product/face-9.jpg',
  ],
  Hair: [
    'https://amake.ru/assets/img/ot/product/hair-1.jpg',
    'https://amake.ru/assets/img/ot/product/hair-2.jpg',
    'https://amake.ru/assets/img/ot/product/hair-3.jpg',
    'https://amake.ru/assets/img/ot/product/hair-4.jpg',
    'https://amake.ru/assets/img/ot/product/hair-5.jpg',
  ],
  Body: [
    'https://amake.ru/assets/img/ot/product/body-1.jpg',
    'https://amake.ru/assets/img/ot/product/body-2.jpg',
    'https://amake.ru/assets/img/ot/product/body-3.jpg',
    'https://amake.ru/assets/img/ot/product/body-4.jpg',
    'https://amake.ru/assets/img/ot/product/body-5.jpg',
    'https://amake.ru/assets/img/ot/product/body-6.jpg',
  ],
  Makeup: [
    'https://amake.ru/assets/img/ot/product/makeup-1.jpg',
    'https://amake.ru/assets/img/ot/product/makeup-2.jpg',
    'https://amake.ru/assets/img/ot/product/makeup-3.jpg',
    'https://amake.ru/assets/img/ot/product/makeup-4.jpg',
    'https://amake.ru/assets/img/ot/product/makeup-5.jpg',
  ],
  Perfumery: [
    'https://amake.ru/assets/img/abs/rain-1.jpg',
    'https://amake.ru/assets/img/ot/product/parfum-1.jpg',
    'https://amake.ru/assets/img/ot/product/parfum-2.jpg',
    'https://amake.ru/assets/img/ot/product/parfum-3.jpg',
    'https://amake.ru/assets/img/ot/product/parfum-4.jpg',
    'https://amake.ru/assets/img/ot/product/parfum-5.jpg',
    'https://amake.ru/assets/img/ot/product/parfum-6.jpg',
  ],
};
