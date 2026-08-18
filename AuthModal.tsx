import React, { useState } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInAnonymously, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  updateProfile,
  db
} from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ChefHat,
  ShieldCheck,
  ExternalLink,
  Crown
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDomainError, setIsDomainError] = useState<boolean>(false);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const getFriendlyErrorMessage = (errCode: string, rawMessage?: string): string => {
    switch (errCode) {
      case 'auth/unauthorized-domain':
        setIsDomainError(true);
        return 'Dominio local (localhost) no autorizado aún en Firebase Console para Google OAuth.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Correo o contraseña incorrectos. Verifica tus datos o recupera tu contraseña.';
      case 'auth/email-already-in-use':
        return 'Este correo ya está registrado. Inicia sesión con tu contraseña.';
      case 'auth/invalid-email':
        return 'El formato de correo electrónico no es válido.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      case 'auth/popup-closed-by-user':
        return 'Se cerró la ventana de Google antes de completar el acceso.';
      case 'auth/popup-blocked':
        return 'El navegador bloqueó la ventana emergente de Google. Permite popups o usa Email/Contraseña.';
      case 'auth/operation-not-allowed':
        return 'Este método de acceso no está habilitado en Firebase Authentication.';
      default:
        return rawMessage || 'Ha ocurrido un error al procesar tu solicitud. Inténtalo de nuevo o accede como invitado.';
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsDomainError(false);
    setResetSuccess(false);

    if (!email.trim()) {
      setError('Por favor, introduce tu correo electrónico.');
      return;
    }

    if (mode === 'forgot') {
      setLoading(true);
      try {
        await sendPasswordResetEmail(auth, email.trim());
        setResetSuccess(true);
      } catch (err: any) {
        console.error('Password reset error:', err);
        setError(getFriendlyErrorMessage(err.code, err.message));
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!password) {
      setError('Por favor, introduce tu contraseña.');
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setError('Por favor, introduce tu nombre.');
        return;
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else if (mode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const user = userCredential.user;
        
        await updateProfile(user, {
          displayName: name.trim()
        });

        // Initialize Firestore profile
        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          email: user.email,
          displayName: name.trim(),
          photoURL: '',
          role: user.email?.toLowerCase() === 'josferestudio@gmail.com' ? 'superadmin' : 'user',
          peopleCount: 4,
          dietPreferences: ['Mediterránea'],
          createdAt: new Date().toISOString()
        }, { merge: true });
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(getFriendlyErrorMessage(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsDomainError(false);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Sync Firestore profile
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: user.email,
        displayName: user.displayName || 'Usuario TouChef',
        photoURL: user.photoURL || '',
        role: user.email?.toLowerCase() === 'josferestudio@gmail.com' ? 'superadmin' : 'user',
        updatedAt: new Date().toISOString()
      }, { merge: true });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setError(getFriendlyErrorMessage(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setError(null);
    setIsDomainError(false);
    setLoading(true);
    try {
      await signInAnonymously(auth);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Anonymous Auth Error:', err);
      setError(getFriendlyErrorMessage(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-5 relative text-zinc-900 dark:text-zinc-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 pt-1">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
            <ChefHat size={24} />
          </div>
          <h2 className="text-lg font-black tracking-tight">
            {mode === 'login' && 'Iniciar Sesión en TouChef'}
            {mode === 'register' && 'Crear Cuenta en TouChef'}
            {mode === 'forgot' && 'Recuperar Contraseña'}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {mode === 'login' && 'Accede a tus menús de raciones, despensa y cronómetros.'}
            {mode === 'register' && 'Empieza a planificar y cocinar en lote de forma inteligente.'}
            {mode === 'forgot' && 'Introduce tu email para recibir un enlace de recuperación.'}
          </p>
        </div>

        {/* Tab Switcher (Login vs Register) */}
        {mode !== 'forgot' && (
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); setIsDomainError(false); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'login' 
                  ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(null); setIsDomainError(false); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'register' 
                  ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Crear Cuenta
            </button>
          </div>
        )}

        {/* Feedback Messages */}
        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 rounded-xl text-xs font-medium space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>

            {isDomainError && (
              <div className="pt-1 text-[11px] text-zinc-600 dark:text-zinc-400 border-t border-rose-500/10 space-y-1">
                <p>
                  <strong>Para autorizar localhost:</strong> Ve a Firebase Console &gt; Authentication &gt; Ajustes &gt; Dominios autorizados y añade <code>localhost</code>.
                </p>
                <a
                  href="https://console.firebase.google.com/project/gen-lang-client-0115864240/authentication/settings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  <span>Abrir Ajustes de Firebase</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        )}

        {resetSuccess && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>Te hemos enviado un enlace para restablecer tu contraseña. Revisa tu correo.</span>
          </div>
        )}

        {/* Standard Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Nombre Completo</label>
              <div className="relative flex items-center">
                <UserIcon size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Correo Electrónico</label>
            <div className="relative flex items-center">
              <Mail size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Contraseña</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setError(null); setIsDomainError(false); }}
                    className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Confirmar Contraseña</label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Entrar con Email'}
                  {mode === 'register' && 'Crear mi Cuenta'}
                  {mode === 'forgot' && 'Enviar Enlace'}
                </span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {mode === 'forgot' && (
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); }}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Volver a Iniciar Sesión
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
          <span className="bg-white dark:bg-zinc-900 px-2 text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 absolute">
            o continúa con
          </span>
        </div>

        {/* Social & Guest Access */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs py-2.5 px-4 rounded-xl transition-all active:scale-98 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continuar con Google</span>
          </button>

          <button
            type="button"
            onClick={handleAnonymousLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-zinc-50/60 hover:bg-zinc-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-bold text-xs py-2.5 px-4 rounded-xl transition-all active:scale-98 disabled:opacity-50"
          >
            <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span>Probar como Invitado (Sin Registro)</span>
          </button>
        </div>

        {/* Trust Footer */}
        <div className="text-center">
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1 font-medium">
            <ShieldCheck size={12} className="text-emerald-600 dark:text-emerald-400" />
            Tus datos se almacenan de forma segura en Firebase
          </p>
        </div>
      </div>
    </div>
  );
}
