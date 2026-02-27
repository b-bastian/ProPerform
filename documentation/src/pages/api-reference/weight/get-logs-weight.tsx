import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetLogsWeight() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /logs/weight</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Returns all weight measurements for the authenticated user, sorted by
        date in descending order (newest first). Requires authentication and
        user or owner role.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "count": 3,
  "logs": [
    {
      "wlid": 42,
      "weight_kg": 75.5,
      "measured_at": "2024-02-27T10:30:00Z",
      "notes": "After workout"
    },
    {
      "wlid": 41,
      "weight_kg": 76.0,
      "measured_at": "2024-02-26T08:15:00Z",
      "notes": "Morning measurement"
    }
  ]
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Unauthorized (401)
{
  "error": "Unauthorized"
}

// Forbidden - wrong role (403)
{
  "error": "Forbidden"
}

// Server error (500)
{
  "error": "internal server error"
}`}
      />

      <Heading>Requirements</Heading>
      <Text>Requires authentication and user or owner role.</Text>
    </div>
  );
}
