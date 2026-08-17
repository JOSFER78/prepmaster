import { useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInAnonymously, 
  firebaseSignOut, 
  onAuthStateChanged, 
  getIdToken,
  User,
  db 
} from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { 
  User as UserIcon, 
  Key, 
  ShieldCheck, 
  LogOut, 
  Sparkles, 
  Copy, 
  Check, 
  Users, 
  Save, 
  Clock, 
  Lock,
  Globe,
  AlertCircle
} from 'lucide-react';

interface ProfileViewProps {
  onPeopleCountChange?: (count: number) => void;
}

export function ProfileView({ onPeopleCountChange }: ProfileViewProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [idToken, setIdToken] = useState<string>('');
  const [copiedToken, setCopiedToken] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Household & Preferences state
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [dietary, setDietary] = useState<string[]>(['Bajo en sal', 'Mediterránea']);
  const [newDietTag, setNewDietTag] = useState<string>('');
  const [savingPrefs, setSavingPrefs] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        try {
          const token = await getIdToken(currentUser, true);
          setIdToken(token);

          // Load user Firestore preferences if present
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.peopleCount) setPeopleCount(data.peopleCount);
            if (data.dietPreferences) setDietary(data.dietPreferences);
          }
        } catch (err) {
          console.error('Error fetching auth details:', err);
        }
      } else {
        setIdToken('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setAuthError('No se pudo completar el acceso con Google. Inténtalo de nuevo o accede de forma anónima.');
    }
  };

  const handleAnonymousLogin = async () => {
    setAuthError(null);
    try {
      await signInAnonymously(auth);
    } catch (err: any) {
      console.error('Anonymous Auth Error:', err);
      setAuthError('Error al iniciar sesión anónima.');
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  const copyTokenToClipboard = () => {
    if (!idToken) return;
    navigator.clipboard.writeText(idToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const savePreferences = async () => {
    if (!user) return;
    setSavingPrefs(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: user.email || 'anonimo@prepmaster.app',
        displayName: user.displayName || 'Usuario PrepMaster',
        photoURL: user.photoURL || '',
        peopleCount: peopleCount,
        dietPreferences: dietary,
        sessionToken: idToken.substring(0, 30) + '...',
        updatedAt: new Date().toISOString()
      }, { merge: true });

      if (onPeopleCountChange) {
        onPeopleCountChange(peopleCount);
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      console.error('Error saving user preferences to Firestore:', err);
    } finally {
      setSavingPrefs(false);
    }
  };

  const addDietTag = () => {
    if (!newDietTag.trim()) return;
    if (!dietary.includes(newDietTag.trim())) {
      setDietary([...dietary, newDietTag.trim()]);
    }
    setNewDietTag('');
  };

  const removeDietTag = (tag: string) => {
    setDietary(dietary.filter(t => t !== tag));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-on-surface-variant">Cargando estado de autenticación Firebase...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-surface rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="bg-primary/20 text-primary text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
              <ShieldCheck size={11} /> Firebase Auth & Firestore
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant flex items-center gap-1">
              <Globe size={12} className="text-emerald-600" /> Sesión Segura
            </span>
          </div>
          <h1 className="text-lg md:text-xl font-black text-on-surface">
            Perfil de Usuario & Tokens de Acceso
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Gestión de credenciales Firebase, tokens de sesión y parámetros de comensales para el planificador batch.
          </p>
        </div>

        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors active:scale-95 shrink-0"
          >
            <LogOut size={15} />
            <span>Cerrar Sesión</span>
          </button>
        )}
      </div>

      {authError && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2 text-rose-800 text-xs font-bold">
          <AlertCircle size={16} className="shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {/* LOGIN CARD IF NOT LOGGED IN */}
      {!user ? (
        <div className="bg-surface rounded-3xl border border-outline-variant/30 p-6 space-y-5 shadow-sm text-center max-w-md mx-auto my-6">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary mx-auto flex items-center justify-center font-black">
            <UserIcon size={32} />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-black text-on-surface">Acceso a PrepMaster Batch</h2>
            <p className="text-xs text-on-surface-variant">
              Inicia sesión para sincronizar tus menús de raciones, lista de compra e inventario en tiempo real con Firebase Firestore.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2.5 bg-surface-container border border-outline-variant/40 hover:bg-surface-container-high text-on-surface font-bold text-xs py-3 px-4 rounded-2xl transition-all shadow-2xs active:scale-98"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Acceder con Google</span>
            </button>

            <button
              onClick={handleAnonymousLogin}
              className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-bold text-xs py-3 px-4 rounded-2xl hover:bg-primary/90 transition-all shadow-xs active:scale-98"
            >
              <Sparkles size={16} />
              <span>Acceso Rápido Anónimo (Firebase Auth)</span>
            </button>
          </div>

          <p className="text-[10px] text-on-surface-variant font-medium">
            🔒 Autenticación cifrada basada en tokens JWT con Firebase SDK
          </p>
        </div>
      ) : (
        /* USER LOGGED IN CONTENT */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* USER CARD & TOKENS */}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 space-y-4 shadow-2xs">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary overflow-hidden border border-primary/20 shrink-0 flex items-center justify-center font-black">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={24} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black text-on-surface truncate">
                    {user.displayName || 'Usuario Registrado'}
                  </h2>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.2 rounded-full uppercase">
                    {user.isAnonymous ? 'Anónimo' : 'Verificado'}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant truncate">{user.email || 'Sin email asociado (Anónimo)'}</p>
                <p className="text-[10px] font-mono text-on-surface-variant/80 mt-0.5 truncate">
                  UID: {user.uid}
                </p>
              </div>
            </div>

            {/* TOKEN & CREDENTIALS DETAILS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-on-surface flex items-center gap-1">
                  <Key size={14} className="text-primary" /> Token de Sesión JWT (ID Token)
                </span>
                <button
                  onClick={copyTokenToClipboard}
                  className="flex items-center gap-1 text-[10px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  {copiedToken ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copiedToken ? 'Copiado!' : 'Copiar Token'}</span>
                </button>
              </div>

              <div className="bg-surface-container p-2.5 rounded-xl border border-outline-variant/30 font-mono text-[10px] text-on-surface-variant break-all max-h-24 overflow-y-auto leading-relaxed">
                {idToken || 'Cargando ID Token...'}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                <div className="bg-surface-container/50 p-2 rounded-xl border border-outline-variant/20">
                  <span className="text-on-surface-variant block">Proveedor de Login</span>
                  <strong className="text-on-surface font-bold">
                    {user.providerData[0]?.providerId || 'firebase (anonymous)'}
                  </strong>
                </div>
                <div className="bg-surface-container/50 p-2 rounded-xl border border-outline-variant/20">
                  <span className="text-on-surface-variant block">Creación de Cuenta</span>
                  <strong className="text-on-surface font-bold">
                    {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Hoy'}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* HOUSEHOLD & DIET PREFERENCES (FIRESTORE SYNC) */}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-black">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-on-surface">Configuración de Comensales</h3>
                  <p className="text-[10px] text-on-surface-variant">Sincronizado directamente con Firestore</p>
                </div>
              </div>

              <button
                onClick={savePreferences}
                disabled={savingPrefs}
                className="flex items-center gap-1.5 bg-primary text-on-primary px-3 py-1.5 rounded-xl text-xs font-extrabold hover:bg-primary/90 transition-colors shadow-2xs active:scale-95 disabled:opacity-50"
              >
                {savingPrefs ? (
                  <div className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                ) : savedSuccess ? (
                  <Check size={14} className="text-emerald-300" />
                ) : (
                  <Save size={14} />
                )}
                <span>{savedSuccess ? 'Guardado' : 'Guardar'}</span>
              </button>
            </div>

            {/* People Count Control */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface block">
                Número habitual de comensales en casa:
              </label>
              <div className="flex items-center gap-3 bg-surface-container p-2 rounded-xl border border-outline-variant/30">
                <input 
                  type="range" 
                  min={1} 
                  max={12} 
                  value={peopleCount} 
                  onChange={(e) => setPeopleCount(parseInt(e.target.value))} 
                  className="flex-1 accent-primary h-2 bg-outline-variant/40 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-black text-primary bg-primary-container/40 px-3 py-1 rounded-lg min-w-[48px] text-center">
                  {peopleCount} pers.
                </span>
              </div>
            </div>

            {/* Dietary Tags */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface block">
                Preferencias y restricciones dietéticas:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {dietary.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5"
                  >
                    {tag}
                    <button 
                      onClick={() => removeDietTag(tag)}
                      className="hover:text-rose-600 transition-colors font-black text-xs"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Ej: Vegano, Gluten Free, Keto..."
                  value={newDietTag}
                  onChange={(e) => setNewDietTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addDietTag()}
                  className="flex-1 bg-surface-container border border-outline-variant/40 text-xs px-3 py-1.5 rounded-xl focus:outline-none focus:border-primary text-on-surface"
                />
                <button
                  onClick={addDietTag}
                  className="bg-surface-container border border-outline-variant/40 hover:bg-surface-container-high text-on-surface font-extrabold text-xs px-3 py-1.5 rounded-xl transition-colors"
                >
                  Añadir
                </button>
              </div>
            </div>

            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 font-medium flex items-start gap-2">
              <Lock size={14} className="text-emerald-700 shrink-0 mt-0.5" />
              <span>Tus preferencias se guardan en la colección Firestore <code className="font-mono bg-emerald-100 px-1 py-0.2 rounded">users/{user.uid}</code> con reglas de seguridad estrictas.</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
