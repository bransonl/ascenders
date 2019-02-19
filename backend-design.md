TODO: Finish design of user preferences and notification delivery/storage

# User Service
## Entities
### User
- id: Integer, primary key
- name?: String, potential name of the user
- is_group: Boolean
- groups: Integer[], foreign key User(id)
- members: Integer[], foreign key User(id)
### ContactInfo
- user_id: Integer, foreign key User(id)
- email?: String
- phone?: String
### Credentials
- user_id: Integer, foreign key User(id)
- password: String
- salt: String
### Permission
- user_id: Integer, foreign key User(id)
- permissions: JSON
### Preference
- user_id: Integer, foreign key User(id)
- preferences: JSON

# Ticket Service
## Entities
### Ticket
- id: Integer, primary key
- ticket_number: Integer, key, unique
- key_salt: String, salt to create secure key for access without login
- creator: Integer, foreign key User(id)
- title: String
- body?: String
- attachments: Integer[], foreign key Attachment(id)
- created: Datetime
### TicketUsers
- id: Integer, primary key
- ticket_number: Integer, foreign key Ticket(ticket_number)
- assignee: Integer[], foreign key User(id)
- cc: Integer[], foreign key User(id)
### TicketStatus
- id: Integer, primary key
- ticket_number: Integer, foreign key Ticket(ticket_number)
- priority: Integer, foreign key Priority(id)
- dependencies: Integer[], foreign key Ticket(id)
- status: Integer, foreign key Status(id)
### Versioning
- ticket_id: Integer, foreign key Ticket(id)
- ticket_users_id: Integer, foreign key TicketUsers(id)
- ticket_status_id: Integer, foreign key TicketStatus(id)
- ticket_number: Integer, foreign key Ticket(ticket_number)
- version_number: Integer
- updated_by: Integer, foreign key User(id)
- updated: Datetime
### Attachment
- id: Integer, primary key
- name: String
- url: String
- created: Datetime
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
- category_id: Integer, foreign key Category(id)
- user_id: Integer, foreign key User(id)

# Conversation Service
## Entities
### ChatMessage
- ticket_number: Integer, foreign key Ticket(ticket_number)
- type: String/Enum
- sender: Integer, foreign key User(id)
- message: String
- timestamp: Datetime
- order: Integer

# Notification Service
## Entities
### Notification
- id: Integer, primary key
- title: String
- body: String
- recipient: Integer, foreign key User(id)
- methods: String/Enum[]
