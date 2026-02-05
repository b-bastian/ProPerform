import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostCreateExercise() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /admin/exercise/create</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Creates a new exercise entry in the system. This endpoint is restricted
        to users with the <strong>owner</strong> role. The{" "}
        <code>created_by</code> field is automatically derived from the JWT
        token and must not be provided manually.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Request Body</Heading>
      <Text>
        <strong>name</strong>, <strong>sid</strong> and <strong>dlid</strong>{" "}
        are required. All other fields are optional.
      </Text>

      <CodeBlock
        language="json"
        code={`{
  "name": "Squat",
  "description": "Fundamental lower body exercise focusing on legs and core",
  "instructions": "Keep your chest up, push your knees out and sit back into the movement",
  "video_url": "https://example.com/squat.mp4",
  "thumbnail_url": "https://example.com/squat.jpg",
  "sid": 1,
  "dlid": 1,
  "duration_minutes": 8,
  "equipment_needed": "Barbell or bodyweight"
}`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok",
  "eid": 2
}`}
      />

      <Heading>Notes</Heading>
      <Text>
        The exercise ID (<code>eid</code>) is generated automatically by the
        database. The <code>created_by</code> field is resolved from the
        authenticated user and is not part of the request body. Timestamps (
        <code>created_at</code>, <code>updated_at</code>) are managed internally
        by the database.
      </Text>
    </div>
  );
}
