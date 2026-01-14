import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function UserLogin() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>POST /auth/login</code>
          <Label text="Public route" color="#22C55E" />
        </div>
      </div>

      <Text>
        Logs in a regular user account. On success, a JWT token is returned.
        Depending on the stayLoggedIn flag, the token expiration time differs.
      </Text>

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "stayLoggedIn": true
}`}
      />

      <Heading>Request Body Fields</Heading>
      <Text>
        stayLoggedIn is optional. If set to true, the token will have a longer
        expiration time.
      </Text>

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`fetch("https://api.properform.app/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "user@example.com",
    password: "SecurePassword123!",
    stayLoggedIn: true
  })
})
  .then(res => res.json())
  .then(data => console.log(data));`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Login erfolgreich",
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "uid": 17
}`}
      />
    </div>
  );
}
