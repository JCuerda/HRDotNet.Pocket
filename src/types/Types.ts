// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco Jessie Cuerda

import { ImageRequireSource } from 'react-native';
import { MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { CameraType } from 'expo-camera';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { ReactElement, ReactNode } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { LatLng } from 'react-native-maps';
import { TeamMember, TeamSchema } from './Teams';

// Schema
export type SchemaLogin = {
  accessToken: string;
};

export type SchemaTimeRecord = {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  timeRecords: Array<TimeRecords>;
  dateRequested: string;
};

export type HistoryItem = {
  id?: number;
  guid?: string;
  deviceName: string;
  reason: string;
  date: string;
  time: string;
  processedBy: {
    id: number;
    name: string;
  };
  status?: {
    id?: number;
    name?: string;
  };
  dateFiled?: string;
  onBehalfName?: string;
};

export type SchemaRequestApplications = {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  filing: {
    id: number;
    guid: string;
    documentNo: string;

    requested?: {
      // COS
      id?: number;
      name?: string;
      isRestDay?: boolean;
      dateFrom?: string;
      dateTo?: string;
    };

    dateFiled?:
    | {
      dateFrom: string;
      dateTo: string;
    }
    | string;

    leaveParameter?: {
      // Leave
      id: number;
      code: string;
      name: string;
    };

    leaveOption?: {
      id: number;
      name: string;
      type: string;
      amount: number;
    };
    numberOfDays?: number;
    referenceNo?: string;

    location?: {
      // Official Business
      id: number;
      name: string;
      locationBranchId: number;
      locationBranch: string;
    };
    dateRange?: {
      dateFrom: string;
      dateTo: string;
    };
    timeRange?: {
      timeIn: string;
      timeOut: string;
    };

    timeInOut?: string; // Missed Log
    logType?: {
      id: number;
      name: string;
    };

    shiftSchedule?: {
      // Offset and OT
      id: number;
      name: string;
      date: string;
      timeIn: string;
      timeOut: string;
      breakTimeIn: string;
      breakTimeOut: string;
      isPremium: boolean;
      shiftType?:
      | {
        shiftTypeId: number;
        shiftType: string;
      }
      | string;
      shiftTypeId: number;
    };

    actual?: {
      dateFrom: string;
      dateTo: string;
    };
    totalCredits?: number;
    usedCredits?: number;
    currentCredits?: number;
    numberOfHours?: number;

    dateTransaction: string;
    filingStatus: {
      id: number;
      name: string;
    };
    reason: string;
    approveReason?: string;
    reviewReason?: string;
    cancelReason?: string;

    fileAttachment: string;
  };
  editLog: string;
  dateTransaction: string;
  isChecked?: boolean;
  total?: number;
};

export type SchemaFileAttachment = {
  path: string;
  name: string;
  isUploaded?: boolean;
};

export type SchemaLeaveLedger = {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  entries: LeaveLedgerEntries[];
  dateTransaction: string;
};

export type SchemaCalendarEntries = {
  documentNo: string;

  dateTimeRange?: {
    dateFrom: string;
    dateTo: string;
  };

  date?: string;

  filingStatus: {
    id: number;
    name: string;
  };

  source: string;
  isRestDay?: boolean;
};

export type SchemaCalendar = {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  calendarDates?: Array<{
    date: string;
    entries: Array<SchemaCalendarEntries>;
  }>;
  calendarDate?: {
    date: string;
    entries: Array<SchemaCalendarEntries>;
  };
  dateTransaction: string;
  markedDates?: Array<{
    date: string;
  }>;
};

// Approvals Manager
export type SchemaApprovalsManagerEntries = {
  recordId: number;
  employeeId: number;
  companyId: number;
  documentNo: string;
};

export type SchemaApprovalsManager = {
  filings: Array<SchemaApprovalsManagerEntries>;
  validator?: {
    id: number;
    code: string;
    name: string;
    companyId: number;
    branchId: number;
    departmentId: number;
  };
};

// Object Values
export type TypeNavProp = {
  navigation: NavigationProp<ParamListBase>;
};

export type TypePanel = {
  COS: number;
  OB: number;
  OT: number;
  OFF: number;
  LV: number;
  ML: number;
  CTO: number;
};

export type TypeReqAction = {
  New: number;
  Update: number;
  Cancel: number;
  Review: number;
  Approve: number;
};

export type TypeNavStack = {
  navigation: StackNavigationProp<ParamListBase>;
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Drawer: undefined;
};

export type TypeSelectionList = {
  ID?: number;
  code?: string;
  name?: string;
  value?: number;
};

export type Attachment = {
  format: string;
  uri: string;
  type?: string;
  url?: string;
};

export type Schedules = {
  id: number;
  name: string;
  date: string;
  timeIn: string;
  timeOut: string;
  breakTimeIn: string;
  breakTimeOut: string;
  shiftType:
  | {
    shiftTypeId: number;
    shiftType: string;
  }
  | string;
  shiftTypeId: number;
  isPremium: boolean;
};

export type TimeRecords = {
  date: string;
  source: string;
};

export type Toast = {
  show: boolean;
  set: number;
  message: string;
};

export type CheckboxData = {
  ID?: number;
  name?: string;
  value?: string | number;
  TOD?: string;
};

export type LeaveLedgerEntries = {
  id: number;
  guid: string;
  leaveParameter: {
    id: number;
    name: string;
  };
  dateTransaction: string;
  source: string;
  documentNo: string;
  debit: number;
  credit: number;
  particulars: string;
  businessYear: string;
};

export type TypeError = {
  request: {
    status?: number;
    _response?: string;
  };
};

export type TypeObjectValues = {
  title: string;
  value?: string | number;
  label?: string;
  width?: string;
  inputValue?: string | number;
  isInputCheck?: boolean;
  count?: number;
  badge?: ReactNode;
  disabled?: boolean;
  space?: boolean;
  image?: ImageRequireSource;
  withAsterisk?: boolean;
  navigate?: () => void;
  icon?: ReactElement;
};

export type TypeClockedData = {
  value: number;
  status: string;
  nextStatus: string;
  date: string;
  time: string;
};

export type TypeTimeOff = {
  count?: number | undefined;
  entries?: LeaveLedgerEntries[];
  data?: {
    count: number;
    entries: LeaveLedgerEntries[];
  };
  page?: number;
};

export type TypeApprovalPromptItem = {
  documentNo?: string;
  message?: string;
  filingProcess?: string;
};

// Temporary Schema Types
export type TypeSchemaNotification = {
  isRead: boolean;
  name: string;
  date: string;
  message: string;
  type: string;
};

export type TypeSchemaLoanLedger = {
  Name_LoanClassification: string;
  Balance: number;
  ID_DocStatus: number;
  DocumentNo: string;
  DocStatus: string;
};

export type TypeSchemaTimesheet = {
  [key: string]: {
    logs: Array<{
      time: string;
      location: string;
    }>;
  };
};

export type TypeSchemaPayslip = {
  recentPay: Array<{
    Date: string;
    NetPay: number;
    GrossPay: number;
    Deductions: number;
    Company: string;
    DocumentNo: string;
    EmployeeName: string;
    EmployeeCode: string;
    Department: string;
    PayOutDate: string;
    CutOffFrom: string;
    CutOffTo: string;
    RegularDayHours: number;
    RegularDayAmount: number;
    MealAllowance: number;
    ComplexityAllowance: number;
    SSSEmployeeShare: number;
    PhilHealthEmployeeShare: number;
    HDMFEmployeeShare: number;
    WithholdingTax: number;
    TotalDeductions: number;
  }>;

  payHistory: Array<{
    Date: string;
    NetPay: number;
  }>;
};

export type TypeSchemaLoanDetails = {
  info: {
    Name_LoanClassification: string;
    Balance: number;
    DocumentNo: string;
    DocStatus: string;
    Name_LoanSource: string;
    Code_LoanClassification: string;
    DateTransaction: string;
    DateApproved: string;
    DateCancelled: string;
    DateGranted: string;
    DateFirstDue: string;
    ReferenceNo: string;
    LoanAmount: number;
    AmountDisbursed: number;
    Name_Cycle: string;
    PerMonth: number;
    TotalAmount: number;
  };

  details: {
    Balance: number;
    Name_LoanClassification: string;
    DateTransaction: string;
    Payment: number;
  };
};

export type TypeSchemaPersonal = {
  FullName: string;
  Name_Department: string;
  Code: string;
  Name_Company: string;
  Name_Branch: string;
  Name_Division: string;
  Name_Section: string;
  MobileNo: string;
  EmailAdd: string;
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
  profile_uri?: string;
};

export type TypeSchemaPending = {
  DocumentNo: string;
  DateFiled: string;
  DateFrom: string;
  DateTo: string;
};

// Params Types
export type ParamsRequestDetails = {
  data: SchemaRequestApplications;
  onPanel: number;
  isSecondary: boolean;
};

export type ParamsRequestApplication = {
  data?: SchemaRequestApplications;
  onPanel: number;
  onReqAction: number;
  requested?: TypeSelectionList;
  location?: TypeSelectionList;
  branch?: TypeSelectionList;
  leaveOption?: TypeSelectionList;
  leaveType?: TypeSelectionList;
  image: Attachment;
};

export type ParamsTabNav = {
  refresh?: boolean;
};

export type ParamsLoanDetails = {
  ID_DocStatus: number;
  DocStatus: string;
  LoanId: string;
  Name_LoanClassification: string;
  Name_LoanType: string;
  Name_LoanStatus: string;
  Name_LoanClassificationType: string;
  Balance?: number | undefined;
  DateTransaction?: string | undefined;
  Payment?: number | undefined;
};

export type ParamsAttachedFile = Readonly<{
  filing: {
    documentNo: string;
    fileAttachment: string;
  };
}>;

export type ParamsSelectionList = {
  action: string;
  currParams: { location: { ID: number } };
  stateLocationID: number;
};

// Fetch Types
export type TypeFetch = {
  nav: NavigationProp<ParamListBase>;
  state: StateOTOFFRequest;
  setState: React.Dispatch<Partial<StateOTOFFRequest>>;
  handle: TypeHandle;
  setHandle: React.Dispatch<Partial<TypeHandle>>;
};

// Pages Types
// Login
export type StateLogin = {
  username: string;
  password: string;
};

export type TypeHandle = {
  isSuccess?: boolean;
  isRestart?: boolean;
  isLoading?: boolean;
  isRetry?: boolean;
  isSubmit?: boolean;
  isShowPassword?: boolean;
  refreshing?: boolean;
  isPermission?: boolean;
  isLoadMore?: boolean;
  isWaiting?: boolean;
  isDateFromPicker?: boolean;
  isDateToPicker?: boolean;
  isTimePicker?: boolean;
  isInputCheck?: boolean;
  isDatePicker?: boolean;
  isTimeFromPicker?: boolean;
  isTimeToPicker?: boolean;
  isVisible?: boolean;
  isVisibleFilter?: boolean;
  isPromptLoad?: boolean;
  isSecondary?: boolean;
  isAction?: number | string;
  isToast?: Toast;

  checkSelect?: number | null;
  scrollViewRef?: React.PropsWithRef<any>;
  cameraRef?: React.PropsWithRef<any>;
  dateTime?: string;
  navigation?: TypeNavStack;
};

// ClockedInOut
export type StateClockInOut = {
  clockedData: {
    value: number;
    status: string;
    time: string;
    date: string;
    address: string;
  };
  status: string;
  location: LocationLang | LatLng | string;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
    zoom: number;
  };
  geofences: Array<{
    latitude: number;
    longitude: number;
    radius: number;
  }>;
  isInside: Array<boolean>;
  time: string | null;
};

