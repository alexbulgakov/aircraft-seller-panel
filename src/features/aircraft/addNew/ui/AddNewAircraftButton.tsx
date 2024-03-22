import { Button, useDisclosure } from '@chakra-ui/react'

import { AddAndEditModal } from '../../delete'

import { useAppDispatch } from '@/app/hooks'
import { AircraftType } from '@/entities/aircraft'
import { addAircraft } from '@/entities/aircraft/model/slice'

export function AddNewAircraftButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useAppDispatch()

  const addNew = (aircraft: AircraftType) => {
    dispatch(addAircraft(aircraft))
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add new
      </Button>
      <AddAndEditModal type="add" isOpen={isOpen} onClose={onClose} onSubmitFunc={addNew} />
    </>
  )
}
