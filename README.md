# Legal Connect Hub

1인 변호사 사무소를 위한 법률상담 신청 웹사이트를 만들어줘.

[사이트 목적]

개인 변호사가 운영하는 상담 접수 사이트야. 방문자가 자신의 개인정보와 상담하고 싶은 사연(사건 개요)을 입력해서 제출하면, 변호사가 나중에 확인하고 연락하는 구조야.

[페이지 구성]

1. 메인 페이지: 변호사 소개, 주요 업무 분야(이혼, 형사, 계약 등 적당히), 신뢰감 있는 카피

2. 상담 신청 페이지: 아래 폼 포함

   - 이름 (필수)

   - 연락처 (필수, 전화번호)

   - 이메일 (필수)

   - 상담 사연 / 사건 개요 (필수, 여러 줄 입력 가능한 textarea)

   - 제출 버튼

3. 제출 완료 안내 페이지 또는 모달

4. 관리자 페이지: 로그인 후 접수된 상담 신청 목록을 표로 확인할 수 있는 페이지 (이름, 연락처, 이메일, 사연, 접수일시)

[데이터 저장]

Supabase를 연동해서 상담 신청 폼 데이터가 실제 데이터베이스에 저장되도록 해줘. 관리자 페이지에서 저장된 데이터를 조회할 수 있어야 해.

[디자인]

신뢰감 있고 전문적인 로펌 느낌으로, 차분한 네이비/그레이 톤 위주. 과하지 않고 깔끔하게. 모바일에서도 잘 보이도록 반응형으로 만들어줘.

[기술]

React + Tailwind 기반으로, GitHub 저장소와 연동해서 코드를 관리할 수 있게 해줘.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://case-intake-pro.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c4274a9e-90e8-4149-a5be-0f72cfce44e3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
