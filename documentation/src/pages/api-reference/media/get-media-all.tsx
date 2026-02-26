import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetAllMedia() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /media/all</code>
        <Label text="Protected route" color="#F59E0B" />
        <Label text="Owner only" color="#EF4444" />
      </div>

      <Text>
        Retrieves a list of all media files (images and videos). Results are
        ordered by creation date in descending order (newest first).
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
      "mid": 5,
      "type": "image",
      "filename": "profile-pic.jpg",
      "url": "https://media.properform.app/images/profile-pic.jpg",
      "size": 245632,
      "created_at": "2024-02-26T10:30:00Z"
    },
    {
      "mid": 4,
      "type": "video",
      "filename": "tutorial.mp4",
      "url": "https://media.properform.app/videos/tutorial.mp4",
      "size": 5242880,
      "created_at": "2024-02-25T15:20:00Z"
    },
    {
      "mid": 3,
      "type": "image",
      "filename": "banner.png",
      "url": "https://media.properform.app/images/banner.png",
      "size": 512000,
      "created_at": "2024-02-24T08:10:00Z"
    }
  ]
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Server error (500)
{
  "error": "internal server error"
}`}
      />

      <Heading>Notes</Heading>
      <Text>
        The count field shows the total number of media files. File sizes are
        returned in bytes. Only users with the owner role can access this
        endpoint. Results are sorted by newest first based on creation date.
      </Text>
    </div>
  );
}
