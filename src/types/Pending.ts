/**
 * @project      HRDotNet-Mobile
 * @description  Pending types, const and interface are listed here
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-30-2024
 */

//--- Initial Values
export type PendingStates = {
  search: string;
  selectedButton: Array<{ title: string }>;
  selectedButtonIndex: number;
  searchFilterIndex: number;
  filterText: string;
  filterLabel?: string;
  data: PendingData;
  page: number;
  count: number;
  badgeCount: number | null;
  pendingApplications: PendingApplications[];
  fromDate: string;
  toDate: string;
};

export type PendingData = {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  pendingApplications: PendingApplications;
  totalCount: number;
};

export type PendingApplications = {
  [x: string]: any;
  applicationType: string;
  dateRange: DateRange;
  timeRange?: TimeRange;
  dateTransaction: string;
  documentNo: string;
  filingStatus: FilingStatus;
};
//--- Children Types
type FilingStatus = { id: number; name: string };
type DateRange = { dateFrom: string; dateTo: string };
type TimeRange = { timeIn: string; timeOut: string };

//--- Initial Values
const FilingStatusI: FilingStatus = { id: 0, name: '' };
const DateRangeI: DateRange = { dateFrom: '', dateTo: '' };
const TimeRangeI: TimeRange = { timeIn: '', timeOut: '' };

const PendingApplicationsI: PendingApplications = {
  applicationType: '',
  dateRange: DateRangeI,
  timeRange: TimeRangeI,
  dateTransaction: '',
  documentNo: '',
  filingStatus: FilingStatusI,
};

const PendingDataI: PendingData = {
  id: 0,
  code: '',
  name: '',
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  pendingApplications: PendingApplicationsI,
  totalCount: 0,
};

export type PendingHandles = {
  isLoading: boolean;
  isRefresh: boolean;
  isLoadMore: boolean;
  isVisible: boolean;
};

export const PendingValues = {
  State: {
    search: '',
    selectedButton: [{ title: 'Filed' }, { title: 'Reviewed' }],
    selectedButtonIndex: 0,
    searchFilterIndex: 0,
    filterText: '',
    data: PendingDataI,
    page: 1,
    count: 0,
    badgeCount: 0,
    pendingApplications: [PendingApplicationsI],
    fromDate: '',
    toDate: '',
  } satisfies PendingStates,
  Handle: {
    isLoading: true,
    isRefresh: false,
    isLoadMore: false,
    isVisible: false,
  } satisfies PendingHandles,
};

export enum DocStatus {
  Filed = 1,
  Approved = 2,
  Cancelled = 3,
  Reviewed = 4,
}
