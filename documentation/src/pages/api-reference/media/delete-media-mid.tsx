import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function DeleteMediaMid() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>DELETE /media/:mid</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Deletes a media file by ID. Removes both the database record and the
        physical file from the media server. Requires authentication and the
        owner role.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>URL Parameters</Heading>
      <CodeBlock
        language="text"
        code={`mid: number - The media ID to delete`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok",
  "message": "media with id 42 deleted"
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Media not found (404)
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
        If the physical file is not found on the media server, the database
        record is still deleted. This prevents orphaned database entries.
      </Text>

      <Heading>Requirements</Heading>
      <Text>
        Requires authentication and the <code>owner</code> role.
      </Text>
    </div>
  );
}