export type LocationLang = {
  longitude: number;
  latitude: number;
  accuracy: number;
  speed: number;
};

// Drawer - None

// LoanLedger
export type StateLoanLedger = {
  data: TypeSchemaLoanLedger[];
  filteredData: TypeSchemaLoanLedger[];
  filterText: string;
};

// Approvals
export type StateApprovals = {
  data: Array<SchemaRequestApplications>;
  buttons: Array<{ title: string }>;
  selectedButton: number;
  page: number;
  urlQuery: string;
  search: string;
  filterValue?: string;
  filterType?: string;
  displayValue?: string;
};

// Pending
export type StatePending = {
  data: TypeSchemaPending[] | null;
  activePanel: number;
  counter: number;
  counter2: number;
  filteredData?: Array<{
    Name_LoanClassification: string;
    Balance: number;
    DocumentNo: string;
    DocStatus: string;
  }>;
};

export type GroupedCalendarEntry = SchemaCalendarEntries & {
  missedLogs?: SchemaCalendarEntries[];
};


// TimeOff
export type StateTimeOff = {
  year: string;
  data: LeaveLedgerEntries[];
  count: number;
  page: number;
  pageCount: number; // For pagination
};

// Timesheet
export type StateTimesheet = {
  calendarDate: string;
  clockIn: SchemaCalendarEntries;
  clockOut: SchemaCalendarEntries;
};

