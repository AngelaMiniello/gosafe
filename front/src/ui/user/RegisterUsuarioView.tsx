"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ValidateFormRegister } from "@/lib/validate";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { register } from "@/service/authService";
import { Eye, EyeOff } from "lucide-react";
import { sendEmail } from "@/lib/sendEmail";

// ── Field wrapper ─────────────────────────────────────────────────────────────
const FieldWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col gap-1">
    {children}
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────
function RegisterView() {
  const router      = useRouter();
  const searchParams = useSearchParams();
  const token       = searchParams.get("token");

  const [googleData, setGoogleData] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (token && token !== "null") {
      try {
        const decoded: any = jwtDecode(token);
        setGoogleData(decoded);
        localStorage.setItem("googleRegisterData", JSON.stringify(decoded));
      } catch (error) {
        console.error("Token inválido:", error);
      }
      return;
    }
    const stored = localStorage.getItem("googleRegisterData");
    if (stored) setGoogleData(JSON.parse(stored));
  }, [token]);

  const ciudadPorPais: Record<string, string[]> = {
    Colombia:  ["Bogotá", "Medellín", "Cali", "Barranquilla"],
    Argentina: ["Buenos Aires", "Córdoba", "Rosario"],
    México:    ["Ciudad de México", "Guadalajara", "Monterrey"],
    Chile:     ["Santiago", "Valparaíso", "Concepción"],
  };

  return (
      <div className="min-h-screen bg-[#f5f2eb] relative overflow-hidden font-nunito">

        {/* ── Main ── */}
        <main className="relative z-10 w-full max-w-205 mx-auto py-16 px-10 flex flex-col justify-center">

          {/* Title */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-black text-[#1a1a1a] mb-1.5 tracking-tight m-0 font-nunito"> ¡Únete a nuestra comunidad! </h1>
            <p className="text-[#666] text-sm font-semibold m-0"> Regístrate para empezar a conectar con los mejores instructores</p>
          </div>

          {/* Google button */}
          <div className="mb-6 flex justify-center">
            <button
              type="button"
              className="transition-all duration-200 hover:bg-[#f0ede6] !important hover:shadow-md focus:border-[#1a3d2b] focus:ring-2 focus:ring-[#1a3d2b]/15 font-nunito flex items-center justify-center gap-2.5 bg-white border-[1.5px] border-[#d0ccc4] rounded-full py-2.75 px-8 text-sm font-bold cursor-pointer text-[#333] w-85"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Regístrate con Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 max-w-150 mb-5 mx-auto w-full">
            <div className="flex-1 h-[1px] bg-[#ccc]" />
            <span className="text-[#888] text-[13px] font-semibold font-nunito">O</span>
            <div className="flex-1 h-[1px] bg-[#ccc]" />
          </div>

          {/* ── Formik ── */}
          <Formik
            enableReinitialize
            initialValues={{
              primernombre:   googleData?.firstName || "",
              segundonombre:  googleData?.lastName  || "",
              username:       "",
              documentType:   "",
              document:       "",
              birthdate:      "",
              address:        "",
              phone:          "",
              country:        "",
              city:           "",
              mail:           googleData?.email || "",
              password:       "",
              confirmPassword:"",
              genre:          "",
            }}
            validate={ValidateFormRegister}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await register(values);
                await sendEmail(values.primernombre, values.mail);
                localStorage.removeItem("googleRegisterData");
                router.push("/login");
              } catch (error: any) {
                console.error("Error:", error);
                alert(error?.message || "Error al registrar usuario");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, isSubmitting, values }) => (
              <Form className="w-full max-w-160 mx-auto">

                {/* ── Grid 2 columnas ── */}
                <div className="grid grid-cols-2 gap-3 mb-3 w-full max-w-150 mx-auto">

                  {/* First name */}
                  <FieldWrap>
                    <Field name="primernombre" type="text" placeholder="Primer Nombre"
                      className="focus:border-[#1a3d2b] bg-white font-nunito w-full p-4 rounded-xl border border-[#d6d0c8] text-sm text-[#333] outline-none box-border transition-colors duration-200" />
                    <ErrorMessage name="primernombre">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Birthdate */}
                  <FieldWrap>
                    <Field name="birthdate" type="date"
                      max={new Date().toISOString().split("T")[0]}
                      className={`focus:border-[#1a3d2b] bg-white p-4 font-nunito w-full rounded-xl border border-[#d6d0c8] text-sm text-[#333] outline-none box-border transition-colors duration-200 ${
                      values.birthdate ? "text-[#1a1a1a]" : "text-[#888]"}`}
                    />
                    <ErrorMessage name="birthdate">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Last name */}
                  <FieldWrap>
                    <Field name="segundonombre" type="text" placeholder="Segundo Nombre"
                      className="focus:border-[#1a3d2b] font-nunito w-full p-4 rounded-xl border border-[#d6d0c8] bg-white text-sm text-[#333] outline-none box-border transition-colors duration-200"/>
                    <ErrorMessage name="segundonombre">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Address */}
                  <FieldWrap>
                    <Field name="address" type="text" placeholder="Dirección"
                      className="focus:border-[#1a3d2b] p-4 font-nunito w-full rounded-xl border border-[#d6d0c8] bg-white text-sm text-[#333] outline-none box-border transition-colors duration-200" />
                    <ErrorMessage name="address">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Mail */}
                  <FieldWrap>
                    <Field name="mail" type="email" placeholder="Correo electrónico"
                      className="focus:border-[#1a3d2b] font-nunito w-full p-4 rounded-xl border border-[#d6d0c8] bg-white text-sm text-[#333] outline-none box-border transition-colors duration-200"/>
                    <ErrorMessage name="mail">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* country */}
                  <FieldWrap>
                    <Field as="select" name="country"  
                      className={`focus:border-[#1a3d2b] bg-white p-4 font-nunito w-full rounded-xl border border-[#d6d0c8] text-sm text-[#333] outline-none box-border transition-colors duration-200 ${
                      values.birthdate ? "text-[#1a1a1a]" : "text-[#888]"}`}>

                      <option value="">Country</option>

                      {Object.keys(ciudadPorPais).map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="country">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* password */}
                  <FieldWrap>
                    <div className="relative">
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="focus:border-[#1a3d2b] font-nunito w-full p-4 rounded-xl border border-[#d6d0c8] bg-white text-sm text-[#333] outline-none box-border transition-colors duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        className="absolute top-1/2 right-3 -translate-y-1/2 border-none bg-transparent flex items-center justify-center text-gray-500 cursor-pointer p-0"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <ErrorMessage name="password">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* City */}
                  <FieldWrap>
                    <Field as="select" name="city" 
                      className={`focus:border-[#1a3d2b] bg-white p-4 font-nunito w-full rounded-xl border border-[#d6d0c8] text-sm text-[#333] outline-none box-border transition-colors duration-200 ${
                      values.birthdate ? "text-[#1a1a1a]" : "text-[#888]"}`}>

                      <option value="">City</option>
                      {(ciudadPorPais[values.country] || []).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="city" >{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Confirm password */}
                  <FieldWrap>
                    <div style={{ position: "relative" }}>
                      <Field
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Repetir contraseña" 
                        className="focus:border-[#1a3d2b] font-nunito w-full p-4 rounded-xl border border-[#d6d0c8] bg-white text-sm text-[#333] outline-none box-border transition-colors duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Ocultar confirmación" : "Mostrar confirmación"}
                        className="absolute top-1/2 right-3 -translate-y-1/2 border-none bg-transparent flex items-center justify-center text-gray-500 cursor-pointer p-0"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <ErrorMessage name="confirmPassword">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Username */}
                  <FieldWrap>
                    <Field name="username" type="text" placeholder="Username"
                      className="focus:border-[#1a3d2b] focus:ring-2 focus:ring-[#1a3d2b]/15 bg-white border border-[#d6d0c8] p-4 box-border outline-none text-sm text-[#333] font-nunito w-full rounded-xl transition-colors duration-200" />
                    <ErrorMessage name="username">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                </div>

                {/* ── Extra file: Type doc | Doc | Tel | Gen ── */}
                <div className="grid grid-cols-2 gap-3 mb-3 w-full max-w-150 mx-auto">
                  <FieldWrap>
                    <Field as="select" name="documentType"
                      className={`focus:border-[#1a3d2b] bg-white p-4 font-nunito w-full rounded-xl border border-[#d6d0c8] text-sm text-[#333] outline-none box-border transition-colors duration-200 ${
                      values.birthdate ? "text-[#1a1a1a]" : "text-[#888]"}`}>
                        
                      <option value="">Tipo doc.</option>
                      <option value="CC">DNI</option>
                      <option value="CC">CC</option>
                      <option value="CE">CE</option>
                    </Field>
                    <ErrorMessage name="documentType">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  <FieldWrap>
                    <Field name="document" type="text" placeholder="N° Documento"
                      className="focus:border-[#1a3d2b] font-nunito w-full p-4 rounded-xl border border-[#d6d0c8] bg-white outline-none box-border text-sm text-[#333] transition-colors duration-200"/>
                    <ErrorMessage name="document" >{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  <FieldWrap>
                    <Field name="phone" type="text" placeholder="Teléfono"
                      className="focus:border-[#1a3d2b] font-nunito w-full p-4 rounded-xl border border-[#d6d0c8] bg-white outline-none box-border text-sm text-[#333] transition-colors duration-200"/>
                    <ErrorMessage name="phone">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  <FieldWrap>
                    <Field as="select" name="genre" 
                    className={`focus:border-[#1a3d2b] bg-white p-4 font-nunito w-full rounded-xl border border-[#d6d0c8] text-sm text-[#333] outline-none box-border transition-colors duration-200 ${
                      values.birthdate ? "text-[#1a1a1a]" : "text-[#888]"}`}>

                      <option value="">Género</option>

                      <option value="Hombre">Hombre</option> 
                      <option value="Mujer">Mujer</option>
                      <option value="Otro">Otro</option>
                    </Field>
                    <ErrorMessage name="genre">{msg => <span className="block text-[#c0392b] text-xs mt-2 font-nunito">{msg}</span>}</ErrorMessage>
                  </FieldWrap>
                </div>

                {/* ── Submit + links ── */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                    className="bg-[#f5c518] mt-2 font-nunito text-[#1a1a1a] text-base font-extrabold tracking-[0.2px] border-none rounded-full py-3.5 w-[340px] cursor-pointer text-center block mx-auto transition-all duration-200 hover:enabled:!bg-[#e0b010] hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_6px_20px_rgba(245,197,24,0.4)] disabled:opacity-55 disabled:cursor-not-allowed mb-2"
                  >
                    {isSubmitting ? "Registrando..." : "Regístrate"}
                  </button>

                  <p className="text-xs text-[#444] font-semibold m-0">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login" className="text-[#1a3d2b] font-bold text-sm no-underline ml-1">
                      Inicia sesión
                    </Link>
                  </p>

                  <p  className="text-xs text-[#444] font-semibold m-0 text-center">
                    Al registrarte, aceptas todos nuestros{" "}
                    <Link href="/terms" className="text-[#1a3d2b] font-bold text-sm no-underline ml-1">
                      Términos de servicio y política de privacidad
                    </Link>
                  </p>
                </div>

              </Form>
            )}
          </Formik>
        </main>
      </div>
  );
}

export default RegisterView;