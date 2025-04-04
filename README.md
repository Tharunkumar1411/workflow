# 🧩 Workflow Management Dashboard

A full-stack application to manage, visualize, and edit workflows with advanced drag-and-drop reordering, dynamic row expansion, and MongoDB integration.

## 🚀 Features

### ✅ Frontend
- Built with **React.js** and **MUI (Material UI)**
- Uses **DndKit** for drag-and-drop sorting of table rows
- Paginated, collapsible **data table**
- Dynamic row expansion to show detailed workflow steps
- Integrated with backend API to fetch and update workflows
- Search functionality to filter workflows by name or ID
- Highlights "pinned" workflows by moving them to the top

### ⚙️ Backend
- **Node.js + Express** server
- **MongoDB + Mongoose** for data persistence
- API routes to save and fetch workflow data
- Smart **upsert logic** to update existing workflows if `flowId` already exists, else create a new one

---

## 🗂️ Tech Stack

**Frontend**  
- React.js  
- Zustand (for state management)  
- Material UI (MUI)  
- DndKit  
- Axios

**Backend**  
- Node.js  
- Express.js  
- MongoDB  
- Mongoose

---

## 🧪 Example Workflow Schema

```js
const workflowSchema = new mongoose.Schema({
  flowId: String,
  flowName: String,
  name: String, // User display name
  editedOn: String,
  description: String,
  nodes: Array,
  edges: Array,
  apiConfig: Object,
}, { timestamps: true });
```

---

## 📦 API Endpoints

### `POST /api/setWorkflow`
Saves or updates a workflow.

### `GET /api/getWorkflows`
Fetches all workflows for rendering in the frontend.

---

## 📌 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/Tharunkumar1411/workflow
   cd workflow-dashboard
   ```

2. **Install dependencies**
   - For frontend:
     ```bash
     cd client
     npm install
     npm start
     ```
   - For backend:
     ```bash
     cd server
     npm install
     npm run dev
     ```

3. **Configure environment variables**
   - Create a `.env` file in `server/`:
     ```
     MONGODB_URI=your_mongo_connection_string
     PORT=5000
     ```