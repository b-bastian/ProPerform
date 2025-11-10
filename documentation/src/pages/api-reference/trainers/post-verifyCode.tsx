import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import List from "../../../components/docs/List";
import Label from "../../../components/Label";

export default function VerifyCode() {
  return (
    <div className="px-6 py-8">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>POST /trainers/verifyCode</code>
          <Label text="Protected route" color="#F87171" />
        </div>
      </div>

      <Text>
        This endpoint allows you to verify the invite code for a trainer. You
        need to provide the necessary invite code in the request body.
      </Text>

      <Heading>Request Body</Heading>
      <Text>
        You need to provide the following fields in the JSON request body:
      </Text>
      <List
        items={[
          "invite_code (string): The invite code to verify. e.g. 'TRN-40234'.",
        ]}
      />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`const token = localStorage.getItem("token");

fetch("https://api.properform.app/trainers/verifyCode", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${token}\`
  },
  body: JSON.stringify({
    invite_code: "TRN-40234"
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
  "valid": true,
  "trainer": 123
}`}
      />
    </div>
  );
}
