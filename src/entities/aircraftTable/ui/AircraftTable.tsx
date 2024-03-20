import { ArrowDownIcon } from '@chakra-ui/icons'
import { TableContainer, Tbody, Th, Thead, Table, Tr, Heading, IconButton, HStack } from '@chakra-ui/react'

export function AircraftTable({ children }: { children: React.ReactNode }) {
  return (
    <TableContainer>
      <Table size="lg" variant="simple">
        <Thead>
          <Tr>
            <Th>
              <HStack>
                <Heading as="h6" size="xs">
                  Name
                </Heading>
                <IconButton size="sm" variant="ghost" aria-label="Sort" icon={<ArrowDownIcon />} />
              </HStack>
            </Th>
            <Th>
              <HStack>
                <Heading as="h6" size="xs">
                  Price
                </Heading>
                <IconButton size="sm" variant="ghost" aria-label="Sort" icon={<ArrowDownIcon />} />
              </HStack>
            </Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  )
}
