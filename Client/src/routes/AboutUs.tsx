import React from "react";
import Banner from "../components/Banner";

export default function AboutUs() {
  return (
    <>
      <Banner title="ABOUT THIS PLATFORM" description="" />
      <div className="about-smidge">
        <div className="about-smidge-intro">
          <span>
            Within the framework of Working Package 3 of the{" "}
            <strong>SMIDGE</strong> project, which focuses on horizon scanning
            and mapping of current discourses, one of the tasks led by the KCSS
            involves the development of a database containing the main
            characteristics of existing videos that promote extremist narratives
            online.{" "}
          </span>
        </div>

        <div className="about-regular-text">
          The purpose of this platform is to provide data for researchers and
          policymakers, supporting evidence- based public policies to address
          extremism, as well as analysis that offers a deeper understanding of
          online extremist narratives and effective countermeasures.{" "}
        </div>
        <div className="about-regular-text">
          This platform specifically focuses on key social media platforms such
          as YouTube, Facebook, Instagram, TikTok, and Twitter. The database
          primarily encompasses videos promoting extremist narratives related to
          the Far-Right, Religion, Anti-Vax, and Conspiracy theories. For the
          purposes of this platform, the key concepts are defined as follows:{" "}
        </div>
        <div className="about-regular-text">
          Far-right videos, are understood as videos that: promote or advocate
          for racial or ethnic superiority; Anti-Semitism videos, promoting hate
          against Jews and perpetuating anti-Semitic stereotypes; promoting or
          advocating for white supremacy; nationalistic or xenophobic rhetoric
          by rejecting or attacking multiculturalism and multiethnicity;
          Promoting authoritarianism, anti-democratic views and attacking
          progressive social change; Attacking the EU as a project and the
          values it promotes; including anti-EU views; videos that promote fear
          and hatred against migrants; videos that promote strongman leaders and
          seek to suppress opposition and media freedom;{" "}
        </div>
        <div className="about-regular-text">
          Conspiracy theories and misinformation videos that promote extremist
          narratives by distorting basic and widely acceptable facts,
          manipulating information to promote fear, hatred, or in general
          hostility towards particular groups or institutions; videos that
          promote QAnon; videos that distort basic facts to reject vaccination
          or encourage other to reject vaccines;
        </div>
        <div className="about-regular-text">
          Militant and violent narratives, will include videos that promote,
          incite or glorify violence against individuals or groups based on
          their ethnic identity/race, religion, or political beliefs;{" "}
        </div>
        <div className="about-regular-text">
          Religious extremist narratives, will include videos that propagate,
          incite, embrace, glorify or justify violence on the grounds of
          religion or for promoting religious doctrine; videos that promote
          intolerance, hate or violence against other religious groups; videos
          that promote or glorify particular religious extremist groups such as:
          ISIS, Al-Qaeda, or other groups deemed as terrorist groups by the EU;
          videos that reject secularism or advocate against secularism; videos
          that incite violence, discrimination and hatred against abortion
          rights; videos that incite violence, discrimination and hatred against
          the LGBTQ+ community;{" "}
        </div>
      </div>
    </>
  );
}
