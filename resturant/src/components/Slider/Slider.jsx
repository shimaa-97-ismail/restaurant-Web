import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useTranslation } from "../../hooks/useTranslation";
export function Slider() {
  const [index, setIndex] = useState(0);
const {t}=useTranslation();
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "730px", objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1920&q=80"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>{t("healthyBreakfast")}</h3>
          <p>{t("healthyBreakfastDesc")}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "730px", objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>{t("perfectMorningStack")}</h3>
          <p>{t("perfectMorningStackDesc")}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "730px", objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1920&q=80"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>{t("freshBeginnings")} </h3>
          <p>{t("freshBeginningsDesc")}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
