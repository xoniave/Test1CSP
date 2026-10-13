import MenuCard from "./MenuCard";
import styles from "../App.module.css";

export default function MenuList({
  menu,
  keyword,
  kategori,
  keranjang,
  onTambah,
}) {
  return (
    <div>
      {menu.length === 0 ? (
        <p>
          Tidak ada menu untuk kata kunci "{keyword}" pada
          kategori "{kategori}".
        </p>
      ) : (
        <div className={styles.list}>
          {menu.map((p) => {
            const sudahAda = keranjang.find(
              (k) => k.id === p.id
            );

            return (
              <MenuCard
                key={p.id}
                menu={p}
                qty={sudahAda ? sudahAda.qty : 0}
                onTambah={onTambah}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}