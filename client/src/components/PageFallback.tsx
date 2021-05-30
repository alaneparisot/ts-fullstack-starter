import Box from '@material-ui/core/Box'

import { Spinner } from '.'

export function PageFallback() {
  return (
    <Box display="flex" justifyContent="center">
      <Spinner />
    </Box>
  )
}
