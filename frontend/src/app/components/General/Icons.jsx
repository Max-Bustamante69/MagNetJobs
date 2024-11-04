import { useState } from "react";

function Icons({ IconName }) {
    const [selectedIcon, setSelectedIcon] = useState(false);

    const handleSelectedIcon = (iconState) => {
        setSelectedIcon(iconState);
      };
      
    return (
        <IconName  onMouseEnter={() => handleSelectedIcon(true)} 
        onMouseLeave={() => handleSelectedIcon(false)}  size={"35px"} color={selectedIcon? "#0cb325" : "#414141"} />
    );
  }
  
  export default Icons;