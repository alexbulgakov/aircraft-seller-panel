import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'

export function ActionButtons({ onOpenDelete }: { onOpenDelete: () => void }) {
  return (
    <Box display="flex" gap={3} flexDirection="row">
      <IconButton aria-label="Edit" icon={<EditIcon />} />
      <IconButton onClick={onOpenDelete} aria-label="Delete" icon={<DeleteIcon />} />
    </Box>
  )
}
