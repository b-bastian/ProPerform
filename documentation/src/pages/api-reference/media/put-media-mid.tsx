import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PutMediaMid() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>PUT /media/:mid</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Updates the filename of a media file. Renames the physical file on the
        media server and updates the database record. Requires authentication
        and the owner role.
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
  "filename": "new_exercise_name.mp4"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`filename  (string, required, non-empty)`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok",
  "message": "media with id 42 updated"
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

      <Heading>Notes</Heading>
      <Text>
        The filename is sanitized to remove special characters. The media URL is
        automatically updated after renaming.
      </Text>

      <Heading>Requirements</Heading>
      <Text>
        Requires authentication and the <code>owner</code> role.
      </Text>
    </div>
  );
}
