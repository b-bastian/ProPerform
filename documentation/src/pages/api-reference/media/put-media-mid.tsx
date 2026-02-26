import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function UpdateMedia() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>PUT /media/:mid</code>
        <Label text="Protected route" color="#F59E0B" />
        <Label text="Owner only" color="#EF4444" />
      </div>

      <Text>
        Updates the filename of a media file. The physical file is renamed on
        the media server and the database record is updated accordingly.
        Requires authentication and owner role.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>URL Parameters</Heading>
      <CodeBlock
        language="text"
        code={`mid: number - The media ID to update`}
      />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "filename": "my-new-filename.jpg"
}`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok",
  "message": "media with id 5 updated"
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing filename (400)
{
  "error": "filename is required"
}

// Media not found (404)
{
  "error": "media not found"
}

// Server error (500)
{
  "error": "internal server error"
}`}
      />

      <Heading>Notes</Heading>
      <Text>
        Special characters in filenames are automatically sanitized and replaced
        with underscores. The file extension is preserved from the request. Only
        users with the owner role can update media. The new file URL will be
        returned in the database after update.
      </Text>
    </div>
  );
}
