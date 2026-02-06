import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function UpdateExercise() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>PUT /exercises/:eid</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Updates an existing exercise. Requires authentication and the
        <code>owner</code> role.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="http"
        code={`PUT /exercises/12
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Push-Up",
  "description": "Classic chest exercise",
  "instructions": "Keep your back straight",
  "video_url": "https://example.com/pushup.mp4",
  "thumbnail_url": null,
  "sid": 1,
  "dlid": 2,
  "duration_minutes": 5,
  "equipment_needed": null
}`}
      />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "name": "Push-Up",
  "description": "Classic chest exercise",
  "instructions": "Keep your back straight",
  "video_url": "https://example.com/pushup.mp4",
  "thumbnail_url": null,
  "sid": 1,
  "dlid": 2,
  "duration_minutes": 5,
  "equipment_needed": null
}`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock language="json" code={`{ "status": "ok" }`} />
    </div>
  );
}
