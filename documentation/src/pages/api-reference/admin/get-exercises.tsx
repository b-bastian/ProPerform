import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetExercises() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /exercises</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Returns a paginated list of exercises. Requires authentication and the
        <code>owner</code> role.
      </Text>

      <Heading>Query Parameters</Heading>
      <CodeBlock
        language="http"
        code={`page   (number, optional, default: 1)
limit  (number, optional, default: 10, max: 100)`}
      />

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="http"
        code={`GET /exercises?page=1&limit=10
Authorization: Bearer <JWT_TOKEN>`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "count": 2,
  "total": 42,
  "page": 1,
  "limit": 10,
  "totalPages": 5,
  "exercises": [
    {
      "eid": 12,
      "name": "Push-Up",
      "created_by": 1
    }
  ]
}`}
      />
    </div>
  );
}
