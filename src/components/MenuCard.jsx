import Badge from "./Badge";
import { rupiah } from "../lib/format";
import styles from "../App.module.css";

export default function MenuCard({ menu, qty, onTambah }) {
  const habis = menu.stok === 0;
  const batasStok = qty >= menu.stok;

  return (
    <article
      className={`${styles.card} ${habis ? styles.habis : ""}`}
    >
      <h3>{menu.nama}</h3>

      <Badge>{habis ? "Habis" : menu.kategori}</Badge>

      <p className={styles.harga}>{rupiah(menu.harga)}</p>
      <p>Stok: {menu.stok}</p>

      <button
        type="button"
        disabled={habis || batasStok}
        onClick={() => onTambah(menu)}
      >
        {!habis && batasStok ? "Batas stok" : "Tambah"}
      </button>
    </article>
  );
}