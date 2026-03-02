import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostTrainers() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /trainers</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Creates a new trainer account. Requires authentication and the{" "}
        <code>owner</code> role. Generates a unique invite code for the trainer
        to use when linking athletes. Rate limited to 10 requests per 15
        minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "firstname": "John",
  "lastname": "Doe",
  "birthdate": "1985-06-20",
  "email": "trainer@example.com",
  "phone_number": "+41791234567",
  "password": "SecurePass123!"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`firstname      (string, required)
lastname       (string, required)
birthdate      (string, required, format: YYYY-MM-DD)
email          (string, required)
phone_number   (string, required)
password       (string, required)`}
      />

      <Heading>Success Response (201)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Trainer John Doe erstellt.",
  "trainerId": 5,
  "invite_code": "TRN-ABC123DEF456"
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing required fields (400)
{
  "error": "Pflichtfelder fehlen"
}

// Email already exists (409)
{
  "error": "Ein Trainer mit dieser E-Mail existiert bereits."
}

// Unauthorized (401)
{
  "error": "Unauthorized"
}

// Forbidden - not owner (403)
{
  "error": "Forbidden"
}

// Server error (500)
{
  "error": "error message"
}`}
      />

      <Heading>Requirements</Heading>
      <Text>
        Requires authentication and the <code>owner</code> role. Email must be
        unique.
      </Text>
    </div>
  );
}
