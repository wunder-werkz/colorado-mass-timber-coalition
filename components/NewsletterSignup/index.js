import * as styles from "./style.module.scss";
import TextLink from "../TextLink";

const NewsletterSignup = ({headline, copy,emailLink}) => {

  return (
    <div className={`${styles.wrap}`}>
      {headline && <h3>{headline}</h3>}
      {copy && <p>{copy}</p>}
      <div>
        {emailLink &&
          <TextLink link={emailLink[0]} button={true}/>  
        }
      </div>
    </div>
  );
};

export default NewsletterSignup;
