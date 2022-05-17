
## Library management microservice

This microservices are developed with Node.js, Express.js, MongoDB and RabbitMQ.
Using RabbitMQ for inter communication service to service by following queue technique.

### There are two microservices

- Student service
- Library service

### Student service

Student microservice will provide these APIs

- Registration a student account.
- Login to student account.
- Retrive student profile info.
- Update student profile info.
- Get books from library service by service to service intercommunication.
- Show book information from library service by service to service intercommunication.
- Booked a book for more days to library service by service to service intercommunication.

### Library service

Library microservice will provide these APIs

- Registration a admin account.
- Login to admin account.
- Add new admin account.
- Add books to library.
- Show specific book.
- Edit book info.
- Check booked details for specific book.