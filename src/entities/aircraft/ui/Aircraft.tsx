import { Td, Tr } from '@chakra-ui/react'

import { formatToUSDCurrency } from '@/shared/lib'

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
      <Td>{formatToUSDCurrency(price)}</Td>
      <Td>{children}</Td>
    </Tr>
  )
}
