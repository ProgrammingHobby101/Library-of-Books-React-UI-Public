import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//redux
import { setShowBookCreateModal } from '../librarySlice';
import { useSelector, useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const open = true;
  // const [open, setOpen] = React.useState(props.show);//default is false
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // redux state
  const library = useSelector(state => state.library);
  const dispatch = useDispatch();
  
  return (
    <div>
      <Modal
        open={library.ShowBookCreateModal}
        // open={open}
        onClose={() => dispatch(setShowBookCreateModal(false)) }
        // onClose={() => open = false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {library.BookCreateModalTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {library.BookCreateModalDescription}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}