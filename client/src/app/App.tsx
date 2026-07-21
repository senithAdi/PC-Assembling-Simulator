import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginPage, RegisterPage } from "./components/AuthPages";
import { Dashboard } from "./components/Dashboard";
import { PCSimulator } from "./components/PCSimulator";
import { ComponentsLearning } from "./components/ComponentsLearning";
import { Tutorials } from "./components/Tutorials";
import { BuildHistory } from "./components/BuildHistory";
import { CompatibilityChecker } from "./components/CompatibilityChecker";

type Page = 'landing' | 'login' | 'register' | 'dashboard' | 'simulator' | 'components' | 'tutorials' | 'builds' | 'compatibility';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'simulator':
        return <PCSimulator onNavigate={setCurrentPage} />;
      case 'components':
        return <ComponentsLearning onNavigate={setCurrentPage} />;
      case 'tutorials':
        return <Tutorials onNavigate={setCurrentPage} />;
      case 'builds':
        return <BuildHistory onNavigate={setCurrentPage} />;
      case 'compatibility':
        return <CompatibilityChecker onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="size-full">
      {renderPage()}
    </div>
  );
}