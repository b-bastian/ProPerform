import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import ItalicText from "../../../components/docs/ItalicText";
import Label from "../../../components/Label";
import ListBlock from "../../../components/docs/ListBlock";

export default function GetUsers() {
  return (
    <div className="px-6 py-8">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>GET /users/:role?</code>
          <Label text="Protected route" color="#F87171" />
        </div>
      </div>

      <Text>
        Returns users from the system. The optional{" "}
        <ItalicText>role</ItalicText> path parameter filters by user type.
        Results are paginated via query parameters.
      </Text>

      <Heading>Available Roles</Heading>

      <ListBlock
        items={[
          {
            label: "owners",
            description: "Returns only owners (users.role_id = OWNER)",
          },
          {
            label: "users",
            description: "Returns only regular users (users.role_id = USER)",
          },
          {
            label: "trainers",
            description: "Returns all trainers from the trainers table",
          },
          {
            label: "(omitted)",
            description: "Returns owners, users and trainers combined",
          },
        ]}
      />

      <Heading>Query Parameters</Heading>

      <ListBlock
        items={[
          {
            label: "page",
            description: "Page number (default: 1, minimum: 1)",
          },
          {
            label: "limit",
            description: "Items per page (default: 10, maximum: 100)",
          },
        ]}
      />

      <Heading>Example Requests</Heading>
      <CodeBlock
        language="javascript"
        code={`const token = localStorage.getItem("token");

// all users (page 1, 10 per page)
fetch("https://api.properform.app/users?page=1&limit=10", {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
});

// all users (without pagination)
fetch("https://api.properform.app/users", {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
});

// only trainers, page 2
fetch("https://api.properform.app/users/trainers?page=2&limit=5", {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
});`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "page": 1,
  "limit": 10,
  "total": 3,
  "totalPages": 1,
  "users": [
    {
      "uid": 7,
      "firstname": "Lena",
      "birthdate": "1996-04-18",
      "email": "lena@gmail.com",
      "role_id": 2,
      "type": "user"
    },
    {
      "tid": 4,
      "firstname": "Mark",
      "lastname": "Huber",
      "birthdate": "1990-11-02",
      "email": "mark@gmail.com",
      "phone_number": "+436641234567",
      "type": "trainer"
    }
  ]
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// 400 – invalid role
{
  "error": "Ungültige Rollenangabe. Erlaubte Werte: 'owners', 'users', 'trainers'"
}

// 500 – server error
{
  "error": "Fehler beim Abrufen der Benutzer"
}`}
      />
    </div>
  );
}
