import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function UserRegister() {
  return (
    <div className="px-6 py-8 space-y-6">

      <div className="flex items-center gap-3">
        <code>POST /auth/register</code>
        <Label text="Public route" color="#22C55E" />
      </div>

      <Text>
        Creates a new user account. After successful registration, an email
        verification code is sent to the provided email address.
      </Text>

      <Heading>Request Body</Heading>

      <CodeBlock
        language="json"
        code={`{
  "firstname": "Max",
  "birthdate": "2002-05-10",
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "weight": 75,
  "height": 180,
  "gender": "male",
  "onboarding_completed": false,
  "fitness_level": "beginner",
  "training_frequency": 3,
  "primary_goal": "Muscle gain",
  "stayLoggedIn": true
}`}
      />

      <Heading>Success Response (201)</Heading>

      <CodeBlock
        language="json"
        code={`{
  "message": "user successfully created.",
  "token": "JWT_TOKEN",
  "uid": 12
}`}
      />

      <Heading>Error Responses</Heading>

      <CodeBlock
        language="json"
        code={`400 Bad Request
{
  "error": "please fill all required fields."
}`}
      />

      <CodeBlock
        language="json"
        code={`400 Bad Request
{
  "error": "password must be at least 8 characters long and contain uppercase, lowercase, number, and special character."
}`}
      />

      <CodeBlock
        language="json"
        code={`400 Bad Request
{
  "error": "invalid email address."
}`}
      />

      <CodeBlock
        language="json"
        code={`409 Conflict
{
  "error": "email already registered."
}`}
      />

    </div>
  );
}

