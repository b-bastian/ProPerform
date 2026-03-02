import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function CheckInviteCode() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /trainers/check-invite-code</code>
        <Label text="Public route" color="#10B981" />
      </div>

      <Text>
        Validates a trainer invite code and retrieves the trainer's information
        without authentication. Useful for pre-validating codes before
        connecting. Rate limited to 20 requests per 15 minutes.
      </Text>

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "invite_code": "TRN-ABC123XYZ"
}`}
      />

      <Heading>Success Response (200) - Valid Code</Heading>
      <CodeBlock
        language="json"
        code={`{
  "success": true,
  "trainer": {
    "tid": 5,
    "firstname": "Max",
    "lastname": "Mustermann"
  }
}`}
      />

      <Heading>Success Response (200) - Invalid Code</Heading>
      <CodeBlock
        language="json"
        code={`{
  "success": false,
  "message": "invalid invite code."
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing invite code (400)
{
  "success": false,
  "message": "invite code is required."
}

// Server error (500)
{
  "success": false,
  "message": "server error."
}`}
      />

      <Heading>Requirements</Heading>
      <Text>No authentication required. This is a public endpoint.</Text>
    </div>
  );
}
