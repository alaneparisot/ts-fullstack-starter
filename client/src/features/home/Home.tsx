import { useTranslation } from 'react-i18next'
import { Page } from '../../components'

export function Home() {
  const { t } = useTranslation(['home'])

  return <Page title={t('welcome')} />
}
