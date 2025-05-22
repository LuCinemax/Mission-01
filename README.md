# VIRT Insurance Estimator

A full-stack application that analyzes vehicle images using Azure Custom Vision and provides insurance package suggestions based on predicted vehicle attributes. Built with React (frontend) and Express (backend).

---

## 📁 Project Structure

mission-1/
├── Turners-VIRT/         → Frontend (React + CSS Modules)
├── VIRT-Backend/         → Backend (Express + Azure integration) 
    ├── .gitignore        
├── README.md


## 🚗 Features

- Upload vehicle images directly from the frontend  
- Sends image data to the backend using `arrayBuffer`  
- Uses Azure Custom Vision to predict vehicle attributes  
- Displays the top 4 predicted tags with confidence scores  
- Dynamically renders an insurance premium package image (e.g., SUV, Sedan, Truck)
- Site functionality to have a stronger feel of the prototype   

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/LuCinemax/Mission-01.git
```

### 2. Backend Setup (`VIRT-Backend`)

```bash
cd VIRT-Backend
npm install
```

#### 🔑 Environment Variables

Create a `.env` file inside `VIRT-Backend/`:

```env
PORT=Input your own

# Azure Custom Vision config
AZURE_KEY=Input your own
AZURE_REGION=Input your own
AZURE_PROJECT_ID=Input your own
AZURE_MODEL=Input your own
```

#### ▶️ Start the Backend

```bash
node index.js
```

### 3. Frontend Setup (`Turners-VIRT`)

```bash
cd ../Turners-VIRT
npm install
npm run dev
```

---

## 🔌 Technologies Used

### Frontend

- React (Vite)  
- CSS Modules  
- File Upload + Image Preview  

### Backend

- Node.js  
- Express  
- Azure Custom Vision API  
- dotenv  

---

## 🧠 How It Works

1. User uploads a vehicle image from the frontend.  
2. The image is converted to binary (`arrayBuffer`) and sent to the backend.  
3. The backend forwards it to Azure Custom Vision.  
4. Azure returns predicted tags with confidence levels.  
5. Frontend displays a related Insurance Premium image and top 4 tags.

---

## 📄 License

© 2025 LuCinema
