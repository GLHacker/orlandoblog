import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {APP_TITLE}
            </h1>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost">Inicio</Button>
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/create">
                <Button variant="default">Crear</Button>
              </Link>
              <Button variant="outline" onClick={logout}>
                Salir
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
            >
              Iniciar Sesión
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
