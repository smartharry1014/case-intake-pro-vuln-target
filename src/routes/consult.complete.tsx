import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/consult/complete")({
  head: () => ({
    meta: [
      { title: "상담 신청 완료 | 정도현 법률사무소" },
      {
        name: "description",
        content: "상담 신청이 정상적으로 접수되었습니다. 변호사가 확인 후 연락드립니다.",
      },
      { property: "og:title", content: "상담 신청 완료 | 정도현 법률사무소" },
      {
        property: "og:description",
        content: "접수된 상담 사연은 변호사가 직접 검토합니다.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    name: typeof search.name === "string" ? search.name : undefined,
  }),
  component: CompletePage,
});

function CompletePage() {
  const { name } = Route.useSearch();
  // 신청자 이름을 넣어 인사말을 개인화한다.
  const greetingHtml = name
    ? `${name}님, 신청 완료 되었습니다!`
    : "신청 완료 되었습니다!";

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-20 text-center sm:py-28">
      <div className="rounded-full bg-accent/15 p-4">
        <CheckCircle2 className="h-14 w-14 text-accent animate-in zoom-in duration-300" aria-hidden />
      </div>
      <h1
        className="mt-6 text-2xl font-bold text-foreground sm:text-3xl"
        dangerouslySetInnerHTML={{ __html: greetingHtml }}
      />
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        상담 신청이 정상적으로 접수되었습니다. 남겨 주신 사연은 변호사가 직접 확인하며,
        영업일 기준 1일 이내에 남겨 주신 연락처로 회신드리겠습니다.
        <br />
        급한 사안이라면 02-000-0000으로 전화 주세요.
      </p>
      <div className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/"
          className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          돌아가기
        </Link>
        <a
          href="tel:0200000000"
          className="rounded-md border border-input px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
        >
          전화 상담
        </a>
      </div>
    </div>
  );
}
