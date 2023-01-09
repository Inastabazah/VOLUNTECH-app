export interface Activity {
  key?: string;
  name?: string;
  description?: string;
  requiredskills?: string;
  startDate: string
  endDate?: string;
  numberOfTechnologists?: number | null;
  attachments?: string | null;
  skills?: string;
  purpose?: string;
  volunteerwork?: string;
  userId?: string;
  type?:string
}
