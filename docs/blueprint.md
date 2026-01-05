# **App Name**: CareSRE

## Core Features:

- Patient Registration: Allows patients to register by providing their details and symptoms.
- Doctor Registration and Access: Doctor registration and access to their patients and their data
- OPD Triage Agent: Uses AI to determine the urgency and appropriate OPD department based on patient symptoms and age.
- Token & Time Allocation Agent: Assigns token numbers and time windows to patients based on OPD load, doctor availability, and priority, optimizing the patient flow. The AI is used as a tool, where LLM reasoning is used to find available doctor time slots.
- Crowd Prediction Agent: Predicts congestion levels in different OPDs and suggests actions to mitigate overcrowding, such as shifting slots or delaying walk-ins.
- Alert & Exception Agent: Detects failures such as doctor unavailability or OPD overload and triggers alerts with recommended actions. The AI is used as a tool, where LLM reasoning is used to make real-time decisions.
- Admin Insight Agent: Provides actionable insights to hospital administrators based on daily OPD stats.
- Real-time OPD Load Dashboard: Displays live OPD load and alerts, providing a real-time view of hospital operations. Implemented with Firestore.

## Style Guidelines:

- Primary color: Deep Indigo (#4B0082) to evoke trust and intelligence.
- Background color: Very light gray (#F0F0F0) to maintain a clean and professional appearance.
- Accent color: Vibrant Coral (#FF7F50) to highlight important alerts and actionable items.
- Body and headline font: 'PT Sans' sans-serif for a balance of modernity and readability.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use simple, clear icons from the Material Design library to represent different departments, alerts, and actions.
- Design the patient and admin dashboards with a clean, card-based layout for easy information access.
- Subtle animations and transitions to provide feedback on user actions and enhance the user experience without being distracting.