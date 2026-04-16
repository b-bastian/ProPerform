---
layout: two-cols
---

# Mail-System & weitere Features

Automatisierter E-Mail-Versand für wichtige Nutzeraktionen direkt vom Backend aus.

<br/>

**Einsatzgebiete:**

- Registrierungsbestätigung nach dem Sign-up
- Passwort-Reset via E-Mail-Link

<br/>

**Weitere Backend-Features:**

- **Rollenbasierte Zugriffssteuerung** (Athlet vs. Trainer)
- **Datei-Upload** für Übungsvideos
- Fehlerbehandlung & Error-Handling
- Umgebungsvariablen & sichere Konfiguration via `.env`

::right::

<div class="ml-8 mt-2">

```js
const { subject, text, html } = buildVerificationEmail(firstname, rawCode);

mailer
  .sendMail({
    from: '"ProPerform" <no-reply@properform.app>',
    to: normalizedEmail,
    subject,
    text,
    html,
  })
  .catch(console.error);
```

</div>
