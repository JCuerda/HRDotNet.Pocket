// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { ActivityIndicator, Linking, Alert, Platform } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Gesture } from 'react-native-gesture-handler';
import CryptoJS from 'react-native-crypto-js';
import { FieldLabels, FilingPanel, RequestType, RequiredFieldRequest } from 'src/constants/Enum';
import * as ImageManipulator from 'expo-image-manipulator';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { ARRAY, COLORS, DateTimeUtils, ERRORS, STRINGS } from 'src';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import {
  ParamsSelectionList,
  SchemaCalendarEntries,
  TypeSelectionList,
  StateClockInOut,
  ParamsAttachedFile,
  SchemaRequestApplications,
  TypeHandle,
  TypePanel,
  TypeReqAction,
  TypeNavStack,
  TypeNavProp,
  HistoryItem,
  PropsRequestSummary,
  AttachmentHistory,
  StateCOSRequest,
  AllApplicationState,
} from 'src/types/Types';
import { Camera } from 'expo-camera';
import {
  fieldDisplayNames,
  FieldKey,
  GENERATION_SUFFIX_REGEX,
  ROMAN_NUMERAL_REGEX,
  ValuesApprovals,
} from 'src/constants/Values';
import { useGlobalStore } from 'src/store/GlobalStore';
import { useFetch } from 'src/hooks/useFetch';

const [onPanel] = ARRAY.panel as TypePanel[];
const [onReqAction] = ARRAY.reqAction as TypeReqAction[];

