import { date } from "yup";

interface Props {
    day: string;
    date: number;
    month: number;
    year: number;
    today: boolean;
    handlerSelect: (d: number, m: number, y: number) => void;
    selected: boolean;
  }
  const Day: React.FC<Props> = ({
    day,
    date,
    month,
    year,
    today,
    handlerSelect,
    selected
  }) => {
    return (
      <div
        className={today ? "day today" : "day"}
        onClick={() => handlerSelect(date, month, year)}
      >
        <span>{day}</span>
        <span className={selected ? "selected" : ""}>{date}</span>
      </div>
    );
    
  };
  
  export default Day;
  