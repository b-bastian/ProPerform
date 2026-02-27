import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostTrainersVerifyCode() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /trainers/verify-code</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Verifies a trainer's invite code. Requires authentication. Rate limited
        to 10 requests per 15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "invite_code": "TRN-ABC123DEF456"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`invite_code  (string, required, non-empty)`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "success": true
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing invite code (400)
{
  "error": "Einladungscode fehlt."
}

// Invalid invite code (404)
{
  "error": "Ungültiger Einladungscode."
}

// Unauthorized (401)
{
  "error": "Unauthorized"
}

// Server error (500)
{
  "error": "Interner Serverfehler."
}`}
      />

      <Heading>Requirements</Heading>
      <Text>
        Requires authentication. The invite code must be valid and belong to an
        existing trainer.
      </Text>
    </div>
  );
}
