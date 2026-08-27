/**
 * @project      HRDotNet-Mobile
 * @description  Pending Context for all the states, handles and function for Pending Component
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-30-2024
 */

import React, { createContext } from 'react';
import PendingIconText from 'src/components/use/PendingIconText';
import { STRINGS } from 'src/constants/Strings';
import { useFetchPending } from 'src/hooks/usePending';
import { PendingHandles, PendingStates, PendingValues } from 'src/types/Pending';

type TypeContext = {
  state: PendingStates;
  setState: React.Dispatch<Partial<PendingStates>>;
  handle: PendingHandles;
  setHandle: React.Dispatch<Partial<PendingHandles>>;
  onHandlePress: (title: string) => void;

  onFetchPending: () => void;
  onHandleRefreshControl: () => void;
  onHandleSetReachedEnd: () => void;
  onHandleClear: () => void;
  onHandleSearchSubmit: (index: number, value: string, fromDate: string, toDate: string) => void;
};

export const Context = createContext<TypeContext>({
  state: PendingValues.State,
  setState: () => { },
  handle: PendingValues.Handle,
  setHandle: () => { },
  onHandlePress: () => { },
  onFetchPending: () => { },
  onHandleRefreshControl: () => { },
  onHandleSetReachedEnd: () => { },
  onHandleSearchSubmit: () => { },
  onHandleClear: () => { },

});

export const CtxPendings = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useReducer(
    (state: PendingStates, newState: Partial<PendingStates>) => ({ ...state, ...newState }),
    PendingValues.State,
  );

  const [handle, setHandle] = React.useReducer(
    (state: PendingHandles, newState: Partial<PendingHandles>) => ({ ...state, ...newState }),
    PendingValues.Handle,
  );

  const onHandlePress = (title?: string) => {
    const index = state.selectedButton.findIndex((button) => button.title === title);

    setState({
      selectedButtonIndex: index,
      searchFilterIndex: 0,
      filterText: '',
      fromDate: '',
      toDate: '',
      badgeCount: null,
    });
  };

  const onHandleRefreshControl = () => {
    setHandle({ isLoading: true, isRefresh: !handle.isRefresh });
  };

  const onHandleSetReachedEnd = () => {
    setState({ page: state.page + 1 });
  };

  const onFetchPending = () => {
    const interval = setTimeout(async () => {
      await useFetchPending.Pending(state, setState, handle, setHandle);
    }, 50);
    return () => clearTimeout(interval);
  };

  const onHandleClear = () => {
    setState({
      filterText: '',
      searchFilterIndex: 0,
      fromDate: '',
      toDate: '',
      filterLabel: ''
    })
  }

  const onHandleSearchSubmit = (
    index?: number,
    value?: string,
    fromDate?: string,
    toDate?: string
  ) => {
    const titleLabel = STRINGS.pendingTitleFilter(index || 0);
    const filterValue = value
      ? STRINGS.pendingValueFilter(value)
      : `${fromDate || ''} - ${toDate || ''}`;

    setState({
      searchFilterIndex: index,
      filterText: value,
      fromDate,
      toDate,
      filterLabel:
        !value && !fromDate && !toDate
          ? ''
          : `${titleLabel ? `${titleLabel}: ${filterValue}` : ''}`,
    });
  };


  return (
    <Context.Provider
      value={{
        state,
        setState,
        handle,
        setHandle,
        onHandleClear,
        onHandleRefreshControl,
        onHandleSetReachedEnd,
        onHandlePress,
        onFetchPending,
        onHandleSearchSubmit,
      }}
    >
      {children}
    </Context.Provider>
  );
};
