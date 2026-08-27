import { SchemaRequestApplications } from 'src/types/Types';
import { create } from 'zustand';

interface GlobalInterface {
  employeeName: string;
  setEmployeeName: (employeeName: string) => void;

  cutOffPeriod: [string | null, string | null];
  setCutoffPeriod: (cutoffPeriod: [string | null, string | null]) => void;

  approvalCounts: Record<number, SchemaRequestApplications[]>;
  setApprovalCounts: (counts: Record<number, SchemaRequestApplications[]>) => void;

  reviewalCounts: Record<number, SchemaRequestApplications[]>;
  setReviewalCounts: (counts: Record<number, SchemaRequestApplications[]>) => void;

  cancelActionFrom: string;
  setCancelActionFrom: (cancelActionFrom: string) => void;

  selectedApplicationTab: number;
  setSelectedApplicationTab: (selectedApplicationTab: number) => void;

  resetCancelAction: () => void;
  resetSelectedApplicationTab: () => void;
}

export const useGlobalStore = create<GlobalInterface>((set, get) => ({
  employeeName: '',
  setEmployeeName: (employeeName: string) => set({ employeeName }),

  cutOffPeriod: [null, null] as [string | null, string | null],
  setCutoffPeriod: (cutOffPeriod: [string | null, string | null]) => set({ cutOffPeriod }),

  approvalCounts: {},
  setApprovalCounts: (counts) => set({ approvalCounts: counts }),

  reviewalCounts: {},
  setReviewalCounts: (counts) => set({ reviewalCounts: counts }),

  cancelActionFrom: "",
  setCancelActionFrom: (cancelActionFrom) => set({ cancelActionFrom }),

  selectedApplicationTab: 0,
  setSelectedApplicationTab: (selectedApplicationTab) => set({ selectedApplicationTab }),

  resetCancelAction: () => {
    set({ cancelActionFrom: '' });
  },

  resetSelectedApplicationTab: () => {
    set({ selectedApplicationTab: 0 });
  }

}));
