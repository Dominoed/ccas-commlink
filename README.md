# ccas-commlink
# CCAS CommLink (Cross-Platform Communications Aggregation System)
Cross-Platform Communications Aggregation System - CommLink is a comprehensive communications monitoring and logging platform that aggregates SIP calls, military VOIP, Microsoft Teams messages, and email into a unified interface. Designed for both Linux and Windows environments, it provides real-time monitoring, tagging, and analytics.

## 🚀 Features

### Communication Aggregation
- **SIP Call Monitoring**: Real-time SIP call logging with duration tracking
- **Military VOIP Integration**: Secure military communication system monitoring
- **Microsoft Teams**: Message and call logging from Teams channels
- **Email Monitoring**: Comprehensive email logging and categorization

### Management & Organization
- **Unified Dashboard**: Single interface for all communication types
- **Tagging System**: Organize communications with custom tags and colors
- **Priority Levels**: Critical, High, Normal, Low priority classification
- **Status Management**: Active, Archived, Flagged status tracking
- **Advanced Filtering**: Filter by type, status, priority, and tags

### Monitoring & Analytics
- **Real-time Statistics**: Live communication counts by type
- **System Status**: Monitor service health and connectivity
- **Communication History**: Complete audit trail with timestamps
- **Search & Filter**: Advanced search capabilities

## 🏗 Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation

### Backend
- **Node.js** with Express 5
- **TypeScript** for type safety
- **SQLite** database with Kysely query builder
- **RESTful API** endpoints

### Database
- **SQLite** for cross-platform compatibility
- **Kysely** as type-safe SQL query builder
- **Automated migrations** for schema management

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Git** for version control

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Dominoed/ccas-commlink/
cd commlink
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3001
DATA_DIRECTORY=./data
```

### 4. Initialize Database
The database will be automatically created when you first run the application. The SQLite database file will be stored in the `DATA_DIRECTORY` path.

### 5. Start Development Server
```bash
npm run start
```

This will start:
- Express API server on port 3001
- Vite development server on port 3000

### 6. Access the Application
Open your browser and navigate to `http://localhost:3000`

## 🔧 Production Deployment

### 1. Build the Application
```bash
npm run build
```

### 2. Set Environment Variables
```env
NODE_ENV=production
PORT=3001
DATA_DIRECTORY=/path/to/data
```

### 3. Start Production Server
```bash
cd dist
node server/index.js
```

## 📊 Database Schema

### Communication Logs Table
```sql
CREATE TABLE communication_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL CHECK(type IN ('sip', 'military_voip', 'teams', 'email')),
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  subject TEXT,
  content TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'archived', 'flagged')),
  priority TEXT DEFAULT 'normal' CHECK(priority IN ('low', 'normal', 'high', 'critical')),
  duration INTEGER,
  file_path TEXT,
  metadata TEXT
);
```

### Tags Table
```sql
CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#6B7280',
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Communication Tags Junction Table
```sql
CREATE TABLE communication_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  communication_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  FOREIGN KEY (communication_id) REFERENCES communication_logs(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  UNIQUE(communication_id, tag_id)
);
```

## 🌐 API Documentation

### Base URL
- Development: `http://localhost:3001/api`
- Production: `https://your-domain.com/api`

### Communications Endpoints

#### Get All Communications
```http
GET /api/communications
```

**Query Parameters:**
- `type`: Filter by communication type (sip, military_voip, teams, email)
- `status`: Filter by status (active, archived, flagged)
- `priority`: Filter by priority (low, normal, high, critical)
- `limit`: Limit number of results

**Response:**
```json
[
  {
    "id": 1,
    "type": "sip",
    "from_address": "+1234567890",
    "to_address": "+0987654321",
    "subject": "Conference Call",
    "content": "Strategic planning meeting",
    "timestamp": "2024-01-15T10:30:00Z",
    "status": "active",
    "priority": "high",
    "duration": 1800,
    "tags": [
      {
        "id": 1,
        "name": "Important",
        "color": "#EF4444"
      }
    ]
  }
]
```

#### Create Communication
```http
POST /api/communications
```

**Request Body:**
```json
{
  "type": "sip",
  "from_address": "+1234567890",
  "to_address": "+0987654321",
  "subject": "Conference Call",
  "content": "Strategic planning meeting",
  "priority": "high",
  "duration": 1800,
  "tags": [1, 2]
}
```

#### Update Communication
```http
PATCH /api/communications/:id
```

**Request Body:**
```json
{
  "status": "archived",
  "priority": "normal",
  "tags": [1, 3]
}
```

