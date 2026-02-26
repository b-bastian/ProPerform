import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function ResetPassword() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /reset-password</code>
        <Label text="Public route" color="#10B981" />
      </div>

      <Text>
        Initiates the password reset process by sending a reset email with a
        token to the provided email address. Works for both verified and
        unverified accounts.
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
  "message": "If an account exists, a reset email has been sent."
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing email (400)
{
  "error": "email required."
}

// Server error (500)
{
  "error": "failed to send reset email.",
  "details": "error message details"
}`}
      />

      <Heading>Notes</Heading>
      <Text>
        The reset token is valid for 15 minutes. Any previous reset tokens for
        the email are automatically invalidated. A generic success message is
        returned regardless of whether the email exists (security best
        practice).
      </Text>
    </div>
  );
}
