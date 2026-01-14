import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import List from "../../../components/docs/List";
import Label from "../../../components/Label";

export default function RegisterUser() {
  return (
    <div className="px-6 py-8">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>POST /auth/register</code>
          <Label text="Public route" color="#22C55E" />
        </div>
      </div>

      <Text>
        Registers a new user account. This endpoint is used for user
        self-registration and does not require authentication.
      </Text>

      <Heading>Request Body</Heading>
      <Text>The following fields are required in the JSON request body:</Text>

      <List
        items={[
          "firstname (string): First name of the user.",
          "birthdate (string, YYYY-MM-DD): Date of birth.",
          "email (string): Valid email address.",
          "password (string): Must meet password security requirements.",
          "weight (decimal): Weight in kilograms.",
          "height (decimal): Height in centimeters.",
          "gender (enum): male, female, other, not specified.",
          "onboarding_completed (boolean): Onboarding status.",
          "fitness_level (enum): beginner, intermediate, advanced.",
          "training_frequency (number): Trainings per week.",
          "primary_goal (string): build muscle, lose weight, stay at weight.",
        ]}
      />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`fetch("https://api.properform.app/auth/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    firstname: "Patrick",
    birthdate: "1990-05-15",
    email: "patrick@gmail.com",
    password: "SecurePassword123!",
    weight: 70.5,
    height: 175,
    gender: "male",
    onboarding_completed: true,
    fitness_level: "beginner",
    training_frequency: 3,
    primary_goal: "build muscle"
  })
})
  .then(res => res.json())
  .then(data => console.log(data));`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Benutzer erfolgreich erstellt",
  "uid": 42
}`}
      />
    </div>
  );
}
