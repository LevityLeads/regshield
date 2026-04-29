export interface FirmData {
  // Step 1: Firm Basics
  legalName: string;
  secRegistrationNumber?: string;
  crdNumber?: string;
  stateOfRegistration: string;
  aumRange: '<100m' | '100m-500m' | '500m-1b' | '1b-1.5b';
  numberOfEmployees: number;
  firmAddress: string;
  firmPhone: string;
  firmWebsite?: string;

  // Step 2: Key Personnel
  ccoName: string;
  ccoEmail: string;
  ccoPhone: string;
  itContactName?: string;
  itContactEmail?: string;

  // Step 3: Data & Custodians
  primaryCustodian: string;
  otherCustodians?: string[];
  piiTypes: string[];

  // Step 4: Service Providers
  serviceProviders: ServiceProvider[];
}

export interface ServiceProvider {
  name: string;
  serviceType: string;
  description?: string;
}

export type DocumentType =
  | 'incident-response'
  | 'vendor-oversight'
  | 'breach-notification'
  | 'recordkeeping';

export interface DocumentSection {
  title: string;
  content: string;
  subsections?: DocumentSection[];
}

export interface GeneratedDocument {
  id: string;
  sessionId: string;
  docType: DocumentType;
  sections: DocumentSection[];
  generatedAt: string;
}

export interface Session {
  id: string;
  firmData: FirmData;
  email: string;
  paid: boolean;
  paidAt?: string;
  createdAt: string;
}

export const DOC_TYPE_LABELS: Record<DocumentType, string> = {
  'incident-response': 'Incident Response Program',
  'vendor-oversight': 'Service Provider Oversight Policies',
  'breach-notification': 'Breach Notification Templates',
  'recordkeeping': 'Recordkeeping Procedures',
};

export const DOC_TYPE_DESCRIPTIONS: Record<DocumentType, string> = {
  'incident-response':
    'Comprehensive program for detecting, responding to, and recovering from security incidents affecting customer data.',
  'vendor-oversight':
    'Policies for evaluating, monitoring, and managing third-party service providers who access customer information.',
  'breach-notification':
    'Ready-to-use templates for notifying affected customers, the SEC, and service providers within required timeframes.',
  'recordkeeping':
    'Procedures for maintaining, storing, and retaining all records related to your privacy and security program.',
};

export const AUM_LABELS: Record<string, string> = {
  '<100m': 'Under $100M',
  '100m-500m': '$100M - $500M',
  '500m-1b': '$500M - $1B',
  '1b-1.5b': '$1B - $1.5B',
};

export const CUSTODIANS = [
  'Charles Schwab',
  'Fidelity',
  'Pershing',
  'TD Ameritrade',
  'Interactive Brokers',
  'LPL Financial',
  'Raymond James',
  'Other',
] as const;

export const PII_TYPES = [
  'Social Security Numbers',
  'Account Numbers',
  'Tax Records',
  'Bank Account Information',
  'Date of Birth',
  'Investment Portfolios',
  'Financial Plans',
  'Email Addresses',
  'Phone Numbers',
  'Physical Addresses',
] as const;

export const SERVICE_TYPES = [
  'Portfolio Management Software',
  'CRM',
  'Financial Planning',
  'Cybersecurity',
  'Cloud / IT Infrastructure',
  'Compliance Software',
  'Email / Communication',
  'Data Analytics',
  'Custodial Services',
  'Other',
] as const;

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
] as const;
