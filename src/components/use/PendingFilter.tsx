/**
 * @project       HRDotNet-Mobile
 * @description   Pending Filter
 * @author        Hersvin Fred Labastida, Jessie Cuerda
 * @date_created  10-10-2024
 */

//--- React Modules
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
//--- Expo Icons
import { FontAwesome } from '@expo/vector-icons';
//--- Other Modules
import { DateTimeUtils } from 'src/utils/DateTimeUtils';
import { COLORS } from 'src/constants/Colors';
import { STRINGS } from 'src/constants/Strings';
import { STYLES } from 'src/constants/styles/Styles';
import { usePending } from 'src/contexts/pages';
import { PendingStates } from 'src/types/Pending';

const PendingFilter = ({
  visible,
  state,
  close,
  onHandleSearchSubmit,
}: {
  visible: boolean;
  state: PendingStates;
  close: () => void;
  onHandleSearchSubmit: (index?: number, value?: string, fromDate?: string, toDate?: string) => void;
}) => {
  const styles = STYLES.ComponentRequestSearch;
  const { setState } = usePending();

  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(0);
  const [items, setItems] = React.useState([
    { label: 'Application Type', value: 1 },
    { label: 'Transaction Date', value: 2 },
    { label: 'Document No', value: 3 },
    { label: 'Work Date', value: 4 },
  ]);

  const [selectedApplication, setSelectedApplication] = useState('')
  const [searchText, setSearchText] = React.useState<string>('');
  const [fromDate, setFromDate] = React.useState<string>('');
  const [toDate, setToDate] = React.useState<string>('');

  const [isVisibleFrom, setIsVisibleFrom] = React.useState<boolean>(false);
  const [isVisibleTo, setIsVisibleTo] = React.useState<boolean>(false);

  const getDate = () => {
    return searchText ? new Date() : new Date();
  };

  const [show, setShow] = React.useState<boolean>(false);
  const [filing, setFiling] = React.useState([
    { label: 'Official Business', value: 'OB' },
    { label: 'Change of Schedules', value: 'COS' },
    { label: 'Overtime ', value: 'OT' },
    { label: 'Offset ', value: 'OFF' },
    { label: 'Leave', value: 'LV' },
    { label: 'Missed Log', value: 'ML' },
  ]);

  const renderContent = () => {
    switch (value) {
      case 1:
        return (
          <View style={[styles.row, { paddingHorizontal: 20 }]}>
            <DropDownPicker
              open={show}
              value={selectedApplication}
              items={filing as React.ComponentProps<typeof DropDownPicker>['items']}
              setOpen={setShow}
              setValue={setSelectedApplication}
              setItems={setFiling}
              modalAnimationType="fade"
              maxHeight={200}
              zIndex={2000}
              style={{ width: '100%' }}
              textStyle={{ fontFamily: 'Inter_400Regular' }}
              placeholderStyle={{ color: COLORS.lighterGray }}
              placeholder={STRINGS.placeholderFilter}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.row}>
            <View style={styles.searchTwo}>
              <Pressable onPress={() => setIsVisibleFrom(true)}>
                <TextInput
                  placeholder="Date From"
                  value={fromDate}
                  onChangeText={(text) => setSearchText(text)}
                  editable={false}
                  placeholderTextColor="black"
                  style={{ fontSize: 14, paddingHorizontal: 15, borderWidth: 1, borderRadius: 20, paddingVertical: 5, flexShrink: 1, flexWrap: "wrap" }}
                  onTouchStart={() => setIsVisibleFrom(true)}
                />
                <DateTimePicker
                  isVisible={isVisibleFrom}
                  mode="date"
                  textColor="black"
                  accentColor={COLORS.powderBlue}
                  date={fromDate ? DateTimeUtils.formatToDefaultDate(fromDate) : getDate()}
                  onConfirm={(date) => {
                    setFromDate(DateTimeUtils.dateDefaultToWord(date.toISOString()));
                    setToDate("")
                    setIsVisibleFrom(false);
                  }}
                  onCancel={() => setIsVisibleFrom(false)}
                />
              </Pressable>
              <Pressable onPress={() => setIsVisibleTo(true)}>
                <TextInput
                  placeholder="Date To"
                  value={toDate}
                  onChangeText={(text) => setSearchText(text)}
                  editable={false}
                  placeholderTextColor="black"
                  style={{ fontSize: 14, paddingHorizontal: 15, borderWidth: 1, borderRadius: 20, paddingVertical: 5, flexShrink: 1, flexWrap: "wrap" }}
                  onTouchStart={() => setIsVisibleTo(true)}
                />
                <DateTimePicker
                  isVisible={isVisibleTo}
                  mode="date"
                  textColor="black"
                  accentColor={COLORS.powderBlue}
                  date={toDate ? DateTimeUtils.formatToDefaultDate(toDate) : getDate()}
                  minimumDate={DateTimeUtils.formatToDefaultDate(fromDate)}
                  onConfirm={(date) => {
                    setToDate(DateTimeUtils.dateDefaultToWord(date.toISOString()));
                    setIsVisibleTo(false);
                  }}
                  onCancel={() => setIsVisibleTo(false)}
                />
              </Pressable>
            </View>
          </View>
        );
      case 3:

        return (
          <View style={[styles.row, { paddingHorizontal: 20 }]}>
            <FontAwesome name="search" size={20} color={COLORS.orange} />
            <TextInput
              style={styles.search}
              placeholder="Enter search text"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.row}>
            <View style={styles.searchTwo}>
              <Pressable onPress={() => setIsVisibleFrom(true)}>
                <TextInput
                  placeholder="Date From"
                  value={fromDate}
                  onChangeText={(text) => setSearchText(text)}
                  editable={false}
                  placeholderTextColor="black"
                  style={{ fontSize: 14, paddingHorizontal: 15, borderWidth: 1, borderRadius: 20, paddingVertical: 5 }}
                  onTouchStart={() => setIsVisibleFrom(true)}
                />
                <DateTimePicker
                  isVisible={isVisibleFrom}
                  mode="date"
                  textColor="black"
                  accentColor={COLORS.powderBlue}
                  date={getDate()}
                  onConfirm={(date) => {
                    setFromDate(DateTimeUtils.dateDefaultToWord(date.toISOString()));
                    setToDate("")
                    setIsVisibleFrom(false);
                  }}
                  onCancel={() => setIsVisibleFrom(false)}
                />
              </Pressable>
              <Pressable onPress={() => setIsVisibleTo(true)}>
                <TextInput
                  placeholder="Date To"
                  value={toDate}
                  onChangeText={(text) => setSearchText(text)}
                  editable={false}
                  placeholderTextColor="black"
                  style={{ fontSize: 14, paddingHorizontal: 15, borderWidth: 1, borderRadius: 20, paddingVertical: 5 }}
                  onTouchStart={() => setIsVisibleTo(true)}
                />
                <DateTimePicker
                  isVisible={isVisibleTo}
                  mode="date"
                  textColor="black"
                  accentColor={COLORS.powderBlue}
                  date={toDate ? DateTimeUtils.formatToDefaultDate(toDate) : getDate()}
                  minimumDate={DateTimeUtils.formatToDefaultDate(fromDate)}
                  onConfirm={(date) => {
                    setToDate(DateTimeUtils.dateDefaultToWord(date.toISOString()));
                    setIsVisibleTo(false);
                  }}
                  onCancel={() => setIsVisibleTo(false)}
                />
              </Pressable>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (visible) {
      if (state?.filterLabel?.includes("Application Type")) {
        setValue(1)
        const valueFiling = filing.find(
          item => item.value.trim() === state?.filterText?.trim()
        )?.value;
        setSearchText(valueFiling || "")
      } else if (state?.filterLabel?.includes("Date")) {

        if (state?.filterLabel?.includes("Transaction Date")) {
          setValue(2)
        } else if (state?.filterLabel?.includes("Work Date")) {
          setValue(4)
        }

        setFromDate(state.fromDate)
        setToDate(state.toDate)
      } else if (state?.filterLabel?.includes("Document")) {
        setValue(3)
        setSearchText(state.filterText)
      } else {
        setValue(0)
        setSearchText('')
        setFromDate('')
        setToDate('')
      }
    }
  }, [visible])

  return (
    <React.Fragment>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={close}
        hardwareAccelerated={true}
        animationType="fade"
      >
        <View style={styles.modalView}>
          <View style={styles.modalWrapper}>
            <FontAwesome name="close" size={20} color={COLORS.lighterGray} onPress={close} style={styles.closeButton} />

            <View style={{ paddingHorizontal: 20 }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items as React.ComponentProps<typeof DropDownPicker>['items']}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                modalAnimationType="fade"
                maxHeight={200}
                style={styles.dropdown}
                textStyle={{ fontFamily: 'Inter_400Regular' }}
                placeholderStyle={{ color: COLORS.lighterGray }}
                placeholder={STRINGS.placeholderFilter}
              />
            </View>


            {renderContent()}
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>

              <TouchableOpacity
                onPress={() => {
                  setValue(0);
                  setSearchText('');
                  // setState({
                  //   filterText: '',
                  //   fromDate: '',
                  //   toDate: '',
                  // });
                  setFromDate('');
                  setToDate('');

                }}
                style={styles.borderButton}
              >
                <Text style={styles.borderButtonText}>Clear</Text>
              </TouchableOpacity>

              <Pressable
                onPress={() => {
                  if (value == 1 || value == 3) {
                    const valueToUse = value === 1 ? selectedApplication : searchText
                    onHandleSearchSubmit(value ?? 0, valueToUse, '', '');
                  } else if (value == 2 || value == 4) {
                    onHandleSearchSubmit(value ?? 0, '', fromDate, toDate);
                  } else {
                    onHandleSearchSubmit(0, '', '', '');
                  }
                  close();
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {STRINGS.filter}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default PendingFilter;
