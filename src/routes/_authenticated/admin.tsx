import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "상담 접수 관리 | 정도현 법률사무소" },
      { name: "description", content: "접수된 법률상담 신청 목록을 확인하는 관리자 페이지입니다." },
      { property: "og:title", content: "상담 접수 관리 | 정도현 법률사무소" },
      { property: "og:description", content: "관리자 전용 상담 접수 목록." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Consultation = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AdminPage() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["consultations"],
    queryFn: async (): Promise<Consultation[]> => {
      const { data, error } = await supabase
        .from("consultations")
        .select("id, name, phone, email, message, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.25em] text-muted-foreground">ADMIN</p>
          <h1 className="mt-2 text-2xl font-bold text-foreground">상담 접수 목록</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            총 {data?.length ?? 0}건이 접수되었습니다.
          </p>
        </div>
        <button
          onClick={signOut}
          className="rounded-md border border-input px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
        >
          로그아웃
        </button>
      </div>

      {isLoading ? (
        <p className="mt-10 text-sm text-muted-foreground">불러오는 중...</p>
      ) : error ? (
        <div className="panel-shadow mt-10 rounded-lg border border-border bg-card p-6 text-sm">
          <p className="font-medium text-destructive">목록을 불러올 수 없습니다.</p>
          <p className="mt-2 text-muted-foreground">
            이 계정에 관리자 권한이 없을 수 있습니다. 권한 부여 후 다시 시도해 주세요.
          </p>
        </div>
      ) : data && data.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">아직 접수된 상담 신청이 없습니다.</p>
      ) : (
        <>
          {/* 데스크톱 표 */}
          <div className="panel-shadow mt-8 hidden overflow-x-auto rounded-lg border border-border bg-card md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">이름</th>
                  <th className="px-4 py-3 font-medium">연락처</th>
                  <th className="px-4 py-3 font-medium">이메일</th>
                  <th className="px-4 py-3 font-medium">사연</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">접수일시</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((row) => (
                  <tr key={row.id} className="border-t border-border align-top">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-foreground">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {row.phone}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.email}</td>
                    <td className="max-w-md px-4 py-3 whitespace-pre-wrap text-muted-foreground">
                      {row.message}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {formatDate(row.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일 카드 */}
          <div className="mt-8 space-y-4 md:hidden">
            {data?.map((row) => (
              <div
                key={row.id}
                className="panel-shadow rounded-lg border border-border bg-card p-5 text-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-foreground">{row.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(row.created_at)}</p>
                </div>
                <p className="mt-2 text-muted-foreground">{row.phone}</p>
                <p className="text-muted-foreground">{row.email}</p>
                <p className="mt-3 whitespace-pre-wrap leading-6 text-foreground">{row.message}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
