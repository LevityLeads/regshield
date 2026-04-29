import type { FirmData } from '../types';

export function buildRecordkeepingPrompt(firm: FirmData): string {
  return `Generate comprehensive RECORDKEEPING PROCEDURES for the following firm:

FIRM DETAILS:
- Legal Name: ${firm.legalName}
- SEC Registration: ${firm.secRegistrationNumber || 'Not provided'}
- State: ${firm.stateOfRegistration}
- AUM: ${firm.aumRange}
- Employees: ${firm.numberOfEmployees}

KEY PERSONNEL:
- Chief Compliance Officer: ${firm.ccoName} (${firm.ccoEmail})
- IT Contact: ${firm.itContactName || 'Not designated (CCO manages records)'}

CUSTOMER DATA TYPES THE FIRM HOLDS:
${firm.piiTypes.map((t) => `- ${t}`).join('\n')}

SERVICE PROVIDERS:
${firm.serviceProviders.map((p) => `- ${p.name} (${p.serviceType})`).join('\n')}

REQUIRED SECTIONS:
1. Purpose and Scope: Regulatory basis under amended Rule 248.30, recordkeeping requirements for privacy and security program documentation
2. Types of Records to Maintain: Comprehensive list including:
   - Written privacy policies and procedures (all versions)
   - Incident response plans (all versions)
   - Service provider oversight policies (all versions)
   - Incident logs and reports
   - Breach notification determinations (both to notify and not to notify)
   - Customer notification records
   - Service provider due diligence files
   - Service provider contracts with privacy provisions
   - Training records and materials
   - Risk assessments
   - Audit and testing results
   - Policy review and approval documentation
3. Incident Log Format: Provide a detailed template table format for logging all security incidents, including:
   - Incident ID (sequential)
   - Date discovered
   - Date reported
   - Description
   - Severity classification
   - Systems/data affected
   - Number of affected individuals
   - Response actions taken
   - Notification determination (required/not required with rationale)
   - Notification date (if applicable)
   - Resolution date
   - Lessons learned
   - Reviewer name and date
4. Determination Documentation: Template for documenting the determination of whether customer notification is or is not required. Must include:
   - Incident summary
   - Analysis of whether unauthorized access could result in substantial harm
   - Types of data involved
   - Number of affected individuals
   - Decision (notify / do not notify)
   - Rationale for decision
   - Approver signature line for CCO (${firm.ccoName})
5. Retention Schedule: Minimum 5-year retention from the date of creation or last use, whichever is later. Detailed schedule by record type.
6. Storage and Security: Where records are stored, access controls, encryption requirements, backup procedures
7. Access Controls: Who can access which records, approval for access, logging of access
8. Record Destruction: Procedures for secure destruction after retention period expires, destruction log format
9. Annual Review Process: Schedule for reviewing records completeness, reconciliation with incident logs, policy version control
10. Roles and Responsibilities: ${firm.ccoName} as primary records custodian, delegation procedures

Make the document practical for a ${firm.numberOfEmployees}-person firm. Include actual templates and formats that can be used immediately.`;
}
