import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import ItalicText from "../../../components/docs/ItalicText";
import List from "../../../components/docs/List";
import Label from "../../../components/Label";

export default function DeleteUser() {
  return (
    <div className="px-6 py-8">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>DELETE /users/delete/:uid</code>
          <Label text="Protected route" color="#F87171" />
        </div>
      </div>

      <Text>
        This endpoint allows you to delete a specific user from the system by
        providing their <ItalicText>UID</ItalicText> in the request URL.
      </Text>

      <Heading>URL Parameters</Heading>
      <List
        items={[
          "uid (integer): The unique ID of the user to delete. Example: /users/deleteUser/42",
        ]}
      />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`const token = localStorage.getItem("token");
const uid = 42;

fetch(\`https://api.properform.app/users/deleteUser/\${uid}\`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${token}\`
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Benutzer erfolgreich gelöscht"
}`}
      />
    </div>
  );
}
