import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store/store';

export const useAppSelector = useSelector.withTypes<RootState>();
