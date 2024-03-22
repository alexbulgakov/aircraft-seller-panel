import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { TableContainer, Tbody, Th, Thead, Table, Tr, Heading, Box } from '@chakra-ui/react'

export function AircraftTable({
  children,
  onNameClick,
  onPriceClick,
  sortOrder,
  sortField,
}: {
  children: React.ReactNode
  onNameClick: () => void
  onPriceClick: () => void
  sortOrder: string
  sortField: string
}) {
  return (
    <TableContainer>
      <Table size="lg" variant="simple">
        <Thead>
          <Tr>
            <Th>
              <Box
                cursor={'pointer'}
                onClick={onNameClick}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row">
                <Heading as="h6" size="xs">
                  Name
                </Heading>
                {sortOrder === 'asc' && sortField === 'name' && <TriangleUpIcon />}
                {sortOrder === 'desc' && sortField === 'name' && <TriangleDownIcon />}
              </Box>
            </Th>
            <Th>
              <Box
                cursor={'pointer'}
                onClick={onPriceClick}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row">
                <Heading as="h6" size="xs">
                  Price
                </Heading>
                {sortOrder === 'asc' && sortField === 'price' && <TriangleUpIcon />}
                {sortOrder === 'desc' && sortField === 'price' && <TriangleDownIcon />}
              </Box>
            </Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  )
}
