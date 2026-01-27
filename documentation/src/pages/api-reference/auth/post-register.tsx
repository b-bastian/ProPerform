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
        Registers a new user account and sends an email verification code to the
        provided email address.
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
  "primary_goal": "Muscle gain"
}`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Benutzer erfolgreich erstellt",
  "uid": 12
}`}
      />
    </div>
  );
}
