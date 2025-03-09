import Link from 'next/link';
import ROUTES from '@/app/utils/routes';

export default function Navigation() {
  return (
    <nav className="...">
      <Link href={ROUTES.HOME}>Accueil</Link>
      <Link href={ROUTES.DASHBOARD}>Tableau de bord</Link>
      <Link href={ROUTES.PROFILE}>Profil</Link>
      <Link href={ROUTES.SEARCH}>Recherche</Link>
      {/* ... autres liens ... */}
    </nav>
  );
} 