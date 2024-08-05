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

type ObjectValue<ObjectType> = ObjectType[keyof ObjectType];

declare const __IS_DEV__: boolean;

type ValueOf<T> = T[keyof T];
type KeyOf<T> = keyof T;

type AppStore = import('src/app/store/store').AppStore;
type RootState = import('src/app/store/store').RootState;
type AppDispatch = import('src/app/store/store').AppDispatch;
