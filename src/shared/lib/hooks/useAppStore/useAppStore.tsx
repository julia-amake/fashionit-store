import { useStore } from 'react-redux';
import { AppStore } from 'src/app/store/store';

export const useAppStore = useStore.withTypes<AppStore>();
