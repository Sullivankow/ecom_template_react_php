import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

// Définition du type du contexte
type AuthContextType = {
  user: User | null; // Utilisateur connecté (Firebase)
  role: string | null; // Rôle de l'utilisateur ("admin" ou "user")
  loading: boolean; // Indique si les infos sont en cours de chargement
  logout: () => Promise<void>; // Fonction pour déconnecter
};

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider du contexte Auth
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Surveille l'état de connexion Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Si connecté, va chercher le rôle dans Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role || null);
        } else {
          setRole(null); // Aucun rôle trouvé
        }
      } else {
        setRole(null); // Déconnecté
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fonction pour déconnecter l'utilisateur
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  // On utilise useMemo pour éviter que l'objet value change à chaque render
  const value = useMemo(() => ({ user, role, loading, logout }), [user, role, loading, logout]);

  // Fournit les infos à toute l'app
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return context;
};


