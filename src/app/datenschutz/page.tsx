import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'datenschutz',
  description: 'Datenschutzerklärung für calaos.me',
  alternates: { canonical: '/datenschutz' },
}

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <article className="prose">
        <h1>Datenschutzerklärung</h1>

        <h2>1. Verantwortliche Stelle</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p>
          Michel Feike<br />
          Warthestraße 11<br />
          12051 Berlin<br />
          E-Mail: <a href="mailto:info@calaos.me">info@calaos.me</a>
        </p>
        <p>
          Bei Fragen zum Datenschutz kannst du dich jederzeit unter der oben angegebenen
          E-Mail-Adresse an mich wenden.
        </p>

        <h2>2. Allgemeine Hinweise</h2>
        <p>
          Der Schutz deiner persönlichen Daten ist mir ein besonderes Anliegen. Ich behandle
          deine personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
          Datenschutzvorschriften sowie dieser Datenschutzerklärung. Personenbezogene Daten
          sind alle Informationen, mit denen du persönlich identifiziert werden kannst
          (z.&nbsp;B. Name, E-Mail-Adresse, IP-Adresse).
        </p>

        <h2>3. Datenerfassung auf dieser Website</h2>

        <h3>a) Beim Besuch der Website</h3>
        <p>
          Beim Aufrufen dieser Website werden durch den Hosting-Anbieter automatisch
          Informationen erhoben, die dein Browser übermittelt:
        </p>
        <ul>
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Browsertyp und -version</li>
          <li>Betriebssystem</li>
          <li>Referrer-URL (zuvor besuchte Seite)</li>
        </ul>
        <p>
          Diese Daten sind technisch erforderlich, um die Website darzustellen sowie deren
          Stabilität und Sicherheit zu gewährleisten. Die Server-Logfiles werden für einen
          begrenzten Zeitraum gespeichert und anschließend gelöscht. Eine Zusammenführung
          dieser Daten mit anderen Datenquellen erfolgt nicht.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO
          (berechtigtes Interesse an einer sicheren und fehlerfreien Bereitstellung der
          Website).
        </p>
        <p>
          <strong>Hosting-Anbieter:</strong> Diese Website wird über Vercel Inc.,
          440 N Barranca Ave #4133, Covina, CA&nbsp;91723, USA, gehostet. Vercel speichert
          Daten in Rechenzentren, die überwiegend in den USA sowie an weiteren Standorten
          betrieben werden. Vercel nimmt am EU-US Data Privacy Framework teil und verfügt
          über ein Data Processing Addendum (DPA) mit EU-Standardvertragsklauseln (SCCs)
          als zusätzlichen Übertragungsmechanismus, sodass eine angemessene Datenübermittlung
          in die USA sichergestellt ist.
        </p>

        <h3>b) Kontaktaufnahme per E-Mail</h3>
        <p>
          Wenn du mich per E-Mail kontaktierst, werden deine Angaben einschließlich der
          mitgeteilten Kontaktdaten zur Bearbeitung deiner Anfrage und für etwaige
          Rückfragen gespeichert. Eine Weitergabe dieser Daten an Dritte erfolgt nicht.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO
          (Vertragserfüllung oder vorvertragliche Maßnahmen) bzw. Art.&nbsp;6 Abs.&nbsp;1
          lit.&nbsp;f DSGVO (berechtigtes Interesse an effektiver Kommunikation).
        </p>

        <h2>4. Cookies</h2>
        <p>
          Diese Website setzt ausschließlich technisch notwendige Cookies, die für den
          ordnungsgemäßen Betrieb der Website erforderlich sind (z.&nbsp;B. Session-Daten).
          Analyse-, Marketing- oder Tracking-Cookies werden nicht verwendet. Da keine
          einwilligungspflichtigen Cookies gesetzt werden, ist kein Cookie-Banner
          erforderlich.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO
          i.&nbsp;V.&nbsp;m. § 25 Abs.&nbsp;2 Nr.&nbsp;2 TDDDG.
        </p>

        <h2>5. Web-Analyse &amp; Performance-Messung (Vercel)</h2>
        <p>
          Zur Reichweitenmessung nutze ich Vercel Web Analytics, einen Dienst der
          Vercel Inc., 440 N Barranca Ave #4133, Covina, CA&nbsp;91723, USA. Erfasst
          werden ausschließlich aggregierte, anonyme Nutzungsdaten (z.&nbsp;B.
          aufgerufene Seiten, ungefähre Herkunftsregion, Gerätetyp, Referrer).
        </p>
        <p>
          Zusätzlich nutze ich Vercel Speed Insights (ebenfalls Vercel Inc.) zur Messung
          technischer Performance-Kennzahlen (z.&nbsp;B. Ladezeiten, Web Vitals). Auch
          hierbei werden ausschließlich aggregierte, anonyme Messwerte verarbeitet.
        </p>
        <p>
          Beide Dienste arbeiten <strong>cookielos</strong> und legen keine
          geräteübergreifenden Nutzerprofile an. Es werden keine IP-Adressen dauerhaft
          gespeichert und keine personenbezogenen Identifikatoren gebildet; eine
          Wiedererkennung einzelner Besucher findet nicht statt.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO
          (berechtigtes Interesse an einer statistischen, datensparsamen Auswertung der
          Websitenutzung). Da keine Endgeräte-Informationen im Sinne des § 25 TDDDG
          gespeichert oder ausgelesen werden, ist keine Einwilligung erforderlich.
          Weitere Informationen findest du in der{' '}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von Vercel
          </a>
          .
        </p>

        <h2>6. Newsletter</h2>
        <p>
          Wenn du meinen Newsletter abonnierst, verarbeite ich deine E-Mail-Adresse
          ausschließlich zum Zweck des regelmäßigen Versands redaktioneller Inhalte.
          Die Anmeldung erfolgt im <strong>Double-Opt-In-Verfahren</strong>: Nach Absenden
          des Formulars erhältst du eine E-Mail mit einem Bestätigungslink. Erst mit Klick
          auf diesen Link wird deine Anmeldung wirksam und deine Adresse in die
          Empfängerliste aufgenommen. So wird sichergestellt, dass die Anmeldung
          tatsächlich von dir stammt. Bestätigst du nicht, wird keine Adresse gespeichert.
        </p>
        <p>
          <strong>Dienstleister:</strong> Der Versand erfolgt über Resend, Inc.,
          2261 Market Street #5039, San Francisco, CA&nbsp;94114, USA. Resend nimmt am
          EU-US Data Privacy Framework teil. Zwischen mir und Resend besteht ein Vertrag
          zur Auftragsverarbeitung gemäß Art.&nbsp;28 DSGVO. Weitere Informationen findest
          du in der{' '}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von Resend
          </a>
          .
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO
          (Einwilligung).
        </p>
        <p>
          <strong>Abmeldung:</strong> Du kannst deine Einwilligung jederzeit und ohne
          Angabe von Gründen widerrufen — der Widerruf ist so einfach wie die Anmeldung
          (Art.&nbsp;7 Abs.&nbsp;3 DSGVO). Jede Newsletter-E-Mail enthält dafür einen
          Abmeldelink; alternativ genügt eine formlose E-Mail an mich. Nach der Abmeldung
          wird deine Adresse unverzüglich aus der Empfängerliste entfernt. Die
          Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
        </p>

        <h2>7. Schriftarten</h2>
        <p>
          Diese Website verwendet ausschließlich lokal auf dem Server gehostete
          Schriftarten. Es wird keine Verbindung zu externen Schriftartendiensten
          (z.&nbsp;B. Google Fonts) hergestellt, sodass keine Daten an Dritte übermittelt
          werden.
        </p>

        <h2>8. Datenübermittlung in Drittländer</h2>
        <p>
          Eine Übermittlung personenbezogener Daten in Drittländer außerhalb der EU/des
          EWR erfolgt ausschließlich, wenn hierfür geeignete Garantien bestehen. Die von
          mir eingesetzten US-Dienstleister (Vercel, Resend) nehmen am EU-US Data Privacy
          Framework teil und haben Standardvertragsklauseln (SCCs) implementiert, sodass
          die Datenübermittlung auf einer rechtlich gesicherten Grundlage erfolgt.
        </p>

        <h2>9. Rechte der betroffenen Personen</h2>
        <p>Dir stehen gemäß DSGVO folgende Rechte zu:</p>
        <ul>
          <li>Auskunft über deine gespeicherten Daten (Art.&nbsp;15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art.&nbsp;16 DSGVO)</li>
          <li>Löschung deiner Daten (Art.&nbsp;17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art.&nbsp;18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art.&nbsp;20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art.&nbsp;21 DSGVO)</li>
          <li>
            Beschwerde bei einer Aufsichtsbehörde (Art.&nbsp;77 DSGVO) — eine Übersicht
            der deutschen Aufsichtsbehörden findest du unter{' '}
            <a
              href="https://www.bfdi.bund.de/DE/Service/Anschriften/anschriften_table.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              bfdi.bund.de
            </a>
          </li>
        </ul>
        <p>
          Zur Ausübung deiner Rechte wende dich bitte an die unter Ziffer&nbsp;1 genannte
          E-Mail-Adresse.
        </p>

        <h2>10. Speicherdauer</h2>
        <p>
          Ich speichere personenbezogene Daten nur so lange, wie es für den jeweiligen
          Verarbeitungszweck erforderlich ist oder gesetzliche Aufbewahrungspflichten
          bestehen. Nach Wegfall des Zwecks werden die Daten unverzüglich gelöscht oder
          gesperrt.
        </p>

        <h2>11. Datensicherheit</h2>
        <p>
          Ich setze technische und organisatorische Sicherheitsmaßnahmen ein, um deine
          Daten gegen Verlust, Zerstörung, Manipulation und unbefugten Zugriff zu
          schützen. Die Übertragung erfolgt stets verschlüsselt via TLS/HTTPS.
        </p>

        <h2>12. Aktualität dieser Datenschutzerklärung</h2>
        <p>
          Stand: Juni 2026. Ich behalte mir vor, diese Erklärung bei Änderungen der
          Website oder neuen rechtlichen Anforderungen zu aktualisieren. Die jeweils
          aktuelle Fassung ist unter{' '}
          <Link href="/datenschutz">calaos.me/datenschutz</Link> abrufbar.
        </p>

      </article>
    </main>
  )
}
