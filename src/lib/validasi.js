export const Data_Awal = {
  nama: "",
  kategori: "",
  harga: "",
  stok: "",
};

export const URUTAN_FIELD = ["nama", "kategori", "harga", "stok"];

export function validasiForm(form, kategoriMenu) {
  const err = {};

  if (form.nama.trim().length < 3) {
    err.nama = "Nama minimal 3 karakter.";
  }

  if (!kategoriMenu.includes(form.kategori)) {
    err.kategori = "Kategori wajib dipilih.";
  }

  const harga = Number(form.harga);

  if (form.harga === "") {
    err.harga = "Harga wajib diisi.";
  } else if (!Number.isFinite(harga) || harga <= 0) {
    err.harga = "Harga harus lebih dari 0.";
  }

  const stok = Number(form.stok);

  if (form.stok === "") {
    err.stok = "Stok wajib diisi.";
  } else if (!Number.isInteger(stok)) {
    err.stok = "Stok harus berupa bilangan bulat.";
  } else if (stok < 0) {
    err.stok = "Stok tidak boleh negatif.";
  }

  return err;
}