import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'

import { AircraftType } from '@/entities/aircraft'
import { formatToUSDCurrency } from '@/shared/lib'

export function AircraftInfo({ aircraft }: { aircraft: AircraftType }) {
  const { name, supplierEmail, count, price, delivery } = aircraft
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button textDecoration="underline" onClick={onOpen} colorScheme="blue" variant="link">
        {name}
      </Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>Info about {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="unstyled">
                <Tbody>
                  <Tr>
                    <Th>Name:</Th>
                    <Th>{name}</Th>
                  </Tr>
                  <Tr>
                    <Th>Supplier email:</Th>
                    <Th>{supplierEmail ? supplierEmail : '-'}</Th>
                  </Tr>
                  <Tr>
                    <Th>Count:</Th>
                    <Th>{count ? count : '-'}</Th>
                  </Tr>
                  <Tr>
                    <Th>Price:</Th>
                    <Th>{price ? formatToUSDCurrency(price) : '-'}</Th>
                  </Tr>
                  {delivery && (
                    <Tr>
                      <Th>Delivery:</Th>
                      <Th>
                        {delivery.country ? (
                          <Box display="flex" flexDirection="column" gap={2}>
                            <Text>{delivery.country}</Text>
                            <Text as="i">({delivery.city.join(', ')})</Text>
                          </Box>
                        ) : (
                          '-'
                        )}
                      </Th>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
