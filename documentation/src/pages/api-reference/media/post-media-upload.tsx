import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function UploadMedia() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /media/upload</code>
        <Label text="Protected route" color="#F59E0B" />
        <Label text="Owner only" color="#EF4444" />
        <Label text="Rate limited" color="#8B5CF6" />
      </div>

      <Text>
        Uploads a new media file (image or video). Files are stored on the media
        server and metadata is saved to the database. Supports common image and
        video formats.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Request</Heading>
      <CodeBlock
        language="text"
        code={`Content-Type: multipart/form-data

Form Fields:
- file: binary - The file to upload (images or videos)`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "File uploaded successfully",
  "filename": "sunset-photo_1234567890.jpg",
  "url": "https://media.properform.app/images/sunset-photo_1234567890.jpg",
  "mid": 12
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// No file provided or unsupported type (400)
{
  "message": "No file uploaded or unsupported file type."
}

// File already exists (409)
{
  "message": "File already exists"
}

// Server error (500)
{
  "message": "Error uploading file",
  "error": "error details"
}`}
      />

      <Heading>Rate Limiting</Heading>
      <CodeBlock
        language="text"
        code={`Max 30 uploads per 15-minute window per user`}
      />

      <Heading>Supported Formats</Heading>
      <Text>
        Images: JPEG, PNG, GIF, WebP, and other common image formats. Videos:
        MP4, WebM, and other common video formats. File type is automatically
        detected from the MIME type.
      </Text>

      <Heading>Notes</Heading>
      <Text>
        Files are automatically organized into image/ or video/ folders based on
        their MIME type. The returned mid (media ID) can be used to update or
        delete the file later. File sizes are stored and can be retrieved via
        the GET /media/all endpoint.
      </Text>
    </div>
  );
}
