// HRDotNet-Mobile
// Designed by : Alexiane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { useRef } from 'react';

import { ARRAY } from './Array';
import {
  TypeTimeOff,
  ParamsSelectionList,
  TypeSelectionList,
  ParamsRequestDetails,
  StateHome,
  TypeHandle,
  StateApplications,
  StateLogin,
  StateTimeOff,
  StateCalendar,
  StateTimesheet,
  StateApplicationsDetails,
} from 'src/types/Types';
import { DateTimeUtils } from '../utils/DateTimeUtils';
import * as ImagePicker from 'expo-image-picker';
import { Utils } from 'src/utils/Utils';
import { STRINGS } from './Strings';

const today = new Date();
// Local Object Values
export const APIMethods = {
  GET: 'GET',
  POST: 'POST',
};

export const ContentTypes = {
  JSON: 'application/json',
  Multipart: 'multipart/form-data',
};

export const StatusCode = {
  Unauthorized: 401,
  BadRequest: 400,
  NotFound: 404,
  Created: 201,
  Success: 200,
  InternalServerError: 500,
};

export const FilingStatus = {
  Filed: 1,
  Approved: 2,
  Cancelled: 3,
  Reviewed: 4,
};

export const ApplicationMod = {
  Request: 0,
  Approvals: 1,
};

export const ApprovalsAction = {
  Cancel: 0,
  Approve: 1,
};

export const ApprovalsType = {
  Batch: 0,
  Single: 1,
};

export const Schedules = {
  id: 0,
  name: '',
  date: '',
  timeIn: '',
  timeOut: '',
  breakTimeIn: '',
  breakTimeOut: '',
  shiftType: { shiftTypeId: 0, shiftType: '' },
  shiftTypeId: 0,
  isPremium: false,
};

export const TimeRecord = [
  {
    date: '',
    source: '',
  },
];

export const Attachment = {
  format: '',
  uri: '',
};

export const TimeOffEntries = [
  {
    id: 0,
    guid: '',
    leaveParameter: {
      id: 0,
      name: '',
    },
    dateTransaction: '',
    source: '',
    documentNo: '',
    debit: '',
    credit: '',
    particulars: '',
    businessYear: '',
  },
];

export const TimeOff = {
  data: {
    count: 0,
    entries: [],
  },
  page: 0,
};

export const SelectionList = {
  ID: 0,
  name: '',
  code: '',
  value: 0,
};

export const LeaveOption = {
  ID: 0,
  name: '',
  value: '',
  TOD: '',
};

export const Toast = {
  show: false,
  set: 0,
  message: '',
};

// Schemas
export const ValuesRequestApplications = {
  id: 0,
  code: '',
  name: '',
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  filing: {
    id: 0,
    guid: '',
    documentNo: '',
    referenceNo: '',

    requested: {
      // COS
      id: 0,
      name: '',
      isRestDay: true,
      dateFrom: '',
      dateTo: '',
    },
    dateFiled: {
      dateFrom: '',
      dateTo: '',
    },

    leaveParameter: {
      // Leave
      id: 0,
      code: '',
      name: '',
    },
    leaveOption: {
      id: 0,
      name: '',
      type: '',
      amount: 0,
    },
    numberOfDays: 0,

    location: {
      // Official Business
      id: 0,
      name: '',
      locationBranchId: 0,
      locationBranch: '',
    },
    dateRange: {
      dateFrom: '',
      dateTo: '',
    },
    timeRange: {
      timeIn: '',
      timeOut: '',
    },

    timeInOut: '', // Missed Log
    logType: {
      id: 0,
      name: '',
    },

    shiftSchedule: {
      // Offset and OT
      id: 0,
      name: '',
      date: '',
      timeIn: '',
      timeOut: '',
      breakTimeIn: '',
      breakTimeOut: '',
      isPremium: true,
    },
    actual: {
      dateFrom: '',
      dateTo: '',
    },
    totalCredits: 0,
    usedCredits: 0,
    currentCredits: 0,
    numberOfHours: 0,

    dateTransaction: '',
    filingStatus: {
      id: 0,
      name: '',
    },
    reason: '',
    fileAttachment: '',
  },
  dateTransaction: '',
};

