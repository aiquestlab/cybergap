document.addEventListener('DOMContentLoaded', () => {

    // --- CMMC Level 2 Domains ---
    const cmmcDomains = [
        { id: 'AC', name: 'Access Control' }, { id: 'AT', name: 'Awareness and Training' },
        { id: 'AU', name: 'Audit and Accountability' }, { id: 'CM', name: 'Configuration Management' },
        { id: 'IA', name: 'Identification and Authentication' }, { id: 'IR', name: 'Incident Response' },
        { id: 'MA', name: 'Maintenance' }, { id: 'MP', name: 'Media Protection' },
        { id: 'PE', name: 'Physical Protection' }, { id: 'PS', name: 'Personnel Security' },
        { id: 'RA', name: 'Risk Assessment' }, { id: 'CA', name: 'Security Assessment' },
        { id: 'SC', name: 'System and Communications Protection' }, { id: 'SI', name: 'System and Information Integrity' }
    ];

    // --- CMMC Level 2 Controls Data (POPULATED FROM EXCEL using DoD Value Column J) ---
    // Structure: nistId, cmmcId, domain, name, deduction (-DoD Value), guidance, assessmentCriteria[]
    // assessmentCriteria: { id, text, status, notes }
    // Special Cases: 3.5.3 & 3.13.11 use -5 based on guidance; 3.12.4 uses 0 based on N/A.
    const cmmcControlsData_Default = [
        // --- Access Control (AC) ---
        {
            nistId: '3.1.1', cmmcId: 'AC.L1-3.1.1', domain: 'AC', name: 'Limit system access to authorized users, processes acting on behalf of authorized users, and devices (including other systems).', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.1[a]', text: 'authorized users are identified.', status: 'TBD', notes: '' },
                { id: '3.1.1[b]', text: 'processes acting on behalf of authorized users are identified.', status: 'TBD', notes: '' },
                { id: '3.1.1[c]', text: 'devices (and other systems) authorized to connect to the system are identified.', status: 'TBD', notes: '' },
                { id: '3.1.1[d]', text: 'system access is limited to authorized users.', status: 'TBD', notes: '' },
                { id: '3.1.1[e]', text: 'system access is limited to processes acting on behalf of authorized users.', status: 'TBD', notes: '' },
                { id: '3.1.1[f]', text: 'system access is limited to authorized devices (including other systems).', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.1.2', cmmcId: 'AC.L1-3.1.2', domain: 'AC', name: 'Limit system access to the types of transactions and functions that authorized users are permitted to execute.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.2[a]', text: 'the types of transactions and functions that authorized users are permitted to execute are defined.', status: 'TBD', notes: '' },
                { id: '3.1.2[b]', text: 'system access is limited to the defined types of transactions and functions for authorized users.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.1.3', cmmcId: 'AC.L2-3.1.3', domain: 'AC', name: 'Control the flow of CUI in accordance with approved authorizations.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.3[a]', text: 'information flow control policies are defined.', status: 'TBD', notes: '' },
                { id: '3.1.3[b]', text: 'methods and enforcement mechanisms for controlling the flow of CUI are defined.', status: 'TBD', notes: '' },
                { id: '3.1.3[c]', text: 'designated sources and destinations (e.g., networks, individuals, and devices) for CUI within the system and between interconnected systems are identified.', status: 'TBD', notes: '' },
                { id: '3.1.3[d]', text: 'authorizations for controlling the flow of CUI are defined.', status: 'TBD', notes: '' },
                { id: '3.1.3[e]', text: 'approved authorizations for controlling the flow of CUI are enforced.', status: 'TBD', notes: '' }
             ]
         },
         {
            nistId: '3.1.4', cmmcId: 'AC.L2-3.1.4', domain: 'AC', name: 'Separate the duties of individuals to reduce the risk of malevolent activity without collusion.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.4[a]', text: 'the duties of individuals requiring separation are defined.', status: 'TBD', notes: '' },
                { id: '3.1.4[b]', text: 'responsibilities for duties that require separation are assigned to separate individuals.', status: 'TBD', notes: '' },
                { id: '3.1.4[c]', text: 'access privileges that enable individuals to exercise the duties that require separation are granted to separate individuals.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.5', cmmcId: 'AC.L2-3.1.5', domain: 'AC', name: 'Employ the principle of least privilege, including for specific security functions and privileged accounts.', deduction: -3, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.5[a]', text: 'privileged accounts are identified.', status: 'TBD', notes: '' },
                { id: '3.1.5[b]', text: 'access to privileged accounts is authorized in accordance with the principle of least privilege.', status: 'TBD', notes: '' },
                { id: '3.1.5[c]', text: 'security functions are identified.', status: 'TBD', notes: '' },
                { id: '3.1.5[d]', text: 'access to security functions is authorized in accordance with the principle of least privilege.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.6', cmmcId: 'AC.L2-3.1.6', domain: 'AC', name: 'Use non-privileged accounts or roles when accessing non-security functions.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.6[a]', text: 'nonsecurity functions are identified.', status: 'TBD', notes: '' },
                { id: '3.1.6[b]', text: 'users are required to use non-privileged accounts or roles when accessing nonsecurity functions.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.7', cmmcId: 'AC.L2-3.1.7', domain: 'AC', name: 'Prevent non-privileged users from executing privileged functions and capture the execution of such functions in audit logs.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.7[a]', text: 'privileged functions are defined.', status: 'TBD', notes: '' },
                { id: '3.1.7[b]', text: 'non-privileged users are defined.', status: 'TBD', notes: '' },
                { id: '3.1.7[c]', text: 'non-privileged users are prevented from executing privileged functions.', status: 'TBD', notes: '' },
                { id: '3.1.7[d]', text: 'the execution of privileged functions is captured in audit logs.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.8', cmmcId: 'AC.L2-3.1.8', domain: 'AC', name: 'Limit unsuccessful logon attempts.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.8[a]', text: 'the means of limiting unsuccessful logon attempts is defined.', status: 'TBD', notes: '' },
                { id: '3.1.8[b]', text: 'the defined means of limiting unsuccessful logon attempts is implemented.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.9', cmmcId: 'AC.L2-3.1.9', domain: 'AC', name: 'Provide privacy and security notices consistent with applicable CUI rules.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.9[a]', text: 'privacy and security notices required by CUI-specified rules are identified, consistent, and associated with the specific CUI category.', status: 'TBD', notes: '' },
                { id: '3.1.9[b]', text: 'privacy and security notices are displayed.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.10', cmmcId: 'AC.L2-3.1.10', domain: 'AC', name: 'Use session lock with pattern-hiding displays to prevent access and viewing of data after a period of inactivity.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.10[a]', text: 'the period of inactivity after which the system initiates a session lock is defined.', status: 'TBD', notes: '' },
                { id: '3.1.10[b]', text: 'access to the system and viewing of data is prevented by initiating a session lock after the defined period of inactivity.', status: 'TBD', notes: '' },
                { id: '3.1.10[c]', text: 'previously visible information is concealed via a pattern-hiding display after the defined period of inactivity.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.11', cmmcId: 'AC.L2-3.1.11', domain: 'AC', name: 'Terminate (automatically) a user session after a defined condition.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.11[a]', text: 'conditions requiring a user session to terminate are defined.', status: 'TBD', notes: '' },
                { id: '3.1.11[b]', text: 'a user session is automatically terminated after any of the defined conditions occur.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.12', cmmcId: 'AC.L2-3.1.12', domain: 'AC', name: 'Monitor and control remote access sessions.', deduction: -5, guidance: 'Do not subtract points if remote access not permitted',
            assessmentCriteria: [
                { id: '3.1.12[a]', text: 'remote access sessions are permitted.', status: 'TBD', notes: 'Mark N/A if remote access is disallowed entirely.' },
                { id: '3.1.12[b]', text: 'the types of permitted remote access are identified.', status: 'TBD', notes: '' },
                { id: '3.1.12[c]', text: 'remote access sessions are controlled.', status: 'TBD', notes: '' },
                { id: '3.1.12[d]', text: 'remote access sessions are monitored.', status: 'TBD', notes: '' }
            ]
         },
         {
             nistId: '3.1.13', cmmcId: 'AC.L2-3.1.13', domain: 'AC', name: 'Employ cryptographic mechanisms to protect the confidentiality of remote access sessions.', deduction: -5, guidance: 'Do not subtract points if remote access not permitted',
             assessmentCriteria: [
                 { id: '3.1.13[a]', text: 'cryptographic mechanisms to protect the confidentiality of remote access sessions are identified.', status: 'TBD', notes: '' },
                 { id: '3.1.13[b]', text: 'cryptographic mechanisms to protect the confidentiality of remote access sessions are implemented.', status: 'TBD', notes: '' }
             ]
         },
         {
            nistId: '3.1.14', cmmcId: 'AC.L2-3.1.14', domain: 'AC', name: 'Route remote access via managed access control points.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.14[a]', text: 'managed access control points are identified and implemented.', status: 'TBD', notes: '' },
                { id: '3.1.14[b]', text: 'remote access is routed through managed network access control points.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.15', cmmcId: 'AC.L2-3.1.15', domain: 'AC', name: 'Authorize remote execution of privileged commands and remote access to security- relevant information.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.15[a]', text: 'privileged commands authorized for remote execution are identified.', status: 'TBD', notes: '' },
                { id: '3.1.15[b]', text: 'security-relevant information authorized to be accessed remotely is identified.', status: 'TBD', notes: '' },
                { id: '3.1.15[c]', text: 'the execution of the identified privileged commands via remote access is authorized.', status: 'TBD', notes: '' },
                { id: '3.1.15[d]', text: 'access to the identified security-relevant information via remote access is authorized.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.16', cmmcId: 'AC.L2-3.1.16', domain: 'AC', name: 'Authorize wireless access prior to allowing such connections.', deduction: -5, guidance: 'Do not subtract points if wireless access not permitted',
            assessmentCriteria: [
                { id: '3.1.16[a]', text: 'wireless access points are identified.', status: 'TBD', notes: '' },
                { id: '3.1.16[b]', text: 'wireless access is authorized prior to allowing such connections.', status: 'TBD', notes: 'Mark N/A if wireless access is disallowed entirely.' }
            ]
         },
         {
            nistId: '3.1.17', cmmcId: 'AC.L2-3.1.17', domain: 'AC', name: 'Protect wireless access using authentication and encryption.', deduction: -5, guidance: 'Do not subtract points if wireless access not permitted',
            assessmentCriteria: [
                { id: '3.1.17[a]', text: 'wireless access to the system is protected using authentication.', status: 'TBD', notes: '' },
                { id: '3.1.17[b]', text: 'wireless access to the system is protected using encryption.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.18', cmmcId: 'AC.L2-3.1.18', domain: 'AC', name: 'Control connection of mobile devices.', deduction: -5, guidance: 'Do not subtract points if connection of mobile devices is not permitted',
            assessmentCriteria: [
                { id: '3.1.18[a]', text: 'mobile devices that process, store, or transmit CUI are identified.', status: 'TBD', notes: '' },
                { id: '3.1.18[b]', text: 'mobile device connections are authorized.', status: 'TBD', notes: 'Mark N/A if mobile device connections are disallowed entirely.' },
                { id: '3.1.18[c]', text: 'mobile device connections are monitored and logged.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.19', cmmcId: 'AC.L2-3.1.19', domain: 'AC', name: 'Encrypt CUI on mobile devices and mobile computing platforms', deduction: -3, guidance: 'Exposure limited to CUI on mobile platform',
            assessmentCriteria: [
                { id: '3.1.19[a]', text: 'mobile devices and mobile computing platforms that process, store, or transmit CUI are identified.', status: 'TBD', notes: '' },
                { id: '3.1.19[b]', text: 'encryption is employed to protect CUI on identified mobile devices and mobile computing platforms.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.20', cmmcId: 'AC.L1-3.1.20', domain: 'AC', name: 'Verify and control/limit connections to and use of external systems.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.20[a]', text: 'connections to external systems are identified.', status: 'TBD', notes: '' },
                { id: '3.1.20[b]', text: 'the use of external systems is identified.', status: 'TBD', notes: '' },
                { id: '3.1.20[c]', text: 'connections to external systems are verified.', status: 'TBD', notes: '' },
                { id: '3.1.20[d]', text: 'the use of external systems is verified.', status: 'TBD', notes: '' },
                { id: '3.1.20[e]', text: 'connections to external systems are controlled/limited.', status: 'TBD', notes: '' },
                { id: '3.1.20[f]', text: 'the use of external systems is controlled/limited.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.21', cmmcId: 'AC.L2-3.1.21', domain: 'AC', name: 'Limit use of portable storage devices on external systems.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.21[a]', text: 'the use of portable storage devices containing CUI on external systems is identified and documented.', status: 'TBD', notes: '' },
                { id: '3.1.21[b]', text: 'limits on the use of portable storage devices containing CUI on external systems are defined.', status: 'TBD', notes: '' },
                { id: '3.1.21[c]', text: 'the use of portable storage devices containing CUI on external systems is limited as defined.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.1.22', cmmcId: 'AC.L1-3.1.22', domain: 'AC', name: 'Control CUI posted or processed on publicly accessible systems.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.1.22[a]', text: 'individuals authorized to post or process information on publicly accessible systems are identified.', status: 'TBD', notes: '' },
                { id: '3.1.22[b]', text: 'procedures to ensure CUI is not posted or processed on publicly accessible systems are identified.', status: 'TBD', notes: '' },
                { id: '3.1.22[c]', text: 'a review process is in place prior to posting of any content to publicly accessible systems.', status: 'TBD', notes: '' },
                { id: '3.1.22[d]', text: 'content on publicly accessible systems is reviewed to ensure that it does not include CUI.', status: 'TBD', notes: '' },
                { id: '3.1.22[e]', text: 'mechanisms are in place to remove and address improper posting of CUI.', status: 'TBD', notes: '' }
            ]
         },

        // --- Awareness and Training (AT) ---
        {
            nistId: '3.2.1', cmmcId: 'AT.L2-3.2.1', domain: 'AT', name: 'Ensure that managers, systems administrators, and users of organizational systems are made aware of the security risks associated with their activities and of the applicable policies, standards, and procedures related to the security of those systems.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.2.1[a]', text: 'security risks associated with organizational activities involving CUI are identified.', status: 'TBD', notes: '' },
                { id: '3.2.1[b]', text: 'policies, standards, and procedures related to the security of the system are identified.', status: 'TBD', notes: '' },
                { id: '3.2.1[c]', text: 'managers, systems administrators, and users of the system are made aware of the security risks associated with their activities.', status: 'TBD', notes: '' },
                { id: '3.2.1[d]', text: 'managers, systems administrators, and users of the system are made aware of the applicable policies, standards, and procedures related to the security of the system.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.2.2', cmmcId: 'AT.L2-3.2.2', domain: 'AT', name: 'Ensure that personnel are trained to carry out their assigned information security- related duties and responsibilities.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.2.2[a]', text: 'information security-related duties, roles, and responsibilities are defined.', status: 'TBD', notes: '' },
                { id: '3.2.2[b]', text: 'information security-related duties, roles, and responsibilities are assigned to designated personnel.', status: 'TBD', notes: '' },
                { id: '3.2.2[c]', text: 'personnel are adequately trained to carry out their assigned information security-related duties, roles, and responsibilities.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.2.3', cmmcId: 'AT.L2-3.2.3', domain: 'AT', name: 'Provide security awareness training on recognizing and reporting potential indicators of insider threat.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.2.3[a]', text: 'potential indicators associated with insider threats are identified.', status: 'TBD', notes: '' },
                { id: '3.2.3[b]', text: 'security awareness training on recognizing and reporting potential indicators of insider threat is provided to managers and employees.', status: 'TBD', notes: '' }
            ]
        },

        // --- Audit and Accountability (AU) ---
        {
            nistId: '3.3.1', cmmcId: 'AU.L2-3.3.1', domain: 'AU', name: 'Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.3.1[a]', text: 'audit logs needed (i.e., event types to be logged) to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity are specified.', status: 'TBD', notes: '' },
                { id: '3.3.1[b]', text: 'the content of audit records needed to support monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity is defined.', status: 'TBD', notes: '' },
                { id: '3.3.1[c]', text: 'audit records are created (generated).', status: 'TBD', notes: '' },
                { id: '3.3.1[d]', text: 'audit records, once created, contain the defined content.', status: 'TBD', notes: '' },
                { id: '3.3.1[e]', text: 'retention requirements for audit records are defined.', status: 'TBD', notes: '' },
                { id: '3.3.1[f]', text: 'audit records are retained as defined.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.3.2', cmmcId: 'AU.L2-3.3.2', domain: 'AU', name: 'Ensure that the actions of individual system users can be uniquely traced to those users so they can be held accountable for their actions.', deduction: -3, guidance: 'None',
            assessmentCriteria: [
                { id: '3.3.2[a]', text: 'the content of the audit records needed to support the ability to uniquely trace users to their actions is defined.', status: 'TBD', notes: '' },
                { id: '3.3.2[b]', text: 'audit records, once created, contain the defined content.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.3.3', cmmcId: 'AU.L2-3.3.3', domain: 'AU', name: 'Review and update logged events.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.3.3[a]', text: 'a process for determining when to review logged events is defined.', status: 'TBD', notes: '' },
                { id: '3.3.3[b]', text: 'event types being logged are reviewed in accordance with the defined review process.', status: 'TBD', notes: '' },
                { id: '3.3.3[c]', text: 'event types being logged are updated based on the review.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.3.4', cmmcId: 'AU.L2-3.3.4', domain: 'AU', name: 'Alert in the event of an audit logging process failure.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.3.4[a]', text: 'personnel or roles to be alerted in the event of an audit logging process failure are identified.', status: 'TBD', notes: '' },
                { id: '3.3.4[b]', text: 'types of audit logging process failures for which alert will be generated are defined.', status: 'TBD', notes: '' },
                { id: '3.3.4[c]', text: 'identified personnel or roles are alerted in the event of an audit logging process failure.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.3.5', cmmcId: 'AU.L2-3.3.5', domain: 'AU', name: 'Correlate audit record review, analysis, and reporting processes for investigation and response to indications of unlawful, unauthorized, suspicious, or unusual activity.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.3.5[a]', text: 'audit record review, analysis, and reporting processes for investigation and response to indications of unlawful, unauthorized, suspicious, or unusual activity are defined.', status: 'TBD', notes: '' },
                { id: '3.3.5[b]', text: 'defined audit record review, analysis, and reporting processes are correlated.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.3.6', cmmcId: 'AU.L2-3.3.6', domain: 'AU', name: 'Provide audit record reduction and report generation to support on-demand analysis and reporting.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.3.6[a]', text: 'an audit record reduction capability that supports on-demand analysis is provided.', status: 'TBD', notes: '' },
                { id: '3.3.6[b]', text: 'a report generation capability that supports on-demand reporting is provided.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.3.7', cmmcId: 'AU.L2-3.3.7', domain: 'AU', name: 'Provide a system capability that compares and synchronizes internal system clocks with an authoritative source to generate time stamps for audit records.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.3.7[a]', text: 'internal system clocks are used to generate time stamps for audit records.', status: 'TBD', notes: '' },
                { id: '3.3.7[b]', text: 'an authoritative source with which to compare and synchronize internal system clocks is specified.', status: 'TBD', notes: '' },
                { id: '3.3.7[c]', text: 'internal system clocks used to generate time stamps for audit records are compared to and synchronized with the specified authoritative time source.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.3.8', cmmcId: 'AU.L2-3.3.8', domain: 'AU', name: 'Protect audit information and audit logging tools from unauthorized access, modification, and deletion.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.3.8[a]', text: 'audit information is protected from unauthorized access.', status: 'TBD', notes: '' },
                { id: '3.3.8[b]', text: 'audit information is protected from unauthorized modification.', status: 'TBD', notes: '' },
                { id: '3.3.8[c]', text: 'audit information is protected from unauthorized deletion.', status: 'TBD', notes: '' },
                { id: '3.3.8[d]', text: 'audit logging tools are protected from unauthorized access.', status: 'TBD', notes: '' },
                { id: '3.3.8[e]', text: 'audit logging tools are protected from unauthorized modification.', status: 'TBD', notes: '' },
                { id: '3.3.8[f]', text: 'audit logging tools are protected from unauthorized deletion.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.3.9', cmmcId: 'AU.L2-3.3.9', domain: 'AU', name: 'Limit management of audit logging functionality to a subset of privileged users.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.3.9[a]', text: 'a subset of privileged users granted access to manage audit logging functionality is defined.', status: 'TBD', notes: '' },
                { id: '3.3.9[b]', text: 'management of audit logging functionality is limited to the defined subset of privileged users.', status: 'TBD', notes: '' }
            ]
        },

        // --- Configuration Management (CM) ---
        {
            nistId: '3.4.1', cmmcId: 'CM.L2-3.4.1', domain: 'CM', name: 'Establish and maintain baseline configurations and inventories of organizational systems (including hardware, software, firmware, and documentation) throughout the respective system development life cycles.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.4.1[a]', text: 'a baseline configuration is established.', status: 'TBD', notes: '' },
                { id: '3.4.1[b]', text: 'the baseline configuration includes hardware, software, firmware, and documentation.', status: 'TBD', notes: '' },
                { id: '3.4.1[c]', text: 'the baseline configuration is maintained (reviewed and updated) throughout the system development life cycle.', status: 'TBD', notes: '' },
                { id: '3.4.1[d]', text: 'a system inventory is established.', status: 'TBD', notes: '' },
                { id: '3.4.1[e]', text: 'the system inventory includes hardware, software, firmware, and documentation.', status: 'TBD', notes: '' },
                { id: '3.4.1[f]', text: 'the inventory is maintained (reviewed and updated) throughout the system development life cycle.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.4.2', cmmcId: 'CM.L2-3.4.2', domain: 'CM', name: 'Establish and enforce security configuration settings for information technology products employed in organizational systems.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.4.2[a]', text: 'security configuration settings for information technology products employed in the system are established and included in the baseline configuration.', status: 'TBD', notes: '' },
                { id: '3.4.2[b]', text: 'security configuration settings for information technology products employed in the system are enforced.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.4.3', cmmcId: 'CM.L2-3.4.3', domain: 'CM', name: 'Track, review, approve or disapprove, and log changes to organizational systems.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.4.3[a]', text: 'changes to the system are tracked.', status: 'TBD', notes: '' },
                { id: '3.4.3[b]', text: 'changes to the system are reviewed.', status: 'TBD', notes: '' },
                { id: '3.4.3[c]', text: 'changes to the system are approved or disapproved.', status: 'TBD', notes: '' },
                { id: '3.4.3[d]', text: 'changes to the system are logged.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.4.4', cmmcId: 'CM.L2-3.4.4', domain: 'CM', name: 'Analyze the security impact of changes prior to implementation.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.4.4', text: 'Determine if the security impact of changes to the system is analyzed prior to implementation.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.4.5', cmmcId: 'CM.L2-3.4.5', domain: 'CM', name: 'Define, document, approve, and enforce physical and logical access restrictions associated with changes to organizational systems.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.4.5[a]', text: 'physical access restrictions associated with changes to the system are defined.', status: 'TBD', notes: '' },
                { id: '3.4.5[b]', text: 'physical access restrictions associated with changes to the system are documented.', status: 'TBD', notes: '' },
                { id: '3.4.5[c]', text: 'physical access restrictions associated with changes to the system are approved.', status: 'TBD', notes: '' },
                { id: '3.4.5[d]', text: 'physical access restrictions associated with changes to the system are enforced.', status: 'TBD', notes: '' },
                { id: '3.4.5[e]', text: 'logical access restrictions associated with changes to the system are defined.', status: 'TBD', notes: '' },
                { id: '3.4.5[f]', text: 'logical access restrictions associated with changes to the system are documented.', status: 'TBD', notes: '' },
                { id: '3.4.5[g]', text: 'logical access restrictions associated with changes to the system are approved.', status: 'TBD', notes: '' },
                { id: '3.4.5[h]', text: 'logical access restrictions associated with changes to the system are enforced.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.4.6', cmmcId: 'CM.L2-3.4.6', domain: 'CM', name: 'Employ the principle of least functionality by configuring organizational systems to provide only essential capabilities.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.4.6[a]', text: 'essential system capabilities are defined based on the principle of least functionality.', status: 'TBD', notes: '' },
                { id: '3.4.6[b]', text: 'the system is configured to provide only the defined essential capabilities.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.4.7', cmmcId: 'CM.L2-3.4.7', domain: 'CM', name: 'Restrict, disable, or prevent the use of nonessential programs, functions, ports, protocols, and services.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.4.7[a]', text: 'essential programs are defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[b]', text: 'the use of nonessential programs is defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[c]', text: 'the use of nonessential programs is restricted, disabled, or prevented as defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[d]', text: 'essential functions are defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[e]', text: 'the use of nonessential functions is defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[f]', text: 'the use of nonessential functions is restricted, disabled, or prevented as defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[g]', text: 'essential ports are defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[h]', text: 'the use of nonessential ports is defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[i]', text: 'the use of nonessential ports is restricted, disabled, or prevented as defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[j]', text: 'essential protocols are defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[k]', text: 'the use of nonessential protocols is defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[l]', text: 'the use of nonessential protocols is restricted, disabled, or prevented as defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[m]', text: 'essential services are defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[n]', text: 'the use of nonessential services is defined.', status: 'TBD', notes: '' },
                { id: '3.4.7[o]', text: 'the use of nonessential services is restricted, disabled, or prevented as defined.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.4.8', cmmcId: 'CM.L2-3.4.8', domain: 'CM', name: 'Apply deny-by-exception (blacklisting) policy to prevent the use of unauthorized software or deny-all, permit-by-exception (whitelisting) policy to allow the execution of authorized software.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.4.8[a]', text: 'a policy specifying whether whitelisting or blacklisting is to be implemented is specified.', status: 'TBD', notes: '' },
                { id: '3.4.8[b]', text: 'the software allowed to execute under whitelisting or denied use under blacklisting is specified.', status: 'TBD', notes: '' },
                { id: '3.4.8[c]', text: 'whitelisting to allow the execution of authorized software or blacklisting to prevent the use of unauthorized software is implemented as specified.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.4.9', cmmcId: 'CM.L2-3.4.9', domain: 'CM', name: 'Control and monitor user-installed software.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.4.9[a]', text: 'a policy for controlling the installation of software by users is established.', status: 'TBD', notes: '' },
                { id: '3.4.9[b]', text: 'installation of software by users is controlled based on the established policy.', status: 'TBD', notes: '' },
                { id: '3.4.9[c]', text: 'installation of software by users is monitored.', status: 'TBD', notes: '' }
            ]
        },

        // --- Identification and Authentication (IA) ---
        {
            nistId: '3.5.1', cmmcId: 'IA.L1-3.5.1', domain: 'IA', name: 'Identify system users, processes acting on behalf of users, and devices.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.5.1[a]', text: 'system users are identified.', status: 'TBD', notes: '' },
                { id: '3.5.1[b]', text: 'processes acting on behalf of users are identified.', status: 'TBD', notes: '' },
                { id: '3.5.1[c]', text: 'devices accessing the system are identified.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.5.2', cmmcId: 'IA.L1-3.5.2', domain: 'IA', name: 'Authenticate (or verify) the identities of users, processes, or devices, as a prerequisite to allowing access to organizational systems.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.5.2[a]', text: 'the identity of each user is authenticated or verified as a prerequisite to system access.', status: 'TBD', notes: '' },
                { id: '3.5.2[b]', text: 'the identity of each process acting on behalf of a user is authenticated or verified as a prerequisite to system access.', status: 'TBD', notes: '' },
                { id: '3.5.2[c]', text: 'the identity of each device accessing or connecting to the system is authenticated or verified as a prerequisite to system access.', status: 'TBD', notes: '' }
            ]
        },
        {
            nistId: '3.5.3', cmmcId: 'IA.L2-3.5.3', domain: 'IA', name: 'Use multifactor authentication (MFA) for local and network access to privileged accounts and for network access to non- privileged accounts.', deduction: -5, guidance: 'Subtract 5 points if MFA not implemented. Subtract 3 points if implemented for remote and privileged users, but not the general user', // Using -5 as max potential deduction
            assessmentCriteria: [
                { id: '3.5.3[a]', text: 'privileged accounts are identified.', status: 'TBD', notes: '' },
                { id: '3.5.3[b]', text: 'multifactor authentication is implemented for local access to privileged accounts.', status: 'TBD', notes: '' },
                { id: '3.5.3[c]', text: 'multifactor authentication is implemented for network access to privileged accounts.', status: 'TBD', notes: '' },
                { id: '3.5.3[d]', text: 'multifactor authentication is implemented for network access to non-privileged accounts.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.5.4', cmmcId: 'IA.L2-3.5.4', domain: 'IA', name: 'Employ replay-resistant authentication mechanisms for network access to privileged and non-privileged accounts.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.5.4', text: 'Determine if replay-resistant authentication mechanisms are implemented for network account access to privileged and non-privileged accounts.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.5.5', cmmcId: 'IA.L2-3.5.5', domain: 'IA', name: 'Prevent reuse of identifiers for a defined period.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.5.5[a]', text: 'a period within which identifiers cannot be reused is defined.', status: 'TBD', notes: '' },
                { id: '3.5.5[b]', text: 'reuse of identifiers is prevented within the defined period.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.5.6', cmmcId: 'IA.L2-3.5.6', domain: 'IA', name: 'Disable identifiers after a defined period of inactivity.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.5.6[a]', text: 'a period of inactivity after which an identifier is disabled is defined.', status: 'TBD', notes: '' },
                { id: '3.5.6[b]', text: 'identifiers are disabled after the defined period of inactivity.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.5.7', cmmcId: 'IA.L2-3.5.7', domain: 'IA', name: 'Enforce a minimum password complexity and change of characters when new passwords are created.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.5.7[a]', text: 'password complexity requirements are defined.', status: 'TBD', notes: '' },
                { id: '3.5.7[b]', text: 'password change of character requirements are defined.', status: 'TBD', notes: '' },
                { id: '3.5.7[c]', text: 'minimum password complexity requirements as defined are enforced when new passwords are created.', status: 'TBD', notes: '' },
                { id: '3.5.7[d]', text: 'minimum password change of character requirements as defined are enforced when new passwords are created.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.5.8', cmmcId: 'IA.L2-3.5.8', domain: 'IA', name: 'Prohibit password reuse for a specified number of generations.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.5.8[a]', text: 'the number of generations during which a password cannot be reused is specified.', status: 'TBD', notes: '' },
                { id: '3.5.8[b]', text: 'reuse of passwords is prohibited during the specified number of generations.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.5.9', cmmcId: 'IA.L2-3.5.9', domain: 'IA', name: 'Allow temporary password use for system logons with an immediate change to a permanent password.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.5.9', text: 'Determine if an immediate change to a permanent password is required when a temporary password is used for system logon.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.5.10', cmmcId: 'IA.L2-3.5.10', domain: 'IA', name: 'Store and transmit only cryptographically- protected passwords.', deduction: -5, guidance: 'Encrypted representations of passwords include, for example, encrypted versions of passwords and one-way cryptographic hashes of passwords',
            assessmentCriteria: [
                { id: '3.5.10[a]', text: 'passwords are cryptographically protected in storage.', status: 'TBD', notes: '' },
                { id: '3.5.10[b]', text: 'passwords are cryptographically protected in transit.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.5.11', cmmcId: 'IA.L2-3.15.11', domain: 'IA', name: 'Obscure feedback of authentication information.', deduction: -1, guidance: 'None', // Note: CMMC ID typo in Excel 3.15.11 vs 3.5.11
            assessmentCriteria: [
                { id: '3.5.11', text: 'Determine if authentication information is obscured during the authentication process.', status: 'TBD', notes: '' }
            ]
         },

         // --- Incident Response (IR) ---
         {
            nistId: '3.6.1', cmmcId: 'IR.L2-3.6.1', domain: 'IR', name: 'Establish an operational incident-handling capability for organizational systems that includes preparation, detection, analysis, containment, recovery, and user response activities.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.6.1[a]', text: 'an operational incident-handling capability is established.', status: 'TBD', notes: '' },
                { id: '3.6.1[b]', text: 'the operational incident-handling capability includes preparation.', status: 'TBD', notes: '' },
                { id: '3.6.1[c]', text: 'the operational incident-handling capability includes detection.', status: 'TBD', notes: '' },
                { id: '3.6.1[d]', text: 'the operational incident-handling capability includes analysis.', status: 'TBD', notes: '' },
                { id: '3.6.1[e]', text: 'the operational incident-handling capability includes containment.', status: 'TBD', notes: '' },
                { id: '3.6.1[f]', text: 'the operational incident-handling capability includes recovery.', status: 'TBD', notes: '' },
                { id: '3.6.1[g]', text: 'the operational incident-handling capability includes user response activities.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.6.2', cmmcId: 'IR.L2-3.6.2', domain: 'IR', name: 'Track, document, and report incidents to designated officials and/or authorities both internal and external to the organization.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.6.2[a]', text: 'incidents are tracked.', status: 'TBD', notes: '' },
                { id: '3.6.2[b]', text: 'incidents are documented.', status: 'TBD', notes: '' },
                { id: '3.6.2[c]', text: 'authorities to whom incidents are to be reported are identified.', status: 'TBD', notes: '' },
                { id: '3.6.2[d]', text: 'organizational officials to whom incidents are to be reported are identified.', status: 'TBD', notes: '' },
                { id: '3.6.2[e]', text: 'identified authorities are notified of incidents.', status: 'TBD', notes: '' },
                { id: '3.6.2[f]', text: 'identified organizational officials are notified of incidents.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.6.3', cmmcId: 'IR.L2-3.6.3', domain: 'IR', name: 'Test the organizational incident response capability.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.6.3', text: 'Determine if the incident response capability is tested.', status: 'TBD', notes: '' }
            ]
         },

         // --- Maintenance (MA) ---
         {
            nistId: '3.7.1', cmmcId: 'MA.L2-3.7.1', domain: 'MA', name: 'Perform maintenance on organizational systems.', deduction: -3, guidance: 'None',
            assessmentCriteria: [
                { id: '3.7.1', text: 'Determine if system maintenance is performed.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.7.2', cmmcId: 'MA.L2-3.7.2', domain: 'MA', name: 'Provide controls on the tools, techniques, mechanisms, and personnel used to conduct system maintenance.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.7.2[a]', text: 'tools used to conduct system maintenance are controlled.', status: 'TBD', notes: '' },
                { id: '3.7.2[b]', text: 'techniques used to conduct system maintenance are controlled.', status: 'TBD', notes: '' },
                { id: '3.7.2[c]', text: 'mechanisms used to conduct system maintenance are controlled.', status: 'TBD', notes: '' },
                { id: '3.7.2[d]', text: 'personnel used to conduct system maintenance are controlled.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.7.3', cmmcId: 'MA.L2-3.7.3', domain: 'MA', name: 'Ensure equipment removed for off-site maintenance is sanitized of any CUI.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.7.3', text: 'Determine if equipment to be removed from organizational spaces for off-site maintenance is sanitized of any CUI.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.7.4', cmmcId: 'MA.L2-3.7.4', domain: 'MA', name: 'Check media containing diagnostic and test programs for malicious code before the media are used in organizational systems.', deduction: -3, guidance: 'None',
            assessmentCriteria: [
                { id: '3.7.4', text: 'Determine if media containing diagnostic and test programs are checked for malicious code before being used in organizational systems that process, store, or transmit CUI.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.7.5', cmmcId: 'MA.L2-3.7.5', domain: 'MA', name: 'Require multifactor authentication to establish nonlocal maintenance sessions via external network connections and terminate such connections when nonlocal maintenance is complete.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.7.5[a]', text: 'multifactor authentication is used to establish nonlocal maintenance sessions via external network connections.', status: 'TBD', notes: '' },
                { id: '3.7.5[b]', text: 'nonlocal maintenance sessions established via external network connections are terminated when nonlocal maintenance is complete.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.7.6', cmmcId: 'MA.L2-3.7.6', domain: 'MA', name: 'Supervise the maintenance activities of maintenance personnel without required access authorization.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.7.6', text: 'Determine if maintenance personnel without required access authorization are supervised during maintenance activities.', status: 'TBD', notes: '' }
            ]
         },

         // --- Media Protection (MP) ---
         {
            nistId: '3.8.1', cmmcId: 'MP.L2-3.8.1', domain: 'MP', name: 'Protect (i.e., physically control and securely store) system media containing CUI, both paper and digital.', deduction: -3, guidance: 'Exposure limited to CUI on media',
            assessmentCriteria: [
                { id: '3.8.1[a]', text: 'paper media containing CUI is physically controlled.', status: 'TBD', notes: '' },
                { id: '3.8.1[b]', text: 'digital media containing CUI is physically controlled.', status: 'TBD', notes: '' },
                { id: '3.8.1[c]', text: 'paper media containing CUI is securely stored.', status: 'TBD', notes: '' },
                { id: '3.8.1[d]', text: 'digital media containing CUI is securely stored.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.8.2', cmmcId: 'MP.L2-3.8.2', domain: 'MP', name: 'Limit access to CUI on system media to authorized users.', deduction: -3, guidance: 'Exposure limited to CUI on media',
            assessmentCriteria: [
                { id: '3.8.2', text: 'Determine if access to CUI on system media is limited to authorized users.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.8.3', cmmcId: 'MP.L1-3.8.3', domain: 'MP', name: 'Sanitize or destroy system media containing CUI before disposal or release for reuse.', deduction: -5, guidance: 'While exposure limited to CUI on media, failure to sanitize can result in continual exposure of CUI',
            assessmentCriteria: [
                { id: '3.8.3[a]', text: 'system media containing CUI is sanitized or destroyed before disposal.', status: 'TBD', notes: '' },
                { id: '3.8.3[b]', text: 'system media containing CUI is sanitized before it is released for reuse.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.8.4', cmmcId: 'MP.L2-3.8.4', domain: 'MP', name: 'Mark media with necessary CUI markings and distribution limitations.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.8.4[a]', text: 'media containing CUI is marked with applicable CUI markings.', status: 'TBD', notes: '' },
                { id: '3.8.4[b]', text: 'media containing CUI is marked with distribution limitations.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.8.5', cmmcId: 'MP.L2-3.8.5', domain: 'MP', name: 'Control access to media containing CUI and maintain accountability for media during transport outside of controlled areas.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.8.5[a]', text: 'access to media containing CUI is controlled.', status: 'TBD', notes: '' },
                { id: '3.8.5[b]', text: 'accountability for media containing CUI is maintained during transport outside of controlled areas.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.8.6', cmmcId: 'MP.L2-3.8.6', domain: 'MP', name: 'Implement cryptographic mechanisms to protect the confidentiality of CUI stored on digital media during transport unless otherwise protected by alternative physical safeguards.', deduction: -1, guidance: 'None', // Corrected CMMC ID from #REF!
            assessmentCriteria: [
                { id: '3.8.6', text: 'Determine if the confidentiality of CUI stored on digital media is protected during transport using cryptographic mechanisms or alternative physical safeguards.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.8.7', cmmcId: 'MP.L2-3.8.7', domain: 'MP', name: 'Control the use of removable media on system components.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.8.7', text: 'Determine if the use of removable media on system components is controlled.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.8.8', cmmcId: 'MP.L2-3.8.8', domain: 'MP', name: 'Prohibit the use of portable storage devices when such devices have no identifiable owner.', deduction: -3, guidance: 'None',
            assessmentCriteria: [
                { id: '3.8.8', text: 'Determine if the use of portable storage devices is prohibited when such devices have no identifiable owner.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.8.9', cmmcId: 'MP.L2-3.8.9', domain: 'MP', name: 'Protect the confidentiality of backup CUI at storage locations.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.8.9', text: 'Determine if the confidentiality of backup CUI is protected at storage locations.', status: 'TBD', notes: '' }
            ]
         },

         // --- Personnel Security (PS) ---
         {
            nistId: '3.9.1', cmmcId: 'PS.L2-3.9.1', domain: 'PS', name: 'Screen individuals prior to authorizing access to organizational systems containing CUI.', deduction: -3, guidance: 'None',
            assessmentCriteria: [
                { id: '3.9.1', text: 'Determine if individuals are screened prior to authorizing access to organizational systems containing CUI.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.9.2', cmmcId: 'PS.L2-3.9.2', domain: 'PS', name: 'Ensure that organizational systems containing CUI are protected during and after personnel actions such as terminations and transfers.', deduction: -5, guidance: 'None', // Corrected CMMC ID from PS.L2-3.9.1
            assessmentCriteria: [
                { id: '3.9.2[a]', text: 'a policy and/or process for terminating system access and any credentials coincident with personnel actions is established.', status: 'TBD', notes: '' },
                { id: '3.9.2[b]', text: 'system access and credentials are terminated consistent with personnel actions such as termination or transfer.', status: 'TBD', notes: '' },
                { id: '3.9.2[c]', text: 'the system is protected during and after personnel transfer actions.', status: 'TBD', notes: '' }
            ]
         },

         // --- Physical Protection (PE) ---
         {
            nistId: '3.10.1', cmmcId: 'PE.L1-3.10.1', domain: 'PE', name: 'Limit physical access to organizational systems, equipment, and the respective operating environments to authorized individuals.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.10.1[a]', text: 'authorized individuals allowed physical access are identified.', status: 'TBD', notes: '' },
                { id: '3.10.1[b]', text: 'physical access to organizational systems is limited to authorized individuals.', status: 'TBD', notes: '' },
                { id: '3.10.1[c]', text: 'physical access to equipment is limited to authorized individuals.', status: 'TBD', notes: '' },
                { id: '3.10.1[d]', text: 'physical access to operating environments is limited to authorized individuals.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.10.2', cmmcId: 'PE.L2-3.10.2', domain: 'PE', name: 'Protect and monitor the physical facility and support infrastructure for organizational systems.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.10.2[a]', text: 'the physical facility where organizational systems reside is protected.', status: 'TBD', notes: '' },
                { id: '3.10.2[b]', text: 'the support infrastructure for organizational systems is protected.', status: 'TBD', notes: '' },
                { id: '3.10.2[c]', text: 'the physical facility where organizational systems reside is monitored.', status: 'TBD', notes: '' },
                { id: '3.10.2[d]', text: 'the support infrastructure for organizational systems is monitored.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.10.3', cmmcId: 'PE.L1-3.10.3', domain: 'PE', name: 'Escort visitors and monitor visitor activity.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.10.3[a]', text: 'visitors are escorted.', status: 'TBD', notes: '' },
                { id: '3.10.3[b]', text: 'visitor activity is monitored.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.10.4', cmmcId: 'PE.L1-3.10.4', domain: 'PE', name: 'Maintain audit logs of physical access.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.10.4', text: 'Determine if audit logs of physical access are maintained.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.10.5', cmmcId: 'PE.L1-3.10.5', domain: 'PE', name: 'Control and manage physical access devices.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.10.5[a]', text: 'physical access devices are identified.', status: 'TBD', notes: '' },
                { id: '3.10.5[b]', text: 'physical access devices are controlled.', status: 'TBD', notes: '' },
                { id: '3.10.5[c]', text: 'physical access devices are managed.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.10.6', cmmcId: 'PE.L2-3.10.6', domain: 'PE', name: 'Enforce safeguarding measures for CUI at alternate work sites.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.10.6[a]', text: 'safeguarding measures for CUI are defined for alternate work sites.', status: 'TBD', notes: '' },
                { id: '3.10.6[b]', text: 'safeguarding measures for CUI are enforced for alternate work sites.', status: 'TBD', notes: '' }
            ]
         },

         // --- Risk Assessment (RA) ---
         {
            nistId: '3.11.1', cmmcId: 'RA.L2-3.11.1', domain: 'RA', name: 'Periodically assess the risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals, resulting from the operation of organizational systems and the associated processing, storage, or transmission of CUI.', deduction: -3, guidance: 'None',
            assessmentCriteria: [
                { id: '3.11.1[a]', text: 'the frequency to assess risk to organizational operations, organizational assets, and individuals is defined.', status: 'TBD', notes: '' },
                { id: '3.11.1[b]', text: 'risk to organizational operations, organizational assets, and individuals resulting from the operation of an organizational system that processes, stores, or transmits CUI is assessed with the defined frequency.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.11.2', cmmcId: 'RA.L2-3.11.2', domain: 'RA', name: 'Scan for vulnerabilities in organizational systems and applications periodically and when new vulnerabilities affecting those systems and applications are identified.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.11.2[a]', text: 'the frequency to scan for vulnerabilities in organizational systems and applications is defined.', status: 'TBD', notes: '' },
                { id: '3.11.2[b]', text: 'vulnerability scans are performed on organizational systems with the defined frequency.', status: 'TBD', notes: '' },
                { id: '3.11.2[c]', text: 'vulnerability scans are performed on applications with the defined frequency.', status: 'TBD', notes: '' },
                { id: '3.11.2[d]', text: 'vulnerability scans are performed on organizational systems when new vulnerabilities are identified.', status: 'TBD', notes: '' },
                { id: '3.11.2[e]', text: 'vulnerability scans are performed on applications when new vulnerabilities are identified.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.11.3', cmmcId: 'RA.L2-3.11.3', domain: 'RA', name: 'Remediate vulnerabilities in accordance with risk assessments.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.11.3[a]', text: 'vulnerabilities are identified.', status: 'TBD', notes: '' },
                { id: '3.11.3[b]', text: 'vulnerabilities are remediated in accordance with risk assessments.', status: 'TBD', notes: '' }
            ]
         },

         // --- Security Assessment (CA) ---
         {
            nistId: '3.12.1', cmmcId: 'CA.L2-3.12.1', domain: 'CA', name: 'Periodically assess the security controls in organizational systems to determine if the controls are effective in their application.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.12.1[a]', text: 'the frequency of security control assessments is defined.', status: 'TBD', notes: '' },
                { id: '3.12.1[b]', text: 'security controls are assessed with the defined frequency to determine if the controls are effective in their application.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.12.2', cmmcId: 'CA.L2-3.12.2', domain: 'CA', name: 'Develop and implement plans of action designed to correct deficiencies and reduce or eliminate vulnerabilities in organizational systems.', deduction: -3, guidance: 'None',
            assessmentCriteria: [
                { id: '3.12.2[a]', text: 'deficiencies and vulnerabilities to be addressed by the plan of action are identified.', status: 'TBD', notes: '' },
                { id: '3.12.2[b]', text: 'a plan of action is developed to correct identified deficiencies and reduce or eliminate identified vulnerabilities.', status: 'TBD', notes: '' },
                { id: '3.12.2[c]', text: 'the plan of action is implemented to correct identified deficiencies and reduce or eliminate identified vulnerabilities.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.12.3', cmmcId: 'CA.L2-3.12.3', domain: 'CA', name: 'Monitor security controls on an ongoing basis to ensure the continued effectiveness of the controls.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.12.3', text: 'Determine if security controls are monitored on an ongoing basis to ensure the continued effectiveness of those controls.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.12.4', cmmcId: 'CA.L2-3.12.4', domain: 'CA', name: 'Develop, document, and periodically update system security plans that describe system boundaries, system environments of operation, how security requirements are implemented, and the relationships with or connections to other systems.', deduction: 0, guidance: 'The absence of a system security plan would result in a finding that ‘an assessment could not be completed due to incomplete information and noncompliance with DFARS clause 252.204-7012.’', // Deduction is N/A (0)
            assessmentCriteria: [
                { id: '3.12.4[a]', text: 'a system security plan is developed.', status: 'TBD', notes: '' },
                { id: '3.12.4[b]', text: 'the system boundary is described and documented in the system security plan.', status: 'TBD', notes: '' },
                { id: '3.12.4[c]', text: 'the system environment of operation is described and documented in the system security plan.', status: 'TBD', notes: '' },
                { id: '3.12.4[d]', text: 'the security requirements identified and approved by the designated authority as non-applicable are identified.', status: 'TBD', notes: '' },
                { id: '3.12.4[e]', text: 'the method of security requirement implementation is described and documented in the system security plan.', status: 'TBD', notes: '' },
                { id: '3.12.4[f]', text: 'the relationship with or connection to other systems is described and documented in the system security plan.', status: 'TBD', notes: '' },
                { id: '3.12.4[g]', text: 'the frequency to update the system security plan is defined.', status: 'TBD', notes: '' },
                { id: '3.12.4[h]', text: 'system security plan is updated with the defined frequency.', status: 'TBD', notes: '' }
            ]
         },

         // --- System and Communications Protection (SC) ---
         {
            nistId: '3.13.1', cmmcId: 'SC.L1-3.13.1', domain: 'SC', name: 'Monitor, control, and protect communications (i.e., information transmitted or received by organizational systems) at the external boundaries and key internal boundaries of organizational systems.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.1[a]', text: 'the external system boundary is defined.', status: 'TBD', notes: '' },
                { id: '3.13.1[b]', text: 'key internal system boundaries are defined.', status: 'TBD', notes: '' },
                { id: '3.13.1[c]', text: 'communications are monitored at the external system boundary.', status: 'TBD', notes: '' },
                { id: '3.13.1[d]', text: 'communications are monitored at key internal boundaries.', status: 'TBD', notes: '' },
                { id: '3.13.1[e]', text: 'communications are controlled at the external system boundary.', status: 'TBD', notes: '' },
                { id: '3.13.1[f]', text: 'communications are controlled at key internal boundaries.', status: 'TBD', notes: '' },
                { id: '3.13.1[g]', text: 'communications are protected at the external system boundary.', status: 'TBD', notes: '' },
                { id: '3.13.1[h]', text: 'communications are protected at key internal boundaries.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.2', cmmcId: 'SC.L2-3.13.2', domain: 'SC', name: 'Employ architectural designs, software development techniques, and systems engineering principles that promote effective information security within organizational systems.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.2[a]', text: 'architectural designs that promote effective information security are identified.', status: 'TBD', notes: '' },
                { id: '3.13.2[b]', text: 'software development techniques that promote effective information security are identified.', status: 'TBD', notes: '' },
                { id: '3.13.2[c]', text: 'systems engineering principles that promote effective information security are identified.', status: 'TBD', notes: '' },
                { id: '3.13.2[d]', text: 'identified architectural designs that promote effective information security are employed.', status: 'TBD', notes: '' },
                { id: '3.13.2[e]', text: 'identified software development techniques that promote effective information security are employed.', status: 'TBD', notes: '' },
                { id: '3.13.2[f]', text: 'identified systems engineering principles that promote effective information security are employed.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.3', cmmcId: 'SC.L2-3.13.3', domain: 'SC', name: 'Separate user functionality from system management functionality.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.3[a]', text: 'user functionality is identified.', status: 'TBD', notes: '' },
                { id: '3.13.3[b]', text: 'system management functionality is identified.', status: 'TBD', notes: '' },
                { id: '3.13.3[c]', text: 'user functionality is separated from system management functionality.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.4', cmmcId: 'SC.L2-3.13.4', domain: 'SC', name: 'Prevent unauthorized and unintended information transfer via shared system resources.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.4', text: 'Determine if unauthorized and unintended information transfer via shared system resources is prevented.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.5', cmmcId: 'SC.L1-3.13.5', domain: 'SC', name: 'Implement subnetworks for publicly accessible system components that are physically or logically separated from internal networks.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.5[a]', text: 'publicly accessible system components are identified.', status: 'TBD', notes: '' },
                { id: '3.13.5[b]', text: 'subnetworks for publicly accessible system components are physically or logically separated from internal networks.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.6', cmmcId: 'SC.L2-3.13.6', domain: 'SC', name: 'Deny network communications traffic by default and allow network communications traffic by exception (i.e., deny all, permit by exception).', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.6[a]', text: 'network communications traffic is denied by default.', status: 'TBD', notes: '' },
                { id: '3.13.6[b]', text: 'network communications traffic is allowed by exception.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.7', cmmcId: 'SC.L2-3.13.7', domain: 'SC', name: 'Prevent remote devices from simultaneously establishing non-remote connections with organizational systems and communicating via some other connection to resources in external networks (i.e., split tunneling).', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.7', text: 'Determine if remote devices are prevented from simultaneously establishing non-remote connections with the system and communicating via some other connection to resources in external networks (i.e., split tunneling).', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.8', cmmcId: 'SC.L2-3.13.8', domain: 'SC', name: 'Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission unless otherwise protected by alternative physical safeguards.', deduction: -3, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.8[a]', text: 'cryptographic mechanisms intended to prevent unauthorized disclosure of CUI are identified.', status: 'TBD', notes: '' },
                { id: '3.13.8[b]', text: 'alternative physical safeguards intended to prevent unauthorized disclosure of CUI are identified.', status: 'TBD', notes: '' },
                { id: '3.13.8[c]', text: 'either cryptographic mechanisms or alternative physical safeguards are implemented to prevent unauthorized disclosure of CUI during transmission.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.9', cmmcId: 'SC.L2-3.13.9', domain: 'SC', name: 'Terminate network connections associated with communications sessions at the end of the sessions or after a defined period of inactivity.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.9[a]', text: 'a period of inactivity to terminate network connections associated with communications sessions is defined.', status: 'TBD', notes: '' },
                { id: '3.13.9[b]', text: 'network connections associated with communications sessions are terminated at the end of the sessions.', status: 'TBD', notes: '' },
                { id: '3.13.9[c]', text: 'network connections associated with communications sessions are terminated after the defined period of inactivity.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.10', cmmcId: 'SC.L2-3.13.10', domain: 'SC', name: 'Establish and manage cryptographic keys for cryptography employed in organizational systems.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.10[a]', text: 'cryptographic keys are established whenever cryptography is employed.', status: 'TBD', notes: '' },
                { id: '3.13.10[b]', text: 'cryptographic keys are managed whenever cryptography is employed.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.11', cmmcId: 'SC.L2-3.13.11', domain: 'SC', name: 'Employ FIPS-validated cryptography when used to protect the confidentiality of CUI.', deduction: -5, guidance: 'Subtract 5 points if no cryptography is employed; 3 points if mostly not FIPS validated', // Using -5 as max potential deduction
            assessmentCriteria: [
                { id: '3.13.11', text: 'Determine if FIPS-validated cryptography is employed to protect the confidentiality of CUI.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.12', cmmcId: 'SC.L2-3.13.12', domain: 'SC', name: 'Prohibit remote activation of collaborative computing devices and provide indication of devices in use to users present at the device.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.12[a]', text: 'collaborative computing devices are identified.', status: 'TBD', notes: '' },
                { id: '3.13.12[b]', text: 'collaborative computing devices provide indication to users of devices in use.', status: 'TBD', notes: '' },
                { id: '3.13.12[c]', text: 'remote activation of collaborative computing devices is prohibited.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.13', cmmcId: 'SC.L2-3.13.13', domain: 'SC', name: 'Control and monitor the use of mobile code.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.13[a]', text: 'use of mobile code is controlled.', status: 'TBD', notes: '' },
                { id: '3.13.13[b]', text: 'use of mobile code is monitored.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.14', cmmcId: 'SC.L2-3.13.14', domain: 'SC', name: 'Control and monitor the use of Voice over Internet Protocol (VoIP) technologies.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.14[a]', text: 'use of Voice over Internet Protocol (VoIP) technologies is controlled.', status: 'TBD', notes: '' },
                { id: '3.13.14[b]', text: 'use of Voice over Internet Protocol (VoIP) technologies is monitored.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.15', cmmcId: 'SC.L2-3.13.15', domain: 'SC', name: 'Protect the authenticity of communications sessions.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.15', text: 'Determine if the authenticity of communications sessions is protected.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.13.16', cmmcId: 'SC.L2-3.13.16', domain: 'SC', name: 'Protect the confidentiality of CUI at rest.', deduction: -1, guidance: 'None',
            assessmentCriteria: [
                { id: '3.13.16', text: 'Determine if the confidentiality of CUI at rest is protected.', status: 'TBD', notes: '' }
            ]
         },

         // --- System and Information Integrity (SI) ---
         {
            nistId: '3.14.1', cmmcId: 'SI.L1-3.14.1', domain: 'SI', name: 'Identify, report, and correct system flaws in a timely manner.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.14.1[a]', text: 'the time within which to identify system flaws is specified.', status: 'TBD', notes: '' },
                { id: '3.14.1[b]', text: 'system flaws are identified within the specified time frame.', status: 'TBD', notes: '' },
                { id: '3.14.1[c]', text: 'the time within which to report system flaws is specified.', status: 'TBD', notes: '' },
                { id: '3.14.1[d]', text: 'system flaws are reported within the specified time frame.', status: 'TBD', notes: '' },
                { id: '3.14.1[e]', text: 'the time within which to correct system flaws is specified.', status: 'TBD', notes: '' },
                { id: '3.14.1[f]', text: 'system flaws are corrected within the specified time frame.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.14.2', cmmcId: 'SI.L1-3.14.2', domain: 'SI', name: 'Provide protection from malicious code at designated locations within organizational systems.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.14.2[a]', text: 'designated locations for malicious code protection are identified.', status: 'TBD', notes: '' },
                { id: '3.14.2[b]', text: 'protection from malicious code at designated locations is provided.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.14.3', cmmcId: 'SI.L2-3.14.3', domain: 'SI', name: 'Monitor system security alerts and advisories and take action in response.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.14.3[a]', text: 'response actions to system security alerts and advisories are identified.', status: 'TBD', notes: '' },
                { id: '3.14.3[b]', text: 'system security alerts and advisories are monitored.', status: 'TBD', notes: '' },
                { id: '3.14.3[c]', text: 'actions in response to system security alerts and advisories are taken.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.14.4', cmmcId: 'SI.L1-3.14.4', domain: 'SI', name: 'Update malicious code protection mechanisms when new releases are available.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.14.4', text: 'Determine if malicious code protection mechanisms are updated when new releases are available.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.14.5', cmmcId: 'SI.L1-3.14.5', domain: 'SI', name: 'Perform periodic scans of organizational systems and real-time scans of files from external sources as files are downloaded, opened, or executed.', deduction: -3, guidance: 'None',
            assessmentCriteria: [
                { id: '3.14.5[a]', text: 'the frequency for malicious code scans is defined.', status: 'TBD', notes: '' },
                { id: '3.14.5[b]', text: 'malicious code scans are performed with the defined frequency.', status: 'TBD', notes: '' },
                { id: '3.14.5[c]', text: 'real-time malicious code scans of files from external sources as files are downloaded, opened, or executed are performed.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.14.6', cmmcId: 'SI.L2-3.14.6', domain: 'SI', name: 'Monitor organizational systems, including inbound and outbound communications traffic, to detect attacks and indicators of potential attacks.', deduction: -5, guidance: 'None',
            assessmentCriteria: [
                { id: '3.14.6[a]', text: 'the system is monitored to detect attacks and indicators of potential attacks.', status: 'TBD', notes: '' },
                { id: '3.14.6[b]', text: 'inbound communications traffic is monitored to detect attacks and indicators of potential attacks.', status: 'TBD', notes: '' },
                { id: '3.14.6[c]', text: 'outbound communications traffic is monitored to detect attacks and indicators of potential attacks.', status: 'TBD', notes: '' }
            ]
         },
         {
            nistId: '3.14.7', cmmcId: 'SI.L2-3.14.7', domain: 'SI', name: 'Identify unauthorized use of organizational systems', deduction: -3, guidance: 'None',
            assessmentCriteria: [
                { id: '3.14.7[a]', text: 'authorized use of the system is defined.', status: 'TBD', notes: '' },
                { id: '3.14.7[b]', text: 'unauthorized use of the system is identified.', status: 'TBD', notes: '' }
            ]
         }
    ];


    // --- State Management ---
    let assets = [];
    let assessmentData = JSON.parse(JSON.stringify(cmmcControlsData_Default)); // Use deep copy for initial state

    // --- DOM Elements ---
    const assetForm = document.getElementById('asset-form');
    const assetTypeInput = document.getElementById('asset-type');
    const assetNameInput = document.getElementById('asset-name');
    const assetInScopeInput = document.getElementById('asset-in-scope');
    const assetsListUl = document.getElementById('assets');
    const assessmentControlsDiv = document.getElementById('assessment-controls');
    const domainFilterSelect = document.getElementById('domain-filter'); // Domain filter dropdown
    const summaryStatsDiv = document.getElementById('summary-stats');
    const summaryGapsUl = document.getElementById('summary-gaps').querySelector('ul');
    const summaryNAUl = document.getElementById('summary-na').querySelector('ul');
    const generateReportBtn = document.getElementById('generate-report-btn');
    const clearDataBtn = document.getElementById('clear-data-btn');
    const reportOutputDiv = document.getElementById('report-output');
    const summaryChartCanvas = document.getElementById('summaryChart'); // Chart canvas element
    const toggleAllControlsBtn = document.getElementById('toggle-all-controls-btn'); // Toggle button
    let summaryChartInstance = null; // Variable to hold the chart instance

    // --- API Endpoints ---
    const API_BASE = '/assessment/api';
    const LOAD_URL = `${API_BASE}/load/2`;
    const SAVE_URL = `${API_BASE}/save`;
    const SPRS_URL = `${API_BASE}/sprs/2`;
    const REPORT_URL = `${API_BASE}/generate-report`; // POST request with level
    const SPRS_REPORT_URL = `${API_BASE}/sprs-report/2`; // GET request

    // --- Utility Functions ---
    function escapeHtml(unsafe) {
        if (unsafe === null || typeof unsafe === 'undefined') return '';
        try {
             return unsafe.toString()
                 .replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
        } catch (e) {
            console.error("Error escaping HTML for:", unsafe, e);
            return ''; // Return empty string on error
        }
    }

     function getStatusClass(status) {
         switch(status) {
             case 'Met': return 'status-Met';
             case 'Gap': return 'status-Gap';
             case 'N/A': return 'status-NA';
             default: return 'status-TBD'; // TBD or Not Assessed
         }
     }
     function getStatusDisplay(status) {
         switch(status) {
             case 'Met': return 'Met';
             case 'Gap': return 'Gap';
             case 'N/A': return 'N/A';
             default: return 'Not Assessed';
         }
     }

     // Helper to find a specific criterion in the assessment data
    function findCriterion(criterionId) {
        for (const control of assessmentData) {
            // Ensure assessmentCriteria exists and is an array
            if (Array.isArray(control.assessmentCriteria)) {
                const criterion = control.assessmentCriteria.find(crit => crit.id === criterionId);
                if (criterion) {
                    return { control, criterion };
                }
            } else {
                 // console.warn(`Control ${control.nistId} is missing assessmentCriteria array.`);
            }
        }
        return null; // Not found
    }


     // Helper to find a control by its NIST ID
     function findControl(nistId) {
         return assessmentData.find(control => control.nistId === nistId);
    }


    // --- Core Functions ---

    // Load data from backend API
    async function loadData() {
        try {
            const response = await fetch(LOAD_URL);
            if (!response.ok) {
                if (response.status === 404) {
                    console.log("No existing Level 2 assessment found for user. Using defaults.");
                    assets = [];
                    assessmentData = JSON.parse(JSON.stringify(cmmcControlsData_Default));
                    return; // Exit function, use defaults
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            assets = data.assets || [];
            // Merge loaded controls with defaults to ensure all controls/criteria are present
            const loadedControls = data.controls || [];
            assessmentData = cmmcControlsData_Default.map(defaultControl => {
                const savedControl = loadedControls.find(c => c.nistId === defaultControl.nistId);
                if (savedControl && Array.isArray(defaultControl.assessmentCriteria)) {
                    const mergedCriteria = defaultControl.assessmentCriteria.map(defaultCrit => {
                        const savedCrit = Array.isArray(savedControl.assessmentCriteria)
                            ? savedControl.assessmentCriteria.find(sc => sc.id === defaultCrit.id)
                            : null;
                        return savedCrit
                            ? { ...defaultCrit, status: savedCrit.status || 'TBD', notes: savedCrit.notes || '' }
                            : defaultCrit;
                    });
                    // Keep default name, deduction, guidance etc., only update criteria
                    return { ...defaultControl, assessmentCriteria: mergedCriteria };
                } else {
                    return defaultControl; // Use default if not found or default has no criteria
                }
            });
        } catch (error) {
            console.error("Error loading Level 2 assessment data:", error);
            alert("Failed to load Level 2 assessment data. Using default values. Please check your connection or contact support.");
            // Fallback to defaults on error
            assets = [];
            assessmentData = JSON.parse(JSON.stringify(cmmcControlsData_Default));
        }
    }

    // Save data to backend API (debounced)
    let saveDebounceTimer;
    function scheduleSaveData() {
         clearTimeout(saveDebounceTimer);
         saveDebounceTimer = setTimeout(async () => {
            try {
                const payload = {
                    level: 2,
                    assets: assets,
                    // Save only essential data for controls and criteria
                    controls: assessmentData.map(control => ({
                        nistId: control.nistId, // Include nistId for matching on backend/load
                        cmmcId: control.cmmcId, // Include cmmcId for reference
                        deduction: control.deduction, // Include deduction for SPRS calculation on backend
                        assessmentCriteria: Array.isArray(control.assessmentCriteria)
                            ? control.assessmentCriteria.map(crit => ({
                                id: crit.id,
                                status: crit.status,
                                notes: crit.notes
                              }))
                            : []
                    }))
                };
                const response = await fetch(SAVE_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add CSRF token header if needed
                        // 'X-CSRFToken': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // console.log("Level 2 assessment data saved successfully.");
                // Optionally show a subtle save indicator
            } catch (error) {
                console.error("Error saving Level 2 assessment data:", error);
                alert("Failed to save Level 2 assessment data. Please check your connection or contact support. Your latest changes might not be saved.");
            }
         }, 1500); // Save 1.5 seconds after the last change
    }


    function renderAssets() {
        assetsListUl.innerHTML = '';
        if (assets.length === 0) {
            assetsListUl.innerHTML = '<li>No assets added yet.</li>';
        } else {
            // Sort assets for consistent display
            assets.sort((a, b) => a.name.localeCompare(b.name));
            assets.forEach(asset => {
                const li = document.createElement('li');
                li.dataset.id = asset.id; // Use ID from backend if available, else temp ID
                li.className = asset.inScope ? 'in-scope' : '';
                li.innerHTML = `
                    <div class="asset-info">
                        <span class="asset-type">[${escapeHtml(asset.type)}]</span>
                        <span>${escapeHtml(asset.name)}</span>
                        <span class="asset-scope-label">${asset.inScope ? '<strong>(In Scope)</strong>' : '(Out of Scope)'}</span>
                    </div>
                    <button class="remove-btn" data-id="${asset.id}">Remove</button>
                `;
                assetsListUl.appendChild(li);
            });
        }
        updateSummary(); // Update summary when assets change
    }

    function addAsset(event) {
        event.preventDefault();
        const type = assetTypeInput.value;
        const name = assetNameInput.value.trim();
        const inScope = assetInScopeInput.checked;
        if (!name) { alert("Please enter an asset name."); return; }
        // Use temporary ID for immediate UI update/removal
        const newAsset = { id: `temp-${Date.now()}`, type, name, inScope };
        assets.push(newAsset);
        assetNameInput.value = ''; assetInScopeInput.checked = false; assetTypeInput.value = 'Hardware';
        renderAssets(); // Update UI
        scheduleSaveData(); // Schedule save to backend
    }

    function removeAsset(id) {
        assets = assets.filter(asset => asset.id !== id);
        renderAssets(); // Update UI
        scheduleSaveData(); // Schedule save to backend
    }

    function populateDomainFilter() {
        domainFilterSelect.innerHTML = '<option value="ALL">All Domains</option>'; // Reset and add 'All' option
        cmmcDomains.forEach(domain => {
            const option = document.createElement('option');
            option.value = domain.id;
            option.textContent = `${domain.id} - ${domain.name}`;
            domainFilterSelect.appendChild(option);
        });
    }

    function renderControls() {
         assessmentControlsDiv.innerHTML = ''; // Clear current controls
         const selectedDomain = domainFilterSelect.value;

         cmmcDomains.forEach(domain => {
             // Filter controls based on the selected domain in the dropdown
             const domainControls = assessmentData.filter(c => c.domain === domain.id);
             if (domainControls.length === 0) return; // Skip domains with no controls

             const details = document.createElement('details');
             details.dataset.domainId = domain.id; // Add data attribute for easier targeting
             // Hide details if a specific domain is selected and it's not the current one
             if (selectedDomain !== 'ALL' && selectedDomain !== domain.id) {
                 details.style.display = 'none';
             }

             const summary = document.createElement('summary');
             const domainTitle = document.createElement('span');
             domainTitle.textContent = `${domain.id} - ${domain.name}`;
             summary.appendChild(domainTitle);

            const domainStatusSpan = document.createElement('span');
            domainStatusSpan.className = 'domain-status';
            domainStatusSpan.id = `domain-status-${domain.id}`; // ID to update it later
            summary.appendChild(domainStatusSpan);

             details.appendChild(summary);

             // Container for control blocks within this domain
             const controlsContainer = document.createElement('div');

             domainControls.forEach(control => {
                 const controlBlock = document.createElement('div');
                 controlBlock.className = 'control-block';
                 // Check if assessmentCriteria exists and is an array before mapping
                 const criteriaHTML = Array.isArray(control.assessmentCriteria)
                    ? control.assessmentCriteria.map(criterion => `
                        <tr data-criterion-id="${criterion.id}">
                            <td>${criterion.id}</td>
                            <td>${escapeHtml(criterion.text)}</td>
                            <td>
                                <select class="status-select ${getStatusClass(criterion.status)}" data-criterion-id="${criterion.id}">
                                    <option value="TBD" ${criterion.status === 'TBD' ? 'selected' : ''}>Not Assessed</option>
                                    <option value="Met" ${criterion.status === 'Met' ? 'selected' : ''}>Met</option>
                                    <option value="Gap" ${criterion.status === 'Gap' ? 'selected' : ''}>Gap</option>
                                    <option value="N/A" ${criterion.status === 'N/A' ? 'selected' : ''}>Not Applicable</option>
                                </select>
                            </td>
                            <td>
                                <textarea class="notes-input" data-criterion-id="${criterion.id}" placeholder="Implementation details, evidence location...">${escapeHtml(criterion.notes)}</textarea>
                            </td>
                        </tr>
                    `).join('')
                    : '<tr><td colspan="4"><i>No assessment criteria defined for this control.</i></td></tr>'; // Fallback message

                 controlBlock.innerHTML = `
                    <div class="control-header">
                        <div>
                             <span class="control-id">${control.cmmcId} (${control.nistId})</span>
                             <h4>${escapeHtml(control.name)}</h4>
                        </div>
                        <span class="control-deduction">(${control.deduction} pts if Gap)</span>
                    </div>
                    ${control.guidance && control.guidance.toLowerCase() !== 'none' ? `<div class="control-guidance"><strong>Guidance:</strong> ${escapeHtml(control.guidance)}</div>` : ''}
                    ${Array.isArray(control.assessmentCriteria) && control.assessmentCriteria.length > 0 ? `
                        <table class="criteria-table">
                            <thead>
                                 <tr><th>Criteria ID</th><th>Assessment Criterion</th><th>Status</th><th>Notes / Evidence</th></tr>
                            </thead>
                            <tbody>
                                ${criteriaHTML}
                            </tbody>
                        </table>
                        ` : '<p><i>No specific assessment criteria listed. Assess overall control implementation.</i></p>' // Message if no criteria array
                    }
                 `;
                 controlsContainer.appendChild(controlBlock);
             });

             details.appendChild(controlsContainer);
             assessmentControlsDiv.appendChild(details);
         });
         updateAllDomainStatuses(); // Initial status update for all domains
         updateSummary();
     }

     function filterControlsByDomain() {
        const selectedDomain = domainFilterSelect.value;
        const allDetails = assessmentControlsDiv.querySelectorAll('details');

        allDetails.forEach(details => {
            const domainId = details.dataset.domainId;
            if (selectedDomain === 'ALL' || selectedDomain === domainId) {
                details.style.display = 'block'; // Show matching or all
            } else {
                details.style.display = 'none'; // Hide non-matching
                details.removeAttribute('open'); // Also close non-matching domains
            }
        });

        // Optional: Automatically open the first visible details if a specific domain is selected
        if (selectedDomain !== 'ALL') {
            const firstVisible = assessmentControlsDiv.querySelector(`details[data-domain-id="${selectedDomain}"]`);
            if (firstVisible) {
                firstVisible.setAttribute('open', '');
                // Close others (redundant with above, but ensures single expansion)
                allDetails.forEach(details => {
                    if (details !== firstVisible) {
                        details.removeAttribute('open');
                    }
                });
            }
        }
     }


     function updateCriterionStatus(criterionId, status) {
         const found = findCriterion(criterionId);
         if (found && found.criterion) { // Check if criterion exists
             found.criterion.status = status;
             updateSummary(); // Recalculate summary & fetch SPRS score
             updateDomainStatus(found.control.domain); // Update specific domain status indicator
             scheduleSaveData(); // Schedule save to backend

             // Update select style dynamically
            const selectElement = assessmentControlsDiv.querySelector(`select[data-criterion-id="${criterionId}"]`);
            if (selectElement) {
                selectElement.className = `status-select ${getStatusClass(status)}`;
            }
         } else {
            console.warn(`Criterion with ID ${criterionId} not found for status update.`);
         }
     }

    function updateCriterionNotes(criterionId, notes) {
         const found = findCriterion(criterionId);
         if (found && found.criterion) { // Check if criterion exists
             found.criterion.notes = notes;
             // Debounced save is handled by the input event listener
             // scheduleSaveData(); // No need to call here, handled by listener
         } else {
             console.warn(`Criterion with ID ${criterionId} not found for notes update.`);
         }
     }

     function updateDomainStatus(domainId) {
         const domainControls = assessmentData.filter(c => c.domain === domainId);
         let totalCriteria = 0;
         let assessedCriteria = 0;
         let metCriteria = 0;
         let gapCriteria = 0;
         let naCriteria = 0;

         domainControls.forEach(control => {
             // Check if assessmentCriteria exists and is an array
             if (Array.isArray(control.assessmentCriteria)) {
                 totalCriteria += control.assessmentCriteria.length;
                 control.assessmentCriteria.forEach(crit => {
                     if (crit.status !== 'TBD') {
                         assessedCriteria++;
                         if (crit.status === 'Met') metCriteria++;
                         else if (crit.status === 'Gap') gapCriteria++;
                         else if (crit.status === 'N/A') naCriteria++;
                     }
                 });
             }
         });

         if (totalCriteria === 0) return; // Avoid division by zero or meaningless status

         const statusText = `(${assessedCriteria}/${totalCriteria} Assessed: ${metCriteria} Met, ${gapCriteria} Gaps, ${naCriteria} N/A)`;
         const statusSpan = document.getElementById(`domain-status-${domainId}`);
         if (statusSpan) {
             statusSpan.textContent = statusText;
         }
    }


    function updateAllDomainStatuses() {
        cmmcDomains.forEach(domain => updateDomainStatus(domain.id));
    }

     // Function to check if a control is exempt from scoring based on guidance
    function isControlExempt(control) {
        // Remote Access Controls
        if (['3.1.12', '3.1.13', '3.1.14', '3.1.15', '3.7.5'].includes(control.nistId)) {
            const remoteAccessControl = findControl('3.1.12');
            if (remoteAccessControl && Array.isArray(remoteAccessControl.assessmentCriteria)) {
                const permissionCriterion = remoteAccessControl.assessmentCriteria.find(c => c.id === '3.1.12[a]');
                // If remote access is NOT permitted (N/A), exempt related controls
                if (permissionCriterion && permissionCriterion.status === 'N/A') {
                    return true;
                }
            }
        }
        // Wireless Controls
        if (['3.1.16', '3.1.17'].includes(control.nistId)) {
            const wirelessAccessControl = findControl('3.1.16');
             if (wirelessAccessControl && Array.isArray(wirelessAccessControl.assessmentCriteria)) {
                 const permissionCriterion = wirelessAccessControl.assessmentCriteria.find(c => c.id === '3.1.16[b]');
                 // If wireless access is NOT authorized (N/A), exempt related controls
                 if (permissionCriterion && permissionCriterion.status === 'N/A') {
                     return true;
                 }
             }
        }
         // Mobile Device Controls
         if (['3.1.18', '3.1.19'].includes(control.nistId)) {
             const mobileConnectionControl = findControl('3.1.18');
             if (mobileConnectionControl && Array.isArray(mobileConnectionControl.assessmentCriteria)) {
                 const connectionCriterion = mobileConnectionControl.assessmentCriteria.find(c => c.id === '3.1.18[b]');
                 // If mobile connections are NOT authorized (N/A), exempt controls
                 if (connectionCriterion && connectionCriterion.status === 'N/A') {
                     return true;
                 }
             }
         }
        // Add more exemption logic here based on other guidance notes if needed

         return false; // Not exempt by default
     }

    // Fetch SPRS score from backend
    async function fetchSprsScore() {
        try {
            const response = await fetch(SPRS_URL);
            if (!response.ok) {
                // Handle 404 specifically - might mean no assessment saved yet
                if (response.status === 404) {
                    console.log("SPRS calculation skipped: No assessment data found on server.");
                    return null; // Indicate no score available
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.status === 'success') {
                return data.score;
            } else {
                console.error("Error fetching SPRS score from backend:", data.message);
                return null; // Indicate error
            }
        } catch (error) {
            console.error("Network error fetching SPRS score:", error);
            return null; // Indicate error
        }
    }


     async function updateSummary() { // Make async to await fetchSprsScore
         const totalAssets = assets.length;
         const inScopeAssets = assets.filter(a => a.inScope).length;

         let totalCriteria = 0;
         let criteriaMet = 0;
         let criteriaGap = 0;
         let criteriaNA = 0;
         let criteriaTBD = 0;
         let controlsWithGaps = 0;
         let controlsNA = 0; // Controls where ALL criteria are N/A

         const gapControlList = [];
         const naControlList = [];

         assessmentData.forEach(control => {
             let controlHasGap = false;
             let controlAllNA = true; // Assume all N/A initially
             let controlHasAssessedCriteria = false; // Check if at least one criterion is assessed

             // Ensure assessmentCriteria exists and is an array
             if (Array.isArray(control.assessmentCriteria)) {
                 totalCriteria += control.assessmentCriteria.length;
                 control.assessmentCriteria.forEach(crit => {
                     if (crit.status === 'Met') criteriaMet++;
                     else if (crit.status === 'Gap') { criteriaGap++; controlHasGap = true; }
                     else if (crit.status === 'N/A') criteriaNA++;
                     else criteriaTBD++; // TBD

                     if (crit.status !== 'N/A') controlAllNA = false;
                     if (crit.status !== 'TBD') controlHasAssessedCriteria = true;
                 });

                 if (controlHasGap) {
                    controlsWithGaps++;
                    const deduction = isControlExempt(control) ? 0 : control.deduction;
                    gapControlList.push({ id: control.cmmcId, nist: control.nistId, deduction: deduction });
                 }
                 // Only count control as N/A if it has at least one assessed criterion, and all of those are N/A
                 if (controlAllNA && controlHasAssessedCriteria) {
                    controlsNA++;
                    naControlList.push({ id: control.cmmcId, nist: control.nistId });
                 }
             }
         });

         const assessedCriteriaCount = criteriaMet + criteriaGap + criteriaNA;
         const completionPercentage = totalCriteria > 0 ? Math.round((assessedCriteriaCount / totalCriteria) * 100) : 0;
         const sprsScore = await fetchSprsScore(); // Fetch score from backend

         summaryStatsDiv.innerHTML = `
            <p><strong>Asset Scope:</strong> ${inScopeAssets} In Scope / ${totalAssets} Total Assets</p>
            <hr>
            <p><strong>Criteria Assessment:</strong> ${assessedCriteriaCount} of ${totalCriteria} Assessed (${completionPercentage}%)</p>
            <p><strong class="${getStatusClass('Met')}">Met Criteria:</strong> ${criteriaMet}</p>
            <p><strong class="${getStatusClass('Gap')}">Gap Criteria:</strong> ${criteriaGap} (across ${controlsWithGaps} controls)</p>
            <p><strong class="${getStatusClass('NA')}">N/A Criteria:</strong> ${criteriaNA} (${controlsNA} controls fully N/A)</p>
            <p><strong class="${getStatusClass('TBD')}">Not Assessed Criteria:</strong> ${criteriaTBD}</p>
            <hr>
            <p><strong>SPRS Score:</strong> <span class="sprs-score">${sprsScore !== null ? sprsScore : 'Calculating...'}</span></p>
            <p style="font-size: 0.8em; color: #666;">(Calculated by backend based on saved assessment data. Min score: -203)</p>
            ${sprsScore === null ? '<p style="font-size: 0.8em; color: #dc3545;">Could not retrieve score. Ensure assessment is saved.</p>' : ''}
        `;

         // Update Gap List Summary
         summaryGapsUl.innerHTML = '';
          if (gapControlList.length === 0) {
             summaryGapsUl.innerHTML = '<li>No controls with gaps identified yet.</li>';
          } else {
              gapControlList.sort((a,b) => a.nist.localeCompare(b.nist, undefined, {numeric: true})); // Sort by NIST ID
              gapControlList.forEach(c => {
                 const deductionText = c.deduction !== 0 ? `(${c.deduction} pts)` : '(0 pts - Exempt)';
                 summaryGapsUl.innerHTML += `<li>${c.id} (${c.nist}) ${deductionText}</li>`;
             });
          }

         // Update N/A List Summary
         summaryNAUl.innerHTML = '';
           if (naControlList.length === 0) {
             summaryNAUl.innerHTML = '<li>No controls fully marked N/A yet.</li>';
           } else {
               naControlList.sort((a,b) => a.nist.localeCompare(b.nist, undefined, {numeric: true})); // Sort by NIST ID
               naControlList.forEach(c => {
                 summaryNAUl.innerHTML += `<li>${c.id} (${c.nist})</li>`;
             });
           }
        updateAllDomainStatuses(); // Ensure domain summaries updated with counts

        // --- Update Summary Chart ---
        if (summaryChartInstance) {
            summaryChartInstance.destroy(); // Destroy previous chart instance
        }
        if (summaryChartCanvas) { // Ensure canvas element exists
            const ctx = summaryChartCanvas.getContext('2d');
            summaryChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Met', 'Gap', 'N/A', 'Not Assessed'],
                    datasets: [{
                        label: 'Criteria Status',
                        data: [criteriaMet, criteriaGap, criteriaNA, criteriaTBD],
                        backgroundColor: [
                            '#198754', // --status-met (Bootstrap green)
                            '#dc3545', // --status-gap (Bootstrap red)
                            '#6c757d', // --status-na (Bootstrap secondary)
                            '#ffc107'  // --status-tbd (Bootstrap warning)
                        ],
                        borderColor: [
                            '#ffffff',
                            '#ffffff',
                            '#ffffff',
                            '#ffffff'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Allow chart to fill container height
                    plugins: {
                        legend: {
                            position: 'bottom', // Position legend at the bottom
                            labels: {
                                padding: 15 // Add padding to legend items
                            }
                        },
                        title: {
                            display: true,
                            text: 'Assessment Criteria Status',
                            padding: {
                                top: 10,
                                bottom: 10
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = total > 0 ? Math.round((context.parsed / total) * 100) : 0;
                                        label += `${context.parsed} (${percentage}%)`;
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        } else {
            console.error("Summary chart canvas element not found.");
         }
     }

      async function generateReport() { // Added async keyword here
         const reportDate = new Date().toLocaleString();
         const totalAssets = assets.length;
         const inScopeAssetsList = assets.filter(a => a.inScope);

         let totalCriteria = 0;
         let criteriaMet = 0;
         let criteriaGap = 0;
         let criteriaNA = 0;
         let criteriaTBD = 0;
         let controlsWithGaps = 0;
         let controlsNA = 0;
         const gapControlList = [];
         const naControlList = [];

         assessmentData.forEach(control => {
             let controlHasGap = false;
             let controlAllNA = true;
             let controlHasAssessed = false;
             // Ensure assessmentCriteria exists and is an array
             if (Array.isArray(control.assessmentCriteria)) {
                 totalCriteria += control.assessmentCriteria.length;
                 control.assessmentCriteria.forEach(crit => {
                     if (crit.status === 'Met') criteriaMet++;
                     else if (crit.status === 'Gap') { criteriaGap++; controlHasGap = true; }
                     else if (crit.status === 'N/A') criteriaNA++;
                     else criteriaTBD++;
                     if (crit.status !== 'N/A') controlAllNA = false;
                     if (crit.status !== 'TBD') controlHasAssessed = true;
                 });
                  if (controlHasGap) {
                    controlsWithGaps++;
                    const deduction = isControlExempt(control) ? 0 : control.deduction;
                    gapControlList.push({ id: control.cmmcId, nist: control.nistId, name: control.name, deduction: deduction });
                 }
                 if (controlAllNA && controlHasAssessed) {
                    controlsNA++;
                    naControlList.push({ id: control.cmmcId, nist: control.nistId, name: control.name });
                 }
             }
         });

         const assessedCriteriaCount = criteriaMet + criteriaGap + criteriaNA;
         const completionPercentage = totalCriteria > 0 ? Math.round((assessedCriteriaCount / totalCriteria) * 100) : 0;
         // Fetch SPRS score again for the report context, or use the one from summary if timing is okay
         const sprsScoreForReport = await fetchSprsScore(); // Fetch fresh score

         // Sort lists for report
         gapControlList.sort((a,b) => a.nist.localeCompare(b.nist, undefined, {numeric: true}));
         naControlList.sort((a,b) => a.nist.localeCompare(b.nist, undefined, {numeric: true}));

         // Create the report HTML content
         let reportHTML = `
             <!DOCTYPE html>
             <html lang="en">
             <head>
                 <meta charset="UTF-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <title>CMMC Level 2 Gap Assessment Report</title>
                 <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                 <style>
                     body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f7f9; color: #333; }
                     .container { max-width: 1000px; margin: 20px auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                     h2, h3, h4 { color: #1a5276; border-bottom: 2px solid #aed6f1; padding-bottom: 5px; margin-top: 30px; }
                     h2 { font-size: 1.8em; text-align: center; border-bottom: none; margin-bottom: 20px; }
                     h3 { font-size: 1.4em; }
                     h4 { font-size: 1.1em; color: #1f618d; border-bottom: 1px dashed #aed6f1; }
                     .report-meta { color: #555; font-style: italic; text-align: center; margin-bottom: 25px; }
                     .report-sprs { background: #eaf2f8; padding: 15px 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #aed6f1; }
                     .report-sprs .score { font-size: 1.5em; font-weight: bold; color: #154360; }
                     .report-sprs .explanation { font-size: 0.85em; color: #566573; margin-top: 8px; }
                     .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
                     .summary-item p { margin: 5px 0; }
                     .summary-item strong { display: inline-block; min-width: 120px; }
                     .report-control-block { border: 1px solid #d6eaf8; padding: 15px; margin-bottom: 20px; border-radius: 6px; background-color: #fdfefe; }
                     .report-control-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; font-weight: bold; color: #1a5276; }
                     .report-control-header span:first-child { flex-grow: 1; margin-right: 15px; }
                     .report-control-header .status-gap { color: #c0392b; font-weight: bold; }
                     .report-criteria-table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 0.9em; }
                     .report-criteria-table th, .report-criteria-table td { border: 1px solid #d6eaf8; padding: 10px; text-align: left; vertical-align: top; }
                     .report-criteria-table th { background-color: #eaf2f8; font-weight: bold; }
                     .report-criteria-table tr:nth-child(even) { background-color: #f8f9fa; }
                     .report-notes { max-height: 150px; overflow-y: auto; font-size: 0.9em; color: #555; white-space: pre-wrap; word-wrap: break-word; }
                     .status-Met { color: #28a745; font-weight: bold; }
                     .status-Gap { color: #dc3545; font-weight: bold; }
                     .status-NA { color: #6c757d; font-style: italic; }
                     .status-TBD { color: #ffc107; font-weight: bold; }
                     .print-button { background: #2e86c1; color: white; border: none; padding: 12px 20px; cursor: pointer; border-radius: 5px; margin: 25px 5px 10px; font-size: 1em; transition: background-color 0.3s ease; }
                     .print-button:hover { background: #1f618d; }
                     ul { padding-left: 25px; list-style: disc; }
                     li { margin-bottom: 8px; }
                     hr { border: 0; border-top: 1px solid #d6eaf8; margin: 30px 0; }
                     .chart-container { max-width: 450px; margin: 30px auto; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #d6eaf8; }
                     @media print {
                         body { background-color: #fff; color: #000; margin: 0; padding: 0; font-size: 10pt; }
                         .container { max-width: 100%; margin: 0; padding: 10px; border-radius: 0; box-shadow: none; border: none; }
                         .print-button { display: none; }
                         .report-control-block { break-inside: avoid; page-break-inside: avoid; border: 1px solid #ccc; margin-bottom: 15px; padding: 10px; }
                         h2, h3, h4 { break-after: avoid; page-break-after: avoid; color: #000; border-color: #ccc; }
                         .report-sprs { background: #eee; border: 1px solid #ccc; }
                         .report-criteria-table th, .report-criteria-table td { border: 1px solid #ccc; padding: 6px; }
                         .report-criteria-table th { background-color: #eee; }
                         .report-criteria-table tr:nth-child(even) { background-color: #f9f9f9; }
                         .chart-container { display: none; } /* Hide chart when printing */
                         a { text-decoration: none; color: #000; }
                     }
                 </style>
             </head>
             <body>
                 <div class="container">
                     <h2>CMMC Level 2 Gap Assessment Report</h2>
                     <p class="report-meta">Generated on: ${reportDate}</p>
                     <div style="text-align: center;">
                         <button class="print-button" onclick="window.print()">Print / Save as PDF</button>
                     </div>

                     <h3>Scoping Summary</h3>
                     <p>Total Assets Logged: ${totalAssets}</p>
                     <p>Assets In Scope (Handling CUI/FCI): ${inScopeAssetsList.length}</p>
             `;
             if (inScopeAssetsList.length > 0) {
                reportHTML += `<h4>In-Scope Assets:</h4><ul>`;
                inScopeAssetsList.forEach(asset => {
                    reportHTML += `<li>[${escapeHtml(asset.type)}] ${escapeHtml(asset.name)}</li>`;
                });
                reportHTML += `</ul>`;
             } else { reportHTML += `<p><em>No assets marked as In Scope.</em></p>`; }

             reportHTML += `
                 <h3>Assessment Summary</h3>
                 <div class="report-sprs">
                     SPRS Score: <span class="score">${sprsScoreForReport !== null ? sprsScoreForReport : 'N/A'}</span>
                     <p class="explanation">Score calculated by the backend based on saved assessment data. Minimum score is -203.</p>
                 </div>
                 <div class="summary-grid">
                     <div class="summary-item">
                         <p><strong>Assessment Progress:</strong> ${assessedCriteriaCount} / ${totalCriteria} (${completionPercentage}%)</p>
                     </div>
                     <div class="summary-item">
                         <p><strong class="${getStatusClass('Met')}">Met Criteria:</strong> ${criteriaMet}</p>
                     </div>
                     <div class="summary-item">
                         <p><strong class="${getStatusClass('Gap')}">Gap Criteria:</strong> ${criteriaGap} (in ${controlsWithGaps} controls)</p>
                     </div>
                     <div class="summary-item">
                         <p><strong class="${getStatusClass('NA')}">N/A Criteria:</strong> ${criteriaNA} (${controlsNA} controls fully N/A)</p>
                     </div>
                     <div class="summary-item">
                         <p><strong class="${getStatusClass('TBD')}">Not Assessed:</strong> ${criteriaTBD}</p>
                     </div>
                 </div>

                 <div class="chart-container">
                     <canvas id="summaryChart"></canvas>
                 </div>

                 <h3>Identified Gaps (Controls with Deficient Criteria)</h3>
             `;
             if (gapControlList.length > 0) {
                 reportHTML += `<ul>`;
                 gapControlList.forEach(control => {
                     const deductionText = control.deduction !== 0 ? `(${control.deduction} pts)` : '(0 pts - Exempt)';
                     reportHTML += `<li><strong>${control.id} (${control.nist}):</strong> ${escapeHtml(control.name)} <span class="${control.deduction !== 0 ? 'status-Gap' : ''}">${deductionText}</span></li>`;
                 });
                 reportHTML += `</ul>`;
             } else { reportHTML += `<p><em>No controls with gaps identified.</em></p>`; }

             reportHTML += `<h3>Not Applicable Controls (All Criteria N/A)</h3>`;
             if (naControlList.length > 0) {
                reportHTML += `<ul>`;
                naControlList.forEach(control => {
                     reportHTML += `<li><strong>${control.id} (${control.nist}):</strong> ${escapeHtml(control.name)}</li>`;
                 });
                reportHTML += `</ul>`;
             } else { reportHTML += `<p><em>No controls fully marked as Not Applicable.</em></p>`; }

             reportHTML += `<h3>Detailed Control Status by Domain</h3>`;

             cmmcDomains.forEach(domain => {
             const domainControls = assessmentData.filter(c => c.domain === domain.id)
                                                .sort((a,b) => a.nistId.localeCompare(b.nistId, undefined, {numeric: true})); // Sort controls within domain
             if (domainControls.length === 0) return;

             reportHTML += `<h4>${domain.id} - ${domain.name}</h4>`;

             domainControls.forEach(control => {
                 // Check if assessmentCriteria exists and is an array
                 if (!Array.isArray(control.assessmentCriteria)) {
                     reportHTML += `<div class="report-control-block">`;
                     reportHTML += `<div class="report-control-header"><span>${control.cmmcId} (${control.nistId}) - ${escapeHtml(control.name)}</span><span></span></div>`; // Empty span for alignment
                     reportHTML += `<p><i>Error: Assessment criteria data missing for this control.</i></p>`;
                     reportHTML += `</div>`;
                     return; // Skip to next control
                 }

                 const controlHasGap = control.assessmentCriteria.some(crit => crit.status === 'Gap');
                 const deductionAmount = controlHasGap ? (isControlExempt(control) ? 0 : control.deduction) : 0;
                 const deductionText = controlHasGap ? `(${deductionAmount} pts)` : '';

                 reportHTML += `<div class="report-control-block">`;
                 reportHTML += `<div class="report-control-header"><span>${control.cmmcId} (${control.nistId}) - ${escapeHtml(control.name)}</span><span class="${controlHasGap && deductionAmount !==0 ? 'status-Gap': ''}">${deductionText}</span></div>`;
                 if (control.guidance && control.guidance.toLowerCase() !== 'none') {
                    reportHTML += `<p style="font-size:0.85em; margin: -5px 0 10px 0; color: #566573;"><em>Guidance: ${escapeHtml(control.guidance)}</em></p>`;
                 }

                 if (control.assessmentCriteria.length > 0) {
                     reportHTML += `
                        <table class="report-criteria-table">
                            <thead><tr><th>ID</th><th>Criterion</th><th>Status</th><th>Notes</th></tr></thead>
                            <tbody>
                     `;
                     control.assessmentCriteria.forEach(criterion => {
                        const statusClass = getStatusClass(criterion.status);
                        const displayStatus = getStatusDisplay(criterion.status);
                         reportHTML += `
                             <tr>
                                 <td style="width: 10%;">${criterion.id}</td>
                                 <td style="width: 40%;">${escapeHtml(criterion.text)}</td>
                                 <td style="width: 15%;"><span class="${statusClass}">${displayStatus}</span></td>
                                 <td style="width: 35%;"><div class="report-notes">${escapeHtml(criterion.notes)}</div></td>
                             </tr>
                         `;
                     });
                     reportHTML += `</tbody></table>`;
                 } else {
                     reportHTML += `<p><i>No specific assessment criteria listed.</i></p>`;
                 }
                 reportHTML += `</div>`; // Close control-block
             });
         }); // End domain loop

         reportHTML += `
                     <hr>
                     <p style="text-align:center; font-size: 0.85em; color: #777;">End of Report</p>
                     <div style="text-align: center;">
                         <button class="print-button" onclick="window.print()">Print / Save as PDF</button>
                     </div>
                 </div> <!-- Close container -->

                 <script>
                     const ctx = document.getElementById('summaryChart').getContext('2d');
                     new Chart(ctx, {
                         type: 'doughnut',
                         data: {
                             labels: ['Met', 'Gap', 'N/A', 'Not Assessed'],
                             datasets: [{
                                 label: 'Criteria Status',
                                 data: [${criteriaMet}, ${criteriaGap}, ${criteriaNA}, ${criteriaTBD}],
                                 backgroundColor: [
                                     'rgba(40, 167, 69, 0.7)',  // Met (Green) - Adjusted color
                                     'rgba(220, 53, 69, 0.7)',  // Gap (Red) - Adjusted color
                                     'rgba(108, 117, 125, 0.7)', // N/A (Gray) - Adjusted color
                                     'rgba(255, 193, 7, 0.7)'    // TBD (Yellow) - Adjusted color
                                 ],
                                 borderColor: [
                                     'rgba(40, 167, 69, 1)',
                                     'rgba(220, 53, 69, 1)',
                                     'rgba(108, 117, 125, 1)',
                                     'rgba(255, 193, 7, 1)'
                                 ],
                                 borderWidth: 1,
                                 hoverOffset: 4
                             }]
                         },
                         options: {
                             responsive: true,
                             maintainAspectRatio: true,
                             plugins: {
                                 legend: {
                                     position: 'bottom',
                                 }, // Added comma
                                 title: {
                                     display: true,
                                     text: 'Assessment Criteria Status Summary',
                                     font: { size: 16 }
                                 },
                                 tooltip: {
                                     callbacks: {
                                         label: function(context) {
                                             let label = context.label || '';
                                             if (label) {
                                                 label += ': ';
                                             }
                                             if (context.parsed !== null) {
                                                 label += context.parsed;
                                                 const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                                 const percentage = total > 0 ? Math.round((context.parsed / total) * 100) : 0;
                                                 label += ' (' + percentage + '%)';
                                             }
                                             return label;
                                         }
                                     }
                                 }
                             }
                         }
                     });
                 <\/script>
             </body>
             </html>
             `;

        // Open the report in a new window/tab
        const reportWindow = window.open('', '_blank');
        if (reportWindow) {
            reportWindow.document.write(reportHTML);
            reportWindow.document.close();
            // Attempt to focus the new window, though browser behavior varies
            reportWindow.focus();
        } else {
            // If popup is blocked, show in the current page as fallback
            alert('Pop-up blocked. Please allow pop-ups for this site to open the report in a new tab.');
            reportOutputDiv.innerHTML = `
                <div style="padding: 20px; background: #f8f9fa; border: 1px solid #ddd; border-radius: 5px; margin: 15px 0;">
                    <h3>Report Generation Failed</h3>
                    <p>The report was generated, but your browser blocked it from opening in a new tab.</p>
                    <p>Please <strong>allow pop-ups</strong> for this page in your browser settings and click "Generate Detailed Report" again.</p>
                    <p>Alternatively, you can view a simplified version in this page (chart will be excluded):</p>
                    <button class="action-btn" id="show-report-here">Show Report Here (No Chart)</button>
                </div>
            `;
            reportOutputDiv.style.display = 'block'; // Ensure the fallback message area is visible
            reportOutputDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Add listener for the fallback button
            const showHereBtn = document.getElementById('show-report-here');
            if (showHereBtn) {
                showHereBtn.addEventListener('click', function() {
                    // Create a simplified version for the current page (remove script tags, head, etc.)
                    const inPageReport = reportHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
                                                .replace(/<head>.*?<\/head>/is, '') // Remove head
                                                .replace(/<\/?html.*?>/g, '') // Remove html tags
                                                .replace(/<\/?body.*?>/g, '') // Remove body tags
                                                .replace(/<!DOCTYPE.*?>/i, '') // Remove doctype
                                                .replace(/<div class="chart-container">.*?<\/div>/is, '<p><em>Chart is not available in this view.</em></p>'); // Remove chart container

                    reportOutputDiv.innerHTML = inPageReport;
                    reportOutputDiv.style.display = 'block';
                    reportOutputDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, { once: true }); // Ensure listener is added only once
            }
        }
         
     }

    // --- Toggle All Controls ---
    function toggleAllControls() {
        const allDetails = assessmentControlsDiv.querySelectorAll('details');
        let isAnyClosed = false;

        // Check only visible details based on the current filter
        allDetails.forEach(details => {
            if (details.style.display !== 'none' && !details.open) {
                isAnyClosed = true;
            }
        });

        const shouldOpen = isAnyClosed; // If any visible is closed, we should open all visible

        allDetails.forEach(details => {
            // Only toggle visible details
            if (details.style.display !== 'none') {
                if (shouldOpen) {
                    details.setAttribute('open', '');
                } else {
                    details.removeAttribute('open');
                }
            }
        });

        // Update button text
        toggleAllControlsBtn.textContent = shouldOpen ? 'Collapse All Controls' : 'Expand All Controls';
    }


     function clearAllData() {
         if (confirm("Are you sure you want to clear ALL Level 2 assets and assessment data for your account? This cannot be undone.")) {
            assets = [];
            assessmentData = JSON.parse(JSON.stringify(cmmcControlsData_Default)); // Reset controls data
            if (summaryChartInstance) { // Destroy chart on clear
                summaryChartInstance.destroy();
                summaryChartInstance = null;
            }
            renderAssets();
            domainFilterSelect.value = 'ALL'; // Reset filter
            renderControls(); // This also calls updateSummary
            reportOutputDiv.style.display = 'none';
            reportOutputDiv.innerHTML = '';
            // Close all details sections
            assessmentControlsDiv.querySelectorAll('details').forEach(details => {
                details.removeAttribute('open');
            });
            scheduleSaveData(); // Save the cleared state to the backend
            alert("Local data cleared. Saving empty state to server.");
         }
    }

    // --- Event Listeners ---
    assetForm.addEventListener('submit', addAsset);

    assetsListUl.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            removeAsset(event.target.dataset.id);
        }
    });

    // Domain Filter Listener
    domainFilterSelect.addEventListener('change', filterControlsByDomain);

    // Use event delegation for controls (Criteria Status and Notes)
    assessmentControlsDiv.addEventListener('change', (event) => {
        if (event.target.classList.contains('status-select')) {
            updateCriterionStatus(event.target.dataset.criterionId, event.target.value);
        }
    });

     // Debounced saving for notes input
     assessmentControlsDiv.addEventListener('input', (event) => {
         if (event.target.classList.contains('notes-input')) {
             const id = event.target.dataset.criterionId;
             const notes = event.target.value;
             updateCriterionNotes(id, notes); // Update state immediately
             scheduleSaveData(); // Schedule save (debounced)
         }
     });

    // Listener for single domain expansion (works alongside filtering)
    assessmentControlsDiv.addEventListener('toggle', (event) => {
        if (event.target.tagName === 'DETAILS' && event.target.open) {
            // Close all other *visible* details elements
            assessmentControlsDiv.querySelectorAll('details').forEach(details => {
                // Check if the details is currently visible before closing
                if (details !== event.target && details.style.display !== 'none') {
                    details.removeAttribute('open');
                }
            });
        }
    }, true); // Use capture phase


     generateReportBtn.addEventListener('click', generateReport);
     clearDataBtn.addEventListener('click', clearAllData);
     toggleAllControlsBtn.addEventListener('click', toggleAllControls); // Add listener for the toggle button

    // --- Initialization ---
    async function initializeApp() {
        await loadData(); // Load data first (asynchronously)
        populateDomainFilter(); // Populate the filter dropdown
        renderAssets();   // Render assets based on loaded data
        renderControls(); // Render controls based on loaded data (calls updateSummary)
    }

    initializeApp(); // Start the initialization process
});
