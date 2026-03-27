import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostLoginTrainer() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /auth/trainers/login</code>
        <Label text="Public route" color="#10B981" />
      </div>

      <Text>
        Authenticates a trainer account with email and password. Only trainer
        accounts can use this endpoint. Returns a JWT token valid for 3 days.
      </Text>

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "email": "trainer@example.com",
  "password": "SecurePass123!"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`email     (string, required)
password  (string, required)`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tid": 5,
  "role": "trainer"
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing fields (400)
{
  "error": "please fill all required fields."
}

// Invalid credentials (401)
{
  "error": "invalid credentials."
}

// Server error (500)
{
  "error": "internal server error."
}`}
      />

      <Heading>Token Details</Heading>
      <Text>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>Expiration:</strong> 3 days
          </li>
          <li>
            <strong>Payload includes:</strong> tid (trainer ID), role
            ("trainer")
          </li>
          <li>Use token in Authorization header: Bearer {"{token}"}</li>
        </ul>
      </Text>
    </div>
  );
}
