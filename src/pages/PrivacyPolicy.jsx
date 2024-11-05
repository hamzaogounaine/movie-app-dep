
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/authContext/authContext";

export default function PrivacyPolicy() {
    const { mode } = useAuth();
  return (
    <div>

    <div className={`  ${mode}`}>
      <Card className="w-full rounded-none  mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <CardDescription>Last updated: November 05, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
                <p>
                  Film Guild ("we", "us", or "our") operates the website https://movie-appp-tmdb.netlify.app/ (hereinafter referred to as the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Information Collection and Use</h2>
                <p>
                  We collect several different types of information for various purposes to provide and improve our Service to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Types of Data Collected</h2>
                <h3 className="text-xl font-medium mb-1">Personal Data</h3>
                <p>
                  While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Use of Data</h2>
                <p>
                  Film Guild uses the collected data for various purposes:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>To provide and maintain our Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information so that we can improve our Service</li>
                  <li>To monitor the usage of our Service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Transfer of Data</h2>
                <p>
                  Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
                </p>
                <p className="mt-2">
                  If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.
                </p>
                <p className="mt-2">
                  Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Security of Data</h2>
                <p>
                  The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
                <p>
                  Film Guild aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
                </p>
                <p className="mt-2">
                  If you wish to be informed about what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
                <p className="mt-2">
                  We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.
                </p>
                <p className="mt-2">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>
                    By visiting this page on our website: {' '}
                    <Link to="/contact" className="text-primary hover:underline">
                      https://movie-appp-tmdb.netlify.app/contact
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}