export const Utils = {
  statusIcon: (id: number) => {
    const iconConfig: { [key: number]: { name: string; size: number } } = {
      1: { name: 'document-text-sharp', size: 17 }, // Filed
      2: { name: 'checkmark-circle', size: 20 }, // Approved
      3: { name: 'close-circle', size: 19 }, // Cancelled
      4: { name: 'search-circle', size: 22 }, // Reviewed
      11: { name: 'remove-circle', size: 22 }, // Posted
    };

    const icon = iconConfig[id];

    return icon ? (
      <Ionicons
        name={icon.name as React.ComponentProps<typeof Ionicons>['name']}
        size={icon.size}
        color={COLORS.clearWhite}
        style={{ marginRight: 10 }}
      />
    ) : null;
  },

  loanStatusIcon: (status: string) => {
    const iconConfig: { [key: string]: { name: string; size: number } } = {
      Filed: { name: 'document-text-sharp', size: 17 }, // Filed
      Approved: { name: 'checkmark-circle', size: 20 }, // Approved
      Cancelled: { name: 'close-circle', size: 19 }, // Cancelled
      Reviewed: { name: 'search-circle', size: 22 }, // Reviewed
      Posted: { name: 'remove-circle', size: 22 }, // Posted
    };

    const icon = iconConfig[status];

    return icon ? (
      <Ionicons
        name={icon.name as React.ComponentProps<typeof Ionicons>['name']}
        size={icon.size}
        color={COLORS.clearWhite}
        style={{ marginRight: 10 }}
      />
    ) : null;
  },

  getSourceOrder: (source: string): number => {
    const upperSource = source.toUpperCase();

    if (upperSource.startsWith('L-')) {
      return ARRAY.sourceOrder.indexOf('LEAVE');
    }

    if (upperSource.includes(STRINGS.holiday.toUpperCase())) {
      return ARRAY.sourceOrder.indexOf('HOLIDAY');
    }

    return ARRAY.sourceOrder.indexOf(upperSource);
  },

  groupCalendarEntries: (
    entries: SchemaCalendarEntries[]
  ): SchemaCalendarEntries[] => {

    if (!entries) {
      return []
    }
    const missedLogs = entries.filter((entry) =>
      entry.source.toUpperCase().startsWith('ML-')
    );

    const otherEntries = entries.filter(
      (entry) => !entry.source.toUpperCase().startsWith('ML-')
    );

    // Merge ML-1 and ML-2 into one ML entry
    if (missedLogs.length > 0) {
      const ml1 = missedLogs.find(
        (entry) => entry.source.toUpperCase() === 'ML-1'
      );

      const ml2 = missedLogs.find(
        (entry) => entry.source.toUpperCase() === 'ML-2'
      );

      const firstMissedLog = ml1 || ml2;

      if (firstMissedLog) {
        otherEntries.push({
          ...firstMissedLog,
          source: 'ML',
          dateTimeRange: {
            dateFrom:
              ml1?.dateTimeRange?.dateFrom ||
              STRINGS.calendarInitialDate,

            dateTo:
              ml2?.dateTimeRange?.dateFrom ||
              STRINGS.calendarInitialDate,
          },
        });
      }
    }

    return otherEntries.sort(
      (a, b) => Utils.getSourceOrder(a.source) - Utils.getSourceOrder(b.source)
    );
  },




  checkCalendarEntrySource: (val: SchemaCalendarEntries) => {
    let color: string = '',
      title: string = '',
      name: string | undefined = '',
      tag: string = '';



    const dateFrom = val?.dateTimeRange!?.dateFrom;
    const dateTo = val?.dateTimeRange!?.dateTo;

    const isMissingTimeIn =
      dateFrom === STRINGS.calendarInitialDate;

    const isMissingTimeOut =
      dateTo === STRINGS.calendarInitialDate;

    const timeFrom = isMissingTimeIn
      ? STRINGS.missingLogs
      : DateTimeUtils.isoToTimeUnits(dateFrom);

    const timeTo = isMissingTimeOut
      ? STRINGS.missingLogs
      : DateTimeUtils.isoToTimeUnits(dateTo);

    const timeSched =
      isMissingTimeIn && isMissingTimeOut
        ? `\n${STRINGS.noLogsCalendar}`
        : `\n${timeFrom} - ${timeTo}`;
    if (val.source.toUpperCase().includes('L-')) {
      ((color = COLORS.palePink), (title = STRINGS.leave));
    } else if (val.source.includes(STRINGS.holiday)) {
      color = COLORS.lightRed;
      title = val.source.split(' - ')[1];
      tag = STRINGS.holiday.toUpperCase();
    } else {
      switch (val.source) {
        case 'DEFAULT':
        case 'SA':
          color = COLORS.paleYellow;
          name = val.source === 'SA' ? STRINGS.schedAssignment : STRINGS.defaultSched;
          title = val.source === 'SA' ? STRINGS.schedAssignment + timeSched : STRINGS.defaultSched + timeSched;
          break;

        case 'COS':
          color = COLORS.lightPeach;
          name = STRINGS.changeOfSchedule;
          title = STRINGS.changeOfSchedule + timeSched;
          break;

        case 'OT':
          color = COLORS.lightBlueCalendar;
          name = STRINGS.overtime;
          title = STRINGS.overtime + timeSched;
          break;

        case 'ML':
          color = COLORS.lightAqua;
          name = STRINGS.missedLog;
          title = STRINGS.missedLog + timeSched;
          break;

        case 'OB':
          color = COLORS.lightPurpleCalendar;
          name = STRINGS.officialBusiness;
          title = STRINGS.officialBusiness + timeSched;
          break;

        case 'CTO':
          color = COLORS.lightBrown;
          name = STRINGS.compensatoryTimeOff;
          title = STRINGS.compensatoryTimeOff + timeSched;
          break;

        case 'FILO':
          color = COLORS.paleGreen;
          name = STRINGS.processLogs;
          title = STRINGS.processLogs + timeSched;
          break;

        default:
          return undefined;
      }
    }

    return { color, title, name, tag };
  },

  panelPageHeaderTitle: (panel: number, reqAction: number) => {
    let pageTitle: string | undefined = '';

    const actionTitles: Record<number, string> = {
      1: '',
      2: 'Update',
      3: 'Cancel',
      4: 'Review',
      5: 'Approve',
    };

    const pageHeaderTitle = (title: string) => {
      const action = actionTitles[reqAction];
      return action ? `${title} ${action}` : title;
    };

    switch (panel) {
      case 0:
        pageTitle = pageHeaderTitle(STRINGS.pageTitleCOSRequest);
        break;

      case 1:
        pageTitle = pageHeaderTitle(STRINGS.pageTitleOBRequest);
        break;

      case 2:
        pageTitle = pageHeaderTitle(STRINGS.pageTitleOTRequest);
        break;

      case 3:
        pageTitle = pageHeaderTitle(STRINGS.pageTitleOFFRequest);
        break;

      case 4:
        pageTitle = pageHeaderTitle(STRINGS.pageTitleLVRequest);
        break;

      case 5:
        pageTitle = pageHeaderTitle(STRINGS.pageTitleMLRequest);
        break;

      case 6:
        pageTitle = pageHeaderTitle(STRINGS.pageTitleCTORequest);
        break;

      default:
        break;
    }

    return pageTitle;
  },

  checkCalendarSource: (val: string) => {
    let color: string = '';
    let tag: string = '';

    if (val.toUpperCase().includes('L-')) {
      ((color = COLORS.lightPurple), (tag = STRINGS.leave));
    } else if (val.includes(STRINGS.holiday)) {
      color = COLORS.red;
      tag = STRINGS.holiday;
    } else {
      switch (val) {
        case 'DEFAULT':
        case 'COS':
        case 'SA':
        case 'OT':
        case 'ML':
          color = COLORS.green;
          tag = STRINGS.workDay;
          break;

        case 'RD':
          color = COLORS.lightPurple;
          tag = STRINGS.restDay;
          break;

        default:
          color = COLORS.darkGray;
          tag = STRINGS.event;
      }
    }

    return { color, tag };
  },

  capitalize: (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  toTitleCase: (str: string | null | undefined): string => {
    if (!str) return '';

    return str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  },

  properSuffixName: (suffix?: string | null): string => {
    if (!suffix) return '';

    const value = suffix.trim().replace(/\.+$/, '');

    if (GENERATION_SUFFIX_REGEX.test(value)) {
      const lower = value.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1) + '.';
    }

    if (ROMAN_NUMERAL_REGEX.test(value)) {
      return value.toUpperCase();
    }

    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  },

  formatHyphenatedName: (value: string) =>
    value
      .split('-')
      .map((part) => Utils.toTitleCase(part))
      .join('-'),

  formatEmployeeName: (name: string) => {
    const parts = name.split(',').map((p) => p.trim());

    const lastName = parts[0] || '';
    const firstName = parts[1] || '';

    let suffix = '';
    let middleName = '';

    if (parts[2] && parts[2].charAt(0) === '-') {
      suffix = parts[2].replace(/-/g, '');
      middleName = parts[3] || '';
    } else {
      middleName = parts[2] || '';
    }

    const format = `${Utils.toTitleCase(lastName)}, ${Utils.toTitleCase(firstName)} ${suffix} ${Utils.toTitleCase(middleName)}`;

    return format;
  },

  formatNameHistory: (name?: { firstName?: string; middleName?: string; lastName?: string; suffix?: string }) => {
    if (!name) return '';

    return `${name.lastName ? Utils.formatHyphenatedName(name.lastName) : ''}, ${name.firstName ? Utils.formatHyphenatedName(name.firstName) : ''
      } ${name.suffix ? Utils.properSuffixName(name.suffix) : ''} ${name.middleName ? Utils.formatHyphenatedName(name.middleName) : ''}`
      .replace(/\s+/g, ' ')
      .trim();
  },

  appendHistoryItem: (oldHistoryLog: string | null, newHistoryLog: HistoryItem): string => {
    try {
      const parsed = oldHistoryLog ? JSON.parse(oldHistoryLog) : { items: [] };

      if (!Array.isArray(parsed.items)) parsed.items = [];

      const generateGuid = (length = 10) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };

      // Determine next ID (start from 1, or increment from the last one)
      const nextId = parsed.items.length > 0 ? Math.max(...parsed.items.map((i: HistoryItem) => i.id ?? 0)) + 1 : 1;

      const itemWithId: HistoryItem = { ...newHistoryLog, id: nextId, guid: generateGuid() };

      parsed.items.push(itemWithId);

      return JSON.stringify(parsed);
    } catch (error) {
      console.error('Error parsing existing edit log:', error);
      return JSON.stringify({ items: [newHistoryLog] });
    }
  },

  parseHistoryItem: (historyLog: string | null): HistoryItem[] => {
    if (!historyLog) return [];

    try {
      const parsed = JSON.parse(historyLog);

      if (Array.isArray(parsed.items)) {
        return parsed.items as HistoryItem[];
      }

      return [];
    } catch (error) {
      console.error('Error parsing edit log:', error);
      return [];
    }
  },

  generateHistoryItem: (
    reason: string,
    processedName = '',
    status = 'New',
    dateFiled?: string,
    onBehalfName?: string,
  ): Omit<HistoryItem, 'id'> => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    return {
      deviceName: 'Mobile',
      reason: reason.trim(),
      date,
      time,
      processedBy: {
        name: processedName,
        id: 0,
      },
      status: {
        name: status,
      },
      dateFiled,
      onBehalfName,
    };
  },

  redirectSelection: (setHandle: React.Dispatch<Partial<TypeHandle>>) => {
    return Gesture.Tap()
      .runOnJS(true)
      .numberOfTaps(5)
      .onStart(async () => {
        // remove as per QA
        // setHandle({
        //   isToast: {
        //     show: true,
        //     set: 2,
        //     message: (await Utils.extractValue(STRINGS.geoPattern, STRINGS.HRDotNet)) as unknown as string,
        //   },
        // });
      });
  },

  requestFieldError: () => {
    return <FontAwesome name="asterisk" size={6} color={COLORS.red} style={{ marginTop: 2 }} />;
  },

  objectHaveValues: (val: { [key: string]: unknown }) => {
    return Object.values(val).every((value) => value !== '' || value !== undefined || value !== null);
  },

  checkExistFileAttach: (attach: string, exec?: string) => {
    return !attach ? '' : exec;
  },

  extractFileFormat: async (val: string) => {
    return val.substring(val.lastIndexOf('.') + 1).toLowerCase();
  },

  extractFileAttach: async (params: ParamsAttachedFile, parsed: Array<{ path: string }>) => {
    return `${process.env.EXPO_PUBLIC_REQUEST}/Uploads/${params?.filing?.documentNo.replace(/[^A-Za-z]/g, '')}/${parsed[0].path}?${DateTimeUtils.day()}`;
  },

  fileAttach: async (setState: React.Dispatch<Partial<{ attachment: { uri: string; format: string } }>>) => {
    const result = await DocumentPicker.getDocumentAsync();

    if (!result.canceled) {
      const fileInfo = result?.assets[0];
      const uri = fileInfo?.uri;

      const fileExtension = await Utils.extractFileFormat(uri);
      const fileSizeInMB = fileInfo?.size ? fileInfo.size / (1024 * 1024) : 0;

      const onHandleFilename = async (uri: string) => {
        const convertedUri = `${FileSystem.documentDirectory}${fileInfo?.name}`;
        await FileSystem.copyAsync({ from: uri, to: convertedUri });
        return convertedUri;
      };

      if (fileSizeInMB <= 25 && ARRAY.fileFormats.includes(fileExtension)) {
        const convertedUri = `${FileSystem.documentDirectory}${fileInfo?.name}`;
        await FileSystem.copyAsync({ from: uri, to: convertedUri });

        if (ARRAY.imageFormat.includes(fileExtension)) {
          const resizedImage = await ImageManipulator.manipulateAsync(uri, [], { compress: 0.2 });
          setState({
            attachment: { uri: await onHandleFilename(resizedImage.uri), format: fileExtension },
          });
        } else {
          setState({ attachment: { uri: await onHandleFilename(uri), format: fileExtension } });
        }
      } else {
        fileSizeInMB > 25 ? alert(ERRORS.fileSizeError) : alert(ERRORS.fileFormatError);
      }
    }
  },

  cameraPermission: async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Utils.alertSingle(ERRORS.permissionTitle, ERRORS.permissionCamera, () => Linking.openSettings());
    } else {
      return true;
    }
  },

  amountFormat: (amount: number) => {
    return amount
      ? amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      : 0;
  },

  placeholderLoading: (state?: { imageSize: number }) => {
    return (
      <ActivityIndicator
        size={'small'}
        color={COLORS.darkGray}
        style={{ height: state!.imageSize, width: state!.imageSize }}
      />
    );
  },

  calculationDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const deg2rad = (deg: number) => deg * (Math.PI / 180);
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000;

    return distance;
  },

  extractValue: async (value: string, select: string) => {
    return CryptoJS.AES.decrypt(value, select).toString(CryptoJS.enc.Utf8);
  },

  locationPermissionEnabled: async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        ERRORS.permissionTitle,
        ERRORS.permissionLocation,
        [{ text: 'OK', onPress: () => Linking.openSettings() }],
        { cancelable: false },
      );
    }
  },

  geolocation: async (setState: React.Dispatch<React.SetStateAction<StateClockInOut>>) => {
    Location.hasServicesEnabledAsync()
      .then(async (isLocationEnabled) => {
        if (!isLocationEnabled) {
          return Location.enableNetworkProviderAsync();
        } else {
          return Location.getCurrentPositionAsync({});
        }
      })
      .then((result) => {
        const { coords }: { coords: { latitude: number; longitude: number } } = result as Location.LocationObject;
        return Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      })
      .then((geocodeLocation) => {
        if (geocodeLocation) {
          const loc = geocodeLocation[0];
          setState((prevState) => ({
            ...prevState,
            location:
              loc &&
              `${loc?.name || ''} ${loc?.street || ''} 
                            ${loc?.city ? loc?.city + ', ' : ''} ${loc?.country || ''}`,
          }));
        }
      })
      .catch((error) => {
        alert(error);
      });
  },

  getLocationClocked: async (state: StateClockInOut, setState: React.Dispatch<Partial<StateClockInOut>>) => {
    try {
      await Utils.locationPermissionEnabled();

      const userLocation = await Location.getCurrentPositionAsync({});
      const geocodeLocation = await Location.reverseGeocodeAsync({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      const checkNull = (value: string | null) => (value != null ? value : '');
      const currAddress = geocodeLocation[0];

      setState({
        clockedData: {
          ...state.clockedData,
          address: currAddress
            ? `${checkNull(currAddress?.name)} ${checkNull(currAddress?.street)} ` +
            `${checkNull(currAddress?.city)} ${checkNull(currAddress?.country)}`
            : STRINGS.noAddressLocation,
        },
      });

      const locationWatcher = await Location.watchPositionAsync({ distanceInterval: 5 }, (newLocation) => {
        setState({
          location: newLocation.coords,
          region: {
            ...state.region,
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          },
        });

        const insideGeofences = state.geofences.map(
          (geofence: { latitude: number; longitude: number; radius: number }) => {
            const distance = Utils.calculationDistance(
              newLocation.coords.latitude,
              newLocation.coords.longitude,
              geofence.latitude,
              geofence.longitude,
            );

            return distance <= geofence.radius;
          },
        );

        setState({ isInside: insideGeofences });
      });

      return () => locationWatcher.remove();
    } catch (error) {
      Utils.getLocationClocked(state, setState);
    }
  },

  setSelectionList: (params: ParamsSelectionList) => {
    let select: unknown = [];
    let stateLocationID = params.stateLocationID;

    switch (params?.action) {
      case STRINGS.selectionListOBRequestI:
        select = ARRAY.locationList;
        break;

      case STRINGS.selectionListOBRequestII:
        select = ARRAY.branchList.filter((item) =>
          stateLocationID === undefined
            ? item.IDLocation === params.currParams.location?.ID || []
            : item.IDLocation === stateLocationID,
        );
        break;

      case STRINGS.selectionListCOSRequest:
        // select = ARRAY.requestSchedule;
        select = [];
        break;

      case STRINGS.selectionListLVRequest:
        select = ARRAY.leaveTypes;
        break;

      default:
        [];
        break;
    }

    return select;
  },

  setSelectionNavigate: (
    params: { action: string; currParams: unknown },
    navigation: NavigationProp<ParamListBase>,
    item: TypeSelectionList,
  ) => {
    let navigate: unknown = [];

    const onHandleNavigate = (path: string, title: string) => {
      navigation.goBack();
      navigation.navigate(path, {
        ...params?.currParams!,
        [title]: { ID: item.ID, name: item.name, code: item.code },
      });
    };

    switch (params?.action) {
      case STRINGS.selectionListCOSRequest:
        onHandleNavigate(STRINGS.pathCOSRequest, 'requested');
        break;

      case STRINGS.selectionListOBRequestI:
        onHandleNavigate(STRINGS.pathOBRequest, 'location');
        break;

      case STRINGS.selectionListOBRequestII:
        onHandleNavigate(STRINGS.pathOBRequest, 'branch');
        break;

      case STRINGS.selectionListLVRequest:
        onHandleNavigate(STRINGS.pathLVRequest, 'leaveType');
        break;

      default:
        undefined;
        break;
    }

    return navigate;
  },

  setRequestDetailsType: (panel: number) => {
    let type: string = '';

    switch (panel) {
      case onPanel.COS:
        type = STRINGS.changeOfSchedule;
        break;
      case onPanel.OB:
        type = STRINGS.officialBusiness;
        break;
      case onPanel.OT:
        type = STRINGS.overtime;
        break;
      case onPanel.OFF:
        type = STRINGS.offset;
        break;
      case onPanel.LV:
        type = STRINGS.leave;
        break;
      case onPanel.ML:
        type = STRINGS.missedLog;
        break;
      default:
        type = '';
    }

    return type;
  },

  setItemRequestFilter: (value: number, set: React.Dispatch<React.SetStateAction<unknown[]>>) => {
    switch (value) {
      case onPanel.COS:
        set(ARRAY.COSFilter);
        break;

      case onPanel.OB:
        set(ARRAY.OBFilter);
        break;

      case onPanel.OT:
        set(ARRAY.OTFilter);
        break;

      case onPanel.OFF:
        set(ARRAY.OFFFilter);
        break;

      case onPanel.LV:
        set(ARRAY.LVFilter);
        break;

      case onPanel.ML:
        set(ARRAY.MLFilter);
        break;

      default:
        break;
    }
  },

  panelNavigateCamera: (
    panel: number | unknown,
    navigation: NavigationProp<ParamListBase>,
    params: { onPanel?: number },
    uri: string,
    ext: string,
  ) => {
    const navigateToScreen = (screen: string) => {
      navigation.navigate(screen, { ...params, image: { uri: uri, format: ext } });
    };

    switch (panel) {
      case onPanel.COS:
        navigateToScreen(STRINGS.pathCOSRequest);
        break;

      case onPanel.OB:
        navigateToScreen(STRINGS.pathOBRequest);
        break;

      case onPanel.OT:
        navigateToScreen(STRINGS.pathOTRequest);
        break;

      case onPanel.OFF:
        navigateToScreen(STRINGS.pathOFFRequest);
        break;

      case onPanel.LV:
        navigateToScreen(STRINGS.pathLVRequest);
        break;

      case onPanel.ML:
        navigateToScreen(STRINGS.pathMLRequest);
        break;

      default:
        break;
    }
  },

  panelNavigateRequest: (
    panel: number,
    reqAction: number,
    navigation: NavigationProp<ParamListBase>,
    data?: SchemaRequestApplications,
  ) => {
    const params = reqAction === onReqAction.New ? undefined : data;
    const navigatePath = (path: string) => {
      navigation.navigate(path, { onReqAction: reqAction, data: params });
    };

    switch (panel) {
      case onPanel.COS:
        navigatePath(STRINGS.pathCOSRequest);
        break;

      case onPanel.OB:
        navigatePath(STRINGS.pathOBRequest);
        break;

      case onPanel.OT:
        navigatePath(STRINGS.pathOTRequest);
        break;

      case onPanel.OFF:
        navigatePath(STRINGS.pathOFFRequest);
        break;

      case onPanel.LV:
        navigatePath(STRINGS.pathLVRequest);
        break;

      case onPanel.ML:
        navigatePath(STRINGS.pathMLRequest);
        break;

      case onPanel.CTO:
        navigatePath(STRINGS.pathCTORequest);
        break;

      default:
        break;
    }
  },

  getChangedFields: (newValues: any, oldValues: any, optionalKeys: string[] = []) => {
    const changes: Record<string, { from: any; to: any }> = {};

    Object.keys(newValues).forEach((key) => {
      const newVal = newValues[key];
      const oldVal = oldValues[key];

      const isOptional = optionalKeys.includes(key);

      if (
        !isOptional &&
        (newVal === null ||
          newVal === undefined ||
          (typeof newVal === 'string' && newVal.trim() === '') ||
          newVal === 'Invalid Date')
      ) {
        return;
      }

      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        changes[key] = { from: oldVal, to: newVal };
      }
    });

    return changes;
  },

  getAttachmentHistory: (
    originalAttachments: AttachmentHistory[],
    newAttachments: AttachmentHistory[],
    employeeName: string,
  ): string[] => {
    const originalNames = originalAttachments.map((f) => f.name);
    const newNames = newAttachments.map((f) => f.name);

    const added = newNames.filter((name) => !originalNames.includes(name));
    const removed = originalNames.filter((name) => !newNames.includes(name));

    const history: string[] = [];

    if (added.length || removed.length) {
      history.push(`${employeeName} modified the attachment`);
    }

    return history;
  },

  alertSingle: (title: string, message: string, action: () => void) => {
    Alert.alert(title, message, [{ text: 'OK', onPress: async () => await action() }], { cancelable: false });
  },

  checkHaveValueRequest: async (
    panel: number,
    reqAction: number,
    state: unknown, // Data sa Form
    params: unknown,
    setHandle: React.Dispatch<Partial<TypeHandle>>,
    navigation: NavigationProp<ParamListBase>,
  ) => {
    const getSourceVal = (value: string) => {
      if (FieldLabels[panel] && value in FieldLabels[panel]) {
        return FieldLabels[panel][value];
      }
      return value;
    };

    const formatKey = (key: string) => {
      let field = key.replace(/([a-z])([A-Z])/g, '$1 $2');
      field = field
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      const enumVal = getSourceVal(key);
      return `${enumVal === key ? field : enumVal} is Required.`;
    };

    const isEmptyValue = (value: unknown): boolean => {
      if (value == null || value === '') {
        return true;
      }
      if (Array.isArray(value)) {
        return value.length === 0 || value.every(isEmptyValue);
      }
      if (typeof value === 'object') {
        return Object.keys(value).length === 0 || Object.values(value).every(isEmptyValue);
      }
      return false;
    };

    const checkEmpty = async (obj: { [key: string]: unknown }) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          //  skip checking
          if (
            ['branch'].includes(key) ||
            ['restDay'].includes(key) ||
            ['documentNo'].includes(key) ||
            ['referenceNo'].includes(key) ||
            (panel === 3 && reqAction === 5 && key === 'timeRecord') ||
            (panel === 3 && reqAction === 4 && key === 'timeRecord') ||
            (panel === 3 && reqAction === 3 && key === 'timeRecord') ||
            (panel === 2 && reqAction === 5 && key === 'timeRecord') ||
            (panel === 2 && reqAction === 4 && key === 'timeRecord') ||
            (panel === 2 && reqAction === 3 && key === 'timeRecord') ||
            (key === 'cancelReason' && [1, 2, 4, 5].includes(reqAction)) ||
            (key === 'reviewReason' && [1, 2, 3, 5].includes(reqAction)) ||
            (key === 'approveReason' && [1, 2, 3, 4].includes(reqAction))
          ) {
            continue;
          }
          if (isEmptyValue(value)) {
            // alert(formatKey(key));
            Alert.alert(
              '', // Leave the title as an empty string
              formatKey(key), // Message
              [
                { text: 'OK' }, // Button options
              ],
            );
            return false;
          }
        }
      }
      return true;
    };

    const CheckIsEmptyAll = async (obj: { [key: string]: unknown }) => {
      const requiredFields = RequiredFieldRequest[panel as RequestType];
      for (const field of requiredFields) {
        if (obj.hasOwnProperty(field)) {
          isEmptyValue(obj[field]);
          if (!isEmptyValue(obj[field])) {
            return false;
          }
        }
      }
      if (requiredFields.length > 0) {
        return true;
      }
    };

    if (await CheckIsEmptyAll(state as { [key: string]: unknown })) {
      // alert('Please complete your request form.');
      Alert.alert(
        '', // Leave the title as an empty string
        'Please complete your request form.', // Message
        [
          { text: 'OK' }, // Button options
        ],
      );
      setHandle({ isInputCheck: true });
    } else if (!(await checkEmpty(state as { [key: string]: unknown }))) {
      setHandle({ isInputCheck: true });
      return;
    } else {
      navigation.navigate(STRINGS.pathRequestSummary, {
        onPanel: panel,
        onReqAction: reqAction,
        data: params,
        props: state,
      });
    }
  },

  platformCheck: () => {
    return Platform.OS === 'ios' ? true : false; // True for IOS, False for Android
  },

  trimData: (state: AllApplicationState) => {
    return {
      ...state,
      reason: state.reason?.trim() || '',
      referenceNo: state.referenceNo?.trim() || '',
      reviewReason: state.reviewReason?.trim() || '',
      approveReason: state.approveReason?.trim() || '',
      cancelReason: state.cancelReason?.trim() || '',
    };
  },

  normalize: (date: string) => {
    const dateFiled = new Date(date);
    dateFiled.setHours(0, 0, 0, 0);
    return dateFiled.getTime();
  },

  hasDateRangeOverlap(newFrom: string, newTo: string, existingFrom: string, existingTo: string): boolean {
    const start = Utils.normalize(newFrom);
    const end = Utils.normalize(newTo);
    const exStart = Utils.normalize(existingFrom);
    const exEnd = Utils.normalize(existingTo);
    return start <= exEnd && end >= exStart;
  },

  panelDateToParse: (panel: number, data?: PropsRequestSummary) => {
    let dateToParse: string | { dateFrom: string; dateTo: string } | undefined = undefined;

    switch (panel) {
      case onPanel.COS:
        dateToParse = DateTimeUtils.abbreviatedMonthDateRange(data?.startDate || '', data?.endDate || '');
        break;

      case onPanel.OB:
        dateToParse = DateTimeUtils.toDateRangeHalftMonthWord(data?.OBDateFrom!, data?.OBDateTo!);
        break;

      case onPanel.OT:
      case onPanel.OFF:
        dateToParse = DateTimeUtils.getIsoDateWord(data?.date || '');
        break;

      case onPanel.LV:
        dateToParse = DateTimeUtils.abbreviatedMonthDateRange(data?.startDate || '', data?.endDate || '');
        break;

      case onPanel.ML:
        dateToParse = DateTimeUtils.getIsoDateWord(data?.dateFiled || '');
        break;

      default:
        dateToParse = '';
        break;
    }
    return dateToParse;
  },

  panelBatchDateParse: (panel: number, data?: SchemaRequestApplications) => {
    let dateToParse: string | { dateFrom: string; dateTo: string } | undefined = undefined;

    switch (panel) {
      case 0:
        const dateFiled = data?.filing?.dateFiled;

        dateToParse = DateTimeUtils.abbreviatedMonthDateRange(
          typeof dateFiled === 'object' ? dateFiled.dateFrom : '',
          typeof dateFiled === 'object' ? dateFiled.dateTo : '',
        );
        break;

      case 1:
        dateToParse = DateTimeUtils.getIsoDateWord((data?.filing?.dateFiled as string) || '');
        break;

      case 2:
        dateToParse = DateTimeUtils.getIsoDateWord((data?.filing?.dateFiled as string) || '');
        break;

      case 3:
        dateToParse = DateTimeUtils.getIsoDateWord((data?.filing?.dateFiled as string) || '');
        break;

      case 4:
        const leaveDateFiled = data?.filing?.dateFiled;

        dateToParse = DateTimeUtils.abbreviatedMonthDateRange(
          typeof leaveDateFiled === 'object' ? leaveDateFiled.dateFrom : '',
          typeof leaveDateFiled === 'object' ? leaveDateFiled.dateTo : '',
        );
        break;

      case 5:
        dateToParse = DateTimeUtils.getIsoDateWord((data?.filing?.dateFiled as string) || '');
        break;

      default:
        dateToParse = '';
        break;
    }
    return dateToParse;
  },

  parseAttachments: (attachments?: string | any[]) => {
    if (!attachments) return [];

    return typeof attachments === 'string' ? JSON.parse(attachments) : attachments;
  },

  panelCompareFields: (panel: number, newData?: PropsRequestSummary, oldData?: SchemaRequestApplications) => {
    let newFields = {};
    let oldFields = {};

    switch (panel) {
      case onPanel.COS:
        const dateTo =
          typeof oldData?.filing.dateFiled === 'object' ? oldData.filing.dateFiled.dateTo : oldData?.filing.dateFiled;
        const dateFrom =
          typeof oldData?.filing.dateFiled === 'object' ? oldData.filing.dateFiled.dateFrom : oldData?.filing.dateFiled;

        newFields = {
          DateFrom: DateTimeUtils.isoToDateWord(String(newData?.startDate)),
          DateTo: DateTimeUtils.isoToDateWord(String(newData?.endDate)),
          Schedule: newData?.requested.name,
          RestDay: newData?.restDay == 0 ? false : true,
          Reason: newData?.reason,
          ReferenceNo: newData?.referenceNo ?? '',
        };

        oldFields = {
          DateFrom: DateTimeUtils.isoToDateWord(String(dateFrom)),
          DateTo: DateTimeUtils.isoToDateWord(String(dateTo)),
          Schedule: oldData?.filing.requested?.name,
          RestDay: oldData?.filing.requested?.isRestDay,
          Reason: oldData?.filing.reason,
          ReferenceNo: oldData?.filing.referenceNo ?? '',
        };

        break;

      case onPanel.ML:
        newFields = {
          DateFiled: DateTimeUtils.isoToDateWord(String(newData?.dateFiled)),
          LogType: newData?.logType.name,
          TimeInOut: newData?.logTime,
          Reason: newData?.reason,
          ReferenceNo: newData?.referenceNo ?? '',
        };

        oldFields = {
          DateFiled: DateTimeUtils.isoToDateWord(String(oldData?.filing.dateFiled)),
          LogType: oldData?.filing?.logType?.name,
          TimeInOut: oldData?.filing.timeInOut,
          Reason: oldData?.filing.reason,
          ReferenceNo: oldData?.filing.referenceNo ?? '',
        };
        break;

      case onPanel.OFF:
        newFields = {
          OffsetDate: DateTimeUtils.isoToDateWord(String(newData?.dateFiled)),
          'OFF From': DateTimeUtils.isoToTimeSecondToPMAM(newData?.reqTimeIn!),
          'OFF To': DateTimeUtils.isoToTimeSecondToPMAM(newData?.reqTimeOut!),
          Reason: newData?.reason,
          ReferenceNo: newData?.referenceNo ?? '',
        };

        oldFields = {
          OffsetDate: DateTimeUtils.isoToDateWord(String(oldData?.filing.dateFiled)),
          'OFF From': DateTimeUtils.isoToTimeSecondToPMAM(oldData?.filing.requested?.dateFrom!),
          'OFF To': DateTimeUtils.isoToTimeSecondToPMAM(oldData?.filing.requested?.dateTo!),
          Reason: oldData?.filing.reason,
          ReferenceNo: oldData?.filing.referenceNo ?? '',
        };
        break;

      case onPanel.OT:
        newFields = {
          OvertimeDate: DateTimeUtils.isoToDateWord(String(newData?.dateFiled)),
          'OT From': DateTimeUtils.isoToTimeSecondToPMAM(newData?.reqTimeIn!),
          'OT To': DateTimeUtils.isoToTimeSecondToPMAM(newData?.reqTimeOut!),
          Reason: newData?.reason,
          ReferenceNo: newData?.referenceNo ?? '',
        };

        oldFields = {
          OvertimeDate: DateTimeUtils.isoToDateWord(String(oldData?.filing.dateFiled)),
          'OT From': DateTimeUtils.isoToTimeSecondToPMAM(oldData?.filing.requested?.dateFrom!),
          'OT To': DateTimeUtils.isoToTimeSecondToPMAM(oldData?.filing.requested?.dateTo!),
          Reason: oldData?.filing.reason,
          ReferenceNo: oldData?.filing.referenceNo ?? '',
        };
        break;

      case onPanel.LV:
        newFields = {
          Reason: newData?.reason.trim(),
          ReferenceNo: newData?.referenceNo.trim() ?? "",
        };

        oldFields = {
          Reason: oldData?.filing.reason.trim(),
          ReferenceNo: oldData?.filing?.referenceNo ?? "",
        };
        break;

      case onPanel.OB:
        newFields = {
          DateFrom: DateTimeUtils.isoToDateWord(String(newData?.OBDateFrom)),
          DateTo: DateTimeUtils.isoToDateWord(String(newData?.OBDateTo)),
          TimeIn: newData?.OBTimeIn,
          TimeOut: newData?.OBTimeOut,
          Location: newData?.location.name ?? '',
          LocationBranch: newData?.branch.name ?? '',
          ReferenceNo: newData?.referenceNo ?? '',
          Reason: newData?.reason,
        };

        oldFields = {
          DateFrom: DateTimeUtils.isoToDateWord(String(oldData?.filing.dateRange?.dateFrom)),
          DateTo: DateTimeUtils.isoToDateWord(String(oldData?.filing.dateRange?.dateTo)),
          TimeIn: oldData?.filing?.timeRange?.timeIn,
          TimeOut: oldData?.filing.timeRange?.timeOut,
          Location: oldData?.filing.location?.name ?? '',
          LocationBranch: oldData?.filing.location?.locationBranch ?? '',
          ReferenceNo: oldData?.filing.referenceNo ?? '',
          Reason: oldData?.filing.reason,
        };
        break;

      default:
        break;
    }

    return {
      newFields,
      oldFields,
    };
  },

  panelReadableChanges: (
    panel: number,
    changedFields: Record<string, { from: any; to: any }>,
    attachmentChanges: string[],
    oldData: SchemaRequestApplications,
  ) => {
    switch (panel) {
      case onPanel.COS:
        const orderedFields = [FieldKey.Schedule, FieldKey.RestDay, FieldKey.ReferenceNo, FieldKey.Reason];
        const dateFromChange = changedFields[FieldKey.DateFrom];
        const dateToChange = changedFields[FieldKey.DateTo];

        const dateTo =
          typeof oldData?.filing.dateFiled === 'object' ? oldData.filing.dateFiled.dateTo : oldData?.filing.dateFiled;
        const dateFrom =
          typeof oldData?.filing.dateFiled === 'object' ? oldData.filing.dateFiled.dateFrom : oldData?.filing.dateFiled;

        const dateFromToUse = dateFromChange?.from || DateTimeUtils.isoToDateWord(String(dateFrom));
        const dateToUse = dateFromChange?.to || DateTimeUtils.isoToDateWord(String(dateTo));

        return [
          ...(dateFromChange || dateToChange
            ? [
              `${fieldDisplayNames.COSDatePeriod}: from ${DateTimeUtils.abbreviatedMonthDateRange(
                DateTimeUtils.formatToDash(dateFromChange?.from || dateFromToUse),
                DateTimeUtils.formatToDash(dateToChange?.from || dateToUse),
              )} into "${DateTimeUtils.abbreviatedMonthDateRange(
                DateTimeUtils.formatToDash(dateFromChange?.to || dateFromToUse),
                DateTimeUtils.formatToDash(dateToChange?.to || dateToUse),
              )}"`,
            ]
            : []),

          ...orderedFields
            .filter((key) => changedFields[key])
            .map((key) => {
              const { from, to } = changedFields[key];
              const displayKey = fieldDisplayNames[key] ?? key;

              if (key === FieldKey.ReferenceNo) {
                if (!from && to) return `${displayKey}: Added "${to}"`;
                if (from && !to) return `${displayKey}: Removed "${from}"`;
                return `${displayKey}: from "${from}" into "${to}"`;
              }

              if (key === FieldKey.RestDay) {
                const fromLabel = from === true || from === 'true' ? 'Yes' : 'No';
                const toLabel = to === true || to === 'true' ? 'Yes' : 'No';
                return `${displayKey}: from "${fromLabel}" into "${toLabel}"`;
              }

              return `${displayKey}: from "${from}" into "${to}"`;
            }),
          ...attachmentChanges,
        ].join(', ');
      case onPanel.ML:
        return [
          ...Object.entries(changedFields)
            .filter(([key]) => !['FileAttachment', 'UploadedFile'].includes(key))
            .map(([key, { from, to }]) => {
              const displayKey = fieldDisplayNames[key] ?? key;

              switch (key) {
                case FieldKey.TimeInOut:
                  return `${displayKey}: from "${DateTimeUtils.isoToTimeSecondToPMAM(from)}" into "${DateTimeUtils.isoToTimeSecondToPMAM(to)}"`;

                case FieldKey.MLDateFiled:
                  return `${fieldDisplayNames.MLDateFiled}: from "${DateTimeUtils.formatDateToMonthDayYear(from)}" into "${DateTimeUtils.formatDateToMonthDayYear(to)}"`;

                case FieldKey.ReferenceNo:
                  if (!from && to) {
                    return `${displayKey}: Added "${to}"`;
                  }

                  if (from && !to) {
                    return `${displayKey}: Removed "${from}"`;
                  }

                  return `${displayKey}: from "${from}" into "${to}"`;

                default:
                  return `${displayKey}: from "${from}" into "${to}"`;
              }
            }),

          ...attachmentChanges,
        ].join(', ');

      case onPanel.OT:
        return [
          ...Object.entries(changedFields)
            .filter(([key]) => !['FileAttachment', 'UploadedFile'].includes(key))
            .map(([key, { from, to }]) => {
              const displayKey = fieldDisplayNames[key] ?? key;

              switch (key) {
                case FieldKey.OTDate:
                  return `${displayKey}: from "${DateTimeUtils.formatDateToMonthDayYear(
                    from,
                  )}" into "${DateTimeUtils.formatDateToMonthDayYear(to)}"`;

                case FieldKey.OTFrom:
                case FieldKey.OTTo:
                  return `${displayKey}: from "${from}" into "${to}"`;

                case FieldKey.ReferenceNo:
                  if (!from && to) {
                    return `${displayKey}: Added "${to}"`;
                  }

                  if (from && !to) {
                    return `${displayKey}: Removed "${from}"`;
                  }

                  return `${displayKey}: from "${from}" into "${to}"`;

                default:
                  return `${displayKey}: from "${from}" into "${to}"`;
              }
            }),

          ...attachmentChanges,
        ].join(', ');

      case onPanel.OFF:
        return [
          ...Object.entries(changedFields)
            .filter(([key]) => !['FileAttachment', 'UploadedFile'].includes(key))
            .map(([key, { from, to }]) => {
              const displayKey = fieldDisplayNames[key] ?? key;

              switch (key) {
                case FieldKey.OTDate:
                  return `${displayKey}: from "${DateTimeUtils.formatDateToMonthDayYear(
                    from,
                  )}" into "${DateTimeUtils.formatDateToMonthDayYear(to)}"`;

                case FieldKey.OTFrom:
                case FieldKey.OTTo:
                  return `${displayKey}: from "${from}" into "${to}"`;

                case FieldKey.ReferenceNo:
                  if (!from && to) {
                    return `${displayKey}: Added "${to}"`;
                  }

                  if (from && !to) {
                    return `${displayKey}: Removed "${from}"`;
                  }

                  return `${displayKey}: from "${from}" into "${to}"`;

                default:
                  return `${displayKey}: from "${from}" into "${to}"`;
              }
            }),

          ...attachmentChanges,
        ].join(', ');

      case onPanel.LV:
        return [
          ...Object.entries(changedFields)
            .filter(([key]) => !["FileAttachment", "UploadedFile"].includes(key))
            .map(([key, { from, to }]) => {
              const displayKey = fieldDisplayNames[key] ?? key;

              if (key === FieldKey.ReferenceNo) {
                if (!from && to) {
                  return `${displayKey}: Added "${to}"`;
                }

                if (from && !to) {
                  return `${displayKey}: Removed "${from}"`;
                }

                return `${displayKey}: from "${from}" into "${to}"`;
              }

              return `${displayKey}: from "${from}" into "${to}"`;
            }),

          ...attachmentChanges,
        ].join(", ");;

      case onPanel.OB:
        return [
          ...Object.entries(changedFields)
            .filter(([key]) => !['FileAttachment', 'UploadedFile', 'DateFrom', 'DateTo'].includes(key))
            .map(([key, { from, to }]) => {
              const displayKey = fieldDisplayNames[key] ?? key;

              if (key === FieldKey.TimeIn) {
                return `${displayKey}: from "${DateTimeUtils.isoToTimeSecondToPMAM(from)}" into "${DateTimeUtils.isoToTimeSecondToPMAM(to)}"`;
              }

              if (key === FieldKey.TimeOut) {
                return `${displayKey}: from "${DateTimeUtils.isoToTimeSecondToPMAM(from)}" into "${DateTimeUtils.isoToTimeSecondToPMAM(to)}"`;
              }

              if (key === FieldKey.LocationBranch) {
                return `${displayKey}: from "${from}" into "${to}"`;
              }

              if (key === FieldKey.ReferenceNo) {
                if (!from && to) {
                  return `${displayKey}: Added "${to}"`;
                }

                if (from && !to) {
                  return `${displayKey}: Removed "${from}"`;
                }

                return `${displayKey}: from "${from}" into "${to}"`;
              }

              return `${displayKey}: from "${from}" into "${to}"`;
            }),

          ...attachmentChanges,
        ].join(', ');

      default:
        return '';
    }
  },
  itemApprovalsContent: (data: SchemaRequestApplications, panel: number) => {
    let content: Array<{ label: string; value: string }> = [];

    switch (panel) {
      case 0:
        content = [
          { label: STRINGS.cllnDocumentNo, value: data?.filing.documentNo },
          { label: 'Status: ', value: data?.filing?.filingStatus?.name! },
          { label: 'Requested Schedule: ', value: data?.filing?.requested?.name! },
        ];
        break;

      case 1:
        content = [
          { label: STRINGS.cllnDocumentNo, value: data?.filing.documentNo },
          { label: 'Status: ', value: data?.filing?.filingStatus?.name! },
          {
            label: `${STRINGS.cllnOBTime}:`,
            value: DateTimeUtils.twoTimeRangeFormat(
              data?.filing?.timeRange?.timeIn!,
              data?.filing?.timeRange?.timeOut!,
            ),
          },
          { label: STRINGS.cllnLocation, value: data?.filing?.location?.name! },
        ];
        break;

      case 2:
        content = [
          { label: STRINGS.cllnDocumentNo, value: data?.filing.documentNo },
          { label: 'Status: ', value: data?.filing?.filingStatus?.name! },
          {
            label: STRINGS.cllnOvertimeHours,
            value: DateTimeUtils.twoIsoTimeRangeFormat(
              data?.filing?.requested?.dateFrom!,
              data?.filing?.requested?.dateTo!,
            ),
          },
        ];
        break;

      case 3:
        content = [
          { label: STRINGS.cllnDocumentNo, value: data?.filing.documentNo },
          { label: 'Status: ', value: data?.filing?.filingStatus?.name! },
          {
            label: STRINGS.cllnOffsetHours,
            value: DateTimeUtils.twoIsoTimeRangeFormat(
              data?.filing?.requested?.dateFrom!,
              data?.filing?.requested?.dateTo!,
            ),
          },
        ];
        break;

      case 4:
        content = [
          { label: STRINGS.cllnDocumentNo, value: data?.filing.documentNo },
          { label: 'Status: ', value: data?.filing?.filingStatus?.name! },
          { label: 'Leave Type: ', value: data?.filing?.leaveParameter?.name! },
          { label: 'Leave Option: ', value: data?.filing?.leaveOption?.name! },
        ];
        break;

      case 5:
        content = [
          { label: STRINGS.cllnLogType, value: data?.filing?.logType?.name! },
          { label: STRINGS.cllnDocumentNo, value: data?.filing.documentNo },
          { label: 'Status: ', value: data?.filing?.filingStatus?.name! },
          { label: 'Log Time: ', value: DateTimeUtils.timeSecondsToUnits(data?.filing?.timeInOut!) },
        ];
        break;

      case 6:
        content = [
          { label: STRINGS.cllnLogType, value: data?.filing?.logType?.name! },
          { label: STRINGS.cllnDocumentNo, value: data?.filing.documentNo },
          { label: 'Status: ', value: data?.filing?.filingStatus?.name! },
          { label: 'Log Time: ', value: DateTimeUtils.timeSecondsToUnits(data?.filing?.timeInOut!) },
        ];
        break;

      default:
        content = [{ label: '', value: '' }];
        break;
    }

    return content;
  },

  resetNavigation: async (nav: TypeNavStack['navigation'], name: string, screen: string) =>
    nav.reset({ index: 0, routes: [{ name: name, params: { screen: screen } }] }),
};

