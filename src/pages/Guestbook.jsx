import { PROFILE } from "../data.js";
import { Heading, Icon, ExtLink } from "../components/bits.jsx";
import Giscus from "../components/Giscus.jsx";

export default function Guestbook() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Community</p>
        <Heading d={0.1} as="h1">Guestbook</Heading>
        <p className="story-intro a-rise" style={{ "--d": ".2s" }} data-reveal>
          Say hi, leave feedback on a project or tell me what you're building. Sign in with GitHub to post. Messages are stored in this site's GitHub Discussions, so there are no ads and no tracking.
        </p>
      </div>
      <div className="article" data-reveal>
        <Giscus term="guestbook" />
        <p className="contrib-note a-rise">
          <Icon name="git-pull-request" />Want to help with the site itself? Read the{" "}
          <ExtLink href={`https://github.com/${PROFILE.repo}/blob/main/CONTRIBUTING.md`}>contributing guide</ExtLink> or{" "}
          <ExtLink href={`https://github.com/${PROFILE.repo}/issues/new/choose`}>open an issue</ExtLink>.
        </p>
      </div>
    </>
  );
}
