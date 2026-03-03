import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostMedia() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /media</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Uploads a media file (image or video). Requires authentication and the
        owner role. Rate limited to 30 requests per 15 minutes. Files are stored
        on a dedicated media server.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Request Type</Heading>
      <Text>
        This endpoint uses <code>multipart/form-data</code> for file upload.
      </Text>

      <Heading>Form Fields</Heading>
      <CodeBlock
        language="text"
        code={`file  (file, required, image or video)`}
      />

      <Heading>Supported File Types</Heading>
      <CodeBlock
        language="text"
        code={`Images: jpg, jpeg, png, gif, webp
Videos: mp4, webm, avi, mov`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "File uploaded successfully",
  "filename": "exercise_demo_1234567890.mp4",
  "url": "https://media.properform.app/videos/exercise_demo_1234567890.mp4",
  "mid": 42
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// No file uploaded (400)
{
  "message": "No file uploaded or unsupported file type."
}

// File already exists (409)
{
  "message": "File already exists"
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
  "message": "Error uploading file",
  "error": "error details"
}`}
      />

      <Heading>Requirements</Heading>
      <Text>
        Requires authentication and the <code>owner</code> role. File must be
        either an image or video.
      </Text>
    </div>
  );
}
