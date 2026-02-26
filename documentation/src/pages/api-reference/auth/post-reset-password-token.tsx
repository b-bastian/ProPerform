import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function ResetPasswordToken() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /reset-password/:token</code>
        <Label text="Public route" color="#10B981" />
      </div>

      <Text>
        Completes the password reset process by validating the reset token and
        updating the user's password. The token is obtained from the password
        reset email.
      </Text>

      <Heading>URL Parameters</Heading>
      <CodeBlock
        language="text"
        code={`token: string - The reset token from the password reset email`}
      />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "password": "newSecurePassword123"
}`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "password updated successfully."
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing password (400)
{
  "message": "password is required."
}

// Password too short (400)
{
  "message": "Password must be at least 8 characters."
}

// Invalid token (400)
{
  "message": "invalid token."
}

// Token expired (400)
{
  "message": "token expired."
}

// Server error (500)
{
  "message": "failed to reset password",
  "error": "error message details"
}`}
      />

      <Heading>Requirements</Heading>
      <Text>
        Password must be at least 8 characters long. The token is only valid for
        15 minutes from when the password reset was requested. After successful
        password reset, the token is automatically invalidated.
      </Text>
    </div>
  );
}
