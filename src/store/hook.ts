import { createTypedHooks } from 'easy-peasy';
import { IStore } from '../types/interface';

const typedHooks = createTypedHooks<IStore>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

 