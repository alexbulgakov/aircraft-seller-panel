import { Td, Tr } from '@chakra-ui/react'

export function Aircraft({
  name,
  price,
  children,
}: {
  name: React.ReactNode
  price: number
  children: React.ReactNode
}) {
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{price}</Td>
      <Td>{children}</Td>
    </Tr>
  )
}
