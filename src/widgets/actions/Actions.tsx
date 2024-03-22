import {} from '@chakra-ui/react'

import { useState } from 'react'

// import { AddAndEditModal } from '../addAndEdit'

import { useAppDispatch } from '@/app/hooks'
import { ActionButtons } from '@/entities/aircraft'
import { removeAircraft } from '@/entities/aircraft/model/slice'
import { DeleteModal } from '@/features/aircraft/delete'

export function Actions({ id }: { id: number }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const dispatch = useAppDispatch()

  const onOpenDelete = () => setIsDeleteOpen(true)

  const onCloseDelete = () => setIsDeleteOpen(false)

  const onDelete = (id: number) => {
    dispatch(removeAircraft(id))
    onCloseDelete()
  }

  return (
    <>
      <ActionButtons onOpenDelete={onOpenDelete} onOpenEdit={onOpenDelete} />
      {/* <AddAndEditModal isOpen={isOpen} onClose={onClose} type="edit" /> */}
      <DeleteModal isOpen={isDeleteOpen} onClose={onCloseDelete} onDelete={() => onDelete(id)} />
    </>
  )
}
