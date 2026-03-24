function enviarWellnessTest() {
 
  // ← CAMBIA ESTO: pon el link de tu Google Form
  const LINK_FORMULARIO = "https://forms.gle/TU_LINK_AQUI";
 
  // ← CAMBIA ESTO: añade una línea por cada jugador
  // nombre    → como aparece en el formulario
  // telefono  → número con 34 delante, sin espacios ni +
  // apikey    → el número que le llega a cada jugador al activar CallMeBot
  const jugadores = [
    { nombre: "Carlos",  telefono: "34612345678", apikey: "XXXXXX" },
    { nombre: "Marcos",  telefono: "34623456789", apikey: "XXXXXX" },
    { nombre: "Javi",    telefono: "34634567890", apikey: "XXXXXX" },
    // sigue añadiendo jugadores aquí...
  ];
 
  // ← OPCIONAL: personaliza el mensaje que reciben los jugadores
  const mensaje = `🏃 Wellness test semanal\n\nHola [NOMBRE], rellena el test de hoy antes del entrenamiento:\n👉 ${LINK_FORMULARIO}\n\nTardas menos de 2 minutos ✅`;
 
  // ── No toques nada a partir de aquí ──────────────────────────────────────
 
  jugadores.forEach(jugador => {
    const texto = mensaje.replace("[NOMBRE]", jugador.nombre);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${jugador.telefono}&text=${encodeURIComponent(texto)}&apikey=${jugador.apikey}`;
 
    try {
      UrlFetchApp.fetch(url);
      Logger.log(`✅ Enviado a ${jugador.nombre}`);
    } catch (e) {
      Logger.log(`❌ Error con ${jugador.nombre}: ${e}`);
    }
 
    Utilities.sleep(2000); // espera 2 segundos entre mensajes
  });
}
 
