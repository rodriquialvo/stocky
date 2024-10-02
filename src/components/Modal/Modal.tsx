import React, {FC, PropsWithChildren} from 'react';
import styles from './Modal.module.css';
import {ModalProps} from './interfaces';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  useToast,
  Modal as ChackraUIModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
  title,
  onSubmit
}) => {
  return (
    <ChackraUIModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onSubmit}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChackraUIModal>
  );
};

export default Modal;
