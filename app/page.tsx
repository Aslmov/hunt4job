import Image from "next/image";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";
import Link from "next/link";
import ROUTES from "@/app/utils/routes";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-black text-slate-900 dark:text-blue-100 flex flex-col items-center justify-center p-8 font-sans transition-colors duration-300">
      <ThemeToggle />
      <main className="flex flex-col items-center gap-8 max-w-3xl text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent title-glow">
            Hunt4job
          </h1>
          <p className="text-xl text-blue-200 tracking-wide">
            Votre carrière, amplifiée par l'intelligence artificielle
          </p>
        </div>

        <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
          Découvrez des opportunités professionnelles parfaitement alignées avec votre profil grâce à notre technologie 
          d'analyse avancée et notre IA de recommandation personnalisée .
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <Link
            href={ROUTES.SIGN_UP}
            className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Commencer maintenant
          </Link>
          <Link
            href={ROUTES.DEMO}
            className="border border-blue-400 text-blue-400 px-8 py-3 rounded-lg hover:bg-blue-400/10 transition-all duration-300"
          >
            Voir la démo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-slate-100/50 dark:bg-slate-800/50 p-6 rounded-lg">
            <h3 className="text-blue-600 dark:text-blue-300 font-semibold mb-2">Web Scraping Avancé</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400">Analyse en temps réel des offres d'emploi sur de multiples plateformes</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg">
            <h3 className="text-blue-300 font-semibold mb-2">IA Personnalisée</h3>
            <p className="text-sm text-gray-400">Recommandations basées sur vos compétences et préférences</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg">
            <h3 className="text-blue-300 font-semibold mb-2">Analyse Prédictive</h3>
            <p className="text-sm text-gray-400">Identification des meilleures opportunités pour votre carrière</p>
          </div>
        </div>
      </main>
    </div>
  );
}
