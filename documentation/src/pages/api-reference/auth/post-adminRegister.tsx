import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function AdminRegister() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>POST /auth/admin/register</code>
          <Label text="Public route" color="#22C55E" />
        </div>
      </div>

      <Text>
        Registers a new administrator account. This endpoint creates a user with
        admin privileges (role_id = 1). Intended for initial setup or internal
        admin creation.
      </Text>

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "firstname": "Max",
  "birthdate": "1985-08-12",
  "email": "admin@example.com",
  "password_hash": "PlainPassword123!"
}`}
      />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`fetch("https://api.properform.app/auth/admin/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    firstname: "Max",
    birthdate: "1985-08-12",
    email: "admin@example.com",
    password_hash: "PlainPassword123!"
  })
})
  .then(res => res.json())
  .then(data => console.log(data));`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Admin Max registriert."
}`}
      />
    </div>
  );
}
