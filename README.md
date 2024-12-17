MEETING CALENDAR APPLICATION :

The Meeting Calendar App is an integrated module for scheduling, managing, and viewing meetings or events within the NorthMarket platform. This feature is designed to enhance collaboration between users, facilitate event planning, and streamline user interactions.

APPLICATION METHODS

User-Friendly Calendar UI:

Interactive and intuitive calendar interface for scheduling and managing events.

CRUD Functionalities:

Create, Read, Update, and Delete meeting events with ease.

Role-Based Access:

Sellers and buyers can schedule meetings, while admins manage marketplace events.

Reminders:

Automatic reminders for scheduled events via notifications.

Integration with Marketplace:

Seamlessly connects with user and advertisement data for enhanced functionality.

TECHNOLOGIES USED

FRONT-END

ReactJS: Core library for building the calendar UI.

React Router: Handles navigation for calendar views.

Zustand: State management for event data.

Axios: Fetches and updates calendar events via API.

React Big Calendar: Used for rendering the calendar.

BACK-END

Spring Boot: Framework for REST API development.

MariaDB: Database for storing event data.

JWT Authentication: Secures API endpoints.

Maven: Dependency management.

API ENDPOINT

Event Management

GET /api/events
Retrieves a list of all events.

Query Parameters:

userId (optional): Filter events by user.
POST /api/events
Creates a new event.

DELETE /api/events
delete an existing event.

PUT /api/events
Update an existing event

Payload:

{

"id": "Autogenerated id",

"title": "Meeting with John",

"date": "Meeting Date",

"startTime": "2024-12-07T10:00:00Z",

"endTime": "2024-12-07T11:00:00Z",

"location": "Meeting Location",

"level": "Meeting Level (Team, company or department)",

"participants": "Participants-emails",

"description": "Discuss new advertisement features"

}

File Structure
project/

│

├── backend/

│ ├── src/

│ │ ├── main/

│ │ │ ├── java/com/northmarket/calendar/

│ │ │ │ ├── config/ # EventDatabaseInitializer.java
                  / # EventSwaggerConfig.java

│ │ │ │ ├── controller/ # EventController.java

│ │ │ │ ├── dto/ # EventDto.java

│ │ │ │ ├── entity/ # Event.java

│ │ │ │ ├── repository/ # EventRepository.java

│ │ │ │ └── service/ # EventService.java

│ │ │ └── resources/

│ │ │ └── application.properties

│ ├── pom.xml

│

├── frontend/

│ ├── src/

│ │ ├── components/

│ │ │ ├── event

│ │ │ │ └── event.jsx

│ │ │ │ └── eventForm.jsx

│ │ │ │ └── eventNavbar.jsx

│ │ │ │ └── eventFooter.jsx

│ │ │ │ └── eventRouter.jsx ,

│ │ ├── main.jsx

│ ├── eventApp.jsx

│ └── index.html

│

├── README.md

└── package.json

Future Enhancements
Add drag-and-drop event scheduling.

Integrate notifications via email or SMS.

Add recurring event support.

Developed by John Baptist R.

Flowchart for Meeting Calendar App
User

│

▼

[Frontend: Calendar UI]

│

▼

[Frontend: Event Service (Axios)]

│

▼

[Backend: EventController]

│

▼

[Backend: EventService]

│

▼

[Backend: EventRepository ↔ Database]

│

▼

[Response Back to Frontend]
