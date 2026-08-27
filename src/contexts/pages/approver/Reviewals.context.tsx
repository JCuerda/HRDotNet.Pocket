// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { createContext, useReducer } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ValuesApprovals } from 'src/constants/Values';
import {
  ParamsRequestApplication,
  StateApplications,
  TypeHandle,
  TypeNavStack,
  SchemaRequestApplications,
} from 'src/types/Types';
import { useFetch } from 'src/hooks/useFetch';
import { DateTimeUtils } from 'src/utils/DateTimeUtils';
import { useGlobalStore } from 'src/store/GlobalStore';
import { STRINGS } from 'src/constants/Strings';
import { RequestCounts } from 'src/utils/Utils';

type TypeContext = {
  params: ParamsRequestApplication | undefined;
  state: StateApplications;
  setState: React.Dispatch<Partial<StateApplications>>;
  handle: TypeHandle;
  setHandle: React.Dispatch<Partial<TypeHandle>>;

  onHandleCheckbox: (data: SchemaRequestApplications, value: boolean) => void;
  onHandleSelectAll: (value?: boolean) => void;
  onHandleApprovals: (action: number) => void;
  onHandleClosePrompt: () => void;
  onHandleCancelPrompt: () => void;
  onHandleReviewPrompt: () => void;
  onHandlePress: (index: number) => void;
  onHandleRefreshControl: () => void;
  onHandleSetReachedEnd: () => void;
  onHandleSetURLReviewal: () => void;
  onHandleFetchReviewal: () => void;
  isSelectable: (value: SchemaRequestApplications) => boolean;
};

export const Context = createContext<TypeContext>({
  params: undefined,
  state: ValuesApprovals.State,
  setState: () => { },
  handle: ValuesApprovals.Handle,
  setHandle: () => { },

  onHandleCheckbox: () => { },
  onHandleSelectAll: () => { },
  onHandleApprovals: () => { },
  onHandleClosePrompt: () => { },
  onHandleCancelPrompt: () => { },
  onHandleReviewPrompt: () => { },
  onHandlePress: () => { },
  onHandleRefreshControl: () => { },
  onHandleSetReachedEnd: () => { },
  onHandleSetURLReviewal: () => { },
  onHandleFetchReviewal: () => { },
  isSelectable: () => false,
});

export const CtxReviewals = ({ children }: { children: React.ReactNode }) => {
  const navigation: TypeNavStack['navigation'] = useNavigation();
  const params = useRoute().params as ParamsRequestApplication;
  const { cutOffPeriod, employeeName, setReviewalCounts } = useGlobalStore();

  const removeDashFrom = DateTimeUtils.getRemoveDash(cutOffPeriod[0] || '');
  const removeDashTo = DateTimeUtils.getRemoveDash(cutOffPeriod[1] || '');

  const [state, setState] = useReducer(
    (state: StateApplications, newState: Partial<StateApplications>) => ({ ...state, ...newState }),
    ValuesApprovals.State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesApprovals.Handle,
  );

  const isSelectable = (record: SchemaRequestApplications): boolean => {
    const cutOffStart = DateTimeUtils.isoToDateDefault(cutOffPeriod[0]?.toString()!);
    const dateFiled = DateTimeUtils.isoToDateDefault(record.filing.dateFiled?.toString()!);
    const status = record.filing.filingStatus?.name;

    return ['Filed'].includes(status) && dateFiled >= cutOffStart;
  };

  const onHandleCheckbox = async (data: SchemaRequestApplications, value: boolean) => {
    const newData = state.data.map((item) =>
      item.filing.id === data.filing.id ? { ...item, isChecked: value } : item,
    );
    const checkedCount = newData.reduce((acc, item) => acc + (item.isChecked ? 1 : 0), 0);

    setState({
      count: checkedCount,
      data: newData,
    });
  };

  const onHandleSelectAll = () => {
    const selectableItems = state.data.filter(isSelectable);
    const shouldCheckAll = !selectableItems.every((item) => item.isChecked);

    setState({
      count: shouldCheckAll ? selectableItems.length : 0,
      data: state.data.map((item) => ({
        ...item,
        isChecked: isSelectable(item) ? shouldCheckAll : false,
      })),
    });
  };

  const onHandleApprovals = (action: number) => {
    setHandle({ ...handle, isVisible: true, isAction: action });
  };

  const onHandleCancelPrompt = () => {
    setHandle({ ...handle, isVisible: false });
  };

  const onHandleClosePrompt = () => {
    setHandle({ isSuccess: false });

    state.failedList!.length <= 0 || state.successList!.length > 0
      ? setHandle({ refreshing: !handle.refreshing, isLoading: true })
      : setState({
        successList: [],
        failedList: [],
      });
  };

  const onHandleReviewPrompt = async () => {
    setHandle({ isVisible: false });

    await useFetch.BatchReviewals(navigation, state, setState, handle, setHandle, employeeName).then(() => {
      setHandle({ isLoading: false });
      RequestCounts.refreshReviewalCounts();
    });
  };

  const onHandlePress = (index: number) => {
    setHandle({ isLoading: true });
    setState({ selectedButton: index, data: [] });
  };

  const onHandleRefreshControl = () => {
    setHandle({ isLoading: true, refreshing: !handle.refreshing });
    setState({ page: 1 });
  };

  const onHandleSetReachedEnd = () => {
    setState({ page: state.page + 1 });
  };

  const onHandleSetURLReviewal = () => {
    const field = [2, 3, 5].includes(state.selectedButton) ? STRINGS.filterDateFiled : STRINGS.filterDateFrom;
    setHandle({ isLoadMore: true, isWaiting: true });
    setState({
      filterType: field,
      filterValue: `${removeDashFrom} - ${removeDashTo}`,
      displayValue: `Date Period: ${DateTimeUtils.getIsoDateWord(removeDashFrom)} - ${DateTimeUtils.getIsoDateWord(removeDashTo)}`,
      urlQuery: `&DateField=${field}&DateFrom=${removeDashFrom}` + `&DateTo=${removeDashTo}&sortBy=-DocumentNo`,
      data: [],
      page: 1,
      count: 0,
      fetchKey: String(Date.now()),
    });
  };

  const onHandleFetchReviewal = async () => {
    if (state.urlQuery !== '') {
      await useFetch.Reviewals(navigation, state, setState, handle, setHandle);
      const counts = await useFetch.ReviewalsCounts(ValuesApprovals.State.buttons.length, removeDashFrom, removeDashTo);
      setReviewalCounts(counts);
    }
  };

  return (
    <Context.Provider
      value={{
        params,
        state,
        setState,
        handle,
        setHandle,
        onHandleCheckbox,
        onHandleSelectAll,
        onHandleApprovals,
        onHandleClosePrompt,
        onHandleReviewPrompt,
        onHandleCancelPrompt,
        onHandlePress,
        onHandleRefreshControl,
        onHandleSetReachedEnd,
        onHandleSetURLReviewal,
        onHandleFetchReviewal,
        isSelectable,
      }}
    >
      {children}
    </Context.Provider>
  );
};
