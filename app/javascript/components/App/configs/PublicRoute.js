import { Navigate } from "react-router-dom";
import { getProfile } from "../utils/handleAuth";

export default function PublicRoute({ children }) {
  const user = getProfile();

  if (!user) {
    return children;
  }

  return <Navigate to="/app/statements" />;
}