export const ValueLeaveLedgerEntries = [
  {
    id: 0,
    guid: '',
    leaveParameter: {
      id: 0,
      name: '',
    },
    dateTransaction: '',
    source: '',
    documentNo: '',
    debit: 0,
    credit: 0,
    particulars: '',
    businessYear: '',
  },
];

export const ValuesSchemaCalendarEntries = {
  documentNo: '',
  date: '',

  dateTimeRange: {
    dateFrom: '',
    dateTo: '',
  },

  filingStatus: {
    id: 0,
    name: '',
  },

  source: '',
  isRestDay: false,
};

export const ValueSchemaCalendar = {
  id: 0,
  code: '',
  name: '',
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  calendarDates: [
    {
      date: '',
      entries: [ValuesSchemaCalendarEntries],
    },
  ],
  dateTransaction: '',
};

export const ValuesSchemaApprovalsManagerEntries = {
  recordId: 0,
  employeeId: 0,
  companyId: 0,
  documentNo: '',
};

export const ValuesApprovalsManager = {
  filings: [],
};

// Temporary Values Schema
export const ValuesSchemaLoanDetails = {
  info: {
    Name_LoanClassification: '',
    Balance: 0,
    DocumentNo: '',
    ID_DocStatus: 0,
    DocStatus: '',
    Name_LoanSource: '',
    Code_LoanClassification: '',
    DateTransaction: '',
    DateApproved: '',
    DateCancelled: '',
    DateGranted: '',
    DateFirstDue: '',
    ReferenceNo: '',
    LoanAmount: 0,
    AmountDisbursed: 0,
    Name_Cycle: '',
    PerMonth: 0,
    TotalAmount: 0,
  },

  details: [
    {
      Balance: 0,
      Name_LoanClassification: '',
      DateTransaction: '',
      Payment: 0,
    },
  ],
};

export const ValuesSchemaPersonal = {
  FullName: '',
  Name_Department: '',
  Code: '',
  Name_Company: '',
  Name_Branch: '',
  Name_Division: '',
  Name_Section: '',
  MobileNo: '',
  EmailAdd: '',
};

export const ValuesSchemaPayslip = {
  recentPay: [
    {
      Date: '',
      NetPay: 0,
      GrossPay: 0,
      Deductions: 0,
      Company: '',
      DocumentNo: '',
      EmployeeName: '',
      EmployeeCode: '',
      Department: '',
      PayOutDate: '',
      CutOffFrom: '',
      CutOffTo: '',
      RegularDayHours: 0,
      RegularDayAmount: 0,
      MealAllowance: 0,
      ComplexityAllowance: 0,
      SSSEmployeeShare: 0,
      PhilHealthEmployeeShare: 0,
      HDMFEmployeeShare: 0,
      WithholdingTax: 0,
      TotalDeductions: 0,
    },
  ],

  payHistory: [{ Date: '', NetPay: 0 }],
};

// Tabs
export const ValuesCalendar = {
  // Calendar
  State: {
    calendarDate: DateTimeUtils.getCurrDateDefault(),
    selected: {
      date: DateTimeUtils.getCurrDateDefault(),
      entry: [ValuesSchemaCalendarEntries],
      previous: {
        date: '',
        source: '',
        isRestDay: false,
      },
      next: {
        date: '',
        source: '',
        isRestDay: false,
      },
    },
    data: {
      id: 0,
      code: '',
      name: '',
      companyId: 0,
      branchId: 0,
      departmentId: 0,
      calendarDates: [
        {
          date: '',
          entries: [ValuesSchemaCalendarEntries],
        },
      ],
      dateTransaction: '',
    },
    isMonthModalVisible: false,
    isYearModalVisible: false,
    isChangedMonth: false,
    selectedMonth: today.toLocaleString('en-US', { month: '2-digit' }),
    selectedYear: today.getFullYear().toString(),
    selectedDate: `${today.getFullYear()}-${today.toLocaleString('en-US', { month: '2-digit' })}-01`,
  } satisfies StateCalendar,

  Handle: {
    isLoading: true,
    isLoadMore: false,
    isToast: Toast,
  } satisfies TypeHandle,
};

