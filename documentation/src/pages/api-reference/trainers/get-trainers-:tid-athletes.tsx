import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetTrainerAthletes() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /trainers/:tid/athletes</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Retrieves all athletes connected to a specific trainer. Only trainers
        can access their own athlete list. Requires authentication and the{" "}
        <code>trainer</code> role. Rate limited to 20 requests per 15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>URL Parameters</Heading>
      <CodeBlock language="text" code={`tid: number - The trainer ID`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "count": 3,
  "athletes": [
    {
      "uid": 42,
      "firstname": "John",
      "email": "john@example.com",
      "created_at": "2024-02-27T10:30:00Z"
    },
    {
      "uid": 43,
      "firstname": "Jane",
      "email": "jane@example.com",
      "created_at": "2024-02-20T14:45:00Z"
    },
    {
      "uid": 44,
      "firstname": "Mike",
      "email": "mike@example.com",
      "created_at": "2024-02-15T08:00:00Z"
    }
  ]
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Forbidden - accessing another trainer's athletes (403)
{
  "message": "forbidden."
}

// Server error (500)
{
  "message": "server error",
  "error": "error details"
}`}
      />

      <Heading>Requirements</Heading>
      <Text>
        Requires authentication and the <code>trainer</code> role. Trainers can
        only access their own athlete list.
      </Text>
    </div>
  );
}
