import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function ResendVerificationCode() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /resend-verification-code</code>
        <Label text="Public route" color="#10B981" />
      </div>

      <Text>
        Resends the email verification code to the user's email address. Can
        only be used for accounts that exist but haven't verified their email
        yet.
      </Text>

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "email": "user@example.com"
}`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "verification code resent."
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing email (400)
{
  "error": "email is required."
}

// Email already verified (400)
{
  "error": "email already verified."
}

// Server error (500)
{
  "error": "failed to resend verification code."
}`}
      />

      <Heading>Notes</Heading>
      <Text>
        The verification code is valid for 15 minutes. If the email doesn't
        exist in the database, a generic success message is returned for
        security reasons (prevents email enumeration).
      </Text>
    </div>
  );
}
