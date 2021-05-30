import CircularProgress from '@material-ui/core/CircularProgress'

type SpinnerProps = {
  className?: string
  size?: number
}

export function Spinner({ className, size }: SpinnerProps) {
  return <CircularProgress size={size} className={className} />
}
