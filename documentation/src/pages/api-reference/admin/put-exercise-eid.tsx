import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PutExercisesEid() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>PUT /admin/exercises/:eid</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Updates an existing exercise with new information. Requires
        authentication and the <code>owner</code> role. All fields are required.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>URL Parameters</Heading>
      <CodeBlock
        language="text"
        code={`eid: number - The exercise ID to update`}
      />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "name": "Push-Up",
  "description": "Upper body pushing exercise",
  "instructions": "Place hands shoulder-width apart...",
  "video_url": "https://media.properform.app/videos/video.mp4",
  "thumbnail_url": "https://media.properform.app/images/thumb.jpg",
  "sid": 1,
  "dlid": 2,
  "duration_minutes": 10,
  "equipment_needed": "None"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`name           (string, required)
description    (string, required)
instructions   (string, required)
video_url      (string, optional)
thumbnail_url  (string, optional)
sid            (number, required)
dlid           (number, required)
duration_minutes (number, required, must be positive integer)
equipment_needed (string, optional)`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok"
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Invalid exercise ID (400)
{
  "error": "invalid exercise id"
}

// Missing required fields (400)
{
  "error": "missing required fields"
}

// Invalid duration (400)
{
  "error": "duration_minutes must be a positive integer"
}

// Exercise not found (404)
{
  "error": "exercise not found"
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
