import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostExercisesCreate() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /admin/exercises/create</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Creates a new exercise entry. Requires authentication and the{" "}
        <code>owner</code> role. Rate limited to 30 requests per 15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "name": "Push-Up",
  "description": "Upper body pushing exercise",
  "instructions": "Place hands shoulder-width apart...",
  "video_mid": 5,
  "thumbnail_mid": 6,
  "sid": 1,
  "dlid": 2,
  "duration_minutes": 10,
  "equipment_needed": "None"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`name               (string, required)
description        (string, optional)
instructions       (string, optional)
video_mid          (number, optional, media id)
thumbnail_mid      (number, optional, media id)
sid                (number, required, structure id)
dlid               (number, required, difficulty level id)
duration_minutes   (number, optional, must be positive)
equipment_needed   (string, optional)`}
      />

      <Heading>Success Response (201)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok",
  "eid": 42
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing required fields (400)
{
  "error": "name, sid and dlid are required."
}

// Invalid duration (400)
{
  "error": "duration_minutes must be positive"
}

// Unauthorized (401)
{
  "error": "Unauthorized"
}

// Forbidden - not owner (403)
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
        The requester must be authenticated and have the <code>owner</code>{" "}
        role.
      </Text>
    </div>
  );
}
