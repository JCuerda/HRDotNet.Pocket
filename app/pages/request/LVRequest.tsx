// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import PageHeader from 'src/components/header/PageHeader';
import Loader from 'src/components/loader/Loader';
import { Utils } from 'src/utils/Utils';
import { UtilsDisplay } from 'src/utils/UtilsDisplay';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import { STRINGS, STYLES, ARRAY, DateTimeUtils } from 'src';
import { FieldLimit, ValuesLVRequest } from 'src/constants/Values';
import {
  StateLVRequest,
  TypeHandle,
  CheckboxData,
  TypeNavProp,
  ParamsRequestApplication,
  TypePanel,
  TypeReqAction,
} from 'src/types/Types';

const LVRequest: React.FC<TypeNavProp> = ({ navigation }) => {
  const styles = STYLES.NewRequest;
  const [onPanel] = useState<TypePanel[]>(ARRAY.panel)[0];
  const [onReqAction] = useState<TypeReqAction[]>(ARRAY.reqAction)[0];

  const params = useRoute()?.params as ParamsRequestApplication;
  let currParams: ParamsRequestApplication = {
    onPanel: onPanel.LV,
    onReqAction: params?.onReqAction,
    leaveType: params?.leaveType,
    leaveOption: params?.leaveOption,
    image: params?.image,
    data: params?.data,
  };

  const [checkboxData] = useState<CheckboxData[]>(ARRAY.leaveOption);
  const [state, setState] = useReducer(
    (state: StateLVRequest, newState: Partial<StateLVRequest>) => ({ ...state, ...newState }),
    ValuesLVRequest.State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesLVRequest.Handle,
  );

  useEffect(() => {
    const stateFilingData = setState(
      UtilsFetch.panelUpdateRequestFormData(currParams.onPanel, currParams.data) as StateLVRequest,
    );
    const handleFilingData = setHandle({ checkSelect: currParams?.data?.filing?.leaveOption?.id });

    (currParams.onReqAction !== onReqAction.Update
      ? (setState({}), stateFilingData, handleFilingData)
      : stateFilingData,
      handleFilingData);
  }, []);

  useEffect(() => {
    currParams.leaveType && setState({ leaveType: currParams.leaveType });
    currParams.leaveOption && setState({ leaveOption: currParams.leaveOption });
    currParams.image && setState({ attachment: currParams.image });
  }, [params]);

  const onHandleStartDate = (date: string) => {
    setHandle({ isDateFromPicker: false });
    setState({ startDate: DateTimeUtils.isoToDateDash(date), endDate: '' });
  };

  const onHandleEndDate = (date: string) => {
    setHandle({ isDateToPicker: false });
    setState({ endDate: DateTimeUtils.isoToDateDash(date) });
  };

  const onHandleCheck = (item: CheckboxData, index: number) => {
    setState({ leaveOption: item });
    setHandle({ checkSelect: index });
  };

  const onNextHandler = async () => {
    await Utils.checkHaveValueRequest(
      onPanel.LV,
      currParams.onReqAction,
      Utils.trimData(state),
      currParams.data,
      setHandle,
      navigation,
    );
  };

  const stateToUse = (() => {
    switch (currParams.onReqAction) {
      case onReqAction.Cancel:
        return state.cancelReason;

      case onReqAction.Review:
        return state.reviewReason;

      case onReqAction.Approve:
        return state.approveReason;

      default:
        return '';
    }
  })();

  const setStateToUse = (text: string) => {
    switch (currParams.onReqAction) {
      case onReqAction.Cancel:
        setState({ cancelReason: text });
        break;

      case onReqAction.Review:
        setState({ reviewReason: text });
        break;

      case onReqAction.Approve:
        setState({ approveReason: text });
        break;

      default:
        break;
    }
  };

  const reasonLabel = (() => {
    switch (currParams.onReqAction) {
      case onReqAction.Cancel:
        return STRINGS.requestFieldCancellationReason;

      case onReqAction.Review:
        return STRINGS.requestFieldReviewReason;

      case onReqAction.Approve:
        return STRINGS.requestFieldApproveReason;

      default:
        return STRINGS.requestFieldReason;
    }
  })();

  const isDisabled = currParams.onReqAction === onReqAction.Update

  return (
    <View style={styles.mainView}>
      <PageHeader name={Utils.panelPageHeaderTitle(currParams.onPanel, currParams.onReqAction)} />

      {handle.isLoading && <Loader />}

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <ScrollView>
          <View style={styles.container}>
            {currParams.onReqAction === onReqAction.Cancel ||
              currParams.onReqAction === onReqAction.Review ||
              currParams.onReqAction === onReqAction.Approve
              ? [
                UtilsDisplay.DisplayFieldTextInput(
                  handle.isInputCheck!,
                  STRINGS.requestFieldDocumentNo,
                  state.documentNo!,
                  true,
                  () => ({}),
                  false,
                ),

                UtilsDisplay.DisplayFieldTextInput(
                  handle.isInputCheck!,
                  reasonLabel,
                  stateToUse || '',
                  true,
                  setStateToUse,
                  true,
                  FieldLimit.reason.maxLength,
                  STRINGS.placeholderReason,
                  true,
                ),
              ]
              : [
                UtilsDisplay.DisplayButtonField(
                  true,
                  handle.isInputCheck!,
                  STRINGS.LVRequestFieldI,
                  state.leaveType?.name || '',
                  state.leaveType?.name,
                  STRINGS.tapSelectPlaceholder('Leave Type'),
                  () =>
                    navigation.navigate(STRINGS.pathSelectionList, {
                      currParams,
                      action: STRINGS.selectionListLVRequest,
                    }),
                  isDisabled,
                  true
                ),

                // <View style={styles.valueWrapper}>
                //     <View style={styles.timeView}>
                //         <Text style={styles.mediumText}>{STRINGS.LVRequestFieldII}</Text>
                //         <Text style={styles.valueCredit}>{state.availableCredits}</Text>
                //     </View>
                // </View>

                UtilsDisplay.DisplayFieldCheckbox(
                  checkboxData,
                  true,
                  handle.isInputCheck!,
                  handle.checkSelect!,
                  state.leaveOption.name!,
                  STRINGS.LVRequestFieldIII,
                  (item, index) => onHandleCheck(item as CheckboxData, index as number),
                  undefined,
                  undefined,
                  isDisabled
                ),

                UtilsDisplay.DisplayFieldWithIcon(
                  handle.isInputCheck!,
                  STRINGS.LVRequestFieldIV,
                  state.startDate,
                  true,
                  DateTimeUtils.dateDefaultToWord(state.startDate),
                  STRINGS.styledPlaceholderDateRange.startDate,
                  () => setHandle({ isDateFromPicker: true }),
                  'calendar',
                  true,
                  isDisabled
                ),

                UtilsDisplay.DisplayFieldWithIcon(
                  handle.isInputCheck!,
                  STRINGS.LVRequestFieldV,
                  state.endDate,
                  true,
                  DateTimeUtils.dateDefaultToWord(state.endDate),
                  STRINGS.styledPlaceholderDateRange.endDate,
                  () => setHandle({ isDateToPicker: true }),
                  'calendar',
                  true,
                  isDisabled
                ),

                UtilsDisplay.DisplayFieldTextInput(
                  handle.isInputCheck!,
                  STRINGS.requrestFieldReferenceNo,
                  state.referenceNo || '',
                  true,
                  (text: string) => setState({ referenceNo: text }),
                  true,
                  14,
                  STRINGS.placeholderReferenceNo
                ),

                UtilsDisplay.DisplayFieldTextInput(
                  handle.isInputCheck!,
                  STRINGS.requestFieldReason,
                  state.reason,
                  true,
                  (text: string) => setState({ reason: text }),
                  true,
                  FieldLimit.reason.maxLength,
                  STRINGS.placeholderReason,
                  true,
                ),

                UtilsDisplay.DisplayFieldAttachment(
                  handle.isInputCheck!,
                  STRINGS.fileAttachment,
                  state.attachment.uri || state.attachment.url!,
                  true,
                  () => navigation.navigate(STRINGS.pathCamera, currParams),
                  () => Utils.fileAttach(setState),
                  () => currParams,
                  true
                ),
              ]}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.button} onPress={onNextHandler}>
        <Text style={styles.textButton}>{STRINGS.next}</Text>
      </TouchableOpacity>

      {UtilsDisplay.DisplayDateTimePicker(
        handle.isDateFromPicker!,
        'date',
        (date: string) => onHandleStartDate(date),
        () => setHandle({ isDateFromPicker: false }),
        state.startDate ? DateTimeUtils.dateDefaultToDate(state.startDate) : DateTimeUtils.dayToDate(),
      )}

      {UtilsDisplay.DisplayDateTimePicker(
        handle.isDateToPicker!,
        'date',
        (date: string) => onHandleEndDate(date),
        () => setHandle({ isDateToPicker: false }),
        state.endDate ? DateTimeUtils.dateDefaultToDate(state.endDate) : DateTimeUtils.dayToDate(),
        state.startDate ? DateTimeUtils.dateDefaultToDate(state.startDate) : undefined,
      )}
    </View>
  );
};

export default LVRequest;
