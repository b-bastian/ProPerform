import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetMe() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /users/me</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Returns the authenticated user's profile data. Requires a valid JWT
        token in the Authorization header.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "uid": 12,
  "firstname": "Max",
  "email": "user@example.com",
  "role_id": 2,
  "email_verified": true
}`}
      />
    </div>
  );
}
