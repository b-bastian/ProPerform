import Heading from "../../components/docs/Heading";
import Text from "../../components/docs/Text";
import CodeBlock from "../../components/docs/CodeBlock";
import Button from "../../components/Button";

import { useEffect, useRef, useState } from "react";

export default function TestUsers() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [requestState, setRequestState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const stateTimeoutRef = useRef<number | null>(null);

  const testUserName = "Testuser";
  const randomInt = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  const fullName = `${testUserName}${randomInt}`;
  const testUserEmail = `${fullName}@test.com`;

  useEffect(() => {
    return () => {
      if (stateTimeoutRef.current) {
        window.clearTimeout(stateTimeoutRef.current);
      }
    };
  }, []);

  const handleRegisterRequest = async () => {
    if (requestState === "loading") {
      return;
    }

    if (stateTimeoutRef.current) {
      window.clearTimeout(stateTimeoutRef.current);
      stateTimeoutRef.current = null;
    }

    setRequestState("loading");

    try {
      const result = await fetch("https://api.properform.app/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: fullName,
          birthdate: "1995-04-12",
          email: testUserEmail,
          password: "Demo1234!",
          weight: 82.5,
          height: 180.0,
          gender: "male",
          onboarding_completed: false,
          fitness_level: "beginner",
          training_frequency: 3,
          primary_goal: "build_muscle",
        }),
      });

      if (result.ok) {
        const data = await result.json();
        setSuccessMessage(
          `Test user registered successfully with email: ${testUserEmail}, Id: ${data.uid}`,
        );
        setErrorMessage("");
        setRequestState("success");
        stateTimeoutRef.current = window.setTimeout(() => {
          setRequestState("idle");
          stateTimeoutRef.current = null;
        }, 5000);
      } else {
        const errorData = await result.json();
        setErrorMessage(`Error registering test user: ${errorData.message}`);
        setSuccessMessage("");
        setRequestState("error");
        stateTimeoutRef.current = window.setTimeout(() => {
          setRequestState("idle");
          stateTimeoutRef.current = null;
        }, 5000);
      }
    } catch (_error) {
      setErrorMessage("Error registering test user: Network error.");
      setSuccessMessage("");
      setRequestState("error");
      stateTimeoutRef.current = window.setTimeout(() => {
        setRequestState("idle");
        stateTimeoutRef.current = null;
      }, 5000);
    }
  };

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Heading>Existing Test Users</Heading>
      </div>

      <Text>
        For testing purposes, you can use the following pre-registered user
        accounts.
      </Text>

      <Heading>User - Register</Heading>
      <CodeBlock
        language="http"
        code={`{
  "firstname": "${fullName}",
  "birthdate": "1995-04-12",
  "email": "${testUserEmail}",
  "password": "Demo1234!",
  "weight": 82.5,
  "height": 180.0,
  "gender": "male",
  "onboarding_completed": false,
  "fitness_level": "beginner",
  "training_frequency": 3,
  "primary_goal": "build_muscle"
}`}
      />

      {successMessage && (
        <div className="p-4 bg-green-100 text-green-800 rounded-2xl">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-100 text-red-800 rounded-2xl">
          {errorMessage}
        </div>
      )}

      <Button
        onClick={handleRegisterRequest}
        variant="primary"
        disabled={requestState === "loading"}
      >
        <span className="flex items-center">
          <span>Register Test User</span>
          {requestState !== "idle" && (
            <span className="relative ml-2 h-4 w-4">
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  requestState === "loading"
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-75"
                }`}
                aria-hidden="true"
              >
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  requestState === "success"
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-75"
                }`}
                aria-hidden="true"
              >
                <svg
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 10.5l3 3 7-7" />
                </svg>
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  requestState === "error"
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-75"
                }`}
                aria-hidden="true"
              >
                <svg
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 5l10 10M15 5l-10 10" />
                </svg>
              </span>
            </span>
          )}
        </span>
      </Button>

      <Heading>User - Login</Heading>
      <CodeBlock
        language="http"
        code={`{
  "email": "${testUserEmail}",
  "password": "Demo1234!",
}`}
      />

      <Heading>Notes</Heading>
      <Text>Login and register requests are the same test user.</Text>
    </div>
  );
}
