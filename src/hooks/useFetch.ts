// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ARRAY } from '../constants/Array';
import { ERRORS } from '../constants/Errors';
import { STRINGS } from '../constants/Strings';
import { DateTimeUtils } from '../utils/DateTimeUtils';
import { Utils } from 'src/utils/Utils';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Schedules,
  StateOTOFFRequest,
  StateCalendar,
  StateApplications,
  TypeHandle,
  StateHome,
  StateTimesheet,
  StateLoanDetails,
  StateLogin,
  StateTimeClock,
  PropsRequestSummary,
  TimeRecords,
  TypeError,
  StatePersonal,
  StatePayslip,
  StateClockInOut,
  StateLoanLedger,
  SchemaRequestApplications,
  SchemaCalendar,
  TypeSchemaPayslip,
  TypeNavStack,
  ParamsAttachedFile,
  TypeTimeOff,
  StateApplicationsDetails,
  SchemaApprovalsManager,
  TypeReqAction,
  TypeApprovalPromptItem,
  LocationLang,
  StateTimeOff,
  LeaveLedgerEntries,
} from 'src/types/Types';

import {
  APIMethods,
  ApprovalsAction,
  ApprovalsType,
  ContentTypes,
  FilingStatus,
  Schedules as ScheduleVal,
  StatusCode,
  TimeRecord,
  ValuesSchemaCalendarEntries,
} from 'src/constants/Values';
import { jwtDecode } from 'jwt-decode';
import { PersonalStates } from 'src/types/Profile';
import { TeamSchema, TeamsStates } from 'src/types/Teams';
import { FilingPanel } from 'src/constants/Enum';
import { useGlobalStore } from 'src/store/GlobalStore';
import { State } from 'react-native-gesture-handler';
import { COLORS } from 'src/constants/Colors';

