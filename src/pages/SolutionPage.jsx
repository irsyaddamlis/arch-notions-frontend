import { useState } from "react";
import ArchNotionsLogo from "../components/dashboard/ArchNotionsLogo";
import NavBar from "../components/dashboard/NavBar";
import StarBackground from "../components/dashboard/StarBackground";

const INK = "#F5F3EC";
const MUTED = "#9CA3AF";
const FAINT = "#6B7280";
const HAIRLINE = "rgba(255,255,255,0.08)";

const CONTACT = {
  email: "weready@arch-notions.com",
  whatsapp: "+62-85555553261",
  waLink: "https://wa.me/6285555553261",
};

const solutionsConfig = {
  title: "Our Solutions",
  description:
    "Drive end-to-end business optimization and operating model design, leveraging data analytics and change management to execute sustainable people and organizational transformations",
  noSolutions: "No solutions available at the moment.",
  items: [
    {
      title: "Business Analytics",
      description:
        "Driving strategic growth through deep industry analysis, precise financial modeling, and predictive business optimization. We provide insights that inform decision-making, identify market trends, and optimize resource allocation, ensuring your business remains competitive and agile in a rapidly evolving landscape.",
      href: "#!",
      imageUrl: "/static/post1.jpg",
    },
    {
      title: "Business Intelligence",
      description:
        "Transforming raw operational data into predictable revenue pipelines and actionable sales funnels. By implementing advanced analytics and visualization tools, we enable organizations to identify growth opportunities, streamline processes, and make data-driven decisions that enhance overall business performance.",
      href: "#!",
      imageUrl: "/static/project4.jpg",
    },
    {
      title: "Project Management",
      description:
        "Bridging the gap between vision and execution through rigorous end-to-end strategic oversight. From initial scoping and execution to risk mitigation and final delivery, we ensure your projects stay on schedule, within budget, and structured for measurable impact.",
      href: "#!",
      imageUrl: "/static/building-business.jpg",
    },
    {
      title: "Organization Transformation",
      description:
        "Navigating complex change management to build resilient, future-ready organizations. We guide leadership through structural redesign, cultural shifts, and process improvements, ensuring that transformations are sustainable and aligned with long-term strategic goals.",
      href: "#!",
      imageUrl: "/static/project6.png",
    },
    {
      title: "Performance Optimization",
      description:
        "Aligning high-level objectives with actionable KPI and OKR frameworks that drive measurable results. We analyze organizational performance, identify bottlenecks, and implement strategies that enhance efficiency, productivity, and overall business outcomes.",
      href: "#!",
      imageUrl: "/static/project3.png",
    },
    {
      title: "People Development",
      description:
        "Empowering workforce potential through targeted training and capability building. We design and deliver custom learning programs that enhance employee skills, foster leadership growth, and cultivate a culture of continuous improvement, ensuring your team is equipped to meet evolving business challenges.",
      href: "#!",
      imageUrl: "/static/project1.jpg",
    },
  ],
};

