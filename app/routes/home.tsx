import { useEffect } from "react";
import { resumes } from "../../constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
// import { resume } from "react-dom/server.node";
// import { R } from "node_modules/react-router/dist/development/index-react-server-client-IoJGLOqV.mjs";
import ResumeCard from "~/components/ResumeCard";
import { replace, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your resume!" },
  ];
}

export default function Home() {
  const { auth} = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated, navigate])
    
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <section className="main-section">
      <Navbar />
      <div className="page-heading py-16">
        <h1>Track your Applications & Resume Ratings</h1>
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>

    
  </main>
}
