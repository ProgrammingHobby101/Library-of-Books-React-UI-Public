import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
//redux
import { setShowBasicModal, setBookItemUsingModal, setBookViewUsingModal } from '../librarySlice';
import { useSelector, useDispatch } from 'react-redux';

var style = {}
export default function BasicModal(props) {
  const navigate = useNavigate();
  // Redux state and mutator
  const library = useSelector(state => state.library);
  const dispatch = useDispatch();
  //Modal style
  style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: library.BasicModalTitle === 'Error' ? "#ffcdd2" /*pink*/ : "#b9f6ca"/*green*/ ,
    border: '2px solid #000',
    borderradius: '25px',
    boxShadow: 24,
    p: 4,
    color: library.BasicModalTitle === 'Error' ? 'red' : 'green' ,//success/fail message 
    //opacity: '0.1',
  };
  
  function OnModalClose(){
    if(library.BookItemUsingModal === true){//for the delete action on BookItem page
      dispatch(setBookItemUsingModal(false)); //reset for next component to reuse modal
      dispatch(setShowBasicModal(false)) // close model
      window.location.reload();       
    }
    else if(library.BookViewUsingModal === true) {//for the delete action on BookView 
        dispatch(setBookViewUsingModal(false)); //reset for next component to reuse modal
        dispatch(setShowBasicModal(false)) // close model
        console.log("Navigating To BookLIst.");
        navigate("/");
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
        open={library.ShowBasicModal}//library.ShowBasicModal
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