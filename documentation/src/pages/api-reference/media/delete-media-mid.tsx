import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function DeleteMedia() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>DELETE /media/:mid</code>
        <Label text="Protected route" color="#F59E0B" />
        <Label text="Owner only" color="#EF4444" />
      </div>

      <Text>
        Deletes a media file (image or video) and removes it from the database.
        Requires authentication and owner role. The physical file is removed
        from the media server.
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
  "message": "media with id 5 deleted"
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Media not found (404)
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
        The endpoint will attempt to delete both the database record and the
        physical file. If the file is already missing from the server, the
        database record will still be deleted. Only users with the owner role
        can delete media.
      </Text>
    </div>
  );
}
