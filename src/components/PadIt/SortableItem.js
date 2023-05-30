import React, { forwardRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item from "./Item";

const SortableItem = forwardRef((props, ref) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const originalHeight = "auto";
  const draggingHeight = "100px";

  const style = {
    transform: CSS.Transform.toString(transform), // 여기가 중요함. 드래그해서 움직일 때, 실제 아이템들의 순서는 바뀌지 않지만, 그런 것처럼 보이도록 움직여주는 부분!!!
    transition: transition || undefined,
    backgroundColor: props.color,
    height: isDragging ? draggingHeight : originalHeight,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
});

export default SortableItem;
