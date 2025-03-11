"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/app/providers/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ROUTES from "@/app/utils/routes";
import { dbService } from "@/app/lib/firebase";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Étape 1 : Informations personnelles
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    
    // Étape 2 : Profil professionnel
    currentPosition: "",
    industry: "",
    yearsOfExperience: "",
    skills: "",
    languages: "",
    education: "",
    
    // Étape 3 : Préférences de recherche
    contractType: "",
    workSchedule: "",
    mobility: "non",
    locations: "",
    salaryRange: "",
    targetPositions: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: formData.fullName
        });

        // Créer le profil utilisateur dans Firestore
        await dbService.createUserProfile(userCredential.user, {
          email: formData.email,
          displayName: formData.fullName,
          createdAt: new Date(),
        });
        
        router.push(ROUTES.DASHBOARD);
      }
    } catch (err: any) {
      console.error("Erreur d'inscription:", err);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Cet email est déjà utilisé");
          break;
        case "auth/weak-password":
          setError("Le mot de passe doit contenir au moins 6 caractères");
          break;
        default:
          setError("Une erreur est survenue lors de l'inscription");
      }
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-400">Informations personnelles</h2>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                Nom complet
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-400">Profil professionnel</h2>
            <div>
              <label htmlFor="currentPosition" className="block text-sm font-medium mb-2">
                Poste actuel (ou dernier poste)
              </label>
              <input
                type="text"
                id="currentPosition"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium mb-2">
                Secteur d'activité
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium mb-2">
                Années d'expérience
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="skills" className="block text-sm font-medium mb-2">
                Compétences principales (séparées par des virgules)
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="languages" className="block text-sm font-medium mb-2">
                Langues parlées
              </label>
              <input
                type="text"
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="education" className="block text-sm font-medium mb-2">
                Niveau d'études
              </label>
              <input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-400">Préférences de recherche</h2>
            <div>
              <label htmlFor="contractType" className="block text-sm font-medium mb-2">
                Type de contrat recherché
              </label>
              <select
                id="contractType"
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              >
                <option value="">Sélectionnez un type de contrat</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Freelance">Freelance</option>
                <option value="Stage">Stage</option>
                <option value="Alternance">Alternance</option>
              </select>
            </div>
            <div>
              <label htmlFor="workSchedule" className="block text-sm font-medium mb-2">
                Temps de travail souhaité
              </label>
              <select
                id="workSchedule"
                name="workSchedule"
                value={formData.workSchedule}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              >
                <option value="">Sélectionnez un temps de travail</option>
                <option value="Temps plein">Temps plein</option>
                <option value="Temps partiel">Temps partiel</option>
                <option value="Télétravail">Télétravail</option>
              </select>
            </div>
            <div>
              <label htmlFor="mobility" className="block text-sm font-medium mb-2">
                Mobilité géographique
              </label>
              <select
                id="mobility"
                name="mobility"
                value={formData.mobility}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              >
                <option value="non">Non</option>
                <option value="oui">Oui</option>
              </select>
            </div>
            {formData.mobility === "oui" && (
              <div>
                <label htmlFor="locations" className="block text-sm font-medium mb-2">
                  Villes / régions
                </label>
                <input
                  type="text"
                  id="locations"
                  name="locations"
                  value={formData.locations}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            )}
            <div>
              <label htmlFor="salaryRange" className="block text-sm font-medium mb-2">
                Fourchette salariale souhaitée
              </label>
              <input
                type="text"
                id="salaryRange"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="targetPositions" className="block text-sm font-medium mb-2">
                Domaines ou postes ciblés
              </label>
              <input
                type="text"
                id="targetPositions"
                name="targetPositions"
                value={formData.targetPositions}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-black text-slate-900 dark:text-blue-100 flex flex-col items-center justify-center p-8 font-sans transition-colors duration-300">
      <main className="flex flex-col items-center gap-8 max-w-md w-full">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
            Créer un compte
          </h1>
          <p className="text-lg text-blue-200">
            Rejoignez Hunt4job pour accéder à des opportunités personnalisées
          </p>
        </div>

        {/* Indicateur de progression */}
        <div className="w-full flex justify-between mb-4">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-1/3 h-2 rounded-full mx-1 ${
                stepNumber <= step ? 'bg-blue-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/50 rounded-lg w-full">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {renderStep()}

          <div className="flex justify-between gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-all"
              >
                Précédent
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all ml-auto"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all ml-auto disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "S'inscrire"
                )}
              </button>
            )}
          </div>
        </form>

        <p className="text-sm text-gray-400">
          Déjà inscrit ?{" "}
          <Link href={ROUTES.SIGN_IN} className="text-blue-400 hover:text-blue-300">
            Connectez-vous ici
          </Link>
        </p>
      </main>
    </div>
  );
} 