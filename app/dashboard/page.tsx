"use client";
import React from "react";
import Link from "next/link";
import ROUTES from "@/app/utils/routes";
import { auth } from "@/app/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {  
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Supprimer les cookies d'authentification
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "firebase_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      // Rediriger vers la page de connexion
      window.location.href = ROUTES.SIGN_IN;
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-black text-slate-900 dark:text-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête du tableau de bord */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Tableau de Bord
            </h1>
            <p className="text-slate-600 dark:text-blue-200">
              Bienvenue sur votre espace personnel Hunt4job
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
          >
            Déconnexion
          </button>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-100/50 dark:bg-slate-800/50 p-6 rounded-lg">
            <h3 className="text-blue-600 dark:text-blue-300 font-semibold mb-2">
              Candidatures
            </h3>
            <p className="text-3xl font-bold text-slate-800 dark:text-white">12</p>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Candidatures en cours
            </p>
          </div>
          <div className="bg-slate-100/50 dark:bg-slate-800/50 p-6 rounded-lg">
            <h3 className="text-blue-600 dark:text-blue-300 font-semibold mb-2">
              Entretiens
            </h3>
            <p className="text-3xl font-bold text-slate-800 dark:text-white">3</p>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Entretiens programmés
            </p>
          </div>
          <div className="bg-slate-100/50 dark:bg-slate-800/50 p-6 rounded-lg">
            <h3 className="text-blue-600 dark:text-blue-300 font-semibold mb-2">
              Offres Recommandées
            </h3>
            <p className="text-3xl font-bold text-slate-800 dark:text-white">28</p>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Nouvelles offres aujourd'hui
            </p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 p-6 rounded-lg">
            <h2 className="text-blue-300 font-semibold mb-4">Actions Rapides</h2>
            <div className="space-y-4">
              <Link 
                href={ROUTES.SEARCH} 
                className="flex items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <span className="text-blue-200">Rechercher des offres</span>
              </Link>
              <Link 
                href={ROUTES.PROFILE} 
                className="flex items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <span className="text-blue-200">Mettre à jour le profil</span>
              </Link>
            </div>
          </div>
          
          <div className="bg-slate-800/50 p-6 rounded-lg">
            <h2 className="text-blue-300 font-semibold mb-4">Prochains Entretiens</h2>
            <div className="space-y-4">
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <p className="text-blue-200 font-medium">Entreprise ABC</p>
                <p className="text-sm text-gray-400">Demain à 14:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}