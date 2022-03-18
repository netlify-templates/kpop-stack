import { useMemo } from "react";
import { useMatches } from "remix";


export function useMatchesData(id: string) {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );

  return route?.data;
}

export function isUser(user) {
  return user && typeof user === 'object';
}

export function useOptionalUser() {
  const data = useMatchesData("root");
  if(!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}