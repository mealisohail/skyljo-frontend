// redux/reducer.ts
import { TOGGLE_SIDEBAR } from './actionType';

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: true,
};

const sidebarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
