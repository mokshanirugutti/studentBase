import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth,db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import { User as FirebaseUser  } from "firebase/auth";

interface CustomUser  extends FirebaseUser  {
  firstName?: string;
  lastName?: string;
}
interface UserContextType {
  user: CustomUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser ) => {
      if (currentUser ) {
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser .uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser ({
            ...currentUser ,
            firstName: userData.firstName,
            lastName: userData.lastName,
          } as CustomUser );
        } else {
          // If no additional data is found, just set the user
          setUser (currentUser  as CustomUser );
        }
      } else {
        setUser (null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