// Attached File </>

// Loan Details
export type StateLoanDetails = {
  dataInfo: TypeSchemaLoanDetails['info'];
  dataDetails: ArrayLike<TypeSchemaLoanDetails['details']>;
  status: number;
};

// Selection List
export type StateSelectionList = {
  data: Array<TypeSelectionList>;
  name?: string;
  page?: number;
};

// COS Request
export type StateCOSRequest = {
  startDate: string;
  endDate: string;
  restDay: number;
  requested: TypeSelectionList;
  checkbox: Array<{ name: string }>;
  reason: string;
  attachment: Attachment;
  referenceNo?: string;
  documentNo?: string;
  cancelReason?: string;
  approveReason?: string;
  reviewReason?: string;
};

// LV Request
export type StateLVRequest = {
  leaveType: TypeSelectionList;
  availableCredits: string;
  leaveOption: CheckboxData;
  startDate: string;
  endDate: string;
  reason: string;
  attachment: Attachment;
  documentNo?: string;
  referenceNo?: string;
  cancelReason?: string;
  approveReason?: string;
  reviewReason?: string;
};

// ML Request
export type StateMLRequest = {
  dateFiled: string;
  logType: CheckboxData;
  logTime: string;
  reason: string;
  referenceNo?: string;
  attachment: Attachment;
  documentNo?: string;
  cancelReason?: string;
  approveReason?: string;
  reviewReason?: string;
};

