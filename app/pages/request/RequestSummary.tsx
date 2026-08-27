// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useReducer } from 'react';
import { useRoute } from '@react-navigation/native';

import PageHeader from 'src/components/header/PageHeader';
import SummaryPanel from 'src/components/panel/request/SummaryPanel';
import Toast from 'src/components/use/Toast';
import { STRINGS, ARRAY } from 'src';
import { useFetch } from 'src/hooks/useFetch';
import {
  PropsRequestSummary,
  TypeHandle,
  TypeNavStack,
  SchemaRequestApplications,
  TypeReqAction,
  StateApplicationsDetails,
  ParamsRequestDetails,
} from 'src/types/Types';
import { ValuesRequestDetails, ValuesRequestSummary } from 'src/constants/Values';
import { useGlobalStore } from 'src/store/GlobalStore';
import { CancelActionFrom } from 'src/constants/Enum';

const RequestSummary: React.FC<TypeNavStack> = ({ navigation }) => {
  const [onReqAction] = useState<TypeReqAction[]>(ARRAY.reqAction)[0];
  const { employeeName, cancelActionFrom, setSelectedApplicationTab, selectedApplicationTab } = useGlobalStore();

  const params = useRoute().params as {
    onPanel?: number;
    onReqAction?: number;
    props?: unknown;
    data?: unknown;
  };

  const reviewParams = useRoute().params as ParamsRequestDetails;

  const [state, setState] = useReducer(
    (state: StateApplicationsDetails, newState: Partial<StateApplicationsDetails>) => ({ ...state, ...newState }),
    ValuesRequestDetails(reviewParams).State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesRequestSummary.Handle,
  );

  const currPanel: number = params.onPanel || 0;
  const currOnReqAction = params.onReqAction as number;
  const currProps = params.props as PropsRequestSummary; // Form values state
  const currUpdateProps = params.data as SchemaRequestApplications;


  const onHandleClosePrompt = () => {
    setHandle({ isSuccess: false });

    let destination: string | undefined;

    switch (params.onReqAction) {
      case onReqAction.Review:
        destination = STRINGS.pathReviewals;
        break;

      case onReqAction.Approve:
        destination = STRINGS.pathApprovals;
        break;

      case onReqAction.Cancel:
        if (cancelActionFrom === CancelActionFrom.Review) {
          destination = STRINGS.pathReviewals;
        } else if (cancelActionFrom === CancelActionFrom.Approve) {
          destination = STRINGS.pathApprovals;
        } else {
          destination = undefined;
        }
        break;
    }

    if (destination) {
      navigation.navigate(destination, {
        refresh: true,
      });
    } else {
      navigation.navigate(STRINGS.pathTabStack, {
        screen: STRINGS.pathTabRequest,
        params: { refresh: true },
      });
    }
  };

  const onHandleSubmit = () => {
    (async () => {
      try {
        setHandle({ isLoading: true });
        setSelectedApplicationTab(currPanel)
        if (onReqAction.Review === params.onReqAction) {
          await useFetch.NewSingleReviews(
            navigation,
            state,
            JSON.stringify({ ...currProps }),
            setState,
            handle,
            setHandle,
            employeeName,
          );
        } else if (onReqAction.Approve === params.onReqAction) {
          await useFetch.NewSingleApprovals(
            navigation,
            state,
            JSON.stringify({ ...currProps }),
            setState,
            handle,
            setHandle,
            employeeName,
          );
        } else {
          await useFetch.SubmitRequest(
            navigation,
            currPanel,
            currOnReqAction,
            JSON.stringify({ ...currProps }),
            currUpdateProps,
            handle,
            setHandle,
            employeeName,
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setHandle({ isLoading: false });
      }
    })();
  };

  const requestActionTitle: Record<number, string> = {
    [onReqAction.New]: '',
    [onReqAction.Update]: STRINGS.update,
    [onReqAction.Review]: STRINGS.review,
    [onReqAction.Approve]: STRINGS.approve,
    [onReqAction.Cancel]: STRINGS.cancel,
  };

  return (
    <React.Fragment>
      <PageHeader name={`${STRINGS.pageTitleReqSummary} ${requestActionTitle[currOnReqAction] || ''}`} />
      {handle.isToast!.show && <Toast handle={handle.isToast!} setHandle={setHandle} />}

      <SummaryPanel
        panel={currPanel}
        reqAction={currOnReqAction}
        data={currProps}
        handle={handle}
        onHandleSubmit={onHandleSubmit}
        onHandleClosePrompt={onHandleClosePrompt}
      />
    </React.Fragment>
  );
};

export default RequestSummary;