type CutOffPeriod = [string | null, string | null] | undefined;

export const FilingUtils = {
  isEligibleFiling: (
    item: SchemaRequestApplications,
    index: number,
    cutOffPeriod: CutOffPeriod,
    eligibleStatuses: string[] = [STRINGS.filed],
  ): boolean => {
    const filingStatus = item.filing?.filingStatus?.name;
    const hasEligibleStatus = filingStatus != null && eligibleStatuses.includes(filingStatus);

    if (!hasEligibleStatus) {
      return false;
    }

    if (index === FilingPanel.OB) {
      return (
        item.filing?.dateRange?.dateFrom! >= cutOffPeriod?.[0]! && item.filing?.dateRange?.dateTo! <= cutOffPeriod?.[1]!
      );
    }

    if (index === FilingPanel.COS || index === FilingPanel.CTO || index === FilingPanel.LV) {
      const dateFiled = item.filing?.dateFiled;

      if (typeof dateFiled === 'object' && dateFiled !== null) {
        return dateFiled.dateFrom >= cutOffPeriod?.[0]! && dateFiled.dateTo <= cutOffPeriod?.[1]!;
      }

      return false;
    }

    return item.filing?.dateFiled! >= cutOffPeriod?.[0]! && item.filing?.dateFiled! <= cutOffPeriod?.[1]!;
  },

  countEligible: (
    counts: Record<number, SchemaRequestApplications[]> | undefined,
    cutOffPeriod: CutOffPeriod,
    eligibleStatuses: string[] = [STRINGS.filed],
  ): number => {
    return Object.entries(counts ?? {}).reduce((total, [indexStr, items]) => {
      const index = Number(indexStr);
      const eligible = (items ?? []).filter((item) =>
        FilingUtils.isEligibleFiling(item, index, cutOffPeriod, eligibleStatuses),
      );
      return total + eligible.length;
    }, 0);
  },
};


export const RequestCounts = {
  refreshReviewalCounts: async () => {
    const { cutOffPeriod, setReviewalCounts } = useGlobalStore.getState();
    const removeDashFrom = DateTimeUtils.getRemoveDash(cutOffPeriod[0] || "");
    const removeDashTo = DateTimeUtils.getRemoveDash(cutOffPeriod[1] || "");

    try {
      const counts = await useFetch.ReviewalsCounts(ValuesApprovals.State.buttons.length, removeDashFrom, removeDashTo);
      setReviewalCounts(counts);
    } catch (error) {
      console.error('Reviewal count refresh error:', error);
    }
  },

  refreshApprovalCounts: async () => {
    const { cutOffPeriod, setApprovalCounts } = useGlobalStore.getState();
    const removeDashFrom = DateTimeUtils.getRemoveDash(cutOffPeriod[0] || "");
    const removeDashTo = DateTimeUtils.getRemoveDash(cutOffPeriod[1] || "");

    try {
      const counts = await useFetch.ApprovalsCounts(ValuesApprovals.State.buttons.length, removeDashFrom, removeDashTo);
      setApprovalCounts(counts);
    } catch (error) {
      console.error('Approval count refresh error:', error);
    }
  },
};
