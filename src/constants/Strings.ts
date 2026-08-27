// HRDotNet-Mobile
// Designed by : Alexiane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { DateTimeUtils } from '../utils/DateTimeUtils';
import { SchemaRequestApplications, TypeHandle } from 'src/types/Types';
import { ARRAY } from './Array';

enum PromptAction {
  Cancel = 0,
  Confirm = 1, //Approve and Review
}

export const STRINGS = {
  pat: 'Patrick',
  greetings: 'Hello',
  titleTimeClock: 'Time Clock',

  tabTitleProfile: 'Profile',
  tabTitleCalendar: 'Calendar',
  tabTitleRequest: 'Request',

  pageTitleCamera: 'Camera',
  pageTitleReqSummary: 'Request Summary',
  pageTitleCameraView: 'Image Preview',
  pageTitleCOSRequest: 'Change of Schedule Request',
  pageTitleOBRequest: 'Official Business Request',
  pageTitleOTRequest: 'Overtime Request',
  pageTitleOFFRequest: 'Offset Request',
  pageTitleLVRequest: 'Leave Request',
  pageTitleMLRequest: 'Missed Log Request',
  pageTitleCTORequest: 'Compensatory Time Off',
  pageTitleDrawer: 'HRDotNet',
  pageTitleNotification: 'Notification',
  pageTitlePayslip: 'Payslip Details',
  pageTitlePending: 'Pending',
  pageTitleVLeave: 'Vacation Leave',
  pageTitleSLeave: 'Sick Leave',
  pageTitleLoanLedger: 'Loan Ledger',
  pageTitleLoanDetails: 'Loan Details',
  pageTitleAboutUs: 'About Us',
  pageTitleContacts: 'Contacts',
  pageTitleContactInformation: 'Contact Information',
  pageTitleTimesheet: 'Timesheet',
  pageTitleClockInOut: 'Time Clock',
  pageTitleApprovals: 'Approvals',
  pageTitleReviewals: 'Reviewals',
  pageTitleTeams: 'Teams',
  pageTitleTeamMembers: 'Team Member',
  pageTitleTeamsDetails: 'Teams Details',
  pageTitleRequestDetails: 'Request Details',
  pageTitleRequestUpdate: 'Request Update',
  pageTitleAttachedFile: 'Attached File',
  pageTitleSelectionList: 'Select',
  pageTitleUpdateRequest: 'Update Request',

  pageTitleReqSummaryUpdate: 'Request Summary Update',
  pageTitleCOSRequestUpdate: 'Change of Schedule Request Update',
  pageTitleOBRequestUpdate: 'Official Business Request Update',
  pageTitleOTRequestUpdate: 'Overtime Request Update',
  pageTitleOFFRequestUpdate: 'Offset Request Update',
  pageTitleLVRequestUpdate: 'Leave Request Update',
  pageTitleMLRequestUpdate: 'Missed Log Request Update',

  selectionListCOSRequest: 'COSRequest-Schedule',
  selectionListOBRequestI: 'OBRequest-Location',
  selectionListOBRequestII: 'OBRequest-Branch',
  selectionListLVRequest: 'LVRequest-LeaveType',

  homeGreeting: 'Hello',
  homeTitleFirst: 'Menu',
  homeTitleSecond: 'Time Off',
  profileBtnOne: 'Personal',
  profileBtnTwo: 'Payslip',
  OTPromptTitle: 'Overtime Tracking',
  OTPromptNoDate: 'Please select a date',

  payslipTitleFirst: 'Pay History',

  pendingButtonI: 'Pending',
  pendingButtonII: 'Reviewed',

  menuBtnTitleI: 'Timesheet',
  menuBtnTitleII: `Loan${'\n'}Ledger`,
  menuBtnTitleIII: 'Reviewals',
  menuBtnTitleApproverI: 'Approvals',
  menuBtnTitleApproverII: 'Teams',
  menuBtnTitleApproverIII: 'Contacts',
  menuBtnTitleUserI: 'COS Request',
  menuBtnTitleUserII: 'OT Request',
  menuBtnTitleUserIII: 'OB Request',

  timeOffBtnTitleI: `Vacation${'\n'}Leave`,
  timeOffBtnTitleII: `Sick${'\n'}Leave`,

  recentPayTitle: 'Recent Pay',
  recentPayRowI: 'Net Pay',
  recentPayRowII: 'Gross Pay',
  recentPayRowIII: 'Deductions',

  drawerTitleI: 'Privacy Policy',
  drawerTitleII: 'Terms and Conditions',
  drawerTitleIII: 'About Us',

  aboutUsTitleI: '1. About the Company',
  aboutUsTitleII: '2. Brand Toolkit',
  aboutUsTitleIII: '3. Transparency Center',
  aboutUsTitleIV: '4. Contributors',

  // Field Name
  fieldDocumentNo: 'DocumentNo',
  fieldDateFiled: 'DateFiled',
  fieldDateTransaction: 'DateTransaction',
  fieldTimeInOut: 'TimeInOut',
  fieldLocation: 'Location',
  fieldDocStatus: 'DocStatus',
  fieldRequested: 'Requested',
  fieldLogType: 'logType',
  fieldLeaveParameter: 'LeaveParameter',
  fieldDateFrom: 'DateFrom',

  //Filter
  filterDateFiled: 'dateFiled',
  filterDateTransaction: 'dateTransaction',
  filterDateFrom: 'dateFrom',

  // Plain strings
  labelDocumentNo: 'Document No.',
  labelDatePeriod: 'Date Period',
  labelDatePeriodOB: 'OB Period',
  labelDateTransaction: 'Date Transanction',
  labelTimeInOutOB: 'OB Time In and Out',
  labelLocation: 'Location',
  labelDocStatus: 'Status',
  labelRequestedSchedule: 'Requested Schedule',
  labelLogType: 'Log Type',
  labelLeaveType: 'Leave Type',

  // Collons Strings
  cllnRequestedSched: 'Requested Sched: ',
  cllnRestDay: 'Rest Day: ',
  cllnReqSched: 'Req. Sched: ',
  cllnLocation: 'Location: ',
  cllnOvertimeHours: 'Overtime Hours: ',
  cllnOffsetHours: 'Offset Hours: ',
  cllnType: 'Type: ',
  cllnLogType: 'Log Type: ',
  cllnLogTime: 'Log Time: ',
  cllnDateFiled: 'Date Period: ',
  cllnSource: 'Source: ',
  cllnLoanCode: 'Loan Code: ',
  cllnDocumentNo: 'Document No.: ',
  cllnTransactionCode: 'Transaction Code: ',
  cllnApprovedDate: 'Approved Date: ',
  cllnCancelledDate: 'Cancelled Date: ',
  cllnDateGranted: 'Date Granted: ',
  cllnFirstDueDate: 'First Due Date: ',
  cllnReferenceNo: 'Reference No.: ',
  cllnLoanAmount: 'Loan Amount: ',
  cllnDisbursedAmount: 'Disbursed Amount: ',
  cllnCycle: 'Cycle: ',
  cllnPerMonth: 'Installment Per Month: ',
  cllnTotalInstallAmount: 'Total Installment Amount: ',
  cllnBalance: 'Balance: ',
  cllnPaymentDate: 'Payment Date: ',
  cllnPaymentAmount: 'Payment Amount: ',
  cllnDate: 'Date: ',
  cllnTime: 'Time: ',
  cllnDateTransaction: 'Date Transaction: ',
  cllnOBDate: 'OB Date: ',
  cllnOBTime: 'OB Time In and Out: ',
  cllnBranch: 'Branch: ',
  cllnOvertimeDate: 'Overtime Date: ',
  cllnMissedLogDate: 'Missed Log Date: ',
  cllnReason: 'Reason: ',
  cllnAttachedFile: 'Attached File: ',
  cllnStatus: 'Status: ',
  cllnName: 'Name: ',
  cllnLeaveType: 'Leave Type: ',
  cllnLeaveOption: 'Leave Option: ',

  personalFieldI: 'Company',
  personalFieldII: 'Branch',
  personalFieldIII: 'Division',
  personalFieldIV: 'Department',
  personalFieldV: 'Section',
  personalFieldVI: 'Contact Number',
  personalFieldVII: 'Email Address',

  COSRequestFieldI: 'Start Date',
  COSRequestFieldII: 'End Date',
  COSRequestFieldIII: 'Schedule',
  COSRequestFieldIV: 'Rest Day',
  COSRequestFieldIIV: '',

  OBRequestFieldI: 'OB Date From',
  OBRequestFieldII: 'OB Date To',
  OBRequestFieldIII: 'Location',
  OBRequestFieldIV: 'Branch',
  OBRequestFieldV: 'Time in',
  OBRequestFieldVI: 'Time out',
  OBRequestFieldVII: 'OB Time In',
  OBRequestFieldVIII: 'OB Time Out',
  OBSummaryFieldI: 'OB Period',
  OBSummaryFieldII: 'OB Time In and Out',
  OBSummaryFieldIII: 'Location',
  OBSummaryFieldIV: 'Branch',
  OBSummaryFieldV: 'Reference No.',

  OTRequestFieldI: 'OT Date',
  OTRequestFieldII: 'Shift',
  OTRequestFieldIII: 'Actual OT In',
  OTRequestFieldIV: 'Actual OT Out',
  OTRequestFieldV: 'OT From',
  OTRequestFieldVI: 'OT To',

  OFFRequestFieldI: 'Offset Date',
  OFFRequestFieldII: 'Shift',
  OFFRequestFieldIII: 'Actual OS In',
  OFFRequestFieldIV: 'Actual OS Out',
  OFFRequestFieldV: 'Offset Start',
  OFFRequestFieldVI: 'Offset End',

  LVRequestFieldI: 'Leave Type',
  LVRequestFieldII: 'Available Credits',
  LVRequestFieldIII: 'Leave Option',
  LVRequestFieldIV: 'Start Date',
  LVRequestFieldV: 'End Date',

  MLRequestFieldI: 'Missed Log Date',
  MLRequestFieldII: 'Log Type',
  MLRequestFieldIII: 'Log Time',
  MLRequestFieldIV: '',

  requrestFieldReferenceNo: 'Reference No.',
  requestFieldReason: 'Reason',
  requestFieldAttachment: 'File Attachment',

  requestFieldDocumentNo: 'Document No',
  requestFieldCancellationReason: 'Cancellation Reason',
  requestFieldReviewReason: 'Review Reason',
  requestFieldApproveReason: 'Approve Reason',

  pathTabStack: 'TabStack',
  pathTabHome: 'Home',
  pathTabCalendar: 'Calendar',
  pathTabRequest: 'Request',
  pathTabProfile: 'Profile',
  pathLogin: 'Login',
  pathSelectionList: 'SelectionList',
  pathLeaveTypeList: 'LeaveTypeList',
  pathCOSRequest: 'COSRequest',
  pathOBRequest: 'OBRequest',
  pathOTRequest: 'OTRequest',
  pathOFFRequest: 'OFFRequest',
  pathLVRequest: 'LVRequest',
  pathMLRequest: 'MLRequest',
  pathCTORequest: 'CTORequest',
  pathRequestSummary: 'RequestSummary',
  pathTimesheet: 'Timesheet',
  pathTimeOff: 'TimeOff',
  pathPending: 'Pending',
  pathLoanLedger: 'LoanLedger',
  pathApprovals: 'Approvals',
  pathReviewals: 'Reviewals',
  pathTeams: 'Teams',
  pathTeamMembers: 'TeamMembers',
  pathContacts: 'Contacts',
  pathContactInformation: 'ContactInformation',
  pathNotificationDetails: 'NotificationDetails',
  pathAboutUs: 'AboutUs',
  pathClockInOut: 'ClockInOut',
  pathAttachedFile: 'AttachedFile',
  pathNotification: 'Notification',
  pathDrawer: 'Drawer',
  pathRequestDetails: 'RequestDetails',
  pathCamera: 'UseCamera',
  pathApprovalDetails: 'ApprovalsDetails',
  pathReviewalDetails: 'ReviewalsDetails',
  pathLoanDetails: 'LoanDetails',
  pathPayslipDetails: 'PayslipDetails',
  pathRequestUpdate: 'RequestUpdate',
  pathForbidden: 'Forbidden',

  // Acronym Request Applications
  COS: 'COS',
  OB: 'OB',
  OT: 'OT',
  OFF: 'OFF',
  LV: 'LV',
  ML: 'ML',
  CTO: 'CTO',
  RD: 'RD',

  // Currency
  php: 'Php ',
  currency: '₱',

  // Static
  today: 'Today',
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  from: 'From',
  to: 'To',
  all: 'All',
  review: 'Review',
  approve: 'Approve',
  batch: 'Batch',
  batchCancel: 'BatchCancel',
  batchApprove: 'BatchApprove',
  batchReview: 'BatchEndorse',
  no: 'No',
  yes: 'Yes',
  event: 'Event',
  viewAttachment: 'View Attachment',
  pinTitle: 'Pin Title',
  clockIn: 'Clock-in',
  clockOut: 'Clock-out',
  ClockIn: 'Clock In',
  ClockOut: 'Clock Out',
  file: 'File',
  none: 'None',
  time: 'Time',
  remainingBalance: 'Remaining Balance',
  cameraUpload: 'Camera/Upload',
  fileAttached: 'File Attached',
  imageFileAttached: 'Image File Attached',
  newRequest: 'New Request',
  fileAttachment: 'File Attachment',
  holiday: 'Holiday',
  logs: 'Logs',
  search: 'Search',
  workDay: 'Work Day',
  restDay: 'Rest Day',
  previous: 'Previous',
  upcoming: 'Upcoming',
  documentAttached: 'Document File Attached.',
  notice: 'Notice',
  confirmation: 'Confirmation',
  continue: 'Continue',

  filed: 'Filed',
  reviewed: 'Reviewed',
  approved: 'Approved',
  cancelled: 'Cancelled',

  toReview: 'To Review',
  toApprove: 'To Approve',
  toCancel: 'To Cancel',

  defaultSched: 'Default Schedule',
  schedAssignment: 'Schedule Assignment',
  changeOfSchedule: 'Change Of Schedule',
  officialBusiness: 'Official Business',
  compensatoryTimeOff: 'Compensatory Time Off',
  overtime: 'Overtime',
  offset: 'Offset',
  leave: 'Leave',
  missedLog: 'Missed Log',

  // Approvals Prompt - Static
  approvalsPromptTitle: 'Batch Approval Result',
  approvalsPromptSuccessTitle: (length: number) => `Success Approvals (${length})`,
  approvalsPromptFailedTitle: (length: number) => `Failed Approvals (${length})`,

  // VL Time Off - Static
  VLTitleI: 'Available Credits',
  VLRowTitleI: 'Date: ',
  VLRowTitleII: 'Document No: ',

  // OT Prompt - Static
  OTPromptColI: 'Date',
  OTPromptColII: 'Time in',
  OTPromptColIII: 'Time out',

  // Payslip - Static
  grossPay: 'Gross Pay',
  deductions: 'Deductions',
  netPay: 'Net Pay',

  // Buttons/Messages
  download: 'Download',
  save: 'Save',
  logIn: 'Log in',
  logOut: 'Log Out',
  more: 'More',
  select: 'Select',
  cancel: 'Cancel',
  success: 'Success',
  details: 'Details',
  next: 'Next',
  okay: 'Okay',
  delete: 'Delete',
  submit: 'Submit',
  filter: 'Filter',
  disabled: 'Disabled',
  loading: 'Loading...',
  undefined: 'undefined',
  update: 'update',

  // Placeholders
  placeholderFilter: 'Select to Filter',
  placeholderDocStatus: 'Select to Status',
  placeholderUsername: 'Username',
  placeholderPassword: 'Password',
  placeholderSearch: 'Search',
  placeholderDate: 'Date',
  styledPlaceholderDate: '<t>Date</t>',
  placeholderDateRange: {
    startDate: 'Select Start Date',
    endDate: 'Select End Date',
  },
  styledPlaceholderDateRange: {
    startDate: '<t>Select Start Date</t>',
    endDate: '<t>Select End Date</t>',
  },
  styledPlaceholderMissedLogDate: '<t>Select Missed Log Date</t>',
  styledPlaceholderTime: '<t>Select Time</t>',
  placeholderTimeRange: {
    startTime: 'Select Start Time',
    endTime: 'Select End Time',
  },

  placeholderLocation: 'Enter Location',
  placeholderReason: 'Enter Reason',
  placeholderReferenceNo: 'Enter Reference No.',
  placeholderTime: 'Time',
  placeholderGetLocation: 'Processing....',
  blank: '•••••••',
  dash: '----------',
  blankLine: '──────────',
  overlapMessage: "An existing COS filing is recorded for the following dates. Proceeding will overwrite the current record.",

  //required
  requiredReason: 'Reason is required',

  // Values
  sizeValue: 10000000,

  // Others
  HRDotNet: 'HRDotNet',
  alex: 'Alexis Diane Vivienne Candano',
  patrick: 'Patrick William Quintana Lofranco',
  jess: 'Jessie Cuerda',
  vin: 'Hersvin Fred Labastida',
  dane: 'Daneris Mendoza',
  emman: 'Emmanuel Villagra',

  // - About Us
  designedBy: 'Designed by',
  developedBy: 'Developed by',
  aboutTheCompany: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam gravida eleifend ante non venenatis. Sed et laoreet libero. Sed consequat dui a quam malesuada facilisis. Aenean eget dictum odio. Mauris eu massa ut nunc vehicula porttitor vitae eget turpis. Nunc imperdiet elit ipsum, in sagittis turpis imperdiet sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

    In scelerisque egestas urna et lobortis. Proin erat risus, aliquam in dignissim sit amet, posuere nec velit. In pharetra ligula ligula, vitae suscipit ante blandit eu. Curabitur sed est pulvinar, placerat ligula sed, lacinia augue. Curabitur volutpat cursus dui at fermentum.`,

  // Notes
  slideLoad: 'Slide Load',
  slideClock: (text: string) => `Slide to ${text}`,
  fetchLocation: 'Fetching your location.',
  noEvent: 'No agenda or event',
  noEventsDisplay: 'No events to display.',
  noAgenda: 'No agenda for this day.',
  noAddressLocation: 'No address found.',
  noFileAttached: 'No File Attached',
  noSchedule: 'No Schedule',
  noLogs: 'No logs to display.',
  noBranch: 'No Branch',
  nothingFound: 'Nothing found',
  sessionExpired: 'End of Session, Please log-in again.',
  selectDateNote: 'Tap a certain date to display.',
  loginFooter: `Powered by ${'\n'} Intellismart Technology Inc.`,
  requestSummary: 'Please review your details below before submitting.',
  fileNote:
    'Note: Maximum upload file size is limited to 25 MB. Accepted file types: doc, docx, jpg, jpeg, png, txt, and pdf.',
  UseCameraNote: 'Permission to access camera roll is required, Please enable it',
  successPdf: 'PDF Payslip is done rendered.',
  OTPromptNote: '<b>Select the date</b> for which you want to submit an overtime request.',
  endListNote: 'You reached the end.',
  lostFileAttachment: 'The file attachment for this application was not found.',
  documentNote: 'This attachment is a document file.',
  cancellation: 'THIS DOCUMENT IS CANCELLED BY',
  geoPattern: 'U2FsdGVkX1+bk1A634FvhHo2WebCEdehGv3K3UTSbSApglAG2BFiwY9sClfOMEoDd95JH4yIX15PKrUCAfXmcw==',
  approvalsPromptNote: (action: number) =>
    ` are selected for <sm_u>${action === PromptAction.Cancel ? 'cancellation' : 'approval'}</sm_u>`,
  reviewalsPrompNote: (action: number) =>
    ` are selected for <sm_u>${action === PromptAction.Cancel ? 'cancellation' : 'reviewal'}</sm_u>`,
  clockedStatus: (value: number, date: string, time: string) =>
    `${value === 1 ? 'Clocked In' : 'Clocked Out'}: ${DateTimeUtils.dateDefaultToWord(date)} at ${DateTimeUtils.timeSecondsToUnits(time)}`,

  // String Components Values

  successClocked: (status: string, address: string) =>
    `You have successfully <b>${status}</b> from${'\n'} <b>${address}</b>`,

  OTPromptNoLogs: (value: string, text: string) =>
    `The system found no logs that are open for an overtime request in the ` +
    `<b><u>${value} half</u></b> of <b><u>${text}</u></b>`,

  OTPromptHaveLogs: (value: string, text: string) =>
    `The system detected the following overtime hours on the ensuing dates for the ` +
    `<b><u>${value} half</u></b> of <b><u>${text}</u></b>`,

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

  styledDisabled: `<t></t>`,
  tapSelectPlaceholder: (text: string) => `<t>Select ${text}</t>`,
  requestSuccess: (title: string, date: string, reqAction?: number, documentNo?: string) =>
    `<b><u>${title}</u></b> request ` +
    `${STRINGS.getRequestReference(reqAction, date, documentNo)}` +
    `was successfully ${STRINGS.getRequestActionMessage(reqAction)}`,

  requestCancellation: (params: SchemaRequestApplications, state: any) => `${state.reason}`,

  successSingleApprovals: (action: number, value: string) =>
    `You have successfully ` +
    `<b><u>${action === PromptAction.Cancel ? 'canceled.' : 'approved.'}</u></b>` +
    `\n<b>(${value})</b>`,

  successSingleReviewals: (action: number, value: string) =>
    `You have successfully ` +
    `<b><u>${action === PromptAction.Cancel ? 'canceled.' : 'reviewed.'}</u></b>` +
    `\n<b>(${value})</b>`,

  successApprovals: (action: number, count: number) =>
    `You have successfully ` +
    `<b><u>${action === 0 ? 'canceled.' : 'approved.'}</u></b>` +
    `\n<b>${count} request${count > 1 ? 's' : ''}.</b>`,

  successReviewals: (action: number, count: number) =>
    `You have successfully ` +
    `<b><u>${action === 0 ? 'canceled.' : 'reviewed.'}</u></b>` +
    `\n<b>${count} request${count > 1 ? 's' : ''}.</b>`,

  confirmationSelectionApproval: (count: number, request: string, action: TypeHandle['isAction']) =>
    `<b><u>${count?.toString() + ' ' + request}</u></b> ${STRINGS.approvalsPromptNote(action as number)}`,
  confirmationSelectionReviewal: (count: number, request: string, action: TypeHandle['isAction']) =>
    `<b><u>${count?.toString() + ' ' + request}</u></b> ${STRINGS.reviewalsPrompNote(action as number)}`,

  pendingTitleFilter: (index: number) => {
    switch (index) {
      case 1:
        return "Application Type";
      case 2:
        return "Transaction Date";
      case 3:
        return "Document No";
      case 4:
        return "Work Date";
      default:
        return "";
    }
  },

  pendingValueFilter: (value: string) => {
    switch (value) {
      case "OB":
        return "Official Business";
      case "COS":
        return "Change of Schedule";
      case "LV":
        return "Leave";
      case "ML":
        return "Missed Log";
      case "OT":
        return "Overtime";
      case "OFF":
        return "Offset";
      default:
        return value;
    }
  }

};
