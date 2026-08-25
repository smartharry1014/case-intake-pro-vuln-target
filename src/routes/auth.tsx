import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "관리자 로그인 | 정도현 법률사무소" },
      { name: "description", content: "상담 접수 내역을 확인하기 위한 관리자 로그인 페이지입니다." },
      { property: "og:title", content: "관리자 로그인 | 정도현 법률사무소" },
      { property: "og:description", content: "정도현 법률사무소 관리자 전용 로그인." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const inputClass =
  "w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        toast.error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.");
        return;
      }
      navigate({ to: "/admin" });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      if (data.session) {
        navigate({ to: "/admin" });
      } else {
        toast.success("확인 메일을 보냈습니다. 메일함에서 인증을 완료해 주세요.");
      }
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <h1 className="text-2xl font-bold text-foreground">관리자 로그인</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        접수된 상담 신청 내역은 관리자만 확인할 수 있습니다.
      </p>
      <form
        onSubmit={onSubmit}
        className="panel-shadow mt-8 space-y-4 rounded-xl border border-border bg-card p-6"
      >
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            이메일
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "처리 중..." : mode === "signin" ? "로그인" : "계정 만들기"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          {mode === "signin" ? "관리자 계정 만들기" : "이미 계정이 있습니다"}
        </button>
      </form>
    </div>
  );
}
