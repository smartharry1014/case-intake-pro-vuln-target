-- 상담 신청 조회(접수번호로 처리 상태 확인) 기능을 위해 익명 사용자의 조회를 허용한다.
CREATE POLICY "Anyone can check consultation status" ON public.consultations FOR SELECT TO anon, authenticated USING (true);
