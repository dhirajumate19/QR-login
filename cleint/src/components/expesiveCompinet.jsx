import { useMemo } from "react";

// eslint-disable-next-line react/prop-types
const ExpesiveComp = ({ num }) => {
  const computedvalue = useMemo(() => {
    return num * 2;
  }, [num]);

  return <div>computed vlaue:{computedvalue}</div>;
};

export default ExpesiveComp;
