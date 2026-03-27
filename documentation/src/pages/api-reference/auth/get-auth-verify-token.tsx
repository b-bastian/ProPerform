import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetAuthVerifyToken() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /auth/verify-token</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Verifies the validity of the provided JWT token and returns basic user
        information if the token is valid. This endpoint is useful for checking
        token status and retrieving the authenticated user's basic profile data.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "valid": true,
  "uid": 42,
  "user": {
    "uid": 42,
    "firstname": "John",
    "email": "john@example.com",
    "created_at": "2024-01-15T08:00:00Z",
    "last_login": "2024-03-26T10:30:00Z"
  }
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Invalid token (500)
{
  "message": "invalid token.",
  "error": "error details"
}

// Server error (500)
{
  "error": "server error: error message"
}`}
      />

      <Heading>Use Cases</Heading>
      <Text>
        This endpoint can be used to:
        <ul className="list-disc ml-5 mt-2">
          <li>Verify that a stored token is still valid</li>
          <li>Check if a user's session is active</li>
          <li>Retrieve current user information from a valid token</li>
          <li>Validate token status on app startup</li>
        </ul>
      </Text>
    </div>
  );
}
