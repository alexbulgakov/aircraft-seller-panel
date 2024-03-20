import { SearchIcon } from '@chakra-ui/icons'
import { Button, HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

export function SearchAircraft() {
  return (
    <HStack gap={2} alignItems="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input type="text" placeholder="Search" />
      </InputGroup>

      <Button colorScheme="blue">Search</Button>
    </HStack>
  )
}
