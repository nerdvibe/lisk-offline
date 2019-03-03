import React from "react";
import AnimateOnChange from "react-animate-on-change";

export default function Byte(props: any) {
  return (
    <AnimateOnChange
      animate={props.diff}
      baseClassName="stable"
      animationClassName="bouncing"
      >
      <span className="byte">
        {props.value}
      </span>
    </AnimateOnChange>
  );
}
