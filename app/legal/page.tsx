import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { H4 } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { siteMetadata } from '@/data/site';

export const metadata: Metadata = {
  title: 'Legal & Privacy',
  description:
    'Legal information, privacy policy, and data protection declaration for zuendorf.me - GDPR compliant data protection information.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/legal`
  },
  robots: {
    index: true,
    follow: false
  }
};

const legalContentGerman = {
  title: 'German Data Protection Declaration',
  contact: {
    name: 'Lennard Zündorf',
    address: 'Danziger Str. 17, 10435 Berlin',
    email: 'lennard@zuendorf.me',
    phone: '+49 151 57731692'
  }
};

const legalContentEnglish = {
  title: 'English Data Protection Declaration',
  contact: {
    name: 'Lennard Zündorf',
    address: 'Danziger Str. 17, 10435 Berlin',
    email: 'lennard@zuendorf.me',
    phone: '+49 151 57731692'
  }
};

export default function Legal() {
  return (
    <div className='flex flex-col gap-2 sm:gap-4 md:gap-8 lg:gap-16 py-2 md:py-4 lg:py-8'>
      <div className='flex items-center justify-between'>
        <H4>Legal</H4>
        <Link href='/'>
          <Button variant='outline'>Back to Main</Button>
        </Link>
      </div>
      <Tabs defaultValue='english' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='german'>German</TabsTrigger>
          <TabsTrigger value='english'>English</TabsTrigger>
        </TabsList>
        <TabsContent value='german'>
          <Card>
            <CardHeader>
              <CardTitle>{legalContentGerman.title}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6 text-start prose prose-sm max-w-none dark:prose-invert'>
              <section>
                <p>
                  Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der
                  EU-Datenschutzgrundverordnung (DSGVO), ist:
                </p>
                <div className='not-prose pl-4 space-y-1'>
                  <p>{legalContentGerman.contact.name}</p>
                  <p>{legalContentGerman.contact.address}</p>
                  <p>{legalContentGerman.contact.email}</p>
                  <p>{legalContentGerman.contact.phone}</p>
                </div>
              </section>

              <section>
                <h3>Ihre Betroffenenrechte</h3>
                <p>
                  Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie
                  jederzeit folgende Rechte ausüben:
                </p>
                <ul>
                  <li>
                    Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15
                    DSGVO),
                  </li>
                  <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
                  <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
                  <li>
                    Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher
                    Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),
                  </li>
                  <li>
                    Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und
                  </li>
                  <li>
                    Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben
                    oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).
                  </li>
                </ul>
                <p>
                  Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit
                  Wirkung für die Zukunft widerrufen.
                </p>
                <p>
                  Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z.
                  B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die
                  für uns als verantwortliche Stelle zuständige Behörde.
                </p>
                <p>
                  Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift
                  finden Sie{' '}
                  <a
                    href='https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    hier
                  </a>
                  .
                </p>
              </section>

              <section>
                <h3>Erfassung allgemeiner Informationen beim Besuch unserer Website</h3>
                <h4>Art und Zweck der Verarbeitung:</h4>
                <p>
                  Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder
                  anderweitig Informationen übermitteln, werden automatisch Informationen
                  allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa
                  die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres
                  Internet-Service-Providers, Ihre IP-Adresse und ähnliches.
                </p>
                <p>Sie werden insbesondere zu folgenden Zwecken verarbeitet:</p>
                <ul>
                  <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website,</li>
                  <li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
                  <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
                  <li>zur Optimierung unserer Website.</li>
                </ul>
                <p>
                  Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen.
                  Informationen dieser Art werden von uns ggfs. anonymisiert statistisch
                  ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu
                  optimieren.
                </p>

                <h4>Rechtsgrundlage und berechtigtes Interesse:</h4>
                <p>
                  Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres
                  berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität
                  unserer Website.
                </p>

                <h4>Empfänger:</h4>
                <p>
                  Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und
                  die Wartung unserer Webseite als Auftragsverarbeiter tätig werden.
                </p>

                <h4>Drittlandtransfer:</h4>
                <p>Die erhobenen Daten werden ggf. in folgende Drittländer übertragen: USA</p>

                <h4>Speicherdauer:</h4>
                <p>
                  Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung nicht mehr
                  erforderlich sind. Dies ist für die Daten, die der Bereitstellung der Website
                  dienen, grundsätzlich der Fall, wenn die jeweilige Sitzung beendet ist.
                </p>
                <p>
                  Im Falle der Speicherung der Daten in Logfiles ist dies nach spätestens 14 Tagen
                  der Fall. Eine darüberhinausgehende Speicherung ist möglich. In diesem Fall werden
                  die IP-Adressen der Nutzer anonymisiert, sodass eine Zuordnung des aufrufenden
                  Clients nicht mehr möglich ist.
                </p>

                <h4>Bereitstellung vorgeschrieben oder erforderlich:</h4>
                <p>
                  Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich
                  noch vertraglich vorgeschrieben. Ohne die IP-Adresse ist jedoch der Dienst und die
                  Funktionsfähigkeit unserer Website nicht gewährleistet. Zudem können einzelne
                  Dienste und Services nicht verfügbar oder eingeschränkt sein. Aus diesem Grund ist
                  ein Widerspruch ausgeschlossen.
                </p>
              </section>

              <section>
                <h3>Verwendung von Scriptbibliotheken (Google Webfonts)</h3>
                <p>
                  Um unsere Inhalte browserübergreifend korrekt und grafisch ansprechend
                  darzustellen, verwenden wir auf dieser Website &ldquo;Google Web Fonts&rdquo; der
                  Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA; nachfolgend
                  &ldquo;Google&rdquo;) zur Darstellung von Schriften.
                </p>
                <p>
                  Weitere Informationen zu Google Web Fonts finden Sie{' '}
                  <a
                    href='https://developers.google.com/fonts/faq'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    hier
                  </a>{' '}
                  und in der{' '}
                  <a
                    href='https://policies.google.com/privacy'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Datenschutzerklärung von Google
                  </a>
                  .
                </p>
              </section>

              <section>
                <h3>SSL-Verschlüsselung</h3>
                <p>
                  Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden wir dem
                  aktuellen Stand der Technik entsprechende Verschlüsselungsverfahren (z. B. SSL)
                  über HTTPS.
                </p>
              </section>

              <section>
                <h3>Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO</h3>
                <h4>Einzelfallbezogenes Widerspruchsrecht</h4>
                <p>
                  Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
                  jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die
                  aufgrund Art. 6 Abs. 1 lit. f DSGVO (Datenverarbeitung auf der Grundlage einer
                  Interessenabwägung) erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf
                  diese Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.
                </p>
                <p>
                  Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr
                  verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die
                  Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen,
                  oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von
                  Rechtsansprüchen.
                </p>

                <h4>Empfänger eines Widerspruchs</h4>
                <div className='not-prose pl-4 space-y-1'>
                  <p>{legalContentGerman.contact.name}</p>
                  <p>{legalContentGerman.contact.address}</p>
                  <p>{legalContentGerman.contact.email}</p>
                  <p>{legalContentGerman.contact.phone}</p>
                </div>
              </section>

              <section>
                <h3>Änderung unserer Datenschutzbestimmungen</h3>
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
                  aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer
                  Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer
                  Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
                </p>
              </section>

              <section>
                <h3>Fragen an den Datenschutzbeauftragten</h3>
                <p>
                  Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder
                  wenden Sie sich direkt an die für den Datenschutz verantwortliche Person in
                  unserer Organisation:
                </p>
                <div className='not-prose pl-4 space-y-1'>
                  <p>{legalContentGerman.contact.name}</p>
                  <p>{legalContentGerman.contact.address}</p>
                  <p>{legalContentGerman.contact.email}</p>
                  <p>{legalContentGerman.contact.phone}</p>
                </div>
              </section>

              <section className='text-xs text-muted-foreground'>
                <p>
                  Die Datenschutzerklärung wurde mithilfe der activeMind AG erstellt, den Experten
                  für externe Datenschutzbeauftragte (Version #2020-09-30).
                </p>
              </section>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='english'>
          <Card>
            <CardHeader>
              <CardTitle>{legalContentEnglish.title}</CardTitle>
              <CardDescription>
                (Machine translated from German - the German version is legally binding)
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6 text-start prose prose-sm max-w-none dark:prose-invert'>
              <section>
                <p>
                  The person responsible within the meaning of data protection laws, in particular
                  the EU General Data Protection Regulation (GDPR), is:
                </p>
                <div className='not-prose pl-4 space-y-1'>
                  <p>{legalContentEnglish.contact.name}</p>
                  <p>{legalContentEnglish.contact.address}</p>
                  <p>{legalContentEnglish.contact.email}</p>
                  <p>{legalContentEnglish.contact.phone}</p>
                </div>
              </section>

              <section>
                <h3>Your Data Subject Rights</h3>
                <p>
                  You can exercise the following rights at any time using the contact details
                  provided for our data protection officer:
                </p>
                <ul>
                  <li>
                    Information about your data stored with us and its processing (Art. 15 GDPR)
                  </li>
                  <li>Correction of incorrect personal data (Art. 16 GDPR),</li>
                  <li>Deletion of your data stored with us (Art. 17 GDPR),</li>
                  <li>
                    Restriction of data processing if we are not yet allowed to delete your data due
                    to legal obligations (Art. 18 GDPR),
                  </li>
                  <li>Objection to the processing of your data with us (Art. 21 GDPR) and</li>
                  <li>
                    Data portability, provided you have consented to data processing or have
                    concluded a contract with us (Art. 20 GDPR).
                  </li>
                </ul>
                <p>
                  If you have given us consent, you can revoke it at any time with effect for the
                  future.
                </p>
                <p>
                  You can contact a supervisory authority with a complaint at any time, e.g. the
                  competent supervisory authority of the federal state of your residence or the
                  authority responsible for us.
                </p>
                <p>
                  A list of supervisory authorities (for the non-public sector) with addresses can
                  be found{' '}
                  <a
                    href='https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    here
                  </a>
                  .
                </p>
              </section>

              <section>
                <h3>Collection of General Information When Visiting Our Website</h3>
                <h4>Type and Purpose of Processing:</h4>
                <p>
                  When you access our website, i.e. if you do not register or otherwise submit
                  information, information of a general nature is automatically collected. This
                  information (server log files) includes the type of web browser, the operating
                  system used, the domain name of your Internet service provider, your IP address
                  and similar.
                </p>
                <p>They are processed in particular for the following purposes:</p>
                <ul>
                  <li>Ensuring a problem-free connection to the website,</li>
                  <li>Ensuring smooth use of our website,</li>
                  <li>Evaluation of system security and stability as well as</li>
                  <li>for the optimization of our website.</li>
                </ul>
                <p>
                  We do not use your data to draw conclusions about your person. Information of this
                  kind may be statistically evaluated anonymously by us in order to optimize our
                  website and the technology behind it.
                </p>

                <h4>Legal Basis and Legitimate Interest:</h4>
                <p>
                  The processing is carried out in accordance with Art. 6 Para. 1 lit. f GDPR on the
                  basis of our legitimate interest in improving the stability and functionality of
                  our website.
                </p>

                <h4>Recipients:</h4>
                <p>
                  Recipients of the data may be technical service providers who act as processors
                  for the operation and maintenance of our website.
                </p>

                <h4>Third Country Transfer:</h4>
                <p>The collected data may be transferred to the following third countries: USA</p>

                <h4>Storage Duration:</h4>
                <p>
                  The data will be deleted as soon as it is no longer required for the purpose for
                  which it was collected. This is generally the case for data used to provide the
                  website when the respective session has ended.
                </p>
                <p>
                  In the case of data storage in log files, this is the case after 14 days at the
                  latest. Storage beyond this period is possible. In this case, the IP addresses of
                  users are anonymized so that an assignment of the calling client is no longer
                  possible.
                </p>

                <h4>Provision Required or Mandatory:</h4>
                <p>
                  The provision of the aforementioned personal data is neither legally nor
                  contractually required. However, without the IP address, the service and
                  functionality of our website cannot be guaranteed. In addition, individual
                  services and services may not be available or may be restricted. For this reason,
                  an objection is excluded.
                </p>
              </section>

              <section>
                <h3>Use of Script Libraries (Google Web Fonts)</h3>
                <p>
                  In order to display our content correctly and graphically appealing across
                  browsers, we use &ldquo;Google Web Fonts&rdquo; from Google LLC (1600 Amphitheatre
                  Parkway, Mountain View, CA 94043, USA; hereinafter &ldquo;Google&rdquo;) to
                  display fonts on this website.
                </p>
                <p>
                  Further information on Google Web Fonts can be found{' '}
                  <a
                    href='https://developers.google.com/fonts/faq'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    here
                  </a>{' '}
                  and in{' '}
                  <a
                    href='https://policies.google.com/privacy'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Google&apos;s privacy policy
                  </a>
                  .
                </p>
              </section>

              <section>
                <h3>SSL Encryption</h3>
                <p>
                  To protect the security of your data during transmission, we use encryption
                  methods (e.g. SSL) via HTTPS that correspond to the current state of the art.
                </p>
              </section>

              <section>
                <h3>Information About Your Right to Object According to Art. 21 GDPR</h3>
                <h4>Individual Case-Related Right to Object</h4>
                <p>
                  You have the right to object at any time, on grounds relating to your particular
                  situation, to the processing of personal data concerning you which is based on
                  Art. 6(1)(f) GDPR (data processing on the basis of a balance of interests); this
                  also applies to profiling based on this provision within the meaning of Art. 4 No.
                  4 GDPR.
                </p>
                <p>
                  If you object, we will no longer process your personal data unless we can
                  demonstrate compelling legitimate grounds for the processing which override your
                  interests, rights and freedoms, or the processing serves the assertion, exercise
                  or defense of legal claims.
                </p>

                <h4>Recipient of an Objection</h4>
                <div className='not-prose pl-4 space-y-1'>
                  <p>{legalContentEnglish.contact.name}</p>
                  <p>{legalContentEnglish.contact.address}</p>
                  <p>{legalContentEnglish.contact.email}</p>
                  <p>{legalContentEnglish.contact.phone}</p>
                </div>
              </section>

              <section>
                <h3>Changes to Our Privacy Policy</h3>
                <p>
                  We reserve the right to adapt this privacy policy so that it always complies with
                  current legal requirements or to implement changes to our services in the privacy
                  policy, e.g. when introducing new services. The new privacy policy will then apply
                  to your next visit.
                </p>
              </section>

              <section>
                <h3>Questions to the Data Protection Officer</h3>
                <p>
                  If you have any questions about data protection, please send us an email or
                  contact the person responsible for data protection in our organization directly:
                </p>
                <div className='not-prose pl-4 space-y-1'>
                  <p>{legalContentEnglish.contact.name}</p>
                  <p>{legalContentEnglish.contact.address}</p>
                  <p>{legalContentEnglish.contact.email}</p>
                  <p>{legalContentEnglish.contact.phone}</p>
                </div>
              </section>

              <section className='text-xs text-muted-foreground'>
                <p>
                  The privacy policy was created with the help of activeMind AG, the experts for
                  external data protection officers (Version #2020-09-30).
                </p>
              </section>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
