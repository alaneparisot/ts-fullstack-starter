import Button from '@material-ui/core/Button'
import { green, orange, red } from '@material-ui/core/colors'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import { Spinner } from '../components'
import { ProcessStatus } from '../types'

const useStyles = makeStyles(() =>
  createStyles({
    cancelled: {
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],
      },
    },
    failed: {
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
    spinner: {
      color: `${green[500]} !important`,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    succeeded: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    wrapper: {
      position: 'relative',
    },
  }),
)

type FeedbackStatus = Omit<ProcessStatus, 'started'>

type ProcessButtonProps = {
  color?: 'primary' | 'secondary' | 'default'
  label: string
  status: ProcessStatus
  testId: string
  type?: 'button' | 'submit'
}

export function ProcessButton({
  color = 'primary',
  label,
  status,
  testId,
  type = 'button',
}: ProcessButtonProps) {
  const classes = useStyles()

  const [feedback, setFeedback] = useState<FeedbackStatus>('idle')

  const buttonClassName = classNames({
    [classes.cancelled]: feedback === 'cancelled',
    [classes.failed]: feedback === 'failed',
    [classes.succeeded]: feedback === 'succeeded',
  })

  useEffect(() => {
    if (
      status === 'cancelled' ||
      status === 'failed' ||
      status === 'succeeded'
    ) {
      setFeedback(status)
    }
  }, [status])

  return (
    <div className={classes.wrapper}>
      <Button
        type={type}
        variant="contained"
        color={color}
        className={buttonClassName}
        disabled={status === 'started'}
        data-testid={testId}
      >
        {label}
      </Button>
      {status === 'started' && (
        <Spinner size={24} className={classes.spinner} />
      )}
    </div>
  )
}
