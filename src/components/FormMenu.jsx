import { useState, useRef } from "react";
import {
  Data_Awal,
  validasiForm,
  URUTAN_FIELD,
} from "../lib/validasi";
import styles from "../App.module.css";

export default function FormMenu({ kategoriMenu, onSave }) {
  const [form, setForm] = useState(Data_Awal);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validasiForm(form, kategoriMenu);
    setErrors(err);

    if (Object.keys(err).length > 0) {
      const pertama = URUTAN_FIELD.find((k) => err[k]);
      const el = formRef.current.elements[pertama];

      el?.focus();
      return;
    }

    onSave(form);
    setForm(Data_Awal);
    setErrors({});
  };

  return (
    <section className={styles.panel}>
      <h2>Tambah Menu</h2>

      <form
        ref={formRef}
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label htmlFor="nama">Nama Menu</label>

          <input
            id="nama"
            name="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            aria-invalid={!!errors.nama}
            aria-describedby={
              errors.nama ? "error-nama" : undefined
            }
          />

          {errors.nama && (
            <small id="error-nama" role="alert">
              {errors.nama}
            </small>
          )}
        </div>

        <div>
          <label htmlFor="kategori">Kategori</label>

          <select
            id="kategori"
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            aria-invalid={!!errors.kategori}
            aria-describedby={
              errors.kategori ? "error-kategori" : undefined
            }
          >
            <option value="">-- Pilih Kategori --</option>

            {kategoriMenu.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {errors.kategori && (
            <small id="error-kategori" role="alert">
              {errors.kategori}
            </small>
          )}
        </div>

        <div>
          <label htmlFor="harga">Harga</label>

          <input
            id="harga"
            name="harga"
            type="number"
            min="0"
            step="any"
            value={form.harga}
            onChange={handleChange}
            aria-invalid={!!errors.harga}
            aria-describedby={
              errors.harga ? "error-harga" : undefined
            }
          />

          {errors.harga && (
            <small id="error-harga" role="alert">
              {errors.harga}
            </small>
          )}
        </div>

        <div>
          <label htmlFor="stok">Stok</label>

          <input
            id="stok"
            name="stok"
            type="number"
            min="0"
            step="1"
            value={form.stok}
            onChange={handleChange}
            aria-invalid={!!errors.stok}
            aria-describedby={
              errors.stok ? "error-stok" : undefined
            }
          />

          {errors.stok && (
            <small id="error-stok" role="alert">
              {errors.stok}
            </small>
          )}
        </div>

        <div className={styles.row}>
          <button type="submit">Simpan Menu</button>

          <button
            type="button"
            onClick={() => {
              setForm(Data_Awal);
              setErrors({});
            }}
          >
            Kosongkan
          </button>
        </div>
      </form>
    </section>
  );
}