export const ValuesHome = {
  // Home
  State: {
    pendingCount: 0,
    approvalCount: 0,
    leaveVacation: TimeOff,
    leaveSick: TimeOff,
    badgeCount: 0,
    loanCount: 0,
    userDetails: ValuesSchemaPersonal,
    teamsData: [],
    teamMembers: [],
    teamMembersCount: 0,
  } satisfies StateHome,

  Handle: {
    isLoading: true,
    isRetry: false,
    isToast: Toast,
  } satisfies TypeHandle,
};

export const ValuesRequest = {
  // Home
  State: {
    data: [],
    page: 1,
    search: '',
    buttons: ARRAY.requestButton,
    urlQuery: `${process.env.EXPO_PUBLIC_REQUEST_DEFAULTPARAMS}`,
    selectedButton: 0,
  } satisfies StateApplications,

  Handle: {
    refreshing: false,
    isLoadMore: true,
    isWaiting: false,
    isLoading: true,
    isVisible: false,
    isVisibleFilter: false,
    isDateFromPicker: false,
    isDateToPicker: false,
    isTimePicker: false,
    isToast: Toast,
  } satisfies TypeHandle,
};

// Pages
export const ValuesLogin = {
  // Login
  State: {
    username: '',
    password: '',
  } satisfies StateLogin,

  Handle: {
    isShowPassword: false,
    isLoading: false,
    isToast: Toast,
  } satisfies TypeHandle,
};

export const ValuesClockInOut = (params: { value: number }) => {
  // Clock In Out
  return {
    State: {
      clockedData: {
        value: 1,
        status: params.value === 1 ? STRINGS.clockOut : STRINGS.clockIn,
        time: '',
        date: '',
        address: '',
      },
      status: params.value === 1 ? STRINGS.clockOut : STRINGS.clockIn,
      location: '',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        zoom: 10,
      },
      geofences: ARRAY.geofences,
      isInside: [],
      time: DateTimeUtils.getCurrTimeWithSecondsUnits(),
    },

    Handle: {
      isLoading: false,
      isSuccess: false,
      isRestart: false,
      refreshing: false,
      isToast: Toast,
    },
  };
};

export const ValuesApprovals = {
  // Approvals
  State: {
    data: [],
    selectedButton: 0,
    buttons: ARRAY.requestButton,
    page: 1,
    search: '',
    selected: ValuesApprovalsManager,
    count: 0,
    urlQuery: ``,
    successList: [],
    failedList: [],
  } satisfies StateApplications,

  Handle: {
    refreshing: false,
    isLoadMore: true,
    isWaiting: false,
    isLoading: true,
    isVisible: false,
    isDateFromPicker: false,
    isDateToPicker: false,
    isTimePicker: false,
    isSuccess: false,
    isSecondary: true,
    isVisibleFilter: false,
    isAction: undefined,
    isToast: Toast,
    scrollViewRef: () => useRef(null),
  } satisfies TypeHandle,
};

export const ValuesLoanLedger = {
  // Loan Ledger
  State: {
    data: [],
    filteredData: [],
    filterText: '',
  },

  Handle: {
    isLoading: true,
    refreshing: false,
    scrollViewRef: () => useRef(null),
  },
};

export const ValuesPending = {
  // Pending
  State: {
    data: null,
    activePanel: 1,
    counter: 0,
    counter2: 0,
  },

  Handle: {
    isLoading: true,
    refreshing: true,
  },
};

export const ValuesTimeOff = (params?: TypeTimeOff) => {
  //Time Off
  return {
    State: {
      year: DateTimeUtils.getCurrWordYear(),
      data: ValueLeaveLedgerEntries,
      page: params?.page || 0,
      count: params?.data?.count || 0,
      pageCount: 1
    } satisfies StateTimeOff,

    Handle: {
      isLoading: true,
      isWaiting: false,
      isLoadMore: false,
      refreshing: false,
    } satisfies TypeHandle,
  };
};

