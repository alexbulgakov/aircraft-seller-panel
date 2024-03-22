import { useState } from 'react'

import { useAppDispatch } from '@/app/hooks'
import { ActionButtons, AircraftType } from '@/entities/aircraft'
import { removeAircraft, editAircraft } from '@/entities/aircraft/model/slice'
import { AddAndEditModal, DeleteModal } from '@/features/aircraft/delete'

export function Actions({ id }: { id: number }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const dispatch = useAppDispatch()

  const onOpenDelete = () => setIsDeleteOpen(true)

  const onCloseDelete = () => setIsDeleteOpen(false)

  const onOpenEdit = () => setIsEditOpen(true)

  const onCloseEdit = () => setIsEditOpen(false)

  const onEdit = (aircraft: AircraftType) => {
    dispatch(editAircraft(aircraft))
    onCloseEdit()
  }

  const onDelete = (id: number) => {
    dispatch(removeAircraft(id))
    onCloseDelete()
  }

  return (
    <>
      <ActionButtons onOpenDelete={onOpenDelete} onOpenEdit={onOpenEdit} />
      <AddAndEditModal isOpen={isEditOpen} onClose={onCloseEdit} type="edit" onSubmitFunc={onEdit} id={id} />
      <DeleteModal isOpen={isDeleteOpen} onClose={onCloseDelete} onDelete={() => onDelete(id)} />
    </>
  )
}
