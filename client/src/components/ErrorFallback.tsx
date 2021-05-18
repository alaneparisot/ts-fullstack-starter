import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

export function ErrorFallback() {
  const { t } = useTranslation()

  const handleClick = () => {
    window.location.assign('/')
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h2" component="h2" align="center" gutterBottom>
        {t('somethingWentWrong')}
      </Typography>
      <Box display="flex" justifyContent="center">
        <Button onClick={handleClick} variant="contained" color="primary">
          {t('goToHomepage')}
        </Button>
      </Box>
    </Box>
  )
}
