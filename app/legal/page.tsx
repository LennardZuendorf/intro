import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { H3, H4, H5, M } from '@/components/ui/typography';
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
            <CardContent className='space-y-8 text-start max-w-none'>
              <section className='space-y-4'>
                <M className='leading-relaxed'>
                  Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der
                  EU-Datenschutzgrundverordnung (DSGVO), ist:
                </M>
                <div className='pl-6 space-y-1 text-sm'>
                  <p className='font-medium'>{legalContentGerman.contact.name}</p>
                  <p>{legalContentGerman.contact.address}</p>
                  <p>{legalContentGerman.contact.email}</p>
                  <p>{legalContentGerman.contact.phone}</p>
                </div>
              </section>

              <section className='space-y-4'>
                <H3>Ihre Betroffenenrechte</H3>
                <M className='leading-relaxed'>
                  Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie
                  jederzeit folgende Rechte ausüben:
                </M>
                <ul className='space-y-2 leading-relaxed text-sm lg:text-base list-disc pl-6'>
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
                <M className='leading-relaxed'>
                  Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit
                  Wirkung für die Zukunft widerrufen.
                </M>
                <M className='leading-relaxed'>
                  Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z.
                  B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die
                  für uns als verantwortliche Stelle zuständige Behörde.
                </M>
                <M className='leading-relaxed'>
                  Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift
                  finden Sie{' '}
                  <a
                    href='https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline hover:no-underline'
                  >
                    hier
                  </a>
                  .
                </M>
              </section>

              <section className='space-y-4'>
                <H3>Erfassung allgemeiner Informationen beim Besuch unserer Website</H3>
                <H5 className='mt-4'>Art und Zweck der Verarbeitung:</H5>
                <M className='leading-relaxed'>
                  Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder
                  anderweitig Informationen übermitteln, werden automatisch Informationen
                  allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa
                  die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres
                  Internet-Service-Providers, Ihre IP-Adresse und ähnliches.
                </M>
                <M className='leading-relaxed'>
                  Sie werden insbesondere zu folgenden Zwecken verarbeitet:
                </M>
                <ul className='space-y-2 leading-relaxed text-sm lg:text-base list-disc pl-6'>
                  <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website,</li>
                  <li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
                  <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
                  <li>zur Optimierung unserer Website.</li>
                </ul>
                <M className='leading-relaxed'>
                  Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen.
                  Informationen dieser Art werden von uns ggfs. anonymisiert statistisch
                  ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu
                  optimieren.
                </M>

                <H5 className='mt-4'>Rechtsgrundlage und berechtigtes Interesse:</H5>
                <M className='leading-relaxed'>
                  Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres
                  berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität
                  unserer Website.
                </M>

                <H5 className='mt-4'>Empfänger:</H5>
                <M className='leading-relaxed'>
                  Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und
                  die Wartung unserer Webseite als Auftragsverarbeiter tätig werden.
                </M>

                <H5 className='mt-4'>Drittlandtransfer:</H5>
                <M className='leading-relaxed'>
                  Die erhobenen Daten werden ggf. in folgende Drittländer übertragen: USA
                </M>

                <H5 className='mt-4'>Speicherdauer:</H5>
                <M className='leading-relaxed'>
                  Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung nicht mehr
                  erforderlich sind. Dies ist für die Daten, die der Bereitstellung der Website
                  dienen, grundsätzlich der Fall, wenn die jeweilige Sitzung beendet ist.
                </M>
                <M className='leading-relaxed'>
                  Im Falle der Speicherung der Daten in Logfiles ist dies nach spätestens 14 Tagen
                  der Fall. Eine darüberhinausgehende Speicherung ist möglich. In diesem Fall werden
                  die IP-Adressen der Nutzer anonymisiert, sodass eine Zuordnung des aufrufenden
                  Clients nicht mehr möglich ist.
                </M>

                <H5 className='mt-4'>Bereitstellung vorgeschrieben oder erforderlich:</H5>
                <M className='leading-relaxed'>
                  Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich
                  noch vertraglich vorgeschrieben. Ohne die IP-Adresse ist jedoch der Dienst und die
                  Funktionsfähigkeit unserer Website nicht gewährleistet. Zudem können einzelne
                  Dienste und Services nicht verfügbar oder eingeschränkt sein. Aus diesem Grund ist
                  ein Widerspruch ausgeschlossen.
                </M>
              </section>

              <section className='space-y-4'>
                <H3>Verwendung von Scriptbibliotheken (Google Webfonts)</H3>
                <M className='leading-relaxed'>
                  Um unsere Inhalte browserübergreifend korrekt und grafisch ansprechend
                  darzustellen, verwenden wir auf dieser Website &ldquo;Google Web Fonts&rdquo; der
                  Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA; nachfolgend
                  &ldquo;Google&rdquo;) zur Darstellung von Schriften.
                </M>
                <M className='leading-relaxed'>
                  Weitere Informationen zu Google Web Fonts finden Sie{' '}
                  <a
                    href='https://developers.google.com/fonts/faq'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline hover:no-underline'
                  >
                    hier
                  </a>{' '}
                  und in der{' '}
                  <a
                    href='https://policies.google.com/privacy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline hover:no-underline'
                  >
                    Datenschutzerklärung von Google
                  </a>
                  .
                </M>
              </section>

              <section className='space-y-4'>
                <H3>SSL-Verschlüsselung</H3>
                <M className='leading-relaxed'>
                  Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden wir dem
                  aktuellen Stand der Technik entsprechende Verschlüsselungsverfahren (z. B. SSL)
                  über HTTPS.
                </M>
              </section>

              <section className='space-y-4'>
                <H3>Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO</H3>
                <H5 className='mt-4'>Einzelfallbezogenes Widerspruchsrecht</H5>
                <M className='leading-relaxed'>
                  Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
                  jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die
                  aufgrund Art. 6 Abs. 1 lit. f DSGVO (Datenverarbeitung auf der Grundlage einer
                  Interessenabwägung) erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf
                  diese Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.
                </M>
                <M className='leading-relaxed'>
                  Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr
                  verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die
                  Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen,
                  oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von
                  Rechtsansprüchen.
                </M>

                <H5 className='mt-4'>Empfänger eines Widerspruchs</H5>
                <div className='pl-6 space-y-1 text-sm'>
                  <p className='font-medium'>{legalContentGerman.contact.name}</p>
                  <p>{legalContentGerman.contact.address}</p>
                  <p>{legalContentGerman.contact.email}</p>
                  <p>{legalContentGerman.contact.phone}</p>
                </div>
              </section>

              <section className='space-y-4'>
                <H3>Änderung unserer Datenschutzbestimmungen</H3>
                <M className='leading-relaxed'>
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
                  aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer
                  Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer
                  Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
                </M>
              </section>

              <section className='space-y-4'>
                <H3>Fragen an den Datenschutzbeauftragten</H3>
                <M className='leading-relaxed'>
                  Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder
                  wenden Sie sich direkt an die für den Datenschutz verantwortliche Person in
                  unserer Organisation:
                </M>
                <div className='pl-6 space-y-1 text-sm'>
                  <p className='font-medium'>{legalContentGerman.contact.name}</p>
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
            <CardContent className='space-y-8 text-start max-w-none'>
              <section className='space-y-4'>
                <M className='leading-relaxed'>
                  The person responsible within the meaning of data protection laws, in particular
                  the EU General Data Protection Regulation (GDPR), is:
                </M>
                <div className='pl-6 space-y-1 text-sm'>
                  <p className='font-medium'>{legalContentEnglish.contact.name}</p>
                  <p>{legalContentEnglish.contact.address}</p>
                  <p>{legalContentEnglish.contact.email}</p>
                  <p>{legalContentEnglish.contact.phone}</p>
                </div>
              </section>

              <section className='space-y-4'>
                <H3>Your Data Subject Rights</H3>
                <M className='leading-relaxed'>
                  You can exercise the following rights at any time using the contact details
                  provided for our data protection officer:
                </M>
                <ul className='space-y-2 leading-relaxed text-sm lg:text-base list-disc pl-6'>
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
                <M className='leading-relaxed'>
                  If you have given us consent, you can revoke it at any time with effect for the
                  future.
                </M>
                <M className='leading-relaxed'>
                  You can contact a supervisory authority with a complaint at any time, e.g. the
                  competent supervisory authority of the federal state of your residence or the
                  authority responsible for us.
                </M>
                <M className='leading-relaxed'>
                  A list of supervisory authorities (for the non-public sector) with addresses can
                  be found{' '}
                  <a
                    href='https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline hover:no-underline'
                  >
                    here
                  </a>
                  .
                </M>
              </section>

              <section className='space-y-4'>
                <H3>Collection of General Information When Visiting Our Website</H3>
                <H5 className='mt-4'>Type and Purpose of Processing:</H5>
                <M className='leading-relaxed'>
                  When you access our website, i.e. if you do not register or otherwise submit
                  information, information of a general nature is automatically collected. This
                  information (server log files) includes the type of web browser, the operating
                  system used, the domain name of your Internet service provider, your IP address
                  and similar.
                </M>
                <M className='leading-relaxed'>
                  They are processed in particular for the following purposes:
                </M>
                <ul className='space-y-2 leading-relaxed text-sm lg:text-base list-disc pl-6'>
                  <li>Ensuring a problem-free connection to the website,</li>
                  <li>Ensuring smooth use of our website,</li>
                  <li>Evaluation of system security and stability as well as</li>
                  <li>for the optimization of our website.</li>
                </ul>
                <M className='leading-relaxed'>
                  We do not use your data to draw conclusions about your person. Information of this
                  kind may be statistically evaluated anonymously by us in order to optimize our
                  website and the technology behind it.
                </M>

                <H5 className='mt-4'>Legal Basis and Legitimate Interest:</H5>
                <M className='leading-relaxed'>
                  The processing is carried out in accordance with Art. 6 Para. 1 lit. f GDPR on the
                  basis of our legitimate interest in improving the stability and functionality of
                  our website.
                </M>

                <H5 className='mt-4'>Recipients:</H5>
                <M className='leading-relaxed'>
                  Recipients of the data may be technical service providers who act as processors
                  for the operation and maintenance of our website.
                </M>

                <H5 className='mt-4'>Third Country Transfer:</H5>
                <M className='leading-relaxed'>
                  The collected data may be transferred to the following third countries: USA
                </M>

                <H5 className='mt-4'>Storage Duration:</H5>
                <M className='leading-relaxed'>
                  The data will be deleted as soon as it is no longer required for the purpose for
                  which it was collected. This is generally the case for data used to provide the
                  website when the respective session has ended.
                </M>
                <M className='leading-relaxed'>
                  In the case of data storage in log files, this is the case after 14 days at the
                  latest. Storage beyond this period is possible. In this case, the IP addresses of
                  users are anonymized so that an assignment of the calling client is no longer
                  possible.
                </M>

                <H5 className='mt-4'>Provision Required or Mandatory:</H5>
                <M className='leading-relaxed'>
                  The provision of the aforementioned personal data is neither legally nor
                  contractually required. However, without the IP address, the service and
                  functionality of our website cannot be guaranteed. In addition, individual
                  services and services may not be available or may be restricted. For this reason,
                  an objection is excluded.
                </M>
              </section>

              <section className='space-y-4'>
                <H3>Use of Script Libraries (Google Web Fonts)</H3>
                <M className='leading-relaxed'>
                  In order to display our content correctly and graphically appealing across
                  browsers, we use &ldquo;Google Web Fonts&rdquo; from Google LLC (1600 Amphitheatre
                  Parkway, Mountain View, CA 94043, USA; hereinafter &ldquo;Google&rdquo;) to
                  display fonts on this website.
                </M>
                <M className='leading-relaxed'>
                  Further information on Google Web Fonts can be found{' '}
                  <a
                    href='https://developers.google.com/fonts/faq'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline hover:no-underline'
                  >
                    here
                  </a>{' '}
                  and in{' '}
                  <a
                    href='https://policies.google.com/privacy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline hover:no-underline'
                  >
                    Google&apos;s privacy policy
                  </a>
                  .
                </M>
              </section>

              <section className='space-y-4'>
                <H3>SSL Encryption</H3>
                <M className='leading-relaxed'>
                  To protect the security of your data during transmission, we use encryption
                  methods (e.g. SSL) via HTTPS that correspond to the current state of the art.
                </M>
              </section>

              <section className='space-y-4'>
                <H3>Information About Your Right to Object According to Art. 21 GDPR</H3>
                <H5 className='mt-4'>Individual Case-Related Right to Object</H5>
                <M className='leading-relaxed'>
                  You have the right to object at any time, on grounds relating to your particular
                  situation, to the processing of personal data concerning you which is based on
                  Art. 6(1)(f) GDPR (data processing on the basis of a balance of interests); this
                  also applies to profiling based on this provision within the meaning of Art. 4 No.
                  4 GDPR.
                </M>
                <M className='leading-relaxed'>
                  If you object, we will no longer process your personal data unless we can
                  demonstrate compelling legitimate grounds for the processing which override your
                  interests, rights and freedoms, or the processing serves the assertion, exercise
                  or defense of legal claims.
                </M>

                <H5 className='mt-4'>Recipient of an Objection</H5>
                <div className='pl-6 space-y-1 text-sm'>
                  <p className='font-medium'>{legalContentEnglish.contact.name}</p>
                  <p>{legalContentEnglish.contact.address}</p>
                  <p>{legalContentEnglish.contact.email}</p>
                  <p>{legalContentEnglish.contact.phone}</p>
                </div>
              </section>

              <section className='space-y-4'>
                <H3>Changes to Our Privacy Policy</H3>
                <M className='leading-relaxed'>
                  We reserve the right to adapt this privacy policy so that it always complies with
                  current legal requirements or to implement changes to our services in the privacy
                  policy, e.g. when introducing new services. The new privacy policy will then apply
                  to your next visit.
                </M>
              </section>

              <section className='space-y-4'>
                <H3>Questions to the Data Protection Officer</H3>
                <M className='leading-relaxed'>
                  If you have any questions about data protection, please send us an email or
                  contact the person responsible for data protection in our organization directly:
                </M>
                <div className='pl-6 space-y-1 text-sm'>
                  <p className='font-medium'>{legalContentEnglish.contact.name}</p>
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
