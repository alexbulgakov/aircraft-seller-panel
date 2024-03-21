import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'

import { AddAndEditModal } from '../addAndEdit'

import { ActionButtons } from '@/entities/aircraft'

export function Actions() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ActionButtons onOpenDelete={onOpen} onOpenEdit={onOpen} />
      <AddAndEditModal isOpen={isOpen} onClose={onClose} type="edit" />
      {/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this aircraft?</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Yes
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  )
}
