import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostAdminRegister() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /auth/admin/register</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Creates a new admin account. Requires authentication and the{" "}
        <code>owner</code> role. Rate limited to 5 requests per 15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "firstname": "Admin",
  "birthdate": "1985-03-20",
  "email": "admin@example.com",
  "password_hash": "SecurePass123!"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`firstname      (string, required)
birthdate      (string, optional, format: YYYY-MM-DD)
email          (string, required)
password_hash  (string, required)`}
      />

      <Heading>Success Response (201)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "admin Admin registered."
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing fields (400)
{
  "error": "required fields missing."
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
        The requester must be authenticated and have the <code>owner</code> role
        (role_id: 1).
      </Text>
    </div>
  );
}
