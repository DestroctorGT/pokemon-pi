import React from "react";
import styles from "../Pagination/Pagination.module.css";

export default function Pagination() {
  return (
    <div className={styles.paginationContainer}>
      <button>
        <span class="material-symbols-outlined">arrow_back_ios_new</span>
      </button>
      <span>Page 1 - 12</span>
      <button>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
      </button>
    </div>
  );
}