// OB Request
export type StateOBRequest = {
  OBDateFrom: string;
  OBDateTo: string;
  location: TypeSelectionList;
  branch: TypeSelectionList;
  OBTimeIn: string;
  OBTimeOut: string;
  reason: string;
  attachment: Attachment;
  documentNo?: string;
  referenceNo?: string;
  cancelReason?: string;
  approveReason?: string;
  reviewReason?: string;
  hasBranches?: boolean;
};

// OFF Request
export type StateOTOFFRequest = {
  date: string;
  schedule: Schedules;
  timeRecord: Array<TimeRecords>;
  reqTimeIn: string;
  reqTimeOut: string;
  reason: string;
  attachment: Attachment;
  documentNo?: string;
  referenceNo?: string;
  cancelReason?: string;
  approveReason?: string;
  reviewReason?: string;
};

// Request Details
export type StateApplicationsDetails = {
  panel: number;
  data: SchemaRequestApplications;
  type: string;
};

// Request Summary
export type PropsRequestSummary = {
  startDate: string;
  endDate: string;
  requested: {
    name: string;
  };
  restDay: number;

  OBDateFrom: string;
  OBDateTo: string;
  location: TypeSelectionList;
  branch: TypeSelectionList;
  OBTimeIn: string;
  OBTimeOut: string;

  date: string;
  schedule: Schedules;
  timeRecord: Array<TimeRecords>;
  reqTimeIn: string;
  reqTimeOut: string;

  dateFiled: string;
  logType: CheckboxData;
  logTime: string;

  leaveType: TypeSelectionList;
  availableCredits: string;
  leaveOption: CheckboxData;

  reason: string;
  cancelReason: string;
  reviewReason: string;
  approveReason: string;
  referenceNo: string;
  attachment: Attachment;
  documentNo?: string;
};