export const useFetch = {
  Refresh: async (nav: StackNavigationProp<ParamListBase>, callback?: () => void) => {
    let refreshToken: string = '';

    await AsyncStorage.getItem('RT').then((token: string | null) => {
      refreshToken = token ? JSON.parse(token)[0].split(';')[0]?.split('=')[1] : '';
    });

    const exit = async () => {
      Utils.alertSingle(ERRORS.sessionExpired, STRINGS.sessionExpired, async () => {
        await AsyncStorage.multiRemove(['RT', 'AT', 'Code']);
        nav.replace(STRINGS.pathLogin);
      });
    };

    await UtilsFetch.connect(
      APIMethods.POST,
      ContentTypes.JSON,
      `${process.env.EXPO_PUBLIC_REFRESH}`,
      undefined,
      `refreshToken=${refreshToken}`,
    )
      .then((response: { data: { accessToken: string }; status: number }) => {
        AsyncStorage.setItem('AT', JSON.stringify(response.data.accessToken));
        callback && callback();
      })
      .catch((error: Error) => {
        exit();
      });
  },

  ProcessedSchedule: async (
    nav: TypeNavStack['navigation'],
    state: StateOTOFFRequest,
    setState: React.Dispatch<Partial<StateOTOFFRequest>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    const dateQuery = state.date ? DateTimeUtils.dateDashToDefault(state.date) : DateTimeUtils.getCurrDateDefault();

    await UtilsFetch.connect(
      APIMethods.GET,
      ContentTypes.JSON,
      `${process.env.EXPO_PUBLIC_PROCESSED_SCHED + dateQuery}`,
    )
      .then((response: { data: { schedule: Schedules } }) => {
        setState({ schedule: response.data.schedule });
      })
      .catch(async (error: TypeError) => {
        const errors = await UtilsFetch.catchErrors(error);
        await UtilsFetch.catchEvent({
          error: error,
          setHandle: setHandle,
          toastSet: errors.code === 0 ? 0 : 1,
          toastMessage: UtilsFetch.requestError(
            errors.code,
            errors.parsed,
            UtilsFetch.handleErrorException(errors.response, ERRORS.appFilingException),
          ),
        });
      });
  },

  TimeRecord: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateOTOFFRequest,
    setState: React.Dispatch<Partial<StateOTOFFRequest>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    if (state.date == undefined) {
      return;
    }
    await UtilsFetch.connect(
      APIMethods.GET,
      ContentTypes.JSON,
      `${process.env.EXPO_PUBLIC_TIMERECORDS + DateTimeUtils.dateDashToDefault(state.date)}`,
    )
      .then((response: { data: { timeRecords: TimeRecords[] } }) => {
        setState({
          timeRecord: [
            {
              date: DateTimeUtils.timeWithSeconds(response.data.timeRecords[0].date),
              source: response.data.timeRecords[0].source,
            },
            {
              date: DateTimeUtils.timeWithSeconds(response.data.timeRecords[1].date),
              source: response.data.timeRecords[1].source,
            },
          ],
        });
      })
      .catch(async (error: TypeError) => {
        const errors = await UtilsFetch.catchErrors(error);

        setState({
          timeRecord: TimeRecord,
          schedule: ScheduleVal,
        });
        await UtilsFetch.catchEvent({
          error: error,
          setHandle: setHandle,
          onRefresh: () => useFetch.Refresh(nav, () => useFetch.TimeRecord(nav, state, setState, handle, setHandle)),
          toastSet: errors.code === StatusCode.InternalServerError ? 0 : 1,
          toastMessage: errors.code === StatusCode.InternalServerError ? ERRORS.connFailed : errors.parsed,
        });
      });
  },

  LoginMount: async (
    navigation: StackNavigationProp<ParamListBase>,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    try {
      setHandle({ isLoading: true });
      const local = await AsyncStorage.multiGet(['RT', 'AT', 'Code']);

      local[0][1] &&
        local[1][1] &&
        local[2][1] &&
        Utils.resetNavigation(navigation, STRINGS.pathTabStack, STRINGS.pathTabHome);
    } catch (error) {
    } finally {
      setHandle({ isLoading: false });
    }
  },

  Login: async (
    state: StateLogin,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
    navigation: StackNavigationProp<ParamListBase>,
  ) => {
    await UtilsFetch.connect(APIMethods.POST, ContentTypes.JSON, `${process.env.EXPO_PUBLIC_LOGIN}`, {
      username: state.username,
      password: state.password,
    })
      .then((response: { data: { accessToken: string }; headers: { 'set-cookie'?: string[] } }) => {
        AsyncStorage.multiSet([
          ['RT', JSON.stringify(response.headers['set-cookie'])],
          ['AT', JSON.stringify(response.data.accessToken)],
          ['Code', JSON.stringify(state.username)],
          ['ClockedData', ''],
        ]);
        Utils.resetNavigation(navigation, STRINGS.pathTabStack, STRINGS.pathTabHome);
      })
      .catch(async (errors) => {
        const errors1 = await UtilsFetch.catchErrors(errors);

        await UtilsFetch.catchEvent({
          error: errors,
          setHandle: setHandle,
          toastMessage:
            errors.request.status === StatusCode.BadRequest
              ? `${errors.response.data.errors[0].message} ${process.env.EXPO_PUBLIC_LOGIN} ${JSON.stringify(errors1, null, 2)}  `
              : `${ERRORS.error}  ${process.env.EXPO_PUBLIC_LOGIN} ${JSON.stringify(errors1, null, 2)}`,
        });
      });
  },

  TimeClock: async (setState: React.Dispatch<Partial<StateTimeClock>>) => {
    try {
      await AsyncStorage.getItem('ClockedData').then((data: string | null) => {
        data && setState({ clocked: JSON.parse(data) });
      });
    } catch (error) {
      console.error(error);
    }
  },

  Calendar: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateCalendar,
    setState: React.Dispatch<Partial<StateCalendar>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,

  ) => {
    const selectedDate = state.selected.date
    const dayString = `${selectedDate.slice(0, 4)}-${selectedDate.slice(4, 6)}-${selectedDate.slice(6, 8)}`;

    setHandle(handle.isLoading ? { isLoading: true } : { isLoadMore: true });

    await UtilsFetch.connect(
      APIMethods.GET,
      ContentTypes.JSON,
      `${process.env.EXPO_PUBLIC_CALENDAR}?Date=${state.calendarDate}`,
    )
      .then((response: { data: SchemaCalendar }) => {
        const holidayDates: string[] =
          response.data.calendarDates?.reduce((acc: string[], current: any) => {
            current.entries.forEach((entry: any) => {
              const entrySource = entry.source.toLowerCase();
              if (ARRAY.sourceColorMap.some(({ source }) => entrySource.includes(source))) {
                if (!acc.includes(current.date)) {
                  acc.push(String(current.date));
                }
              }
            });
            return acc;
          }, []) || [];

        const markedDates = response.data.calendarDates?.reduce((acc: any, item: any) => {
          if (holidayDates.includes(item.date)) {
            const dots = item.entries?.reduce((colors: any[], entry: any) => {
              const entrySource = entry.source.toLowerCase();
              const sourceObject = ARRAY.sourceColorMap.find(({ source }) => entrySource.includes(source));
              if (sourceObject && !colors.some((c) => c.color === sourceObject.color)) {
                if (entrySource == "filo" && entry.dateTimeRange.dateFrom === STRINGS.calendarInitialDate && entry.dateTimeRange.dateTo === STRINGS.calendarInitialDate) {
                  colors.push({ color: COLORS.red, key: `${item.date}-${sourceObject.source}-${colors.length}` });
                } else {
                  colors.push({ color: sourceObject.color, key: `${item.date}-${sourceObject.source}-${colors.length}` });
                }
              }

              return colors;
            }, []);

            if (dots?.length) {
              acc[item.date.slice(0, 10)] = { dots };
            }
          }

          return acc;
        }, {});


        if (state.isChangedMonth) {

          const prevDate: string = DateTimeUtils.dateDashToDefaultLessDay(dayString);
          const nextDate: string = DateTimeUtils.dateDashToDefaultAddDay(dayString);

          const calendarVal = (date: string) => {
            const dateVal = DateTimeUtils.dateDashToWithTZ(date);
            return response.data.calendarDates!?.find((dateEntry: { date: string }) => dateEntry.date === dateVal)?.entries;
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
              date: DateTimeUtils.dateDashToDefault(dayString),
              entry: calendarVal(dayString)!,

              previous: {
                date: DateTimeUtils.dateDashToDefaultLessDay(dayString),
                source: calendarValSource(prevDate),
                isRestDay: calendarValRD(prevDate)!,
              },

              next: {
                date: DateTimeUtils.dateDashToDefaultAddDay(dayString),
                source: calendarValSource(nextDate),
                isRestDay: calendarValRD(nextDate)!,
              },
            },
            isChangedMonth: false
          });
        }

        setState({
          data: response.data,
          markedDates,
        });

        setHandle({ isLoading: false, isLoadMore: false, isWaiting: false });
        //   setState({ data: response.data })
      })
      .catch((error: TypeError) => {
        console.error('Error fetching calendar data:', error);
      })
      .finally(() => setHandle({ isLoading: false, isLoadMore: false, isWaiting: false }));
  },

  Request: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplications,
    setState: React.Dispatch<Partial<StateApplications>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    setHandle({
      isLoading: state.page != 1 ? false : true,
      isLoadMore: true,
      isWaiting: state.page != 1 ? true : false,
    });

    let result = [];
    let url: unknown = UtilsFetch.panelNewRequestURL(state.selectedButton);
    let endPoint = `${url}?page=${state.page}&pageSize=${process.env.EXPO_PUBLIC_REQUEST_PAGESIZE + state.urlQuery}`;
    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, endPoint)
      .then((response: { data: { items: SchemaRequestApplications[]; total: number } }) => {
        result = response.data?.items;
        result.length <= 0 && state.data.length > 0 && setHandle({ isLoadMore: false });
        setState({
          data:
            state.page > 1 && handle.isLoadMore
              ? handle.isSecondary
                ? [...state.data, ...result.map((item) => ({ ...item, isChecked: false }))]
                : [...state.data, ...result]
              : handle.isSecondary
                ? result.map((item) => ({ ...item, isChecked: false }))
                : result,
          totalCount: response.data?.total,
        });
      })
      .catch(async (error: TypeError) => {
        await UtilsFetch.catchEvent({
          error: error,
          setHandle: setHandle,
          onRefresh: () => useFetch.Refresh(nav, () => useFetch.Request(nav, state, setState, handle, setHandle)),
          toastMessage: ERRORS.connFailed,
          moreHandle: () =>
            setHandle({ isLoadMore: result.length < Number(process.env.EXPO_PUBLIC_REQUEST_PAGESIZE) ? false : true }),
        });
      })
      .finally(() => setHandle({ isLoading: false, isWaiting: false }));
  },

  Approvals: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplications,
    setState: React.Dispatch<Partial<StateApplications>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    // setHandle({
    //   isLoading: state.page != 1 ? false : true,
    //   isLoadMore: true,
    //   isWaiting: state.page != 1 ? true : false,
    // });

    let result = [];
    let url: unknown = UtilsFetch.panelApprovalsURL(state.selectedButton);

    let endPoint = `${url}?page=${state.page}&pageSize=${process.env.EXPO_PUBLIC_REQUEST_PAGESIZE + state.urlQuery} `;

    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, endPoint)
      .then((response: { data: { items: SchemaRequestApplications[]; total: number } }) => {
        result = response.data?.items;
        result.length <= 0 && state.data.length > 0 && setHandle({ isLoadMore: false });

        setState({
          data:
            state.page > 1 && handle.isLoadMore
              ? handle.isSecondary
                ? [...state.data, ...result.map((item) => ({ ...item, isChecked: false }))]
                : [...state.data, ...result]
              : handle.isSecondary
                ? result.map((item) => ({ ...item, isChecked: false }))
                : result,
          totalCount: response.data?.total,
        });
      })
      .catch(async (error: TypeError) => {
        if (error.request.status === 403) {
          nav.navigate(STRINGS.pathForbidden);
        } else {
          await UtilsFetch.catchEvent({
            error: error,
            setHandle: setHandle,
            onRefresh: () => useFetch.Refresh(nav, () => useFetch.Approvals(nav, state, setState, handle, setHandle)),
            toastMessage: ERRORS.connFailed,
            moreHandle: () =>
              setHandle({
                isLoadMore: result.length < Number(process.env.EXPO_PUBLIC_REQUEST_PAGESIZE) ? false : true,
              }),
          });
        }
      })
      .finally(() => setHandle({ isLoading: false, isWaiting: false }));
  },

  ApprovalsCounts: async (
    buttonsLength: number,
    cutOffFrom: string,
    cutOffTo: string,
  ): Promise<Record<number, SchemaRequestApplications[]>> => {
    const counts: Record<number, SchemaRequestApplications[]> = {};

    await Promise.all(
      Array.from({ length: buttonsLength }).map(async (_, index) => {
        const url = UtilsFetch.panelApprovalsURL(index);
        const field = [2, 3, 5].includes(index) ? STRINGS.filterDateFiled : STRINGS.filterDateFrom;
        const urlQuery = `&DateField=${field}&DateFrom=${cutOffFrom}&DateTo=${cutOffTo}&sortBy=-DocumentNo`;
        const endPoint = `${url}?${urlQuery}`;

        try {
          const response = await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, endPoint);

          const items: SchemaRequestApplications[] = response.data?.items ?? [];

          counts[index] = items;
        } catch (error) {
          counts[index] = [];
        }
      }),
    );

    return counts;
  },

  Reviewals: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplications,
    setState: React.Dispatch<Partial<StateApplications>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    // setHandle({
    //   isLoading: state.page != 1 ? false : true,
    //   isLoadMore: true,
    //   isWaiting: state.page != 1 ? true : false,
    // });

    let result = [];
    let url: unknown = UtilsFetch.panelReviewalsURL(state.selectedButton);
    let endPoint = `${url}?page=${state.page}&pageSize=${process.env.EXPO_PUBLIC_REQUEST_PAGESIZE + state.urlQuery}`;

    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, endPoint)
      .then((response: { data: { items: SchemaRequestApplications[]; total: number } }) => {
        result = response.data?.items;
        result.length <= 0 && state.data.length > 0 && setHandle({ isLoadMore: false });
        setState({
          data:
            state.page > 1 && handle.isLoadMore
              ? handle.isSecondary
                ? [...state.data, ...result.map((item) => ({ ...item, isChecked: false }))]
                : [...state.data, ...result]
              : handle.isSecondary
                ? result.map((item) => ({ ...item, isChecked: false }))
                : result,
          totalCount: response.data?.total,
        });
      })
      .catch(async (error: TypeError) => {
        if (error.request.status === 403) {
          nav.navigate(STRINGS.pathForbidden);
        } else {
          setHandle({ isLoading: false, isWaiting: false });
          await UtilsFetch.catchEvent({
            error: error,
            setHandle: setHandle,
            onRefresh: () => useFetch.Refresh(nav, () => useFetch.Reviewals(nav, state, setState, handle, setHandle)),
            toastMessage: ERRORS.connFailed,
            moreHandle: () =>
              setHandle({
                isLoadMore: result.length < Number(process.env.EXPO_PUBLIC_REQUEST_PAGESIZE) ? false : true,
              }),
          });
        }
      })
      .finally(() => setHandle({ isLoading: false, isWaiting: false }));
  },

  ReviewalsCounts: async (
    buttonsLength: number,
    cutOffFrom: string,
    cutOffTo: string,
  ): Promise<Record<number, SchemaRequestApplications[]>> => {
    const counts: Record<number, SchemaRequestApplications[]> = {};

    await Promise.all(
      Array.from({ length: buttonsLength }).map(async (_, index) => {
        const url = UtilsFetch.panelReviewalsURL(index);
        const field = [2, 3, 5].includes(index) ? STRINGS.filterDateFiled : STRINGS.filterDateFrom;
        const urlQuery = `&DateField=${field}&DateFrom=${cutOffFrom}&DateTo=${cutOffTo}&sortBy=-DocumentNo`;
        const endPoint = `${url}?${urlQuery}`;

        try {
          const response = await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, endPoint);

          const items: SchemaRequestApplications[] = response.data?.items ?? [];

          counts[index] = items;
        } catch (error) {
          counts[index] = [];
        }
      }),
    );

    return counts;
  },

  Teams: async () => { },

  RequestById: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplicationsDetails,
    setState: React.Dispatch<Partial<StateApplicationsDetails>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    let url: string = UtilsFetch.panelNewRequestURL(state.panel)!;

    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${url}/${state.data.filing.id}`)
      .then((response: { data: SchemaRequestApplications }) => {
        setState({ data: response.data });
      })
      .finally(() => setHandle({ isLoading: false, isWaiting: false }));
  },

  ApprovalsById: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplicationsDetails,
    setState: React.Dispatch<Partial<StateApplicationsDetails>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    let url: string = UtilsFetch.panelApprovalsURL(state.panel)!;
    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${url}/${state.data.filing.id}`)
      .then((response: { data: SchemaRequestApplications }) => {
        setState({ data: response.data });
      })
      .finally(() => setHandle({ isLoading: false, isWaiting: false }));
  },

  ReviewalsById: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplicationsDetails,
    setState: React.Dispatch<Partial<StateApplicationsDetails>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    let url: string = UtilsFetch.panelReviewalsURL(state.panel)!;
    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${url}/${state.data.filing.id}`)
      .then((response: { data: SchemaRequestApplications }) => {
        setState({ data: response.data });
      })
      .finally(() => setHandle({ isLoading: false, isWaiting: false }));
  },

  LoadFileAttach: async (
    setFile: React.Dispatch<React.SetStateAction<string>>,
    params: ParamsAttachedFile,
    parsed: Array<{ path: string; name: string }>,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    try {
      const extract = await Utils.extractFileAttach(params, parsed);
      const response = await fetch(extract);
      (response.ok && setHandle({ isSuccess: true }), setFile(extract));
    } catch (error: unknown) {
      setHandle({ isSuccess: false });
    } finally {
      setHandle({ isLoading: false });
    }
  },

  SubmitRequest: async (
    nav: StackNavigationProp<ParamListBase>,
    panel: number,
    reqAction: number,
    data: string,
    updateData: SchemaRequestApplications,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
    formatName?: string,
  ) => {
    const [onReqAction] = ARRAY.reqAction as TypeReqAction[];
    const parsedUpdate = updateData;
    const parsed: PropsRequestSummary = await JSON.parse(data);
    const formData: any | FormData = new FormData();

    if (panel === FilingPanel.OB && parsed?.branch?.ID && parsed?.branch?.name) {
      formData.append('LocationBranchId', parsed?.branch?.ID);
      formData.append('LocationBranch', parsed?.branch?.name);
    }
    let dataSet = (await UtilsFetch.panelNewRequestFormData(panel, parsed)) as Array<{
      title: string;
      value: string | number | boolean;
    }>;

    dataSet.map((data) => {
      const typedData = data as { title: string; value: string | number | boolean };

      formData.append(typedData.title, typedData.value);
    });

    // Iba iba per applications yung date
    const dateParse = Utils.panelDateToParse(panel, parsed);

    if (reqAction === onReqAction.Update || onReqAction.Cancel) {
      if (reqAction === onReqAction.Update) {
        const { newFields, oldFields } = Utils.panelCompareFields(panel, parsed, updateData);

        const changedFields = Utils.getChangedFields(newFields, oldFields, ['ReferenceNo']);

        const originalAttachments = Utils.parseAttachments(updateData.filing.fileAttachment);
        const newAttachment = Utils.parseAttachments(parsed.attachment.url);

        const attachmentChanges = Utils.getAttachmentHistory(originalAttachments, newAttachment, formatName || '');

        const readableChanges = Utils.panelReadableChanges(panel, changedFields, attachmentChanges, updateData);

        const generateEditLog = Utils.generateHistoryItem(
          readableChanges || 'No changes detected',
          formatName,
          'Edited',
          dateParse,
        );

        const editLog = Utils.appendHistoryItem(updateData.editLog, generateEditLog);

        formData.append('EditLog', editLog);
      } else if (reqAction === onReqAction.Cancel) {
        const generateEditLog = Utils.generateHistoryItem(parsed.cancelReason, formatName, 'Cancelled', dateParse);
        const editLog = Utils.appendHistoryItem(updateData.editLog, generateEditLog);

        formData.append('EditLog', editLog);
      }

      let dataSetUpdate;
      dataSetUpdate = ARRAY.requestFormData(reqAction, parsedUpdate);

      dataSetUpdate.forEach(({ title, value }) => {
        if (title && value !== undefined && value !== null) {
          formData.append(title, String(value));
        }
      });
    }

    formData.append('Reason', parsed?.reason);

    if (parsed?.attachment?.url === undefined) {
      const undefinedUri = parsed?.attachment?.uri;
      const split = parsed?.attachment?.uri.split('/');

      let type = ARRAY.imageFormat.includes(parsed?.attachment?.type!)
        ? `image/${parsed?.attachment?.type}`
        : `application/${parsed?.attachment?.type}`;

      if (reqAction === onReqAction.New) {
        undefinedUri === ''
          ? formData.append('FileAttachment', parsed?.attachment?.uri)
          : formData.append('FileAttachment', {
            name: split[split.length - 1],
            uri: parsed?.attachment?.uri,
            type: type,
          });

        const generateEditLog = Utils.generateHistoryItem(parsed?.reason, formatName, 'New', dateParse);

        const editLog = Utils.appendHistoryItem(null, generateEditLog);

        formData.append('EditLog', editLog);
      } else {
        formData.append('UploadedFile', {
          name: split[split.length - 1],
          uri: parsed?.attachment?.uri,
          type: type,
        });
      }
    } else {
      formData.append('FileAttachment', parsed?.attachment?.url);
    }

    const formEntries = Array.from(formData.entries());

    if (panel === 3) {
      formData.delete('ShiftType.ShiftTypeId');
      formData.delete('ShiftType.ShiftType');
    }

    await UtilsFetch.connect(
      APIMethods.POST,
      ContentTypes.Multipart,
      UtilsFetch.panelNewRequestURL(panel, reqAction, parsedUpdate) as string,
      formData,
    )

      .then(() => {
        setHandle({ isSuccess: true });
      })
      .catch(async (error: TypeError) => {
        if (error.request.status === StatusCode.Unauthorized) {
          await useFetch.Refresh(nav, () =>
            useFetch.SubmitRequest(nav, panel, reqAction, data, updateData, handle, setHandle),
          );
        } else {
          const errors = await UtilsFetch.catchErrors(error);
          await UtilsFetch.catchEvent({
            error: error,
            setHandle: setHandle,
            toastSet: errors.code === 0 ? 0 : 1,
            toastMessage: UtilsFetch.requestError(
              errors.code,
              errors.parsed,
              UtilsFetch.handleErrorException(errors.response, ERRORS.appFilingException),
            ),
          });
        }
      })
      .finally(() => setHandle({ isLoading: false }));
  },

  TimeOff: async (
    nav: StackNavigationProp<ParamListBase>,
    setState: React.Dispatch<Partial<StateHome>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    setHandle({ isLoading: true });

    await UtilsFetch.connectAll([
      {
        method: APIMethods.GET,
        type: ContentTypes.JSON,
        url: process.env.EXPO_PUBLIC_LVLEDGER! + `?LeaveParameterId=1`,
      },
      {
        method: APIMethods.GET,
        type: ContentTypes.JSON,
        url: process.env.EXPO_PUBLIC_LVLEDGER! + `?LeaveParameterId=2`,
      },
    ])
      .then(
        axios.spread((vacation: TypeTimeOff, sick: TypeTimeOff) => {
          let sCount: number = 0,
            vCount: number = 0;

          vacation.data!.entries.forEach((entry: { debit: number; credit: number }) => {
            vCount += entry.debit + entry.credit;
          });

          sick.data!.entries.forEach((entry: { debit: number; credit: number }) => {
            sCount += entry.debit + entry.credit;
          });

          setState({
            leaveVacation: { count: 12, entries: vacation.data!.entries },
            leaveSick: { count: sCount, entries: sick.data!.entries },
          });
        }),
      )
      .catch(async (error) => {
        const errors = await UtilsFetch.catchErrors(error);

      })
      .finally(() => setHandle({ isLoading: false, refreshing: false }));
  },

  LeaveBalances: async (
    nav: StackNavigationProp<ParamListBase>,
    setState: React.Dispatch<Partial<StateHome>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    setHandle({ isLoading: true });
    await UtilsFetch.connect(
      APIMethods.GET,
      ContentTypes.JSON,
      `${process.env.EXPO_PUBLIC_LEAVE_BALANCES}`,
    ).then((response) => {

      const emplpyeeBalance = response.data

      const ptoBalance =
        emplpyeeBalance.leaveBalances.find(
          (leave: { id: number, balance: number, name: string }) => leave.id === 1
        )?.balance ?? 0;

      const sickBalance =
        emplpyeeBalance.leaveBalances.find(
          (leave: { id: number, balance: number, name: string }) => leave.id === 2
        )?.balance ?? 0;

      setState({
        leaveVacation: { count: ptoBalance },
        leaveSick: { count: sickBalance },
      });


    }).catch(async (err) => {

      const errors = await UtilsFetch.catchErrors(err);
      console.log("Err", errors)
    }).finally(() => setHandle({
      isLoading: false, refreshing: false,
    }));
  },

  LeaveLedger: async (
    state: StateTimeOff,
    setState: React.Dispatch<Partial<StateTimeOff>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    try {

      setHandle({
        isLoading: state.pageCount != 1 ? false : true,
        isLoadMore: true,
        isWaiting: state.pageCount != 1 ? true : false,
      });
      const leaveId = state.page; // Page 1 if VL else SL 

      const url =
        `${process.env.EXPO_PUBLIC_LVLEDGER}` +
        `?LeaveParameterId=${leaveId}` +
        `&Page=${state.pageCount}` +
        `&PageSize=10`;
      const response = await axios.get(url);

      const newEntries: LeaveLedgerEntries[] =
        response.data?.employee?.entries ?? [];

      if (newEntries.length === 0) {
        setHandle({
          isLoadMore: false,
        });

        return;
      }

      setState({
        data:
          state.pageCount > 1
            ? [...state.data, ...newEntries]
            : newEntries,
        pageCount: state.pageCount + 1,

      });

    } catch (error) {
      setHandle({ isLoadMore: false })
      console.log('LeaveLedger error:', error);
    } finally {
      setHandle({
        isLoading: false,
        refreshing: false,
        isWaiting: false,
      });
    }
  },

  SingleApprovals: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplicationsDetails,
    setState: React.Dispatch<Partial<StateApplicationsDetails>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    let formSingle: Array<{ title: string; value: string }> = [];
    let url: string = await UtilsFetch.singleApprovals(state.panel, state.data.filing.filingStatus.id);
    formSingle = await UtilsFetch.panelApprovalsFormData(state.panel, state.data);
    await UtilsFetch.connect(APIMethods.POST, ContentTypes.Multipart, url + `/${state.data.filing.id}`, formSingle)
      .then(async (response: { data: SchemaApprovalsManager }) => {
        setHandle({ isSuccess: true });
      })
      .catch(async (error: any) => {
        const errors = await UtilsFetch.catchErrors(error);
        if (errors.code === 403) {
          Utils.alertSingle('403 Forbidden', 'You do not have permission to review this application.', () => {
            nav.goBack();
          });
        } else {
          // Handle all other error cases
          await UtilsFetch.catchEvent({
            error: error,
            setHandle: setHandle,
            toastSet: errors.code === 0 ? 0 : 1,
            onRefresh: () =>
              useFetch.Refresh(nav, () => useFetch.SingleApprovals(nav, state, setState, handle, setHandle)),
            toastMessage: UtilsFetch.requestError(
              errors.code,
              errors.parsed,
              UtilsFetch.handleErrorException(errors.response, ERRORS.appFilingException),
            ),
          });
        }
      })
      .finally(() => setHandle({ isLoading: false }));
  },

  NewSingleApprovals: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplicationsDetails,
    data: string,
    setState: React.Dispatch<Partial<StateApplicationsDetails>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
    formatName?: string,
  ) => {
    let formSingle: Array<{ title: string; value: string }> = [];
    let url: string = await UtilsFetch.singleApprovals(state.panel, state.data.filing.filingStatus.id);
    const parsed: PropsRequestSummary = await JSON.parse(data);

    const dateParse = Utils.panelDateToParse(state.panel, parsed);
    const generateEditLog = Utils.generateHistoryItem(parsed.approveReason, formatName, 'Approved', dateParse);

    const updatedData = {
      ...state.data,
      editLog: Utils.appendHistoryItem(state.data.editLog, generateEditLog),
    };

    formSingle = await UtilsFetch.panelApprovalsFormData(state.panel, updatedData);
    await UtilsFetch.connect(APIMethods.POST, ContentTypes.Multipart, url + `/${state.data.filing.id}`, formSingle)
      .then(async (response: { data: SchemaApprovalsManager }) => {
        setHandle({ isSuccess: true });
      })
      .catch(async (error: any) => {
        const errors = await UtilsFetch.catchErrors(error);
        if (errors.code === 403) {
          Utils.alertSingle('403 Forbidden', 'You do not have permission to review this application.', () => {
            nav.goBack();
          });
        } else {
          // Handle all other error cases
          await UtilsFetch.catchEvent({
            error: error,
            setHandle: setHandle,
            toastSet: errors.code === 0 ? 0 : 1,
            onRefresh: () =>
              useFetch.Refresh(nav, () => useFetch.NewSingleApprovals(nav, state, data, setState, handle, setHandle)),
            toastMessage: UtilsFetch.requestError(
              errors.code,
              errors.parsed,
              UtilsFetch.handleErrorException(errors.response, ERRORS.appFilingException),
            ),
          });
        }
      })
      .finally(() => setHandle({ isLoading: false }));
  },

  SingleReviews: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplicationsDetails,
    setState: React.Dispatch<Partial<StateApplicationsDetails>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    let formSingle: Array<{ title: string; value: string }> = [];
    let url: string = await UtilsFetch.singleReviews(state.panel, state.data.filing.filingStatus.id);

    formSingle = await UtilsFetch.panelApprovalsFormData(state.panel, state.data);
    await UtilsFetch.connect(APIMethods.POST, ContentTypes.Multipart, url + `/${state.data.filing.id}`, formSingle)
      .then(async (response: { data: SchemaApprovalsManager }) => {
        setHandle({ isSuccess: true });
      })
      .catch(async (error: any) => {
        const errors = await UtilsFetch.catchErrors(error);

        if (errors.code === 403) {
          Utils.alertSingle('403 Forbidden', 'You do not have permission to review this application.', () => {
            nav.goBack();
          });
        } else {
          await UtilsFetch.catchEvent({
            error: error,
            setHandle: setHandle,
            toastSet: errors.code === 0 ? 0 : 1,
            onRefresh: () =>
              useFetch.Refresh(nav, () => useFetch.SingleApprovals(nav, state, setState, handle, setHandle)),
            toastMessage: UtilsFetch.requestError(
              errors.code,
              errors.parsed,
              UtilsFetch.handleErrorException(errors.response, ERRORS.appFilingException),
            ),
          });
        }
      })
      .finally(() => setHandle({ isLoading: false }));
  },

  NewSingleReviews: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplicationsDetails,
    data: string,
    setState: React.Dispatch<Partial<StateApplicationsDetails>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
    formatName?: string,
  ) => {
    let formSingle: Array<{ title: string; value: string }> = [];
    let url: string = await UtilsFetch.singleReviews(state.panel, state.data.filing.filingStatus.id);
    const parsed: PropsRequestSummary = await JSON.parse(data);

    const dateParse = Utils.panelDateToParse(state.panel, parsed);

    const generateEditLog = Utils.generateHistoryItem(parsed.reviewReason, formatName, 'Reviewed', dateParse);

    const updatedData = {
      ...state.data,
      editLog: Utils.appendHistoryItem(state.data.editLog, generateEditLog),
    };

    formSingle = await UtilsFetch.panelApprovalsFormData(state.panel, updatedData);

    await UtilsFetch.connect(APIMethods.POST, ContentTypes.Multipart, url + `/${state.data.filing.id}`, formSingle)
      .then(() => {
        setHandle({ isSuccess: true });
      })
      .catch(async (error: any) => {
        const errors = await UtilsFetch.catchErrors(error);

        if (errors.code === 403) {
          Utils.alertSingle('403 Forbidden', 'You do not have permission to review this application.', () => {
            nav.goBack();
          });
        } else {
          await UtilsFetch.catchEvent({
            error: error,
            setHandle: setHandle,
            toastSet: errors.code === 0 ? 0 : 1,
            onRefresh: () =>
              useFetch.Refresh(nav, () => useFetch.NewSingleReviews(nav, state, data, setState, handle, setHandle)),
            toastMessage: UtilsFetch.requestError(
              errors.code,
              errors.parsed,
              UtilsFetch.handleErrorException(errors.response, ERRORS.appFilingException),
            ),
          });
        }
      })
      .finally(() => setHandle({ isLoading: false }));
  },

  BatchApprovals: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplications,
    setState: React.Dispatch<Partial<StateApplications>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
    employeeName?: string,
  ) => {
    setHandle({ isLoading: true });
    const action = handle.isAction == 0 ? STRINGS.batchCancel : STRINGS.batchApprove;

    let formBatchApproval: SchemaApprovalsManager = { filings: [] },
      successList: Array<TypeApprovalPromptItem> = [],
      failedList: Array<TypeApprovalPromptItem> = [];

    let urlApproval: string = await UtilsFetch.approvalsEndpoint(
      state.selectedButton,
      ApprovalsType.Batch,
      handle.isAction == 0 ? FilingStatus.Cancelled : FilingStatus.Approved,
    );

    state.data.forEach((item: SchemaRequestApplications) => {
      if (item.isChecked) {
        const dateParse = Utils.panelBatchDateParse(state.selectedButton, item);
        const generatedEditLog = Utils.generateHistoryItem(
          state.batchReason || '',
          employeeName || '',
          action,
          dateParse,
        );

        const filing = {
          recordId: item.filing.id,
          employeeId: item.id,
          companyId: item.companyId,
          documentNo: item.filing.documentNo,
          editLog: Utils.appendHistoryItem(item.editLog, generatedEditLog),
        };

        handle.isAction === formBatchApproval.filings.push(filing);
      }
    });

    const onCheckStatus = (id: number, one: string, two: string, three: string) => {
      return (handle.isAction === ApprovalsAction.Approve && id) === FilingStatus.Filed
        ? one
        : (handle.isAction === ApprovalsAction.Approve && id) === FilingStatus.Reviewed
          ? two
          : handle.isAction === ApprovalsAction.Cancel
            ? three
            : undefined;
    };

    const onError = async (error: TypeError) => {
      const errors = await UtilsFetch.catchErrors(error);
      setState({ batchReason: undefined });
      await UtilsFetch.catchEvent({
        error: error,
        setHandle: setHandle,
        toastSet: errors.code === 0 ? 0 : 1,
        onRefresh: () => useFetch.Refresh(nav, () => useFetch.BatchApprovals(nav, state, setState, handle, setHandle)),
        toastMessage: UtilsFetch.requestError(
          errors.code,
          errors.parsed,
          UtilsFetch.handleErrorException(errors.response, ERRORS.appFilingException),
        ),
      });
    };

    const onSuccess = async (data: SchemaApprovalsManager) => {
      setState({ batchReason: undefined });
      let batchApprovalsStatus: {
        success: Array<TypeApprovalPromptItem>;
        errors: Array<TypeApprovalPromptItem>;
      } = await UtilsFetch.checkBatchApprovalsStatus(data);

      batchApprovalsStatus.success &&
        batchApprovalsStatus.success.forEach((item: TypeApprovalPromptItem) => {
          state.data.map((data: SchemaRequestApplications) => {
            data.filing.documentNo === item.documentNo &&
              successList.push({
                ...item,
                filingProcess: onCheckStatus(
                  data.filing.filingStatus.id,
                  STRINGS.reviewed,
                  STRINGS.approved,
                  STRINGS.cancelled,
                ),
              });
          });
        });

      batchApprovalsStatus.errors &&
        batchApprovalsStatus.errors.forEach((item: TypeApprovalPromptItem) => {
          state.data.map((data: SchemaRequestApplications) => {
            data.filing.documentNo === item.documentNo &&
              failedList.push({
                ...item,
                filingProcess: onCheckStatus(
                  data.filing.filingStatus.id,
                  STRINGS.toReview,
                  STRINGS.toApprove,
                  STRINGS.toCancel,
                ),
              });
          });
        });
    };
    if (formBatchApproval.filings.length > 0) {
      await UtilsFetch.connect(APIMethods.POST, ContentTypes.JSON, urlApproval, formBatchApproval)
        .then(async (response: { data: SchemaApprovalsManager }) => {
          await onSuccess(response.data);
          setHandle({ isVisible: false, isSuccess: true });
        })
        .catch(async (error: TypeError) => {
          await onError(error);
        })
        .finally(() => setHandle({ isLoading: false }));
    }

    setState({
      successList: successList.length > 0 ? successList.flat() : [],
      failedList: failedList.length > 0 ? failedList.flat() : [],
    });
  },

  BatchReviewals: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateApplications,
    setState: React.Dispatch<Partial<StateApplications>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
    employeeName: string,
  ) => {
    setHandle({ isLoading: true });

    const action = handle.isAction == 0 ? STRINGS.batchCancel : STRINGS.batchReview;

    let urlReview: string = await UtilsFetch.approvalsEndpoint(
      state.selectedButton,
      ApprovalsType.Batch,
      handle.isAction == 0 ? FilingStatus.Cancelled : FilingStatus.Reviewed,
    );
    let formBatchReview: SchemaApprovalsManager = { filings: [] },
      successList: Array<TypeApprovalPromptItem> = [],
      failedList: Array<TypeApprovalPromptItem> = [];

    state.data.forEach((item: SchemaRequestApplications) => {
      if (item.isChecked) {
        const dateParse = Utils.panelBatchDateParse(state.selectedButton, item);

        const generatedEditLog = Utils.generateHistoryItem(
          state.batchReason || '',
          employeeName || '',
          action,
          dateParse,
        );

        const filing = {
          recordId: item.filing.id,
          employeeId: item.id,
          companyId: item.companyId,
          documentNo: item.filing.documentNo,
          editLog: Utils.appendHistoryItem(item.editLog, generatedEditLog),
        };

        handle.isAction === formBatchReview.filings.push(filing);
      }
    });

    const onCheckStatus = (id: number, one: string, two: string, three: string) => {
      return (handle.isAction === ApprovalsAction.Approve && id) === FilingStatus.Filed
        ? one
        : (handle.isAction === ApprovalsAction.Approve && id) === FilingStatus.Reviewed
          ? two
          : handle.isAction === ApprovalsAction.Cancel
            ? three
            : undefined;
    };

    const onError = async (error: TypeError) => {
      const errors = await UtilsFetch.catchErrors(error);
      setState({ batchReason: undefined });
      await UtilsFetch.catchEvent({
        error: error,
        setHandle: setHandle,
        toastSet: errors.code === 0 ? 0 : 1,
        onRefresh: () => useFetch.Refresh(nav, () => useFetch.BatchApprovals(nav, state, setState, handle, setHandle)),
        toastMessage: UtilsFetch.requestError(
          errors.code,
          errors.parsed,
          UtilsFetch.handleErrorException(errors.response, ERRORS.appFilingException),
        ),
      });
    };

    const onSuccess = async (data: SchemaApprovalsManager) => {
      setState({ batchReason: undefined });
      let batchApprovalsStatus: {
        success: Array<TypeApprovalPromptItem>;
        errors: Array<TypeApprovalPromptItem>;
      } = await UtilsFetch.checkBatchApprovalsStatus(data);

      batchApprovalsStatus.success &&
        batchApprovalsStatus.success.forEach((item: TypeApprovalPromptItem) => {
          state.data.map((data: SchemaRequestApplications) => {
            data.filing.documentNo === item.documentNo &&
              successList.push({
                ...item,
                filingProcess: onCheckStatus(
                  data.filing.filingStatus.id,
                  STRINGS.reviewed,
                  STRINGS.approved,
                  STRINGS.cancelled,
                ),
              });
          });
        });

      batchApprovalsStatus.errors &&
        batchApprovalsStatus.errors.forEach((item: TypeApprovalPromptItem) => {
          state.data.map((data: SchemaRequestApplications) => {
            data.filing.documentNo === item.documentNo &&
              failedList.push({
                ...item,
                filingProcess: onCheckStatus(
                  data.filing.filingStatus.id,
                  STRINGS.toReview,
                  STRINGS.toApprove,
                  STRINGS.toCancel,
                ),
              });
          });
        });
    };

    if (formBatchReview.filings.length > 0) {
      await UtilsFetch.connect(APIMethods.POST, ContentTypes.JSON, urlReview, formBatchReview)
        .then(async (response: { data: SchemaApprovalsManager }) => {
          await onSuccess(response.data);

          setHandle({ isVisible: false, isSuccess: true });
        })
        .catch(async (error: TypeError) => {
          await onError(error);
        })
        .finally(() => setHandle({ isLoading: false }));
    }

    setState({
      successList: successList.length > 0 ? successList.flat() : [],
      failedList: failedList.length > 0 ? failedList.flat() : [],
    });
  },

  LoanLedger: async (setState: React.Dispatch<Partial<StateLoanLedger>>) => {
    setState({ data: ARRAY.loanLedger, filteredData: ARRAY.loanLedger });
  },

  Timesheet: async (
    nav: StackNavigationProp<ParamListBase>,
    state: StateTimesheet,
    setState: React.Dispatch<Partial<StateTimesheet>>,
    handle: TypeHandle,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    await UtilsFetch.connect(
      APIMethods.GET,
      ContentTypes.JSON,
      `${process.env.EXPO_PUBLIC_TIMESHEET}?Date=${state.calendarDate}`,
    )
      .then((response: { data: SchemaCalendar }) => {
        const res = response.data.calendarDate?.entries!;

        res.length > 0
          ? setState({
            clockIn: res[0],
            clockOut: res.length > 1 ? res[res.length - 1] : ValuesSchemaCalendarEntries,
          })
          : setState({
            clockIn: ValuesSchemaCalendarEntries,
            clockOut: ValuesSchemaCalendarEntries,
          });
      })
      .catch(async (error: TypeError) => {
        await UtilsFetch.catchEvent({
          error: error,
          setHandle: setHandle,
          onRefresh: () => useFetch.Refresh(nav, () => useFetch.Timesheet(nav, state, setState, handle, setHandle)),
          toastMessage: ERRORS.connFailed,
        });
      })
      .finally(() => setHandle({ isLoading: false, isLoadMore: false, isWaiting: false }));
  },

  LoanDetails: async (setState: React.Dispatch<Partial<StateLoanDetails>>) => {
    setState({
      status: ARRAY.loanDetails.info.DateApproved ? 1 : ARRAY.loanDetails.info.DateCancelled ? 2 : 0,
      dataInfo: ARRAY.loanDetails.info,
      dataDetails: ARRAY.loanDetails.details,
    });
  },

  Filed: async (panel: number, setState: React.Dispatch<Partial<unknown>>) => {
    setState({
      data: panel == 1 ? ARRAY.filed : ARRAY.reviewed,
      counter: panel == 1 ? ARRAY.filed.length : ARRAY.reviewed.length,
    });
  },

  Personal: async (setState: React.Dispatch<Partial<PersonalStates>>) => {
    try {
      const response = await UtilsFetch.connect(
        APIMethods.GET,
        ContentTypes.JSON,
        `${process.env.EXPO_PUBLIC_PROFILE}`,
      );
      const photoString = response.data.personalInformation?.photo; // This is the stringified object
      if (!!photoString) {
        const photo = JSON.parse(photoString); // Parse the string into an object
        const pic = `${process.env.EXPO_PUBLIC_REQUEST}/Uploads/EE/` + photo.path;
        setState({ uri: pic });
      }
      const fullName = Utils.formatNameHistory(response.data.personalInformation?.name);
      let personalData = {
        FullName: fullName ?? '',
        Name_Department: response.data.recordInformation?.workInformation?.company?.department?.name ?? '',
        Code: response.data.code ?? '',
        Name_Company: response.data.recordInformation?.workInformation?.company?.name ?? '',
        Name_Branch: response.data.recordInformation?.workInformation?.company?.branch?.name ?? '',
        Name_Division: response.data.recordInformation?.workInformation?.company?.division?.name ?? '',
        Name_Section: response.data.recordInformation?.workInformation?.company?.section?.name ?? '',
        MobileNo: response.data.contact?.contactNo ?? '',
        EmailAdd: response.data.recordInformation?.workInformation?.company?.email ?? '',
      };

      setState({
        data: personalData,
        details: ARRAY.personalDetails(personalData),
      });
    } catch (error) {
      console.error('Error profile response', error);
      throw error;
    }
  },

  CurrentCutoff: async (paymentFrequencyId: number, payrollGroupId: number) => {
    try {
      const today = new Date();

      const payload = {
        date: DateTimeUtils.getIsoDateFull(today.toString()),
        paymentFrequencyId,
        payrollGroupId,
      };

      const response = await axios.post(`${process.env.EXPO_PUBLIC_CURRENT_CUTOFF}`, payload);

      const cutoffData = {
        dateFrom: response.data.dateRange.dateFrom,
        dateTo: response.data.dateRange.dateTo,
        dayPayout: response.data.datePayoutSchedule,
      };

      return cutoffData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  Profile: async () => {
    try {
      const response = await UtilsFetch.connect(
        APIMethods.GET,
        ContentTypes.JSON,
        `${process.env.EXPO_PUBLIC_PROFILE}`,
      );

      const fullName = Utils.formatNameHistory(response.data.personalInformation?.name);
      let personalData = {
        FullName: fullName ?? '',
        Name_Department: response.data.recordInformation?.workInformation?.company?.department?.name ?? '',
        Code: response.data.code ?? '',
        Name_Company: response.data.recordInformation?.workInformation?.company?.name ?? '',
        Name_Branch: response.data.recordInformation?.workInformation?.company?.branch?.name ?? '',
        Name_Division: response.data.recordInformation?.workInformation?.company?.division?.name ?? '',
        Name_Section: response.data.recordInformation?.workInformation?.company?.section?.name ?? '',
        MobileNo: response.data.contact?.contactNo ?? '',
        EmailAdd: response.data.recordInformation?.workInformation?.company?.email ?? '',
        paymentFrequecyId: response.data.recordInformation?.payrollInformation.paymentFrequency.id,
        payrollGroupId: response.data.recordInformation?.payrollInformation.payrollGroup.id,
      };

      return personalData;
    } catch (error) {
      console.error('Error profile response', error);
      throw error;
    }
  },

  GetMYCOS: async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_REQUEST_COS}`);

      return response.data;
    } catch (error) {
      console.error('Error response', error);
      throw error;
    }
  },
  Payslip: async (setState: React.Dispatch<Partial<StatePayslip>>) => {
    setState({
      data: ARRAY.payslip,
      filteredData: ARRAY.payslip?.payHistory,
    });
  },

  PayslipDetails: async (setState: React.Dispatch<React.SetStateAction<TypeSchemaPayslip['recentPay'][0]>>) => {
    setState(ARRAY.payslip.recentPay[0]);
  },

  ClockInOut: async (
    state: StateClockInOut,
    setState: React.Dispatch<Partial<StateClockInOut>>,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
  ) => {
    try {
      const storedData = await AsyncStorage.getItem('ClockedData');
      if (storedData) {
        `${process.env.EXPO_PUBLIC_TIME_CLOCK_RADIUS}`;
        const parsed: { value: number; status: string; nextStatus: string } = JSON.parse(storedData);

        const location = state.location as LocationLang;
        let clocked = {
          ...state.clockedData,
          value: parsed?.value === 0 || !parsed?.value ? 1 : 0,
          status: state?.status,
          nextStatus: parsed?.value === 0 || !parsed?.value ? STRINGS.ClockOut : STRINGS.ClockIn,
          date: DateTimeUtils.getCurrDateDefault(),
          time: DateTimeUtils.getCurrTimeDefault(),

          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy,
          speed: location.speed,
        };
        setState({ clockedData: clocked });
        await AsyncStorage.setItem('ClockedData', JSON.stringify(clocked));

        const payload = {
          date: clocked.date,
          timeInOut: clocked.time,
          type: clocked.nextStatus,
          address: clocked.address,

          coordinates: {
            longitude: clocked.longitude,
            latitude: clocked.latitude,
            accuracy: clocked.accuracy,
            speed: clocked.speed,
          },
        };
        await axios
          .post(`${process.env.EXPO_PUBLIC_DASHBOARD_TIME_CLOCK}`, payload)
          .then((response) => {
            setHandle({ isSuccess: true });
          })

          .catch((apiError) => {
            setHandle({ isToast: { show: true, set: 0, message: `API Error: ${apiError.message}` } });
          });
      }
    } catch (error) {
      setHandle({ isToast: { show: true, set: 0, message: error.message } });
    }
  },

  TimeClockRadius: async (url: string) => {
    try {
      const token = await AsyncStorage.getItem('AT');
      if (token) {
        const { BranchId: branchID } = jwtDecode<{ BranchId: number }>(token);
        const apiUrl = `${url}/${branchID}`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.radius;
      } else {
        throw new Error('Token Not Found.');
      }
    } catch (err) {
      throw err;
    }
  },

  TeamMembers: async (state: TeamsStates, SetState: React.Dispatch<Partial<TeamsStates>>) => {
    let result: any[] = [];
    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${process.env.EXPO_PUBLIC_PROFILE_REQUEST}`)
      .then((response: { data: { teamMembers: TeamSchema[]; name: string } }) => {
        let result = response.data;
        if (response.data.teamMembers.length > 0) {
          SetState({
            teamsData: result.teamMembers.map((item, index) => ({ ...item })),
          });
        }
      })
      .catch((error: TypeError) => {
        console.error(error);
      });
    return result;
  },

  GetTeamMembers: async (state: TeamsStates, setState: React.Dispatch<Partial<TeamsStates>>, id: number) => {
    const payload = {
      date: DateTimeUtils.isoToDateDefault(state.todayDate),
      branchId: state.selectedMember.branch.id,
      companyId: state.selectedMember.company.id,
      departmentId: state.selectedMember.department.id,
      memberId: state.selectedMember.id,
    };
    await axios
      .post(`${process.env.EXPO_PUBLIC_CALENDAR_TEAMS}/${payload.memberId}`, payload)
      .then((response) => {
        setState({
          branch: state.selectedMember.branch.id,
          company: state.selectedMember.company.id,
          member: state.selectedMember.id,
          departmentId: state.selectedMember.departmentId,
          name: state.selectedMember.name,
          position: state.selectedMember.position,
          date: DateTimeUtils.isoToDateDefault(state.todayDate),
          dateFrom: response.data.calendarDate.schedule.dateTimeRange.dateFrom,
          dateTo: response.data.calendarDate.schedule.dateTimeRange.dateTo,
        });
      })
      .catch((error) => {
        console.error('Error fetching team members:', error);
      });
  },
};
