import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostRegisterTrainer() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /auth/trainers/register</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Creates a new trainer account. Requires authentication and the{" "}
        <code>owner</code> role. Automatically generates a unique invite code
        that trainers can share with athletes to connect them. Rate limited to
        10 requests per 15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "firstname": "John",
  "lastname": "Doe",
  "email": "trainer@example.com",
  "password": "SecurePass123!",
  "birthdate": "1985-03-20",
  "phone_number": "+1-555-0123"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`firstname      (string, required)
lastname       (string, required)
email          (string, required)
password       (string, required)
birthdate      (string, required, format: YYYY-MM-DD)
phone_number   (string, required)`}
      />

      <Heading>Success Response (201)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "trainer John Doe created.",
  "trainerId": 5,
  "invite_code": "TRN-ABC-XYZ",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing required fields (400)
{
  "error": "required fields missing."
}

// Email already exists (409)
{
  "error": "a trainer with this email already exists."
}

// Unauthorized (401)
{
  "error": "Unauthorized"
}

// Forbidden - not owner role (403)
{
  "error": "Forbidden"
}

// Rate limit exceeded (429)
{
  "error": "rate limit exceeded"
}

// Server error (500)
{
  "error": "error message"
}`}
      />

      <Heading>Important Notes</Heading>
      <Text>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>Authentication Required:</strong> Must be logged in with
            owner role
          </li>
          <li>
            <strong>Unique Email:</strong> Email must not already exist in the
            system
          </li>
          <li>
            <strong>Invite Code:</strong> Automatically generated for trainer to
            share
          </li>
          <li>
            <strong>Rate Limited:</strong> 10 requests per 15 minutes per owner
          </li>
          <li>
            <strong>Returns Token:</strong> JWT token valid for 3 days
          </li>
          <li>
            <strong>Password:</strong> Hashed securely before storage
          </li>
        </ul>
      </Text>
    </div>
  );
}
