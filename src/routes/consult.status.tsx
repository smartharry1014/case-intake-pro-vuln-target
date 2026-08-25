import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

type Consultation = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
};

export const Route = createFileRoute("/consult/status")({
  head: () => ({
    meta: [
      { title: "상담 접수 확인 | 정도현 법률사무소" },
      { name: "description", content: "접수번호로 상담 신청 처리 상태를 확인하세요." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    no: search.no !== undefined ? Number(search.no) : undefined,
  }),
  loaderDeps: ({ search }) => ({ no: search.no }),
  loader: async ({ deps }) => {
    if (!deps.no || !Number.isFinite(deps.no) || deps.no < 1) return { record: null as Consultation | null };
    // 접수 순서(생성일시 오름차순)를 그대로 접수번호로 노출한다.
    const { data } = await supabase
      .from("consultations")
      .select("id, name, phone, email, message, created_at")
      .order("created_at", { ascending: true })
      .range(deps.no - 1, deps.no - 1);
    return { record: (data?.[0] as Consultation | undefined) ?? null };
  },
  component: StatusPage,
});

function formatDate(value: string) {
  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusPage() {
  const { no } = Route.useSearch();
  const { record } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-xl px-5 py-14 sm:py-20">
      <p className="text-xs tracking-[0.25em] text-muted-foreground">STATUS</p>
      <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">상담 접수 확인</h1>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        신청 완료 시 안내된 접수번호를 입력하면 처리 상태를 확인할 수 있습니다.
      </p>

      <form method="GET" className="mt-8 flex gap-2">
        <input
          name="no"
          type="number"
          min={1}
          defaultValue={no ?? ""}
          placeholder="접수번호"
          className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          조회
        </button>
      </form>

      {no ? (
        record ? (
          <div className="panel-shadow mt-8 space-y-2 rounded-lg border border-border bg-card p-6 text-sm">
            <p>
              <span className="text-muted-foreground">이름</span> {record.name}
            </p>
            <p>
              <span className="text-muted-foreground">연락처</span> {record.phone}
            </p>
            <p>
              <span className="text-muted-foreground">이메일</span> {record.email}
            </p>
            <p className="whitespace-pre-wrap">
              <span className="text-muted-foreground">사연</span> {record.message}
            </p>
            <p className="text-xs text-muted-foreground">접수일시 {formatDate(record.created_at)}</p>
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted-foreground">해당 접수번호를 찾을 수 없습니다.</p>
        )
      ) : null}

      <Link to="/consult" className="mt-8 inline-block text-xs text-muted-foreground underline-offset-4 hover:underline">
        새 상담 신청하기
      </Link>
    </div>
  );
}