export const ValuesTimesheet = {
  // Timesheet
  State: {
    calendarDate: DateTimeUtils.getCurrDateDefault(),
    clockIn: ValuesSchemaCalendarEntries,
    clockOut: ValuesSchemaCalendarEntries,
  } satisfies StateTimesheet,

  Handle: {
    isLoading: true,
    refreshing: true,
    isToast: Toast,
  } satisfies TypeHandle,
};

export const ValuesAttachedFile = {
  State: {
    file: '',
  },

  Handle: {
    isLoading: true,
    isSuccess: false,
  },
};

export const ValuesLoanDetails = {
  // Loan Details
  State: {
    dataInfo: ValuesSchemaLoanDetails.info,
    dataDetails: ValuesSchemaLoanDetails.details,
    status: 0,
  },

  Handle: {
    isLoading: true,
  },
};

export const ValuesSelectionList = (params: ParamsSelectionList) => {
  // Selection List
  return {
    State: {
      data: Utils.setSelectionList(params) as Array<TypeSelectionList>,
      name: '',
      page: 1,
    },

    Handle: {
      isLoading: true,
      refreshing: false,
      isWaiting: false,
      isLoadMore: true,
      isSecondary: false,
    },
  };
};

export const ValuesCamera = {
  // Camera
  State: {
    type: ImagePicker.CameraType.back,
    capture: null,
    image: null,
  },

  Handle: {
    isLoading: true,
    isSuccess: false,
    isPermission: false,
    cameraRef: () => useRef(null),
  },
};

export const ValuesCOSRequest = {
  // COS Request
  State: {
    startDate: '',
    endDate: '',
    requested: SelectionList,
    reason: '',
    restDay: 0,
    attachment: Attachment,
    checkbox: ARRAY.COSRequestCheckbox,
    documentNo: '',
  },

  Handle: {
    checkSelect: null,
    isInputCheck: false,
    isDateFromPicker: false,
    isDateToPicker: false,
  },
};

export const ValuesOBRequest = {
  // OB Request
  State: {
    OBDateFrom: '',
    OBDateTo: '',
    location: SelectionList,
    branch: SelectionList,
    OBTimeIn: '',
    OBTimeOut: '',
    reason: '',
    attachment: Attachment,
    documentNo: '',
    cancelReason: '',
    reviewReason: '',
    approveReason: '',
    referenceNo: '',
    hasBranches: false,
  },

  Handle: {
    isDateFromPicker: false,
    isDateToPicker: false,
    isTimeFromPicker: false,
    isTimeToPicker: false,
    isInputCheck: false,
  },
};

export const ValuesOTOFFRequest = {
  // OT and OFF Request
  State: {
    date: '',
    schedule: Schedules,
    timeRecord: TimeRecord,
    reqTimeIn: '',
    reqTimeOut: '',
    reason: '',
    attachment: Attachment,
    documentNo: '',
  },

  Handle: {
    isDatePicker: false,
    isTimeFromPicker: false,
    isTimeToPicker: false,
    isInputCheck: false,
    isLoading: false,
    isToast: Toast,
  },
};

export const ValuesLVRequest = {
  // LV Request
  State: {
    leaveType: SelectionList,
    availableCredits: (0.0).toFixed(2),
    leaveOption: LeaveOption,
    startDate: '',
    endDate: '',
    reason: '',
    attachment: Attachment,
    documentNo: '',
  },

  Handle: {
    checkSelect: null,
    isInputCheck: false,
    isDateFromPicker: false,
    isDateToPicker: false,
    isLoading: false,
  },
};

export const ValuesMLRequest = {
  //ML Request
  State: {
    dateFiled: '',
    logType: {
      name: '',
      value: 0,
    },
    logTime: '',
    reason: '',
    referenceNo: '',
    attachment: Attachment,
    cancelReason: '',
    reviewReason: '',
    approveReason: '',
    documentNo: '',
  },

  Handle: {
    checkSelect: null,
    isDatePicker: false,
    isTimePicker: false,
    isInputCheck: false,
  },
};

