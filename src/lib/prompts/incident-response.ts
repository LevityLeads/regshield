import type { FirmData } from '../types';

export function buildIncidentResponsePrompt(firm: FirmData): string {
  return `Generate a comprehensive INCIDENT RESPONSE PROGRAM for the following firm:

FIRM DETAILS:
- Legal Name: ${firm.legalName}
- SEC Registration: ${firm.secRegistrationNumber || 'Not provided'}
- CRD Number: ${firm.crdNumber || 'Not provided'}
- State: ${firm.stateOfRegistration}
- AUM: ${firm.aumRange}
- Employees: ${firm.numberOfEmployees}
- Address: ${firm.firmAddress}
- Phone: ${firm.firmPhone}

KEY PERSONNEL:
- Chief Compliance Officer: ${firm.ccoName} (${firm.ccoEmail}, ${firm.ccoPhone})
- IT Contact: ${firm.itContactName || 'Not designated (CCO handles IT security)'}

CUSTODIANS:
- Primary: ${firm.primaryCustodian}
${firm.otherCustodians?.length ? `- Others: ${firm.otherCustodians.join(', ')}` : ''}

CUSTOMER DATA TYPES HELD:
${firm.piiTypes.map((t) => `- ${t}`).join('\n')}

SERVICE PROVIDERS:
${firm.serviceProviders.map((p) => `- ${p.name} (${p.serviceType}${p.description ? ': ' + p.description : ''})`).join('\n')}

REQUIRED SECTIONS:
1. Purpose and Scope: Why this program exists, what it covers, regulatory basis (Rule 248.30(b))
2. Definitions: Security incident, data breach, unauthorized access, covered information, affected individual
3. Incident Response Team: Roles and responsibilities, using the actual personnel listed above. If no IT contact, CCO leads both compliance and technical response
4. Detection and Reporting: How incidents are identified, internal reporting chain, 24-hour initial assessment requirement
5. Assessment and Classification: Severity levels (Critical/High/Medium/Low), criteria for each, escalation triggers
6. Containment and Eradication: Immediate containment steps, evidence preservation, system isolation procedures
7. Investigation: Root cause analysis, scope determination, identifying affected records and individuals
8. Customer Notification: 30-calendar-day requirement under amended Reg S-P, notification content requirements, delivery methods
9. Recovery and Restoration: System restoration, monitoring for recurrence, return-to-normal procedures
10. Post-Incident Review: Lessons learned, policy updates, documentation requirements
11. Service Provider Notification: 72-hour notification requirement for service providers experiencing incidents
12. Testing and Training: Annual tabletop exercises, staff training requirements, testing schedule
13. Recordkeeping: Minimum 5-year retention, what records to maintain, storage requirements
14. Policy Review: Annual review schedule, update triggers, approval process

Make the document comprehensive (10-15 pages when printed) and specific to this firm. Reference actual personnel by name in responsibilities. Reference actual custodians and service providers where relevant.`;
}