export default function SolutionPage() {
  const [hoveredContact, setHoveredContact] = useState(null);

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-white">
      <StarBackground />

      {/* Main Content Area */}
      <div
        className="relative z-10 flex-1"
        style={{
          paddingLeft: "clamp(1rem, 6vw, 3.75rem)",
          paddingRight: "clamp(1rem, 6vw, 3.75rem)",
          paddingTop: "clamp(2rem, 6vw, 5rem)",
          paddingBottom: "2rem",
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8 sm:mb-10">
          <header>
            <a href="#!" className="inline-block">
              <ArchNotionsLogo className="mb-1" />
            </a>
            <h1 className="font-bold text-xl sm:text-2xl" style={{ color: INK }}>
              Establish, Growth, &amp; Sustain with Us
            </h1>
          </header>
          <NavBar current="Solution" />
        </div>

        {/* Section Heading */}
        <div className="relative z-20 w-full">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl" style={{ color: INK }}>
            {solutionsConfig.title}
          </h2>
          <p className="mt-3 text-sm leading-6 sm:leading-7 lg:leading-8 sm:text-base lg:text-lg" style={{ color: MUTED }}>
            {solutionsConfig.description}
          </p>
        </div>

        {/* Grid items */}
        <div className="z-50 grid items-stretch w-full mx-auto grid-cols-1 my-8 gap-5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutionsConfig.items.length === 0 ? (
            <p style={{ color: FAINT }}>{solutionsConfig.noSolutions}</p>
          ) : (
            solutionsConfig.items.map((project, index) => (
              <a
                key={index}
                href={project.href}
                className="relative flex flex-col items-stretch duration-300 ease-out p-4 sm:p-3.5 group min-h-[18rem] sm:min-h-[20rem] rounded-2xl"
              >
                <span
                  className="absolute inset-0 z-20 block w-full h-full duration-300 ease-out border border-dashed group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-2xl transition-colors"
                  style={{ borderColor: "transparent", backgroundColor: "transparent" }}
                />
                <span
                  className="absolute inset-0 z-10 block w-full h-full duration-300 ease-out border border-dashed group-hover:translate-x-1 group-hover:translate-y-1 rounded-2xl"
                  style={{ borderColor: HAIRLINE }}
                />
                <span className="relative z-30 flex flex-col h-full duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
                  <span className="block w-full overflow-hidden rounded-lg">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-28 sm:h-32 rounded-lg object-cover"
                    />
                  </span>
                  <span className="block w-full px-1 mt-3 mb-1 flex-1">
                    <span className="flex items-center mb-1.5 text-xl sm:text-2xl font-bold tracking-tight" style={{ color: INK }}>
                      <span>{project.title}</span>
                      <svg
                        className="group-hover:translate-x-0 group-hover:translate-y-0 -rotate-45 translate-y-1 -translate-x-1 w-4 h-4 ml-1.5 transition-all ease-in-out duration-200 transform stroke-current"
                        viewBox="0 0 13 15"
                      >
                        <g strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                          <g transform="translate(0.666667, 2.333333)" strokeWidth="2.4">
                            <polyline
                              className="transition-all duration-200 ease-out opacity-0 group-hover:opacity-100"
                              points="5.33333333 0 10.8333333 5.5 5.33333333 11"
                            />
                            <line
                              className="transition-all duration-200 ease-out transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                              x1="10.8333333"
                              y1="5.5"
                              x2="0.833333333"
                              y2="5.16666667"
                            />
                          </g>
                        </g>
                      </svg>
                    </span>
                    <span className="text-sm block line-clamp-3" style={{ color: MUTED }}>
                      {project.description}
                    </span>
                  </span>
                </span>
              </a>
            ))
          )}
        </div>
      </div>

      {/* Full-width Page Cover Contact Bar Footer */}
      <footer
        className="relative z-50 w-full border-t"
        style={{
          backgroundColor: "#0c1018",
          borderColor: HAIRLINE,
          padding: "1rem 1.5rem",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          {/* Email */}
          <a
            href={`mailto:${CONTACT.email}`}
            title="Email Us"
            className="flex items-center gap-2 transition-colors duration-200"
            style={{ color: hoveredContact === "email" ? "#25D366" : "#F8F8FF" }}
            onMouseEnter={() => setHoveredContact("email")}
            onMouseLeave={() => setHoveredContact(null)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="whitesmoke">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span>{CONTACT.email}</span>
          </a>

          <div className="hidden sm:block w-px h-4" style={{ backgroundColor: HAIRLINE }} />

          {/* WhatsApp */}
          <a
            href={CONTACT.waLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="flex items-center gap-2 transition-colors duration-200"
            style={{ color: hoveredContact === "wa" ? "#25D366" : "#F8F8FF" }}
            onMouseEnter={() => setHoveredContact("wa")}
            onMouseLeave={() => setHoveredContact(null)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.002l-1.416 5.17 5.289-1.387c1.463.797 3.111 1.216 4.782 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.668-1.039-5.176-2.927-7.065A9.927 9.927 0 0 0 12.012 2zm0 18.232h-.003c-1.5 0-2.97-.403-4.252-1.164l-.305-.181-3.162.829.843-3.082-.199-.316a8.28 8.28 0 0 1-1.272-4.333c.001-4.57 3.719-8.287 8.291-8.287 2.214 0 4.296.863 5.86 2.428a8.23 8.23 0 0 1 2.427 5.862c0 4.571-3.718 8.288-8.288 8.288zm4.542-6.208c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062a6.792 6.792 0 0 1-2.001-1.233c-.76-.677-1.273-1.513-1.422-1.762-.149-.249-.016-.384.108-.508.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.042-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.486-.408-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.311s-.871.851-.871 2.076c0 1.224.892 2.407 1.016 2.573.125.166 1.756 2.682 4.254 3.761.594.257 1.058.41 1.42.526.597.19 1.141.163 1.57.099.479-.071 1.472-.602 1.679-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
            </svg>
            <span>{CONTACT.whatsapp}</span>
          </a>
        </div>
      </footer>
    </div>
  );
}