import { useEffect, useState } from 'react'

import { Box, HStack, Heading, useToast } from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Aircraft } from '@/entities/aircraft'
import { setData } from '@/entities/aircraft/model/slice'
import { AircraftTable } from '@/entities/aircraftTable'
import { AddNewAircraftButton } from '@/features/aircraft/addNew'
import { SearchAircraft } from '@/features/aircraft/search'
import { data } from '@/shared/data'
import { Actions } from '@/widgets/actions'
import { AircraftInfo } from '@/widgets/aircraftInfo'

export function AircraftSellerPage() {
  const dispatch = useAppDispatch()
  const aircraftList = useAppSelector(state => state.aircraft.data)
  const [sortField, setSortField] = useState(null)
  const [sortOrder, setSortOrder] = useState('')
  const toast = useToast()

  useEffect(() => {
    dispatch(setData(data))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      toast({
        title: 'Click on the table headers to sort the table',
        status: 'info',
        duration: 7000,
        isClosable: true,
        position: 'top',
      })
    }, 3000)
  }, [])

  const handleSortChange = field => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : sortOrder === 'asc' ? '' : 'desc')
    } else {
      setSortOrder('desc')
      setSortField(field)
    }
  }

  const getSortedAircraftList = () => {
    if (!sortField || !sortOrder) {
      return aircraftList
    }

    return [...aircraftList].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }

  const sortedAircraftList = getSortedAircraftList()

  return (
    <Box p={4} display="flex" flexDirection="column" gap={5}>
      <Heading as="h2" size="xl">
        Aircraft Seller Panel ✈️
      </Heading>
      <HStack flexWrap="wrap" justifyContent="space-between">
        <SearchAircraft />
        <AddNewAircraftButton />
      </HStack>

      <AircraftTable
        sortOrder={sortOrder}
        sortField={sortField}
        onNameClick={() => handleSortChange('name')}
        onPriceClick={() => handleSortChange('price')}>
        {sortedAircraftList.map(aircraft => (
          <Aircraft
            key={aircraft.id}
            name={<AircraftInfo aircraft={aircraft} />}
            count={aircraft.count}
            price={aircraft.price}>
            <Actions id={aircraft.id} />
          </Aircraft>
        ))}
      </AircraftTable>
    </Box>
  )
}
