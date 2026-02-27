import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function DeleteUsersUid() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>DELETE /users/:uid</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Deletes a user account by ID. Requires authentication and the{" "}
        <code>owner</code> role. Rate limited to 10 requests per 15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>URL Parameters</Heading>
      <CodeBlock language="text" code={`uid: number - The user ID to delete`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Benutzer erfolgreich gelöscht"
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// User not found (404)
{
  "error": "Benutzer nicht gefunden"
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
  "error": "Fehler beim Löschen des Benutzers"
}`}
      />

      <Heading>Requirements</Heading>
      <Text>
        Requires authentication and the <code>owner</code> role.
      </Text>
    </div>
  );
}
