import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import List from "../../../components/docs/List";
import ItalicText from "../../../components/docs/ItalicText";

export default function GetAllTrainers() {
  return (
    <div className="px-6 py-8">
      <Heading>
        <code>GET /users/getAllTrainers</code>
      </Heading>
      <Text>
        This endpoint allows you to retrieve a list of all the trainers in the
        database.
      </Text>

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`const token = localStorage.getItem("token");

fetch("https://api.properform.app/users/getAllTrainers", {
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
      "tid": 1,
      "firstname": "Alex",
      "birthdate": "1990-05-15",
      "email": "alex@gmail.com",
    },
    {
      "tid": 2,
      "firstname": "Julia",
      "birthdate": "1994-02-20",
      "email": "julia@gmail.com",
    }
  ]
}`}
      />
    </div>
  );
}
