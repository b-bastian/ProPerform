import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function AdminLogin() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Titel + Label */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>POST /users/adminLogin</code>
          <Label text="Public route" color="#22C55E" />
        </div>
      </div>

      <Text>
        This endpoint allows administrators to log in. On success, a JWT token
        is returned, which must be included in the Authorization header for all
        protected admin routes.
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
        code={`fetch("https://api.properform.app/users/adminLogin", {
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
