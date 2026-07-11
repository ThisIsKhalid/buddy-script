import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { user, isAuthenticated, isInitialized, setUser, setInitialized } = useAuthStore();
  const router = useRouter();

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const currentUser = await res.json();
        setUser(currentUser);
      } else {
        setUser(null);
        if (typeof window !== "undefined" && window.location.pathname.startsWith("/feed")) {
          router.push("/login");
        }
      }
    } catch (err) {
      setUser(null);
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/feed")) {
        router.push("/login");
      }
    } finally {
      setInitialized(true);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setUser(null);
        router.push("/login");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return {
    user,
    isAuthenticated,
    isInitialized,
    setUser,
    setInitialized,
    checkSession,
    logout,
  };
}
