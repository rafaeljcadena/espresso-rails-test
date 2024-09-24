import { Navigate } from "react-router-dom";
import { getProfile } from "../utils/handleAuth";

export default function PrivateRoute({ children }) {
  const user = getProfile();

  if (!user) {
    return <Navigate to="/app/sign-in" />;
  }

  return children;
}