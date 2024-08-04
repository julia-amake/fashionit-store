declare module '*.sass';
declare module '*.scss';
declare module '*.css';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg?url';

type SVGType = React.FC<React.SVGProps<SVGSVGElement>>;

declare module '*.svg' {
  const ReactComponent: SVGType;
  export default ReactComponent;
}

type KeyValueOfInterface<Interface> = Interface[keyof Interface];

declare const __IS_DEV__: boolean;

type ValueOf<T> = T[keyof T];
type KeyOf<T> = keyof T;
