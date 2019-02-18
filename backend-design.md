TODO: Finish design of user preferences and notification delivery/storage

# User Service
## Entities
### User
- id: Integer, primary key
- email?: String
- name?: String
- is_group: Boolean
- groups: Integer[], foreign key User
- members: Integer[], foreign key User
### Credentials
- user_id: Integer, foreign key User
- password: String
- salt: String
### Permission
- user_id: Integer, foreign key User
- ???

# Ticket Service
## Entities
### Ticket
- id: Integer, primary key
- ticket_number: Integer, key, unique
- creator: Integer, foreign key User
- title: String
- body?: String
- attachments: Integer[], foreign key Attachment
### TicketUsers
- id: Integer, primary key
- ticket_number: Integer, foreign key Ticket (ticket_number)
- assignee: Integer[], foreign key User
- cc: Integer[], foreign key User
### TicketStatus
- id: Integer, primary key
- ticket_number: Integer, foreign key Ticket (ticket_number)
- priority: Integer, foreign key Priority
- dependencies: Integer[], foreign key Ticket
- status: Integer, foreign key Status
### Versioning
- ticket_id: Integer, foreign key Ticket (id)
- ticket_users_id: Integer, foreign key TicketUsers (id)
- ticket_status_id: Integer, foreign key TicketStatus (id)
- ticket_number: Integer, foreign key Ticket (ticket_number)
- version_number: Integer
- latest_version: Boolean
- updated_by: Integer, foreign key User
- updated: Datetime
- created: Datetime
### Attachment
- id: Integer, primary key
- name: String
- url: String
### Category
- id: Integer, primary key
- name: String
### Priority
- id: Integer, primary key
- name: String
- color: String
### Status
- id: Integer, primary key
- name: String
- color: String
### RoutingRule
- id: Integer, primary key
- category_id: Integer, foreign key Category (id)
- user_id: Integer, foreign key User (id)

# Conversation Service
## Entities
### Message
- ticket_number: Integer, foreign key Ticket (ticket_number)
- sender: Integer, foreign key User (id)
- message: String
- timestamp: Datetime
- order: Integer

# Notification Service
## Entities
### Notification
- id: Integer, primary key
- title: String
- body: String
- recipients: Integer, foreign key User (id)
