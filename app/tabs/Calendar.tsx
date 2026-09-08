// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';

import { Calendar as CalendarView } from 'react-native-calendars';
import * as Animatable from 'react-native-animatable';

import Toast from 'src/components/use/Toast';
import TabHeader from 'src/components/header/TabHeader';
import LoaderPage from 'src/components/loader/LoaderPage';
import CalendarItem from 'src/components/item/CalendarItem';
import { ARRAY, COLORS, STRINGS, DateTimeUtils } from 'src';
import { STYLES_CALENDAR } from 'src/constants/styles/Calendar';
import { useCalendar } from 'src/contexts/tabs';
import { StateCalendar } from 'src/types/Types';
import MonthYearPicker from 'src/components/modal/MonthYearPicker';
import { useFocusEffect } from '@react-navigation/native';

const Calendar: React.FC = () => {
  const styles = STYLES_CALENDAR.Calendar;
  const { state, setState, handle, setHandle, onHandlePressDate, onHandleMonthChange, onHandleEffectI } = useCalendar();

  const [markedDates, setMarkedDates] = useState<StateCalendar['markedDates']>();

  useFocusEffect(
    useCallback(() => {
      onHandleEffectI();
    }, [state.calendarDate, state.isChangedMonth]),
  );


  useEffect(() => {
    const selectedDate = state.selected.date;

    if (!selectedDate) {
      return;
    }

    const formattedSelectedDate =
      `${selectedDate.substring(0, 4)}-${selectedDate.substring(4, 6)}-${selectedDate.substring(6, 8)}`;

    setMarkedDates(() => {
      const updatedMarkedDates = {
        ...(state.markedDates ?? {}),
      };

      Object.keys(updatedMarkedDates).forEach((date) => {
        if (updatedMarkedDates[date]?.selected) {
          delete updatedMarkedDates[date].selected;
          delete updatedMarkedDates[date].selectedColor;
        }
      });

      updatedMarkedDates[formattedSelectedDate] = {
        ...updatedMarkedDates[formattedSelectedDate],
        selected: true,
        selectedColor: COLORS.orange,
      };

      return updatedMarkedDates;
    });
  }, [state.selected.date, state.markedDates, state.isChangedMonth]);


  return (
    <React.Fragment>
      <StatusBar backgroundColor={COLORS.powderBlue} barStyle="light-content" />

      <TabHeader headerName={STRINGS.tabTitleCalendar} />

      {handle.isToast!.show && <Toast handle={handle.isToast!} setHandle={setHandle} />}

      {/* {handle.isLoadMore == true && (<Loader />)} */}

      {handle.isLoading ? (
        <LoaderPage />
      ) : (
        <Animatable.View
          animation={'fadeIn'}
          duration={900}
          style={styles.container}
          onAnimationBegin={() => onHandlePressDate({ dateString: DateTimeUtils.getCurrDateDash() })}
        >
          <CalendarView
            renderHeader={(date: any) => {
              return (
                <View style={{ backgroundColor: COLORS.clearWhite, flexDirection: 'row', gap: 2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setState({ isMonthModalVisible: !state.isMonthModalVisible });
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.calendarHeaderButtonText}>
                      {ARRAY.months?.find((month) => month.value === (state.selectedMonth as any))?.label}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setState({ isYearModalVisible: !state.isYearModalVisible });
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.calendarHeaderButtonText}>{state.selectedYear}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            displayLoadingIndicator={handle.isLoadMore}
            markingType={'multi-dot'}
            markedDates={markedDates}
            style={styles.calendarView}
            showSixWeeks={false}
            enableSwipeMonths={true}
            headerStyle={{ backgroundColor: COLORS.clearWhite }}
            theme={{
              dotColor: COLORS.clearWhite,
              todayTextColor: COLORS.orange,
              arrowColor: COLORS.powderBlue,
              textDayFontFamily: 'Inter_400Regular',
              textDayHeaderFontFamily: 'Inter_500Medium',
              textMonthFontFamily: 'Inter_600SemiBold',
            }}
            onMonthChange={(params: { dateString: string }) => {
              const date = new Date(params.dateString);
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const year = date.getFullYear();
              setState({ selectedMonth: String(month), selectedYear: String(year) });
              onHandleMonthChange(params.dateString);
            }}
            key={state.selectedDate}
            current={state.selectedDate}
            firstDay={1}
            disableArrowLeft={handle.isLoadMore}
            disableArrowRight={handle.isLoadMore}
            onDayPress={(day: { dateString: string }) => onHandlePressDate(day)}
          />

          <MonthYearPicker />
          <CalendarItem />
        </Animatable.View>
      )}
    </React.Fragment>
  );
};
export default Calendar;
