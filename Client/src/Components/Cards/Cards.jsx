import React from "react";
import styles from "../Cards/Cards.module.css";
import Card from "../Card/Card";

export default function Cards() {
  return (
    <article className={styles.cardContainer}>
      <Card />
    </article>
  );
}
