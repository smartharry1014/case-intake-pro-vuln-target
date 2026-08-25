import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/consult/")({
  head: () => ({
    meta: [
      { title: "법률상담 신청 | 정도현 법률사무소" },
      {
        name: "description",
        content: "이름과 연락처, 사건 개요를 남겨 주시면 변호사가 직접 검토 후 연락드립니다.",
      },
      { property: "og:title", content: "법률상담 신청 | 정도현 법률사무소" },
      {
        property: "og:description",
        content: "온라인으로 간편하게 법률상담을 신청하세요. 비밀은 철저히 보장됩니다.",
      },
    ],
  }),
  component: ConsultPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "이름을 입력해 주세요.").max(100, "이름이 너무 깁니다."),
  phone: z
    .string()
    .trim()
    .min(1, "연락처를 입력해 주세요.")
    .max(40)
    .regex(/^[0-9+\-\s()]+$/, "숫자와 -, + 기호만 입력할 수 있습니다."),
  email: z.string().trim().email("올바른 이메일 주소를 입력해 주세요.").max(255),
  message: z
    .string()
    .trim()
    .min(10, "상담 사연을 10자 이상 입력해 주세요.")
    .max(5000, "5,000자 이내로 작성해 주세요."),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const inputClass =
  "w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20";

function ConsultPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = schema.safeParse({
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.from("consultations").insert(parsed.data);
    setSubmitting(false);

    if (error) {
      toast.error("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    navigate({ to: "/consult/complete", search: { name: parsed.data.name } });
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
      <p className="text-xs tracking-[0.25em] text-muted-foreground">CONSULTATION</p>
      <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">법률상담 신청</h1>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        아래 내용을 남겨 주시면 변호사가 직접 검토한 뒤 영업일 기준 1일 이내에 연락드립니다.
        작성해 주신 내용은 상담 목적으로만 이용되며 철저히 비밀이 보장됩니다.
      </p>

      <form
        onSubmit={onSubmit}
        noValidate
        className="panel-shadow mt-9 space-y-5 rounded-xl border border-border bg-card p-6 sm:p-8"
      >
        <Field label="이름" name="name" error={errors.name}>
          <input id="name" name="name" className={inputClass} placeholder="홍길동" maxLength={100} />
        </Field>

        <Field label="연락처" name="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className={inputClass}
            placeholder="010-1234-5678"
            maxLength={40}
          />
        </Field>

        <Field label="이메일" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            className={inputClass}
            placeholder="example@email.com"
            maxLength={255}
          />
        </Field>

        <Field label="상담 사연 / 사건 개요" name="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={9}
            maxLength={5000}
            className={`${inputClass} resize-y leading-6`}
            placeholder="언제, 어떤 일이 있었는지 시간 순서대로 적어 주시면 상담에 큰 도움이 됩니다."
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {submitting ? "접수 중..." : "상담 신청하기"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          제출 시 상담 목적의 개인정보 수집·이용에 동의하는 것으로 간주됩니다.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-foreground">
        {label} <span className="text-destructive">*</span>
      </label>
      {children}
      {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
