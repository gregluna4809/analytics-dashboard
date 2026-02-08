
## 🚀 Live Demo

**Frontend:** [http://analytics-dashboard-gregoryluna.s3-website-us-east-1.amazonaws.com](http://analytics-dashboard-gregoryluna.s3-website-us-east-1.amazonaws.com)

**API Base:** `https://5bdlur57z0.execute-api.us-east-1.amazonaws.com/dev`---

# Analytics Dashboard - Serverless Full-Stack Application

A production-ready serverless analytics dashboard built with React and deployed on AWS. This project demonstrates modern cloud architecture, serverless computing patterns, and full-stack development skills.

[![AWS](https://img.shields.io/badge/AWS-Lambda%20%7C%20RDS%20%7C%20S3-orange)](https://aws.amazon.com/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17.x-blue)](https://www.postgresql.org/)

## 🚀 Live Demo

**Frontend:** [http://analytics-dashboard-gregoryluna.s3-website-us-east-1.amazonaws.com](http://analytics-dashboard-gregoryluna.s3-website-us-east-1.amazonaws.com)

**API Base:** `https://5bdlur57z0.execute-api.us-east-1.amazonaws.com/dev`

## 📋 Overview

This analytics dashboard allows users to track and visualize data entries with real-time charts and statistics. The application leverages AWS serverless architecture for scalability, cost-efficiency, and zero server management.

### Key Features

- 📊 **Real-time Analytics** - Interactive charts and statistics cards
- ✍️ **Data Entry** - Create new analytics entries via form
- 📈 **Data Visualization** - Line charts using Recharts library
- 🔄 **Live Updates** - Automatic refresh of statistics and charts
- 📱 **Responsive Design** - Mobile-friendly Tailwind CSS interface
- ☁️ **100% Serverless** - No servers to manage or maintain

## 🏗️ Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌─────────────┐   ┌──────────────┐
│  S3 Static  │   │ API Gateway  │
│   Website   │   │              │
└─────────────┘   └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │AWS Lambda    │
                  │Functions     │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  RDS/VPC     │
                  │  PostgreSQL  │
                  └──────────────┘
```

### AWS Services Used

- **AWS Lambda** - Serverless compute for API endpoints
- **Amazon RDS** - Managed PostgreSQL database
- **Amazon API Gateway** - RESTful API management
- **Amazon S3** - Static website hosting
- **Amazon VPC** - Network isolation and security
- **AWS IAM** - Access control and permissions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library

### Backend
- **Node.js 20** - JavaScript runtime
- **Express.js** - Web framework (local dev)
- **AWS Lambda** - Serverless functions (production)
- **PostgreSQL 17** - Relational database

### Infrastructure
- **Serverless Framework** - Infrastructure as Code
- **AWS CLI** - Deployment automation

## 📦 Project Structure

```
analytics-dashboard/
├── backend/
│   ├── handler.js              # Lambda function handlers
│   ├── server.js               # Local Express server
│   ├── serverless.yml          # Serverless config
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main application
│   │   ├── components/         # React components
│   │   └── lib/api.js          # API helpers
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- AWS Account
- AWS CLI configured
- Serverless Framework

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/gregluna4809/analytics-dashboard.git
   cd analytics-dashboard
   ```

2. **Backend setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file with database credentials
   cp .env.example .env
   
   # Start local server
   npm run dev
   ```

3. **Frontend setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## ☁️ AWS Deployment

### Backend (Lambda)

```bash
cd backend
export DB_HOST=your-rds-endpoint
export DB_USER=postgres
export DB_PASS=your_password
export DB_NAME=analytics_dashboard
export DB_PORT=5432

npx serverless deploy
```

### Frontend (S3)

```bash
cd frontend
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Database health check |
| GET | `/api/entries` | Fetch all entries for user |
| POST | `/api/entries` | Create new entry |

### Example Request

```bash
curl -X POST https://your-api-url.com/dev/api/entries \
  -H "Content-Type: application/json" \
  -H "x-user-id: demo-user-1" \
  -d '{
    "category": "Sales",
    "value": 150.50,
    "notes": "Q1 revenue",
    "entryTimestamp": "2026-02-07T12:00:00Z"
  }'
```

## 🔐 Security

- **VPC Isolation** - RDS database not publicly accessible
- **Security Groups** - Restrictive firewall rules
- **SSL/TLS** - Encrypted database connections
- **IAM Roles** - Least privilege access
- **CORS** - Configured to prevent unauthorized access

## 💰 Cost Optimization

Designed to run within AWS Free Tier:
- Lambda: 1M requests/month free
- API Gateway: 1M requests/month free (12 months)
- RDS: 750 hours/month db.t4g.micro (12 months)
- S3: 5GB storage free

**Estimated Monthly Cost:** $0 (within free tier)

## 🗺️ Roadmap

- [ ] AWS Cognito authentication
- [ ] Edit/delete functionality
- [ ] CI/CD pipeline with GitHub Actions
- [ ] CloudWatch monitoring dashboards
- [ ] Custom domain with CloudFront
- [ ] Comprehensive testing suite

## 📚 Learning Outcomes

This project demonstrates:
- ✅ Serverless architecture patterns
- ✅ AWS service integration
- ✅ Full-stack JavaScript development
- ✅ Database design and SQL
- ✅ RESTful API design
- ✅ Infrastructure as Code
- ✅ Cloud security best practices

## 👤 Author

**Gregory Luna**  
GitHub: [@gregluna4809](https://github.com/gregluna4809)

## 📝 License

This project is open source and available under the MIT License.

---

Built with ☁️ on AWS | Deployed with 🚀 Serverless Framework
