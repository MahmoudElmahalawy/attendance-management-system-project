# Attendance Management System

Using JSON-Server to create a fake RESTful API to handle database and backend work.

---

### To run database server run command

```sh
npm run json:server
```

#### the db server will be running at localhost port 3000 --> [http://localhost:3000](http://localhost:3000)

<br/>

---

### Database

<br/>

> Users and Reports Tables

<table>
<tr><td>

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

</td><td>   -   <td></d>

| Name       | Value    |
| ---------- | -------- |
| empId      | Number   |
| id         | Number   |
| date       | Date     |
| time       | DateTime |
| attendance | Boolean  |
| late       | Boolean  |
| excuse     | Boolean  |
| absence    | Boolean  |

</td></tr>
</table>
