import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import List from "../../../components/docs/List";
import Label from "../../../components/Label";

export default function CreateUser() {
  return (
    <div className="px-6 py-8">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>POST /users/createUser</code>
          <Label text="Protected route" color="#F87171" />
        </div>
      </div>

      <Text>
        This endpoint allows you to create a new user in the system. You need to
        provide the necessary user information in the request body.
      </Text>

      <Heading>Request Body</Heading>
      <Text>
        You need to provide the following fields in the JSON request body:
      </Text>
      <List
        items={[
          "firstname (string): Firstname of the user. e.g. 'Patrick'.",
          "birthdate (string, format: YYYY-MM-DD): Birthdate of the user. e.g. '1990-05-15'.",
          "email (string): Email address of the user. e.g. 'patrick@gmail.com'.",
          "password (string): Password for the user account. e.g. 'securePassword123'.",
          "weight (decimal): Weight of the user in kilograms. e.g. 70.5.",
          "height (decimal): Height of the user in centimeters. e.g. 175.0.",
          "gender (enum: 'male', 'female', 'other', 'not specified'): Gender of the user. e.g. 'male'.",
          "onboarding_completed (boolean): Indicates if the user has completed onboarding. e.g. true.",
          "fitness_level (enum: 'beginner', 'intermediate', 'advanced'): Fitness level of the user. e.g. 'beginner'.",
          "training_frequency (int): Number of training sessions per week (1-7 times per week). e.g. 3.",
          "primary_goal (string): Primary fitness goal of the user (build muscle, lose weight, stay at weight). e.g. 'build muscle'.",
        ]}
      />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`const token = localStorage.getItem("token");

fetch("https://api.properform.app/users/createUser", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${token}\`
  },
  body: JSON.stringify({
    firstname: "Patrick",
    birthdate: "1990-05-15",
    email: "patrick@gmail.com",
    password: "securePassword123",
    weight: 70.5,
    height: 175.0,
    gender: "male",
    onboarding_completed: true,
    fitness_level: "beginner",
    training_frequency: 3,
    primary_goal: "build muscle"
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("Error:", err));`}
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
