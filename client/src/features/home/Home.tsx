import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Page } from '../../components'
import { selectCurrentUser } from '../user'

export function Home() {
  const { t } = useTranslation(['home'])

  const user = useSelector(selectCurrentUser)

  const title = user ? t('welcomeName', { name: user.username }) : t('welcome')

  return <Page title={title} />
}
