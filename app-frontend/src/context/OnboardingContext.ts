import { createContext } from 'react';

export const OnboardingContext = createContext<{
  finishOnboarding: () => void;
  resetOnboarding: () => void;
}>({
  finishOnboarding: () => {},
  resetOnboarding: () => {},
});
