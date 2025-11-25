import { useAuth } from "@/_core/hooks/useAuth";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home, PlusSquare, User, LogOut, LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {APP_LOGO && (
              <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />
            )}
            <span className="text-xl font-bold bg-gradient-to-r from-[var(--instagram-purple)] to-[var(--instagram-pink)] bg-clip-text text-transparent">
              {APP_TITLE}
            </span>
          </a>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link href="/">
            <a className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline">Inicio</span>
            </a>
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/create">
                <a className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                  <PlusSquare className="h-5 w-5" />
                  <span className="hidden sm:inline">Crear</span>
                </a>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <a className="flex items-center gap-2 w-full">
                        <User className="h-4 w-4" />
                        Mi Perfil
                      </a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild size="sm" className="bg-gradient-to-r from-[var(--instagram-purple)] to-[var(--instagram-pink)]">
              <a href={getLoginUrl()}>
                <LogIn className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </a>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
