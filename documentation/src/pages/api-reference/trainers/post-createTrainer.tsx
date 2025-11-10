import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import List from "../../../components/docs/List";
import Label from "../../../components/Label";

export default function CreateTrainer() {
  return (
    <div className="px-6 py-8">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>POST /trainers/createTrainer</code>
          <Label text="Protected route" color="#F87171" />
        </div>
      </div>

      <Text>
        This endpoint allows you to create a new trainer in the system. You need
        to provide the necessary trainer information in the request body.
      </Text>

      <Heading>Request Body</Heading>
      <Text>
        You need to provide the following fields in the JSON request body:
      </Text>
      <List
        items={[
          "firstname (string): Firstname of the user. e.g. 'Patrick'.",
          "lastname (string): Lastname of the user. e.g. 'Schmidt'.",
          "email (string): Email address of the user. e.g. 'patrick@gmail.com'.",
          "phone_number (string): Phone number of the trainer. e.g. '+4915123456789'.",
          "birthdate (string, format: YYYY-MM-DD): Birthdate of the user. e.g. '1990-05-15'.",
          "password (string): Password for the user account. e.g. 'securePassword123'.",
        ]}
      />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`const token = localStorage.getItem("token");

fetch("https://api.properform.app/trainers/createTrainer", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${token}\`
  },
  body: JSON.stringify({
    firstname: "Patrick",
    lastname: "Schmidt",
    email: "patrick@gmail.com",
    phone_number: "+4915123456789",
    birthdate: "1990-05-15",
    password: "securePassword123"
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
  "message": "Trainer Patrick Schmidt erstellt.",
  "trainerId": 123,
  "invite_code": "TRN-40234"
}`}
      />
    </div>
  );
}
