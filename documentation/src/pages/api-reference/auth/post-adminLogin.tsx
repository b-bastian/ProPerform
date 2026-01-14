import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function AdminLogin() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>POST /auth/admin/login</code>
          <Label text="Public route" color="#22C55E" />
        </div>
      </div>

      <Text>
        Logs in an administrator account. On success, a JWT token is returned
        containing the admin role. This token must be sent in the Authorization
        header when accessing protected admin routes.
      </Text>

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "email": "admin@example.com",
  "password": "yourPassword123"
}`}
      />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`fetch("https://api.properform.app/auth/admin/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "admin@example.com",
    password: "yourPassword123"
  })
})
  .then(res => res.json())
  .then(data => console.log(data));`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Admin-Login erfolgreich",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}`}
      />
    </div>
  );
}
