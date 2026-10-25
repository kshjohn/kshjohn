/* =====================================================================
   profile.js — 웹페이지에 표시되는 "내용"은 전부 이 파일에서 수정합니다.
   index.html(디자인/레이아웃)은 건드릴 필요가 없습니다.

   규칙
   - 문자열은 따옴표 "..." 로 감쌉니다. 문자열 안에 따옴표가 필요하면 '...' 를 쓰세요.
   - 항목(줄) 끝의 쉼표(,)를 빠뜨리지 마세요. 마지막 항목 뒤의 쉼표는 있어도 없어도 됩니다.
   - 필요 없는 섹션은 배열을 비우면([]) 화면에서 자동으로 숨겨집니다.
   - 아이콘 없이 텍스트만 쓰므로 이모지는 자유롭게 넣어도 됩니다.
   ===================================================================== */

window.PROFILE = {

  /* ---------- 공통 설정 (언어와 무관) ---------- */
  settings: {
    defaultLang: "en",            // 첫 화면 언어: "en" 또는 "ko"
    siteTitle: "Sanghwa Kim",     // 브라우저 탭 제목
    photo: "assets/profile.jpg",  // 프로필 사진 경로. 파일이 없으면 이니셜이 표시됩니다.
    initials: "SK",               // 사진이 없을 때 보여줄 이니셜
    resume: "assets/resume.pdf",  // 이력서 PDF 경로. 비우면("") 버튼이 숨겨집니다.
    email: "kshjohn1@gmail.com",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/john-kim-a55326145" },
      { label: "GitHub",   url: "https://github.com/kshjohn" },
    ],
    accent: "#1f5fbf",            // 포인트 색상 (16진수 색상 코드)
  },

  /* =====================================================================
     영어 내용
     ===================================================================== */
  en: {
    ui: {
      nav: { about: "About", experience: "Experience", skills: "Skills", projects: "Projects",
             education: "Education", contact: "Contact" },
      resume: "Download résumé", email: "Email me", print: "Print / Save PDF",
      present: "Present", visit: "View project", certs: "Certifications", langs: "Languages",
      footer: "Built with a single HTML file · Hosted on GitHub Pages",
    },

    hero: {
      name: "Sanghwa Kim",
      title: "Senior Supply Chain Analyst",
      tags: ["Automotive", "Customs & Trade Compliance", "Data-Driven Operations"],
      location: "Open to relocation · Remote-friendly",
      tagline:
        "I turn operational data into decisions — customs compliance, inventory accuracy, " +
        "demand and logistics planning — and build the tools to do it.",
    },

    about: {
      heading: "About",
      paragraphs: [
        "Supply chain professional bridging Asian and Western operations, with hands-on experience " +
        "across automotive programs including Lucid Motors, Tesla, Stellantis, Hyundai and Kia.",
        "My work sits where operations meets data: HTS classification and tariff analysis, S&OP and " +
        "inventory optimization, and the SQL/Python tooling that makes those decisions repeatable.",
      ],
      highlights: [
        { value: "8+",  label: "years in supply chain" },
        { value: "5",   label: "automotive OEM programs" },
        { value: "4",   label: "professional certifications" },
        { value: "5",   label: "languages" },
      ],
    },

    experience: {
      heading: "Experience",
      items: [
        {
          role: "Senior Supply Chain Analyst",
          company: "Company Name",
          location: "City, Country",
          start: "2022", end: "",               // end를 비우면 "Present"로 표시
          bullets: [
            "Led customs & trade compliance for inbound automotive parts: HTS classification, CBP entry summaries, Section 232 / IEEPA tariff impact analysis.",
            "Built SQL/Python inventory-accuracy dashboards that cut cycle-count variance by XX%.",
            "Coordinated CKD logistics and S&OP across Korea, US and EU plants.",
          ],
        },
        {
          role: "Supply Chain Analyst",
          company: "Company Name",
          location: "City, Country",
          start: "2019", end: "2022",
          bullets: [
            "Owned demand planning and safety-stock parameters for XX,000 SKUs.",
            "Automated weekly SAP extracts and Excel models, saving ~XX hours per month.",
          ],
        },
        {
          role: "Officer (Captain), Republic of Korea Army",
          company: "Korea Military Academy graduate",
          location: "South Korea",
          start: "2013", end: "2019",
          bullets: [
            "Led logistics and personnel units; responsible for planning, readiness and reporting.",
          ],
        },
      ],
    },

    skills: {
      heading: "Skills",
      groups: [
        { name: "Supply Chain & Operations",
          items: ["S&OP", "Inventory optimization", "Demand planning", "CKD & logistics coordination", "Supplier management"] },
        { name: "Customs & Trade Compliance",
          items: ["HTS classification", "CBP entry summaries", "Section 232 / IEEPA tariff analysis", "Incoterms", "Landed-cost modeling"] },
        { name: "Data & Systems",
          items: ["SAP (MM/SD)", "Advanced Excel", "SQL", "Python (pandas)", "R", "Power BI / Tableau"] },
      ],
      certifications: ["APICS CSCP", "APICS CPIM", "PMI PMP", "Six Sigma Black Belt"],
      languages: [
        { name: "Korean",   level: "Native" },
        { name: "English",  level: "Fluent" },
        { name: "Japanese", level: "Business" },
        { name: "Mandarin", level: "Intermediate" },
        { name: "Polish",   level: "Learning" },
      ],
    },

    projects: {
      heading: "Projects",
      intro: "Applying supply chain thinking in code.",
      items: [
        {
          name: "Polska Pulse",
          status: "Live",
          description: "Dashboard tracking current affairs and interests of Poles aged 20–40, with Polish vocabulary notes.",
          tech: ["Vanilla JS", "RSS", "Wikimedia API"],
          url: "polska-pulse/",
        },
        {
          name: "Landed Cost & Tariff Calculator",
          status: "In progress",
          description: "HTS-based duty estimator incorporating Section 232 / IEEPA surcharges.",
          tech: ["Python", "HTS data"],
          url: "",
        },
        {
          name: "Inventory Optimizer",
          status: "In progress",
          description: "EOQ, safety stock and reorder-point modeling with service-level targets.",
          tech: ["Python", "Excel"],
          url: "",
        },
        {
          name: "Demand Forecasting Toolkit",
          status: "In progress",
          description: "Moving-average vs. exponential-smoothing comparison with accuracy metrics.",
          tech: ["Python", "R"],
          url: "",
        },
      ],
    },

    education: {
      heading: "Education",
      items: [
        { degree: "M.S. Supply Chain Management", school: "University of Michigan — Ross School of Business", year: "20XX" },
        { degree: "Data Science MicroMasters",     school: "UC San Diego (edX)",                                year: "20XX" },
        { degree: "B.S.",                          school: "Korea Military Academy",                            year: "20XX" },
      ],
    },

    contact: {
      heading: "Contact",
      text: "I'm currently exploring senior supply chain, trade compliance and operations-analytics roles. " +
            "The fastest way to reach me is email.",
    },
  },

  /* =====================================================================
     한국어 내용 (영어와 같은 구조입니다. 항목을 비우면 영어가 대신 표시됩니다.)
     ===================================================================== */
  ko: {
    ui: {
      nav: { about: "소개", experience: "경력", skills: "역량", projects: "프로젝트",
             education: "학력", contact: "연락처" },
      resume: "이력서 다운로드", email: "이메일 보내기", print: "인쇄 / PDF 저장",
      present: "현재", visit: "프로젝트 보기", certs: "자격증", langs: "언어",
      footer: "단일 HTML 파일로 제작 · GitHub Pages 호스팅",
    },

    hero: {
      name: "김상화",
      title: "시니어 공급망 분석가 (Senior Supply Chain Analyst)",
      tags: ["자동차 산업", "관세·무역 컴플라이언스", "데이터 기반 운영"],
      location: "해외 근무 가능 · 원격 근무 가능",
      tagline:
        "운영 데이터를 의사결정으로 바꿉니다 — 관세 컴플라이언스, 재고 정확도, 수요·물류 계획 — " +
        "그리고 그것을 위한 도구를 직접 만듭니다.",
    },

    about: {
      heading: "소개",
      paragraphs: [
        "아시아와 서구 운영 조직을 잇는 공급망 전문가로, Lucid Motors, Tesla, Stellantis, 현대·기아 등 " +
        "자동차 프로그램에서 실무 경험을 쌓았습니다.",
        "운영과 데이터가 만나는 지점에서 일합니다: HTS 품목분류와 관세 분석, S&OP와 재고 최적화, " +
        "그리고 그 의사결정을 반복 가능하게 만드는 SQL/Python 도구 개발.",
      ],
      highlights: [
        { value: "8+", label: "년 공급망 경력" },
        { value: "5",  label: "개 완성차 프로그램" },
        { value: "4",  label: "개 전문 자격증" },
        { value: "5",  label: "개 구사 언어" },
      ],
    },

    experience: {
      heading: "경력",
      items: [
        {
          role: "시니어 공급망 분석가",
          company: "회사명",
          location: "도시, 국가",
          start: "2022", end: "",
          bullets: [
            "자동차 부품 수입 관세·무역 컴플라이언스 총괄: HTS 분류, CBP 수입신고, Section 232 / IEEPA 관세 영향 분석.",
            "SQL/Python 기반 재고 정확도 대시보드 구축으로 순환재고조사 오차 XX% 감소.",
            "한국·미국·EU 공장 간 CKD 물류 및 S&OP 조율.",
          ],
        },
        {
          role: "공급망 분석가",
          company: "회사명",
          location: "도시, 국가",
          start: "2019", end: "2022",
          bullets: [
            "XX,000개 SKU의 수요 계획 및 안전재고 파라미터 관리.",
            "SAP 주간 추출 및 Excel 모델 자동화로 월 약 XX시간 절감.",
          ],
        },
        {
          role: "대한민국 육군 장교 (대위)",
          company: "육군사관학교 졸업",
          location: "대한민국",
          start: "2013", end: "2019",
          bullets: [
            "군수·인사 부대 지휘; 계획, 준비태세, 보고 체계 책임.",
          ],
        },
      ],
    },

    skills: {
      heading: "역량",
      groups: [
        { name: "공급망 & 운영",
          items: ["S&OP", "재고 최적화", "수요 계획", "CKD·물류 조율", "협력사 관리"] },
        { name: "관세 & 무역 컴플라이언스",
          items: ["HTS 품목분류", "CBP 수입신고", "Section 232 / IEEPA 관세 분석", "Incoterms", "총착륙원가 모델링"] },
        { name: "데이터 & 시스템",
          items: ["SAP (MM/SD)", "고급 Excel", "SQL", "Python (pandas)", "R", "Power BI / Tableau"] },
      ],
      certifications: ["APICS CSCP", "APICS CPIM", "PMI PMP", "Six Sigma Black Belt"],
      languages: [
        { name: "한국어", level: "모국어" },
        { name: "영어",   level: "유창" },
        { name: "일본어", level: "비즈니스" },
        { name: "중국어", level: "중급" },
        { name: "폴란드어", level: "학습 중" },
      ],
    },

    projects: {
      heading: "프로젝트",
      intro: "공급망 사고방식을 코드로 옮깁니다.",
      items: [
        {
          name: "Polska Pulse",
          status: "운영 중",
          description: "폴란드 20–40대의 시사·관심사를 추적하는 대시보드. 폴란드어 어휘 노트 포함.",
          tech: ["Vanilla JS", "RSS", "Wikimedia API"],
          url: "polska-pulse/",
        },
        {
          name: "총착륙원가 & 관세 계산기",
          status: "진행 중",
          description: "Section 232 / IEEPA 추가관세를 반영한 HTS 기반 관세 추정기.",
          tech: ["Python", "HTS 데이터"],
          url: "",
        },
        {
          name: "재고 최적화 도구",
          status: "진행 중",
          description: "서비스 수준 목표를 반영한 EOQ, 안전재고, 재주문점 모델링.",
          tech: ["Python", "Excel"],
          url: "",
        },
        {
          name: "수요 예측 툴킷",
          status: "진행 중",
          description: "이동평균과 지수평활 비교 및 정확도 지표.",
          tech: ["Python", "R"],
          url: "",
        },
      ],
    },

    education: {
      heading: "학력",
      items: [
        { degree: "공급망관리 석사 (M.S.)", school: "University of Michigan — Ross School of Business", year: "20XX" },
        { degree: "데이터 사이언스 MicroMasters", school: "UC San Diego (edX)", year: "20XX" },
        { degree: "학사",                    school: "육군사관학교", year: "20XX" },
      ],
    },

    contact: {
      heading: "연락처",
      text: "현재 시니어 공급망, 무역 컴플라이언스, 운영 분석 직무를 찾고 있습니다. 이메일로 연락 주시면 가장 빠르게 답변드립니다.",
    },
  },
};
