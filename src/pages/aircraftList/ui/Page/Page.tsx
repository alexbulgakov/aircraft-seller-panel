import { Box, HStack, Heading } from '@chakra-ui/react'

import { Aircraft } from '@/entities/aircraft'
import { AircraftTable } from '@/entities/aircraftTable'
import { AddNewAircraftButton } from '@/features/aircraft/addNew'
import { SearchAircraft } from '@/features/aircraft/search'
import { data } from '@/shared/data'
import { Actions } from '@/widgets/actions'
import { AircraftInfo } from '@/widgets/aircraftInfo'

export function AircraftSellerPage() {
  return (
    <Box p={4} display="flex" flexDirection="column" gap={5}>
      <Heading as="h2" size="xl">
        Aircraft Seller Panel ✈️
      </Heading>
      <HStack flexWrap="wrap" justifyContent="space-between">
        <SearchAircraft />
        <AddNewAircraftButton />
      </HStack>

      <AircraftTable>
        {data.map(aircraft => (
          <Aircraft
            key={aircraft.id}
            name={<AircraftInfo aircraft={aircraft} />}
            count={aircraft.count}
            price={aircraft.price}>
            <Actions />
          </Aircraft>
        ))}
      </AircraftTable>
    </Box>
  )
}
