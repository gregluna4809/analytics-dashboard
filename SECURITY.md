# Security Documentation

## Overview
This document outlines the security controls and practices implemented in the Analytics Dashboard application, aligned with industry best practices and the NIST Cybersecurity Framework.

## Current Security Architecture

### Network Security

#### VPC Isolation
- **Implementation:** RDS database deployed in private VPC subnets
- **VPC ID:** vpc-0a9934f5fd526eb73
- **Benefit:** Database is not directly accessible from the internet
- **NIST Alignment:** PR.AC-5 (Network integrity is protected)

#### Security Groups
- **Security Group:** sg-07f8e5e39b6c2c687
- **Inbound Rules:** PostgreSQL (port 5432) from Lambda security group only
- **Outbound Rules:** Limited to necessary services
- **NIST Alignment:** PR.AC-3 (Remote access is managed)

#### Network Segmentation
- **Subnets:** 
  - subnet-002067f89a3e5fad2 (AZ 1)
  - subnet-06f348836099aef56 (AZ 2)
- **Public Accessibility:** Disabled for RDS
- **NIST Alignment:** PR.AC-5 (Network segmentation implemented)

### Access Control

#### IAM Roles
- **Lambda Execution Role:** Least privilege permissions
  - VPC network interface creation/deletion
  - CloudWatch Logs write permissions
  - RDS database access via security group
- **Principle:** Least privilege access
- **NIST Alignment:** PR.AC-4 (Access permissions managed)

### Data Security

#### Encryption in Transit
- **Database Connections:** SSL/TLS encryption enabled
- **API Communication:** HTTPS enforced via API Gateway
- **NIST Alignment:** PR.DS-2 (Data in transit is protected)

#### Application Security
- **SQL Injection Prevention:** Parameterized queries using PostgreSQL $1, $2 syntax
- **Input Validation:** Request body validation in Lambda handlers
- **NIST Alignment:** PR.DS-5 (Protections against data leaks)

### Monitoring & Detection

#### CloudWatch Monitoring
- ✅ Lambda function execution logs
- ✅ Automated alarms for Lambda errors (threshold: 5 errors/5min)
- ✅ Automated alarms for API Gateway 5xx errors (threshold: 10 errors/5min)
- **NIST Alignment:** DE.AE-3 (Event data aggregated), DE.CM-1 (Network monitored)

#### Logging
- **CloudWatch Logs:** All Lambda invocations logged
- **Retention:** Standard AWS retention
- **NIST Alignment:** PR.PT-1 (Audit logs maintained)

## Planned Security Enhancements

### High Priority
- [ ] **Enable RDS Encryption at Rest** - Protect data at rest using AWS KMS
- [ ] **AWS Secrets Manager** - Remove hardcoded credentials from deployment
- [ ] **API Gateway Access Logging** - Track all API requests
- [ ] **X-Ray Tracing** - Distributed tracing for debugging

### Medium Priority
- [ ] **AWS Cognito Authentication** - Replace demo user with real auth
- [ ] **AWS WAF** - Web Application Firewall for API protection
- [ ] **Rate Limiting** - Prevent abuse and control costs
- [ ] **VPC Flow Logs** - Network traffic analysis

### Long-term
- [ ] **Automated Security Scanning** - SAST/DAST in CI/CD
- [ ] **Penetration Testing** - Regular security assessments
- [ ] **SOC 2 Compliance** - If pursuing enterprise clients

## NIST Cybersecurity Framework Mapping

| Function | Category | Status | Implementation |
|----------|----------|--------|----------------|
| Identify | Asset Management | ✅ Complete | AWS resources documented |
| Protect | Access Control | ✅ Complete | IAM, Security Groups, VPC |
| Protect | Data Security | ⚠️ Partial | Encryption in transit (at-rest pending) |
| Detect | Anomalies/Events | ✅ Complete | CloudWatch alarms configured |
| Detect | Monitoring | ✅ Complete | CloudWatch Logs enabled |
| Respond | Response Planning | ⏳ Planned | Incident response plan needed |
| Recover | Recovery Planning | ⚠️ Partial | Manual snapshots available |

**Legend:**
- ✅ Complete - Fully implemented
- ⚠️ Partial - Implemented with gaps
- ⏳ Planned - On roadmap
- ❌ Not Implemented

## Security Best Practices Followed

1. ✅ **Least Privilege Access** - IAM roles grant minimal permissions
2. ✅ **Network Isolation** - Database in private subnets
3. ✅ **Encryption in Transit** - SSL/TLS for all connections
4. ✅ **Input Validation** - Parameterized queries prevent SQL injection
5. ✅ **Monitoring & Alerting** - CloudWatch alarms for anomalies
6. ✅ **Infrastructure as Code** - Serverless Framework for reproducibility
7. ✅ **No Hardcoded Secrets** - Environment variables (migrating to Secrets Manager)

## Compliance Considerations

### For Federal/Government Deployment
This architecture provides a foundation for compliance with:
- **FISMA** - Federal Information Security Management Act
- **NIST 800-53** - Security controls for federal systems
- **FedRAMP** - Federal Risk and Authorization Management Program (with enhancements)

### Additional Requirements for Production Federal Use
- Enable RDS encryption at rest
- Implement AWS Secrets Manager
- Enable VPC Flow Logs
- Implement multi-factor authentication
- Enable AWS CloudTrail for audit logging
- Implement backup and disaster recovery procedures

## Incident Response

### Current Monitoring
- CloudWatch alarms notify on errors
- Logs available for forensic analysis
- Manual response required

### Planned Improvements
- Automated incident response playbook
- Integration with notification services (SNS, PagerDuty)
- Automated rollback capabilities

## Security Contact

For security concerns or vulnerability reports, please contact:
- GitHub Issues: https://github.com/gregluna4809/analytics-dashboard/issues
- Mark issues as "security" label

## Last Updated
February 8, 2026

---

**Note:** This is a learning/portfolio project. For production deployments, additional security measures should be implemented based on specific organizational and regulatory requirements.
