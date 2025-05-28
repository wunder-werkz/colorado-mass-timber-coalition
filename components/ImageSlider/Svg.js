import styles from "./style.module.scss";
export function ImageSvg() {
  return (
    <svg
      width="444"
      height="689"
      viewBox="0 0 444 689"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M439.373 211.574V685H4.50781V211.574C4.50781 155.744 45.8451 109.546 99.3232 102.589L102.083 102.23L102.706 99.5176C115.265 44.7966 163.883 4 221.992 4C280.103 4 328.717 44.7969 341.174 99.5108L341.793 102.23L344.558 102.589C398.036 109.546 439.373 155.744 439.373 211.574Z"
        stroke="#383419"
        strokeWidth="8"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export function PrevSvg() {
  return (
    <svg viewBox="0 0 67 69.5" className={styles.arrow}>
    <path className={styles.st1} d="M33.5,68.2h0C15,68.2,0,53.2,0,34.7h0C0,16.2,15,1.2,33.5,1.2h0c18.5,0,33.5,15,33.5,33.5h0c0,18.5-15,33.5-33.5,33.5Z"/>
    <path className={styles.st0} d="M16.7,34c-.4.4-.4,1,0,1.4l6.4,6.4c.4.4,1,.4,1.4,0,.4-.4.4-1,0-1.4l-5.7-5.7,5.7-5.7c.4-.4.4-1,0-1.4-.4-.4-1-.4-1.4,0l-6.4,6.4ZM49.6,34.7v-1H17.4v2h32.2v-1Z"/>
  </svg>
  );
}

export function NextSvg() {
  return (
    <svg viewBox="0 0 67 69.5" className={styles.arrow}>
      <path className={styles.st1} d="M33.5,1.2h0c18.5,0,33.5,15,33.5,33.5h0c0,18.5-15,33.5-33.5,33.5h0C15,68.2,0,53.2,0,34.7h0C0,16.2,15,1.2,33.5,1.2Z"/>
      <path className={styles.st0} d="M50.3,35.4c.4-.4.4-1,0-1.4l-6.4-6.4c-.4-.4-1-.4-1.4,0-.4.4-.4,1,0,1.4l5.7,5.7-5.7,5.7c-.4.4-.4,1,0,1.4.4.4,1,.4,1.4,0l6.4-6.4ZM17.4,34.7v1h32.2v-2H17.4v1Z"/>
    </svg>
  );
}

export function DotSvg() {
  return (
    <svg
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 0L24.1483 8.27163L33.286 5.70942L30.7284 14.8472L39 19.5L30.7284 24.1483L33.286 33.286L24.1483 30.7284L19.5 39L14.8472 30.7284L5.70942 33.286L8.27163 24.1483L0 19.5L8.27163 14.8472L5.70942 5.70942L14.8472 8.27163L19.5 0Z"
        fill="#383419"
        fillOpacity="0.5"
      />
    </svg>
  );
}
