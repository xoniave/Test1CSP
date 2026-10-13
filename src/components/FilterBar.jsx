import { useRef } from "react";
import styles from "../App.module.css";

export default function FilterBar({
  keyword,
  kategori,
  kategoriMenu,
  menu,
  onKeyword,
  onKategori,
}) {
  const inputRef = useRef(null);

  const bersihkan = () => {
    onKeyword("");
    inputRef.current.focus();
  };

  return (
    <div>
      <label htmlFor="pencarian">Cari menu</label>

      <div className={styles.row}>
        <input
          ref={inputRef}
          id="pencarian"
          name="pencarian"
          type="text"
          value={keyword}
          onChange={(e) => onKeyword(e.target.value)}
          placeholder="Masukkan nama menu"
        />

        <button type="button" onClick={bersihkan}>
          Bersihkan
        </button>
      </div>

      <div
        className={styles.row}
        role="group"
        aria-label="Filter kategori"
      >
        <button
          type="button"
          className={kategori === "semua" ? styles.active : ""}
          aria-pressed={kategori === "semua"}
          onClick={() => onKategori("semua")}
        >
          Semua ({menu.length})
        </button>

        {kategoriMenu.map((p) => (
          <button
            key={p}
            type="button"
            className={kategori === p ? styles.active : ""}
            aria-pressed={kategori === p}
            onClick={() => onKategori(p)}
          >
            {p} ({menu.filter((m) => m.kategori === p).length})
          </button>
        ))}
      </div>
    </div>
  );
}