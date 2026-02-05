import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostWeightLog() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /logs/weight</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Creates a new weight log entry for the authenticated user. The user ID
        is automatically resolved from the JWT token and must not be sent
        manually.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Request Body</Heading>
      <Text>
        <strong>weight_kg</strong> is required. <strong>notes</strong> is
        optional.
      </Text>

      <CodeBlock
        language="json"
        code={`{
  "weight_kg": 100,
  "notes": "Hallo"
}`}
      />

      <Heading>Request Body (without notes)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "weight_kg": 100
}`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok",
  "weight_kg": 100
}`}
      />

      <Heading>Notes</Heading>
      <Text>
        The measurement timestamp (<code>measured_at</code>) is set
        automatically by the backend at the time of insertion. The{" "}
        <code>uid</code> is extracted from the authentication token and is not
        part of the request body.
      </Text>
    </div>
  );
}
