import { Navigate } from "react-router-dom";

/** Legacy route — redirect to sectioned content editor */
export default function AdminSiteContent() {
  return <Navigate to="/admin/site-content/home" replace />;
}
