import { createFileRoute, Link } from "@tanstack/react-router";
import heroOffice from "@/assets/hero-office.jpg";
import { Scale, Gavel, FileText, Users, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "정도현 법률사무소 | 이혼·형사·계약 법률상담" },
      {
        name: "description",
        content:
          "20년 경력 변호사가 이혼, 형사, 계약 분쟁을 직접 상담합니다. 온라인으로 사연을 남기시면 신속히 연락드립니다.",
      },
      { property: "og:title", content: "정도현 법률사무소 | 이혼·형사·계약 법률상담" },
      {
        property: "og:description",
        content: "변호사가 직접 검토하는 1:1 법률상담. 온라인 상담 신청 접수 중.",
      },
    ],
  }),
  component: Home,
});

const practices = [
  {
    icon: Users,
    title: "이혼·가사",
    desc: "협의이혼, 재산분할, 양육권 및 위자료 청구까지 감정 소모를 줄이는 전략을 제시합니다.",
  },
  {
    icon: Gavel,
    title: "형사",
    desc: "고소·고발 대응, 수사 단계 동행, 공판 변론까지 초기 대응이 결과를 바꿉니다.",
  },
  {
    icon: FileText,
    title: "계약·민사",
    desc: "계약서 검토와 작성, 손해배상·대여금 등 분쟁을 명확한 근거로 정리합니다.",
  },
  {
    icon: Scale,
    title: "부동산·임대차",
    desc: "매매·임대차 분쟁, 명도 및 보증금 반환 문제를 실무 중심으로 해결합니다.",
  },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroOffice}
          alt="정도현 법률사무소 상담실 전경"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <p className="text-xs tracking-[0.3em] text-primary-foreground/70">
            SINCE 2006 · SEOUL
          </p>
          <h1 className="mt-5 max-w-2xl font-serif text-3xl leading-snug text-primary-foreground sm:text-5xl sm:leading-tight">
            혼자 감당하지 마세요.
            <br />
            사건의 시작부터 끝까지 함께합니다.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
            의뢰인 한 분 한 분의 사건을 변호사가 직접 맡습니다. 사연을 남겨 주시면 검토 후
            영업일 기준 1일 이내에 연락드립니다.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/consult"
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              온라인 상담 신청
            </Link>
            <a
              href="tel:0200000000"
              className="rounded-md border border-primary-foreground/40 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              02-000-0000
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="text-xs tracking-[0.25em] text-muted-foreground">ATTORNEY</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              변호사 정도현
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              사건은 서류가 아니라 사람의 일상입니다. 대형 로펌과 검찰 수사 대응 경험을 바탕으로,
              의뢰인이 이해할 수 있는 언어로 설명하고 가장 현실적인 해결책을 제안합니다. 모든
              상담과 서면 작성은 담당 변호사가 직접 수행합니다.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>· 사법연수원 제36기 수료</li>
              <li>· 서울지방변호사회 정회원</li>
              <li>· 이혼·형사 사건 1,200건 이상 수행</li>
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, t: "철저한 비밀보장", d: "상담 내용은 변호사법에 따라 엄격히 보호됩니다." },
              { icon: Clock, t: "24시간 내 회신", d: "접수된 사연은 영업일 기준 1일 내 연락드립니다." },
              { icon: Users, t: "1:1 전담", d: "상담부터 종결까지 담당 변호사가 직접 맡습니다." },
              { icon: Scale, t: "명확한 비용 안내", d: "착수금과 성공보수를 사전에 서면으로 안내합니다." },
            ].map((item) => (
              <div
                key={item.t}
                className="panel-shadow rounded-lg border border-border bg-card p-5"
              >
                <item.icon className="h-5 w-5 text-accent" aria-hidden />
                <p className="mt-3 text-sm font-bold text-foreground">{item.t}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs tracking-[0.25em] text-muted-foreground">PRACTICE AREAS</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">주요 업무 분야</h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {practices.map((p) => (
              <article
                key={p.title}
                className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <p.icon className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-4 text-base font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="panel-shadow rounded-xl bg-primary px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
            지금 사연을 남겨 주세요
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-primary-foreground/75">
            간단한 연락처와 사건 개요만 남기시면 됩니다. 변호사가 직접 확인 후 연락드립니다.
          </p>
          <Link
            to="/consult"
            className="mt-8 inline-flex rounded-md bg-accent px-7 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            상담 신청하기
          </Link>
        </div>
      </section>
    </>
  );
}
