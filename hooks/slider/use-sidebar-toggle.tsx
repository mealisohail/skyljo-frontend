import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '@/redux/actions';

export const useSidebarToggle = () => {
  const isOpen = useSelector((state: any) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  const setIsOpen = () => {
    dispatch(toggleSidebar());
  };

  return { isOpen, setIsOpen };
};