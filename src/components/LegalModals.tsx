import React from 'react';
import { X, ShieldCheck, FileText, Cookie, Lock, Check } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'cookies' | null;
  onClose: () => void;
}

export function LegalModals({ isOpen, type, onClose }: LegalModalProps) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 border border-zinc-200 dark:border-stone-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-stone-200">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-zinc-50 dark:bg-stone-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              {type === 'privacy' && <ShieldCheck size={22} />}
              {type === 'terms' && <FileText size={22} />}
              {type === 'cookies' && <Cookie size={22} />}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Información Legal TouChef
              </span>
              <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-0.5">
                {type === 'privacy' && 'Política de Privacidad y Protección de Datos'}
                {type === 'terms' && 'Términos y Condiciones de Uso y Marketplace'}
                {type === 'cookies' && 'Política de Cookies y Almacenamiento Local'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-600 dark:text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-zinc-700 dark:text-stone-300">
          
          {/* 1. PRIVACY POLICY */}
          {type === 'privacy' && (
            <>
              <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl text-amber-800 dark:text-amber-300 font-medium text-[11px]">
                <strong>Responsable del Tratamiento:</strong> TouChef Technologies S.L. — NIF B-88994411 — Domicilio: Calle Velázquez 14, 28001 Madrid, España. Contacto DPD: <code>privacidad@touchef.es</code>.
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm">1. Finalidad del Tratamiento</h4>
                <p>
                  En cumplimiento del Reglamento General de Protección de Datos (RGPD UE 2016/679) y la Ley Orgánica 3/2018 (LOPDGDD), tratamos sus datos personales para:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-stone-400">
                  <li>Gestionar la generación algorítmica de planes semanales de batch cooking y listas de compra.</li>
                  <li>Facilitar la intermediación segura entre usuarios comensales y cocineros profesionales a domicilio.</li>
                  <li>Sincronizar pedidos automatizados de frescos en supermercados colaboradores (como Grupo DIA España).</li>
                  <li>Garantizar la custodia transaccional de pagos mediante pasarelas seguras hasta la finalización del servicio.</li>
                </ul>

                <h4 className="font-bold text-zinc-900 dark:text-white text-sm pt-2">2. Legitimación y Conservación</h4>
                <p>
                  La base legal es la ejecución de la relación de servicio y el consentimiento explícito otorgado en el registro. Los datos se conservarán durante la vigencia de la cuenta y los plazos legales obligatorios.
                </p>

                <h4 className="font-bold text-zinc-900 dark:text-white text-sm pt-2">3. Derechos del Usuario (ARCO-POL)</h4>
                <p>
                  Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando un email a <code>privacidad@touchef.es</code> adjuntando copia de su documento de identidad.
                </p>
              </div>
            </>
          )}

          {/* 2. TERMS OF SERVICE */}
          {type === 'terms' && (
            <>
              <div className="p-3 bg-zinc-50 dark:bg-stone-850 border border-zinc-200 dark:border-stone-800 rounded-2xl text-zinc-700 dark:text-stone-300 text-[11px]">
                <strong>Condiciones de Plataforma:</strong> Regulan el acceso al software planificador TouChef y la contratación de servicios de cocina a domicilio en territorio español.
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm">1. Naturaleza del Servicio</h4>
                <p>
                  TouChef proporciona una suite digital de batch cooking inteligente y un marketplace de intermediación que conecta clientes particulares con cocineros profesionales independientes debidamente verificados.
                </p>

                <h4 className="font-bold text-zinc-900 dark:text-white text-sm pt-2">2. Requisitos de los Cocineros</h4>
                <p>
                  Todos los cocineros dados de alta declaran estar en posesión del Certificado de Manipulador de Alimentos en vigor, cumplir la normativa higiénico-sanitaria y estar habilitados profesionalmente para prestar servicios culinarios a domicilio.
                </p>

                <h4 className="font-bold text-zinc-900 dark:text-white text-sm pt-2">3. Modelo Económico y Retención Segura</h4>
                <p>
                  TouChef aplica un modelo de comisión decreciente sobre el servicio del cocinero (15% en primera reserva, 8% fidelidad, 5% retención). Los ingredientes frescos no tienen comisión añadida de intermediación (0%). Los importes se retienen en depósito seguro hasta la finalización satisfactoria de los 5 hitos del cocinado.
                </p>

                <h4 className="font-bold text-zinc-900 dark:text-white text-sm pt-2">4. Cancelaciones y Sustituciones</h4>
                <p>
                  Las cancelaciones con más de 24 horas de antelación son reembolsadas íntegramente. Para incidencias de ingredientes en supermercado, se aplican las directrices de sustitución previamente elegidas por el usuario.
                </p>
              </div>
            </>
          )}

          {/* 3. COOKIES POLICY */}
          {type === 'cookies' && (
            <>
              <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl text-amber-800 dark:text-amber-300 font-medium text-[11px]">
                <strong>Uso de Cookies y Almacenamiento Local (LocalStorage / IndexedDB):</strong>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm">1. ¿Qué son las Cookies y el Almacenamiento Local?</h4>
                <p>
                  Son pequeños ficheros o identificadores que se almacenan en su navegador para permitir que la aplicación recuerde su sesión, sus menús guardados y sus preferencias de cocina sin necesidad de reconfigurarlos en cada visita.
                </p>

                <h4 className="font-bold text-zinc-900 dark:text-white text-sm pt-2">2. Tipología de Cookies Empleadas</h4>
                <div className="space-y-2">
                  <div className="p-2.5 bg-zinc-50 dark:bg-stone-850 rounded-xl border border-zinc-200 dark:border-stone-800">
                    <strong className="text-zinc-900 dark:text-white block text-xs">Cookies Técnicas (Estrictamente Necesarias)</strong>
                    <span className="text-zinc-600 dark:text-stone-400 text-[11px]">Gestión del token de autenticación Firebase, persistencia del lote activo y estado de la cesta DIA. No requieren consentimiento previo.</span>
                  </div>
                  <div className="p-2.5 bg-zinc-50 dark:bg-stone-850 rounded-xl border border-zinc-200 dark:border-stone-800">
                    <strong className="text-zinc-900 dark:text-white block text-xs">Cookies de Personalización</strong>
                    <span className="text-zinc-600 dark:text-stone-400 text-[11px]">Guardan la memoria del hogar (tipo de placa, fuegos, comensales y alérgenos).</span>
                  </div>
                </div>

                <h4 className="font-bold text-zinc-900 dark:text-white text-sm pt-2">3. Desactivación de Cookies</h4>
                <p>
                  Puede configurar o rechazar el uso de cookies no esenciales en cualquier momento desde el banner de preferencias o desde la configuración de su navegador web (Chrome, Firefox, Safari, Edge).
                </p>
              </div>
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-800 flex justify-end bg-zinc-50 dark:bg-stone-950/70">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Entendido y Aceptar
          </button>
        </div>

      </div>
    </div>
  );
}
