import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/app/store/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
