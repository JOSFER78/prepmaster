import React, { useState } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithGoogleNativeOrWeb,
  signInAnonymously, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  db
} from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
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
  ChevronRight,
  Send,
  Home,
  Check,
  FileText
} from 'lucide-react';
import { TouChefIsotype } from './TouChefLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
  onOpenChefOnboarding?: () => void;
}

export function AuthModal({ 
  isOpen, 
  onClose, 
  initialMode = 'login', 
  onSuccess,
  onOpenChefOnboarding
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'verify_email'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'user' | 'chef'>('user');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const [verificationSent, setVerificationSent] = useState<boolean>(false);

  if (!isOpen) return null;

  const getFriendlyErrorMessage = (errCode: string, rawMessage?: string): string => {
    switch (errCode) {
      case 'auth/unauthorized-domain':
        return 'Dominio local no autorizado aún en Firebase Console para Google OAuth.';
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
        return 'Se cerró la ventana de acceso antes de completar el inicio.';
      default:
        return rawMessage || 'Ha ocurrido un error al procesar tu solicitud. Inténtalo de nuevo o accede como invitado.';
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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
        setError('Por favor, introduce tu nombre completo.');
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
      if (!acceptTerms) {
        setError('Debes aceptar los Términos de Servicio y la Política de Privacidad para continuar.');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'register') {
        const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(userCred.user, { displayName: name.trim() });
        
        // Send Firebase Email Verification
        try {
          await sendEmailVerification(userCred.user);
          setVerificationSent(true);
        } catch (vErr) {
          console.warn('Email verification warning:', vErr);
        }

        // Save profile in Firestore
        await setDoc(doc(db, 'users', userCred.user.uid), {
          displayName: name.trim(),
          email: email.trim(),
          createdAt: new Date().toISOString(),
          isEmailVerified: false,
          role: selectedRole,
          isChef: selectedRole === 'chef',
          chefStatus: selectedRole === 'chef' ? 'pending_onboarding' : 'none'
        }, { merge: true });

        setMode('verify_email');
        setLoading(false);
        return;
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
        
        // Fetch role if chef
        try {
          const userDoc = await getDoc(doc(db, 'users', userCred.user.uid));
          if (userDoc.exists() && userDoc.data().role === 'chef') {
            setSelectedRole('chef');
          }
        } catch (dErr) {
          console.warn('Error reading user role:', dErr);
        }

        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err: any) {
      console.error('Email Auth error:', err);
      setError(getFriendlyErrorMessage(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setVerificationSent(true);
        alert('Se ha reenviado el correo de verificación a ' + email);
      } catch (e: any) {
        alert('Error al reenviar correo de verificación: ' + e.message);
      }
    } else {
      alert('Inicia sesión para reenviar la verificación.');
    }
  };

  const handleContinueAfterVerification = () => {
    if (selectedRole === 'chef') {
      onClose();
      if (onOpenChefOnboarding) {
        onOpenChefOnboarding();
      }
    } else {
      if (onSuccess) onSuccess();
      onClose();
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      const userResult = await signInWithGoogleNativeOrWeb();
      if (userResult && userResult.uid) {
        await setDoc(doc(db, 'users', userResult.uid), {
          displayName: userResult.displayName,
          email: userResult.email,
          photoURL: userResult.photoURL,
          role: selectedRole,
          isChef: selectedRole === 'chef',
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }

      if (selectedRole === 'chef') {
        onClose();
        if (onOpenChefOnboarding) {
          onOpenChefOnboarding();
        }
      } else {
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err: any) {
      console.error('Google Auth error:', err);
      setError(getFriendlyErrorMessage(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInAnonymously(auth);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      console.warn('Firebase anonymous auth fallback to local demo mode:', err);
      if (onSuccess) onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-zinc-100 flex flex-col max-h-[92vh] overflow-y-auto hide-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* LOGO & TITLE */}
        <div className="text-center space-y-2 mb-5 shrink-0">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <TouChefIsotype size={36} />
          </div>
          
          {mode === 'verify_email' ? (
            <div>
              <h2 className="text-xl font-black text-zinc-900 dark:text-white">¡Verifica tu Correo Electrónico!</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Confirmación oficial de cuenta vía Firebase
              </p>
            </div>
          ) : mode === 'forgot' ? (
            <div>
              <h2 className="text-xl font-black text-zinc-900 dark:text-white">Recuperar Contraseña</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Te enviaremos un enlace seguro para restablecerla
              </p>
            </div>
          ) : mode === 'register' ? (
            <div>
              <h2 className="text-xl font-black text-zinc-900 dark:text-white">
                {selectedRole === 'chef' ? 'Registro de Cocinero Profesional' : 'Crear Cuenta en TouChef'}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {selectedRole === 'chef' 
                  ? 'Cocina en domicilios, fija tus tarifas y gestiona tus clientes'
                  : 'Planifica comidas, calcula raciones y encarga chefs profesionales'}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-black text-zinc-900 dark:text-white">Bienvenido a TouChef</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Accede a tu plan semanal, despensa y reservas
              </p>
            </div>
          )}
        </div>

        {/* ROLE SELECTOR (FOR REGISTRATION & LOGIN) */}
        {mode === 'register' && (
          <div className="grid grid-cols-2 gap-2 mb-5">
            <button
              type="button"
              onClick={() => setSelectedRole('user')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedRole === 'user'
                  ? 'bg-[#E07A5F]/15 border-[#E07A5F] text-white shadow-xs'
                  : 'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Home size={18} className={selectedRole === 'user' ? 'text-[#E07A5F]' : 'text-zinc-500'} />
                {selectedRole === 'user' && <Check size={14} className="text-[#E07A5F]" />}
              </div>
              <strong className="text-xs font-black block text-zinc-900 dark:text-white">Soy Cliente / Hogar</strong>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight block mt-0.5">
                Planifico mis comidas y encargo chefs
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('chef')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedRole === 'chef'
                  ? 'bg-amber-500/15 border-amber-500 text-white shadow-xs'
                  : 'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <ChefHat size={18} className={selectedRole === 'chef' ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-500'} />
                {selectedRole === 'chef' && <Check size={14} className="text-amber-600 dark:text-amber-400" />}
              </div>
              <strong className="text-xs font-black block text-zinc-900 dark:text-white">Soy Cocinero (Chef)</strong>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight block mt-0.5">
                Cocino en casas y cobro por hora
              </span>
            </button>
          </div>
        )}

        {/* ERROR / SUCCESS ALERTS */}
        {error && (
          <div className="p-3.5 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {resetSuccess && (
          <div className="p-3.5 mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>Hemos enviado un correo de recuperación. Revisa tu bandeja de entrada.</span>
          </div>
        )}

        {/* MODE: VERIFY EMAIL SCREEN */}
        {mode === 'verify_email' ? (
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
              <Mail size={32} />
            </div>

            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-sm mx-auto">
              Hemos enviado un correo de verificación oficial a <strong className="text-zinc-900 dark:text-white font-bold">{email}</strong>. Por favor, abre el enlace en tu correo para activar tu cuenta de forma 100% segura.
            </p>

            {selectedRole === 'chef' && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-left text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400">
                  <ChefHat size={16} />
                  <span>Siguiente paso: Filtrado &amp; Subida de Documentos</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  Para poder recibir encargos y aparecer en el directorio de cocineros, completa tu DNI/NIE, carné de manipulador sanitario, tarifas horarias y firma el contrato mercantil.
                </p>
              </div>
            )}

            <div className="pt-3 space-y-2">
              <button
                type="button"
                onClick={handleContinueAfterVerification}
                className="w-full btn-hero-copper py-3.5 rounded-2xl text-xs font-black shadow-lg flex items-center justify-center gap-2 text-white cursor-pointer active:scale-95"
              >
                <span>
                  {selectedRole === 'chef' 
                    ? 'Subir Documentos & Completar Perfil Chef' 
                    : 'Continuar a TouChef'}
                </span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={handleResendVerification}
                className="w-full py-2.5 text-xs text-zinc-400 hover:text-white font-bold transition-colors cursor-pointer"
              >
                ¿No has recibido el correo? Reenviar verificación
              </button>
            </div>
          </div>
        ) : (
          /* REGULAR FORM */
          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block">Nombre Completo</label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={selectedRole === 'chef' ? 'Ej. Chef Marcos Valbuena' : 'Tu nombre'}
                    className="w-full bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#E07A5F]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block">Correo Electrónico</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#E07A5F]"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-zinc-300">Contraseña</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => { setMode('forgot'); setError(null); }}
                      className="text-[11px] text-[#E07A5F] hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#E07A5F]"
                  />
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block">Confirmar Contraseña</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#E07A5F]"
                  />
                </div>
              </div>
            )}

            {mode === 'register' && (
              <label className="flex items-start gap-2.5 pt-1 text-[11px] text-zinc-600 dark:text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 accent-[#E07A5F] rounded mt-0.5 shrink-0"
                />
                <span>
                  He leído y acepto los <strong className="text-zinc-900 dark:text-white font-bold">Términos de Servicio</strong> y la <strong className="text-zinc-900 dark:text-white font-bold">Política de Privacidad (RGPD)</strong> de TouChef.
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-hero-copper py-3.5 rounded-2xl text-xs font-black shadow-lg flex items-center justify-center gap-2 text-white cursor-pointer active:scale-95 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : mode === 'register' ? (
                <>
                  <span>
                    {selectedRole === 'chef' ? 'Crear Cuenta de Cocinero & Verificar' : 'Crear Cuenta y Verificar'}
                  </span>
                  <ArrowRight size={15} />
                </>
              ) : mode === 'forgot' ? (
                <>
                  <Send size={15} />
                  <span>Enviar Enlace de Recuperación</span>
                </>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            {/* GOOGLE & GUEST ACCESS */}
            {mode !== 'forgot' && (
              <>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-800" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold text-zinc-500">
                    <span className="bg-[#121316] px-3">O accede con</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                  </svg>
                  <span>Continuar con Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleGuestAccess}
                  className="w-full text-center text-xs text-zinc-400 hover:text-zinc-200 pt-2 transition-colors cursor-pointer"
                >
                  Acceder como invitado (Modo local)
                </button>
              </>
            )}

            {/* SWITCH LOGIN / REGISTER */}
            <div className="text-center pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
              {mode === 'login' ? (
                <p>
                  ¿No tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setError(null); }}
                    className="text-[#E07A5F] hover:underline font-bold"
                  >
                    Regístrate gratis
                  </button>
                </p>
              ) : (
                <p>
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(null); }}
                    className="text-[#E07A5F] hover:underline font-bold"
                  >
                    Inicia sesión
                  </button>
                </p>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
