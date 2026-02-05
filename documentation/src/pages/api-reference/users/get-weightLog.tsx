import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetWeightLogs() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /logs/weight</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Returns all weight log entries of the authenticated user. Only logs
        belonging to the currently logged-in user are returned. The user ID is
        resolved automatically from the JWT token.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "count": 3,
  "logs": [
    {
      "wlid": 3,
      "weight_kg": "100.00",
      "measured_at": "2026-02-05T07:37:55.000Z",
      "notes": "Hallo"
    },
    {
      "wlid": 2,
      "weight_kg": "100.00",
      "measured_at": "2026-02-05T07:32:45.000Z",
      "notes": null
    },
    {
      "wlid": 1,
      "weight_kg": "100.00",
      "measured_at": "2026-02-05T07:32:22.000Z",
      "notes": "Hallo "
    }
  ]
}`}
      />

      <Heading>Notes</Heading>
      <Text>
        Weight logs are sorted by measurement date in descending order (latest
        first). The measurement timestamp (<code>measured_at</code>) is set by
        the backend and represents the time of the weight entry. The{" "}
        <code>uid</code> is extracted from the authentication token and is not
        exposed in the response.
      </Text>
    </div>
  );
}
