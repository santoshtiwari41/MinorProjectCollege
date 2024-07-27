```js
// ADMIN STUDENT CREATE -> email (email, password)
```

```js
// STUDENT LOGIN (email, password)
```

> **_Database seeding happens in two ways with Prisma ORM manually with `prisma db seed` and automatically in `prisma migrate dev` and `prisma migrate reset`._**

- Department to Batch: One department can have many batches, but each batch belongs to one department.
- Batch to Semester: One batch can have many semesters, but each semester belongs to one batch.
- Batch to Student: One batch can have many students, but each student belongs to one batch.
- Batch to Notification: One batch can have many notifications related to it.
- Semester to Notification: One semester can have many notifications related to it.
- Student to Notification: One student can have many notifications related to them.
- Teacher to Notification: One teacher can have many notifications related to them.
- Student to Profile: One student has one profile.
- Teacher to Profile: One teacher has one profile.
- Department to Event: One department can have many events, but each event belongs to one department.

<!-- TODO RATE LIMITING -->

## IMAGE URL

> ```sh
> https://hamro-college-server.onrender.com/public/1722002059884.png
> ```