// Request Details
export const ValuesRequestDetails = (params: ParamsRequestDetails) => {
  return {
    State: {
      panel: params.onPanel,
      data: params.data,
      type: Utils.setRequestDetailsType(params.onPanel),
    } satisfies StateApplicationsDetails,

    Handle: {
      refreshing: false,
      isLoading: true,
      isSuccess: false,
      isAction: 0,
      isToast: Toast,
    } satisfies TypeHandle,
  };
};

export const ValuesRequestSummary = {
  Handle: {
    isLoading: false,
    isSubmit: false,
    isSuccess: false,
    isToast: Toast,
  },
};

// Components
export const ValuesPendingPanel = {
  State: {
    filterText: '',
  },

  Handle: {
    refreshing: false,
    scrollViewRef: () => useRef(null),
  },
};

export const ValuesPayslip = {
  State: {
    data: ValuesSchemaPayslip,
    filterText: '',
    filteredData: [],
  },

  Handle: {
    isLoading: true,
    refreshing: false,
    // scrollViewRef:      () => useRef(null),
  },
};

export const ValuesPersonal = {
  State: {
    data: ValuesSchemaPersonal,
    details: [{ title: '', value: '' }],
  },

  Handle: {
    isLoading: true,
    refreshing: false,
  },
};

export const ValuesTimeClock = {
  State: {
    time: '',
    clocked: {
      value: 0,
      status: '',
      nextStatus: '',
      time: '',
      date: '',
      address: '',
    },
  },
};

export const ValuesRequestSearch = {
  State: {
    search: '',
    searchDates: {
      from: '',
      to: '',
    },
    isVisibleFilter: false,
    fromPicker: false,
    toPicker: false,
    timePicker: false,
  },
};

export const ValuesSummaryPanel = {
  State: {
    details: [
      {
        label: '',
        value: 0,
      },
    ],
    subText: '',
  },
};

export const FieldLimit = {
  reason: {
    minLength: 8,
    maxLength: 150,
  },
  referenceNo: {
    maxLength: 14,
  },
};

export const ROMAN_NUMERAL_REGEX = /^(m{0,4}(cm|cd|d?c{0,3})?(xc|xl|l?x{0,3})?(ix|iv|v?i{0,3}))$/i;

export const GENERATION_SUFFIX_REGEX = /^(jr|sr)\.?$/i;

export const fieldDisplayNames: Record<string, string> = {
  TimeInOut: 'Log Time',
  LogType: 'Log Type',
  Reason: 'Reason',
  ReferenceNo: 'Reference No.',
  FileAttachment: 'Attachment',
  UploadedFile: 'Uploaded File',
  TimeIn: 'Time In',
  TimeOut: 'Time Out',
  DateFrom: 'Start Date',
  DateTo: 'End Date',
  LocationBranchId: 'Branch ID',
  LocationBranch: 'Branch',
  MLDateFiled: 'Missed Log Date',
  COSDatePeriod: 'COS Period',
  DateFiled: 'Date Filed',
  RestDay: 'Rest Day',
  Schedule: 'Requested Schedule',
  OBDatePeriod: 'OB Period',
  OTDate: 'Overtime Date',
};

export enum FieldKey {
  TimeIn = 'TimeIn',
  TimeOut = 'TimeOut',
  DateFrom = 'DateFrom',
  DateTo = 'DateTo',
  LocationBranchId = 'LocationBranchId',
  LocationBranch = 'LocationBranch',
  TimeInOut = 'TimeInOut',
  MLDateFiled = 'DateFiled',
  ReferenceNo = 'ReferenceNo',
  COSDateFiled = 'DateFiled',
  RestDay = 'RestDay',
  Schedule = 'Schedule',
  Reason = 'Reason',
  OTDate = 'OvertimeDate',
  OTFrom = 'OTFrom',
  OFFFrom = 'OFFFrom',
  OTTo = 'OTTo',
  OFFTo = 'OFFTo',
}
