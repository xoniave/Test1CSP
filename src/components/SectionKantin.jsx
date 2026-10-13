import { useState, useEffect } from "react";
import { semuaMenu } from "../data/menu";
import FilterBar from "./FilterBar";
import MenuList from "./MenuList";
import Keranjang from "./Keranjang";
import TimerSesi from "./TimerSesi";
import FormMenu from "./FormMenu";
import styles from "../App.module.css";

const STORAGE_KEY = "kantinkita-keranjang";

const bacaKeranjang = () => {
  try {
    const data = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    if (!Array.isArray(data)) {
      return [];
    }

    return data.filter(
      (p) =>
        p &&
        Number.isInteger(p.id) &&
        typeof p.nama === "string" &&
        Number.isFinite(p.harga) &&
        p.harga > 0 &&
        Number.isInteger(p.stok) &&
        p.stok > 0 &&
        Number.isInteger(p.qty) &&
        p.qty > 0 &&
        p.qty <= p.stok
    );
  } catch {
    return [];
  }
};

export default function SectionKantin() {
  const [menu, setMenu] = useState(semuaMenu);
  const [keyword, setKeyword] = useState("");
  const [kategori, setKategori] = useState("semua");
  const [keranjang, setKeranjang] = useState(bacaKeranjang);
  const [tampilTimer, setTampilTimer] = useState(true);
  const [notifikasi, setNotifikasi] = useState("");


  const kategoriMenu = [...new Set(menu.map((p) => p.kategori))];

  const menuTampil = menu.filter((p) => {
    const namaCocok = p.nama
      .toLowerCase()
      .includes(keyword.trim().toLowerCase());

    const kategoriCocok =
      kategori === "semua" || p.kategori === kategori;

    return namaCocok && kategoriCocok;
  });

  // Jumlah dan total dihitung dari keranjang.
  const jumlahItem = keranjang.reduce(
    (total, p) => total + p.qty,
    0
  );

  const totalHarga = keranjang.reduce(
    (total, p) => total + p.harga * p.qty,
    0
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(keranjang)
      );
    } catch {

    }
  }, [keranjang]);

  useEffect(() => {
    document.title =
      jumlahItem === 0
        ? "KantinKita"
        : `(${jumlahItem}) KantinKita`;
  }, [jumlahItem]);

  const tambahKeranjang = (data) => {
    if (data.stok === 0) {
      return;
    }

    setKeranjang((prev) => {
      const sudahAda = prev.find((p) => p.id === data.id);

      if (sudahAda) {
        return prev.map((p) =>
          p.id === data.id
            ? {
                ...p,
                qty: Math.min(p.qty + 1, p.stok),
              }
            : p
        );
      }

      return [...prev, { ...data, qty: 1 }];
    });
  };

  const ubahQty = (id, perubahan) => {
    setKeranjang((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? {
                ...p,
                qty: Math.min(p.qty + perubahan, p.stok),
              }
            : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const deleteItem = (id) => {
    setKeranjang((prev) => prev.filter((p) => p.id !== id));
  };

  const saveMenu = (form) => {
    const baru = {
      nama: form.nama.trim(),
      kategori: form.kategori,
      harga: Number(form.harga),
      stok: Number(form.stok),
    };

    setMenu((prev) => {
      const idBaru =
        Math.max(
          0,
          ...prev.map((p) => p.id),
          ...keranjang.map((p) => p.id)
        ) + 1;

      return [...prev, { ...baru, id: idBaru }];
    });

    setNotifikasi(`${baru.nama} berhasil ditambahkan.`);
  };

  return (
    <main>
      <header className={styles.header}>
        <div className={styles.judul}>
          <h1>KantinKita</h1>
          <p>Pemesanan kantin kampus</p>
        </div>

        <div className={styles.sesi}>
          {tampilTimer && <TimerSesi />}

          <button
            type="button"
            onClick={() => setTampilTimer((prev) => !prev)}
          >
            {tampilTimer ? "Sembunyikan Timer" : "Tampilkan Timer"}
          </button>
        </div>
      </header>

      <section>
        <h2>Daftar Menu</h2>

        <FilterBar
          keyword={keyword}
          kategori={kategori}
          kategoriMenu={kategoriMenu}
          menu={menu}
          onKeyword={setKeyword}
          onKategori={setKategori}
        />

        <MenuList
          menu={menuTampil}
          keyword={keyword}
          kategori={kategori}
          keranjang={keranjang}
          onTambah={tambahKeranjang}
        />
      </section>

      <Keranjang
        keranjang={keranjang}
        jumlahItem={jumlahItem}
        totalHarga={totalHarga}
        onUbahQty={ubahQty}
        onDelete={deleteItem}
      />

      {notifikasi !== "" && (
        <p role="status" className={styles.notifikasi}>
          {notifikasi}
        </p>
      )}

      <FormMenu
        kategoriMenu={kategoriMenu}
        onSave={saveMenu}
      />
    </main>
  );
}