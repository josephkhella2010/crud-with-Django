import { createUseStyles } from "react-jss";
import TodoInput from "./childComponent/TodoInput";
import UpdateItemSection from "./childComponent/UpdateItemSection";
import { useState } from "react";

export const cssStyle = createUseStyles({
  todoWrapper: {
    width: "100%",
    minHeight: "100dvh",
  },
});

export default function TodoPage() {
  const classes = cssStyle();
  const [itemId, setItemId] = useState<number | null>(null);
  const [showEditSection, setShowEditSection] = useState<boolean>(false);

  console.log("itemId", itemId);
  /*  */
  const handleEdit = (id: number) => {
    setItemId(id);
    setShowEditSection(true);
  };

  /*  */
  return (
    <div className={classes.todoWrapper}>
      <TodoInput handleEdit={handleEdit} />
      {showEditSection && (
        <UpdateItemSection
          itemId={itemId}
          setShowEditSection={setShowEditSection}
          showEditSection={showEditSection}
        />
      )}
    </div>
  );
}
