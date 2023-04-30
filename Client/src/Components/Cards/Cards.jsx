import React from "react";
import styles from "../Cards/Cards.module.css";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

export default function Cards() {
  return (
    <article>
      <div className={styles.filterContainters}>
        <div>
          <label for="card">FILTER: </label>
          <select name="filter"></select>
        </div>

        <div>
          <label for="card">ORDER: </label>
          <select name="order"></select>
        </div>
      </div>

      <div className={styles.cardContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Pagination></Pagination>
    </article>
  );
}
