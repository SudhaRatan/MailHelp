import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import colors from "tailwindcss/colors";
import { useMailStore } from "../Stores/mailStore";

interface CategoryItemType {
  id: number;
  label: string;
  count: number;
  onEditPress: (label: string, id: number) => void;
  onDeletePress: (id: number) => void;
  category: string;
  setCategory: (category: string) => void;
  click: () => void
  showDashboard: boolean
}

export const CategoryItem = ({
  label,
  count,
  onEditPress,
  onDeletePress,
  id,
  category,
  setCategory,
  click,
  showDashboard
}: CategoryItemType) => {
  const [hover, setHover] = useState(false);
  const setSelectedMail = useMailStore(i => i.setSelectedMail)

  return (
    <div
      className={`flex justify-between p-2 items-center mx-4 ${
        category == label && !showDashboard ? "btn text-purple-800" : "btn btn-ghost"
      } rounded-md `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        setCategory(label);
        setSelectedMail(null)
        click()
      }}
    >
      <div className="flex gap-2 items-center text-lg">
        <div className={`${category == label ? 'font-semibold' : 'font-normal'}`}>{label}</div>
      </div>
      {hover ? (
        <div className="flex gap-2">
          <div
            className="btn btn-square btn-xs bg-white"
            onClick={() => onEditPress(label, id)}
          >
            <MdEdit color={colors.green[500]} />
          </div>
          <div
            className="btn btn-square btn-xs bg-white"
            onClick={() => onDeletePress(id)}
          >
            <MdDelete color={colors.rose[600]} />
          </div>
        </div>
      ) : (
        <div className={`font-normal opacity-75 bg-transparent ${category == label ? 'font-semibold' : 'font-normal'}`}>{count}</div>
      )}
    </div>
  );
};
