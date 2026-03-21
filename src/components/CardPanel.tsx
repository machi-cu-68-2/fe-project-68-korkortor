import Card from "./Card";
import { Coop } from "@/libs/getCoops";
import styles from "./CardPanel.module.css";

interface CardPanelProps {
  coops: Coop[];
}

export default function CardPanel({ coops }: CardPanelProps) {
  return (
    <div className={styles.grid}>
      {coops.map((coop) => (
        <Card key={coop.id} coop={coop} />
      ))}
    </div>
  );
}
