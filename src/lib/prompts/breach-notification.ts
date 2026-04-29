import type { FirmData } from '../types';

export function buildBreachNotificationPrompt(firm: FirmData): string {
  return `Generate BREACH NOTIFICATION TEMPLATES for the following firm:

FIRM DETAILS:
- Legal Name: ${firm.legalName}
- SEC Registration: ${firm.secRegistrationNumber || 'Not provided'}
- Address: ${firm.firmAddress}
- Phone: ${firm.firmPhone}
- Website: ${firm.firmWebsite || 'Not provided'}

KEY PERSONNEL:
- Chief Compliance Officer: ${firm.ccoName} (${firm.ccoEmail}, ${firm.ccoPhone})

CUSTODIANS:
- Primary: ${firm.primaryCustodian}
${firm.otherCustodians?.length ? `- Others: ${firm.otherCustodians.join(', ')}` : ''}

CUSTOMER DATA TYPES THE FIRM HOLDS:
${firm.piiTypes.map((t) => `- ${t}`).join('\n')}

SERVICE PROVIDERS:
${firm.serviceProviders.map((p) => `- ${p.name} (${p.serviceType})`).join('\n')}

REQUIRED SECTIONS:
1. Purpose and Scope: Regulatory basis for breach notification under amended Reg S-P Rule 248.30, the 30-calendar-day notification requirement
2. Notification Decision Framework: When notification IS required (unauthorized access likely to cause substantial harm or inconvenience), when it may NOT be required (encrypted data, no risk of harm), documentation required for either decision
3. Customer Notification Letter Template: A complete, ready-to-use letter including:
   - Date placeholder: [DATE]
   - Recipient placeholders: [CUSTOMER NAME], [CUSTOMER ADDRESS]
   - Firm letterhead information (use the actual firm name and address)
   - Clear description of what happened: [DESCRIPTION OF INCIDENT]
   - Date of the incident: [DATE OF INCIDENT]
   - Types of information involved: [TYPES OF PII AFFECTED]
   - Steps the firm has taken in response
   - Steps the customer should take (credit monitoring, password changes, etc.)
   - Contact information for questions (use actual CCO details)
   - Reference to identity theft resources (FTC at IdentityTheft.gov)
   - The letter must meet all content requirements of amended Rule 248.30
4. SEC Notification Memo Template: Internal memo documenting:
   - Incident summary
   - Determination of notification requirement
   - Scope of affected individuals
   - Timeline of response
   - Notification method and date
   - Remediation steps taken
   - Signed by CCO (${firm.ccoName})
5. Service Provider Incident Notification Template: Template for notifying service providers when the firm experiences an incident, and template acknowledgment form for when a service provider notifies the firm
6. State Attorney General Notification Template: Many states require separate notification. Provide a general template that covers common state requirements
7. Notification Tracking Log: Format for tracking all notifications sent, including:
   - Affected individual name
   - Date notified
   - Method of notification
   - Confirmation of delivery
   - Follow-up actions
8. Timeline Requirements: Clear timeline chart showing the 30-day customer notification deadline, 72-hour service provider notification, and state-specific deadlines
9. Annual Testing: Procedures for testing the notification process annually

All templates should use the firm's actual name, address, CCO name, and contact details. Use [BRACKETED PLACEHOLDERS] only for incident-specific details that would change with each event.`;
}
