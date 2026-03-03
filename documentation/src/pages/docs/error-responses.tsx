import Heading from "../../components/docs/Heading";
import Text from "../../components/docs/Text";
import CodeBlock from "../../components/docs/CodeBlock";

export default function ErrorResponses() {
  return (
    <div className="px-6 py-8 space-y-6">
      <Heading>Error Responses</Heading>

      <Text>
        This API uses standard HTTP status codes to indicate the success or
        failure of a request. Error responses always return a JSON object with
        an <code>error</code> or <code>message</code> field describing what went
        wrong.
      </Text>

      <Heading>400 – Bad Request</Heading>
      <Text>
        The request is malformed or missing required fields. This usually
        happens when mandatory request body parameters are not provided or have
        an invalid format.
      </Text>
      <CodeBlock
        language="json"
        code={`{
  "error": "Bitte alle erforderlichen Felder ausfüllen"
}`}
      />

      <Heading>401 – Unauthorized</Heading>
      <Text>
        Authentication failed. This error is returned when login credentials are
        invalid, a verification code is incorrect, or the provided JWT token is
        missing or invalid.
      </Text>
      <CodeBlock
        language="json"
        code={`{
  "error": "Ungültige Zugangsdaten"
}`}
      />

      <Heading>403 – Forbidden</Heading>
      <Text>
        The authenticated user does not have permission to access the requested
        resource. This typically occurs when a route requires a specific role
        (e.g. owner or trainer).
      </Text>
      <CodeBlock
        language="json"
        code={`{
  "error": "Keine Berechtigung für diese Aktion"
}`}
      />

      <Heading>404 – Not Found</Heading>
      <Text>
        The requested resource could not be found. This may occur when a user,
        trainer, or entity does not exist in the database.
      </Text>
      <CodeBlock
        language="json"
        code={`{
  "error": "User nicht gefunden"
}`}
      />

      <Heading>409 – Conflict</Heading>
      <Text>
        The request could not be completed due to a conflict with the current
        state of the resource. This is commonly returned when attempting to
        create a resource that already exists, such as registering with an email
        address that is already in use.
      </Text>
      <CodeBlock
        language="json"
        code={`{
  "error": "E-Mail bereits registriert."
}`}
      />

      <Heading>410 – Gone</Heading>
      <Text>
        The requested resource is no longer available. This status code is used
        for expired verification codes or password reset tokens.
      </Text>
      <CodeBlock
        language="json"
        code={`{
  "error": "Verifikationscode ist abgelaufen"
}`}
      />

      <Heading>429 – Too Many Requests</Heading>
      <Text>
        The client has sent too many requests in a given amount of time. This
        API uses rate limiting to protect against abuse. The client should wait
        before retrying the request.
      </Text>
      <CodeBlock
        language="json"
        code={`{
  "error": "Too many requests."
}`}
      />

      <Heading>500 – Internal Server Error</Heading>
      <Text>
        An unexpected error occurred on the server. This indicates a problem
        that could not be handled gracefully. Retrying the request may or may
        not succeed.
      </Text>
      <CodeBlock
        language="json"
        code={`{
  "error": "Interner Serverfehler"
}`}
      />

      <Text>
        Clients should always handle error responses gracefully and not assume
        that a request will always succeed. Checking both the HTTP status code
        and the response body is recommended.
      </Text>
    </div>
  );
}