// Camera
export type StateCamera = {
  type: CameraType | string;
  capture: string | null;
  image: string | null;
};

export type AttachmentHistory = {
  name: string;
};

// Calendar
export type StateCalendar = {
  calendarDate: string;
  selected: {
    date: string;
    entry: Array<SchemaCalendarEntries>;
    previous: {
      date: string;
      source: string;
      isRestDay: boolean;
    };

    next: {
      date: string;
      source: string;
      isRestDay: boolean;
    };
  };
  data: SchemaCalendar;
  markedDates?: {
    [date: string]: {
      dots?: Array<{
        color: string;
        key: string;
      }>;
      selected?: boolean;
      selectedColor?: string;
    };
  };
  isMonthModalVisible: boolean;
  isYearModalVisible: boolean;
  isChangedMonth: boolean;
  selectedMonth: string;
  selectedYear: string;
  selectedDate: string;
};

// Home
export type StateHome = {
  pendingCount: number;
  approvalCount: number;
  badgeCount: number;
  leaveVacation: TypeTimeOff;
  leaveSick: TypeTimeOff;
  loanCount: number;
  userDetails: TypeSchemaPersonal;
  teamMembers: TeamMember[];
  teamsData: Array<TeamSchema>;
  teamMembersCount?: number;

  approvalCounts?: Record<number, SchemaRequestApplications[]>;
};

// Request
export type StateApplications = {
  data: Array<SchemaRequestApplications>;
  page: number;
  buttons: Array<{ title: string }>;
  urlQuery: string;
  search: string;
  selected?: SchemaApprovalsManager;

  successList?: Array<TypeApprovalPromptItem> | [];
  failedList?: Array<TypeApprovalPromptItem> | [];
  count?: number;
  totalCount?: number;
  selectedButton: number;

  //Filters
  filterValue?: string;
  filterType?: string;
  displayValue?: string;
  fetchKey?: string;

  batchReason?: string;
  batchEmployeeName?: string; //
};

// Components
// Menu Button - None

export type PropsMenuButton = {
  show: number;
};

export type StateMenuButton = {
  imageSize: number;
  padding: number;
  firstRow: Array<TypeObjectValues>;
  secondRow: Array<TypeObjectValues>;
};

// TimeOffButton - None

export type StateTimeOffButton = {
  imageSize: number;
  padding: number;
  row: Array<TypeObjectValues>;
};

// PageHeader
export type PropsPageHeader = { name: string, customNavigate?: () => void; };

// Approvals Item
export type PropsApprovalsItem = {
  data: SchemaRequestApplications;
  onPanel: number;
  navigation: TypeNavProp['navigation'];
};

// Loan Ledger Item
export type PropsLoanLedgerItem = {
  item: TypeSchemaLoanLedger;
  index: number;
  navigation: TypeNavProp['navigation'];
};

// Notification Item
export type PropsNotificationItem = {
  item: TypeSchemaNotification;
  index: number;
  onHandlePress: () => void;
  navigation: TypeNavProp['navigation'];
};

// Pay History Item
export type PropsPayHistoryItem = {
  data: TypeSchemaPayslip['payHistory'][0];
  onHandleMore: () => void;
};

// Pending Item
export type PropsPendingItem = {
  item: TypeSchemaPending;
  index: number;
  lastIndex: number;
};

// Recent Pay Item
export type PropsRecentPayItem = {
  data: TypeSchemaPayslip['recentPay'][0];
  onHandleMore: () => void;
};

// Request Item
export type PropsRequestItem = {
  onPanel: number;
  data: SchemaRequestApplications;
  navigation: TypeNavStack['navigation'];
};

// Time Off Item
export type PropsTimeOffItem = { item: LeaveLedgerEntries };

// Timesheet Item
export type PropsTimesheetItem = {
  title: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  time: string;
  source: string;
};

// Material Icons Note
export type PropsMaterialIconsNote = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  text: string;
};

