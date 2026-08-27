//-- Approvals Filing Enums

export enum FilingPanel {
  COS = 0,
  OB = 1,
  OT = 2,
  OFF = 3,
  LV = 4,
  ML = 5,
  CTO = 6,
}

export enum ValidateError {
  IsUndefined = 'undefined',
  IsZero = 0,
  IsEmpty = '',
}

export enum FilingAbbreviations {
  COS = 'Change of Schedules',
  OB = 'Official Business',
  OT = 'Overtime',
  OFF = 'Offset',
  LV = 'Leave',
  ML = 'Missed Log',
}

export enum StorageToken {
  Refresh = 'RT',
  Auth = 'AT',
}

export enum Others {
  CODE = 'code',
}

export enum CancelActionFrom {
  Review = 'Review',
  Approve = 'Approve'
}

type FieldLabelsType = {
  [key: number]: {
    [key: string]: string;
  };
};

export const FieldLabels: FieldLabelsType = {
  0: {
    requested: 'Schedule',
    attachment: 'File Attachment',
  },
  1: {
    OBDateFrom: 'OB Date From',
    OBDateTo: 'OB Date To',
    location: 'Location',
    branch: 'Branch',
    OBTimeIn: 'OB Time In',
    OBTimeOut: 'OB Time Out',
    reason: 'Reason',
    attachment: 'File Attachment',
    documentNo: 'Document No',
  },
  2: {
    date: 'OT Date',
    reqTimeIn: 'OT From',
    reqTimeOut: 'OT To',
    attachment: 'File Attachment',
  },
  3: {
    date: 'Offset Date',
    reqTimeIn: 'Offset Start',
    reqTimeOut: 'Offset End',
    attachment: 'File Attachment',
  },
  5: {
    dateFiled: 'Missed Log Date',
    attachment: 'File Attachment',
  },
};

// Define an enum for the request types
export enum RequestType {
  COS = 0,
  OB = 1,
  OT = 2,
  OFFSET = 3,
  LEAVE = 4,
  MISSED_LOG = 5,
}

// Define the required fields for each request type
export const RequiredFieldRequest: Record<RequestType, string[]> = {
  [RequestType.COS]: ['startDate', 'endDate', 'requested', 'reason', 'attachment'], // cos
  [RequestType.OB]: ['OBDateFrom', 'OBDateTo', 'location', 'OBTimeIn', 'OBTimeOut', 'reason', 'attachment'], // ob
  [RequestType.OT]: ['date', 'reqTimeOut', 'reason', 'OBTimeIn', 'OBTimeOut', 'reason', 'attachment'], // ot
  [RequestType.OFFSET]: ['date', 'reqTimeIn', 'reqTimeOut', 'reason', 'attachment'], // offset
  [RequestType.LEAVE]: ['leaveType', 'leaveOption', 'startDate', 'endDate', 'reason', 'attachment'], // leave
  [RequestType.MISSED_LOG]: ['dateFiled', 'logType', 'attachment'], // missed log
};
