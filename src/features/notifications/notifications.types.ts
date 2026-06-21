export type Notification = {
    id: string;
    userId: string;
    type: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
  };
  
  export type UnreadCountResponse = {
    count: number;
  };