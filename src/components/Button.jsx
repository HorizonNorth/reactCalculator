import React from 'react';

export default function Button(props) {
  return (
    <>
    <button {...props}>{props.name}</button>
    </>
  )
}
// className={prop.className}