import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Shield, LogIn } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button, Input } from "@/components/ui";

export default function AdminLogin() {
  const { login, isAuthenticated, loading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/admin/products";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-ui flex min-h-screen items-center justify-center bg-surface-base px-ds-3 py-ds-6 font-primary text-lg">
      <div className="w-full max-w-md">
        <div className="mb-ds-5 text-center">
          <span className="mx-auto mb-ds-3 flex h-16 w-16 items-center justify-center rounded-ds-md bg-text-secondary text-surface-base">
            <Shield className="h-8 w-8" strokeWidth={2} />
          </span>
          <h1 className="text-3xl font-semibold text-text-primary md:text-4xl">
            Admin sign in
          </h1>
          <p className="mt-ds-2 text-lg text-text-disabled">
            Manage products, images, and inventory for Abhyati Food Pak.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-ds-4 rounded-ds-md border border-border-muted bg-surface-raised p-ds-4 shadow-lg"
        >
          <Input
            label="Email"
            name="email"
            type="email"
            size="lg"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            size="lg"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p role="alert" className="text-base text-feedback-error">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full gap-ds-2 text-lg"
            disabled={submitting}
          >
            <LogIn className="h-5 w-5" />
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-ds-4 text-center text-base text-text-disabled">
          <Link to="/" className="text-lg text-text-secondary hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
