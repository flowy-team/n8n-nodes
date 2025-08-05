![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-flowyteam

This is an n8n community node for integrating with the Flowyteam API. It provides a ClickUp-style interface for managing tasks, projects, employees, and organizational data.

## 🤖 **AI Agent Integration**

🎉 **NEW!** This node is now fully compatible with n8n AI Agents and can be used as a tool for intelligent automation workflows.

### ✨ **AI Agent Features**

- ✅ **Complete Resource Access** - All 21+ resources available as AI tools
- ✅ **Intelligent Operations** - AI can create, read, update, and delete data
- ✅ **Natural Language Interface** - Describe what you want, let AI execute
- ✅ **Multi-Resource Workflows** - AI can work across departments, tasks, projects, etc.
- ✅ **Context-Aware Actions** - AI understands relationships between resources

### 🛠️ **Quick Setup for AI Agents**

#### **Step 1: Enable Community Nodes as Tools**

Set the required environment variable to allow community nodes to be used as AI Agent tools:

**For Command Line Users:**
```bash
export N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

**For Docker/Docker Compose:**
```yaml
environment:
  - N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

**Make it Permanent (Mac/Linux):**
```bash
echo 'export N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true' >> ~/.zshrc
source ~/.zshrc
```

#### **Step 2: Install and Link the Node**

```bash
# Build the package
cd /path/to/flowy.n8n
npm run build

# Create global link
npm link

# Link to n8n custom directory
cd ~/.n8n/custom
npm link n8n-nodes-flowyteam
```

#### **Step 3: Start n8n**

```bash
cd ~/.n8n/custom
npx n8n start
```

#### **Step 4: Add to AI Agent**

1. Open n8n in your browser
2. Create a new workflow
3. Add an **AI Agent** node
4. In the AI Agent configuration, go to **Tools**
5. Search for "**flowyteam**"
6. ✅ You should now see the Flowyteam node available!

### 🎯 **Example AI Agent Prompts**

Here are some example prompts you can use with the AI Agent:

**Department Management:**
```
"Create a new department called 'AI Research' with description 'Artificial Intelligence and Machine Learning Research Division'"
```

**Employee Operations:**
```
"Get all employees from the Marketing department and create a task for each one to update their profiles"
```

**Task Creation:**
```
"Create a high-priority task for user ID 123 to review the Q4 budget, due next Friday"
```

**Project Tracking:**
```
"Show me all active projects and their current status, then create a summary report"
```

**Holiday Management:**
```
"Add Christmas Day (25/12/2024) as a company holiday"
```

### 🏗️ **Available AI Tools**

When you add the Flowyteam node as a tool, the AI Agent gets access to all these resources:

| Resource | Operations | Description |
|----------|------------|-------------|
| **Attendance** | Clock In, Clock Out, Today | Employee attendance tracking |
| **Client** | Create, Get, Update, Delete, Get All | Client relationship management |
| **Department** | Create, Get, Update, Delete, Get All | Organizational structure |
| **Designation** | Create, Get, Update, Delete, Get All | Job roles and titles |
| **Employee** | Create, Get, Update, Delete, Get All | Staff management |
| **Holiday** | Create, Get, Update, Delete, Get All | Company holiday calendar |
| **KPI** | Create, Get, Update, Delete, Get All | Key performance indicators |
| **KPI Category** | Create, Get, Show, Update, Delete | KPI organization |
| **KPI Data** | Get All, Get, Update, Delete | Performance data |
| **Leave** | Create, Get, Update, Delete, Get All | Leave request management |
| **OKR Objective** | Create, Get, Show, Update, Delete | Objectives and key results |
| **OKR Key Result** | Create, Get, Show, Update, Delete | Key result tracking |
| **Performance Cycle** | Create, Get, Update, Delete, Get All | Performance review cycles |
| **Project** | Create, Get, Update, Delete, Get All | Project management |
| **Project Category** | Create, Get, Update, Delete, Get All | Project organization |
| **Task** | Create, Get, Update, Delete, Get All | Task management |
| **Task Category** | Create, Get, Update, Delete, Get All | Task organization |
| **Ticket** | Create, Get, Show, Update, Delete | Support ticket system |
| **Ticket Agent** | Get | Support agent information |
| **Ticket Channel** | Create, Get, Update, Delete, Get All | Support channels |
| **Ticket Type** | Create, Get, Update, Delete, Get All | Ticket categorization |

### 💡 **AI Workflow Examples**

**1. Automated Onboarding:**
```
AI Agent Prompt: "When a new employee joins:
1. Create their employee record
2. Assign them to the appropriate department
3. Create onboarding tasks
4. Set up their first performance cycle"
```

**2. Project Status Reports:**
```
AI Agent Prompt: "Generate a weekly project status report:
1. Get all active projects
2. Check task completion rates
3. Identify overdue items
4. Create summary with recommendations"
```

**3. Leave Management:**
```
AI Agent Prompt: "Process leave requests:
1. Check pending leave requests
2. Validate against holiday calendar
3. Update employee records
4. Send notifications"
```

## 🚀 Enhanced UI Structure

The node now features a **ClickUp-inspired** three-level interface for better usability:

### 1️⃣ Resource Selection
Choose the type of data you want to work with:
- **Task** - Individual work items
- **Task Category** - Task grouping and organization  
- **Project** - Project management
- **Project Category** - Project grouping
- **Employee** - Staff management
- **Department** - Organizational units
- **Designation** - Job roles and titles

### 2️⃣ Operation Selection
Based on your resource choice, select the action:
- **Create** - Add new records
- **Get** - Retrieve specific record by ID
- **Get All** - List multiple records with pagination
- **Update** - Modify existing records
- **Delete** - Remove records

### 3️⃣ Additional Fields
Dynamic form fields appear based on your resource and operation selections, providing:
- Required fields (marked clearly)
- Optional fields for enhanced functionality
- Context-specific options and dropdowns
- Proper validation and descriptions

## 📋 Task Management

### Task Operations

#### ➕ Create Task
**Required Fields:**
- **Heading** (required) - The title/name of the task
- **User ID** (required) - ID of the user creating the task  
- **Start Date** (required) - Task start date (MM/DD/YYYY format)
- **Due Date** (required) - Task deadline (MM/DD/YYYY format)
- **Priority** (required) - Task priority (Low, Medium, High, Critical)

**Additional Fields (Optional):**
- Category ID - Link task to a category
- Project ID - Associate with a project
- Description - Detailed task description
- Task Boards - Board configuration setting
- Key Results ID - Link to OKR key results
- Dependent Task ID - Task dependencies
- Employee Access - Comma-separated user IDs with access
- Repeat Settings - Task recurrence configuration

#### 📖 Get Task
- **Task ID** (required) - The ID of the task to retrieve

#### 📋 Get All Tasks
- Limit - Number of tasks to return
- Page - Page number for pagination
- Search - Search term to filter tasks
- Status Filter - Filter by task status

#### ✏️ Update Task
**Required Fields:**
- **Task ID** (required) - ID of task to update
- **User ID** (required) - ID of the user performing update

**Main Update Fields:**
- Update Heading - New task title
- Update Start Date - New start date
- Update Due Date - New deadline
- Update Priority - New priority level

**Additional Update Fields (Optional):**
- All the same optional fields as Create operation with "Update" prefix
- Allows selective updating of any task properties

#### 🗑️ Delete Task
- **Task ID** (required) - The ID of the task to delete

### Task Category Operations
- **Create**: Category creation with name and description
- **Get**: Retrieve category details  
- **Get All**: List all categories with pagination
- **Update**: Modify category information
- **Delete**: Remove categories

## 🏗️ Project Management

### Project Operations

#### ➕ Create Project
**Required Fields:**
- **Project Name** (required) - The name of the project
- **Start Date** (required) - Project start date (MM/DD/YYYY format)
- **Deadline** (required) - Project deadline (MM/DD/YYYY format)

**Additional Fields (Optional):**
- Template ID - Use project template
- Category ID - Link to project category
- Without Deadline - Boolean flag for projects without deadlines
- Client ID - Associate with client
- Manual Timelog - Enable manual time tracking
- Default Project Member - Auto-assign team members
- Project Summary - Project description
- Notes - Additional project notes
- Project Budget - Budget allocation
- Currency ID - Budget currency
- Hours Allocated - Estimated project hours
- Status - Project status (Not Started, In Progress, On Hold, etc.)
- Project ID (Reference) - Reference to another project

#### 📖 Get Project
- **Project ID** (required) - The ID of the project to retrieve

#### 📋 Get All Projects
- Limit - Number of projects to return
- Page - Page number for pagination
- Search - Search term to filter projects
- Status Filter - Filter by project status

#### ✏️ Update Project
**Required Fields:**
- **Project ID** (required) - ID of project to update

**Main Update Fields:**
- Update Project Name - New project name
- Update Start Date - New start date
- Update Deadline - New deadline

**Additional Update Fields (Optional):**
- All the same optional fields as Create operation with "Update" prefix
- Allows selective updating of any project properties

#### 🗑️ Delete Project
- **Project ID** (required) - The ID of the project to delete

### Project Category Operations
- **Create**: Category creation with name and description
- **Get**: Retrieve category details
- **Get All**: List all categories with pagination
- **Update**: Modify category information
- **Delete**: Remove categories

## 🎯 Key Features

### ✨ User Experience
- **Intuitive Navigation**: Resource → Operation → Fields workflow
- **Smart Field Display**: Only relevant fields shown based on selections
- **Clear Labeling**: Descriptive names and helpful descriptions
- **Validation**: Required fields clearly marked

### 🔧 Technical Benefits
- **Modular Architecture**: Clean separation of resources and operations
- **Type Safety**: Full TypeScript support with proper interfaces
- **Error Handling**: Comprehensive error messages and validation
- **Extensible**: Easy to add new resources and operations
- **AI Agent Compatible**: Full support for intelligent automation

### 🏗️ Structure Example

```
📱 Flowyteam Node
├── 🎯 Resource: Task
│   ├── ➕ Operation: Create
│   │   ├── 📋 Required Fields
│   │   │   ├── 📝 Heading (required)
│   │   │   ├── 👤 User ID (required)  
│   │   │   ├── 📅 Start Date (required)
│   │   │   ├── ⏰ Due Date (required)
│   │   │   └── 🎯 Priority (required)
│   │   └── ➕ Additional Fields
│   │       ├── 📁 Category ID
│   │       ├── 🏗️ Project ID
│   │       ├── 📄 Description
│   │       ├── 👥 Employee Access
│   │       └── 🔄 Repeat Settings
│   └── 📖 Operation: Get
│       └── 🆔 Task ID (required)
├── 🏗️ Resource: Project
│   ├── ➕ Operation: Create
│   │   ├── 📋 Required Fields
│   │   │   ├── 📝 Project Name (required)
│   │   │   ├── 📅 Start Date (required)
│   │   │   └── ⏰ Deadline (required)
│   │   └── ➕ Additional Fields
│   │       ├── 📄 Template ID
│   │       ├── 📁 Category ID
│   │       ├── 👤 Client ID
│   │       ├── 💰 Project Budget
│   │       ├── ⏱️ Hours Allocated
│   │       └── 📊 Status
│   └── 📖 Operation: Get
│       └── 🆔 Project ID (required)
└── 📁 Resource: Task Category
    ├── ➕ Operation: Create
    │   └── 📝 Category Name (required)
    └── 📖 Operation: Get
        └── 🆔 Category ID (required)
```

## 🛠️ Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## 🔐 Credentials

Set up your Flowyteam API credentials:
1. Create a Flowyteam account
2. Generate API credentials from your Flowyteam dashboard
3. Add the credentials to n8n using the "FlowyteamApi" credential type

## 🎉 Usage

### **Regular Workflow Usage**
1. **Add the node** to your n8n workflow
2. **Select a resource** (e.g., Task, Project, Employee)
3. **Choose an operation** (Create, Get, Update, Delete)
4. **Fill in the fields** that appear dynamically
5. **Execute** the workflow

### **AI Agent Usage**
1. **Add an AI Agent node** to your workflow
2. **Configure the AI model** (OpenAI, Claude, etc.)
3. **Add Flowyteam as a tool** in the Tools section
4. **Write natural language prompts** describing what you want to accomplish
5. **Let the AI execute** Flowyteam operations automatically

The enhanced interface makes it easy to discover available operations and ensures you only see relevant configuration options.

## 📚 API Coverage

### ✅ Fully Implemented
- Tasks (CRUD operations)
- Task Categories (CRUD operations)  
- Projects (CRUD operations)
- Project Categories (CRUD operations)
- Employees (CRUD operations)
- Departments (CRUD operations)
- Designations (CRUD operations)
- Holidays (CRUD operations)
- Attendance (Clock In/Out, Today)
- Tickets (CRUD operations)
- Clients (CRUD operations)
- KPIs and KPI Management
- OKR (Objectives and Key Results)
- Leave Management
- Performance Cycles

### 🔄 Dynamic Features
- Pagination support for list operations
- Search functionality
- Status filtering
- Date range filtering
- Field validation
- AI Agent tool compatibility

## 🔧 Troubleshooting

### **AI Agent Tools Not Showing**

If the Flowyteam node doesn't appear in AI Agent tools:

1. **Check Environment Variable:**
   ```bash
   echo $N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE
   # Should return: true
   ```

2. **Verify Node Installation:**
   ```bash
   ls -la ~/.n8n/custom/node_modules/n8n-nodes-flowyteam
   # Should show the symbolic link
   ```

3. **Restart n8n Completely:**
   ```bash
   pkill -f "npx n8n"
   cd ~/.n8n/custom
   npx n8n start
   ```

4. **Check n8n Logs:**
   Look for any errors during startup that might indicate issues with the node.

### **Common Issues**

- **Missing Environment Variable**: The most common issue is forgetting to set `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true`
- **Outdated Build**: Make sure to run `npm run build` after any code changes
- **Link Issues**: Re-run the npm link commands if the node isn't recognized
- **Permission Issues**: Check that the `.n8n` directory has proper permissions

## 🤝 Contributing

Contributions are welcome! The modular structure makes it easy to:
- Add new resources
- Extend existing operations
- Improve field validation
- Enhance user experience
- Add AI Agent capabilities

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🚀 **Get Started with AI Agents**

Ready to supercharge your Flowyteam workflows with AI? Follow the step-by-step guide above and start building intelligent automation that can understand natural language and execute complex operations across your entire Flowyteam ecosystem!

**Example AI Workflow:**
"Create a new project called 'Website Redesign', assign it to the Marketing department, create 5 related tasks with different priorities, and schedule a performance review cycle for the team" - All executed with a single AI prompt! 🤖✨
