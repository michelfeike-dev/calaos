import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'impressum',
  description: 'Impressum für calaos.me',
  alternates: { canonical: '/impressum' },
}

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <article className="prose">
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          Michel Feike<br />
          Warthestraße 11<br />
          12051 Berlin<br />
          E-Mail: <a href="mailto:info@calaos.me">info@calaos.me</a>
        </p>

        <h2>Verantwortlich für redaktionelle Inhalte</h2>
        <p>
          gemäß § 18 Abs.&nbsp;2 MStV:<br />
          Michel Feike<br />
          Warthestraße 11<br />
          12051 Berlin
        </p>

        <h2>Haftungsausschluss</h2>
        <p>
          Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte kann keine Gewähr übernommen werden.
          Als Diensteanbieter bin ich gemäß § 7 Abs.&nbsp;1 DDG für eigene Inhalte auf diesen
          Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich
          als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen.
        </p>

        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
          unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
          Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
          bedürfen der schriftlichen Zustimmung des jeweiligen Autors. Downloads und Kopien
          dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
      </article>
    </main>
  )
}
