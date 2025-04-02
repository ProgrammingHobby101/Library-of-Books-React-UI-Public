import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//redux
import { setShowBasicModal, setBookItemUsingModal } from '../librarySlice';
import { useSelector, useDispatch } from 'react-redux';

var style = {}
export default function BasicModal(props) {
  // Redux state and mutator
  const library = useSelector(state => state.library);
  const dispatch = useDispatch();
  style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: library.BasicModalTitle === 'Error' ? 'red' : 'green' ,//success/fail message 
  };
  
  function OnModalClose(){
    if(library.BookItemUsingModal === true){
      dispatch(setBookItemUsingModal(false)); //reset for next component to reuse modal
      dispatch(setShowBasicModal(false)) // close model
      window.location.reload();       
    }
     else {
       // library.BookCreateUsingModal == true
       // dispatch(setBookCreateUsingModal(false)); //reset for next component to reuse modal
       dispatch(setShowBasicModal(false)) //close modal
     }
  }
  return (
    <div>
      <Modal
        open={library.ShowBasicModal}
        onClose={() => dispatch(setShowBasicModal(true))}//keep modal open
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {library.BasicModalTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {library.BasicModalDescription}
          </Typography>
          <Button variant="contained" size="medium" style={{float: "right"}} onClick={()=> OnModalClose()}>OK</Button>
        </Box>
      </Modal>
    </div>
  );
}