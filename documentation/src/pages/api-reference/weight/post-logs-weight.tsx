import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostLogsWeight() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /logs/weight</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Logs a weight measurement for the authenticated user. Requires
        authentication and user or owner role. Rate limited to 20 requests per
        15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "weight_kg": 75.5,
  "notes": "After workout"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`weight_kg  (number, required, must be positive)
notes      (string, optional)`}
      />

      <Heading>Success Response (201)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok",
  "weight_kg": 75.5
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing weight_kg (400)
{
  "error": "weight_kg is required."
}

// Invalid weight (400)
{
  "error": "invalid weight_kg"
}

// Unauthorized (401)
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
      <Text>
        Requires authentication and user or owner role. Weight must be a
        positive number.
      </Text>
    </div>
  );
}
