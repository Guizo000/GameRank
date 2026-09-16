# GameRank 🎮

> A full-stack web application built to explore and rate video games, designed to deepen back-end expertise using modern **.NET** standards, robust security practices, and automated testing.

---

## 📌 Project Overview

GameRank is a work-in-progress full-stack project created as a hands-on learning environment to refine core web development skills. While building a practical platform for managing and ranking video games, the primary technical focus is on mastering solid back-end architecture, user security, and test-driven reliability.

---

## 🎯 Current Development Goals
- [x] **Authentication:** Implement login and register system with database persistence.
- [x] **Basic UI:** Build basic UI for the authentication system.
- [x] **Persistence:** Enhance authentication with JWT (JSON Web Tokens) to maintain persistent user sessions.
- [ ] **Automated Testing:** Integrate xUnit to build unit and integration tests for core business logic and API endpoints.
- [ ] **Improve Authentication:** Enhance JWT authentication security by implementing refresh tokens.
- [ ] **Role-Based Authorization:** Restrict sensitive endpoints and management features based on user privilege levels.

---

## 🛠️ Tech Stack

### Back-End
* **Language:** C#
* **Framework:** ASP.NET Core Web API
* **Testing:** xUnit
* **Database:** Entity Framework Core (SQL Server LocalDB / EF Core Migrations)

### Front-End
* **Framework / Build Tool:** React + Vite (JavaScript)

---

## 🚀 Getting Started

### Prerequisites

* [.NET 10.0 SDK](https://dotnet.microsoft.com/download) (or later)
* [Node.js](https://nodejs.org/) (v19 or later for React/Vite)
* An IDE such as [Visual Studio](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)
* SQL Server (Unless you are using Visual Studio)

### Installation & Setup

1. **Clone the repository:**
   
   1. ```git clone https://github.com/your-username/GameRank.git```
      
   2. ```cd GameRank```

3. **Backend Setup:**

    1. ```cd backend```
  
    2. ```dotnet restore```
  
    3. ```dotnet ef database update```
  
    4.  Before running the backend you need to configure the JWT Key, it can be done in 2 ways:

        1. Adding the key directly to appsettings.json:
           
           ```csharp
           "AppSetting": {
              "Token": "YourVeryLongAndSecureSecretKeyHereAtLeast32Bytes!"
           }

        2. Using .NET user secrets tool:
            
            1. ```cd backend```
               
            2. ```dotnet user-secrets init```
               
            3. ```dotnet user-secrets set "AppSettings:Token" "YourVeryLongAndSecureSecretKeyHereAtLeast32Bytes!"```
           
  
    6. ```dotnet run```
   

4. **Frontend Setup:**

    1. ```cd frontend```
  
    2. ```npm install```
  
    3. ```npm run dev```
   
   
   

---


## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
