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
        with owner or trainer role. Trainers can only update media they created
        themselves.
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

      <Heading>Allowed Extensions</Heading>
      <CodeBlock
        language="text"
        code={`.jpg, .jpeg, .png, .webp, .mp4, .mov`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
        "status": "ok.",
        "message": "media with id 42 updated."
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing filename (400)
{
  "error": "filename is required."
}

// Filename already exists (400)
{
  "error": "filename already exists."
}

// Invalid file type (400)
{
  "error": "invalid file type."
}

// Media not found or access denied (404)
{
  "error": "media not found or access denied."
}

// Unauthorized (401)
{
  "error": "Unauthorized"
}

// Forbidden - missing owner/trainer role (403)
{
  "error": "Forbidden"
}

// Server error (500)
{
  "error": "internal server error."
}`}
      />

      <Heading>Notes</Heading>
      <Text>
        The filename is sanitized to remove special characters. The media URL is
        automatically updated after renaming.
      </Text>

      <Heading>Requirements</Heading>
      <Text>
        Requires authentication and either <code>owner</code> or
        <code> trainer</code> role.
      </Text>
    </div>
  );
}
