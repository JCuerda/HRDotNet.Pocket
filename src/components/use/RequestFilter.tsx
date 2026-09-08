// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useReducer, useEffect } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { PropsRequestSearch, StateApplicationsSearch } from 'src/types/Types';
import { APIMethods, ContentTypes, ValuesRequestSearch } from 'src/constants/Values';
import { UtilsDisplay } from 'src/utils/UtilsDisplay';
import { COLORS, STRINGS, STYLES, DateTimeUtils } from 'src';
import { Utils } from 'src/utils/Utils';
import { UtilsFetch } from 'src/utils/UtilsFetch';

const RequestFilter: React.FC<PropsRequestSearch> = ({ state, handle }) => {
  const styles = STYLES.ComponentRequestSearch;

  const [value, setValue] = useState<string>('');
  const [items, setItems] = useState<Array<unknown>>([]);
  const [open, setOpen] = useState<boolean>(false);

  const [componentState, setComponentState] = useReducer(
    (state: StateApplicationsSearch, newState: Partial<StateApplicationsSearch>) => ({ ...state, ...newState }),
    ValuesRequestSearch.State,
  );

  const actionState = () => {
    setComponentState({
      isVisibleFilter: false,
      searchDates: {},
      timePicker: false,
      fromPicker: false,
      toPicker: false,
    });

    handle[1]({ isVisibleFilter: false, isLoading: false });
    setValue('');
    setOpen(false);
  };

  const [isLogTypeDropdownOpen, setLogTypeDropdownOpen] = useState(false);
  const [logTypeValue, setLogTypeValue] = useState(null);
  const [logTypeItems, setLogTypeItems] = useState([
    { label: 'Time In', value: '1' },
    { label: 'Time Out', value: '2' },
  ]);

  const [isScheduleDropdownOpen, setScheduleeDropdownOpen] = useState(false);
  const [scheduleValue, setScheduleValue] = useState(null);
  const [scheduleItems, setScheduleItems] = useState([
    { label: '12:00', value: '1' },
    { label: '11:00', value: '2' },
  ]);

  const [isLeaveTypeDropdownOpen, setLeaveTypeDropdownOpen] = useState(false);
  const [leaveTypeValue, setLeaveTypeValue] = useState(null);
  const [leaveTypeItems, setLeaveTypeItems] = useState([
    { label: 'Sick Leave', value: 'Sick Leave' },
    { label: 'Vacation Leave', value: 'Vacation Leave' },
  ]);

  const [isDocStatusDropDownOpen, setDocStatusDropdownOpen] = useState(false);
  const [docStatusValue, setDocStatusValue] = useState(null);
  const [docStatusItems, setDocStatusItems] = useState([
    { label: 'Filed', value: 'Filed' },
    { label: 'Reviewed', value: 'Reviewed' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Posted', value: 'Posted' },
  ]);

  const handleClearSelect = () => {
    setDocStatusValue(null);
    setLeaveTypeValue(null);
    setScheduleValue(null);
    setLogTypeValue(null);
  };

  const onHandleSearchSubmit = () => {
    handle[1]({ isLoading: true });
    const exit = () => {
      state[1]({
        filterType: undefined,
        filterValue: undefined,
        displayValue: undefined,
        urlQuery: '',
      });
      setComponentState({
        search: '',
        searchDates: { from: '', to: '' },
      });
      // alert(ERRORS.blankSearchFields);

      return;
    };

    if (value.includes('Date') || value.includes('date')) {
      if (!componentState.searchDates?.from || !componentState.searchDates?.to) {
        exit();
      } else {
        if (value === STRINGS.filterDateFiled || value === STRINGS.filterDateFrom) {
          state[1]({
            displayValue: `Date Period: ${DateTimeUtils.getIsoDateWord(componentState.searchDates.from || '')} - ${DateTimeUtils.getIsoDateWord(componentState.searchDates.to || '')}`,
            filterValue: `${componentState.searchDates.from} - ${componentState.searchDates.to}`,
            filterType: value,
          });
        } else if (value === 'DateTransaction') {
          state[1]({
            displayValue: `Date Transaction: ${DateTimeUtils.getIsoDateWord(componentState.searchDates.from || '')} - ${DateTimeUtils.getIsoDateWord(componentState.searchDates.to || '')}`,
            filterValue: `${componentState.searchDates.from} - ${componentState.searchDates.to}`,
            filterType: value,
          });
        }
        handleClearSelect();

        state[1]({
          urlQuery:
            `&DateField=${value}&DateFrom=${componentState.searchDates?.from}` +
            `&DateTo=${componentState.searchDates?.to}&sortBy=-DocumentNo`,
        });
      }
    }
    // other filter
    else {
      // log filter
      if (value == 'logType') {
        state[1]({
          displayValue: `Log Type: ${logTypeItems.find((e) => e.value == String(logTypeValue))?.label}`,
          filterValue: `${String(logTypeValue)}`,
          filterType: value,
        });

        state[1]({ urlQuery: `&LogTypeId=${logTypeValue}&sortBy=-DocumentNo` });
        setDocStatusValue(null);
      } else if (value == 'Requested') {
        state[1]({
          displayValue: `Schedule: ${scheduleValue}`,
          filterValue: scheduleValue || '',
          filterType: value,
          urlQuery: `&RequestedSchedule=${scheduleValue}&sortBy=-DocumentNo`,
        });
        setDocStatusValue(null);
      } else if (value == 'LeaveParameter') {
        state[1]({
          urlQuery: `&LeaveParameter=${leaveTypeValue}&sortBy=-DocumentNo`,
          displayValue: `Leave Type: ${leaveTypeValue}`,
          filterValue: leaveTypeValue || '',
          filterType: value,
        });
      } else if (value == 'DocStatus') {
        state[1]({
          displayValue: `Status: ${docStatusValue}`,
          filterValue: docStatusValue || '',
          filterType: value,
          urlQuery: `&DocStatus=${docStatusValue}&sortBy=-DocumentNo`,
        });
        setLeaveTypeValue(null);
        setScheduleValue(null);
        setLogTypeValue(null);
      } else if (!value || !componentState.search) {
        exit();
      }
      // search filter
      else {
        if (value === 'DocumentNo') {
          state[1]({
            displayValue: `Document No: ${componentState.search}`,
            filterValue: componentState.search,
            filterType: value,
          });
        }

        state[1]({
          urlQuery: `&${value}=${componentState.search}&sortBy=-DocumentNo`,
        });

        handleClearSelect();
      }
    }

    actionState();
  };

  const DisplayView = (
    title: string,
    value: string | number,
    convert: string | number,
    placeholder: string,
    icon: React.ComponentProps<typeof Ionicons>['name'],
    press: () => void,
  ) => (
    <View style={styles.dateWrapper}>
      <Text style={styles.titleText}>{title}</Text>

      <View style={styles.dateView}>
        <Text style={styles.text}>{value ? convert : <Text style={styles.placeholder}>{placeholder}</Text>}</Text>

        <TouchableOpacity onPress={press}>
          <Ionicons name={icon} size={20} color={COLORS.darkGray} />
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    setItems([]);
    Utils.setItemRequestFilter(state[0]?.selectedButton, setItems);
    setComponentState({ isVisibleFilter: handle[0].isVisibleFilter });

    if (state[0]?.selectedButton == 0) {
      UtilsFetch.connect(
        APIMethods.GET,
        ContentTypes.JSON,
        `${process.env.EXPO_PUBLIC_REQUEST}/maintenance/schedules?pageSize=100`,
      )
        .then((response) => {
          if (Array.isArray(response.data.items)) {
            const mappedData = response.data.items.map((item: any, index: number) => ({
              label: item.name,
              value: item.name,
            }));
            setScheduleItems(mappedData);
          } else {
            console.error('response.data.items is not an array');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (state[0]?.selectedButton == 4) {
      UtilsFetch.connect(
        APIMethods.GET,
        ContentTypes.JSON,
        `${process.env.EXPO_PUBLIC_REQUEST}/leave-management/maintenance/leave-parameters?&pageSize=50`,
      )
        .then((response) => {
          if (Array.isArray(response.data.items)) {
            const mappedData = response.data.items.map((item: any, index: number) => ({
              label: item.name,
              value: item.name,
            }));
            setLeaveTypeItems(mappedData);
          } else {
            console.error('response.data.items is not an array');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [handle]);

  useEffect(() => {
    const type = state[0].filterType || '';
    const value = state[0].filterValue || '';

    setValue(type);
    if (type === 'DocumentNo') {
      setComponentState({ search: state[0].filterValue });
    } else if (
      type === STRINGS.filterDateFiled ||
      type === STRINGS.filterDateTransaction ||
      type === STRINGS.filterDateFrom ||
      type === STRINGS.fieldDateTransaction
    ) {
      const [from, to] = value.split(' - ');
      setComponentState({
        searchDates: {
          from,
          to,
        },
      });
    }
  }, [componentState.isVisibleFilter, state[0].filterType]);

  const handleClear = () => {
    setComponentState({
      search: '',
      searchDates: { from: '', to: '' },
    });
    setValue('');
    handleClearSelect();
  };
  return (
    <Modal
      transparent={true}
      visible={componentState.isVisibleFilter}
      onRequestClose={() => actionState()}
      hardwareAccelerated={true}
      animationType="fade"
    >
      <View style={styles.modalView}>
        <View style={styles.modalWrapper}>
          <FontAwesome
            name="close"
            size={20}
            color={COLORS.lighterGray}
            onPress={() => actionState()}
            style={styles.closeButton}
          />

          <DropDownPicker
            open={open}
            value={value}
            onChangeValue={() => {
              setComponentState({ search: '', searchDates: {} });
            }}
            items={items as React.ComponentProps<typeof DropDownPicker>['items']}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            modalAnimationType="fade"
            maxHeight={300}
            style={styles.dropdown}
            textStyle={{ fontFamily: 'Inter_400Regular' }}
            placeholderStyle={{ color: COLORS.lighterGray }}
            placeholder={STRINGS.placeholderFilter}
          />

          {value &&
            (value.includes('Date') || value.includes('date') ? (
              <React.Fragment>
                {DisplayView(
                  STRINGS.from,
                  componentState.searchDates?.from!,
                  DateTimeUtils.dateDefaultToWord(componentState.searchDates?.from!),
                  STRINGS.placeholderDate,
                  'calendar',
                  () => setComponentState({ fromPicker: true }),
                )}

                {DisplayView(
                  STRINGS.to,
                  componentState.searchDates?.to!,
                  DateTimeUtils.dateDefaultToWord(componentState.searchDates?.to!),
                  STRINGS.placeholderDate,
                  'calendar',
                  () => setComponentState({ toPicker: true }),
                )}
              </React.Fragment>
            ) : value.includes('Time') ? (
              DisplayView(
                STRINGS.time,
                componentState.search,
                DateTimeUtils.timeSecondsToUnits(componentState.search),
                STRINGS.placeholderTime,
                'time',
                () => setComponentState({ timePicker: true }),
              )
            ) : value.includes('logType') ? (
              <DropDownPicker
                open={isLogTypeDropdownOpen}
                value={logTypeValue}
                items={logTypeItems}
                setOpen={setLogTypeDropdownOpen}
                setValue={setLogTypeValue}
                setItems={setLogTypeItems}
                style={{ marginVertical: 10 }}
                zIndex={10}
              />
            ) : value.includes('LeaveParameter') ? (
              <DropDownPicker
                open={isLeaveTypeDropdownOpen}
                value={leaveTypeValue}
                items={leaveTypeItems}
                setOpen={setLeaveTypeDropdownOpen}
                setValue={setLeaveTypeValue}
                setItems={setLeaveTypeItems}
                style={{ marginVertical: 10 }}
                zIndex={10}
              />
            ) : value.includes('Requested') ? (
              <DropDownPicker
                open={isScheduleDropdownOpen}
                value={scheduleValue}
                items={scheduleItems}
                setOpen={setScheduleeDropdownOpen}
                setValue={setScheduleValue}
                setItems={setScheduleItems}
                style={{ marginVertical: 10 }}
                zIndex={10}
              />
            ) : value.includes('DocStatus') ? (
              <DropDownPicker
                open={isDocStatusDropDownOpen}
                value={docStatusValue}
                items={docStatusItems}
                setOpen={setDocStatusDropdownOpen}
                setValue={setDocStatusValue}
                setItems={setDocStatusItems}
                style={{ marginVertical: 10 }}
                zIndex={10}
                placeholder={STRINGS.placeholderDocStatus}
              />
            ) : (
              <View style={styles.row}>
                <FontAwesome name="search" size={20} color={COLORS.orange} />

                <TextInput
                  value={componentState.search}
                  autoCorrect={false}
                  cursorColor={COLORS.lighterGray}
                  onChangeText={(text) => setComponentState({ search: text })}
                  placeholder={STRINGS.placeholderSearch}
                  placeholderTextColor={COLORS.lighterGray}
                  style={styles.search}
                />
              </View>
            ))}

          {UtilsDisplay.DisplayDateTimePicker(
            componentState.fromPicker,
            'date',
            (date: string) => {
              setComponentState({
                fromPicker: false,
                searchDates: {
                  to: '',
                  from: DateTimeUtils.isoToDateDefault(date),
                },
              });
            },
            () => setComponentState({ fromPicker: false }),
            componentState.searchDates?.from!
              ? DateTimeUtils.dateDefaultToDate(componentState.searchDates?.from!)
              : new Date(),
          )}

          {UtilsDisplay.DisplayDateTimePicker(
            componentState.toPicker,
            'date',
            (date: string) => {
              setComponentState({
                toPicker: false,
                searchDates: {
                  ...componentState.searchDates,
                  to: DateTimeUtils.isoToDateDefault(date),
                },
              });
            },
            () => setComponentState({ toPicker: false }),
            componentState.searchDates?.to!
              ? DateTimeUtils.dateDefaultToDate(componentState.searchDates?.to!)
              : new Date(),

            componentState.searchDates?.from!
              ? DateTimeUtils.dateDefaultToDate(componentState.searchDates?.from!)
              : new Date(),
          )}

          <View style={styles.rowBtn}>
            <TouchableOpacity onPress={handleClear} style={styles.borderButton}>
              <Text style={styles.borderButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onHandleSearchSubmit} style={styles.button}>
              <Text style={styles.buttonText}>{STRINGS.filter}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RequestFilter;
