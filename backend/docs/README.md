```sh
bun install express dotenv http-errors bcryptjs jsonwebtoken cors winston uuid
bun install typescript ts-node nodemon @types/node @types/express @types/dotenv @types/http-errors @types/bcryptjs @types/jsonwebtoken @types/cors @types/uuid az-D
```

> `npx tsc --init` && `npm init @eslint/config` && `.prettierrc.json`

```js
const error = createHttpError(400, "All fields are required");
return next(error);

try {
} catch (error) {
  return next(createHttpError(500, "Error while ..."));
}
```

> [http-errors](https://www.npmjs.com/package/http-errors) | [winston](https://www.npmjs.com/package/winston)

- **Department**: Represents a department in an educational institution. It has a one-to-many relationship with semesters and events.
- **Semester**: Represents a semester in the academic calendar. It has a many-to-one relationship with departments, one-to-many relationship with students, and one-to-many relationship with notifications.
- **Teacher**: Represents a teacher. It has a one-to-one relationship with a profile and a one-to-many relationship with notifications.
- **Student**: Represents a student. It has a one-to-one relationship with a profile, many-to-one relationship with semesters, and a one-to-many relationship with notifications.
- **Profile**: Represents the profile of either a student or a teacher. It has a one-to-one relationship with student or teacher.
- **Notification**: Represents a notification that can be related to a semester, student, or teacher.
- **Event**: Represents an event, possibly academic or extracurricular, associated with a department.

Additionally, you have defined enums for roles and notification types.

Overall, this schema seems comprehensive for managing educational institution data, including information about departments, semesters, students, teachers, events, and notifications. If you have any specific questions or need further assistance, feel free to ask!
