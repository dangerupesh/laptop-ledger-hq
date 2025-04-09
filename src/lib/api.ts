
import { mockLaptops, mockEmployees, mockActivities, mockDashboardStats } from "./mockData";
import { Laptop, Employee, Activity, DashboardStats } from "./types";
import { v4 as uuidv4 } from "uuid";

// Mock API Services
// In a real application, these would be API calls to your Flask backend

// Dashboard
export const getDashboardStats = (): Promise<DashboardStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardStats);
    }, 500);
  });
};

// Laptops
export const getLaptops = (): Promise<Laptop[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockLaptops]);
    }, 500);
  });
};

export const getLaptopById = (id: string): Promise<Laptop | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const laptop = mockLaptops.find(l => l.id === id);
      resolve(laptop ? {...laptop} : undefined);
    }, 300);
  });
};

export const createLaptop = (laptop: Omit<Laptop, "id">): Promise<Laptop> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newLaptop = {
        id: uuidv4(),
        ...laptop
      };
      mockLaptops.push(newLaptop);
      resolve(newLaptop);
    }, 500);
  });
};

export const updateLaptop = (id: string, updates: Partial<Laptop>): Promise<Laptop | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockLaptops.findIndex(l => l.id === id);
      if (index !== -1) {
        mockLaptops[index] = { ...mockLaptops[index], ...updates };
        resolve(mockLaptops[index]);
      } else {
        resolve(undefined);
      }
    }, 500);
  });
};

export const deleteLaptop = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockLaptops.findIndex(l => l.id === id);
      if (index !== -1) {
        mockLaptops.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

// Employees
export const getEmployees = (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockEmployees]);
    }, 500);
  });
};

export const getEmployeeById = (id: string): Promise<Employee | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employee = mockEmployees.find(e => e.id === id);
      resolve(employee ? {...employee} : undefined);
    }, 300);
  });
};

export const createEmployee = (employee: Omit<Employee, "id">): Promise<Employee> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = `emp-${mockEmployees.length.toString().padStart(3, '0')}`;
      const newEmployee = {
        id: newId,
        ...employee
      };
      mockEmployees.push(newEmployee);
      resolve(newEmployee);
    }, 500);
  });
};

export const updateEmployee = (id: string, updates: Partial<Employee>): Promise<Employee | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockEmployees.findIndex(e => e.id === id);
      if (index !== -1) {
        mockEmployees[index] = { ...mockEmployees[index], ...updates };
        resolve(mockEmployees[index]);
      } else {
        resolve(undefined);
      }
    }, 500);
  });
};

export const deleteEmployee = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockEmployees.findIndex(e => e.id === id);
      if (index !== -1) {
        mockEmployees.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

// Assignment
export const assignLaptop = (laptopId: string, employeeId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find laptop and employee
      const laptopIndex = mockLaptops.findIndex(l => l.id === laptopId);
      const employeeIndex = mockEmployees.findIndex(e => e.id === employeeId);
      
      if (laptopIndex === -1 || employeeIndex === -1) {
        resolve(false);
        return;
      }
      
      // Update laptop
      mockLaptops[laptopIndex].status = "assigned";
      mockLaptops[laptopIndex].assignedTo = employeeId;
      
      // Update employee
      if (!mockEmployees[employeeIndex].assignedLaptops.includes(laptopId)) {
        mockEmployees[employeeIndex].assignedLaptops.push(laptopId);
      }
      
      // Create activity
      const newActivity: Activity = {
        id: uuidv4(),
        type: "assignment",
        description: `${mockLaptops[laptopIndex].brand} ${mockLaptops[laptopIndex].model} assigned to ${mockEmployees[employeeIndex].name}`,
        date: new Date().toISOString().split('T')[0],
        laptopId,
        employeeId
      };
      
      mockActivities.unshift(newActivity);
      resolve(true);
    }, 500);
  });
};

export const returnLaptop = (laptopId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find laptop
      const laptopIndex = mockLaptops.findIndex(l => l.id === laptopId);
      
      if (laptopIndex === -1 || !mockLaptops[laptopIndex].assignedTo) {
        resolve(false);
        return;
      }
      
      // Find employee
      const employeeId = mockLaptops[laptopIndex].assignedTo as string;
      const employeeIndex = mockEmployees.findIndex(e => e.id === employeeId);
      
      // Update laptop
      mockLaptops[laptopIndex].status = "available";
      mockLaptops[laptopIndex].assignedTo = undefined;
      
      // Update employee
      if (employeeIndex !== -1) {
        mockEmployees[employeeIndex].assignedLaptops = 
          mockEmployees[employeeIndex].assignedLaptops.filter(id => id !== laptopId);
      }
      
      // Create activity
      const newActivity: Activity = {
        id: uuidv4(),
        type: "return",
        description: `${mockLaptops[laptopIndex].brand} ${mockLaptops[laptopIndex].model} returned`,
        date: new Date().toISOString().split('T')[0],
        laptopId
      };
      
      mockActivities.unshift(newActivity);
      resolve(true);
    }, 500);
  });
};

// Activities
export const getActivities = (limit?: number): Promise<Activity[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedActivities = [...mockActivities].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      resolve(limit ? sortedActivities.slice(0, limit) : sortedActivities);
    }, 300);
  });
};
