export interface Employee {
  employeeId: string;
  name: string;
  department: string;
  status: string;
  checkIn: string | null;
  checkOut: string | null;
  attendance: number;
  avgHours: string;
  account: string;
}