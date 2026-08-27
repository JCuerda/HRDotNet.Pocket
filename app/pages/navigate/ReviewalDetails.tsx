// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useReducer, ReactNode } from 'react';
import { View, Text, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import LoaderPage from 'src/components/loader/LoaderPage';
import Toast from 'src/components/use/Toast';
import SuccessPrompt from 'src/components/prompt/SuccessPrompt';
import PageHeader from 'src/components/header/PageHeader';
import { Utils } from 'src/utils/Utils';
import { useFetch } from 'src/hooks/useFetch';
import { FilingStatus, ValuesRequestDetails } from 'src/constants/Values';
import { ARRAY, STYLES, DateTimeUtils, STRINGS, COLORS } from 'src';
import {
  ParamsRequestDetails,
  SchemaRequestApplications,
  TypeObjectValues,
  StateApplicationsDetails,
  TypeHandle,
  TypeNavStack,
  TypePanel,
  TypeReqAction,
} from 'src/types/Types';
import { useGlobalStore } from 'src/store/GlobalStore';
import { CancelActionFrom } from 'src/constants/Enum';

const ReviewalDetails: React.FC<TypeNavStack> = ({ navigation }) => {
  const [onPanel] = useState<TypePanel[]>(ARRAY.panel)[0];
  const [onReqAction] = useState<TypeReqAction[]>(ARRAY.reqAction)[0];

  const { setCancelActionFrom } = useGlobalStore()

  const params = useRoute().params as ParamsRequestDetails;
  const [state, setState] = useReducer(
    (state: StateApplicationsDetails, newState: Partial<StateApplicationsDetails>) => ({ ...state, ...newState }),
    ValuesRequestDetails(params).State,
  );
  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesRequestDetails(params).Handle,
  );

  const styles = STYLES.RequestDetails(state.data?.filing?.filingStatus?.name);

  const DisplayRow = (item: TypeObjectValues, index: number) => (
    <View style={[styles.rowWrapper, item.space && { marginTop: 25 }]} key={index}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.valueText}>{item.value}</Text>
    </View>
  );

  const DisplayContent = () => {
    let display: ReactNode = [];

    switch (params.onPanel) {
      case onPanel.COS:
        display = ARRAY.requestDetailsCOS(state.data).map((item: unknown, index: number) =>
          DisplayRow(item as TypeObjectValues, index),
        );
        break;

      case onPanel.OT:
      case onPanel.OFF:
        display = ARRAY.requestDetailsOTOFF(state.data).map((item: TypeObjectValues, index: number) =>
          DisplayRow(item, index),
        );
        break;

      case onPanel.LV:
        display = ARRAY.requestDetailsLV(state.data).map((item: unknown, index: number) =>
          DisplayRow(item as TypeObjectValues, index),
        );
        break;

      case onPanel.ML:
        display = ARRAY.requestDetailsML(state.data).map((item: unknown, index: number) =>
          DisplayRow(item as TypeObjectValues, index),
        );
        break;

      default:
        display = [];
        break;
    }

    return display;
  };

  const DisplayApprovalButton = () => {
    return (
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: COLORS.red }}
          onPress={() => {
            setCancelActionFrom(CancelActionFrom.Review)
            onRequestHandle(onReqAction.Cancel)
          }}
        >
          <Text style={styles.textButton}>{STRINGS.cancel}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.approveButton,
            {
              backgroundColor: COLORS.purple,
            },
          ]}
          onPress={() => onRequestHandle(onReqAction.Review)}
        >
          <FontAwesome name="search" size={24} color={COLORS.clearWhite} />
          <Text style={styles.textButton}>{STRINGS.review}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onRequestHandle = (reqAction: number) => {
    Utils.panelNavigateRequest(state.panel, reqAction, navigation, state.data);
  };

  const onHandleClosePrompt = () => {
    setHandle({ isSuccess: false, refreshing: !handle.refreshing });
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      await useFetch.ReviewalsById(navigation, state, setState, handle, setHandle);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [handle.refreshing]);

  return (
    <React.Fragment>
      <PageHeader name="Reviewal Details" />

      {handle.isToast!.show && <Toast handle={handle.isToast!} setHandle={setHandle} />}

      {handle.isLoading ? (
        <LoaderPage />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={handle.isLoading!}
              onRefresh={() => {
                setHandle({ isLoading: true, refreshing: !handle.refreshing });
              }}
            />
          }
        >
          <View style={styles.mainContainer}>
            <View style={styles.topContent}>
              <Text style={styles.topDate}>{DateTimeUtils?.isoToDateWord(state.data?.filing?.dateTransaction)}</Text>

              <View style={styles.rowWrapper}>
                {Utils.statusIcon(state.data?.filing?.filingStatus?.id)}
                <Text style={styles.topDate}>{state.data?.filing?.filingStatus?.name}</Text>
              </View>
            </View>

            <View style={styles.container}>
              <Shadow distance={3} offset={[1, 2]} style={styles.content}>
                <View style={[styles.rowWrapper]}>
                  <Text style={styles.titleText}>{'Name: '}</Text>
                  <Text style={styles.valueText}>{Utils.formatEmployeeName(state.data.name)}</Text>
                </View>
                {ARRAY.requestDetailsHeader(state.type, state.data as SchemaRequestApplications).map(
                  (item: TypeObjectValues, index: number) => DisplayRow(item, index),
                )}

                {DisplayContent()}

                <View style={[styles.rowWrapper, { marginTop: 20, marginBottom: 10 }]}>
                  <Text style={styles.titleText}>{STRINGS.cllnReferenceNo}</Text>

                  <Text style={styles.valueText}>{state.data?.filing?.referenceNo || STRINGS.blankLine}</Text>
                </View>

                <View style={[styles.rowWrapper, { marginTop: 20, marginBottom: 10 }]}>
                  <Text style={styles.titleText}>{STRINGS.cllnReason}</Text>

                  <Text style={styles.valueText}>{state.data?.filing?.reason || STRINGS.blankLine}</Text>
                </View>

                <View style={styles.rowWrapper2}>
                  <Text style={styles.titleText}>{STRINGS.cllnAttachedFile}</Text>

                  {state.data?.filing?.fileAttachment ? (
                    <TouchableOpacity onPress={() => navigation.navigate(STRINGS.pathAttachedFile, state.data)}>
                      <Text style={styles.attachText}>{STRINGS.viewAttachment}</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.valueText}>{STRINGS.blankLine}</Text>
                  )}
                </View>

                <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                  <Text style={styles.titleText}>{STRINGS.cllnStatus}</Text>

                  <Text style={styles.valueText}>{state.data?.filing?.filingStatus?.name}</Text>
                </View>
              </Shadow>
            </View>
          </View>

          <View style={styles.rowView}>
            {state.data?.filing?.filingStatus?.id === FilingStatus.Filed ? <DisplayApprovalButton /> : null}
          </View>

          <SuccessPrompt
            title={STRINGS.success}
            subTitle={STRINGS.successSingleReviewals(handle.isAction as number, state.data.filing.documentNo)}
            buttonText={STRINGS.okay}
            visible={handle.isSuccess!}
            onHandleClosePrompt={onHandleClosePrompt}
          />
        </ScrollView>
      )}
    </React.Fragment>
  );
};

export default ReviewalDetails;
