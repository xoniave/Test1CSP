
--------A1

hoook gk boleh dipanggil saat kondisi soalnya berdasarkan ururtan call nya bia berubah2 setiap render nya. state di react dicocokan berdasarkan urutan call hook bukan nama variabel nya. jadi manggil useState plg atas komponen sebelum kondisi

function Profil({ sudahLogin }) {
  const [nama, setNama] = useState("");

  if (!sudahLogin) {
    return <p>Silakan login.</p>;
  }

  return (
    <>
    </>
  );
}


---------------A2

push itu tugas nya ngubah array yg sebelumnya/ yg lama jadi setItem punya referensi sama
react itu membandingkan state pakai object dan bisa ngelewati render saat ref tdk berubah
bikin array baru pakau spread dan fungsi update


const tambah = (baru) => {
  setItems((prev) => [...prev, baru]);
};


------------A3

A. effect jalan setelah setiap render yang selesai dicommit
B. effect jalan pas komponen dipasang
C. effect jalan pas komponen udh dipasang dan saat variabel kota berubah

Sebelum effect dijalankan lagi pas kota berubah dari sby jadi jakarta , cleanup membersihkan effect untuk sby sebelum menjalankan effect jakarta.

Saat component dilepas pas tombol sembunyikan timer dipencet cleanup jalan memberishkan clear interval supaya timer yang sudah dilepas tidak jalan terus.

--------A4
state untuk keyword nya di simpen di induk yg plg deket dan menaungi filter bar dan daftar menu jadi keduanya pakai satu sumber data.
induk kirim keyword dan callback pakai props
state di naikan ke induk, kalau filter bar panggil callback pakai nilai input untuk pembaruan state

----- A5
controlled component itu input tapi nilainya di kendalikan statenya react untuk value /checked dan akan di perbarui pakai on change

satu handlechange bisa menangani banyak input soalnya setiap input ada attribute name sesuai dgn key dari object state

Fungsi baca nama dan value dari event.target terus pakai name untuk cari mana yg diperbarui

spread berguna untuk mempertahanini field lain tanpa mengubah objek state lama