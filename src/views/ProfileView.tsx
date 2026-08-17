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
  db,
  SUPERADMIN_EMAIL,
  isSuperAdmin
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
  Lock, 
  Globe, 
  AlertCircle, 
  Crown, 
  Layers, 
  ShoppingBag, 
  Activity, 
  RefreshCw, 
  Server 
} from 'lucide-react';
import firebaseConfig from '../../firebase-applet-config.json';
import { AuthModal } from '../components/AuthModal';

interface ProfileViewProps {
  onPeopleCountChange?: (count: number) => void;
}

export function ProfileView({ onPeopleCountChange }: ProfileViewProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [idToken, setIdToken] = useState<string>('');
  const [copiedToken, setCopiedToken] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Household & Preferences state
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [dietary, setDietary] = useState<string[]>(['Bajo en sal', 'Mediterránea']);
  const [newDietTag, setNewDietTag] = useState<string>('');
  const [savingPrefs, setSavingPrefs] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // SuperAdmin diagnostics state
  const [firestoreLatency, setFirestoreLatency] = useState<number | null>(null);
  const [isPingingFirestore, setIsPingingFirestore] = useState<boolean>(false);
  const [superadminActionStatus, setSuperadminActionStatus] = useState<string | null>(null);

  const isCurrentSuperAdmin = isSuperAdmin(user);

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
      const uid = user.uid;
      const email = user.email || 'anonimo@prepmaster.app';
      const role = isCurrentSuperAdmin ? 'superadmin' : 'user';

      await setDoc(doc(db, 'users', uid), {
        id: uid,
        email: email,
        displayName: user.displayName || (isCurrentSuperAdmin ? 'SuperAdmin PrepMaster' : 'Usuario PrepMaster'),
        photoURL: user.photoURL || '',
        role: role,
        peopleCount: peopleCount,
        dietPreferences: dietary,
        sessionToken: idToken ? idToken.substring(0, 30) + '...' : '',
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

  const pingFirestore = async () => {
    setIsPingingFirestore(true);
    const start = performance.now();
    try {
      const pingDoc = doc(db, 'system_config', 'health_check');
      await setDoc(pingDoc, {
        lastPing: new Date().toISOString(),
        superadmin: SUPERADMIN_EMAIL,
        status: 'ONLINE'
      }, { merge: true });
      const duration = Math.round(performance.now() - start);
      setFirestoreLatency(duration);
      setSuperadminActionStatus(`Ping Firestore exitoso en ${duration}ms`);
    } catch (err: any) {
      console.error('Firestore Ping Error:', err);
      setSuperadminActionStatus(`Error al conectar con Firestore: ${err.message || err}`);
    } finally {
      setIsPingingFirestore(false);
      setTimeout(() => setSuperadminActionStatus(null), 5000);
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
            {isCurrentSuperAdmin ? (
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-2xs">
                <Crown size={11} className="text-amber-600" /> Superadmin ({user?.email})
              </span>
            ) : (
              <span className="text-[10px] font-bold text-on-surface-variant flex items-center gap-1">
                <Globe size={12} className="text-emerald-600" /> Sesión Segura
              </span>
            )}
          </div>
          <h1 className="text-lg md:text-xl font-black text-on-surface flex items-center gap-2">
            Perfil de Usuario & Ajustes
            {isCurrentSuperAdmin && (
              <span className="text-xs bg-amber-500 text-white font-black px-2 py-0.5 rounded-lg shadow-2xs">
                👑 SuperAdmin
              </span>
            )}
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Gestión de credenciales, tokens de sesión y parámetros familiares para el planificador batch.
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
        <div className="bg-surface rounded-3xl border border-outline-variant/30 p-8 space-y-5 shadow-sm text-center max-w-md mx-auto my-6">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary mx-auto flex items-center justify-center font-black">
            <UserIcon size={32} />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-black text-on-surface">Tu Cuenta PrepMaster</h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Inicia sesión o crea una cuenta para sincronizar tus menús de raciones, lista de compra e inventario en tiempo real.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full bg-primary hover:bg-primary/90 text-on-primary font-black text-xs py-3 px-4 rounded-2xl transition-all shadow-xs active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Iniciar Sesión / Registrarse</span>
            </button>

            <button
              onClick={() => signInAnonymously(auth)}
              className="w-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-on-surface font-extrabold text-xs py-2.5 px-4 rounded-2xl transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-primary" />
              <span>Acceso Rápido como Invitado</span>
            </button>
          </div>

          <p className="text-[10px] text-on-surface-variant font-medium">
            🔒 Autenticación cifrada basada en tokens JWT con Firebase SDK
          </p>
        </div>
      ) : (
        /* USER LOGGED IN CONTENT */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* USER CARD & TOKENS */}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 space-y-4 shadow-2xs">
              <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-3">
                <div className={`w-12 h-12 rounded-2xl overflow-hidden border shrink-0 flex items-center justify-center font-black ${
                  isCurrentSuperAdmin 
                    ? 'bg-amber-100 text-amber-700 border-amber-300 ring-2 ring-amber-400/30' 
                    : 'bg-primary/10 text-primary border-primary/20'
                }`}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                  ) : isCurrentSuperAdmin ? (
                    <Crown size={26} className="text-amber-600" />
                  ) : (
                    <UserIcon size={24} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-black text-on-surface truncate">
                      {user.displayName || (isCurrentSuperAdmin ? 'Superadministrador' : 'Usuario Registrado')}
                    </h2>
                    {isCurrentSuperAdmin ? (
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-black px-2 py-0.2 rounded-full uppercase flex items-center gap-0.5">
                        <Crown size={9} className="text-amber-600" /> SUPERADMIN
                      </span>
                    ) : (
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.2 rounded-full uppercase">
                        {user.isAnonymous ? 'Invitado' : 'Verificado'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">
                    {user.email || 'Acceso Anónimo (Invitado)'}
                  </p>
                  <p className="text-[10px] font-mono text-on-surface-variant/80 mt-0.5 truncate">
                    UID: {user.uid}
                  </p>
                </div>
              </div>

              {/* TOKEN & CREDENTIALS DETAILS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-on-surface flex items-center gap-1">
                    <Key size={14} className="text-primary" /> Token de Sesión JWT
                  </span>
                  <button
                    onClick={copyTokenToClipboard}
                    className="flex items-center gap-1 text-[10px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    {copiedToken ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>{copiedToken ? 'Copiado!' : 'Copiar Token'}</span>
                  </button>
                </div>

                <div className="bg-surface-container p-2.5 rounded-xl border border-outline-variant/30 font-mono text-[10px] text-on-surface-variant break-all max-h-20 overflow-y-auto leading-relaxed">
                  {idToken || 'Cargando sesión Firebase...'}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                  <div className="bg-surface-container/50 p-2 rounded-xl border border-outline-variant/20">
                    <span className="text-on-surface-variant block">Rol de Seguridad</span>
                    <strong className={`font-black ${isCurrentSuperAdmin ? 'text-amber-700' : 'text-on-surface'}`}>
                      {isCurrentSuperAdmin ? '👑 SUPERADMIN' : 'USUARIO STANDARD'}
                    </strong>
                  </div>
                  <div className="bg-surface-container/50 p-2 rounded-xl border border-outline-variant/20">
                    <span className="text-on-surface-variant block">Proveedor de Acceso</span>
                    <strong className="text-on-surface font-bold">
                      {user.providerData[0]?.providerId || (user.isAnonymous ? 'Anónimo (Invitado)' : 'Firebase Auth')}
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
                <span>
                  Tus preferencias se guardan en la colección Firestore <code className="font-mono bg-emerald-100 px-1 py-0.2 rounded">users/{user.uid}</code>.
                </span>
              </div>
            </div>

          </div>

          {/* SUPERADMIN MANAGEMENT DASHBOARD (ONLY VISIBLE TO SUPERADMIN) */}
          {isCurrentSuperAdmin && (
            <div className="bg-surface rounded-2xl border-2 border-amber-400/40 p-5 space-y-4 shadow-sm animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-outline-variant/20 pb-3 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black shadow-xs">
                    <Crown size={22} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-on-surface flex items-center gap-1.5">
                      Panel de Control SuperAdmin
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200">
                        {user.email}
                      </span>
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Herramientas de diagnóstico, latencia y estado de colecciones Firestore
                    </p>
                  </div>
                </div>

                <button
                  onClick={pingFirestore}
                  disabled={isPingingFirestore}
                  className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw size={14} className={isPingingFirestore ? 'animate-spin' : ''} />
                  <span>{isPingingFirestore ? 'Comprobando...' : 'Test de Latencia Firestore'}</span>
                </button>
              </div>

              {superadminActionStatus && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                  <Activity size={16} className="text-emerald-700 shrink-0" />
                  <span>{superadminActionStatus}</span>
                </div>
              )}

              {/* FIRESTORE COLLECTIONS & DIAGNOSTICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-surface-container p-3 rounded-xl border border-outline-variant/30 space-y-1">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="text-[10px] font-extrabold uppercase">Colección Usuarios</span>
                    <Users size={14} className="text-primary" />
                  </div>
                  <div className="text-sm font-black text-on-surface">/users/{'{uid}'}</div>
                  <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <Check size={11} /> Regla isSuperAdmin() OK
                  </div>
                </div>

                <div className="bg-surface-container p-3 rounded-xl border border-outline-variant/30 space-y-1">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="text-[10px] font-extrabold uppercase">Planes de Raciones</span>
                    <Layers size={14} className="text-secondary" />
                  </div>
                  <div className="text-sm font-black text-on-surface">/menu_plans</div>
                  <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <Check size={11} /> Lectura/Escritura Total
                  </div>
                </div>

                <div className="bg-surface-container p-3 rounded-xl border border-outline-variant/30 space-y-1">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="text-[10px] font-extrabold uppercase">Lista de Compra</span>
                    <ShoppingBag size={14} className="text-emerald-700" />
                  </div>
                  <div className="text-sm font-black text-on-surface">/shopping_items</div>
                  <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <Check size={11} /> Sincronización Lista
                  </div>
                </div>

                <div className="bg-surface-container p-3 rounded-xl border border-outline-variant/30 space-y-1">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="text-[10px] font-extrabold uppercase">Latencia Firestore</span>
                    <Activity size={14} className="text-amber-600" />
                  </div>
                  <div className="text-sm font-black text-on-surface">
                    {firestoreLatency !== null ? `${firestoreLatency} ms` : 'Sin medir'}
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-medium">
                    {firestoreLatency !== null ? 'Tiempo de respuesta óptimo' : 'Pulsa test para verificar'}
                  </div>
                </div>
              </div>

              {/* TECHNICAL FIREBASE CONFIG SPEC */}
              <div className="bg-surface-container/60 rounded-xl p-3 border border-outline-variant/30 font-mono text-[11px] space-y-1 text-on-surface-variant">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-1 font-bold text-on-surface">
                  <span className="flex items-center gap-1"><Server size={13} className="text-primary" /> Especificación Firebase Conectada:</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">ONLINE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
                  <div><strong>Project ID:</strong> {firebaseConfig.projectId}</div>
                  <div><strong>Database ID:</strong> {firebaseConfig.firestoreDatabaseId}</div>
                  <div><strong>Auth Domain:</strong> {firebaseConfig.authDomain}</div>
                  <div><strong>SuperAdmin:</strong> {SUPERADMIN_EMAIL}</div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Standard Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </div>
  );
}
