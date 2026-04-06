import { ShieldCheck } from "lucide-react";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
      <h2 className="text-sm font-semibold text-[#F97316] uppercase tracking-wide mb-3">
        {title}
      </h2>
      <div className="text-sm text-[#64748b] dark:text-[#94A3B8] leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

function SummaryBox({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 p-4 mb-3">
      {items.map(({ label, value }) => (
        <div key={label} className="flex gap-2 py-0.5">
          <span className="text-xs font-semibold text-[#1E3A8A] dark:text-slate-300 shrink-0 w-28">
            {label}
          </span>
          <span className="text-xs text-[#64748b] dark:text-[#94A3B8]">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold text-[#1E3A8A] dark:text-slate-300 mb-1">
        {title}
      </p>
      {children}
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 items-start">
      <span className="text-[#F97316] mt-0.5 shrink-0">–</span>
      <span>{children}</span>
    </li>
  );
}

export default function Datenschutz() {
  return (
    <div className="bg-[#f8fafc] dark:bg-[#0F172A] min-h-screen">
      <div className="max-w-200 mx-auto px-5 md:px-10 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#F97316]/10 flex items-center justify-center">
            <ShieldCheck size={16} className="text-[#F97316]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1E3A8A] dark:text-white">
            Datenschutzerklärung
          </h1>
        </div>
        <p className="text-xs text-[#64748b] dark:text-[#94A3B8] mb-6 ml-12">
          Fassung 22.01.2026
        </p>

        <div className="flex flex-col gap-4">
          {/* Einleitung */}
          <Section title="Einleitung und Überblick">
            <p>
              Wir haben diese Datenschutzerklärung verfasst, um Ihnen gemäß den
              Vorgaben der DSGVO (EU) 2016/679 zu erklären, welche
              personenbezogenen Daten wir verarbeiten, zukünftig verarbeiten
              werden und welche rechtmäßigen Möglichkeiten Sie haben.
            </p>
            <p>
              Wir informieren in klarer und einfacher Sprache, dass wir
              personenbezogene Daten nur dann verarbeiten, wenn eine
              entsprechende gesetzliche Grundlage gegeben ist. Bei Fragen wenden
              Sie sich bitte an die im Impressum genannte verantwortliche
              Stelle.
            </p>
          </Section>

          {/* Anwendungsbereich */}
          <Section title="Anwendungsbereich">
            <p>
              Diese Datenschutzerklärung gilt für alle von uns verarbeiteten
              personenbezogenen Daten und für alle Daten, die von beauftragten
              Firmen (Auftragsverarbeiter) verarbeitet werden. Sie umfasst:
            </p>
            <ul className="space-y-1 mt-2">
              <Li>Alle Onlineauftritte (Websites), die wir betreiben</Li>
              <Li>Social-Media-Auftritte und E-Mail-Kommunikation</Li>
              <Li>Mobile Apps für Smartphones und andere Geräte</Li>
            </ul>
          </Section>

          {/* Rechtsgrundlagen */}
          <Section title="Rechtsgrundlagen">
            <p>
              Wir verarbeiten Ihre Daten nur, wenn mindestens eine der folgenden
              Bedingungen zutrifft:
            </p>
            <div className="space-y-2 mt-2">
              {[
                {
                  title: "Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)",
                  text: "Sie haben uns Ihre Einwilligung gegeben, Daten zu einem bestimmten Zweck zu verarbeiten.",
                },
                {
                  title: "Vertrag (Art. 6 Abs. 1 lit. b DSGVO)",
                  text: "Um einen Vertrag oder vorvertragliche Verpflichtungen zu erfüllen, verarbeiten wir Ihre Daten.",
                },
                {
                  title:
                    "Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO)",
                  text: "Wenn wir einer rechtlichen Verpflichtung unterliegen, z. B. Rechnungen für die Buchhaltung aufzuheben.",
                },
                {
                  title: "Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO)",
                  text: "Im Falle berechtigter Interessen, die Ihre Grundrechte nicht einschränken, z. B. den sicheren Betrieb unserer Website.",
                },
              ].map(({ title, text }) => (
                <div
                  key={title}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700"
                >
                  <p className="text-xs font-semibold text-[#1E3A8A] dark:text-slate-300 mb-0.5">
                    {title}
                  </p>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-3">
              Zusätzlich gelten nationale Gesetze: In{" "}
              <strong className="text-[#1E3A8A] dark:text-white">
                Österreich
              </strong>{" "}
              das Datenschutzgesetz (DSG), in{" "}
              <strong className="text-[#1E3A8A] dark:text-white">
                Deutschland
              </strong>{" "}
              das Bundesdatenschutzgesetz (BDSG).
            </p>
          </Section>

          {/* Kontakt */}
          <Section title="Kontaktdaten des Verantwortlichen">
            <p>Bei Fragen zum Datenschutz:</p>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 mt-2 space-y-1">
              <p className="font-semibold text-[#1E3A8A] dark:text-white">
                Bastian Brugger
              </p>
              <p>Karl-Vogt-Straße 21, 5700 Zell am See, Österreich</p>
              <p>
                E-Mail:{" "}
                <span className="text-[#F97316]">contact@properform.app</span>
              </p>
              <p>
                Impressum:{" "}
                <span className="text-[#F97316]">properform.app/impressum</span>
              </p>
            </div>
          </Section>

          {/* Speicherdauer */}
          <Section title="Speicherdauer">
            <p>
              Wir speichern personenbezogene Daten nur so lange, wie es für die
              Bereitstellung unserer Dienstleistungen unbedingt notwendig ist.
              Daten werden gelöscht, sobald der Grund für die Datenverarbeitung
              nicht mehr vorhanden ist.
            </p>
            <p>
              In einigen Fällen sind wir gesetzlich verpflichtet, bestimmte
              Daten auch nach Wegfall des ursprünglichen Zwecks zu speichern (z.
              B. zu Zwecken der Buchführung).
            </p>
            <p>
              Sollten Sie die Löschung Ihrer Daten wünschen oder die
              Einwilligung widerrufen, werden die Daten so rasch wie möglich
              gelöscht, soweit keine Pflicht zur Speicherung besteht.
            </p>
          </Section>

          {/* Rechte */}
          <Section title="Ihre Rechte laut DSGVO">
            <p>Gemäß Art. 13, 14 DSGVO stehen Ihnen folgende Rechte zu:</p>
            <ul className="space-y-1.5 mt-2">
              <Li>
                <strong className="text-[#1E3A8A] dark:text-white">
                  Auskunftsrecht (Art. 15)
                </strong>{" "}
                – Sie können eine Kopie Ihrer gespeicherten Daten anfordern.
              </Li>
              <Li>
                <strong className="text-[#1E3A8A] dark:text-white">
                  Berichtigungsrecht (Art. 16)
                </strong>{" "}
                – Wir müssen fehlerhafte Daten berichtigen.
              </Li>
              <Li>
                <strong className="text-[#1E3A8A] dark:text-white">
                  Recht auf Löschung (Art. 17)
                </strong>{" "}
                – Sie können die Löschung Ihrer Daten verlangen.
              </Li>
              <Li>
                <strong className="text-[#1E3A8A] dark:text-white">
                  Einschränkung der Verarbeitung (Art. 18)
                </strong>{" "}
                – Daten dürfen nur gespeichert, aber nicht weiter verwendet
                werden.
              </Li>
              <Li>
                <strong className="text-[#1E3A8A] dark:text-white">
                  Datenübertragbarkeit (Art. 20)
                </strong>{" "}
                – Wir stellen Ihre Daten auf Anfrage in einem gängigen Format
                bereit.
              </Li>
              <Li>
                <strong className="text-[#1E3A8A] dark:text-white">
                  Widerspruchsrecht (Art. 21)
                </strong>{" "}
                – Sie können der Verarbeitung widersprechen, z. B. bei
                Direktwerbung oder Profiling.
              </Li>
              <Li>
                <strong className="text-[#1E3A8A] dark:text-white">
                  Beschwerderecht (Art. 77)
                </strong>{" "}
                – Sie können sich jederzeit bei der Datenschutzbehörde
                beschweren.
              </Li>
            </ul>
          </Section>

          {/* Datenschutzbehörde */}
          <Section title="Zuständige Datenschutzbehörde">
            <p>Für Österreich ist die Datenschutzbehörde zuständig:</p>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 mt-2 space-y-1">
              <p className="font-semibold text-[#1E3A8A] dark:text-white">
                Österreich Datenschutzbehörde
              </p>
              <p>Leiter: Dr. Matthias Schmidl</p>
              <p>Barichgasse 40-42, 1030 Wien</p>
              <p>Tel.: +43 1 52 152-0</p>
              <p>
                E-Mail:{" "}
                <button
                  className="text-[#F97316] hover:underline bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => window.open("mailto:dsb@dsb.gv.at")}
                >
                  dsb@dsb.gv.at
                </button>
              </p>
              <p>
                Web:{" "}
                <button
                  className="text-[#F97316] hover:underline bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => window.open("https://www.dsb.gv.at", "_blank")}
                >
                  www.dsb.gv.at
                </button>
              </p>
            </div>
          </Section>

          {/* Webhosting */}
          <Section title="Webhosting">
            <SummaryBox
              items={[
                { label: "Betroffene", value: "Besucher der Website" },
                {
                  label: "Zweck",
                  value: "Professionelles Hosting und Absicherung des Betriebs",
                },
                {
                  label: "Daten",
                  value:
                    "IP-Adresse, Zeitpunkt des Besuchs, verwendeter Browser",
                },
                { label: "Speicherdauer", value: "In der Regel 2 Wochen" },
                {
                  label: "Rechtsgrundlage",
                  value: "Art. 6 Abs. 1 lit. f DSGVO (Berechtigte Interessen)",
                },
              ]}
            />
            <p>
              Beim Besuch unserer Website speichert unser Webserver automatisch
              Daten wie URL, Browser, Betriebssystem, Referrer-URL, IP-Adresse
              sowie Datum und Uhrzeit in sogenannten Webserver-Logfiles.
            </p>
            <p>
              Diese Daten werden in der Regel zwei Wochen gespeichert und danach
              automatisch gelöscht. Wir geben diese Daten nicht weiter, können
              jedoch nicht ausschließen, dass diese Daten beim Vorliegen von
              rechtswidrigem Verhalten von Behörden eingesehen werden.
            </p>
            <SubSection title="Zwecke der Datenverarbeitung">
              <ul className="space-y-1">
                <Li>Professionelles Hosting und Absicherung des Betriebs</Li>
                <Li>Aufrechterhaltung der Betriebs- und IT-Sicherheit</Li>
                <Li>
                  Anonyme Auswertung des Zugriffsverhaltens zur Verbesserung des
                  Angebots
                </Li>
              </ul>
            </SubSection>
          </Section>

          {/* Social Media */}
          <Section title="Social Media">
            <SummaryBox
              items={[
                { label: "Betroffene", value: "Besucher der Website" },
                {
                  label: "Zweck",
                  value:
                    "Darstellung unserer Serviceleistung, Kontakt, Werbung",
                },
                {
                  label: "Daten",
                  value:
                    "Telefonnummern, E-Mail-Adressen, Nutzungsverhalten, IP-Adresse",
                },
                {
                  label: "Speicherdauer",
                  value: "Abhängig von der jeweiligen Plattform",
                },
                {
                  label: "Rechtsgrundlage",
                  value: "Art. 6 Abs. 1 lit. a und f DSGVO",
                },
              ]}
            />
            <p>
              Wir sind auch in diversen Social-Media-Plattformen aktiv. Dabei
              können Daten von Nutzern verarbeitet werden. Bitte beachten Sie,
              dass Daten auch außerhalb der EU verarbeitet werden können, da
              viele Social-Media-Kanäle amerikanische Unternehmen sind.
            </p>
            <p>
              Wenn Sie der Datenverarbeitung widersprechen möchten, können Sie
              Cookies in Ihrem Browser verwalten, deaktivieren oder löschen.
            </p>
          </Section>

          {/* Begriffe */}
          <Section title="Erklärung verwendeter Begriffe">
            {[
              {
                term: "Auftragsverarbeiter",
                def: "Eine natürliche oder juristische Person, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet – z. B. Hosting-Anbieter, Zahlungsdienstleister oder große Unternehmen wie Google oder Microsoft.",
              },
              {
                term: "Biometrische Daten",
                def: "Mit technischen Verfahren gewonnene Daten zu physischen oder verhaltenstypischen Merkmalen einer Person – z. B. Fingerabdrücke, Gesichtsbilder, DNA oder Handschrift.",
              },
              {
                term: "Dateisystem",
                def: "Jede strukturierte Sammlung personenbezogener Daten, die nach bestimmten Kriterien zugänglich ist – z. B. gespeicherte Namen und E-Mail-Adressen auf einem Server.",
              },
              {
                term: "Einwilligung",
                def: "Eine freiwillig, informiert und unmissverständlich abgegebene Zustimmung zur Verarbeitung personenbezogener Daten – z. B. über ein Cookie-Consent-Banner.",
              },
              {
                term: "Personenbezogene Daten",
                def: "Alle Informationen, die eine natürliche Person identifizieren können – z. B. Name, Adresse, E-Mail, IP-Adresse, Geburtsdatum oder Bankdaten.",
              },
              {
                term: "Profiling",
                def: "Automatisierte Verarbeitung personenbezogener Daten zur Bewertung persönlicher Aspekte – z. B. zur gezielten Werbung oder Bonitätsprüfung.",
              },
              {
                term: "Verantwortlicher",
                def: "Die Person oder Stelle, die über die Zwecke und Mittel der Verarbeitung personenbezogener Daten entscheidet – in unserem Fall wir als Unternehmen.",
              },
              {
                term: "Verarbeitung",
                def: "Jeder Vorgang im Zusammenhang mit personenbezogenen Daten – von der Erhebung über die Speicherung bis zur Löschung.",
              },
            ].map(({ term, def }) => (
              <div
                key={term}
                className="border-b border-slate-100 dark:border-slate-700/50 last:border-0 pb-3 last:pb-0"
              >
                <p className="text-xs font-semibold text-[#1E3A8A] dark:text-slate-300 mb-0.5">
                  {term}
                </p>
                <p>{def}</p>
              </div>
            ))}
          </Section>

          {/* Schlusswort */}
          <Section title="Schlusswort">
            <p>
              Bei Fragen zum Thema Datenschutz zögern Sie bitte nicht, uns zu
              kontaktieren. Wir nehmen den Schutz Ihrer persönlichen Daten ernst
              und informieren Sie so klar und transparent wie möglich.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-600 mt-2">
              Alle Texte sind urheberrechtlich geschützt. Quelle:
              Datenschutzerklärung erstellt mit dem Datenschutz Generator für
              Österreich von AdSimple.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
