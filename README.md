# CareSRE

 An **AI-Powered Multi-Agent System** for Intelligent Hospital and OPD Workflow and Management. 

# Problem Statement : HMS + OPD Management Challenge

#### An intelligent HMS + OPD system is essential to reduce operational inefficiencies, improve patient experience, and enable data-driven healthcare delivery.
Hospitals, especially OPDs, face persistent operational challenges that directly affect quality of care and patient experience.

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Google Gemini](https://img.shields.io/badge/AI-Gemini%201.5-4285F4?style=flat-square&logo=google)


## Key problems:
- Long and unmanaged patient queues

- Manual and inconsistent triage processes

- Doctors overloaded with unstructured patient data

- Delayed identification of critical cases

- High administrative overhead

Most existing Hospital Management Systems act as passive record systems and do not provide real-time, intelligent decision support. CareSRE addresses this gap by introducing an **AI-driven, agent-based decision-support system that improves efficiency without replacing human clinicians.**

## 🤖 Why Agents?

Healthcare workflows are inherently multi-role and dynamic. A single monolithic AI model cannot handle intake, triage, alerts, summarization, and administration reliably.

- Multi-agent systems help by:

- Assigning one clear responsibility per agent

- Improving reliability and explainability

- Enabling parallel decision-making

- Reflecting real hospital operational structure

- Each agent in CareSRE does one job only, but together they create a coordinated and scalable system.


## 🏗️ What I Built — Architecture Overview
CareSRE is built as a multi-agent orchestration layer on top of a standard hospital workflow.

Core Agents

###  **Patient Intake Agent**
- Converts free-text symptoms into structured medical data

- Normalizes real-world patient inputs

### **Triage & Priority Agent**
- Assesses urgency and assigns priority

- Supports OPD vs emergency routing

- Helps manage queues dynamically

- Medical Record Summarizer Agent

- Condenses long patient histories into concise summaries

- Reduces cognitive load for doctors

### **Clinical Alert Agent**

- Flags abnormal trends and critical indicators

- Provides early warnings with explanations

### **Admin / Workflow Agent**

- Suggests next operational steps

- Assists with documentation and discharge summaries

- Reduces administrative workload

- All agents communicate through a shared workflow, ensuring coordination without overlap.

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15.1 |
| UI | React 19 |
| Styling | Vanilla CSS (custom design system) |
| AI | Google Gemini 1.5 Flash |
| QR Code | qrcode.react |
| State | In-memory store |

## Demo — How the Agent System Works


https://youtu.be/BMP-mP9pRTI


## Results:

- Reduced waiting time

- Better queue control

- Improved doctor efficiency

- Smoother patient experience

(Demo images / video included in the repository)


## 🛠️ The Build — Tools, Technologies & Workflow

### Frontend

Web-based UI

Single scrolling interface with role-based access

### Backend

Firebase Authentication

Firestore database

Firebase Hosting

### AI Layer

LLM-based agents

Prompt engineering + rule-based logic

No model training required

### Design Principles

Decision-support, not diagnosis

Modular and scalable

Easy integration with existing HMS


## 🚀 Future Enhancements / Work in Progress

- Integration with government and hospital HMS platforms

- Expansion beyond OPD (diagnostics, pharmacy queues)

- Analytics dashboards for hospital planning

- Multi-language patient input

- Improved agent coordination and learning loops


## 📎 Project Links

Demo Video / Screenshots: https://youtu.be/BMP-mP9pRTI

MVP Link : https://gdg-virid.vercel.app/

