import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetExerciseById() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /exercises/:eid</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Returns a single exercise by its ID. Requires authentication and the{" "}
        <code> owner</code> role.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="http"
        code={`GET /exercises/12
Authorization: Bearer <JWT_TOKEN>`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "eid": 12,
  "name": "Push-Up",
  "description": "Classic bodyweight chest exercise",
  "instructions": "Keep your core tight",
  "video_url": "https://example.com/pushup.mp4",
  "thumbnail_url": null,
  "sid": 1,
  "dlid": 2,
  "duration_minutes": 5,
  "equipment_needed": null,
  "created_by": 1,
  "created_at": "2026-02-05T09:11:09.000Z",
  "updated_at": "2026-02-05T09:11:09.000Z"
}`}
      />
    </div>
  );
}
