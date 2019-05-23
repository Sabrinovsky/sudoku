import React from 'react'
import {Popover,OverlayTrigger,Button} from 'react-bootstrap'
const numbers = [1,2,3,4,5,6,7,8,9]

const popover = (
    <Popover id="popover-basic" style={{backgroundColor:'#fff'}}>
        1 2 3
        4 5 6
        7 8 9
    </Popover>
  );
  
  const Selector = ({value}) => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button  variant="">{value} </Button>
    </OverlayTrigger>
  );
  
export default Selector

