import Offcanvas from 'react-bootstrap/Offcanvas';

export function Offcanvs({show,handleClose,placement="end",title,children}) {


  return (
    <>
    
      <Offcanvas show={show} onHide={handleClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         {children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

  