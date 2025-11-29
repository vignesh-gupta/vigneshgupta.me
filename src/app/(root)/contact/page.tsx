import { Metadata } from "next";

import ContactSection from "@/components/pages/contact/contact-section";
import PageContainer from "@/components/common/page-container";
import PageHeader from "@/components/common/page-header";
import { socials } from "@/lib/constants";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  preTitle: "Contact | ",
  image: "/open-graph/contact.jpg",
});

const ContactPage = () => {
  return (
    <>
      <PageHeader
        title="Get in touch"
        subtitle="Let’s build something awesome together!"
      />
      <PageContainer>
        <ContactSection />

        <section className="flex flex-wrap items-center justify-center gap-4 my-5 text-dark-gray ">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 transition duration-300 rounded-lg text-onyx dark:text-muted hover:text-primary dark:hover:text-primary hover:bg-muted/20"
            >
              <social.icon className="size-6" />
            </a>
          ))}
        </section>
      </PageContainer>
    </>
  );
};

export default ContactPage;
