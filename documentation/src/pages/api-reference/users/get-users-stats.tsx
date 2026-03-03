import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetUsersStats() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /users/stats</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Returns statistics about the system's users and trainers. Shows counts
        for owners, regular users, and trainers. Requires authentication. Rate
        limited to 10 requests per 15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "stats": {
    "owners": 2,
    "users": 128,
    "trainers": 15,
    "total": 145
  }
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Unauthorized (401)
{
  "error": "Unauthorized"
}

// Server error (500)
{
  "error": "Fehler beim Abrufen der Statistiken"
}`}
      />

      <Heading>Requirements</Heading>
      <Text>Requires authentication.</Text>
    </div>
  );
}
