import type { FirmData } from '../types';

export function buildVendorOversightPrompt(firm: FirmData): string {
  return `Generate comprehensive SERVICE PROVIDER OVERSIGHT POLICIES for the following firm:

FIRM DETAILS:
- Legal Name: ${firm.legalName}
- State: ${firm.stateOfRegistration}
- AUM: ${firm.aumRange}
- Employees: ${firm.numberOfEmployees}

KEY PERSONNEL:
- Chief Compliance Officer: ${firm.ccoName} (${firm.ccoEmail})
- IT Contact: ${firm.itContactName || 'Not designated (CCO handles vendor oversight)'}

CUSTODIANS:
- Primary: ${firm.primaryCustodian}
${firm.otherCustodians?.length ? `- Others: ${firm.otherCustodians.join(', ')}` : ''}

CUSTOMER DATA TYPES THE FIRM HOLDS:
${firm.piiTypes.map((t) => `- ${t}`).join('\n')}

CURRENT SERVICE PROVIDERS:
${firm.serviceProviders.map((p) => `- ${p.name} (${p.serviceType}${p.description ? ': ' + p.description : ''})`).join('\n')}

REQUIRED SECTIONS:
1. Purpose and Scope: Regulatory basis (amended Rule 248.30), applicability to all service providers with access to customer information
2. Service Provider Inventory: Create a comprehensive inventory table format using the providers listed above. Include: provider name, service type, data access level, contract status, last review date
3. Initial Due Diligence Requirements: What to evaluate before engaging a new provider (security posture, SOC 2 reports, insurance, financial stability, references)
4. Contractual Requirements: Required contract provisions including:
   - 72-hour incident notification clause
   - Audit rights
   - Data handling and encryption standards
   - Subcontractor restrictions
   - Termination and data return provisions
   - Confidentiality obligations
   - Compliance with applicable regulations
5. Risk Assessment: How to classify providers by risk level (Critical/High/Medium/Low), criteria based on data access, service criticality
6. Ongoing Monitoring: Annual review procedures, performance monitoring, SOC report reviews, security questionnaires
7. Incident Notification: The 72-hour notification requirement under amended Reg S-P, what must be reported, internal escalation when a provider reports an incident
8. Termination and Transition: Procedures for offboarding a provider, data return/destruction verification, transition planning
9. Documentation and Recordkeeping: What records to maintain, 5-year retention, file structure
10. Roles and Responsibilities: Who manages vendor relationships, who conducts reviews, approval authority for new vendors
11. Policy Review: Annual review schedule, triggers for off-cycle updates

Make the document practical for a small firm. Include specific references to the firm's actual service providers throughout. The vendor inventory should be pre-populated with the providers listed above.`;
}
