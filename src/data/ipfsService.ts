const CID = 'QmSzk7rL2vzT1nA1wGFqDuZGpWk1emF4Sos3V3Zq9WFcAh';

export interface Department {
  name: string;
  budget: number;
  color: string;
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  budget: number;
  totalBudget: number;
  allocatedFunds: number;
  stages: Stage[];
}

export interface Stage {
  id: string;
  name: string;
  amount: number;
  spent: number;
  subStages?: Stage[];
}

export interface GovernmentData {
  departments: Department[];
  totalBudget: number;
}

async function fetchIPFSData(): Promise<GovernmentData> {
  try {
    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${CID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: GovernmentData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from IPFS:', error);
    throw error;
  }
}

export async function fetchAllData(): Promise<GovernmentData> {
  return await fetchIPFSData();
}

// Cache to avoid multiple fetches
let cachedData: GovernmentData | null = null;

async function getCachedData(): Promise<GovernmentData> {
  if (!cachedData) {
    cachedData = await fetchIPFSData();
  }
  return cachedData;
}

export async function fetchDepartmentData(departmentName: string): Promise<Department> {
  const data = await getCachedData();
  const department = data.departments.find(dept => dept.name === departmentName);
  if (!department) {
    throw new Error('Department not found');
  }
  return department;
}

export async function fetchProjectData(projectName: string): Promise<Project> {
  const data = await getCachedData();
  const project = data.departments
    .flatMap(dept => dept.projects)
    .find(proj => proj.name === projectName);
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
}



export const addBudget = async (amount: number): Promise<void> => {
  // Implement the logic to add budget to IPFS
  // This might involve fetching the current data, updating it, and then saving it back to IPFS
};

export const addDepartment = async (department: Department): Promise<void> => {
  // Implement the logic to add a new department to IPFS
  // This might involve fetching the current data, adding the new department, and then saving it back to IPFS
};