#### Delete Communication
```http
DELETE /api/communications/:id
```

### Tags Endpoints

#### Get All Tags
```http
GET /api/tags
```

#### Create Tag
```http
POST /api/tags
```

**Request Body:**
```json
{
  "name": "Urgent",
  "color": "#EF4444",
  "description": "High priority communications"
}
```

#### Update Tag
```http
PATCH /api/tags/:id
```

#### Delete Tag
```http
DELETE /api/tags/:id
```

### Health Check
```http
GET /api/health
```

## 🎯 Usage Guide

### Dashboard
The main dashboard provides:
- **Statistics Overview**: Real-time counts for each communication type
- **Recent Communications**: Latest 5 communications
- **System Status**: Health status of all services

### Communications Management
1. **View All Communications**: Navigate to Communications page
2. **Filter Communications**: Use the filter bar to narrow results
3. **Add New Communication**: Click "Add Communication" button
4. **Manage Status**: Use dropdown menu to archive or flag items
5. **Tag Communications**: Assign tags for better organization

### Tags Management
1. **Create Tags**: Use the Tags page to create new tags
2. **Color Coding**: Assign colors for visual organization
3. **Tag Assignment**: Apply tags to communications for categorization

### Settings Configuration
Configure:
- **Service Toggles**: Enable/disable specific communication services
- **Notifications**: Control alert preferences
- **Data Retention**: Set automatic archival policies

## 🛠 Development

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express backend
│   ├── routes/            # API route handlers
│   ├── database/          # Database schema and connection
│   └── index.ts           # Server entry point
├── scripts/               # Development scripts
└── dist/                  # Production build output
```

### Adding New Features

#### 1. Database Changes
Use database migrations:
```typescript
// Add migration in server/database/
export const migration = `
  ALTER TABLE communication_logs 
  ADD COLUMN new_field TEXT;
`;
```

#### 2. API Endpoints
Add new routes in `server/routes/`:
```typescript
app.get('/api/new-endpoint', async (req, res) => {
  // Implementation
  res.json(result);
  return;
});
```

#### 3. Frontend Components
Create components in appropriate directories:
```typescript
// client/src/components/feature/NewComponent.tsx
export function NewComponent() {
  return <div>New Feature</div>;
}
```

### Code Style Guidelines
- Use TypeScript for all new code
- Follow existing component patterns
- Create small, focused components
- Use shadcn/ui components when possible
- Add proper error handling and logging

## 🔒 Security Considerations

### Data Protection
- SQLite database is stored locally
- No sensitive data transmitted over network in development
- Use HTTPS in production environments

### Access Control
- Implement authentication for production use
- Consider role-based access for different user types
- Secure API endpoints appropriately

### Compliance
- Ensure compliance with communication monitoring regulations
- Implement data retention policies
- Consider encryption for sensitive communications

## 🧪 Testing

### Running Tests
```bash
# Frontend tests
npm run test:client

# Backend tests
npm run test:server

# Integration tests
npm run test:integration
```

### Test Coverage
- Unit tests for components and hooks
- API endpoint testing
- Database operation testing
- Integration testing for complete workflows

## 📈 Performance Optimization

### Database
- Indexes on frequently queried columns
- Efficient query patterns with Kysely
- Regular database maintenance

### Frontend
- Component lazy loading
- Efficient re-rendering patterns
- Optimized bundle sizes

### Backend
- Connection pooling
- Response caching where appropriate
- Efficient database queries

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Errors
- Check DATA_DIRECTORY path exists and is writable
- Verify SQLite database file permissions

#### Port Conflicts
- Ensure ports 3000 and 3001 are available
- Modify PORT environment variable if needed

#### Build Errors
- Clear node_modules and reinstall dependencies
- Check Node.js version compatibility

#### Missing Dependencies
```bash
npm install
npm audit fix
```

### Logging
Application logs are written to console. In production, consider:
- Structured logging with winston
- Log aggregation services
- Error monitoring tools

## 📝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

### Code Review Process
- All changes require review
- Tests must pass
- Documentation updates required
- Follow existing code patterns

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

## 🤝 Support

For support and questions:
- Create GitHub issues for bugs
- Use discussions for questions
- Check existing documentation first

## 🗺 Roadmap

### Upcoming Features
- Real-time notifications
- Advanced analytics dashboard
- Export functionality
- Multi-user support
- Mobile application
- Integration APIs for external systems

### Long-term Goals
- Cloud deployment options
- Advanced security features
- Machine learning for communication analysis
- Custom reporting tools

---

**CommLink** - Unified Communications Monitoring for the Modern World