// Note
export type PropsNote = {
  text: string;
  icon: React.ComponentProps<typeof Entypo>['name'];
  size?: number;
};

export type OverlapNoteProps = {
  dateFrom: string;
  dateTo: string;
};

// Pending Panel
export type PropsPendingPanel = {
  data: Array<TypeSchemaPending>;
  setLoading: React.Dispatch<Partial<unknown>>;
};

export type StatePendingPanel = {
  filterText: string;
};

// Payslip
export type StatePayslip = {
  data: TypeSchemaPayslip;
  filterText: string;
  filteredData: TypeSchemaPayslip['payHistory'];
};

// Personal
export type StatePersonal = {
  data: TypeSchemaPersonal;
  details: Array<TypeObjectValues>;
};

// Summary Panel
export type PropsSummaryPanel = {
  panel: number;
  reqAction: number;
  data: PropsRequestSummary;
  handle: TypeHandle;
  onHandleSubmit: () => void;
  onHandleClosePrompt: () => void;
};

export type TypeDetailsSummaryPanel = {
  label: string;
  value: number | string | null;
};

export type StateSummaryPanel = {
  details: Array<TypeDetailsSummaryPanel>;
  subText: string;
};

// OT Prompt
export type PropsOTPrompt = {
  handle: unknown;
  onHandleSelect: () => void;
  onHandleCancel: () => void;
  onHandleCheck: (item: unknown, index: number) => void;
};

export type StateOTPrompt = {
  date: string;
  timeOut: string;
  schedule: string;
  clockOut: string;
};

// Success Prompt
export type PropsSuccessPrompt = {
  title: string;
  subTitle: string;
  buttonText: string;
  visible: boolean;
  onHandleClosePrompt: () => void;
};

// Success Time Clock
export type PropsSuccessTimeClock = {
  visible: boolean;
  state: StateClockInOut;
  onCloseSuccessPrompt: () => void;
};

// Time Clock
// export type PropsTimeClock = {
//     navigation:                         TypeNavProp['navigation']
//     params:                             { refresh?: boolean }
// }

export type StateTimeClock = {
  time: string;
  clocked: TypeClockedData;
};

// Request Field
// None

// Row Attachment
export type PropsRowAttachment = {
  attachment: Attachment;
};

// Row Details
export type PropsRowDetails = {
  item: TypeDetailsSummaryPanel;
  index: number;
};

// Line
export type PropsLine = {
  width?: number;
  space?: number;
  horizontalSpace?: number;
  opacity?: number;
};

// Refresh Page
export type PropsRefreshPage = {
  setHandle?: React.Dispatch<Partial<TypeHandle>>;
  refreshing: boolean;
  onRefresh: () => void;
  text?: string;
  showText: string;
};

// Search and New Request
export type PropsSearchAndNew = {
  setHandle: React.Dispatch<Partial<TypeHandle>>;
  onlySearch?: boolean;
  onPanel: number;
  filterValue?: string;
};

// Toast
export type PropsToast = {
  handle: Toast;
  setHandle: React.Dispatch<Partial<TypeHandle>>;
};

// Request Search
export type PropsRequestSearch = {
  state: [StateApplications | StateApprovals, React.Dispatch<Partial<StateApplications | StateApprovals>>];
  handle: [TypeHandle, React.Dispatch<Partial<TypeHandle>>];
};

export type StateApplicationsSearch = {
  search: string;
  searchDates: {
    from?: string;
    to?: string;
  };
  isVisibleFilter: boolean;
  fromPicker: boolean;
  toPicker: boolean;
  timePicker: boolean;
};

export type UtilsCatchEvent = {
  error: TypeError;
  setHandle?: React.Dispatch<Partial<TypeHandle>>;
  toastSet?: number;
  toastMessage?: string;
  onRefresh?: () => void;
  moreHandle?: () => void;
};

export type Badge = {
  totalCount: number | undefined;
  // isLoading?: boolean;
};

export type AllApplicationState = StateCOSRequest | StateMLRequest | StateOBRequest | StateOTOFFRequest | StateLVRequest;
