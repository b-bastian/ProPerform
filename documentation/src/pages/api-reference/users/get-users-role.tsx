import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";
import ListBlock from "../../../components/docs/ListBlock";

export default function GetUsersRole() {
  const validRoles = [
    { label: "owners" },
    { label: "users" },
    { label: "trainers" },
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /users/:role</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Returns a paginated list of users filtered by role. Requires
        authentication. Rate limited to 10 requests per 15 minutes.
      </Text>

      <Heading>Valid Roles</Heading>
      <ListBlock items={validRoles}></ListBlock>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>URL Parameters</Heading>
      <CodeBlock
        language="text"
        code={`role: string - One of: owners, users, trainers`}
      />

      <Heading>Query Parameters</Heading>
      <CodeBlock
        language="http"
        code={`page   (number, optional, default: 1)
limit  (number, optional, default: 10, max: 100)`}
      />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="http"
        code={`GET /users/trainers?page=1&limit=10
Authorization: Bearer <JWT_TOKEN>`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "page": 1,
  "limit": 10,
  "total": 5,
  "totalPages": 1,
  "users": [
    {
      "tid": 5,
      "firstname": "Jane",
      "lastname": "Smith",
      "birthdate": "1985-03-20",
      "email": "jane@example.com",
      "phone_number": "+41791234567",
      "type": "trainer"
    }
  ]
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Invalid role (400)
{
  "error": "Ungültige Rollenangabe. Erlaubte Werte: 'owners', 'users', 'trainers'"
}

// Unauthorized (401)
{
  "error": "Unauthorized"
}

// Server error (500)
{
  "error": "Fehler beim Abrufen der Benutzer"
}`}
      />

      <Heading>Valid Role Values</Heading>
      <CodeBlock
        language="text"
        code={`owners     - Admin accounts (role_id: 1)
users      - Regular users (role_id: 2)
trainers   - Trainer accounts`}
      />
    </div>
  );
}
