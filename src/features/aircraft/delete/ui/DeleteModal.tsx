import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

export function DeleteModal({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px) hue-rotate(90deg)" />
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this aircraft?</ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onDelete}>
            Yes
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
