import ArchNotionsLogo from "../components/dashboard/ArchNotionsLogo";
import NavBar from "../components/dashboard/NavBar";
import StarBackground from "../components/dashboard/StarBackground";

const INK = "#F5F3EC";
const MUTED = "#9CA3AF";
const HAIRLINE = "rgba(255,255,255,0.08)";

const CONTACT = {
  email: "weready@arch-notions.com",
  whatsapp: "+62-85555553261",
  waLink: "https://wa.me/6285555553261",
};

// Dulu dihitung dinamis di Django: date.today().year - 2002. Karena sekarang
// static site (tanpa backend), nilainya tetap dihitung otomatis dari tahun
// berjalan supaya tidak perlu diupdate manual tiap tahun.
const YEARS_EXPERIENCE = `${new Date().getFullYear() - 2003}+`;

const profileConfig = {
  legalName: "PT ARAH NYATA SOLUSI",
  founded: "2026",
  base: "INDONESIA",
  founderName: "Irsyad Damlis",
  founderPhoto: "/static/irsyad.png",
  vision: "To make enterprise dreams come to reality.",
  mission:
    "Providing the direction and the real solutions businesses need to thrive in a competitive landscape.",
  coreServices: [
    {
      name: "Strategic Planning & Analytics",
      detail: "Crafting comprehensive Business Plans and Business Cases",
    },
    {
      name: "Business Projection & Valuation",
      detail:
        "Developing Financial Models, Performance Dashboards, and Advanced Business Reporting",
    },
    {
      name: "Project Management & Implementation",
      detail:
        "Focusing on operational excellence and implementation strategy to ensure plans become reality",
    },
    {
      name: "Local Market Analysis",
      detail: "Deep-dive research and analysis to navigate the Indonesian market landscape",
    },
  ],
  otherServices: [
    {
      name: "Geospatial Analytics for Strategic Site Selection",
      detail:
        "Utilizing advanced location intelligence to identify high-potential sites for new points of sale, ensuring data-driven expansion for your enterprise",
    },
    {
      name: "AI-Driven Systems",
      detail:
        "Implementing intelligent to digitize customer service operations and streamline internal knowledge management, enhancing both customer experience and operational efficiency.",
    },
  ],
};

function ServiceGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {items.map((service, index) => (
        <div
          key={index}
          className="relative p-5 rounded-2xl border"
          style={{ borderColor: HAIRLINE }}
        >
          <span className="text-xs font-semibold tracking-wide" style={{ color: MUTED }}>
            0{index + 1}
          </span>
          <h4 className="mt-2 font-semibold text-base" style={{ color: INK }}>
            {service.name}
          </h4>
          <p className="mt-2 text-sm leading-6" style={{ color: MUTED }}>
            {service.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between text-white">
      <StarBackground />

      <div
        className="relative flex-1"
        style={{
          zIndex: 10,
          paddingLeft: "clamp(1rem, 6vw, 3.75rem)",
          paddingRight: "clamp(1rem, 6vw, 3.75rem)",
          paddingTop: "clamp(2rem, 6vw, 5rem)",
          paddingBottom: "2rem",
        }}
      >
        {/* Header — sama seperti SolutionPage */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8 sm:mb-10">
          <header className="text-center sm:text-left">
            <a href="/" className="inline-block">
              <ArchNotionsLogo className="mb-1" />
            </a>
            <h1 className="font-bold text-xl sm:text-2xl" style={{ color: INK }}>
              Establish, Grow, &amp; Sustain with Us
            </h1>
          </header>
          <NavBar current="About" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-center reveal visible">
          {[
            { label: "LEGAL NAME", value: profileConfig.legalName },
            { label: "FOUNDED", value: profileConfig.founded },
            { label: "BASE", value: profileConfig.base },
          ].map((stat, i) => (
            <div key={i} className="p-5 rounded-2xl border" style={{ borderColor: HAIRLINE }}>
              <p className="text-xs font-semibold tracking-wide" style={{ color: MUTED }}>
                {stat.label}
              </p>
              <p className="mt-1 font-semibold" style={{ color: INK }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Founder section */}
        <div className="flex flex-col items-center text-center mb-6 reveal visible">
          <div
            className="w-40 h-40 sm:w-40 sm:h-40 rounded-full overflow-hidden border mb-4"
            style={{ borderColor: HAIRLINE, backgroundColor:"whitesmoke" }}
          >
            <img
              src={profileConfig.founderPhoto}
              alt={`Photo of ${profileConfig.founderName}, founder`}
              style={{
                width: "130%",
                height: "130%",
                objectPosition: "50% 50%",
                display: "block",
              }}
            />
          </div>
          <p className="text-sm" style={{ color: MUTED }}>
            The Founder
          </p>
          <h2 className="text-2xl font-bold" style={{ color: INK }}>
            {profileConfig.founderName}
          </h2>
        </div>

        <p
          className="max-w-3xl mx-auto text-center text-sm sm:text-base leading-7 mb-12 reveal visible"
          style={{ color: MUTED }}
        >
          With {YEARS_EXPERIENCE} years of experience in project management, digital
          transformation, strategy analytics, business development, and operational
          excellence, we specialize in bridging the gap between complex data and
          actionable business growth.
        </p>

        {/* Vision & Mission */}
        <div className="space-y-8 mb-12 reveal visible">
          {[
            { label: "Vision", text: profileConfig.vision },
            { label: "Mission", text: profileConfig.mission },
          ].map((item) => (
            <div key={item.label} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 sm:gap-6">
              <p style={{ color: INK }} className="font-semibold text-lg">
                {item.label}
              </p>
              <blockquote
                className="pl-4 border-l-2 text-sm sm:text-base leading-7"
                style={{ borderColor: HAIRLINE, color: MUTED }}
              >
                &ldquo;{item.text}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>

        <hr className="mb-12" style={{ borderColor: HAIRLINE }} />

        {/* Core services */}
        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 mb-12 reveal visible">
          <div>
            <h3 className="text-xl font-bold" style={{ color: INK }}>
              Specialized
            </h3>
            <p className="text-sm mt-1" style={{ color: MUTED }}>
              What we do best
            </p>
          </div>
          <ServiceGrid items={profileConfig.coreServices} />
        </div>

        <hr className="mb-12" style={{ borderColor: HAIRLINE }} />

        {/* Additional services */}
        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 mb-12 reveal visible">
          <div>
            <h3 className="text-xl font-bold" style={{ color: INK }}>
              Additional
            </h3>
            <p className="text-sm mt-1" style={{ color: MUTED }}>
              Robust capabilities
            </p>
          </div>
          <ServiceGrid items={profileConfig.otherServices} />
        </div>
      </div>

      {/* Footer — identik dengan SolutionPage */}
      <footer
        className="relative w-full border-t reveal visible"
        style={{ zIndex: 50, backgroundColor: "#0c1018", borderColor: HAIRLINE, padding: "1rem 1.5rem" }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          <a
            href={`mailto:${CONTACT.email}`}
            title="Email Us"
            className="flex items-center gap-2 transition-colors duration-200"
            style={{ color: "#F8F8FF" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="whitesmoke">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span>{CONTACT.email}</span>
          </a>

          <div className="hidden sm:block w-px h-4" style={{ backgroundColor: HAIRLINE }} />

          <a
            href={CONTACT.waLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="flex items-center gap-2 transition-colors duration-200"
            style={{ color: "#F8F8FF" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.002l-1.416 5.17 5.289-1.387c1.463.797 3.111 1.216 4.782 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.668-1.039-5.176-2.927-7.065A9.927 9.927 0 0 0 12.012 2zm0 18.232h-.003c-1.5 0-2.97-.403-4.252-1.164l-.305-.181-3.162.829.843-3.082-.199-.316a8.28 8.28 0 0 1-1.272-4.333c.001-4.57 3.719-8.287 8.291-8.287 2.214 0 4.296.863 5.86 2.428a8.23 8.23 0 0 1 2.427 5.862c0 4.571-3.718 8.288-8.288 8.288zm4.542-6.208c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062a6.792 6.792 0 0 1-2.001-1.233c-.76-.677-1.273-1.513-1.422-1.762-.149-.249-.016-.384.108-.508.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.042-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.486-.408-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.311s-.871.851-.871 2.076c0 1.224.892 2.407 1.016 2.573.125.166 1.756 2.682 4.254 3.761.594.257 1.058.41 1.42.526.597.19 1.141.163 1.57.099.479-.071 1.472-.602 1.679-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
            </svg>
            <span>{CONTACT.whatsapp}</span>
          </a>

          <div className="hidden sm:block w-px h-4" style={{ backgroundColor: HAIRLINE }} />

          <a
            href="/static/company-profile.pdf"
            download="Arch-Notions-Company-Profile.pdf"
            className="flex items-center gap-2 transition-colors duration-200"
            style={{ color: "#34D399" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Company Profile (PDF)</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
