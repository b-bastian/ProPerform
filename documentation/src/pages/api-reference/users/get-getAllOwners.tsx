import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import List from "../../../components/docs/List";
import ItalicText from "../../../components/docs/ItalicText";
import Label from "../../../components/Label";

export default function GetAllOwners() {
  return (
    <div className="px-6 py-8">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>GET /users/getAllOwners</code>
          <Label text="Protected route" color="#F87171" />
        </div>
      </div>
      <Text>
        This endpoint allows you to retrieve a list of all the owners in the
        database.
      </Text>

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`const token = localStorage.getItem("token");

fetch("https://api.properform.app/users/getAllOwners", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${token}\`
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("Error:", err));`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`
{
  "users": [
    {
      "uid": 1,
      "firstname": "Bastian",
      "birthdate": "1990-05-15",
      "email": "bastian@gmail.com",
      "role_id": 1
    },
    {
      "uid": 2,
      "firstname": "Julia",
      "birthdate": "1994-02-20",
      "email": "julia@gmail.com",
      "role_id": 1
    }
  ]
}`}
      />
    </div>
  );
}
