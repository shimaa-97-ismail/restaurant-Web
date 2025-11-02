import { MyCard } from "../components/Card/Card";
import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

export default function SharedCardMenu({ cbfun, handleOrder }) {
  const{language} =useTranslation();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    allMenu();
  }, []);
  const allMenu = async () => {
    try {
      const res = await cbfun();
      setMenu(res.data || []);
    } catch (err) {
      console.log(err);
      setMenu([]);
      throw new Error("Failed to fetch menu items");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading menu...</div>;
  return (
    <section class="d-flex flex-wrap justify-content-center gap-5 m-5 " style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
      {menu.map((item) => {
        return (
          <MyCard
            key={item._id}
            item={item}
            onShow={() => handleOrder(item)}

            // onDelete={handleDeleteItem}
            // onUpdate={editItem}
          />
        );
      })}
    </section>
  );
}
