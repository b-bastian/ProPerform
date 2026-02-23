# ProPerform Backend – TODO

## 🟡 Kurzfristig (Qualität & Vollständigkeit)

### 10. `register` – Mailer-Fehler bricht den Flow falsch ab

Wenn die Verification-Mail fehlschlägt, wird `res.json(...)` ohne Status-Code aufgerufen (kein 500) und der User wurde trotzdem erstellt. Der Client bekommt kein Token.

```js
// Fix: Status-Code setzen + Flow klarmachen
return res
  .status(500)
  .json({ message: "User created but failed to send email." });
```

---

### 11. `exercises` – `video_url` / `thumbnail_url` direkte Strings statt Media-FK

Die Admin-Exercise-Routes speichern `video_url` und `thumbnail_url` als direkte Strings.
Die User-Route (`/exercises/all`) macht aber einen JOIN auf `e.video_mid` und `e.thumbnail_mid`.
**Das ist ein Schema-Widerspruch** – entweder alles auf FK migrieren oder die User-Route anpassen.

---

### 12. `getUsers` – Pagination funktioniert nur teilweise

Alle User werden erst in Memory geladen, dann gepaginiert (`allUsers.slice`). Bei vielen Usern ist das ein Memory-Problem. Besser: Pagination direkt in SQL mit `LIMIT/OFFSET` per Rolle.

---

### 13. `exercises/create` – `created_by` nutzt `req.user.id` statt `req.user.uid`

Je nachdem wie der JWT-Payload aussieht (`uid` vs `id`) kann `createdBy` immer `undefined` sein.

```js
// Checken: JWT wird mit { uid: ... } signiert, also
const createdBy = req.user.uid;
```

---

### 14. `media/upload` – `result.mid` existiert nicht

```js
mid: result.mid; // ❌ – insertId ist das korrekte Feld
mid: result.insertId; // ✅
```

---

### 15. Einheitliche Sprache in API-Responses

Manche Fehlermeldungen sind Deutsch (`"Benutzer nicht gefunden"`), manche Englisch (`"user not found"`). Alles auf Englisch vereinheitlichen für konsistente API.

---

### 16. `SALT_ROUNDS` – doppelt importiert in `reset-password.js`

`SALT_ROUNDS` wird definiert aber nie für bcrypt genutzt – bcrypt kommt im File nicht vor (nur sha256 für Tokens). Unnötiger Import.

---

## 🟢 Langfristig / Nice-to-have

### 17. Rate Limiting auf `check-verification-code` und `reset-password/:token`

Aktuell kein Brute-Force-Schutz auf den Token/Code-Prüf-Endpoints.

### 18. Refresh Token System

JWTs laufen nach 3d/60d ab, aber es gibt keinen Refresh-Token-Flow. User werden einfach ausgeloggt.

### 19. Logging-Strategie

`console.log` / `console.error` überall, aber kein strukturiertes Logging (kein Log-Level, kein JSON-Format für Production, kein zentrales Error-Tracking).

### 20. Disk-Usage im Healthcheck

`fs.statSync("/")` gibt keine sinnvollen Disk-Infos zurück. Für Linux: `statvfs` oder `df`-Output parsen.

### 21. Input-Validierung zentralisieren

Jede Route macht eigene manuelle Checks. Besser: `zod` oder `express-validator` einführen für konsistente, wartbare Validation.

### 22. Media-Cleanup bei gelöschten Exercises

Wenn eine Exercise gelöscht wird, bleiben die Media-Dateien auf dem Server. Cascading Delete oder expliziten Cleanup-Job einbauen.

### 23. Trainer-Login fehlt

Es gibt `createTrainer` und `deleteTrainer`, aber keinen Login-Endpoint für Trainer. Trainer können sich also aktuell nicht einloggen.

---

## Zusammenfassung

| Priorität      | Anzahl | Was                                 |
| -------------- | ------ | ----------------------------------- |
| 🔴 Kritisch    | 9      | Bugs, Auth-Lücken, Sicherheit       |
| 🟡 Kurzfristig | 7      | Qualität, Konsistenz, kleinere Bugs |
| 🟢 Langfristig | 7      | Features, Architektur, DX           |
