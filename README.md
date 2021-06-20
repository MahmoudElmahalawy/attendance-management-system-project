# Attendance Management System

Using JSON-Server to create a fake RESTful API to handle database and backend work.

---

### To run database server use command

```sh
npm run json:server
```

#### the db server will be running at port 3000 --> [http://localhost:3000](http://localhost:3000)

---

### Database

---

> Users Table

| Name     | Value  |
| -------- | ------ |
| userName | String |
| id       | Number |
| fName    | String |
| lName    | String |
| address  | String |
| email    | String |
| age      | Number |
| userName | String |
| password | String |
| empType  | Number |
| reportId | Number |

---

> Reports Table

| Name       | Value    |
| ---------- | -------- |
| id         | Number   |
| date       | Date     |
| time       | DateTime |
| attendance | Boolean  |
| late       | Boolean  |
| excuse     | Boolean  |
| absence    | Boolean  |
