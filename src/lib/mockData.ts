
import { Laptop, Employee, Activity, DashboardStats } from "./types";
import { v4 as uuidv4 } from "uuid";

// Mock Laptops
export const mockLaptops: Laptop[] = [
  {
    id: uuidv4(),
    serialNumber: "DL-XPS-2023-001",
    model: "XPS 15",
    brand: "Dell",
    purchaseDate: "2023-06-15",
    specs: {
      cpu: "Intel Core i7-12700H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      displaySize: "15.6 inch",
    },
    status: "assigned",
    assignedTo: "emp-001",
    notes: "Executive laptop with premium specs",
  },
  {
    id: uuidv4(),
    serialNumber: "HP-ELITE-2023-002",
    model: "EliteBook 840",
    brand: "HP",
    purchaseDate: "2023-08-10",
    specs: {
      cpu: "Intel Core i5-1240P",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      displaySize: "14 inch",
    },
    status: "available",
    notes: "Standard issue laptop for general staff",
  },
  {
    id: uuidv4(),
    serialNumber: "LN-T14-2022-003",
    model: "ThinkPad T14",
    brand: "Lenovo",
    purchaseDate: "2022-11-05",
    specs: {
      cpu: "AMD Ryzen 7 PRO",
      ram: "16GB DDR4",
      storage: "1TB SSD",
      displaySize: "14 inch",
    },
    status: "maintenance",
    notes: "Battery replacement needed",
  },
  {
    id: uuidv4(),
    serialNumber: "AP-MB-2023-004",
    model: "MacBook Pro",
    brand: "Apple",
    purchaseDate: "2023-03-20",
    specs: {
      cpu: "Apple M2 Pro",
      ram: "16GB",
      storage: "512GB SSD",
      displaySize: "14 inch",
    },
    status: "assigned",
    assignedTo: "emp-002",
    notes: "Design team laptop",
  },
  {
    id: uuidv4(),
    serialNumber: "MS-SB-2023-005",
    model: "Surface Book 3",
    brand: "Microsoft",
    purchaseDate: "2023-01-15",
    specs: {
      cpu: "Intel Core i7-1065G7",
      ram: "32GB DDR4",
      storage: "1TB SSD",
      displaySize: "13.5 inch",
    },
    status: "available",
    notes: "Convertible laptop for sales team",
  },
];

// Mock Employees
export const mockEmployees: Employee[] = [
  {
    id: "emp-001",
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    department: "Executive",
    position: "CTO",
    assignedLaptops: [mockLaptops[0].id],
    hireDate: "2020-03-15",
  },
  {
    id: "emp-002",
    name: "Sam Williams",
    email: "sam.williams@company.com",
    department: "Design",
    position: "Lead Designer",
    assignedLaptops: [mockLaptops[3].id],
    hireDate: "2021-06-10",
  },
  {
    id: "emp-003",
    name: "Taylor Smith",
    email: "taylor.smith@company.com",
    department: "Engineering",
    position: "Senior Developer",
    assignedLaptops: [],
    hireDate: "2022-01-20",
  },
  {
    id: "emp-004",
    name: "Jordan Lee",
    email: "jordan.lee@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    assignedLaptops: [],
    hireDate: "2021-11-05",
  },
  {
    id: "emp-005",
    name: "Casey Brown",
    email: "casey.brown@company.com",
    department: "Sales",
    position: "Account Executive",
    assignedLaptops: [],
    hireDate: "2022-08-15",
  },
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: uuidv4(),
    type: "assignment",
    description: "Dell XPS 15 assigned to Alex Johnson",
    date: "2023-06-20",
    laptopId: mockLaptops[0].id,
    employeeId: "emp-001",
  },
  {
    id: uuidv4(),
    type: "assignment",
    description: "MacBook Pro assigned to Sam Williams",
    date: "2023-04-05",
    laptopId: mockLaptops[3].id,
    employeeId: "emp-002",
  },
  {
    id: uuidv4(),
    type: "maintenance",
    description: "ThinkPad T14 sent for battery replacement",
    date: "2023-09-10",
    laptopId: mockLaptops[2].id,
  },
  {
    id: uuidv4(),
    type: "purchase",
    description: "5 new HP EliteBook 840 laptops purchased",
    date: "2023-08-12",
  },
  {
    id: uuidv4(),
    type: "return",
    description: "Surface Book 3 returned by former employee",
    date: "2023-07-30",
    laptopId: mockLaptops[4].id,
  },
];

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalLaptops: mockLaptops.length,
  availableLaptops: mockLaptops.filter(l => l.status === "available").length,
  assignedLaptops: mockLaptops.filter(l => l.status === "assigned").length,
  maintenanceLaptops: mockLaptops.filter(l => l.status === "maintenance").length,
  totalEmployees: mockEmployees.length,
  recentActivities: mockActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5),
};
