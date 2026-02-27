import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetMedia() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /media</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Retrieves all uploaded media files. Requires authentication and the
        owner role. Returns files sorted by creation date (newest first).
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "count": 3,
  "media": [
    {
      "mid": 42,
      "type": "video",
      "filename": "exercise_demo_1234567890.mp4",
      "url": "https://media.properform.app/videos/exercise_demo_1234567890.mp4",
      "size": 52428800,
      "created_at": "2024-02-27T10:30:00Z"
    },
    {
      "mid": 41,
      "type": "image",
      "filename": "thumbnail_exercise.jpg",
      "url": "https://media.properform.app/images/thumbnail_exercise.jpg",
      "size": 102400,
      "created_at": "2024-02-26T15:20:00Z"
    }
  ]
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Unauthorized (401)
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
        Requires authentication and the <code>owner</code> role.
      </Text>
    </div>
  );
}
