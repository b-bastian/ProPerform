import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import List from "../../../components/docs/List";
import ItalicText from "../../../components/docs/ItalicText";

export default function GetNumberOfTrainers() {
  return (
    <div className="px-6 py-8">
      <Heading>
        <code>GET /users/getNumberOfTrainers</code>
      </Heading>
      <Text>
        This endpoint allows you to retrieve the number of trainers in the
        database.
      </Text>

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`const token = localStorage.getItem("token");

fetch("https://api.properform.app/users/getNumberOfTrainers", {
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
{ "trainerCount": 3 }`}
      />
    </div>
  );
}
