// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { createContext, useReducer, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ValuesCalendar } from 'src/constants/Values';
import { useFetch } from 'src/hooks/useFetch';
import { StateCalendar, TypeHandle, TypeNavStack } from 'src/types/Types';
import { COLORS, DateTimeUtils } from 'src';

type TypeContext = {
  state: StateCalendar;
  setState: React.Dispatch<Partial<StateCalendar>>;
  handle: TypeHandle;
  setHandle: React.Dispatch<Partial<TypeHandle>>;

  onHandleSelectedDate: () => void;
  onHandlePressDate: (day: { dateString: string }) => void;
  onHandleMonthChange: (day: string) => void;
  onHandleEffectI: () => void;


};

export const Context = createContext<TypeContext>({
  state: ValuesCalendar.State,
  setState: () => { },
  handle: ValuesCalendar.Handle,
  setHandle: () => { },

  onHandleSelectedDate: () => { },
  onHandlePressDate: () => { },
  onHandleMonthChange: () => { },
  onHandleEffectI: () => { },
});

export const CtxCalendar = ({ children }: { children: React.ReactNode }) => {
  const navigation: TypeNavStack['navigation'] = useNavigation();

  const [state, setState] = useReducer(
    (state: StateCalendar, newState: Partial<StateCalendar>) => ({ ...state, ...newState }),
    ValuesCalendar.State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesCalendar.Handle,
  );



  const onHandleSelectedDate = () => {
    const marked: { [key: string]: {} } = {};
    for (const date in state.data) {
      marked[date] = { marked: true };
    }

    state.selected.date &&
      (marked[DateTimeUtils.dateDefaultToDash(state.selected.date)] = { selected: true, selectedColor: COLORS.orange });

    return marked;
  };

  const onHandlePressDate = async (day: { dateString: string }) => {

    const prevDate: string = DateTimeUtils.dateDashToDefaultLessDay(day.dateString);
    const nextDate: string = DateTimeUtils.dateDashToDefaultAddDay(day.dateString);

    const calendarVal = (date: string) => {
      const dateVal = DateTimeUtils.dateDashToWithTZ(date);
      return state.data.calendarDates!?.find((dateEntry: { date: string }) => dateEntry.date === dateVal)?.entries;
    };

    const calendarValSource = (date: string) => {
      return calendarVal(date) ? calendarVal(date)![calendarVal(date) ? calendarVal(date)!.length - 1 : 0].source : '';
    };

    const calendarValRD = (date: string) => {
      return calendarVal(date) ? calendarVal(date)![0].isRestDay : false;
    };

    setState({
      selected: {
        ...state.selected,
        date: DateTimeUtils.dateDashToDefault(day.dateString),
        entry: calendarVal(day.dateString)!,

        previous: {
          date: DateTimeUtils.dateDashToDefaultLessDay(day.dateString),
          source: calendarValSource(prevDate),
          isRestDay: calendarValRD(prevDate)!,
        },

        next: {
          date: DateTimeUtils.dateDashToDefaultAddDay(day.dateString),
          source: calendarValSource(nextDate),
          isRestDay: calendarValRD(nextDate)!,
        },
      },
    });
  };


  const onHandleMonthChange = (date: string) => {
    setState({
      selected: { ...state.selected, date: DateTimeUtils.dateDashToDefault(date), },
      calendarDate: DateTimeUtils.dateDashToDefault(date),
      isChangedMonth: true,
    });
  };

  const onHandleEffectI = async () => {
    await useFetch.Calendar(navigation, state, setState, handle, setHandle);
  };

  return (
    <Context.Provider
      value={{
        state,
        setState,
        handle,
        setHandle,

        onHandleSelectedDate,
        onHandlePressDate,
        onHandleMonthChange,
        onHandleEffectI,
      }}
    >
      {children}
    </Context.Provider>
  );
};
