"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    // Fire-and-forget: don't block the redirect on this.
    fetch("/api/admin/notify-login", { method: "POST" }).catch(() => {});

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-parchment px-5">
      <div className="w-full max-w-md rounded-sm border border-line bg-white p-8">
        <div className="mb-7 text-center">
          <h1 className="font-serif text-2xl font-semibold">Absolute Grace Properties</h1>
          <p className="mt-1 font-mono text-xs font-medium uppercase tracking-wider text-indigo">
            Admin Login
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="mb-4 rounded-sm bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}