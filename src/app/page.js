import Image from "next/image";
import RoadSignHunt from "./Huntyouknowlevel1/page";
import styles from "./page.module.css";

export default function Home() {
  useEffect(() => {
    const disableInspect = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        alert("Inspect is disabled.");
      }
    };
  
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', disableInspect);
  
    return () => {
      document.removeEventListener('contextmenu', (e) => e.preventDefault());
      document.removeEventListener('keydown', disableInspect);
    };
  }, []);
  return (
    <div className={styles.page}>
      {/* <RoadSignHunt /> */}
    </div>
  );
}
