# 🏃 Wellness Test Automático por WhatsApp

Automatiza el envío del wellness test a tus jugadores por WhatsApp privado, de forma totalmente gratuita.

Cada martes, cada jugador recibe un mensaje privado con el link del formulario. Los datos se recogen automáticamente en Google Sheets.

---

## ¿Qué necesitas?

- Cuenta de Google (Gmail)
- Un Google Form con las preguntas del wellness
- WhatsApp en el móvil
- 30 minutos para configurarlo todo (solo una vez)

## Herramientas utilizadas

| Herramienta | Para qué sirve | Coste |
|---|---|---|
| Google Forms | El formulario que rellenan los jugadores | Gratis |
| Google Sheets | Almacena y organiza las respuestas | Gratis |
| Google Apps Script | Automatiza el envío cada martes | Gratis |
| CallMeBot | Envía los mensajes por WhatsApp | Gratis |

---

## Pasos de configuración

### 1. Crea el Google Form

Crea un formulario en [forms.google.com](https://forms.google.com) con estas preguntas (escala 1-5):

1. Nombre (respuesta corta)
2. ¿Cómo de bien has dormido? (1 = muy mal, 5 = muy bien)
3. Nivel de fatiga (1 = sin fatiga, 5 = agotado)
4. Cantidad de estrés (1 = sin estrés, 5 = muy estresado)
5. Nivel de dolor muscular / agujetas (1 = ninguno, 5 = mucho)
6. ¿Puedes entrenar el martes? (Sí / No)
7. Si no puedes, ¿por qué? (texto libre, opcional)
8. ¿Alguna molestia? (texto libre, opcional)

### 2. Conecta el Form con Google Sheets

En el formulario → pestaña **Respuestas** → icono de Sheets → crear nueva hoja.

### 3. Pega el script en Apps Script

En tu Google Sheets → **Extensiones → Apps Script** → borra lo que haya → pega el contenido del archivo `codigo.gs` de este repositorio.

Rellena los datos de tus jugadores en la sección `const jugadores`:

```javascript
const jugadores = [
  { nombre: "Carlos",  telefono: "34612345678", apikey: "XXXXXX" },
  { nombre: "Marcos",  telefono: "34623456789", apikey: "XXXXXX" },
  // añade una línea por cada jugador
];
```

- `nombre` → como aparece en el formulario
- `telefono` → número español con 34 delante, sin espacios ni +
- `apikey` → el número que le llega a cada jugador al activar CallMeBot (ver paso 4)

### 4. Activa CallMeBot (cada jugador lo hace una sola vez)

Manda este mensaje a tus jugadores (está en el archivo `mensaje_jugadores.txt`):

Cada jugador tiene que:
1. Guardar el contacto **+34 644 86 70 49** con el nombre que quiera (ej: *"Formulario martes"*)
2. Mandarle por WhatsApp: `Autorizo callmebot a enviarme mensajes`
3. Recibirá su API key en menos de 2 minutos → que te la mande a ti

### 5. Prueba el envío

En Apps Script, selecciona la función `enviarWellnessTest` en el desplegable y haz clic en **Ejecutar**. La primera vez pedirá permisos → acéptalos → vuelve a ejecutar.

Deberías recibir el mensaje en WhatsApp en menos de un minuto.

### 6. Programa el envío automático cada martes

En Apps Script → icono del reloj **(Activadores)** → **Añadir activador**:

| Campo | Valor |
|---|---|
| Función | enviarWellnessTest |
| Fuente del evento | Basado en tiempo |
| Tipo de activador | Semana del temporizador |
| Día | Martes |
| Hora | 9:00 — 10:00 |

Guarda y listo. **Ya no tienes que hacer nada más.**

---

## Resultado

- 📲 Cada jugador recibe el formulario por privado cada martes
- 📊 Las respuestas se guardan solas en Google Sheets
- 🟢 Verde / 🟡 Amarillo / 🔴 Rojo según el estado de cada jugador
- 📋 Tabla resumen con media histórica por jugador

---

## Preguntas frecuentes

**¿Los jugadores ven mi número?**
No. El mensaje llega desde el número de CallMeBot, no desde el tuyo.

**¿Qué pasa si un jugador no activa CallMeBot?**
Simplemente no le llega el mensaje. No afecta al resto.

**¿Puedo cambiar el día o la hora?**
Sí, solo tienes que editar el activador en Apps Script.

**¿Puedo cambiar el mensaje?**
Sí, edita la variable `mensaje` en el script.

---

## Créditos

Proyecto creado para automatizar el seguimiento del wellness en equipos deportivos.
Herramientas: Google Apps Script + [CallMeBot](https://www.callmebot.com)
