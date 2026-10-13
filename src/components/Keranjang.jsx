import { useState } from "react";
import { rupiah } from "../lib/format";
import styles from "../App.module.css";

export default function Keranjang({
  keranjang,
  jumlahItem,
  totalHarga,
  onUbahQty,
  onDelete,
}) {
  const [konfirmasiId, setKonfirmasiId] = useState(null);

  return (
    <section className={styles.panel}>
      <h2>Keranjang Pesanan</h2>

      {keranjang.length === 0 ? (
        <p>Keranjang masih kosong.</p>
      ) : (
        <ul className={styles.cart}>
          {keranjang.map((p) => (
            <li key={p.id}>
              <p>
                <strong>{p.nama}</strong>
              </p>

              <p>
                {rupiah(p.harga)} × {p.qty}
                {" = "}
                {rupiah(p.harga * p.qty)}
              </p>

              <div className={styles.row}>
                <button
                  type="button"
                  aria-label={`Kurangi ${p.nama}`}
                  onClick={() => onUbahQty(p.id, -1)}
                >
                  −
                </button>

                <span>{p.qty}</span>

                <button
                  type="button"
                  aria-label={`Tambah ${p.nama}`}
                  disabled={p.qty >= p.stok}
                  onClick={() => onUbahQty(p.id, 1)}
                >
                  +
                </button>

                {konfirmasiId === p.id ? (
                  <>
                    <span>Hapus menu ini?</span>

                    <button
                      type="button"
                      onClick={() => {
                        onDelete(p.id);
                        setKonfirmasiId(null);
                      }}
                    >
                      Ya
                    </button>

                    <button
                      type="button"
                      onClick={() => setKonfirmasiId(null)}
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setKonfirmasiId(p.id)}
                  >
                    Hapus
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.ringkasan}>
        <p>Jumlah item: {jumlahItem}</p>
        <p>
          <strong>Total: {rupiah(totalHarga)}</strong>
        </p>
      </div>
    </section>
  );
}