import React from "react";
import styles from "../Cards/Cards.module.css";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

export default function Cards() {
  return (
    <article>
      <label for="cars">Filter:</label>
      <select name="filter"></select>
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
