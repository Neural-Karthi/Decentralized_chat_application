import React from "react";
export function Message(props) {
  const options = {
    hour: 'numeric',
    minute: 'numeric'
  };
  
  const formattedTime = new Date(props.timeStamp).toLocaleTimeString([], options);
  const option = {
    day: 'numeric',
    month: 'short'
  };
  
  const formattedDate = new Date(props.timeStamp).toLocaleDateString([], option);  
  
  return (
    <>
     <div className="card_outer_">
        <div className="main_card_design"  style={{  margin: "0 0 1px " + props.marginLeft}}>
              <p className="data">{props.data}</p>
              <span>{formattedDate+" "+formattedTime}</span>
        </div>
     </div>
    </>
  );
}