// EditField.tsx
import React, { useState, useEffect, useRef } from "react";


interface EditFieldProps {
  data: string | number;
}

const EditableField: React.FC<EditFieldProps> = ({ data }) => {
  return (
    <div>
        <span className={`${
          typeof data === 'string' && data.length === 0
            ? 'pr-[200px] border-b-2 border-red-500' 
            : 'pr-10'}`}>{data}
        </span>
    </div>
  );
};

export default EditableField;
