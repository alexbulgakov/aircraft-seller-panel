import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from '@chakra-ui/react'

export function AddAndEditModal({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: string }) {
  return (
    <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px) " />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody mt={8} display="flex" flexDirection="column" gap={5}>
          <FormControl isRequired>
            <FormLabel>Name:</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Supplier email:</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Count:</FormLabel>
            <Input type="number" />
          </FormControl>
          <FormControl>
            <FormLabel>Price:</FormLabel>
            <Input type="text" />
          </FormControl>
          <Box display="flex" gap={3} flexDirection="row">
            <Select placeholder="Select">
              <option value="country">Country</option>
              <option value="city">City</option>
            </Select>
            <RadioGroup p={2} minW="140px" border="1px" borderColor="gray.600" borderRadius="5px">
              <Stack direction="column">
                <Radio value="us">United States</Radio>
                <Radio value="ru">Russia</Radio>
                <Radio value="fr">France</Radio>
              </Stack>
            </RadioGroup>
            <Box p={2} minW="140px" border="1px" borderColor="gray.600" borderRadius="5px">
              <Stack direction="column">
                <Checkbox value="all">Select all</Checkbox>
                <Divider orientation="horizontal" />
                <Checkbox value="los angeles">Los Angeles</Checkbox>
                <Checkbox value="new york">New York</Checkbox>
                <Checkbox value="paris">Paris</Checkbox>
              </Stack>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="start">
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {type === 'add' ? 'Add' : 'Update'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
