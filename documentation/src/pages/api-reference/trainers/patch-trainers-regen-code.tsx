import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PatchTrainersRegenerateCode() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>PATCH /trainers/:tid/regenerate-code</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Generates a new invite code for a trainer. The old code becomes invalid.
        Requires authentication and the <code>trainer</code> role. Rate limited
        to 5 requests per 15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>URL Parameters</Heading>
      <CodeBlock language="text" code={`tid: number - The trainer ID`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Einladungscode erfolgreich aktualisiert.",
  "newCode": "TRN-XYZ789UVW012"
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Trainer not found (404)
{
  "error": "Trainer nicht gefunden."
}

// Unauthorized (401)
{
  "error": "Unauthorized"
}

// Forbidden - wrong role (403)
{
  "error": "Forbidden"
}

// Server error (500)
{
  "error": "error message"
}`}
      />

      <Heading>Requirements</Heading>
      <Text>
        Requires authentication and the <code>trainer</code> role.
      </Text>
    </div>
  );
}
