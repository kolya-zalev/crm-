export type StuckLead = {
  id: string;
  name: string;
  company: string;
  status: string;
  daysStuck: number;
};

export type ClosedByUserRow = {
  userId: string;
  userName: string;
  won: number;
  lost: number;
  total: number;
};

export type Analytics = {
  totals: {
    open: number;
    won: number;
    lost: number;
    closed: number;
    winRate: number;
  };
  stuck: {
    thresholdDays: number;
    byStatus: {
      new: number;
      contacted: number;
      qualified: number;
    };
    leads: StuckLead[];
  };
  closedBy: ClosedByUserRow[];
  closedBeforeTracking: number;
};
