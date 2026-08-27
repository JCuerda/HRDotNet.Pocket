// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda, Hersvin Fred De La Cruz Labastida

import { DateTimeUtils } from '../utils/DateTimeUtils';
import { ASSETS } from './Assets';
import { COLORS } from './Colors';
import { STRINGS } from './Strings';
import {
  TypeTimeOff,
  PropsRequestSummary,
  StateCOSRequest,
  StateLVRequest,
  StateMLRequest,
  StateOBRequest,
  StateOTOFFRequest,
  SchemaRequestApplications,
  TypeSchemaPersonal,
  TypeNavStack,
} from 'src/types/Types';

export const ARRAY = {
  // Local Values Array
  panel: [
    {
      COS: 0,
      OB: 1,
      OT: 2,
      OFF: 3,
      LV: 4,
      ML: 5,
      CTO: 6,
    },
  ],

  reqAction: [
    {
      New: 1,
      Update: 2,
      Cancel: 3,
      Review: 4,
      Approve: 5,
    },
  ],

  // Sample Array Data
  schedule: [
    {
      date: '20240320',
      timeOut: '18:00:00',
      clockOut: '20:00:00',
      schedule: 'EARLY BIRD (08:00:00 - 17:00:00)',
    },
  ],

  filed: [
    {
      DocumentNo: 'LV2230922165',
      DateFiled: '20240417',
      DateFrom: '20240417',
      DateTo: '20240417',
    },
    {
      DocumentNo: 'LV2230922165',
      DateFiled: '20240417',
      DateFrom: '20240417',
      DateTo: '20240417',
    },
  ],

  reviewed: [
    {
      DocumentNo: 'LV2230922165',
      DateFiled: '20240417',
      DateFrom: '20240417',
      DateTo: '20240417',
    },
  ],

  notifications: [
    {
      name: 'Request Update',
      date: '20231120',
      message:
        'Your Emergency Leave Doc. No, LV2230922165 has a new status. Please check the Requests pages for more details.',
      isReaded: 0,
    },
    {
      name: 'Advisory',
      date: '20231120',
      message: 'Intellismart, Stock, Supersam, and Opulence, which were under Intellismart.',
      isReaded: 0,
    },
    {
      name: 'Approvals Update',
      date: '20231020',
      message: 'You have new pending applications for approvals.',
      isReaded: 0,
    },
  ],

  account: [
    {
      Code: 'patrick',
      Password: 'sql123',
      FirstName: 'Patrick',
      lastName: 'William',
      MiddleName: 'Quintana',
      Gender: 'Male',
      SysGroup: 4,
      // 3 - WEB USER 4 - WEB APPROVER
    },
  ],

  payslip: {
    recentPay: [
      {
        Date: '20240410',
        NetPay: 15378.24,
        GrossPay: 17190.31,
        Deductions: 1812.06,
        Company: 'INTELLISMART TECHNOLOGY INC.',
        DocumentNo: 'PP23080317',
        EmployeeName: 'Patrick Lofranco',
        EmployeeCode: '7638',
        Department: 'HRIS',
        PayOutDate: '20240510',
        CutOffFrom: '20240510',
        CutOffTo: '20240510',
        RegularDayHours: 84.62,
        RegularDayAmount: 15075.36,
        MealAllowance: 736.1,
        ComplexityAllowance: 1321.84,
        SSSEmployeeShare: 875.0,
        PhilHealthEmployeeShare: 301.51,
        HDMFEmployeeShare: 100.0,
        WithholdingTax: 735.55,
        TotalDeductions: 1812.0,
      },
    ],

    payHistory: [
      { Date: '20240325', NetPay: 8016.29 },
      { Date: '20240310', NetPay: 10941.03 },
      { Date: '20240325', NetPay: 13670.72 },
    ],
  },

  teams: [
    {
      date: '15/09/2024',
      items: [
        { name: 'Alex Johnson', position: 'Customer Support Lead', status: 'Present' },
        { name: 'Samantha Lee', position: 'Learning and Development Coordinator', status: 'Present' },
        { name: 'Jordan Smith', position: 'Quality Assurance Analyst', status: 'Present' },
        { name: 'Michael Brown', position: 'Delivery Coordinator', status: 'Present' },
        { name: 'Taylor Davis', position: 'Quality Assurance Analyst', status: 'Present' },
        { name: 'Morgan White', position: 'Sales Development Representative', status: 'Present' },
        { name: 'Emily Clark', position: 'Marketing Specialist', status: 'Present' },
        { name: 'Daniel Lee', position: 'Product Manager', status: 'Present' },
        { name: 'Olivia Martinez', position: 'UX Designer', status: 'Present' },
        { name: 'Ethan Thompson', position: 'Software Engineer', status: 'Present' },
      ],
    },
    {
      date: '16/09/2024',
      items: [
        { name: 'Alex Johnson', position: 'Customer Support Lead', status: 'Absent' },
        { name: 'Samantha Lee', position: 'Learning and Development Coordinator', status: 'Present' },
        { name: 'Jordan Smith', position: 'Quality Assurance Analyst', status: 'Present' },
        { name: 'Michael Brown', position: 'Delivery Coordinator', status: 'Present' },
        { name: 'Taylor Davis', position: 'Quality Assurance Analyst', status: 'Absent' },
        { name: 'Morgan White', position: 'Sales Development Representative', status: 'Present' },
        { name: 'Emily Clark', position: 'Marketing Specialist', status: 'Absent' },
        { name: 'Daniel Lee', position: 'Product Manager', status: 'Present' },
        { name: 'Olivia Martinez', position: 'UX Designer', status: 'Present' },
        { name: 'Ethan Thompson', position: 'Software Engineer', status: 'Absent' },
      ],
    },
    {
      date: '25/09/2024',
      items: [
        { name: 'Alex Johnson', position: 'Customer Support Lead', status: 'Present' },
        { name: 'Samantha Lee', position: 'Learning and Development Coordinator', status: 'Absent' },
        { name: 'Jordan Smith', position: 'Quality Assurance Analyst', status: 'Present' },
        { name: 'Michael Brown', position: 'Delivery Coordinator', status: 'Absent' },
        { name: 'Taylor Davis', position: 'Quality Assurance Analyst', status: 'Present' },
        { name: 'Morgan White', position: 'Sales Development Representative', status: 'Absent' },
        { name: 'Emily Clark', position: 'Marketing Specialist', status: 'Present' },
        { name: 'Daniel Lee', position: 'Product Manager', status: 'Absent' },
        { name: 'Olivia Martinez', position: 'UX Designer', status: 'Present' },
        { name: 'Ethan Thompson', position: 'Software Engineer', status: 'Present' },
      ],
    },
    {
      date: '18/09/2024',
      items: [
        { name: 'Alex Johnson', position: 'Customer Support Lead', status: 'Present' },
        { name: 'Samantha Lee', position: 'Learning and Development Coordinator', status: 'Absent' },
        { name: 'Jordan Smith', position: 'Quality Assurance Analyst', status: 'Absent' },
        { name: 'Michael Brown', position: 'Delivery Coordinator', status: 'Absent' },
        { name: 'Taylor Davis', position: 'Quality Assurance Analyst', status: 'Absent' },
        { name: 'Morgan White', position: 'Sales Development Representative', status: 'Absent' },
        { name: 'Emily Clark', position: 'Marketing Specialist', status: 'Present' },
        { name: 'Daniel Lee', position: 'Product Manager', status: 'Present' },
        { name: 'Olivia Martinez', position: 'UX Designer', status: 'Absent' },
        { name: 'Ethan Thompson', position: 'Software Engineer', status: 'Present' },
      ],
    },
    {
      date: '19/09/2024',
      items: [
        { name: 'Alex Johnson', position: 'Customer Support Lead', status: 'Absent' },
        { name: 'Samantha Lee', position: 'Learning and Development Coordinator', status: 'Present' },
        { name: 'Jordan Smith', position: 'Quality Assurance Analyst', status: 'Present' },
        { name: 'Michael Brown', position: 'Delivery Coordinator', status: 'Present' },
        { name: 'Taylor Davis', position: 'Quality Assurance Analyst', status: 'Absent' },
        { name: 'Morgan White', position: 'Sales Development Representative', status: 'Present' },
        { name: 'Emily Clark', position: 'Marketing Specialist', status: 'Absent' },
        { name: 'Daniel Lee', position: 'Product Manager', status: 'Present' },
        { name: 'Olivia Martinez', position: 'UX Designer', status: 'Present' },
        { name: 'Ethan Thompson', position: 'Software Engineer', status: 'Absent' },
      ],
    },
  ],

  dayOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

  teamsClockInOutHistory: [{ label: 'No History' }, { label: '__________' }],

  loanLedger: [
    {
      Name_LoanClassification: 'SSS Salary Loan',
      Balance: 10554.93,
      DocumentNo: 'LA1234556',
      ID_DocStatus: 2,
      DocStatus: 'Approved',
    },
  ],

  loanDetails: {
    info: {
      Name_LoanClassification: 'SSS Salary Loan',
      Balance: 10554.93,
      DocumentNo: 'LA1234556',
      ID_DocStatus: 2,
      DocStatus: 'Approved',
      Name_LoanSource: 'Government Deduction',
      Code_LoanClassification: 'LN-SSS',
      DateTransaction: '20240419',
      DateApproved: '20240419',
      DateCancelled: '',
      DateGranted: '20240419',
      DateFirstDue: '20240419',
      ReferenceNo: '123456789',
      LoanAmount: 11013.84,
      AmountDisbursed: 11013.84,
      Name_Cycle: 'Period 1',
      PerMonth: 458.91,
      TotalAmount: 458.91,
    },

    details: [
      {
        Balance: 10554.93,
        Name_LoanClassification: 'SSS Salary Loan',
        DateTransaction: '20240419',
        Payment: 458.91,
      },
      {
        Balance: 10554.93,
        Name_LoanClassification: 'SSS Salary Loan',
        DateTransaction: '20240419',
        Payment: 458.91,
      },
      {
        Balance: 10554.93,
        Name_LoanClassification: 'SSS Salary Loan',
        DateTransaction: '20240419',
        Payment: 458.91,
      },
      {
        Balance: 10554.93,
        Name_LoanClassification: 'SSS Salary Loan',
        DateTransaction: '20240419',
        Payment: 458.91,
      },
      {
        Balance: 10554.93,
        Name_LoanClassification: 'SSS Salary Loan',
        DateTransaction: '20240419',
        Payment: 458.91,
      },
    ],
  },

  approvalsCOS: [
    {
      id: 0,
      code: '1234',
      name: 'PATRICK WILLIAM LOFRANCO',
      companyId: 1,
      branchId: 1,
      departmentId: 1,
      filing: {
        id: 1,
        guid: 'TEST1234567',
        documentNo: 'COS1234567890',

        requested: {
          id: 0,
          name: 'Schedule Sample (0:00 AM - 0:00 PM)',
          isRestDay: true,
        },

        dateFiled: {
          dateFrom: '2024-07-15',
          dateTo: '2024-07-15',
        },

        dateTransaction: '2024-07-15',
        filingStatus: {
          id: 1,
          name: 'Filed',
        },
        reason: 'Sample COS Approvals',
        fileAttachment: '',
      },
      dateTransaction: '2024-07-15',
    },
    {
      id: 1,
      code: '1234',
      name: 'PATRICK WILLIAM LOFRANCO',
      companyId: 1,
      branchId: 1,
      departmentId: 1,
      filing: {
        id: 1,
        guid: 'TEST1234567',
        documentNo: 'COS1234567890',

        requested: {
          id: 0,
          name: 'Schedule Sample (0:00 AM - 0:00 PM)',
          isRestDay: true,
        },

        dateFiled: {
          dateFrom: '2024-07-15',
          dateTo: '2024-07-15',
        },

        dateTransaction: '2024-07-15',
        filingStatus: {
          id: 1,
          name: 'Filed',
        },
        reason: 'Sample COS Approvals',
        fileAttachment: '',
      },
      dateTransaction: '2024-07-15',
    },
  ],

  approvalsOB: [
    {
      id: 1,
      code: '1234',
      name: 'PATRICK WILLIAM LOFRANCO',
      companyId: 1,
      branchId: 1,
      departmentId: 1,
      filing: {
        id: 1,
        guid: 'TEST1234567',
        documentNo: 'OB1234567890',

        location: {
          id: 1,
          name: 'Philippines',
          locationBranchId: 0,
          locationBranch: '',
        },
        dateRange: {
          dateFrom: '2024-07-15',
          dateTo: '2024-07-15',
        },
        timeRange: {
          timeIn: '00:00:00',
          timeOut: '00:00:00',
        },

        dateTransaction: '2024-07-15',
        filingStatus: {
          id: 1,
          name: 'Filed',
        },
        reason: 'Test OB Approvals',
        fileAttachment: '',
      },
      dateTransaction: '2024-07-15',
    },
  ],

  approvalsOTOFF: [
    {
      id: 1,
      code: '1234',
      name: 'PATRICK WILLIAM LOFRANCO',
      companyId: 1,
      branchId: 1,
      departmentId: 1,
      filing: {
        id: 1,
        guid: 'TEST1234567',
        documentNo: 'OT1234567890',

        dateFiled: '2024-07-15',

        requested: {
          dateFrom: '2024-07-15',
          dateTo: '2024-07-15',
        },

        shiftSchedule: {
          id: 0,
          name: 'Test Schedule (0:00 AM - 0:00 PM)',
          date: '2024-07-15',
          timeIn: '00:00:00',
          timeOut: '00:00:00',
          breakTimeIn: '00:00:00',
          breakTimeOut: '00:00:00',
          isPremium: true,
        },

        actual: {
          dateFrom: '2024-07-15',
          dateTo: '2024-07-15',
        },

        dateTransaction: '2024-07-15',
        filingStatus: {
          id: 1,
          name: 'Filed',
        },

        numberOfHours: 0,
        reason: 'Test OT Approvals',
        fileAttachment: '',
      },
      dateTransaction: '2024-07-15',
    },
  ],

  approvalsLV: [
    {
      id: 1,
      code: '1234',
      name: 'PATRICK WILLIAM LOFRANCO',
      companyId: 1,
      branchId: 1,
      departmentId: 1,
      filing: {
        id: 1,
        guid: 'TEST1234567',
        documentNo: 'OT1234567890',
        referenceNo: '',

        dateFiled: {
          dateFrom: '2024-07-17',
          dateTo: '2024-07-17',
        },

        leaveParameter: {
          id: 1,
          code: 'VL',
          name: 'VACATION LEAVE',
        },
        leaveOption: {
          id: 1,
          name: 'Whole Day',
          type: 'W',
          amount: 1.0,
        },
        numberOfDays: 1.0,

        dateTransaction: '2024-07-16',
        filingStatus: {
          id: 1,
          name: 'Filed',
        },
        reason: 'Test ML Approvals',
        fileAttachment: '',
      },
      dateTransaction: '2024-07-16',
    },
  ],

  approvalsML: [
    {
      id: 1,
      code: '1234',
      name: 'PATRICK WILLIAM LOFRANCO',
      companyId: 1,
      branchId: 1,
      departmentId: 1,
      filing: {
        id: 1,
        guid: 'TEST1234567',
        documentNo: 'OT1234567890',

        dateFiled: '2024-07-16',

        timeInOut: '08:00:00',

        logType: {
          id: 1,
          name: 'Time-In',
        },

        dateTransaction: '2024-07-16',
        filingStatus: {
          id: 1,
          name: 'Filed',
        },
        reason: 'Test ML Approvals',
        fileAttachment: '',
      },
      dateTransaction: '2024-07-16',
    },
  ],

  timeOffButtons: (navigation: TypeNavStack['navigation'], vacation: TypeTimeOff, sick: TypeTimeOff) => [
    {
      navigate: () =>
        navigation.navigate(STRINGS.pathTimeOff, {
          page: 1,
          data: vacation,
        }),
      image: ASSETS.iconVacation,
      count: vacation?.count || 0,
      title: STRINGS.timeOffBtnTitleI,
    },

    {
      navigate: () =>
        navigation.navigate(STRINGS.pathTimeOff, {
          page: 2,
          data: sick,
        }),
      image: ASSETS.iconSick,
      count: sick?.count || 0,
      title: STRINGS.timeOffBtnTitleII,
    },
  ],

  approvalsItem: [
    { title: STRINGS.cllnReqSched, value: '', width: '60%' },
    { title: STRINGS.cllnLocation, value: '', width: '60%' },
    { title: STRINGS.cllnTime, value: '' },
    { title: STRINGS.cllnOffsetHours, value: '' },
    { title: STRINGS.cllnDateTransaction, value: '' },
    { title: STRINGS.cllnLogType, value: '' },
  ],

  COSRequestCheckbox: [{ name: 'Rest Day' }],

  dayStatus: ['Today', 'Yesterday', 'Tomorrow'],

  geofences: [
    // {
    //     latitude: 14.62115091925712,
    //     longitude: 120.99299900745191,
    //     radius: 2,
    // },
    // {
    //   latitude: 14.606756738855745,
    //   longitude: 120.97320725674159,
    //   radius: 50,
    // },
    {
      latitude: 14.64370146932187,
      longitude: 121.02651191049141,
      radius: 20,
    },
    {
      latitude: 14.64186612992079,
      longitude: 121.04221619072203,
      radius: 900,
    },
  ],

  requestButton: [
    { title: 'Change of Schedule' },
    { title: 'Official Business' },
    { title: 'Overtime' },
    { title: 'Offset' },
    { title: 'Leave' },
    { title: 'Missed Log' },
    // { title: 'CTO'}
  ],

  pendingButton: [{ title: 'Filed' }, { title: 'Reviewed' }],

  profileButton: [{ title: 'Personal' }, { title: 'Payslip' }],

  leaveOption: [
    {
      ID: 1,
      name: 'Whole Day',
      value: 1.0,
      TOD: 'W',
    },
    {
      ID: 2,
      name: '1st Half',
      value: 0.5,
      TOD: '1',
    },
    {
      ID: 3,
      name: '2nd Half',
      value: 0.5,
      TOD: '2',
    },
  ],

  leaveTypes: [
    { ID: 1, code: 'VL', name: 'VACATION LEAVE' },
    { ID: 2, code: 'SL', name: 'SICK LEAVE' },
    { ID: 3, code: 'SPL', name: 'SINGLE PARENT LEAVE' },
  ],

  requestSchedule: [
    { ID: 6, name: '5:00AM - 2:00PM (OPERATION)', code: '5:00AM - 2:00PM (OPERATION)' },
    { ID: 7, name: '6:00AM - 3:00PM (OPERATION)', code: '6:00AM - 3:00PM (OPERATION)' },
    { ID: 8, name: '7:00AM - 4:00PM (OPERATION)', code: '7:00AM - 4:00PM (OPERATION)' },
    { ID: 9, name: '8:00AM - 5:00PM (OPERATION)', code: '8:00AM - 5:00PM (OPERATION)' },
  ],

  logType: [
    { name: 'Time In', value: 1 },
    { name: 'Time Out', value: 2 },
  ],

  locationList: [
    { ID: 1, name: 'Philippines', code: 'LOC00001' },
    { ID: 2, name: 'Caloocan', code: 'LOC00002' },
    { ID: 3, name: 'Las Piñas', code: 'LOC00003' },
    { ID: 4, name: 'Makati', code: 'LOC00004' },
    { ID: 5, name: 'Malabon', code: 'LOC00005' },
    { ID: 6, name: 'Mandaluyong', code: 'LOC00006' },
    { ID: 15, name: 'Quezon City', code: 'LOC00015' },
  ],

  branchList: [
    { ID: 1, name: 'MAGELLAN E-SUPPORT SERVICES, INC.', code: 'MES', IDLocation: 6, nameLocation: 'Mandaluyong' },
    {
      ID: 2,
      name: 'MAGELLAN PERFORMANCE OUTSOURCING CORP.',
      code: 'MPOC',
      IDLocation: 15,
      nameLocation: 'Quezon City',
    },
    { ID: 3, name: 'MY3D CONCEPTS CORPORATION', code: 'MY3D', IDLocation: 6, nameLocation: 'Mandaluyong' },
    { ID: 4, name: 'SUMMIT', code: 'SUMMIT', IDLocation: 6, nameLocation: 'Mandaluyong' },
  ],

  personalDetails: (data: TypeSchemaPersonal) => [
    {
      title: STRINGS.personalFieldI,
      value: data?.Name_Company,
    },
    {
      title: STRINGS.personalFieldII,
      value: data?.Name_Branch ?? STRINGS.none,
    },
    {
      title: STRINGS.personalFieldIII,
      value: data?.Name_Division ?? STRINGS.none,
    },
    {
      title: STRINGS.personalFieldIV,
      value: data?.Name_Department ?? STRINGS.none,
    },
    {
      title: STRINGS.personalFieldV,
      value: data?.Name_Section ?? STRINGS.none,
    },
    {
      title: STRINGS.personalFieldVI,
      value: data?.MobileNo ?? STRINGS.none,
    },
    {
      title: STRINGS.personalFieldVII,
      value: data?.EmailAdd ?? STRINGS.none,
    },
  ],

  requestCancellation: (props: PropsRequestSummary) => [
    { label: STRINGS.requestFieldDocumentNo, value: props?.documentNo },
    { label: STRINGS.requestFieldCancellationReason, value: props?.cancelReason },
  ],

  requestReview: (props: PropsRequestSummary) => [
    { label: STRINGS.requestFieldDocumentNo, value: props?.documentNo },
    { label: STRINGS.requestFieldReviewReason, value: props?.reviewReason },
  ],

  requestApproval: (props: PropsRequestSummary) => [
    { label: STRINGS.requestFieldDocumentNo, value: props?.documentNo },
    { label: STRINGS.requestFieldApproveReason, value: props?.approveReason },
  ],

  getRequestDetails: (
    defaultDetails: { label: string; value: any }[],
    props: PropsRequestSummary,
    reqAction?: number,
  ) => {
    switch (reqAction) {
      case ARRAY.reqAction[0].Cancel:
        return [...ARRAY.requestCancellation(props)];

      case ARRAY.reqAction[0].Review:
        return [...ARRAY.requestReview(props)];

      case ARRAY.reqAction[0].Approve:
        return [...ARRAY.requestApproval(props)];

      default:
        return defaultDetails;
    }
  },

  getRequestActionMessage: (reqAction?: number): string => {
    switch (reqAction) {
      case 1:
        return 'submitted. We will get back to you soon.';
      case 2:
        return 'updated.';
      case 4:
        return 'reviewed.';
      case 5:
        return 'approved.';
      default:
        return 'cancelled.';
    }
  },

  getRequestReference: (reqAction?: number, date?: string, documentNo?: string): string => {
    return reqAction === 1 ? `for <b><u>${date}</u></b> ` : `<b><u>Document No ${documentNo}</u></b> `;
  },

  requestSummary: (props: PropsRequestSummary, reqAction?: number) => [
    {
      details: ARRAY.getRequestDetails(
        [
          { label: STRINGS.COSRequestFieldI, value: DateTimeUtils.dateDefaultToWord(props?.startDate!) },
          { label: STRINGS.COSRequestFieldII, value: DateTimeUtils.dateDefaultToWord(props?.endDate!) },
          { label: STRINGS.COSRequestFieldIII, value: props?.requested?.name },
          { label: STRINGS.COSRequestFieldIV, value: props?.restDay },
          {
            label: STRINGS.requrestFieldReferenceNo,
            value: props?.referenceNo,
          },
          { label: STRINGS.requestFieldReason, value: props?.reason },
        ],
        props,
        reqAction,
      ),
      subText: STRINGS.requestSuccess(
        STRINGS.changeOfSchedule,
        DateTimeUtils.twoDateRangeFormat(props?.startDate!, props?.endDate!),
        reqAction,
        props?.documentNo,
      ),
    },
    {
      details: ARRAY.getRequestDetails(
        [
          {
            label: STRINGS.OBSummaryFieldI,
            value: DateTimeUtils.toDateRangeHalftMonthWord(props?.OBDateFrom!, props?.OBDateTo!),
          },
          {
            label: STRINGS.OBSummaryFieldII,
            value: DateTimeUtils.twoTimeRangeFormat(props?.OBTimeIn!, props?.OBTimeOut!),
          },
          { label: STRINGS.OBSummaryFieldIII, value: props?.location?.name },
          { label: STRINGS.OBSummaryFieldIV, value: props?.branch?.name ?? '' },
          { label: STRINGS.OBSummaryFieldV, value: props?.referenceNo ?? '' },
        ],
        props,
        reqAction,
      ),
      subText: STRINGS.requestSuccess(
        STRINGS.officialBusiness,
        DateTimeUtils.twoDateRangeFormat(props?.OBDateFrom!, props?.OBDateTo!),
        reqAction,
        props?.documentNo,
      ),
    },
    {
      details: ARRAY.getRequestDetails(
        [
          { label: STRINGS.OTRequestFieldI, value: DateTimeUtils.dateDefaultToWord(props?.date) },
          { label: STRINGS.OTRequestFieldII, value: props?.schedule?.name },
          {
            label: STRINGS.OTRequestFieldIII,
            value:
              props.schedule?.isPremium! === true
                ? DateTimeUtils.timeSecondsToUnits(props.timeRecord[0]?.date) <
                  DateTimeUtils.timeSecondsToUnits(props.schedule?.timeIn)
                  ? DateTimeUtils.timeSecondsToUnits(props.schedule?.timeIn)
                  : DateTimeUtils.timeSecondsToUnits(props.timeRecord[0]?.date)
                : props.schedule?.timeOut
                  ? DateTimeUtils.timeSecondsToUnits(props.schedule?.timeOut)
                  : undefined,
          },
          {
            label: STRINGS.OTRequestFieldIV,
            value: props?.timeRecord
              ? DateTimeUtils.timeSecondsToUnits(props?.timeRecord[props?.timeRecord?.length - 1]?.date)
              : null,
          },
          { label: STRINGS.OTRequestFieldV, value: DateTimeUtils.timeSecondsToUnits(props?.reqTimeIn) },
          { label: STRINGS.OTRequestFieldVI, value: DateTimeUtils.timeSecondsToUnits(props?.reqTimeOut) },
          { label: STRINGS.requestFieldReason, value: props?.reason },
          { label: STRINGS.requrestFieldReferenceNo, value: props?.referenceNo },
        ],
        props,
        reqAction,
      ),
      subText: STRINGS.requestSuccess(
        STRINGS.overtime,
        DateTimeUtils.dateDefaultToWord(props?.date),
        reqAction,
        props?.documentNo,
      ),
    },
    {
      details: ARRAY.getRequestDetails(
        [
          { label: STRINGS.OFFRequestFieldI, value: DateTimeUtils.dateDefaultToWord(props?.date) },
          { label: STRINGS.OFFRequestFieldII, value: props?.schedule?.name },
          {
            label: STRINGS.OFFRequestFieldIII,
            value: DateTimeUtils.timeSecondsToUnits(props?.schedule?.timeOut),
          },
          {
            label: STRINGS.OFFRequestFieldIV,
            value: props?.timeRecord
              ? DateTimeUtils.timeSecondsToUnits(props?.timeRecord[props?.timeRecord?.length - 1]?.date)
              : null,
          },
          { label: STRINGS.OFFRequestFieldV, value: DateTimeUtils.timeSecondsToUnits(props?.reqTimeIn) },
          { label: STRINGS.OFFRequestFieldVI, value: DateTimeUtils.timeSecondsToUnits(props?.reqTimeOut) },
          { label: STRINGS.requestFieldReason, value: props?.reason },
          { label: STRINGS.requrestFieldReferenceNo, value: props?.referenceNo },
        ],
        props,
        reqAction,
      ),
      subText: STRINGS.requestSuccess(
        STRINGS.offset,
        DateTimeUtils.dateDefaultToWord(props?.date),
        reqAction,
        props?.documentNo,
      ),
    },
    {
      details: ARRAY.getRequestDetails(
        [
          { label: STRINGS.LVRequestFieldI, value: props?.leaveType?.name },
          { label: STRINGS.LVRequestFieldIII, value: props?.leaveOption?.name },
          { label: STRINGS.LVRequestFieldIV, value: DateTimeUtils.dateDefaultToWord(props?.startDate!) },
          { label: STRINGS.LVRequestFieldV, value: DateTimeUtils.dateDefaultToWord(props?.endDate!) },
          { label: STRINGS.requrestFieldReferenceNo, value: props?.referenceNo },
          { label: STRINGS.requestFieldReason, value: props?.reason },
        ],
        props,
        reqAction,
      ),
      subText: STRINGS.requestSuccess(
        STRINGS.leave,
        DateTimeUtils.twoDateRangeFormat(props?.startDate!, props?.endDate!),
        reqAction,
        props?.documentNo,
      ),
    },
    {
      details: ARRAY.getRequestDetails(
        [
          {
            label: STRINGS.MLRequestFieldI,
            value: DateTimeUtils.dateDashToWord(props?.dateFiled),
          },
          {
            label: STRINGS.MLRequestFieldII,
            value: props?.logType?.name,
          },
          {
            label: STRINGS.MLRequestFieldIII,
            value: DateTimeUtils.timeSecondsToUnits(props?.logTime),
          },
          {
            label: STRINGS.requrestFieldReferenceNo,
            value: props?.referenceNo,
          },
          {
            label: STRINGS.requestFieldReason,
            value: props?.reason,
          },
        ],
        props,
        reqAction,
      ),
      subText: STRINGS.requestSuccess(
        STRINGS.missedLog,
        DateTimeUtils.twoDateRangeFormat(props?.dateFiled, props?.dateFiled),
        reqAction,
        props?.documentNo,
      ),
    },
  ],

  fileFormats: ['doc', 'docx', 'png', 'pdf', 'jpeg', 'jpg', 'txt'],
  imageFormat: ['png', 'jpeg', 'jpg'],
  documentFormat: ['doc', 'docx', 'pdf', 'txt'],

  // Request Applications Array Value
  // FormData Request
  formDataCOS: (parsed: StateCOSRequest) => [
    { title: 'DateFiled.DateFrom', value: parsed?.startDate },
    { title: 'DateFiled.DateTo', value: parsed?.endDate },
    { title: 'Requested.Id', value: parsed?.requested?.ID },
    { title: 'Requested.Name', value: parsed?.requested?.name },
    { title: 'Requested.IsRestDay', value: parsed?.restDay ? true : false },
    { title: 'ReferenceNo', value: parsed?.referenceNo },
  ],

  formDataOB: (parsed: StateOBRequest) => [
    { title: 'LocationId', value: parsed?.location?.ID },
    { title: 'Location', value: parsed?.location?.name },
    { title: 'DateFrom', value: parsed?.OBDateFrom },
    { title: 'DateTo', value: parsed?.OBDateTo },
    { title: 'TimeIn', value: parsed?.OBTimeIn },
    { title: 'TimeOut', value: parsed?.OBTimeOut },
    { title: 'ReferenceNo', value: parsed?.referenceNo },
  ],

  formDataOTAndOFF: (parsed: StateOTOFFRequest) => [
    { title: 'DateFiled', value: parsed?.date },
    { title: 'Schedule.Id', value: parsed?.schedule?.id },
    { title: 'Schedule.Name', value: parsed?.schedule?.name },
    { title: 'Schedule.Date', value: DateTimeUtils.dateDefaultToDash(parsed?.schedule?.date) },
    { title: 'Schedule.TimeIn', value: parsed?.schedule?.timeIn },
    { title: 'Schedule.TimeOut', value: parsed?.schedule?.timeOut },
    { title: 'Schedule.BreakTimeIn', value: parsed?.schedule?.breakTimeIn },
    { title: 'Schedule.BreakTimeOut', value: parsed?.schedule?.breakTimeOut },
    { title: 'Schedule.ShiftTypeId', value: Object(parsed?.schedule?.shiftType).shiftTypeId! },
    { title: 'Schedule.ShiftType', value: Object(parsed?.schedule?.shiftType).shiftType! },
    { title: 'ShiftType.ShiftTypeId', value: Object(parsed?.schedule?.shiftType).shiftTypeId! },
    { title: 'ShiftType.ShiftType', value: Object(parsed?.schedule?.shiftType).shiftType! },
    { title: 'Schedule.IsPremium', value: parsed?.schedule?.isPremium },
    { title: 'ReferenceNo', value: parsed?.referenceNo },
    {
      title: 'Actual.TimeIn',
      value: (() => {
        const scheduleIn = DateTimeUtils.timeSecondsSetZeroSeconds(parsed.schedule?.timeIn);
        const scheduleOut = DateTimeUtils.timeSecondsSetZeroSeconds(parsed.schedule?.timeOut);
        const timeRecordIn = DateTimeUtils.timeSecondsSetZeroSeconds(parsed.timeRecord[0]?.date);
        if (parsed.schedule.isPremium === true) {
          return timeRecordIn < scheduleIn ? scheduleIn : timeRecordIn;
        } else {
          return parsed.schedule?.timeOut ? scheduleOut : undefined;
        }
      })(),
    },
    {
      title: 'Actual.TimeOut',
      value: DateTimeUtils.timeSecondsSetZeroSeconds(parsed?.timeRecord[parsed?.timeRecord?.length - 1]?.date),
    },
    { title: 'Requested.TimeIn', value: parsed?.reqTimeIn },
    { title: 'Requested.TimeOut', value: parsed?.reqTimeOut },
  ],

  formDataLV: (parsed: StateLVRequest) => [
    { title: 'DateFiled.DateFrom', value: parsed?.startDate },
    { title: 'DateFiled.DateTo', value: parsed?.endDate },
    { title: 'LeaveParameter.Id', value: parsed?.leaveType?.ID },
    { title: 'LeaveParameter.Code', value: parsed?.leaveType?.code },
    { title: 'LeaveParameter.Name', value: parsed?.leaveType?.name },
    { title: 'LeaveOption.Id', value: parsed?.leaveOption?.ID },
    { title: 'LeaveOption.Name', value: parsed?.leaveOption?.name },
    { title: 'LeaveOption.Type', value: parsed?.leaveOption?.TOD },
    { title: 'LeaveOption.Amount', value: parsed?.leaveOption?.value },
    { title: 'ReferenceNo', value: parsed?.referenceNo },
  ],

  formDataML: (parsed: StateMLRequest) => [
    { title: 'DateFiled', value: parsed?.dateFiled },
    { title: 'LogType.Id', value: parsed?.logType?.value },
    { title: 'LogType.Name', value: parsed?.logType?.name },
    { title: 'ReferenceNo', value: parsed?.referenceNo },
    { title: 'TimeInOut', value: parsed?.logTime },
  ],

  // Request Body Value
  reqBodyDefault: (data: SchemaRequestApplications) => [
    { title: 'Id', value: data?.filing?.id },
    { title: 'Guid', value: data?.filing?.guid },
    { title: 'DocumentNo', value: data?.filing?.documentNo },
    { title: 'EmployeeId', value: data?.id },
    { title: 'EmployeeCode', value: data?.code },
    { title: 'EmployeeName', value: data?.name },
    { title: 'CompanyId', value: data?.companyId },
    { title: 'BranchId', value: data?.branchId },

    { title: 'FilingStatus.Id', value: data?.filing?.filingStatus?.id },
    { title: 'FilingStatus.Name', value: data?.filing?.filingStatus?.name },
    { title: 'FilingStatusId', value: data?.filing?.filingStatus?.id },
    { title: 'FilingStatus', value: data?.filing?.filingStatus?.name },
    { title: 'ReferenceNo', value: data?.filing?.referenceNo },
    { title: 'DateTransaction', value: DateTimeUtils.isoToDateDash(data?.filing?.dateTransaction) },
    { title: 'Reason', value: data?.filing?.reason },
    { title: 'FileAttachment', value: data?.filing?.fileAttachment },
    { title: 'EditLog', value: data?.editLog },
  ],

  reqBodyDefaultML: (data: SchemaRequestApplications) => [
    { title: 'Approver.Id', value: data?.id },
    { title: 'Approver.Code', value: data?.code },
    { title: 'Approver.Name', value: data?.name },
    { title: 'Approver.CompanyId', value: data?.companyId },
    { title: 'Approver.BranchId', value: data?.branchId },
    { title: 'Approver.DepartmentId', value: data?.departmentId },
  ],

  requestBodyCOS: (data: SchemaRequestApplications) => [
    ...ARRAY.reqBodyDefault(data),
    { title: 'DepartmentId', value: data?.departmentId ?? 0 },
    { title: 'DateFiled.DateFrom', value: (data?.filing?.dateFiled as { dateFrom: string })?.dateFrom! },
    { title: 'DateFiled.DateTo', value: (data?.filing?.dateFiled as { dateTo: string })?.dateTo! },
    { title: 'Requested.Id', value: data?.filing?.requested?.id },
    { title: 'Requested.Name', value: data?.filing?.requested?.name },
    { title: 'Requested.IsRestDay', value: data?.filing?.requested?.isRestDay },
  ],

  requestBodyOB: (data: SchemaRequestApplications) => [
    ...ARRAY.reqBodyDefault(data),
    { title: 'DepartmentId', value: data?.departmentId ?? 0 },
    { title: 'LocationId', value: data?.filing?.location?.id },
    { title: 'Location', value: data?.filing?.location?.name },
    { title: 'LocationBranchId', value: data?.filing?.location?.locationBranchId },
    { title: 'LocationBranch', value: data?.filing?.location?.locationBranch },
    { title: 'DateFrom', value: data?.filing?.dateRange?.dateFrom },
    { title: 'DateTo', value: data?.filing?.dateRange?.dateTo },
    { title: 'TimeIn', value: data?.filing?.timeRange?.timeIn },
    { title: 'TimeOut', value: data?.filing?.timeRange?.timeOut },
  ],

  reqBodyOTOFF: (data: SchemaRequestApplications) => [
    ...ARRAY.reqBodyDefault(data),
    { title: 'DateFiled', value: data?.filing?.dateFiled },
    { title: 'Schedule.Id', value: data?.filing?.shiftSchedule?.id },
    { title: 'Schedule.Name', value: data?.filing?.shiftSchedule?.name },
    { title: 'Schedule.Date', value: data?.filing?.shiftSchedule?.date },
    { title: 'Schedule.TimeIn', value: data?.filing?.shiftSchedule?.timeIn },
    { title: 'Schedule.TimeOut', value: data?.filing?.shiftSchedule?.timeOut },
    { title: 'Schedule.BreakTimeIn', value: data?.filing?.shiftSchedule?.breakTimeIn },
    { title: 'Schedule.BreakTimeOut', value: data?.filing?.shiftSchedule?.breakTimeOut },
    { title: 'Schedule.IsPremium', value: data?.filing?.shiftSchedule?.isPremium },

    ...(typeof data?.filing.shiftSchedule?.shiftType! === 'string'
      ? [
        { title: 'Schedule.ShiftTypeId', value: data?.filing.shiftSchedule?.shiftTypeId },
        { title: 'Schedule.ShiftType', value: String(data?.filing.shiftSchedule?.shiftType!) },
      ]
      : [
        { title: 'Schedule.ShiftTypeId', value: Object(data?.filing.shiftSchedule?.shiftType).shiftTypeId! },
        { title: 'Schedule.ShiftType', value: Object(data?.filing.shiftSchedule?.shiftType).shiftType! },
        { title: 'ShiftType.ShiftTypeId', value: Object(data?.filing.shiftSchedule?.shiftType).shiftTypeId! },
        { title: 'ShiftType.ShiftType', value: Object(data?.filing.shiftSchedule?.shiftType).shiftType! },
      ]),
    ,
    { title: 'FilingStatusId', value: data?.filing?.filingStatus.id },
    { title: 'FilingStatus', value: data?.filing?.filingStatus.name },
    { title: 'Actual.TimeIn', value: DateTimeUtils.extractTime(data?.filing?.actual?.dateFrom!) },
    { title: 'Actual.TimeOut', value: DateTimeUtils.extractTime(data?.filing?.actual?.dateTo!) },
    { title: 'Requested.TimeIn', value: DateTimeUtils.extractTime(data?.filing?.requested?.dateFrom!) },
    { title: 'Requested.TimeOut', value: DateTimeUtils.extractTime(data?.filing?.requested?.dateTo!) },
  ],

  reqBodyLV: (data: SchemaRequestApplications) => [
    ...ARRAY.reqBodyDefault(data),
    ...ARRAY.reqBodyDefaultML(data),
    { title: 'DepartmentId', value: data?.departmentId },
    { title: 'DateFiled.DateFrom', value: (data?.filing?.dateFiled as { dateFrom: string })?.dateFrom! },
    { title: 'DateFiled.DateTo', value: (data?.filing?.dateFiled as { dateTo: string })?.dateTo! },
    { title: 'LeaveParameter.Id', value: data?.filing?.leaveParameter?.id },
    { title: 'LeaveParameter.Code', value: data?.filing?.leaveParameter?.code },
    { title: 'LeaveParameter.Name', value: data?.filing?.leaveParameter?.name },
    { title: 'LeaveOption.Id', value: data?.filing?.leaveOption?.id },
    { title: 'LeaveOption.Name', value: data?.filing?.leaveOption?.name },
    { title: 'LeaveOption.Type', value: data?.filing?.leaveOption?.type },
    { title: 'LeaveOption.Amount', value: data?.filing?.leaveOption?.amount },
  ],
  // Original Request Body Missed Log
  reqBodyML: (data: SchemaRequestApplications) => [
    ...ARRAY.reqBodyDefault(data),
    ...ARRAY.reqBodyDefaultML(data),
    { title: 'DepartmentId', value: data?.departmentId || 0 },
    { title: 'DateFiled', value: DateTimeUtils.isoToDateDash(data?.filing?.dateFiled as string) },
    { title: 'LogType.Id', value: data?.filing?.logType?.id },
    { title: 'LogType.Name', value: data?.filing?.logType?.name },
    { title: 'TimeInOut', value: data?.filing?.timeInOut },
  ],

  COSFilter: () => [
    { label: STRINGS.labelDateTransaction, value: STRINGS.fieldDateTransaction },
    { label: STRINGS.labelDatePeriod, value: STRINGS.filterDateFrom },
    { label: STRINGS.labelDocumentNo, value: STRINGS.fieldDocumentNo },
    { label: STRINGS.labelRequestedSchedule, value: STRINGS.fieldRequested },
    { label: STRINGS.labelDocStatus, value: STRINGS.fieldDocStatus },
  ],

  OBFilter: () => [
    { label: STRINGS.labelDocumentNo, value: STRINGS.fieldDocumentNo },
    { label: STRINGS.labelDatePeriodOB, value: STRINGS.filterDateFrom },
    { label: STRINGS.labelDateTransaction, value: STRINGS.fieldDateTransaction },
    { label: STRINGS.labelDocumentNo, value: STRINGS.fieldDocumentNo },
    { label: STRINGS.labelLocation, value: STRINGS.fieldLocation },
    { label: STRINGS.labelDocStatus, value: STRINGS.fieldDocStatus },
  ],

  OTFilter: () => [
    { label: STRINGS.labelDateTransaction, value: STRINGS.fieldDateTransaction },
    { label: STRINGS.labelDatePeriod, value: STRINGS.fieldDateFiled },
    { label: STRINGS.labelDocumentNo, value: STRINGS.fieldDocumentNo },
    { label: STRINGS.labelDocStatus, value: STRINGS.fieldDocStatus },
  ],

  OFFFilter: () => [
    { label: STRINGS.labelDateTransaction, value: STRINGS.fieldDateTransaction },
    { label: STRINGS.labelDatePeriod, value: STRINGS.fieldDateFiled },
    { label: STRINGS.labelDocumentNo, value: STRINGS.fieldDocumentNo },
    { label: STRINGS.labelDocStatus, value: STRINGS.fieldDocStatus },
  ],

  LVFilter: () => [
    { label: STRINGS.labelDateTransaction, value: STRINGS.fieldDateTransaction },
    { label: STRINGS.labelDatePeriod, value: STRINGS.fieldDateFiled },
    { label: STRINGS.labelDocumentNo, value: STRINGS.fieldDocumentNo },
    { label: STRINGS.labelLeaveType, value: STRINGS.fieldLeaveParameter },
    { label: STRINGS.labelDocStatus, value: STRINGS.fieldDocStatus },
  ],

  MLFilter: () => [
    { label: STRINGS.labelDateTransaction, value: STRINGS.fieldDateTransaction },
    { label: STRINGS.labelDatePeriod, value: STRINGS.filterDateFiled },
    { label: STRINGS.labelDocumentNo, value: STRINGS.fieldDocumentNo },
    { label: STRINGS.labelLogType, value: STRINGS.fieldLogType },
    { label: STRINGS.labelDocStatus, value: STRINGS.fieldDocStatus },
  ],

  requestFormDataUpdate: (params: SchemaRequestApplications) => [
    { title: 'UpdatedBy.Id', value: params?.id },
    { title: 'UpdatedBy.Code', value: params?.code },
    { title: 'UpdatedBy.Name', value: params?.name },
    { title: 'UpdatedBy.CompanyId', value: params?.companyId },
    { title: 'UpdatedBy.BranchId', value: params?.branchId },
    { title: 'UpdatedBy.DepartmentId', value: params?.departmentId },
  ],

  requestFormDataCancel: (params: SchemaRequestApplications) => [
    { title: 'CancelledBy.Id', value: params?.id },
    { title: 'CancelledBy.Code', value: params?.code },
    { title: 'CancelledBy.Name', value: params?.name },
    { title: 'CancelledBy.CompanyId', value: params?.companyId },
    { title: 'CancelledBy.BranchId', value: params?.branchId },
    { title: 'CancelledBy.DepartmentId', value: params?.departmentId },
  ],

  requestFormData: (reqAction: number, params: SchemaRequestApplications) => [
    reqAction === 2 ? { ...ARRAY.requestFormDataUpdate(params) } : { ...ARRAY.requestFormDataCancel(params) },
    { title: 'EmployeeId', value: params?.id },
    { title: 'EmployeeCode', value: params?.code },
    { title: 'EmployeeName', value: params?.name },
    { title: 'CompanyId', value: params?.companyId },
    { title: 'BranchId', value: params?.branchId },
    // { title: 'DepartmentId', value: params?.departmentId || 0 },
    { title: 'Id', value: params?.filing?.id },
    { title: 'Guid', value: params?.filing?.guid },
    { title: 'DocumentNo', value: params?.filing?.documentNo },
    { title: 'FilingStatus.Id', value: params?.filing?.filingStatus?.id },
    { title: 'FilingStatus.Name', value: params?.filing?.filingStatus?.name },
    { title: 'FilingStatusId', value: params?.filing?.filingStatus?.id },
    { title: 'FilingStatus', value: params?.filing?.filingStatus?.name },
  ],

  // Request
  ReasonAndFileAttachment: (params: SchemaRequestApplications) => ({
    reason: params?.filing?.reason,
    attachment: {
      format: '',
      uri: '',
      url: params?.filing?.fileAttachment,
    },
    documentNo: params?.filing?.documentNo,
  }),

  // COS Request Data Filing
  formDataFilingCOS: (params: SchemaRequestApplications) => ({
    startDate: (params?.filing?.dateFiled as { dateFrom: string })?.dateFrom,
    endDate: (params?.filing?.dateFiled as { dateTo: string })?.dateTo,
    requested: {
      ID: params?.filing?.requested?.id,
      name: params?.filing?.requested?.name,
    },
    restDay: params?.filing?.requested?.isRestDay === true ? 1 : 0,
  }),

  // OB Request Data Filing
  formDataFilingOB: (params: SchemaRequestApplications) => ({
    OBDateFrom: (params?.filing?.dateRange as { dateFrom: string })?.dateFrom,
    OBDateTo: (params?.filing?.dateRange as { dateTo: string })?.dateTo,
    location: {
      ID: params?.filing?.location?.id,
      name: params?.filing?.location?.name,
    },
    branch: {
      ID: params?.filing?.location?.locationBranchId,
      name: params?.filing?.location?.locationBranch,
    },
    OBTimeIn: params?.filing?.timeRange?.timeIn,
    OBTimeOut: params?.filing?.timeRange?.timeOut,
    referenceNo: params?.filing.referenceNo,
  }),

  // OT Request Data Filing
  formDataFilingOTAndOFF: (params: SchemaRequestApplications) => ({
    date: params?.filing?.dateFiled,
    schedule: {
      id: params?.filing?.shiftSchedule?.id,
      name: params?.filing?.shiftSchedule?.name,
      date: params?.filing?.shiftSchedule?.date,
      timeIn: params?.filing?.shiftSchedule?.timeIn,
      timeOut: params?.filing?.shiftSchedule?.timeOut,
      breakTimeIn: params?.filing?.shiftSchedule?.breakTimeIn,
      breakTimeOut: params?.filing?.shiftSchedule?.breakTimeOut,

      shiftType:
        typeof params?.filing?.shiftSchedule?.shiftType === 'string'
          ? {
            shiftType: params?.filing?.shiftSchedule?.shiftType,
            shiftTypeId: params?.filing?.shiftSchedule?.shiftTypeId,
          }
          : {
            shiftType: params?.filing?.shiftSchedule?.shiftType?.shiftType,
            shiftTypeId: params?.filing?.shiftSchedule?.shiftType?.shiftTypeId,
          },

      isPremium: params?.filing?.shiftSchedule?.isPremium,
    },
    referenceNo: params?.filing.referenceNo,
    // comment out code below to not have an initial value
    reqTimeIn: DateTimeUtils.timeWithSeconds((params?.filing?.requested as { dateFrom: string })?.dateFrom),
    reqTimeOut: DateTimeUtils.timeWithSeconds((params?.filing?.requested as { dateTo: string })?.dateTo),
  }),

  // LV Request Data Filing
  formDataFilingLV: (params: SchemaRequestApplications) => ({
    leaveType: {
      ID: params?.filing?.leaveParameter?.id,
      name: params?.filing?.leaveParameter?.name,
      code: params?.filing?.leaveParameter?.code,
    },
    leaveOption: {
      ID: params?.filing?.leaveOption?.id,
      name: params?.filing?.leaveOption?.name,
      TOD: params?.filing?.leaveOption?.type,
      value: params?.filing?.leaveOption?.amount,
    },
    startDate: (params?.filing?.dateFiled as { dateFrom: string })?.dateFrom,
    endDate: (params?.filing?.dateFiled as { dateTo: string })?.dateTo,
    referenceNo: params?.filing.referenceNo,
  }),

  // ML Request Data Filing
  formDataFilingML: (params: SchemaRequestApplications) => ({
    logTime: params?.filing?.timeInOut,
    dateFiled: params?.filing?.dateFiled as string,
    referenceNo: params?.filing.referenceNo,
    logType: {
      value: params?.filing?.logType?.id,
      name: params?.filing?.logType?.name,
    },
  }),

  // Request Details
  requestDetailsHeader: (type: string, data: SchemaRequestApplications) => [
    { space: false, title: STRINGS.cllnType, value: type },
    { space: false, title: STRINGS.cllnDocumentNo, value: data?.filing.documentNo },
    {
      space: false,
      title: STRINGS.cllnDateFiled,
      value:
        (data?.filing?.dateFiled as { dateFrom: string })?.dateFrom! ||
          (data?.filing?.dateFiled as { dateTo: string })?.dateTo!
          ? DateTimeUtils.twoDateRangeFormat(
            (data?.filing?.dateFiled as { dateFrom: string })?.dateFrom!,
            (data?.filing?.dateFiled as { dateTo: string })?.dateTo!,
          )
          : data?.filing?.dateRange?.dateFrom || data?.filing?.dateRange?.dateTo
            ? DateTimeUtils.twoDateRangeFormat(data?.filing?.dateRange?.dateFrom, data?.filing?.dateRange?.dateTo)
            : DateTimeUtils.dateDefaultToWord(data?.filing?.dateFiled as string),
    },
    {
      space: false,
      title: STRINGS.cllnDateTransaction,
      value: DateTimeUtils.isoToDateWord(data?.filing?.dateTransaction),
    },
  ],

  requestDetailsCOS: (data: SchemaRequestApplications) => [
    { space: true, title: STRINGS.cllnRequestedSched, value: data?.filing?.requested?.name },
  ],

  requestDetailsOB: (data: SchemaRequestApplications) => [
    {
      space: true,
      title: STRINGS.labelDocumentNo,
      value: data.filing.documentNo,
    },
    {
      space: true,
      title: STRINGS.requestFieldApproveReason,
      value: data.filing.approveReason,
    },
  ],

  requestDetailsOTOFF: (data: SchemaRequestApplications) => [
    {
      space: true,
      title: STRINGS.cllnOvertimeDate,
      value: DateTimeUtils.dateDefaultToWord(
        typeof data?.filing?.dateFiled === 'string' ? data?.filing?.dateFiled : data?.filing?.dateFiled?.dateFrom!,
      ),
    },
    {
      space: false,
      title: STRINGS.cllnOvertimeHours,
      value: DateTimeUtils.twoTimeRangeFormat(
        DateTimeUtils.timeWithSeconds(data?.filing?.requested?.dateFrom!),
        DateTimeUtils.timeWithSeconds(data?.filing?.requested?.dateTo!),
      ),
    },
  ],

  requestDetailsLV: (data: SchemaRequestApplications) => [
    { space: true, title: STRINGS.cllnLeaveType, value: data?.filing?.leaveParameter?.name },
    { space: false, title: STRINGS.cllnLeaveOption, value: data?.filing?.leaveOption?.name },
  ],

  requestDetailsML: (data: SchemaRequestApplications) => [
    { space: true, title: STRINGS.cllnLogType, value: data?.filing?.logType?.name },
    { space: false, title: STRINGS.cllnLogTime, value: DateTimeUtils.timeSecondsToUnits(data?.filing?.timeInOut!) },
  ],

  months: [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ],

  sourceColorMap: [
    { source: 'holiday', color: COLORS.red },
    { source: 'cos', color: COLORS.lightOrange }, //change of schedule
    { source: 'ot', color: COLORS.lightBlue }, //overtime
    { source: 'ob', color: COLORS.blue }, //official business
    { source: 'vl', color: COLORS.lightPurple }, //vacation leave
    { source: 'sl', color: COLORS.lightPurple }, //sick leave
    { source: 'spl', color: COLORS.lightPurple }, //single parent leave
    { source: 'bl', color: COLORS.lightPurple },
    { source: 'cto', color: COLORS.lightPurple },
    { source: 'pl', color: COLORS.lightPurple },
    { source: 'lwp', color: COLORS.lightPurple },
    { source: 'ml', color: COLORS.lightPurple },
    { source: 'mc', color: COLORS.lightPurple },
    { source: 'bdl', color: COLORS.lightPurple },
    { source: 'el', color: COLORS.lightPurple },
    { source: 'sal', color: COLORS.lightPurple },
  ],
};
