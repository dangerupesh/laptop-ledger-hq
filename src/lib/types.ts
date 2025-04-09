
export interface Laptop {
  id: string;
  serialNumber: string;
  model: string;
  brand: string;
  purchaseDate: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    displaySize: string;
  };
  status: "available" | "assigned" | "maintenance";
  assignedTo?: string;
  notes?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  assignedLaptops: string[];
  hireDate: string;
}

export interface DashboardStats {
  totalLaptops: number;
  availableLaptops: number;
  assignedLaptops: number;
  maintenanceLaptops: number;
  totalEmployees: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: "assignment" | "return" | "maintenance" | "purchase";
  description: string;
  date: string;
  laptopId?: string;
  employeeId?: string;
}
